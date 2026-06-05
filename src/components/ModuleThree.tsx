/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Clock, AlertOctagon, RefreshCw, Volume2, ShieldAlert, ArrowRight, Check } from 'lucide-react';

interface TimelineStep {
  minutes: string;
  title: string;
  focus: string;
  details: string[];
  tips: string;
}

const STANDUP_TIMELINE_STEPS: TimelineStep[] = [
  {
    minutes: "01 - 02",
    title: "Khởi động & Đồng bộ nhanh (Check-in)",
    focus: "Ổn định đội hình, tập hợp vòng tròn (thường là đứng để giữ nhịp độ nhanh). Người điều phối (Scrum Master hoặc Trưởng nhóm bầu luân phiên) tuyên bố bắt đầu.",
    details: [
      "Kiểm tra sự hiện diện nhanh chóng.",
      "Tuyên bố mục tiêu buổi họp: Chỉ đồng bộ tiến độ, KHÔNG giải quyết chi tiết sự cố tại chỗ.",
      "Tạo bầu không khí tập trung năng lượng tích cực chào ngày mới."
    ],
    tips: "Hãy đứng thảo luận. Việc đứng làm cơ thể cảm thấy khẩn trương, tự động kết thúc thảo luận dông dài không cần thiết."
  },
  {
    minutes: "03 - 12",
    title: "Đồng bộ 3 câu hỏi cốt lõi (KQ - CK - DN)",
    focus: "Mỗi thành viên trong phòng có tối đa 1.5 - 2 phút để tự chủ động báo cáo ngắn gọn dựa trên mẫu 3 trục giao ban ngành dọc.",
    details: [
      "Hôm qua tôi đã giải quyết dứt điểm được công việc cụ thể nào? (KQ)",
      "Hôm nay tôi cam kết gặt hái kết quả hay hoàn thành mốc công việc nào tiếp theo? (CK)",
      "Rào cản nghiệp vụ hay điểm nghẽn nào đang kìm hãm tiến độ của tôi dứt khoát cần đồng đội hỗ trợ? (DN)"
    ],
    tips: "Không báo cáo lê thê lý do tại sao chưa làm; hãy đi thẳng vào cam kết ngày và điểm nghẽn cụ thể."
  },
  {
    minutes: "13 - 15",
    title: "Chuyển giao Parking Lot & Kết thúc đúng giờ",
    focus: "Các vấn đề phát sinh phức tạp vượt ngoài phạm vi giải quyết dưới 2 phút được ghi chép nhanh và đẩy sang Bãi đỗ xe (Parking Lot).",
    details: [
      "Trưởng nhóm ghi nhận mốc điểm nghẽn lên bảng vật lý.",
      "Chỉ định cụ thể 2-3 cá nhân liên quan ở lại giải quyết 'đậu xe' họp riêng ngay sau khi cuộc họp chính thức bế mạc.",
      "Cả đội giải tán đầy hứng khởi bắt tay vào tác nghiệp nghiệp vụ ngày."
    ],
    tips: "Tuyệt đối không để 10 người cùng đứng nghe tranh luận chi tiết một lỗi hồ sơ tín dụng chỉ ảnh hưởng tới 2 người."
  }
];

