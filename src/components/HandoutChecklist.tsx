/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { HandoutItem } from '../types';
import { Check, Square, Plus, Trash2, ArrowLeft, Download, FileText, Search, Tag, Server } from 'lucide-react';

const INITIAL_HANDOUTS: HandoutItem[] = [
  {
    id: 'h1',
    title: "Cẩm nang tra cứu hành vi DISC tại công sở Ngân hàng",
    category: 'Tài liệu học tập',
    description: "Tóm tắt hành vi đặc thù trực diện nhóm D, I, S, C trong tác nghiệp liên phòng ban, giao dịch đối ngoại tại Chi nhánh.",
  },
  {
    id: 'h2',
    title: "Bộ thẻ 6 Chiếc mũ tư duy trong học thuật & tranh biện",
    category: 'Công cụ bổ trợ',
    description: "Hệ thống câu hỏi gợi mở định hướng tương ứng với 6 chiếc mũ tư duy giúp điều phối buổi thảo luận hiệu quả.",
  },
  {
    id: 'h3',
    title: "Biểu mẫu báo cáo Daily Standup định dạng Agile 15 phút",
    category: 'Biểu mẫu thực hành',
    description: "Bảng phân tích 3 câu hỏi kết hợp quy trình Parking Lot chuẩn chỉnh cho buổi họp giao ban đầu ngày.",
  },
  {
    id: 'h4',
    title: "Slide bài giảng: Kỹ năng quản trị xung đột đội nhóm",
    category: 'Tài liệu học tập',
    description: "Slide bài giảng chính thức mô tả 5 trở ngại cốt lõi của Lencioni và các phương pháp giải quyết mâu thuẫn.",
  },
  {
    id: 'h5',
    title: "Thẻ kẹp bảng tên: Nhận diện tính cách nhanh",
    category: 'Công cụ bổ trợ',
    description: "Nguyên tắc tóm tắt giao tiếp hiệu quả cho từng nhóm tính cách để người học sử dụng hàng ngày tại văn phòng.",
  }
];

interface HandoutChecklistProps {
  onBack: () => void;
  isEnglish?: boolean;
}

