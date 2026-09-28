import React from 'react';
import { X, Sparkles, Clock, CheckCircle2, Shield, Share2, MapPin } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';

interface ProductModalProps {
  onEditProduct?: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ onEditProduct }) => {
  const { selectedProduct, setSelectedProduct } = useProducts();
  const { isAdmin } = useAuth();

  if (!selectedProduct) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#E8E2D5] my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-stone-100 text-stone-700 flex items-center justify-center shadow-md transition-all cursor-pointer"
          aria-label="關閉"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Media Column */}
          <div className="md:col-span-5 bg-[#F4EFE6] p-8 flex flex-col justify-between items-center text-center relative border-b md:border-b-0 md:border-r border-[#E8E2D5]">
            <div className="w-full">
              {selectedProduct.tag && (
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#123826] text-white mb-4 shadow-2xs">
                  {selectedProduct.tag}
                </span>
              )}
            </div>

            <div className="relative my-auto w-full aspect-square max-w-[260px] rounded-2xl overflow-hidden shadow-md">
              <img
                src={selectedProduct.imageUrl}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-6 w-full space-y-1">
              <div className="text-xs text-[#798a7f]">規格容量</div>
              <div className="text-sm font-bold text-[#123826]">{selectedProduct.volume}</div>
              <div className="text-2xl font-black text-[#123826] mt-2">
                NT$ {selectedProduct.price}
                {selectedProduct.originalPrice && selectedProduct.originalPrice > selectedProduct.price && (
                  <span className="text-sm text-[#9aa79f] line-through ml-2 font-normal">
                    NT$ {selectedProduct.originalPrice}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right Content Column */}
          <div className="md:col-span-7 p-6 sm:p-8 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#e8f5ec] text-[#277e4e]">
                  {selectedProduct.flavor}
                </span>
                <span className="text-xs text-[#63756a] font-medium">
                  {selectedProduct.category}
                </span>
              </div>
              <h2 className="text-2xl font-black text-[#123826]">
                {selectedProduct.name}
              </h2>
              {selectedProduct.subName && (
                <p className="text-xs text-[#798a7f] mt-0.5">
                  {selectedProduct.subName}
                </p>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-[#48594e] leading-relaxed">
              {selectedProduct.description}
            </p>

            {/* Nutrition Facts Table */}
            {selectedProduct.nutrition && (
              <div className="bg-[#FAF8F5] rounded-2xl p-4 border border-[#E8E2D5]">
                <div className="flex items-center justify-between mb-3 border-b border-[#E8E2D5] pb-2">
                  <span className="text-xs font-bold text-[#123826]">
                    等滲透營養成分標示 (每份)
                  </span>
                  <span className="text-[10px] text-[#798a7f]">
                    滲透壓 290 mOsm/kg
                  </span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center">
                  <div className="bg-white p-2 rounded-xl border border-[#ece7dc]">
                    <div className="text-[10px] text-[#798a7f]">熱量</div>
                    <div className="text-xs font-bold text-[#123826] mt-0.5">{selectedProduct.nutrition.calories} <span className="text-[9px]">kcal</span></div>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-[#ece7dc]">
                    <div className="text-[10px] text-[#798a7f]">總碳水</div>
                    <div className="text-xs font-bold text-[#123826] mt-0.5">{selectedProduct.nutrition.carbs} <span className="text-[9px]">g</span></div>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-[#ece7dc]">
                    <div className="text-[10px] text-[#798a7f]">糖含量</div>
                    <div className="text-xs font-bold text-[#123826] mt-0.5">{selectedProduct.nutrition.sugar} <span className="text-[9px]">g</span></div>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-[#ece7dc]">
                    <div className="text-[10px] text-[#798a7f]">鈉 (Na)</div>
                    <div className="text-xs font-bold text-[#277e4e] mt-0.5">{selectedProduct.nutrition.sodium} <span className="text-[9px]">mg</span></div>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-[#ece7dc]">
                    <div className="text-[10px] text-[#798a7f]">鉀 (K)</div>
                    <div className="text-xs font-bold text-[#277e4e] mt-0.5">{selectedProduct.nutrition.potassium} <span className="text-[9px]">mg</span></div>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-[#ece7dc]">
                    <div className="text-[10px] text-[#798a7f]">鎂 (Mg)</div>
                    <div className="text-xs font-bold text-[#277e4e] mt-0.5">{selectedProduct.nutrition.magnesium} <span className="text-[9px]">mg</span></div>
                  </div>
                </div>
              </div>
            )}

            {/* Best Timing */}
            {selectedProduct.bestTiming && (
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#e8f5ec]/60 border border-[#cbe8d6]">
                <Clock className="w-4 h-4 text-[#277e4e] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-[#123826]">建議飲用時機</div>
                  <div className="text-xs text-[#385343] mt-0.5">{selectedProduct.bestTiming}</div>
                </div>
              </div>
            )}

            {/* Ingredients */}
            <div>
              <div className="text-xs font-bold text-[#123826] mb-1.5">
                完整植物成分表
              </div>
              <div className="text-xs text-[#526458] leading-relaxed bg-[#FAF8F5] p-3 rounded-xl border border-[#E8E2D5]">
                {selectedProduct.ingredients}
              </div>
            </div>

            {/* Purchasing offline hint */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#E8E2D5]">
              <div className="flex items-center gap-2 text-xs text-[#596b60]">
                <MapPin className="w-4 h-4 text-[#277e4e]" />
                <span>全台 7-11、全家便利商店、全聯及合作運動中心現正販售</span>
              </div>

              {isAdmin && onEditProduct && (
                <button
                  onClick={() => {
                    setSelectedProduct(null);
                    onEditProduct();
                  }}
                  className="bg-[#123826] text-[#3bd37c] hover:bg-[#1c5234] text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer"
                >
                  進入後台編輯此商品
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
