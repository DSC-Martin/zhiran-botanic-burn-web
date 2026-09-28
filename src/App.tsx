import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider, useProducts } from './context/ProductContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FlavorFilter } from './components/FlavorFilter';
import { ProductGrid } from './components/ProductGrid';
import { BrandStory } from './components/BrandStory';
import { ScienceFormula } from './components/ScienceFormula';
import { RetailLocations } from './components/RetailLocations';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { ProductEditModal } from './components/ProductEditModal';
import { AdminModal } from './components/AdminModal';
import { Product } from './types';

function MainContent() {
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditProduct = (product: Product) => {
    setProductToEdit(product);
    setIsEditModalOpen(true);
  };

  const handleAddNewProduct = () => {
    setProductToEdit(null);
    setIsEditModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#18261e]">
      {/* Top Header & Navigation */}
      <Navbar />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Flavor Classification & Filter */}
        <FlavorFilter />

        {/* Product Catalog Grid */}
        <ProductGrid
          onEditProduct={handleEditProduct}
          onAddNewProduct={handleAddNewProduct}
        />

        {/* Brand Philosophy & Story */}
        <BrandStory />

        {/* Science & Absorption Formula */}
        <ScienceFormula />

        {/* Retail Outlets / Where to Buy */}
        <RetailLocations />

        {/* Contact & Inquiries */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Product Detail Modal */}
      <ProductModal onEditProduct={() => productToEdit && handleEditProduct(productToEdit)} />

      {/* Product Edit / Add Modal */}
      <ProductEditModal
        product={productToEdit}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setProductToEdit(null);
        }}
      />

      {/* Admin Management System Modal / Overlay */}
      <AdminModal />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <MainContent />
      </ProductProvider>
    </AuthProvider>
  );
}
