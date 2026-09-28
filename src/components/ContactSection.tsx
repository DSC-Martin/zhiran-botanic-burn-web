import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, MessageSquare } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { handleFirestoreError, OperationType } from '../firebase/errors';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState<'general' | 'wholesale' | 'sponsorship'>('wholesale');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMessage('請完整填寫姓名、電子郵件與留言內容');
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    try {
      const messagesRef = collection(db, 'contactMessages');
      await addDoc(messagesRef, {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || '',
        subject: `[${type === 'wholesale' ? '批發團購' : type === 'sponsorship' ? '賽事贊助' : '顧客諮詢'}] 來自 ${name}`,
        message: message.trim(),
        type,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (error) {
      console.error('Contact submission error:', error);
      handleFirestoreError(error, OperationType.CREATE, 'contactMessages');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#FAF8F5] border-t border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#DCD5C5] text-[#1c643b] text-xs font-bold tracking-widest uppercase">
            <Mail className="w-3.5 h-3.5" />
            <span>CONTACT & COOPERATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#123826] tracking-tight">
            聯絡我們・開啟合作契機
          </h2>
          <p className="text-base text-[#526458] leading-relaxed">
            無論是企業團購、賽事補給贊助、實體通路經銷或是對植燃飲品的任何寶貴回饋，我們都期待與您交流。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-[#E8E2D5] space-y-6">
              <h3 className="text-xl font-bold text-[#123826]">
                植燃 生技機能研發中心
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#e8f5ec] text-[#277e4e] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#123826]">品牌體驗所與辦公室</div>
                    <div className="text-xs text-[#526458] mt-0.5">台北市信義區松仁路 100 號 28 樓</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#e8f5ec] text-[#277e4e] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#123826]">客服與企業專線</div>
                    <div className="text-xs text-[#526458] mt-0.5">0800-888-299 / (02) 2722-5888</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#e8f5ec] text-[#277e4e] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#123826]">官方電子郵件</div>
                    <div className="text-xs text-[#526458] mt-0.5">hello@botanicburn.com.tw</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#e8f5ec] text-[#277e4e] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#123826]">服務時間</div>
                    <div className="text-xs text-[#526458] mt-0.5">週一至週五 09:30 - 18:30 (例假日除外)</div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F2ECE1]">
                <div className="text-xs font-semibold text-[#123826] mb-2">官方 LINE@ 專人快速回覆</div>
                <div className="inline-flex items-center gap-2 bg-[#06C755]/10 text-[#059b42] px-3.5 py-1.5 rounded-full text-xs font-bold">
                  <span>@botanicburn_tw</span>
                </div>
              </div>
            </div>

            {/* Quality badges card */}
            <div className="bg-[#e8f5ec] rounded-2xl p-6 border border-[#c6e6d1] text-xs text-[#1f4a30] space-y-1.5">
              <div className="font-bold text-[#123826]">食品安全與國際品質檢驗</div>
              <p>本公司全品項運動飲料皆通過 HACCP、ISO22000 國際食品認證，並經 SGS 檢驗零重金屬、零塑化劑與無運動禁用物質。</p>
            </div>
          </div>

          {/* Right: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E8E2D5] shadow-xs">
              <h3 className="text-2xl font-bold text-[#123826] mb-2">
                線上洽詢表單
              </h3>
              <p className="text-xs text-[#596b60] mb-6">
                收到您的需求後，專屬品牌顧問將於一個工作天內主動與您聯繫。
              </p>

              {submitted ? (
                <div className="bg-[#e8f5ec] border border-[#c4e6ce] rounded-2xl p-8 text-center space-y-3 animate-in fade-in">
                  <CheckCircle2 className="w-12 h-12 text-[#277e4e] mx-auto" />
                  <h4 className="text-lg font-bold text-[#123826]">
                    訊息已成功送出！
                  </h4>
                  <p className="text-xs text-[#3a5746] max-w-md mx-auto">
                    感謝您對「植燃」的支持。我們已收到您的洽詢，專人將盡快與您聯絡。
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 inline-block bg-[#123826] text-white text-xs font-bold px-6 py-2.5 rounded-xl cursor-pointer hover:bg-[#1c5234] transition-all"
                  >
                    再發送一則訊息
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                      {errorMessage}
                    </div>
                  )}

                  {/* Inquiry Type Radio / Buttons */}
                  <div>
                    <label className="block text-xs font-bold text-[#123826] mb-2">
                      洽詢主題類型 *
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setType('wholesale')}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          type === 'wholesale'
                            ? 'bg-[#123826] text-white border-[#123826]'
                            : 'bg-[#FAF8F5] text-[#425449] border-[#E8E2D5] hover:bg-[#F4EFE6]'
                        }`}
                      >
                        團購與批發
                      </button>
                      <button
                        type="button"
                        onClick={() => setType('sponsorship')}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          type === 'sponsorship'
                            ? 'bg-[#123826] text-white border-[#123826]'
                            : 'bg-[#FAF8F5] text-[#425449] border-[#E8E2D5] hover:bg-[#F4EFE6]'
                        }`}
                      >
                        賽事與團隊贊助
                      </button>
                      <button
                        type="button"
                        onClick={() => setType('general')}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          type === 'general'
                            ? 'bg-[#123826] text-white border-[#123826]'
                            : 'bg-[#FAF8F5] text-[#425449] border-[#E8E2D5] hover:bg-[#F4EFE6]'
                        }`}
                      >
                        顧客諮詢與反饋
                      </button>
                    </div>
                  </div>

                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#123826] mb-1.5">
                        您的姓名 / 單位名稱 *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="例：王大明 / 台北疾風跑團"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#D5CEBF] bg-[#FAF8F5] text-xs text-[#1c2a22] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#277e4e]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#123826] mb-1.5">
                        聯絡電話
                      </label>
                      <input
                        type="tel"
                        placeholder="例：0912-345-678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#D5CEBF] bg-[#FAF8F5] text-xs text-[#1c2a22] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#277e4e]"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-[#123826] mb-1.5">
                      電子郵件 *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="example@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D5CEBF] bg-[#FAF8F5] text-xs text-[#1c2a22] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#277e4e]"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold text-[#123826] mb-1.5">
                      洽詢詳細內容 *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="請描述預估需求箱數、賽事日期、預計配送地點或其他問題..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D5CEBF] bg-[#FAF8F5] text-xs text-[#1c2a22] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#277e4e]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#123826] hover:bg-[#1c5234] text-white font-bold text-xs py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow"
                  >
                    {submitting ? (
                      <span>送出中...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 text-[#3bd37c]" />
                        <span>確認送出洽詢</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