export default function ModuleThree({ isEnglish = false }: { isEnglish?: boolean }) {
  const [activeTab, setActiveTab] = useState<'model' | 'guide' | 'academy'>('model');
  const [selectedStep, setSelectedStep] = useState<number>(1);
  const [citation1Open, setCitation1Open] = useState(false);
  const [citation2Open, setCitation2Open] = useState(false);

  return (
    <div id="module-three-view" className="space-y-6">
      {/* Intro Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800">
        <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 block mb-2 uppercase">MODULE 3 • TIÊU CHUẨN CHUYÊN GIA</span>
        <h2 className="text-xl sm:text-3xl font-bold tracking-tight">Cuộc Họp Tinh Gọn Agile Standup (Họp 15 Phút)</h2>
        <p className="text-xs sm:text-base text-slate-400 mt-2 max-w-3xl leading-relaxed">
          Phương pháp đồng bộ tiến độ hiệu quả đầu ngày, hóa giải các chướng ngại quy trình nghiệp vụ và duy trì kỷ luật hành động cam kết quyết liệt.
        </p>
      </div>

      {/* Embedded Tabs */}
      <div className="flex border-b border-slate-200 gap-1 overflow-x-auto pb-px">
        <button
          id="m3-tab-model"
          onClick={() => setActiveTab('model')}
          className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'model' 
              ? 'border-slate-905 text-slate-900 bg-slate-50' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          1. Nguyên Tắc Cốt Lõi (Model)
        </button>
        <button
          id="m3-tab-guide"
          onClick={() => setActiveTab('guide')}
          className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'guide' 
              ? 'border-slate-905 text-slate-900 bg-slate-50' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          2. Thực Tế & Timeline (Quick-guide)
        </button>
        <button
          id="m3-tab-academy"
          onClick={() => setActiveTab('academy')}
          className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'academy' 
              ? 'border-slate-910 text-slate-900 bg-slate-50' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          {isEnglish ? '3. Science of Agile (Research Insight)' : '3. Cơ Sở Khoa Học (Research Insight)'}
        </button>
      </div>

      {/* Tab Core Content */}
      {activeTab === 'model' && (
        <div className="bg-white rounded-2xl border border-slate-101 p-6 sm:p-8 space-y-8 transition-all duration-300 text-slate-900">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-600" /> Bản chất cuộc họp Daily Standup 15 phút
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Không phải là buổi họp báo cáo thành tích tẻ nhạt, Daily Standup là một phương pháp Agile thực tiễn giúp cả đội nhóm tự đồng bộ hành động ngày liên tục, bộc lộ các rào cản tắc nghẽn công việc tức thì và tối ưu hóa năng lực hợp lực.
              </p>
              <div className="bg-slate-50 p-4 border border-slate-200/60 rounded-xl space-y-3">
                <div className="flex gap-2 text-xs">
                  <span className="font-bold text-slate-900 shrink-0 font-mono">KQ: KẾT QUẢ</span>
                  <span className="text-slate-500">Hôm qua tôi xử lý dứt điểm rào cản nào?</span>
                </div>
                <div className="flex gap-2 text-xs border-y border-slate-200/50 py-2">
                  <span className="font-bold text-slate-900 shrink-0 font-mono">CK: CAM KẾT</span>
                  <span className="text-slate-500">Hôm nay tôi hoàn thành mốc phê duyệt nào?</span>
                </div>
                <div className="flex gap-2 text-xs">
                  <span className="font-bold text-slate-905 shrink-0 font-mono">DN: ĐIỂM NGHẼN</span>
                  <span className="text-slate-500">Rào cản nào đang kìm hãm đột phá của tôi?</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8 animate-fade-in">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <AlertOctagon className="w-5 h-5 text-emerald-600" /> Kỹ thuật Parking Lot (Bãi đỗ xe ý tưởng)
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Parking Lot giúp đội nhóm tránh sa đà vào các cuộc thảo luận chi tiết làm kéo dài thời gian họp.
              </p>
              <div className="bg-emerald-50/20 p-4 rounded-xl border border-emerald-100/60 space-y-3">
                <div>
                  <span className="text-emerald-950 font-bold text-xs block font-mono uppercase mb-1">Cách áp dụng</span>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Khi xuất hiện một vấn đề cần trao đổi sâu (trên 1–2 phút), hãy ghi nhận vào Parking Lot và tiếp tục cuộc họp.
                  </p>
                  <p className="text-slate-600 text-xs leading-relaxed mt-1">
                    Sau khi Daily Standup kết thúc, những người liên quan sẽ trao đổi riêng để tìm giải pháp phù hợp.
                  </p>
                </div>
                <div className="border-t border-emerald-100/40 pt-2">
                  <span className="text-emerald-950 font-bold text-xs block font-mono uppercase mb-1.5">Lợi ích</span>
                  <ul className="text-slate-600 text-xs space-y-1 list-disc pl-4">
                    <li>Giữ cuộc họp trong 15 phút</li>
                    <li>Duy trì sự tập trung vào mục tiêu chung</li>
                    <li>Tối ưu thời gian của toàn đội</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'guide' && (
        <div className="bg-white rounded-2xl border border-slate-101 p-6 sm:p-8 space-y-8 transition-all duration-300 text-slate-900">
          {/* Banking Template example */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest font-mono mb-4 flex items-center gap-1.5">
              <Volume2 className="w-4.5 h-4.5 text-emerald-600" /> Kịch Bản Thực Hành Mẫu "3 Câu Hỏi Cốt Lõi" Ngành Ngân Hàng
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <span className="text-xs font-mono font-bold text-slate-400 block mb-1">CHUYÊN VIÊN TÍN DỤNG VIP</span>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  “Hôm qua hoàn tất thực địa tài sản đảm bảo Quận 3. Hôm nay cam kết soạn xong nháp tờ trình phê duyệt mức tín dụng 20 tỷ. Điểm nghẽn: Đang chờ file thẩm định giá bổ sung từ bộ phận Định giá, sếp thẩm định hỗ trợ hối thúc chéo giúp.”
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <span className="text-xs font-mono font-bold text-slate-400 block mb-1">GIAO DỊCH VIÊN PHÒNG QUẦY</span>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  “Hôm qua hoàn tất đối soát số liệu 100% giao dịch cuối ngày an toàn. Hôm nay cam kết duy trì tốc độ phục vụ quầy dưới 8 phút/lượt khách. Điểm nghẽn: Máy in biên lai giao dịch số 2 thỉnh thoảng kẹt mực, cần kỹ thuật hỗ trợ rà soát.”
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <span className="text-xs font-mono font-bold text-slate-400 block mb-1">CHUYÊN VIÊN KIỂM SOÁT NỘI BỘ</span>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  “Hôm qua báo cáo xong rủi ro tác nghiệp phòng thẻ tháng 5. Hôm nay cam kết lập kế hoạch rà soát nghiệp vụ tín dụng phòng bán lẻ. Điểm nghẽn: Chưa có điểm nghẽn cần hỗ trợ từ đồng nghiệp đầu ngày hôm nay.”
                </p>
              </div>
            </div>
          </div>

          {/* Timeline interactives */}
          <div className="border-t border-slate-100 pt-8">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-slate-950 flex items-center gap-1.5 leading-tight">
                <Clock className="w-5 h-5 text-emerald-600" /> Biểu đồ luồng thời gian (Timeline Flowchart) tối ưu hóa đúng 15 phút
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Lướt xem chi tiết tác vụ chuyên gia quy hoạch cho mỗi chặng phút của cuộc họp tinh gọn.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Timeline Steps */}
              <div className="lg:col-span-5 space-y-3">
                {STANDUP_TIMELINE_STEPS.map((step, i) => {
                  const isSelected = selectedStep === i + 1;
                  return (
                    <button
                      id={`timeline-step-${i + 1}`}
                      key={i}
                      onClick={() => setSelectedStep(i + 1)}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-3.5 cursor-pointer ${
                        isSelected 
                          ? 'bg-slate-900 text-white border-slate-900 shadow-sm font-bold scale-[1.01]' 
                          : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                      }`}
                    >
                      <span className={`w-14 shrink-0 font-mono text-xs font-bold px-2 py-1 rounded-sm text-center ${
                        isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
                      }`}>
                        Phút {step.minutes}
                      </span>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold tracking-tight">{step.title}</h4>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Step detail panel */}
              <div className="lg:col-span-7 bg-slate-950 text-slate-100 border border-slate-850 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="border-b border-slate-850 pb-3 flex justify-between items-center mb-4">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-bold">QUY TRÌNH CHUẨN TỪ CHUYÊN GIA</span>
                    <span className="text-xs text-emerald-400 font-mono font-bold">CHẶNG {selectedStep}</span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="text-xs text-slate-400 font-bold block mb-1">Mục tiêu cốt lõi của chặng phút:</span>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                        {STANDUP_TIMELINE_STEPS[selectedStep - 1].focus}
                      </p>
                    </div>

                    <div>
                      <span className="text-xs text-slate-400 font-bold block mb-2">Các hoạt động chi tiết:</span>
                      <ul className="space-y-2">
                        {STANDUP_TIMELINE_STEPS[selectedStep - 1].details.map((det, dIdx) => (
                          <li key={dIdx} className="text-xs text-slate-350 bg-slate-900 p-3 rounded-lg border border-slate-850 leading-relaxed">
                            ✓ {det}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-850">
                  <span className="text-xs text-emerald-400 font-bold block mb-1">Bí quyết bỏ túi (Practical tip):</span>
                  <p className="text-xs text-slate-400 leading-relaxed italic font-normal">
                    💡 "{STANDUP_TIMELINE_STEPS[selectedStep - 1].tips}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'academy' && (
        <div id="m3-research-insights" className="space-y-8 animate-fade-in text-slate-900">
          
          {/* Scientific Insight 1 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 hover:shadow-xs transition">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-emerald-600 font-bold tracking-wider uppercase block">YẾU TỐ CỐT LÕI // CORE CONCEPT</span>
                <h3 className="text-lg font-bold text-slate-950">
                  {isEnglish 
                    ? 'Daily Standup is an Inspect & Adapt Mechanism' 
                    : 'Yếu Tố Cốt Lõi: Daily Standup là Cơ Chế Thanh Tra & Thích Nghi (Inspect & Adapt)'}
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {isEnglish ? (
                  'According to the Scrum Guide, the Daily Standup is not designed as a status report for managers or a mere formal update. Its true purpose is to:'
                ) : (
                  'Theo Scrum Guide, Daily Standup không được tạo ra để báo cáo cho cấp trên hay cập nhật tình hình đơn thuần. Mục đích thực sự là:'
                )}
              </p>
              
              <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-750 space-y-1.5 font-normal">
                <li>{isEnglish ? 'Align progress' : 'Đồng bộ tiến độ'}</li>
                <li>{isEnglish ? 'Inspect progress toward the Sprint Goal' : 'Kiểm tra mức độ hoàn thành Sprint Goal'}</li>
                <li>{isEnglish ? 'Detect impediments' : 'Phát hiện trở ngại'}</li>
                <li>{isEnglish ? 'Adjust the plan for the next 24 hours' : 'Điều chỉnh kế hoạch trong 24 giờ tiếp theo'}</li>
              </ul>

              <p className="text-xs sm:text-sm text-slate-605 leading-relaxed font-normal pt-2">
                {isEnglish ? (
                  'In Agile, teams do not attempt to build a perfect plan right from the start. Instead, they continually execute:'
                ) : (
                  'Trong Agile, nhóm không cố gắng lập kế hoạch hoàn hảo ngay từ đầu. Thay vào đó nhóm liên tục thực hiện:'
                )}
              </p>
            </div>

            {/* Visual Action Loop flow */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="bg-white border px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-slate-800 shadow-3xs">Plan</span>
                <span className="text-slate-400 font-bold">&darr;</span>
                <span className="bg-white border px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-slate-800 shadow-3xs">Do</span>
                <span className="text-slate-400 font-bold">&darr;</span>
                <span className="bg-slate-900 border border-slate-950 px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-teal-400 shadow-3xs">Check</span>
                <span className="text-slate-400 font-bold">&darr;</span>
                <span className="bg-slate-900 border border-slate-950 px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-teal-400 shadow-3xs">Act</span>
                <span className="text-slate-400 font-bold">&darr;</span>
                <span className="bg-white border px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-slate-800 shadow-3xs">Repeat</span>
              </div>
              <p className="text-center text-slate-500 text-xs mt-3 leading-relaxed max-w-2xl mx-auto font-normal">
                {isEnglish 
                  ? 'The Daily Standup is precisely this daily inspection and adjustment loop.' 
                  : 'Daily Standup chính là vòng lặp kiểm tra và điều chỉnh diễn ra hằng ngày.'}
              </p>
            </div>

            {/* Study reference box */}
            <div className="border-l-4 border-slate-900 pl-4 py-1.5 my-3 bg-slate-50 rounded-r-xl space-y-2">
              <span className="text-xs font-bold text-slate-900 block font-mono">
                {isEnglish ? 'ACADEMIC STUDY // AGILE & SCRUM FRAMEWORK RESEARCH:' : 'CHUYÊN ĐỀ HỌC THUẬT // NGHIÊN CỨU AGILE & SCRUM FRAMEWORK:'}
              </span>
              <p className="text-xs sm:text-sm text-slate-650 leading-relaxed italic font-normal font-serif-academic">
                "The Daily Scrum is a 15-minute event for Developers of the Scrum Team. The purpose of the Daily Scrum is to inspect progress toward the Sprint Goal and adapt the Sprint Backlog as necessary."
              </p>
              <p className="text-xs text-slate-500 font-normal leading-relaxed">
                {isEnglish 
                  ? 'Through the Daily Standup, the team updates actions based on reality instead of building on outdated assumptions. Consequently, response speed to shifts increases significantly.' 
                  : 'Thông qua Daily Standup, đội nhóm liên tục cập nhật thực tế thay vì làm việc dựa trên giả định cũ. Nhờ đó tốc độ phản ứng với thay đổi tăng lên đáng kể.'}
              </p>
            </div>

            {/* Citation 1 */}
            <div className="border border-slate-150 rounded-xl overflow-hidden bg-slate-50/50">
              <div className="p-4 text-xs sm:text-sm text-slate-650 leading-relaxed">
                <span className="font-semibold block text-slate-850 font-mono text-[10px] uppercase">
                  {isEnglish ? 'Source Citation:' : 'TRÍCH NGUỒN:'}
                </span>
                <p className="font-bold text-slate-900">Scrum Guide 2020</p>
                <p className="font-normal text-slate-500">Ken Schwaber & Jeff Sutherland</p>
              </div>
            </div>
          </div>

          {/* Scientific Insight 2 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 hover:shadow-xs transition">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-indigo-650 font-bold tracking-wider uppercase block">NGUYÊN LÝ HOẠT ĐỘNG // OPERATION PRINCIPLE</span>
                <h3 className="text-lg font-bold text-slate-950">
                  {isEnglish 
                    ? 'Agile is not about rushed speed, but about reducing information latency' 
                    : 'Yếu Tố Cốt Lõi: Agile không phải là họp nhanh, mà là giảm độ trễ thông tin'}
                </h3>
              </div>
            </div>

            {/* Visual comparison of two flow structures */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              
              {/* Traditional */}
              <div className="border border-slate-200 rounded-xl p-4 sm:p-5 bg-slate-50 space-y-3">
                <span className="text-[10px] font-mono text-slate-500 font-bold block uppercase tracking-wider text-slate-500">
                  {isEnglish ? 'A. TRADITIONAL PIPELINE' : 'TRONG CÁC TỔ CHỨC TRUYỀN THỐNG'}
                </span>
                <div className="flex flex-col gap-1.5 text-xs font-mono text-slate-600 pl-2">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-bold">&bull;</span>
                    <span>{isEnglish ? 'Issue occurs' : 'Sự cố xảy ra'}</span>
                  </div>
                  <div className="text-slate-400 pl-3">&darn;</div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-bold">&bull;</span>
                    <span>{isEnglish ? 'Wait of report' : 'Chờ báo cáo (Cấp thiết)'}</span>
                  </div>
                  <div className="text-slate-400 pl-3">&darr;</div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-bold">&bull;</span>
                    <span>{isEnglish ? 'Wait of meeting' : 'Chờ xếp lịch họp'}</span>
                  </div>
                  <div className="text-slate-400 pl-3">&darr;</div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-bold">&bull;</span>
                    <span>{isEnglish ? 'Wait of approval' : 'Chờ xin quyết định cấp trên'}</span>
                  </div>
                  <div className="text-slate-400 pl-3">&darr;</div>
                  <div className="flex items-center gap-2 text-rose-600 font-bold">
                    <span className="text-rose-500 font-bold">&bull;</span>
                    <span>{isEnglish ? 'Action (Takes days)' : 'Hành động (Mất nhiều ngày)'}</span>
                  </div>
                </div>
              </div>

              {/* Agile Flow */}
              <div className="border border-indigo-200 bg-indigo-50/10 rounded-xl p-4 sm:p-5 space-y-3">
                <span className="text-[10px] font-mono text-indigo-700 font-bold block uppercase tracking-wider text-indigo-600">
                  {isEnglish ? 'B. AGILE PIPELINE' : 'TRONG MÔ HÌNH AGILE'}
                </span>
                <div className="flex flex-col gap-1.5 text-xs font-mono text-slate-700 pl-2">
                  <div className="flex items-center gap-2">
                    <span className="text-indigo-400 font-bold">&bull;</span>
                    <span>{isEnglish ? 'Issue occurs' : 'Sự cố xảy ra'}</span>
                  </div>
                  <div className="text-indigo-400 pl-3">&darr;</div>
                  <div className="flex items-center gap-2 font-semibold text-slate-900">
                    <span className="text-indigo-400 font-bold">&bull;</span>
                    <span>{isEnglish ? 'Daily Standup Sync' : 'Daily Standup'}</span>
                  </div>
                  <div className="text-indigo-400 pl-3">&darr;</div>
                  <div className="flex items-center gap-2 font-semibold text-slate-900">
                    <span className="text-indigo-400 font-bold">&bull;</span>
                    <span>{isEnglish ? 'Fast decision context' : 'Ra quyết định nhanh'}</span>
                  </div>
                  <div className="text-indigo-400 pl-3">&darr;</div>
                  <div className="flex items-center gap-2 text-emerald-700 font-bold">
                    <span className="text-emerald-500 font-bold">&bull;</span>
                    <span>{isEnglish ? 'Action (Takes hours)' : 'Hành động (Chỉ mất vài giờ)'}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Study reference box */}
            <div className="border-l-4 border-indigo-900 pl-4 py-1.5 my-3 bg-slate-50 rounded-r-xl space-y-2">
              <span className="text-xs font-bold text-slate-900 block font-mono">
                {isEnglish ? 'ACADEMIC STUDY // LEAN MANAGEMENT & INFORMATION FLOW:' : 'CHUYÊN ĐỀ HỌC THUẬT // LEAN MANAGEMENT & INFORMATION FLOW:'}
              </span>
              <p className="text-xs sm:text-sm text-slate-655 leading-relaxed font-serif-academic italic font-normal text-slate-800">
                {isEnglish ? (
                  '"Many Lean studies demonstrate that the greatest cost in any process is not the active processing duration, but rather the waiting times and information delays between stages."'
                ) : (
                  '"Nhiều nghiên cứu Lean chỉ ra rằng chi phí lớn nhất trong quy trình không nằm ở thao tác xử lý mà nằm ở thời gian chờ đợi và độ trễ thông tin. Daily Standup được xem như một cơ chế làm giảm "Information Latency" (Độ trễ thông tin) trong tổ chức."'
                )}
              </p>
            </div>

            {/* Citation 2 */}
            <div className="border border-slate-150 rounded-xl overflow-hidden bg-slate-50/50">
              <div className="p-4 text-xs sm:text-sm text-slate-655 leading-relaxed">
                <span className="font-semibold block text-slate-800 font-mono text-[10px] uppercase">
                  {isEnglish ? 'Source Citation:' : 'TRÍCH NGUỒN:'}
                </span>
                <p className="font-bold text-slate-900">Taiichi Ohno (Toyota Production System / Lean Thinking)</p>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
