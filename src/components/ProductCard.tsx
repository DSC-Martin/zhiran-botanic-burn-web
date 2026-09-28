import React, { useState } from 'react';
import { Sparkles, Edit3, ArrowRight, Check, Droplets, Info } from 'lucide-react';
import { Product } from '../types';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';

interface ProductCardProps {
  product: Product;
  onEditClick?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onEditClick }) => {
  const { setSelectedProduct } = useProducts();
  const { isAdmin } = useAuth();
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="group bg-white rounded-3xl border border-[#E8E2D5] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
      {/* Top Media Area */}
      <div className="relative aspect-square w-full bg-[#F4EFE6] overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product)}>
        {/* Product Tag */}
        {product.tag && (
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 rounded-full text-xs font-bold shadow-xs bg-[#123826] text-white">
              {product.tag}
            </span>
          </div>
        )}

        {/* In-stock badge */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[2px] z-20 flex items-center justify-center">
            <span className="px-4 py-1.5 rounded-full bg-stone-100 text-stone-900 font-bold text-sm tracking-wider">
              暫時售罄
            </span>
          </div>
        )}

        {/* Volume badge */}
        <div className="absolute top-4 right-4 z-10">
          <span className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white/90 backdrop-blur-xs text-[#2b3a30] border border-[#d6cfbe]">
            {product.volume}
          </span>
        </div>

        {/* Beverage Image */}
        <img
          src={product.imageUrl}
          alt={product.name}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Subtle hover overlay hint */}
        <div className="absolute inset-0 bg-[#123826]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-white/95 text-[#123826] text-xs font-bold px-4 py-2 rounded-full shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Info className="w-3.5 h-3.5" />
            點擊查看成分與配方
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Flavor & Category */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-bold text-[#277e4e] uppercase tracking-wider bg-[#e8f5ec] px-2 py-0.5 rounded">
              {product.flavor}
            </span>
            <span className="text-[11px] text-[#63756a]">
              {product.category}
            </span>
          </div>

          {/* Product Name */}
          <h3 
            onClick={() => setSelectedProduct(product)}
            className="text-lg font-bold text-[#123826] leading-snug group-hover:text-[#277e4e] transition-colors cursor-pointer"
          >
            {product.name}
          </h3>

          {product.subName && (
            <p className="text-[11px] text-[#73857a] tracking-tight mt-0.5 line-clamp-1">
              {product.subName}
            </p>
          )}

          {/* Short description */}
          <p className="text-xs text-[#526458] mt-2.5 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Active Botanicals Tags */}
          {product.activeBotanicals && product.activeBotanicals.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {product.activeBotanicals.slice(0, 3).map((botanical) => (
                <span
                  key={botanical}
                  className="text-[10px] font-medium text-[#2d4d38] bg-[#F4EFE6] px-2 py-0.5 rounded-md border border-[#E2DBD0]"
                >
                  +{botanical}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Pricing & Actions */}
        <div className="pt-4 border-t border-[#EFEBE1]">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <div className="text-[11px] text-[#798a7f]">建議售價</div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-[#123826] tracking-tight">
                  NT$ {product.price}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-xs text-[#9aa79f] line-through font-medium">
                    NT$ {product.originalPrice}
                  </span>
                )}
              </div>
            </div>

            {/* Calories / Low sugar indicator */}
            {product.nutrition && (
              <div className="text-right">
                <span className="text-xs font-bold text-[#277e4e]">
                  {product.nutrition.calories} kcal
                </span>
                <div className="text-[10px] text-[#798a7f]">
                  糖 {product.nutrition.sugar}g / 瓶
                </div>
              </div>
            )}
          </div>

          {/* Action button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedProduct(product)}
              className="flex-1 bg-[#F4EFE6] hover:bg-[#123826] text-[#123826] hover:text-white font-semibold text-xs py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>查看配方與飲用指南</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Admin Direct Edit Trigger */}
            {isAdmin && onEditClick && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEditClick(product);
                }}
                className="bg-[#123826] text-[#3bd37c] hover:bg-[#277e4e] hover:text-white p-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer shrink-0"
                title="後台快速編輯此商品"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
