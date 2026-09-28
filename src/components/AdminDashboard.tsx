import React, { useState, useEffect } from 'react';
import { 
  Package, 
  DollarSign, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  RefreshCw, 
  Mail, 
  Search, 
  SlidersHorizontal,
  ExternalLink,
  LogOut,
  Sparkles,
  AlertTriangle,
  Clock
} from 'lucide-react';
import { collection, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { handleFirestoreError, OperationType } from '../firebase/errors';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { Product, ContactMessage } from '../types';
import { ProductEditModal } from './ProductEditModal';

interface AdminDashboardProps {
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const { user, signOut, isAdmin } = useAuth();
  const { 
    products, 
    updateProductPrice, 
    updateProduct, 
    deleteProduct, 
    seedDefaultCatalog,
    isFirestoreSynced
  } = useProducts();

  const [activeTab, setActiveTab] = useState<'products' | 'messages'>('products');
  const [search, setSearch] = useState('');
  
  // Quick inline price editing state
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [inlinePriceValue, setInlinePriceValue] = useState<number>(0);

  // Edit / Add product modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProductToEdit, setSelectedProductToEdit] = useState<Product | null>(null);

  // Delete confirmation
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Contact messages
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(true);
  const [messageFilter, setMessageFilter] = useState<'all' | 'pending' | 'resolved'>('all');

  // Load contact messages only when authenticated as admin
  useEffect(() => {
    if (!user || !isAdmin) {
      setMessages([]);
      setMessagesLoading(false);
      return;
    }
    const messagesRef = collection(db, 'contactMessages');
    const unsub = onSnapshot(
      messagesRef,
      (snapshot) => {
        const list: ContactMessage[] = [];
        snapshot.forEach((docSnap) => {
          const d = docSnap.data();
          list.push({
            id: docSnap.id,
            name: d.name || '',
            email: d.email || '',
            phone: d.phone || '',
            subject: d.subject || '',
            message: d.message || '',
            type: d.type || 'general',
            status: d.status || 'pending',
            createdAt: d.createdAt?.toDate?.()?.toLocaleString?.() || '剛才',
          });
        });
        setMessages(list);
        setMessagesLoading(false);
      },
      (error) => {
        console.error('Contact messages error:', error);
        handleFirestoreError(error, OperationType.GET, 'contactMessages');
      }
    );
    return () => unsub();
  }, [user, isAdmin]);

  const handleQuickPriceSave = async (id: string) => {
    if (inlinePriceValue > 0) {
      await updateProductPrice(id, inlinePriceValue);
    }
    setEditingPriceId(null);
  };

  const handleToggleStock = async (product: Product) => {
    await updateProduct(product.id, { inStock: !product.inStock });
  };

  const handleDeleteProduct = async (id: string) => {
    await deleteProduct(id);
    setDeleteConfirmId(null);
  };

  const handleToggleMessageStatus = async (msgId: string, currentStatus?: string) => {
    try {
      const docRef = doc(db, 'contactMessages', msgId);
      await updateDoc(docRef, {
        status: currentStatus === 'resolved' ? 'pending' : 'resolved',
      });
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `contactMessages/${msgId}`);
    }
  };

  const filteredProducts = products.filter((p) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.flavor.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  const filteredMessages = messages.filter((m) => {
    if (messageFilter === 'all') return true;
    return m.status === messageFilter;
  });

  return (
    <div className="flex flex-col h-full bg-[#FAF8F5]">
      {/* Top Admin Navbar */}
      <header className="bg-[#123826] text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-[#24583c] shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#277e4e] flex items-center justify-center font-bold text-base">
            植
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-wide">植燃 品牌後台管理系統</span>
              <span className="text-[10px] bg-[#3bd37c] text-stone-900 font-bold px-2 py-0.5 rounded-full">
                ADMIN
              </span>
            </div>
            <div className="text-[11px] text-stone-300">
              登入管理員帳號：{user?.email}
            </div>
          </div>
        </div>

        {/* Tab switcher & actions */}
        <div className="flex items-center gap-3">
          <div className="bg-[#1a4a33] p-1 rounded-xl flex items-center text-xs">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'products'
                  ? 'bg-white text-[#123826] font-bold shadow-xs'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>商品目錄與定價 ({products.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'messages'
                  ? 'bg-white text-[#123826] font-bold shadow-xs'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>顧客留言洽詢 ({messages.length})</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="bg-[#277e4e] hover:bg-[#349961] text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
          >
            返回前台官網
          </button>

          <button
            onClick={signOut}
            className="text-stone-400 hover:text-white p-2 rounded-xl transition-colors cursor-pointer"
            title="登出管理員"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 overflow-y-auto p-6 max-w-7xl mx-auto w-full">
        {/* Products Management Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            
            {/* Top Stat & Control Bar */}
            <div className="bg-white p-5 rounded-3xl border border-[#E8E2D5] shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="relative w-72">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    placeholder="搜尋商品名稱、風味或系列..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#D5CEBF] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#277e4e]"
                  />
                </div>
                <span className="text-xs text-[#526458]">
                  共 {products.length} 項商品
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedProductToEdit(null);
                    setEditModalOpen(true);
                  }}
                  className="bg-[#123826] hover:bg-[#1c5234] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5 text-[#3bd37c]" />
                  <span>新增商品</span>
                </button>

                <button
                  onClick={seedDefaultCatalog}
                  className="bg-[#FAF8F5] hover:bg-[#F2ECE1] border border-[#D5CEBF] text-[#123826] text-xs font-semibold px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                  title="將範本商品完整同步儲存至 Firestore 雲端資料庫"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#277e4e]" />
                  <span>同步範本商品至雲端</span>
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-3xl border border-[#E8E2D5] shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#F4EFE6] border-b border-[#E8E2D5] text-[#526458] font-bold">
                      <th className="py-3.5 px-4 w-14">預覽</th>
                      <th className="py-3.5 px-4">商品名稱 / 副標</th>
                      <th className="py-3.5 px-4">風味 & 系列</th>
                      <th className="py-3.5 px-4">規格</th>
                      <th className="py-3.5 px-4 text-right">建議售價 (點擊可即改)</th>
                      <th className="py-3.5 px-4 text-center">庫存狀態</th>
                      <th className="py-3.5 px-4 text-center">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8E2D5]">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-[#FAF8F5] transition-colors">
                        {/* Image Thumbnail */}
                        <td className="py-3 px-4">
                          <img
                            src={p.imageUrl}
                            alt={p.name}
                            className="w-10 h-10 rounded-lg object-cover bg-stone-100 border border-[#E8E2D5]"
                          />
                        </td>

                        {/* Name */}
                        <td className="py-3 px-4">
                          <div className="font-bold text-[#123826]">{p.name}</div>
                          <div className="text-[10px] text-[#718276]">{p.subName}</div>
                          {p.tag && (
                            <span className="inline-block px-1.5 py-0.5 rounded text-[9px] bg-[#e8f5ec] text-[#277e4e] font-semibold mt-0.5">
                              {p.tag}
                            </span>
                          )}
                        </td>

                        {/* Flavor & Category */}
                        <td className="py-3 px-4">
                          <div className="font-semibold text-[#277e4e]">{p.flavor}</div>
                          <div className="text-[10px] text-[#718276]">{p.category}</div>
                        </td>

                        {/* Volume */}
                        <td className="py-3 px-4 text-[#526458]">
                          {p.volume}
                        </td>

                        {/* Price (Quick Editable!) */}
                        <td className="py-3 px-4 text-right">
                          {editingPriceId === p.id ? (
                            <div className="flex items-center justify-end gap-1">
                              <span className="text-[11px] font-bold text-[#123826]">NT$</span>
                              <input
                                type="number"
                                autoFocus
                                value={inlinePriceValue}
                                onChange={(e) => setInlinePriceValue(Number(e.target.value))}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleQuickPriceSave(p.id);
                                  if (e.key === 'Escape') setEditingPriceId(null);
                                }}
                                className="w-16 px-1.5 py-1 text-xs border border-[#277e4e] rounded font-bold text-[#123826] bg-white text-right focus:outline-none"
                              />
                              <button
                                onClick={() => handleQuickPriceSave(p.id)}
                                className="p-1 bg-[#123826] text-[#3bd37c] rounded hover:bg-[#1c5234]"
                                title="確認修改"
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setEditingPriceId(null)}
                                className="p-1 text-stone-400 hover:text-stone-600 rounded"
                                title="取消"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <div
                              onClick={() => {
                                setEditingPriceId(p.id);
                                setInlinePriceValue(p.price);
                              }}
                              className="inline-flex items-center gap-1.5 group cursor-pointer hover:bg-emerald-50 px-2 py-1 rounded-lg transition-colors"
                              title="點擊直接修改售價"
                            >
                              <span className="font-black text-sm text-[#123826]">
                                NT$ {p.price}
                              </span>
                              {p.originalPrice && (
                                <span className="text-[10px] text-stone-400 line-through">
                                  {p.originalPrice}
                                </span>
                              )}
                              <Edit3 className="w-3 h-3 text-stone-400 group-hover:text-[#277e4e] transition-colors" />
                            </div>
                          )}
                        </td>

                        {/* Stock toggle */}
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => handleToggleStock(p)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-all ${
                              p.inStock
                                ? 'bg-[#e8f5ec] text-[#277e4e] hover:bg-[#d8eedf]'
                                : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
                            }`}
                          >
                            {p.inStock ? '供應中' : '售罄缺貨'}
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => {
                                setSelectedProductToEdit(p);
                                setEditModalOpen(true);
                              }}
                              className="p-1.5 rounded-lg text-[#123826] hover:bg-[#F4EFE6] transition-colors cursor-pointer"
                              title="編輯詳細資訊"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            {deleteConfirmId === p.id ? (
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => handleDeleteProduct(p.id)}
                                  className="px-2 py-0.5 bg-red-600 text-white rounded text-[10px] font-bold"
                                >
                                  確認刪除
                                </button>
                                <button
                                  onClick={() => setDeleteConfirmId(null)}
                                  className="text-[10px] text-stone-500 hover:text-stone-800"
                                >
                                  取消
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setDeleteConfirmId(p.id)}
                                className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                title="刪除商品"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* Contact Messages Tab */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-3xl border border-[#E8E2D5] shadow-xs flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#123826]">
                  官網顧客留言與批發洽詢記錄
                </h3>
                <p className="text-xs text-[#526458]">
                  來自官網「聯絡我們」表單的即時留言，資料直接寫入 Firestore 資料庫。
                </p>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMessageFilter('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer ${
                    messageFilter === 'all'
                      ? 'bg-[#123826] text-white'
                      : 'bg-[#FAF8F5] text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  全部 ({messages.length})
                </button>
                <button
                  onClick={() => setMessageFilter('pending')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer ${
                    messageFilter === 'pending'
                      ? 'bg-[#123826] text-white'
                      : 'bg-[#FAF8F5] text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  待處理 ({messages.filter((m) => m.status === 'pending').length})
                </button>
                <button
                  onClick={() => setMessageFilter('resolved')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer ${
                    messageFilter === 'resolved'
                      ? 'bg-[#123826] text-white'
                      : 'bg-[#FAF8F5] text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  已處理 ({messages.filter((m) => m.status === 'resolved').length})
                </button>
              </div>
            </div>

            {/* Messages List */}
            {filteredMessages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className="bg-white rounded-2xl p-5 border border-[#E8E2D5] shadow-xs space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F4EFE6] text-[#226b43]">
                          {msg.type === 'wholesale' ? '團購批發' : msg.type === 'sponsorship' ? '賽事贊助' : '顧客諮詢'}
                        </span>
                        <span className="text-[10px] text-stone-400">
                          {msg.createdAt}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-[#123826]">
                        {msg.name}
                      </h4>
                      <div className="text-xs text-[#526458] space-y-0.5 mt-1">
                        <div>Email: <a href={`mailto:${msg.email}`} className="text-[#277e4e] hover:underline">{msg.email}</a></div>
                        {msg.phone && <div>電話: <a href={`tel:${msg.phone}`} className="text-[#277e4e] hover:underline">{msg.phone}</a></div>}
                      </div>

                      <div className="mt-3 p-3 bg-[#FAF8F5] rounded-xl text-xs text-[#33443a] leading-relaxed border border-[#E8E2D5]">
                        {msg.message}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#F2ECE1] flex items-center justify-between">
                      <span className={`text-[10px] font-semibold ${msg.status === 'resolved' ? 'text-[#277e4e]' : 'text-amber-700'}`}>
                        狀態：{msg.status === 'resolved' ? '✓ 已聯繫處理' : '⏳ 待聯絡'}
                      </span>
                      {msg.id && (
                        <button
                          onClick={() => handleToggleMessageStatus(msg.id!, msg.status)}
                          className="text-xs font-bold text-[#123826] hover:text-[#277e4e] underline cursor-pointer"
                        >
                          標記為{msg.status === 'resolved' ? '待處理' : '已處理'}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 text-center rounded-3xl border border-[#E8E2D5] text-stone-500 text-xs">
                尚無符合條件的洽詢留言。
              </div>
            )}
          </div>
        )}
      </main>

      {/* Product Edit / Add Modal */}
      <ProductEditModal
        product={selectedProductToEdit}
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedProductToEdit(null);
        }}
      />
    </div>
  );
};
