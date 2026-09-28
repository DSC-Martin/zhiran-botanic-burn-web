import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  collection, 
  doc, 
  onSnapshot, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp,
  writeBatch
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { handleFirestoreError, OperationType } from '../firebase/errors';
import { Product, FlavorCategory, SeriesCategory } from '../types';
import { DEFAULT_PRODUCTS } from '../data/defaultProducts';
import { useAuth } from './AuthContext';

interface ProductContextType {
  products: Product[];
  filteredProducts: Product[];
  loading: boolean;
  selectedFlavor: FlavorCategory;
  setSelectedFlavor: (flavor: FlavorCategory) => void;
  selectedCategory: SeriesCategory;
  setSelectedCategory: (category: SeriesCategory) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  
  // Admin Operations
  updateProductPrice: (id: string, newPrice: number, originalPrice?: number) => Promise<void>;
  updateProduct: (id: string, data: Partial<Product>) => Promise<void>;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  seedDefaultCatalog: () => Promise<void>;
  isFirestoreSynced: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFirestoreSynced, setIsFirestoreSynced] = useState<boolean>(false);
  const [selectedFlavor, setSelectedFlavor] = useState<FlavorCategory>('全部');
  const [selectedCategory, setSelectedCategory] = useState<SeriesCategory>('全部系列');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { user } = useAuth();

  // Listen to Firestore products collection
  useEffect(() => {
    const productsRef = collection(db, 'products');

    const unsubscribe = onSnapshot(
      productsRef,
      (snapshot) => {
        if (!snapshot.empty) {
          const loadedProducts: Product[] = [];
          snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            loadedProducts.push({
              id: docSnap.id,
              name: data.name || '',
              subName: data.subName || '',
              flavor: data.flavor || '',
              category: data.category || '等滲透壓補水',
              price: Number(data.price) || 0,
              originalPrice: data.originalPrice ? Number(data.originalPrice) : undefined,
              volume: data.volume || '500ml',
              description: data.description || '',
              ingredients: data.ingredients || '',
              activeBotanicals: Array.isArray(data.activeBotanicals) ? data.activeBotanicals : [],
              tag: data.tag || '',
              imageUrl: data.imageUrl || DEFAULT_PRODUCTS[0].imageUrl,
              inStock: data.inStock !== false,
              isFeatured: !!data.isFeatured,
              sortOrder: Number(data.sortOrder) || 0,
              colorTheme: data.colorTheme || '#226b43',
              nutrition: data.nutrition || undefined,
              bestTiming: data.bestTiming || '',
              createdAt: data.createdAt?.toDate?.()?.toISOString?.() || data.createdAt,
              updatedAt: data.updatedAt?.toDate?.()?.toISOString?.() || data.updatedAt,
            });
          });
          loadedProducts.sort((a, b) => a.sortOrder - b.sortOrder);
          setProducts(loadedProducts);
          setIsFirestoreSynced(true);
        } else {
          // If Firestore is empty, fall back to default catalog
          setProducts(DEFAULT_PRODUCTS);
          setIsFirestoreSynced(false);
        }
        setLoading(false);
      },
      (error) => {
        // Handle firestore error via mandatory handler
        handleFirestoreError(error, OperationType.GET, 'products');
      }
    );

    return () => unsubscribe();
  }, [user]);

  // Admin: update price quickly
  const updateProductPrice = async (id: string, newPrice: number, originalPrice?: number) => {
    const productRef = doc(db, 'products', id);
    try {
      const updateData: Record<string, any> = {
        price: Number(newPrice),
        updatedAt: serverTimestamp(),
      };
      if (originalPrice !== undefined) {
        updateData.originalPrice = Number(originalPrice);
      }
      await updateDoc(productRef, updateData);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `products/${id}`);
    }
  };

  // Admin: update full product
  const updateProduct = async (id: string, data: Partial<Product>) => {
    const productRef = doc(db, 'products', id);
    try {
      const cleanData: Record<string, any> = {
        ...data,
        updatedAt: serverTimestamp(),
      };
      delete cleanData.id;
      await updateDoc(productRef, cleanData);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `products/${id}`);
    }
  };

  // Admin: add product
  const addProduct = async (newProduct: Omit<Product, 'id'>) => {
    const generatedId = `prod-${Date.now()}`;
    const productRef = doc(db, 'products', generatedId);
    try {
      await setDoc(productRef, {
        ...newProduct,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `products/${generatedId}`);
    }
  };

  // Admin: delete product
  const deleteProduct = async (id: string) => {
    const productRef = doc(db, 'products', id);
    try {
      await deleteDoc(productRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `products/${id}`);
    }
  };

  // Admin: Seed default catalog to Firestore
  const seedDefaultCatalog = async () => {
    try {
      const batch = writeBatch(db);
      for (const item of DEFAULT_PRODUCTS) {
        const docRef = doc(db, 'products', item.id);
        const { id, ...data } = item;
        batch.set(docRef, {
          ...data,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
      await batch.commit();
      setIsFirestoreSynced(true);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'products');
    }
  };

  // Filtered products logic
  const filteredProducts = products.filter((prod) => {
    // Flavor match
    if (selectedFlavor !== '全部') {
      if (!prod.flavor.includes(selectedFlavor) && prod.flavor !== selectedFlavor) {
        return false;
      }
    }
    // Category match
    if (selectedCategory !== '全部系列') {
      if (prod.category !== selectedCategory) {
        return false;
      }
    }
    // Search query match
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      const matchName = prod.name.toLowerCase().includes(query);
      const matchDesc = prod.description.toLowerCase().includes(query);
      const matchFlavor = prod.flavor.toLowerCase().includes(query);
      const matchIngredients = prod.ingredients.toLowerCase().includes(query);
      if (!matchName && !matchDesc && !matchFlavor && !matchIngredients) {
        return false;
      }
    }
    return true;
  });

  return (
    <ProductContext.Provider
      value={{
        products,
        filteredProducts,
        loading,
        selectedFlavor,
        setSelectedFlavor,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        selectedProduct,
        setSelectedProduct,
        updateProductPrice,
        updateProduct,
        addProduct,
        deleteProduct,
        seedDefaultCatalog,
        isFirestoreSynced,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
