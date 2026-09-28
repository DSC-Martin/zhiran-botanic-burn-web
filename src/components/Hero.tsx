import React from 'react';
import { ArrowRight, Leaf, Zap, ShieldCheck, Droplets } from 'lucide-react';
import { bannerImg } from '../data/defaultProducts';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24">
      {/* Background soft botanical gradients */}
      <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-[#d7ede0]/40 rounded-full blur-3xl pointer-events-none transform translate-x-1/3 -translate-y-1/4"></div>
      <div className="absolute bottom-0 left-0 -z-10 w-[450px] h-[450px] bg-[#f2e7d3]/50 rounded-full blur-3xl pointer-events-none transform -translate-x-1/4"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Copy */}
          <div className="lg:col-span-7 space-y-6">
            {/* Pill tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8f5ec] border border-[#c4e6ce] text-[#164a2f] text-xs font-semibold tracking-wide">
              <Leaf className="w-3.5 h-3.5 text-[#277e4e]" />
              <span>新世代植物系等滲透補給飲</span>
            </div>

            {/* Main Catchphrase */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#123826] tracking-tight leading-[1.15]">
              點燃原生體能<br />
              <span className="text-[#277e4e] relative inline-block">
                來自純粹植物萃取
                <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 5.5C40 2 120 1.5 199 5.5" stroke="#3bd37c" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#526458] leading-relaxed max-w-2xl">
              告別化學螢光色素與人工果糖糖漿。「植燃」以刺五加、綠茶多酚、深層海洋水濃縮電解質與天然椰子水，
              打造黃金等滲透壓分子。運動中快速深入細胞補水，點燃代謝動能，告別腹脹負擔。
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#catalog"
                className="bg-[#123826] hover:bg-[#1c5234] text-white text-base font-semibold px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>探索全系列風味</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#3bd37c]" />
              </a>

              <a
                href="#story"
                className="border-2 border-[#123826]/20 hover:border-[#123826] text-[#123826] hover:bg-[#FAF8F5] text-base font-semibold px-6 py-3.5 rounded-full transition-all cursor-pointer"
              >
                品牌故事與堅持
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-[#E8E2D5] grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#e8f5ec] text-[#1c643b] flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#123826]">3.2 倍速</div>
                  <div className="text-[11px] text-[#596b60]">等滲透細胞吸收</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#e8f5ec] text-[#1c643b] flex items-center justify-center shrink-0">
                  <Droplets className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#123826]">4大電解質</div>
                  <div className="text-[11px] text-[#596b60]">鈉・鉀・鎂・鈣</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#e8f5ec] text-[#1c643b] flex items-center justify-center shrink-0">
                  <Leaf className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#123826]">0 化學色素</div>
                  <div className="text-[11px] text-[#596b60]">100% 植物原萃色</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#e8f5ec] text-[#1c643b] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#123826]">零運動禁藥</div>
                  <div className="text-[11px] text-[#596b60]">SGS多重檢驗合格</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative Frame */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#277e4e]/20 to-[#e8f5ec] rounded-3xl -rotate-1"></div>
              
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-stone-100">
                <img
                  src={bannerImg}
                  alt="植燃 BOTANIC BURN 植物系運動飲料"
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#102d1f]/90 via-[#102d1f]/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="inline-block px-2.5 py-1 bg-[#2fc26f] text-stone-900 rounded font-bold text-xs uppercase tracking-wider mb-2 self-start">
                    2026 年度旗艦款
                  </div>
                  <div className="text-xl font-bold text-white tracking-wide">
                    植燃 綜合機能能量全系列
                  </div>
                  <p className="text-xs text-stone-200 mt-1">
                    全台專業運動員、馬拉松跑者與健身愛好者口碑一致推薦
                  </p>
                </div>
              </div>

              {/* Floating Quote Card */}
              <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-xl border border-[#E8E2D5] max-w-[240px] hidden sm:block">
                <div className="flex items-center gap-2 text-[#277e4e] mb-1">
                  <span className="text-xs font-bold">★ 運動營養師推薦</span>
                </div>
                <p className="text-xs text-[#2c3e35] leading-snug">
                  「極少見純天然草本且能做到完美等滲透壓的補給飲，喝起來清爽零負擔。」
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
