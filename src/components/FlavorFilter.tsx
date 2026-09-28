import React from 'react';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { FlavorCategory, SeriesCategory } from '../types';

export const FlavorFilter: React.FC = () => {
  const {
    selectedFlavor,
    setSelectedFlavor,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    filteredProducts,
    products,
  } = useProducts();

  const flavorOptions: { label: FlavorCategory; desc: string; dotColor: string }[] = [
    { label: '全部', desc: '全系列品項', dotColor: '#123826' },
    { label: '青檸萊姆', desc: '清新柑橘微酸', dotColor: '#226b43' },
    { label: '薄荷芭樂', desc: '熱帶涼感耐力', dotColor: '#36825B' },
    { label: '蜜桃白茶', desc: '冷萃白茶零糖', dotColor: '#c78474' },
    { label: '刺五加草本', desc: '極限耐力人蔘', dotColor: '#102d1f' },
    { label: '巨峰葡萄紫蘇', desc: '賽後抗氧修復', dotColor: '#5c4375' },
  ];

  const seriesOptions: SeriesCategory[] = [
    '全部系列',
    '等滲透壓補水',
    '耐力長效燃燒',
    '低卡輕盈',
    '整箱特惠與禮盒',
  ];

  return (
    <section id="flavors" className="pt-6 pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1c643b] uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FLAVOR & SERIES PROFILE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#123826]">
              自然植萃・風味分類
            </h2>
            <p className="text-sm sm:text-base text-[#596b60] mt-1">
              依據你的運動強度、喜好風味與補給時機自由篩選
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8b9b90]" />
            <input
              type="text"
              placeholder="搜尋風味、成分或系列..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-[#D5CEBF] bg-white text-sm text-[#1c2a22] placeholder:text-[#8b9b90] focus:outline-none focus:ring-2 focus:ring-[#277e4e] focus:border-transparent transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8b9b90] hover:text-[#1c2a22] font-semibold"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Series Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none mb-4">
          <div className="flex items-center gap-1 text-xs font-semibold text-[#596b60] mr-2 shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>機能分類：</span>
          </div>
          {seriesOptions.map((series) => {
            const active = selectedCategory === series;
            return (
              <button
                key={series}
                onClick={() => setSelectedCategory(series)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  active
                    ? 'bg-[#123826] text-white shadow-xs'
                    : 'bg-[#ede7da] text-[#33463a] hover:bg-[#e2dacb]'
                }`}
              >
                {series}
              </button>
            );
          })}
        </div>

        {/* Flavor Pills with Color Swatches */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {flavorOptions.map((item) => {
            const isSelected = selectedFlavor === item.label;
            return (
              <button
                key={item.label}
                onClick={() => setSelectedFlavor(item.label)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-[#277e4e] shadow-md ring-2 ring-[#277e4e]/20'
                    : 'bg-[#FAF8F5] border-[#E8E2D5] hover:border-[#b8c9bd] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="w-3.5 h-3.5 rounded-full shadow-2xs"
                    style={{ backgroundColor: item.dotColor }}
                  ></span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-[#277e4e]"></span>
                  )}
                </div>
                <div>
                  <div className="text-sm font-bold text-[#123826]">{item.label}</div>
                  <div className="text-[11px] text-[#697c70] truncate mt-0.5">{item.desc}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Results Counter / Filter status */}
        <div className="mt-5 flex items-center justify-between text-xs text-[#596b60] border-b border-[#E8E2D5] pb-3">
          <div>
            共找到 <span className="font-bold text-[#123826]">{filteredProducts.length}</span> 款補給飲品
            {(selectedFlavor !== '全部' || selectedCategory !== '全部系列' || searchQuery) && (
              <span className="ml-2 text-[#277e4e]">
                (已套用篩選)
              </span>
            )}
          </div>

          {(selectedFlavor !== '全部' || selectedCategory !== '全部系列' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedFlavor('全部');
                setSelectedCategory('全部系列');
                setSearchQuery('');
              }}
              className="text-[#1c643b] hover:underline font-semibold cursor-pointer"
            >
              清除所有篩選
            </button>
          )}
        </div>

      </div>
    </section>
  );
};
