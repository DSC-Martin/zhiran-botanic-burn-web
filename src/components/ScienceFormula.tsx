import React, { useState } from 'react';
import { Droplets, CheckCircle, XCircle, ArrowUpRight, Activity, Clock } from 'lucide-react';

export const ScienceFormula: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'comparison' | 'timing'>('comparison');

  return (
    <section id="science" className="py-20 bg-white border-t border-b border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8f5ec] text-[#1c643b] text-xs font-bold tracking-widest uppercase">
            <Activity className="w-3.5 h-3.5 text-[#277e4e]" />
            <span>SCIENTIFIC HYDRATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#123826] tracking-tight">
            科學等滲透・為什麼比純水更能解渴？
          </h2>
          <p className="text-base text-[#526458] leading-relaxed">
            大量流汗時只喝純水，會稀釋血液中的鈉離子，引發自發性脫水；
            而傳統高糖運動飲料因高滲透壓容易引發胃部抽筋與血糖驟升。
            「植燃」精算等滲透壓，讓細胞在零負擔下極速充電。
          </p>

          {/* Toggle buttons */}
          <div className="inline-flex p-1 bg-[#FAF8F5] rounded-full border border-[#E8E2D5] mt-4">
            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'comparison'
                  ? 'bg-[#123826] text-white shadow-xs'
                  : 'text-[#526458] hover:text-[#123826]'
              }`}
            >
              配方優勢對比
            </button>
            <button
              onClick={() => setActiveTab('timing')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'timing'
                  ? 'bg-[#123826] text-white shadow-xs'
                  : 'text-[#526458] hover:text-[#123826]'
              }`}
            >
              運動階段飲用指南
            </button>
          </div>
        </div>

        {/* Tab 1: Comparison */}
        {activeTab === 'comparison' && (
          <div className="space-y-12">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[640px]">
                <thead>
                  <tr className="border-b-2 border-[#123826]">
                    <th className="py-4 px-6 text-sm font-bold text-[#526458] w-1/4">評比指標</th>
                    <th className="py-4 px-6 text-sm font-black text-[#123826] bg-[#e8f5ec]/70 rounded-t-2xl w-1/3">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#277e4e]"></span>
                        <span>植燃 BOTANIC BURN</span>
                      </div>
                    </th>
                    <th className="py-4 px-6 text-sm font-bold text-[#526458] w-1/5">傳統市售運動飲料</th>
                    <th className="py-4 px-6 text-sm font-bold text-[#526458] w-1/5">純水</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E2D5] text-xs sm:text-sm">
                  <tr>
                    <td className="py-4 px-6 font-semibold text-[#123826]">電解質來源</td>
                    <td className="py-4 px-6 font-bold text-[#164a2f] bg-[#e8f5ec]/40">
                      深層海水濃縮礦物＋天然椰子水
                    </td>
                    <td className="py-4 px-6 text-[#596b60]">人工化學合成鹽</td>
                    <td className="py-4 px-6 text-[#8c9e92]">微量或無</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-[#123826]">吸收速度與滲透壓</td>
                    <td className="py-4 px-6 font-bold text-[#164a2f] bg-[#e8f5ec]/40">
                      等滲透壓 (280-300 mOsm/kg) 3.2倍極速吸收
                    </td>
                    <td className="py-4 px-6 text-[#596b60]">高滲透壓 (較難吸收易脹氣)</td>
                    <td className="py-4 px-6 text-[#596b60]">低滲透壓 (易稀釋電解質)</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-[#123826]">糖分與熱量負擔</td>
                    <td className="py-4 px-6 font-bold text-[#164a2f] bg-[#e8f5ec]/40">
                      天然果汁微量天然醣＋甜菊糖苷 (低於 40 大卡)
                    </td>
                    <td className="py-4 px-6 text-[#596b60]">高果糖玉米糖漿 (常見 120+ 大卡)</td>
                    <td className="py-4 px-6 text-[#596b60]">0 大卡 (無動能補充)</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-[#123826]">植萃機能添加</td>
                    <td className="py-4 px-6 font-bold text-[#164a2f] bg-[#e8f5ec]/40">
                      刺五加、綠茶EGCG、瓜拿納、紫蘇OPC
                    </td>
                    <td className="py-4 px-6 text-[#596b60]">無 (多為檸檬酸＋香精)</td>
                    <td className="py-4 px-6 text-[#8c9e92]">無</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-[#123826]">色素與防腐劑</td>
                    <td className="py-4 px-6 font-bold text-[#277e4e] bg-[#e8f5ec]/40 flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-[#277e4e]" />
                      <span>0 防腐劑 / 0 化學色素</span>
                    </td>
                    <td className="py-4 px-6 text-[#b04242] flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-[#b04242]" />
                      <span>常見苯甲酸鈉、食用黃色4號</span>
                    </td>
                    <td className="py-4 px-6 text-[#596b60]">無</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 4 Electrolytes Breakdown Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
              <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#E8E2D5] space-y-2">
                <div className="text-xl font-black text-[#123826]">鈉 Na+</div>
                <div className="text-xs font-bold text-[#277e4e]">維持體液滲透壓與水分滯留</div>
                <p className="text-xs text-[#526458] leading-relaxed">
                  及時補充流汗流失的大宗離子，避免自發性脫水，維持神經脈衝正常傳遞。
                </p>
              </div>

              <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#E8E2D5] space-y-2">
                <div className="text-xl font-black text-[#123826]">鉀 K+</div>
                <div className="text-xs font-bold text-[#277e4e]">協同肌纖維收縮與代謝</div>
                <p className="text-xs text-[#526458] leading-relaxed">
                  天然椰子水富含天然鉀離子，幫助肌肉細胞糖原合成，維持平穩力量輸出。
                </p>
              </div>

              <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#E8E2D5] space-y-2">
                <div className="text-xl font-black text-[#123826]">鎂 Mg2+</div>
                <div className="text-xs font-bold text-[#277e4e]">預防運動抽筋與神經放鬆</div>
                <p className="text-xs text-[#526458] leading-relaxed">
                  深層海洋水純淨鎂離子，參與 300+ 種酵素活化，有效舒緩高張力肌肉緊繃。
                </p>
              </div>

              <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#E8E2D5] space-y-2">
                <div className="text-xl font-black text-[#123826]">鈣 Ca2+</div>
                <div className="text-xs font-bold text-[#277e4e]">強化肌肉爆發與心臟節律</div>
                <p className="text-xs text-[#526458] leading-relaxed">
                  調控肌肉興奮性收縮與放鬆循環，提供持續高功率踩踏與衝刺穩定度。
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Timing */}
        {activeTab === 'timing' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FAF8F5] rounded-3xl p-8 border border-[#E8E2D5] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#e8f5ec] text-[#277e4e] flex items-center justify-center font-bold">
                <Clock className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold text-[#277e4e] uppercase tracking-wider">
                PHASE 01 ・ 暖身前 30 分鐘
              </div>
              <h3 className="text-xl font-bold text-[#123826]">預先儲備，啟動代謝</h3>
              <p className="text-xs sm:text-sm text-[#526458] leading-relaxed">
                建議飲用 150-200ml「植燃 沁涼薄荷芭樂」或「刺五加能量機能飲」。
                植物瓜拿納與刺五加精萃有助提振專注力與心肺耐力，先行為體內細胞築好水合屏障。
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border-2 border-[#277e4e] shadow-md space-y-4 relative">
              <div className="absolute top-4 right-4 bg-[#277e4e] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                關鍵補水期
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#123826] text-white flex items-center justify-center font-bold">
                <Droplets className="w-6 h-6 text-[#3bd37c]" />
              </div>
              <div className="text-xs font-bold text-[#277e4e] uppercase tracking-wider">
                PHASE 02 ・ 運動訓練中
              </div>
              <h3 className="text-xl font-bold text-[#123826]">少量多次，持續續航</h3>
              <p className="text-xs sm:text-sm text-[#526458] leading-relaxed">
                每 15-20 分鐘小口補充 100-150ml「植燃 輕爽青檸等滲透補給飲」。
                等滲透分子無需等待即可被小腸瞬間吸收，避免劇烈晃動造成胃痛與腹脹感。
              </p>
            </div>

            <div className="bg-[#FAF8F5] rounded-3xl p-8 border border-[#E8E2D5] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#e8f5ec] text-[#277e4e] flex items-center justify-center font-bold">
                <Activity className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold text-[#277e4e] uppercase tracking-wider">
                PHASE 03 ・ 運動結束後 30 分鐘
              </div>
              <h3 className="text-xl font-bold text-[#123826]">抗氧修復，排除乳酸</h3>
              <p className="text-xs sm:text-sm text-[#526458] leading-relaxed">
                飲用 250-300ml「植燃 巨峰葡萄紫蘇」或「蜜桃白茶零糖飲」。
                高濃度花青素、兒茶素與海洋深層鎂，加速肌肉微損傷修復，快速排解運動後的全身痠沉感。
              </p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
