import React from 'react';
import { Leaf, Flame, Shield, Award, Heart, RefreshCw } from 'lucide-react';

export const BrandStory: React.FC = () => {
  return (
    <section id="story" className="py-20 bg-[#F4EFE6] relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -z-10 w-96 h-96 bg-[#277e4e]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Intro */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#DCD5C5] text-[#1c643b] text-xs font-bold tracking-widest uppercase">
            <Leaf className="w-3.5 h-3.5" />
            <span>OUR BRAND PHILOSOPHY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#123826] tracking-tight">
            為什麼是「植燃」？<br />
            運動，不該喝下一肚子化學人工添加
          </h2>
          <p className="text-base text-[#526458] leading-relaxed">
            市面上的傳統運動飲料，常充斥著刺眼的亮藍或螢光黃人工色素、高果糖糖漿與人工防腐劑。
            在我們揮灑汗水、追求極致健康的同時，身體卻悄悄承受著非必要的化學負擔。
          </p>
        </div>

        {/* Narrative Box */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8E2D5] shadow-xs mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#123826] text-white flex items-center justify-center font-black text-2xl">
                  植
                </div>
                <div className="text-xl font-bold text-[#123826]">
                  萬物初始的純淨植萃力量
                </div>
              </div>
              <p className="text-sm sm:text-base text-[#4b5c51] leading-relaxed">
                「植」代表大自然萬物最初始的生命原萃。我們走訪台灣有機農園與深山茶園，
                挑選屏東友善農法青檸、冷萃高山白茶、野生刺五加與純淨深層海水礦物質。
                以真正的植物原汁與草本萃取，代替廉價的化學香精調味。
              </p>

              <div className="flex items-center gap-3 pt-2">
                <div className="w-12 h-12 rounded-2xl bg-[#277e4e] text-white flex items-center justify-center font-black text-2xl">
                  燃
                </div>
                <div className="text-xl font-bold text-[#123826]">
                  點燃肌能耐力，突破體能極限
                </div>
              </div>
              <p className="text-sm sm:text-base text-[#4b5c51] leading-relaxed">
                「燃」代表運動員燃燒體能、揮灑熱血的動力。透過瓜拿納植物性咖啡因、綠茶多酚 EGCG 與黃金比例電解質，
                協同啟動體內線粒體代謝動能。每一滴「植燃」，都是你在訓練跑道與攀登峰頂時最堅定無懼的原生夥伴。
              </p>
            </div>

            {/* Right Quote Card */}
            <div className="lg:col-span-5 bg-[#FAF8F5] rounded-2xl p-6 sm:p-8 border border-[#E2DBD0] relative">
              <div className="text-4xl text-[#277e4e]/30 font-serif leading-none mb-3">“</div>
              <p className="text-sm text-[#27382f] italic font-medium leading-relaxed mb-6">
                我們始終相信：大自然在千百年演化中，早已為人體準備好最頂級的運動能量。
                好的運動飲料不需要人工染劑，植物自然釋放的光澤與微甘，就是最純粹的禮讚。
              </p>
              <div className="pt-4 border-t border-[#E8E2D5] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#123826]">植燃 研發團隊與運動營養師</div>
                  <div className="text-[11px] text-[#718277]">BOTANIC BURN R&D Lab, Taiwan</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#123826] text-white flex items-center justify-center text-xs font-bold">
                  🌱
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="bg-white rounded-3xl p-8 border border-[#E8E2D5] space-y-4 hover:border-[#277e4e] transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-[#e8f5ec] text-[#277e4e] flex items-center justify-center">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#123826]">
              1. 100% 植物來源
            </h3>
            <p className="text-xs sm:text-sm text-[#526458] leading-relaxed">
              堅持 0 人工合成色素、0 苯甲酸防腐劑、0 塑化劑。選用台灣在地農友青檸、紫蘇與冷浸高山白茶，保留完整天然植化素與兒茶素。
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white rounded-3xl p-8 border border-[#E8E2D5] space-y-4 hover:border-[#277e4e] transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-[#e8f5ec] text-[#277e4e] flex items-center justify-center">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#123826]">
              2. 黃金等滲透壓分子
            </h3>
            <p className="text-xs sm:text-sm text-[#526458] leading-relaxed">
              精準控制滲透壓於 280-300 mOsm/kg，與人體體液完全平衡。水分與電解質不經多餘胃腸等待，直接由腸道微絨毛 3.2 倍速吸收，避免顛頗脹氣。
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white rounded-3xl p-8 border border-[#E8E2D5] space-y-4 hover:border-[#277e4e] transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-[#e8f5ec] text-[#277e4e] flex items-center justify-center">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#123826]">
              3. 友善土地與永續低碳
            </h3>
            <p className="text-xs sm:text-sm text-[#526458] leading-relaxed">
              全系列採用 100% 可回收 rPET 環保減碳輕量瓶身與無金屬印刷標籤。支持台灣小農友善農法，減少運送碳足跡，與地球共好。
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