export default function HandoutChecklist({ onBack, isEnglish = false }: HandoutChecklistProps) {
  const [handouts, setHandouts] = useState<HandoutItem[]>(() => {
    const saved = localStorage.getItem('it_toolkit_handouts');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return INITIAL_HANDOUTS; }
    }
    return INITIAL_HANDOUTS;
  });

  const [checkedIds, setCheckedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('it_toolkit_checked_handouts');
    return saved ? JSON.parse(saved) : [];
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'Tài liệu học tập' | 'Công cụ bổ trợ' | 'Biểu mẫu thực hành'>('Tài liệu học tập');
  const [newDesc, setNewDesc] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    localStorage.setItem('it_toolkit_handouts', JSON.stringify(handouts));
  }, [handouts]);

  useEffect(() => {
    localStorage.setItem('it_toolkit_checked_handouts', JSON.stringify(checkedIds));
  }, [checkedIds]);

  const toggleCheck = (id: string) => {
    setCheckedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleAddHandout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: HandoutItem = {
      id: 'custom-' + Date.now(),
      title: newTitle.trim(),
      category: newCategory,
      description: newDesc.trim() || "Tài liệu tự bổ sung bởi học viên.",
      isCustom: true
    };

    setHandouts(prev => [newItem, ...prev]);
    setNewTitle('');
    setNewDesc('');
    setShowAddForm(false);
  };

  const handleDeleteCustom = (id: string) => {
    setHandouts(prev => prev.filter(item => item.id !== id));
    setCheckedIds(prev => prev.filter(item => item !== id));
  };

  const simulateDownload = (item: HandoutItem) => {
    // Elegant simulation of generating and downloading file
    const content = `INTEGRATED LEARNING TOOLKIT\n\nTên tài liệu: ${item.title}\nPhân loại: ${item.category}\nMô tả: ${item.description}\n\nXem thêm tài liệu chi tiết tại Thư viện Module Core của ứng dụng.\n© Học viện Chuyên gia.`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${item.title.toLowerCase().replace(/\s+/g, '_')}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredHandouts = handouts.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const percentChecked = Math.round((checkedIds.filter(id => handouts.some(h => h.id === id)).length / handouts.length) * 100) || 0;

  return (
    <div id="handouts-section" className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden text-slate-900 transition-all duration-300">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 flex items-center justify-between border-b border-slate-850">
        <div>
          <button 
            id="handouts-back"
            onClick={onBack} 
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium mb-3"
          >
            <ArrowLeft className="w-4 h-4" /> Quay lại Dashboard
          </button>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">Checklist Vật Dụng & Phát Tay (Handouts)</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">Đảm bảo bạn đã nhận đầy đủ, chuẩn bị chỉn chu mọi vũ khí học thuật trước và trong buổi học.</p>
        </div>
        <div className="hidden md:flex bg-slate-800 p-3 rounded-full text-blue-400 border border-slate-750">
          <FileText className="w-6 h-6" />
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {/* Progress Tracker Card */}
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1">Xác nhận nhận tài liệu tại lớp</span>
            <h3 className="text-lg font-bold text-slate-900">Tiến trình nhận tài liệu & chuẩn bị</h3>
            <p className="text-slate-500 text-xs mt-1">Học viên nên nhận đủ 100% tài liệu cốt lõi để theo sát bài giảng của Giảng viên.</p>
          </div>
          <div className="flex items-center gap-4 shrink-0 w-full sm:w-auto">
            <div className="w-full sm:w-36 bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-slate-900 h-full transition-all duration-300" 
                style={{ width: `${percentChecked}%` }}
              ></div>
            </div>
            <span className="text-lg font-bold font-mono text-slate-900 shrink-0">{percentChecked}% ({checkedIds.filter(id => handouts.some(h => h.id === id)).length}/{handouts.length})</span>
          </div>
        </div>

        {/* Searching and filter controllers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
            <input
              id="handout-search"
              type="text"
              placeholder="Tìm kiếm tài liệu, cẩm nang..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-slate-800 transition-colors"
            />
          </div>
          <div className="relative">
            <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
            <select
              id="handout-filter-category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-slate-800 appearance-none bg-white cursor-pointer"
            >
              <option value="All">Tất cả phân loại</option>
              <option value="Tài liệu học tập">Tài liệu học tập</option>
              <option value="Công cụ bổ trợ">Công cụ bổ trợ</option>
              <option value="Biểu mẫu thực hành">Biểu mẫu thực hành</option>
            </select>
          </div>
        </div>

        {/* Create new handout toggle */}
        <div className="mb-6">
          <button
            id="toggle-add-form-btn"
            onClick={() => setShowAddForm(!showAddForm)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-900 hover:text-slate-700 bg-slate-100 hover:bg-slate-200/80 px-4 py-2 rounded-xl transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" /> {showAddForm ? 'Đóng form thêm mới' : 'Tự thêm ghi chú tài liệu riêng'}
          </button>
        </div>

        {showAddForm && (
          <form onSubmit={handleAddHandout} className="bg-slate-50 border border-slate-100 rounded-2xl p-6 mb-8 mt-2 space-y-4">
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider font-mono">Bổ sung tài liệu học tập cá nhân</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Tên tài liệu / Vật dụng *</label>
                <input
                  id="new-handout-title"
                  type="text"
                  required
                  placeholder="Ví dụ: Giấy trắng A0 quy mô nhóm..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-slate-850"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Phân loại</label>
                <select
                  id="new-handout-category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-slate-850 bg-white"
                >
                  <option value="Tài liệu học tập">Tài liệu học tập</option>
                  <option value="Công cụ bổ trợ">Công cụ bổ trợ</option>
                  <option value="Biểu mẫu thực hành">Biểu mẫu thực hành</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Mô tả tóm lược chiếc tài liệu này</label>
              <textarea
                id="new-handout-desc"
                placeholder="Nhập ghi chú ngắn học thuật..."
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-slate-850 h-20 resize-none"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 rounded-xl text-xs hover:bg-slate-200 text-slate-700 transition"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs bg-slate-900 text-white hover:bg-slate-850 transition"
              >
                Lưu vào danh sách
              </button>
            </div>
          </form>
        )}

        {/* Handouts Grid/List */}
        {filteredHandouts.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-slate-200 rounded-2xl">
            <Server className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <h4 className="text-slate-600 font-medium text-sm">Không tìm thấy tài liệu phù hợp</h4>
            <p className="text-slate-400 text-xs mt-1">Thử thay đổi từ khóa tìm kiếm hoặc tắt bộ lọc phân loại.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredHandouts.map((item) => {
              const isChecked = checkedIds.includes(item.id);
              return (
                <div 
                  key={item.id} 
                  className={`flex items-start justify-between p-4 rounded-xl border transition-all duration-300 ${
                    isChecked 
                      ? 'border-emerald-200 bg-emerald-50/20' 
                      : 'border-slate-200 hover:border-slate-400 bg-white shadow-2xs'
                  }`}
                >
                  <div className="flex gap-3.5 items-start">
                    <button
                      id={`check-handout-${item.id}`}
                      onClick={() => toggleCheck(item.id)}
                      className="mt-0.5 shrink-0 transition-colors focus:outline-hidden"
                    >
                      {isChecked ? (
                        <div className="w-5.5 h-5.5 rounded-md bg-emerald-600 border border-emerald-600 flex items-center justify-center text-white">
                          <Check className="w-4 h-4 cursor-pointer" />
                        </div>
                      ) : (
                        <div className="w-5.5 h-5.5 rounded-md border border-slate-300 hover:border-slate-800 bg-white" />
                      )}
                    </button>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className={`text-sm sm:text-base font-medium ${isChecked ? 'line-through text-slate-450' : 'text-slate-900'}`}>
                          {item.title}
                        </h4>
                        <span className={`text-[10px] uppercase font-mono tracking-wider font-extrabold px-2 py-0.5 rounded-full ${
                          item.category === 'Tài liệu học tập' 
                            ? 'bg-blue-50 text-blue-700 border border-blue-100' 
                            : item.category === 'Công cụ bổ trợ'
                            ? 'bg-purple-50 text-purple-700 border border-purple-100'
                            : 'bg-amber-50 text-amber-700 border border-amber-100'
                        }`}>
                          {item.category}
                        </span>
                        {item.isCustom && (
                          <span className="text-[10px] font-mono bg-slate-100 text-slate-600 border px-1.5 py-0.5 rounded-sm">Học viên</span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">{item.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 ml-4">
                    <button
                      id={`download-handout-${item.id}`}
                      onClick={() => simulateDownload(item)}
                      title="Tải về tài liệu"
                      className="p-1.5 sm:p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                    >
                      <Download className="w-4.5 h-4.5" />
                    </button>
                    {item.isCustom && (
                      <button
                        id={`delete-handout-${item.id}`}
                        onClick={() => handleDeleteCustom(item.id)}
                        title="Xóa tài liệu"
                        className="p-1.5 sm:p-2 rounded-lg hover:bg-red-50 text-slate-450 hover:text-red-600 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
