import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle, Sparkles, Image as ImageIcon } from 'lucide-react';
import { Product, FlavorCategory, SeriesCategory } from '../types';
import { useProducts } from '../context/ProductContext';
import { DEFAULT_PRODUCTS } from '../data/defaultProducts';

interface ProductEditModalProps {
  product: Product | null; // null if creating a new product
  isOpen: boolean;
  onClose: () => void;
}

export const ProductEditModal: React.FC<ProductEditModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const { updateProduct, addProduct } = useProducts();
  const isEditing = !!product;

  const [name, setName] = useState('');
  const [subName, setSubName] = useState('');
  const [flavor, setFlavor] = useState('青檸萊姆');
  const [category, setCategory] = useState('等滲透壓補水');
  const [price, setPrice] = useState<number>(49);
  const [originalPrice, setOriginalPrice] = useState<number | undefined>(55);
  const [volume, setVolume] = useState('500ml / 單瓶');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [activeBotanicalsText, setActiveBotanicalsText] = useState('');
  const [tag, setTag] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [inStock, setInStock] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [bestTiming, setBestTiming] = useState('');
  const [calories, setCalories] = useState<number>(38);
  const [carbs, setCarbs] = useState<number>(9.2);
  const [sugar, setSugar] = useState<number>(5.8);
  const [sodium, setSodium] = useState<number>(185);
  const [potassium, setPotassium] = useState<number>(95);
  const [magnesium, setMagnesium] = useState<number>(22);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Available image presets from default products
  const imagePresets = DEFAULT_PRODUCTS.map((p) => ({
    name: p.flavor,
    url: p.imageUrl,
  }));

  useEffect(() => {
    if (product) {
      setName(product.name);
      setSubName(product.subName || '');
      setFlavor(product.flavor);
      setCategory(product.category);
      setPrice(product.price);
      setOriginalPrice(product.originalPrice);
      setVolume(product.volume);
      setDescription(product.description);
      setIngredients(product.ingredients);
      setActiveBotanicalsText(product.activeBotanicals?.join(', ') || '');
      setTag(product.tag || '');
      setImageUrl(product.imageUrl);
      setInStock(product.inStock);
      setIsFeatured(!!product.isFeatured);
      setBestTiming(product.bestTiming || '');
      if (product.nutrition) {
        setCalories(product.nutrition.calories);
        setCarbs(product.nutrition.carbs);
        setSugar(product.nutrition.sugar);
        setSodium(product.nutrition.sodium);
        setPotassium(product.nutrition.potassium);
        magnesium !== undefined && setMagnesium(product.nutrition.magnesium);
      }
    } else {
      // Defaults for new item
      setName('');
      setSubName('');
      setFlavor('青檸萊姆');
      setCategory('等滲透壓補水');
      setPrice(50);
      setOriginalPrice(60);
      setVolume('500ml / 單瓶');
      setDescription('植燃天然植物萃取配方，深入細胞快速補水。');
      setIngredients('純水、天然植物原萃、深層海洋礦物質、維生素C');
      setActiveBotanicalsText('台灣友善農耕果物, 天然椰子水, 海洋礦物');
      setTag('新品上市');
      setImageUrl(imagePresets[0]?.url || '');
      setInStock(true);
      setIsFeatured(false);
      setBestTiming('運動中及運動後快速補水');
      setCalories(35);
      setCarbs(8.5);
      setSugar(4.5);
      setSodium(180);
      setPotassium(90);
      setMagnesium(20);
    }
    setError(null);
  }, [product, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('商品名稱不可為空');
      return;
    }
    if (price <= 0) {
      setError('價格必須大於 0');
      return;
    }

    setSaving(true);
    setError(null);

    const botanicalsArray = activeBotanicalsText
      .split(/[,，]/)
      .map((s) => s.trim())
      .filter(Boolean);

    const productPayload = {
      name: name.trim(),
      subName: subName.trim(),
      flavor,
      category,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      volume: volume.trim(),
      description: description.trim(),
      ingredients: ingredients.trim(),
      activeBotanicals: botanicalsArray,
      tag: tag.trim(),
      imageUrl: imageUrl.trim() || imagePresets[0].url,
      inStock,
      isFeatured,
      sortOrder: product?.sortOrder || 99,
      colorTheme: product?.colorTheme || '#226b43',
      bestTiming: bestTiming.trim(),
      nutrition: {
        calories: Number(calories) || 0,
        carbs: Number(carbs) || 0,
        sugar: Number(sugar) || 0,
        sodium: Number(sodium) || 0,
        potassium: Number(potassium) || 0,
        magnesium: Number(magnesium) || 0,
      },
    };

    try {
      if (isEditing && product) {
        await updateProduct(product.id, productPayload);
      } else {
        await addProduct(productPayload);
      }
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : '儲存失敗，請檢查權限');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#E8E2D5] my-8 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#123826] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#3bd37c]"></span>
            <h3 className="text-base font-bold">
              {isEditing ? `編輯商品：${product.name}` : '新增植燃飲品品項'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto flex-1">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#123826] mb-1">
                商品名稱 *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#D5CEBF] text-xs focus:ring-2 focus:ring-[#277e4e] focus:outline-none"
                placeholder="例：植燃 輕爽青檸等滲透補給飲"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#123826] mb-1">
                英文或副標名稱
              </label>
              <input
                type="text"
                value={subName}
                onChange={(e) => setSubName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#D5CEBF] text-xs focus:ring-2 focus:ring-[#277e4e] focus:outline-none"
                placeholder="例：BOTANIC BURN Lime Breeze"
              />
            </div>
          </div>

          {/* Flavor & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#123826] mb-1">
                風味分類 *
              </label>
              <select
                value={flavor}
                onChange={(e) => setFlavor(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#D5CEBF] text-xs bg-white focus:ring-2 focus:ring-[#277e4e] focus:outline-none"
              >
                <option value="青檸萊姆">青檸萊姆 (Lime Breeze)</option>
                <option value="薄荷芭樂">薄荷芭樂 (Mint & Guava)</option>
                <option value="蜜桃白茶">蜜桃白茶 (Peach & White Tea)</option>
                <option value="刺五加草本">刺五加草本 (Siberian Ginseng)</option>
                <option value="巨峰葡萄紫蘇">巨峰葡萄紫蘇 (Grape & Perilla)</option>
                <option value="全部">全部綜合風味 (Mixed)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#123826] mb-1">
                系列分類 *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#D5CEBF] text-xs bg-white focus:ring-2 focus:ring-[#277e4e] focus:outline-none"
              >
                <option value="等滲透壓補水">等滲透壓補水</option>
                <option value="耐力長效燃燒">耐力長效燃燒</option>
                <option value="低卡輕盈">低卡輕盈</option>
                <option value="整箱特惠與禮盒">整箱特惠與禮盒</option>
              </select>
            </div>
          </div>

          {/* Prices & Volume */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#123826] mb-1">
                售價 (NT$) *
              </label>
              <input
                type="number"
                required
                min={1}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-[#D5CEBF] text-xs focus:ring-2 focus:ring-[#277e4e] focus:outline-none font-bold text-[#123826]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#123826] mb-1">
                原價劃線價 (NT$)
              </label>
              <input
                type="number"
                min={0}
                value={originalPrice || ''}
                onChange={(e) => setOriginalPrice(e.target.value ? Number(e.target.value) : undefined)}
                className="w-full px-3 py-2 rounded-xl border border-[#D5CEBF] text-xs focus:ring-2 focus:ring-[#277e4e] focus:outline-none"
                placeholder="選填，例：60"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#123826] mb-1">
                包裝規格 / 容量 *
              </label>
              <input
                type="text"
                required
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#D5CEBF] text-xs focus:ring-2 focus:ring-[#277e4e] focus:outline-none"
                placeholder="500ml / 單瓶"
              />
            </div>
          </div>

          {/* Tag & Stock Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            <div>
              <label className="block text-xs font-bold text-[#123826] mb-1">
                行銷標籤 Tag
              </label>
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#D5CEBF] text-xs focus:ring-2 focus:ring-[#277e4e] focus:outline-none"
                placeholder="例：熱銷冠軍 TOP 1"
              />
            </div>

            <div className="flex items-center gap-2 pt-5">
              <input
                type="checkbox"
                id="inStockCheck"
                checked={inStock}
                onChange={(e) => setInStock(e.target.checked)}
                className="w-4 h-4 text-[#277e4e] rounded border-stone-300 focus:ring-[#277e4e] cursor-pointer"
              />
              <label htmlFor="inStockCheck" className="text-xs font-bold text-[#123826] cursor-pointer">
                目前正常供貨中 (有庫存)
              </label>
            </div>

            <div className="flex items-center gap-2 pt-5">
              <input
                type="checkbox"
                id="featuredCheck"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 text-[#277e4e] rounded border-stone-300 focus:ring-[#277e4e] cursor-pointer"
              />
              <label htmlFor="featuredCheck" className="text-xs font-bold text-[#123826] cursor-pointer">
                首頁精選推薦
              </label>
            </div>
          </div>

          {/* Image Selection */}
          <div>
            <label className="block text-xs font-bold text-[#123826] mb-1">
              商品圖片網址 / 預設圖庫選取
            </label>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl border border-[#D5CEBF] text-xs focus:ring-2 focus:ring-[#277e4e] focus:outline-none truncate"
                placeholder="輸入圖片 URL 或從下方快速選取"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-[10px] text-[#718276] shrink-0">快速套用：</span>
              {imagePresets.map((preset, pIdx) => (
                <button
                  key={pIdx}
                  type="button"
                  onClick={() => setImageUrl(preset.url)}
                  className={`text-[10px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer shrink-0 ${
                    imageUrl === preset.url
                      ? 'bg-[#123826] text-white border-[#123826]'
                      : 'bg-[#FAF8F5] text-[#33443a] border-[#D5CEBF] hover:bg-stone-100'
                  }`}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Description & Timing */}
          <div>
            <label className="block text-xs font-bold text-[#123826] mb-1">
              特色描述 *
            </label>
            <textarea
              rows={2}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#D5CEBF] text-xs focus:ring-2 focus:ring-[#277e4e] focus:outline-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#123826] mb-1">
              建議飲用時機
            </label>
            <input
              type="text"
              value={bestTiming}
              onChange={(e) => setBestTiming(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#D5CEBF] text-xs focus:ring-2 focus:ring-[#277e4e] focus:outline-none"
              placeholder="例：運動中快速補水、長跑及單車訓練每 20 分鐘小口補充"
            />
          </div>

          {/* Ingredients & Botanicals */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#123826] mb-1">
                完整成分標示
              </label>
              <textarea
                rows={2}
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#D5CEBF] text-xs focus:ring-2 focus:ring-[#277e4e] focus:outline-none"
                placeholder="純水、天然果汁、電解質礦物質..."
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#123826] mb-1">
                核心植萃成分標籤 (逗號分隔)
              </label>
              <textarea
                rows={2}
                value={activeBotanicalsText}
                onChange={(e) => setActiveBotanicalsText(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#D5CEBF] text-xs focus:ring-2 focus:ring-[#277e4e] focus:outline-none"
                placeholder="例：屏東青檸, 天然椰子水, 深層海鹽"
              ></textarea>
            </div>
          </div>

          {/* Nutrition Facts */}
          <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-[#E8E2D5]">
            <div className="text-xs font-bold text-[#123826] mb-2">營養標示數值 (每瓶)</div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              <div>
                <label className="block text-[10px] text-stone-500 mb-0.5">熱量 (kcal)</label>
                <input
                  type="number"
                  value={calories}
                  onChange={(e) => setCalories(Number(e.target.value))}
                  className="w-full px-2 py-1 bg-white border border-[#D5CEBF] rounded text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] text-stone-500 mb-0.5">碳水 (g)</label>
                <input
                  type="number"
                  step="0.1"
                  value={carbs}
                  onChange={(e) => setCarbs(Number(e.target.value))}
                  className="w-full px-2 py-1 bg-white border border-[#D5CEBF] rounded text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] text-stone-500 mb-0.5">糖 (g)</label>
                <input
                  type="number"
                  step="0.1"
                  value={sugar}
                  onChange={(e) => setSugar(Number(e.target.value))}
                  className="w-full px-2 py-1 bg-white border border-[#D5CEBF] rounded text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] text-stone-500 mb-0.5">鈉 (mg)</label>
                <input
                  type="number"
                  value={sodium}
                  onChange={(e) => setSodium(Number(e.target.value))}
                  className="w-full px-2 py-1 bg-white border border-[#D5CEBF] rounded text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] text-stone-500 mb-0.5">鉀 (mg)</label>
                <input
                  type="number"
                  value={potassium}
                  onChange={(e) => setPotassium(Number(e.target.value))}
                  className="w-full px-2 py-1 bg-white border border-[#D5CEBF] rounded text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] text-stone-500 mb-0.5">鎂 (mg)</label>
                <input
                  type="number"
                  value={magnesium}
                  onChange={(e) => setMagnesium(Number(e.target.value))}
                  className="w-full px-2 py-1 bg-white border border-[#D5CEBF] rounded text-xs"
                />
              </div>
            </div>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-[#FAF8F5] border-t border-[#E8E2D5] flex items-center justify-end gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-[#526458] hover:bg-stone-200 transition-colors cursor-pointer"
          >
            取消
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving}
            className="bg-[#123826] hover:bg-[#1c5234] text-white px-6 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Save className="w-3.5 h-3.5 text-[#3bd37c]" />
            <span>{saving ? '正在儲存至雲端...' : isEditing ? '儲存變更' : '建立商品'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
