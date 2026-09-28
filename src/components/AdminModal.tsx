import React, { useState } from 'react';
import { X, Lock, Shield, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AdminDashboard } from './AdminDashboard';

export const AdminModal: React.FC = () => {
  const { 
    user, 
    isAdmin, 
    adminModalOpen, 
    setAdminModalOpen, 
    signInWithGoogle, 
    signOut,
    authError,
    clearAuthError,
  } = useAuth();
  const [loggingIn, setLoggingIn] = useState(false);

  if (!adminModalOpen) return null;

  // If already authenticated and has admin rights, render full dashboard
  if (isAdmin) {
    return (
      <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex flex-col animate-in fade-in duration-200">
        <AdminDashboard onClose={() => setAdminModalOpen(false)} />
      </div>
    );
  }

  // Otherwise, render sleek login modal
  const handleGoogleLogin = async () => {
    setLoggingIn(true);
    clearAuthError();
    try {
      await signInWithGoogle();
    } catch (e) {
      console.error(e);
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-[#E8E2D5] my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => setAdminModalOpen(false)}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#FAF8F5] hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="bg-[#123826] text-white p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#277e4e]/30 rounded-full blur-2xl"></div>
          
          <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] text-[#123826] flex items-center justify-center font-black text-2xl mx-auto mb-3 shadow-md">
            植
          </div>
          <h3 className="text-xl font-black tracking-wide">
            植燃 品牌管理後台
          </h3>
          <p className="text-xs text-emerald-200/80 mt-1">
            BOTANIC BURN Admin Portal
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-8 space-y-6">
          <div className="space-y-2 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8f5ec] text-[#277e4e] text-[11px] font-bold">
              <Shield className="w-3.5 h-3.5" />
              <span>僅限授權管理人員使用</span>
            </div>
            <p className="text-xs text-[#526458] leading-relaxed">
              一般顧客無法存取此區域。登入後您可隨時新增商品、修改風味規格，並即時更新商品售價與庫存狀態。
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {/* If signed in but not an authorized admin */}
          {user && !isAdmin ? (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center space-y-3">
              <div className="text-xs font-bold text-amber-900">
                帳號已登入，但尚未獲得管理員權限
              </div>
              <p className="text-[11px] text-amber-800">
                目前帳號：<span className="font-semibold">{user.email}</span>
                <br />
                請切換至授權管理員帳號（如 <span className="font-bold">martin.lee@dentsu.com</span>）或聯絡系統負責人。
              </p>
              <div className="pt-2 flex items-center justify-center gap-2">
                <button
                  onClick={signOut}
                  className="bg-amber-800 text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-amber-900 transition-colors cursor-pointer"
                >
                  切換登出
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <button
                onClick={handleGoogleLogin}
                disabled={loggingIn}
                className="w-full bg-[#123826] hover:bg-[#1c5234] text-white font-bold text-xs py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-3 cursor-pointer shadow-sm hover:shadow"
              >
                {loggingIn ? (
                  <span>正在驗證 Google 帳號...</span>
                ) : (
                  <>
                    <svg className="w-4 h-4 bg-white rounded-full p-0.5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>使用 Google 帳號快速登入後台</span>
                  </>
                )}
              </button>

              <div className="p-3 bg-[#FAF8F5] rounded-xl text-[11px] text-[#718276] text-center border border-[#E8E2D5]">
                預設管理員信箱已授權：<span className="font-semibold text-[#123826]">martin.lee@dentsu.com</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
