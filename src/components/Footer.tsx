import React from 'react';
import { Leaf, Lock, ShieldCheck, Heart, Award, ArrowUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Footer: React.FC = () => {
  const { setAdminModalOpen, isAdmin, user } = useAuth();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#102d1f] text-[#FAF8F5] pt-16 pb-12 border-t border-[#1c4d34]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-[#205238]">
          
          {/* Brand info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#277e4e] text-white flex items-center justify-center font-black text-2xl">
                植
              </div>
              <div>
                <div className="text-xl font-black tracking-wider text-white">植燃</div>
                <div className="text-[10px] text-emerald-300 font-bold uppercase tracking-widest">
                  BOTANIC BURN ISOTONIC
                </div>
              </div>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed max-w-sm">
              「植燃」專注於自然植萃等滲透機能補給。以台灣友善農耕果物、冷萃高山茶湯與深層海洋礦物質，為運動員與熱愛生活者提供最純淨充沛的原生動能。
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-stone-300">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#3bd37c]" />
                SGS 檢驗合格
              </span>
              <span>・</span>
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#3bd37c]" />
                ISO22000 / HACCP
              </span>
              <span>・</span>
              <span>零運動禁藥</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#3bd37c]">
              系列商品型錄
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li><a href="#catalog" className="hover:text-white transition-colors">青檸萊姆等滲透補給飲</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">沁涼薄荷芭樂耐力飲</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">蜜桃白茶零糖輕盈飲</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">刺五加能量原萃機能飲</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">巨峰葡萄紫蘇抗氧飲</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">24入綜合全風味禮箱</a></li>
            </ul>
          </div>

          {/* Service & info */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#3bd37c]">
              品牌與服務據點
            </h4>
            <div className="space-y-2 text-xs text-stone-300">
              <div>客服電話：0800-888-299</div>
              <div>商務諮詢：hello@botanicburn.com.tw</div>
              <div>展示中心：台北市信義區松仁路 100 號 28 樓</div>
              <div>服務時間：週一至週五 09:30 - 18:30</div>
            </div>

            <div className="pt-2">
              <a
                href="#contact"
                className="inline-block bg-[#1a4a33] hover:bg-[#277e4e] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all cursor-pointer"
              >
                申請團購批發 / 賽事贊助
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-400">
          <div>
            © {new Date().getFullYear()} 植燃生技機能股份有限公司 BOTANIC BURN Inc. 保留所有權利。
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>回到頂部</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>

            {/* Discreet Admin Entrance for staff */}
            <button
              onClick={() => setAdminModalOpen(true)}
              className="text-stone-500 hover:text-stone-300 flex items-center gap-1.5 cursor-pointer transition-colors"
              title="管理人員專用登入入口"
            >
              <Lock className="w-3 h-3" />
              <span>{isAdmin ? '後台管理模式 (已登入)' : '管理員專區'}</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
