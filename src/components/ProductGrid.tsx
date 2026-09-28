import React from 'react';
import { PackageX, Sparkles, Plus, RefreshCw } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { ProductCard } from './ProductCard';
import { Product } from '../types';

interface ProductGridProps {
  onEditProduct: (product: Product) => void;
  onAddNewProduct: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ onEditProduct, onAddNewProduct }) => {
  const { filteredProducts, loading, seedDefaultCatalog, isFirestoreSynced } = useProducts();
  const { isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-10 h-10 border-4 border-[#277e4e] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-sm text-[#596b60]">正在載入植燃全系列商品型錄...</p>
      </div>
    );
  }

  return (
    <section id="catalog" className="pt-4 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Quick Action Bar if logged in */}
        {isAdmin && (
          <div className="mb-6 p-4 rounded-2xl bg-[#e8f5ec] border border-[#bfe2cc] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#277e4e]"></span>
              <span className="text-xs font-bold text-[#123826]">
                管理員專屬功能：即時雲端同步商品與價格
              </span>
              {!isFirestoreSynced && (
                <span className="text-[11px] text-amber-800 bg-amber-100 px-2 py-0.5 rounded font-medium">
                  目前為本地預設型錄
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onAddNewProduct}
                className="bg-[#123826] hover:bg-[#1c5234] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5 text-[#3bd37c]" />
                <span>新增商品品項</span>
              </button>

              <button
                onClick={seedDefaultCatalog}
                className="border border-[#123826]/30 hover:border-[#123826] text-[#123826] bg-white text-xs font-semibold px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                title="將完整預設商品寫入 Firestore 資料庫"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>同步完整預設商品至雲端</span>
              </button>
            </div>
          </div>
        )}

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEditClick={onEditProduct}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-[#E8E2D5] p-12 text-center max-w-md mx-auto my-8">
            <div className="w-14 h-14 bg-[#F4EFE6] rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#8a9b8f]">
              <PackageX className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-[#123826] mb-1">
              未找到符合條件的飲品
            </h3>
            <p className="text-xs text-[#596b60] mb-6">
              請嘗試切換其他風味或機能系列，或是重設搜尋關鍵字。
            </p>
          </div>
        )}

        {/* Catalog Guarantee Banner */}
        <div className="mt-16 bg-[#F4EFE6] rounded-3xl p-8 border border-[#E8E2D5] grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-[#123826]">純淨植物萃取保證</h4>
            <p className="text-xs text-[#596b60] leading-relaxed">
              全產品皆採用台灣屏東友善農耕果物、高山冷萃茶湯與純淨草本原萃，無人工合成香精。
            </p>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-[#123826]">專業運動員與營養師背書</h4>
            <p className="text-xs text-[#596b60] leading-relaxed">
              符合國際運動營養等滲透壓標準（280-300 mOsm/kg），快速由小腸吸收，避免跑動顛頗不適。
            </p>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-[#123826]">全台實體通路與賽事合作</h4>
            <p className="text-xs text-[#596b60] leading-relaxed">
              各大便利商店冷藏櫃、全聯福利中心與大型馬拉松、三鐵賽事補給站均可購買現喝。
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
