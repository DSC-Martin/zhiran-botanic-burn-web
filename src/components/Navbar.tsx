import React, { useState } from 'react';
import { 
  Sparkles, 
  Menu, 
  X, 
  Settings, 
  UserCheck, 
  Search, 
  ExternalLink 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAdmin, setAdminModalOpen, signOut } = useAuth();
  const { searchQuery, setSearchQuery } = useProducts();

  const navLinks = [
    { name: '商品目錄', href: '#catalog' },
    { name: '風味分類', href: '#flavors' },
    { name: '品牌故事', href: '#story' },
    { name: '科學配方', href: '#science' },
    { name: '哪裡買', href: '#retail' },
    { name: '聯絡合作', href: '#contact' },
  ];

  return (
    <>
      {/* Admin Quick Banner when logged in */}
      {isAdmin && (
        <div className="bg-[#123826] text-[#e8f7ee] text-xs py-2 px-4 border-b border-[#24583c] flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3bd37c] animate-pulse"></span>
              <span className="font-medium">管理員模式已啟用（{user?.email}）</span>
              <span className="hidden md:inline text-emerald-300/70">・您可隨時更新商品與調整價格</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setAdminModalOpen(true)}
                className="bg-[#277e4e] hover:bg-[#2fc26f] hover:text-stone-900 transition-colors px-3 py-1 rounded text-white font-medium flex items-center gap-1.5 cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>開啟後台管理系統</span>
              </button>
              <button
                onClick={signOut}
                className="text-stone-300 hover:text-white underline cursor-pointer text-xs"
              >
                登出
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <header className={`sticky ${isAdmin ? 'top-[33px]' : 'top-0'} z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8E2D5] transition-all`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-[#123826] text-[#FAF8F5] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                <span className="font-bold text-xl leading-none tracking-tighter">植</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-black tracking-wider text-[#123826]">植燃</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-[#e8f5ec] text-[#1c643b]">
                    BOTANIC BURN
                  </span>
                </div>
                <span className="text-[10px] text-[#596b60] tracking-wider">
                  植物系等滲透能量補給
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-[#2d3f35] hover:text-[#1c643b] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#277e4e] hover:after:w-full after:transition-all"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden sm:flex items-center gap-4">
              <a
                href="#catalog"
                className="bg-[#123826] hover:bg-[#1c5234] text-[#FAF8F5] text-sm font-semibold px-5 py-2.5 rounded-full shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>探索飲品</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#3bd37c]"></span>
              </a>

              {/* Discreet Admin Entrance if logged in */}
              {isAdmin && (
                <button
                  onClick={() => setAdminModalOpen(true)}
                  className="p-2.5 rounded-full border border-[#d8d2c4] hover:bg-[#ede7da] text-[#123826] transition-colors cursor-pointer"
                  title="商品後台管理"
                >
                  <Settings className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-[#123826] hover:bg-[#efe9dc] transition-colors"
                aria-label="選單開關"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden bg-[#FAF8F5] border-b border-[#E8E2D5] px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-base font-medium text-[#1c2a22] hover:bg-[#efe8dc] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-[#E8E2D5] flex flex-col gap-2">
              <a
                href="#catalog"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-[#123826] text-white py-2.5 rounded-xl font-medium"
              >
                瀏覽商品系列
              </a>

              {isAdmin && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAdminModalOpen(true);
                  }}
                  className="w-full text-center border border-[#123826] text-[#123826] py-2 rounded-xl font-medium flex items-center justify-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  <span>進入後台管理</span>
                </button>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
