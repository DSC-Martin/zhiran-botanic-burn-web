import React from 'react';
import { Store, MapPin, Building, Trophy, ExternalLink } from 'lucide-react';

export const RetailLocations: React.FC = () => {
  const channels = [
    {
      category: '便利超商冷藏櫃',
      icon: <Store className="w-5 h-5 text-[#277e4e]" />,
      partners: ['7-ELEVEN 全台門市', '全家便利商店 FamilyMart', '萊爾富 Hi-Life'],
      notes: '單瓶 500ml 冰鎮專櫃，運動途中隨到隨買。',
    },
    {
      category: '量販與超市通路',
      icon: <Building className="w-5 h-5 text-[#277e4e]" />,
      partners: ['全聯福利中心 PX MART', '家樂福 Carrefour', 'Mia C’bon 高級超市'],
      notes: '提供 4 入特惠分享組及全系列風味現貨供應。',
    },
    {
      category: '運動中心與連鎖健身房',
      icon: <Trophy className="w-5 h-5 text-[#277e4e]" />,
      partners: ['World Gym 健身俱樂部', '健身工廠 Fitness Factory', '迪卡儂 Decathlon 全台門市'],
      notes: '場館專屬販賣機及櫃檯即享運動員補給優惠價。',
    },
    {
      category: '大型馬拉松與單車賽事',
      icon: <MapPin className="w-5 h-5 text-[#277e4e]" />,
      partners: ['台北馬拉松官方補給', '台東長濱雙浪金剛馬拉松', 'Challenge Taiwan 鐵人三項'],
      notes: '賽道官方指定能量補給站，現場提供大會杯裝等滲透補水。',
    },
  ];

  return (
    <section id="retail" className="py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#DCD5C5] text-[#1c643b] text-xs font-bold tracking-widest uppercase">
            <Store className="w-3.5 h-3.5" />
            <span>WHERE TO BUY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#123826] tracking-tight">
            實體通路據點・隨處隨時充能
          </h2>
          <p className="text-base text-[#526458] leading-relaxed">
            「植燃」已全台鋪設超過 12,000 個線下據點。無論是清晨河濱晨跑、夜間重量訓練，還是週末登山百岳，都能就近輕鬆補給。
          </p>
        </div>

        {/* Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {channels.map((ch, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-[#E8E2D5] shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#e8f5ec] flex items-center justify-center mb-4">
                  {ch.icon}
                </div>
                <h3 className="text-base font-bold text-[#123826] mb-3">
                  {ch.category}
                </h3>
                <ul className="space-y-1.5 mb-4">
                  {ch.partners.map((partner, pIdx) => (
                    <li key={pIdx} className="text-xs font-medium text-[#2d3e33] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#277e4e]"></span>
                      <span>{partner}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[#F2ECE1] text-[11px] text-[#718276] leading-relaxed">
                {ch.notes}
              </div>
            </div>
          ))}
        </div>

        {/* Corporate / B2B banner */}
        <div className="mt-12 bg-[#123826] text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="text-xs font-bold uppercase tracking-wider text-[#3bd37c]">
              WHOLESALE & SPONSORSHIP
            </div>
            <h3 className="text-2xl font-black text-white">
              運動團隊・企業團購・賽事贊助合作
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
              跑團、單車社團、運動場館批發整箱或大型體育賽事官方補給贊助，歡迎直接填寫聯絡表單，專人於 24 小時內與您聯繫。
            </p>
          </div>

          <a
            href="#contact"
            className="bg-[#2fc26f] hover:bg-[#28ad62] text-stone-900 font-bold text-sm px-6 py-3 rounded-full transition-all whitespace-nowrap shadow-md cursor-pointer shrink-0"
          >
            洽詢商業與賽事合作
          </a>
        </div>

      </div>
    </section>
  );
};
