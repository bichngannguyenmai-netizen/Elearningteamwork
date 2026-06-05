/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Flame, HelpCircle, Layers, AlertTriangle, CheckSquare } from 'lucide-react';

interface HatDetail {
  name: string;
  colorClass: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
  focus: string;
  questions: string[];
}

const HATS_DATA: Record<string, HatDetail> = {
  'white': {
    name: "Mũ Trắng (Dữ Liệu Khách Quan)",
    colorClass: "bg-white",
    bgClass: "bg-slate-50",
    textClass: "text-slate-800",
    borderClass: "border-slate-300",
    focus: "Mức độ tập trung hoàn toàn vào dữ liệu thực tế, bằng chứng số, các báo cáo tài chính đã kiểm chứng. Tuyệt đối không đưa nhận xét cảm tính.",
    questions: [
      "Bộ dữ liệu giao dịch gốc này được lấy từ nguồn hệ thống nào?",
      "Chúng ta đang có trong tay những số liệu cụ thể nào và còn thiếu hụt thông tin định lượng nào?",
      "Lịch sử vi phạm hay lỗi tác nghiệp nghiệp vụ này được ghi nhận chính xác ra sao?"
    ]
  },
  'red': {
    name: "Mũ Đỏ (Cảm Trực Giác & Cảm Xúc)",
    colorClass: "bg-red-650",
    bgClass: "bg-red-50/40",
    textClass: "text-red-950",
    borderClass: "border-red-200",
    focus: "Chào đón trực giác nhạy bén, biểu lộ nỗi sợ rủi ro mơ hồ hoặc cảm giác tích cực của bản thân mà không cần đưa ra dẫn chứng biện luận logic.",
    questions: [
      "Cảm xúc hoặc trực giác trực diện của bạn về mức độ trung thực của bộ hồ sơ tín dụng này thế nào?",
      "Bản thân bạn đang có nỗi lo sợ âm thầm gì về dự án liên phòng này mà chưa dám biểu đạt công khai?",
      "Trải nghiệm cảm xúc cá nhân của bạn khi tương tác với đối tác VIP lần này ra sao?"
    ]
  },
  'black': {
    name: "Mũ Đen (Cảnh Giác Rủi Ro & Chỉ Trích)",
    colorClass: "bg-slate-950",
    bgClass: "bg-slate-100",
    textClass: "text-slate-950",
    borderClass: "border-slate-400",
    focus: "Tập trung phân tích các tình huống tệ nhất, lỗi tuân thủ quy chế, rào cản ngăn ngừa thất sủng giao dịch nhằm cảnh báo hệ thống.",
    questions: [
      "Kịch bản lỗ hổng bảo mật hoặc rủi ro tác nghiệp tệ nhất có thể xảy ra ở bước quy trình nào?",
      "Quyết định phê duyệt nhanh này có điểm nào không tương thích với quy phạm kiểm soát rủi ro của ngân hàng?",
      "Đồng đội dứt khoát thấy rào cản gì về mặt chi phí vận hành hay rủi ro pháp lý?"
    ]
  },
  'yellow': {
    name: "Mũ Vàng (Mặt Tích Cực & Cơ Hội)",
    colorClass: "bg-amber-405",
    bgClass: "bg-amber-50/50",
    textClass: "text-amber-950",
    borderClass: "border-amber-200",
    focus: "Tư duy tích cực, tìm kiếm các cơ hội kinh doanh bứt phá, lợi ích gia tăng dài hạn và mặt sáng của quy chuẩn nghiệp vụ mới.",
    questions: [
      "Sáng kiến phê duyệt số hóa giao dịch này đem lại lợi ích thắt chặt thời gian và chi phí gì cho khách hàng?",
      "Đâu là những mặt sáng tích cực nhất giúp chi nhánh bứt phá doanh số nếu chúng ta đồng thuận triển khai ngay?",
      "Phương án phối hợp và hỗ trợ chéo này mang lại những giá trị gia tăng nào cho tinh thần làm việc của nhân viên phòng ban?"
    ]
  },
  'green': {
    name: "Mũ Xanh Lá (Sáng Tạo Sáng Kiến & Giải Pháp)",
    colorClass: "bg-emerald-600",
    bgClass: "bg-emerald-50/40",
    textClass: "text-emerald-950",
    borderClass: "border-emerald-200",
    focus: "Khuyến khích đưa ra các giải pháp thay thế sáng tạo bứt phá, suy nghĩ ngoài khuôn khổ tác nghiệp nhằm tìm lối thoát thông minh cho bài toán.",
    questions: [
      "Có cách thức phản biện sáng tạo nào khác hoàn toàn so với mô thức phê duyệt hồ sơ truyền thống từ trước tới nay?",
      "Làm sao để giải quyết điểm nghẽn nghiệp vụ này bằng một sáng kiến phối hợp hỗ trợ liên phòng ban?",
      "Ý tưởng bứt phá nào giúp chúng ta vừa đảm bảo kiểm soát rủi ro chặt chẽ vừa tăng tốc độ phục vụ?"
    ]
  },
  'blue': {
    name: "Mũ Xanh Dương (Điều Phối Thảo Luận)",
    colorClass: "bg-blue-600",
    bgClass: "bg-blue-50/40",
    textClass: "text-blue-950",
    borderClass: "border-blue-200",
    focus: "Tư duy điều hành trò chuyện toàn cục. Giảng viên hoặc người chủ trì xác định trọng tâm tranh biện, xoay chuyển chiếc mũ và tóm lược đồng thuận.",
    questions: [
      "Cơ cấu tranh luận của phòng ban đang quá thiên lệch mũ nào? Chúng ta cần xoay chuyển sang mũ đen hay mũ vàng tiếp theo?",
      "Tóm tắt các điểm đồng thuận cốt lõi mà toàn phòng ban đạt được tính tới thời điểm tranh luận hiện tại là gì?",
      "Kế hoạch triển khai bước hành động tiếp theo được chốt nhất quán ra sao?"
    ]
  }
};

const LENCIONI_DYSFUNCTIONS = [
  {
    level: 5,
    title: "Không chú trọng vào kết quả chung (Inattention to Results)",
    symptoms: "Thành viên tập trung bảo vệ lợi ích cá nhân, danh vọng riêng lẻ hoặc chỉ tiêu riêng của phòng ban thay vì ưu tiên mục tiêu chiến lược và kết quả chung của toàn tổ chức.",
    remedy: "Thiết lập hệ thống chỉ tiêu kết quả then chốt (KPIs/OKRs) gắn liền với trách nhiệm tập thể; tôn vinh các đóng góp liên phòng ban và công khai hóa tiến độ thực hiện mục tiêu chung.",
    color: "bg-red-950/90 text-red-100 border-red-900"
  },
  {
    level: 4,
    title: "Né tránh trách nhiệm giải trình (Avoidance of Accountability)",
    symptoms: "Xu hướng dễ dãi với hiệu suất trung bình của đồng nghiệp, né tránh việc góp ý trực diện về tiến độ và chất lượng công việc vì lo sợ ảnh hưởng đến các mối quan hệ cá nhân.",
    remedy: "Thúc đẩy văn hóa phản hồi ngang hàng (Peer-to-peer feedback); chuẩn hóa các cam kết chất lượng dịch vụ nội bộ (SLA) và làm rõ vai trò, trách nhiệm của từng cá nhân.",
    color: "bg-red-900/80 text-red-100 border-red-800"
  },
  {
    level: 3,
    title: "Thiếu cam kết hành động (Lack of Commitment)",
    symptoms: "Đồng thuận giả tạo bên ngoài nhưng hoài nghi hoặc thờ ơ trong thực thi thực tế. Sự mơ hồ về mục tiêu dẫn đến tình trạng trì trệ, đùn đẩy trách nhiệm khi gặp khó khăn.",
    remedy: "Áp dụng nhất quán nguyên lý 'Phản biện sâu sắc - Đồng thuận tuyệt đối' (Disagree and Commit); làm rõ thời hạn quyết định cuối cùng và loại bỏ sự mơ hồ trong các hướng dẫn công việc.",
    color: "bg-slate-900 text-slate-100 border-slate-800"
  },
  {
    level: 2,
    title: "Sợ xung đột và phản biện (Fear of Conflict)",
    symptoms: "Né tránh các cuộc tranh luận chuyên môn mang tính kiến thiết để cố duy trì sự hòa hảo giả tạo bên ngoài, dẫn đến việc bỏ sót các lỗ hổng rủi ro nghiêm trọng trong quy trình vận hành.",
    remedy: "Xây dựng môi trường an toàn khuyến khích tranh biện tập trung hoàn toàn vào công việc (Task Conflict) thay vì cá nhân; sử dụng các công cụ khách quan để gạn lọc rủi ro tối ưu.",
    color: "bg-slate-800 text-slate-200 border-slate-700"
  },
  {
    level: 1,
    title: "Thiếu sự tin tưởng lẫn nhau (Absence of Trust)",
    symptoms: "Nền tảng của các trở ngại. Thành viên e dè trong việc bộc lộ điểm yếu, che giấu lỗi sai vì lo sợ viễn cảnh bị phán xét, đổ lỗi hoặc tổn hại đến vị thế nội bộ.",
    remedy: "Người dẫn dắt chủ động thể hiện sự cởi mở và thừa nhận giới hạn bản thân (Vulnerability-based Trust) để làm gương; kết hợp phân tích hành vi để thấu hiểu sự khác biệt cá nhân.",
    color: "bg-slate-700 text-slate-300 border-slate-600"
  }
];

export default function ModuleTwo() {
  const [activeTab, setActiveTab] = useState<'model' | 'guide' | 'academy'>('model');
  const [selectedHat, setSelectedHat] = useState<string | null>('white');
  const [selectedDysfunctionLevel, setSelectedDysfunctionLevel] = useState<number | null>(1);
  const [academyOpen, setAcademyOpen] = useState(false);

  return (
    <div id="module-two-view" className="space-y-6">
      {/* Intro Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800">
        <span className="text-xs font-mono font-bold tracking-widest text-amber-500 block mb-2 uppercase">MODULE 2 • TIÊU CHUẨN CHUYÊN GIA</span>
        <h2 className="text-xl sm:text-3xl font-bold tracking-tight">Quản Trị Mâu Thuẫn (5 Điểm Chết & 6 Chiếc Mũ Tư Duy)</h2>
        <p className="text-xs sm:text-base text-slate-400 mt-2 max-w-3xl leading-relaxed">
          Tối ưu hóa các khác biệt phong cách tính cách để giải phóng các điểm mâu thuẫn tiêu cực, tạo xúc tác bền vững định hướng hành động đột phá trong tổ chức tài chính.
        </p>
      </div>

      {/* Embedded Tabs */}
      <div className="flex border-b border-slate-200 gap-1 overflow-x-auto pb-px">
        <button
          id="m2-tab-model"
          onClick={() => setActiveTab('model')}
          className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'model' 
              ? 'border-slate-900 text-slate-900 bg-slate-50' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          1. Mô Hình Chuẩn (5 Điểm Chết)
        </button>
        <button
          id="m2-tab-guide"
          onClick={() => setActiveTab('guide')}
          className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'guide' 
              ? 'border-slate-900 text-slate-900 bg-slate-50' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          2. Ứng Dụng (6 Chiếc Mũ)
        </button>
        <button
          id="m2-tab-academy"
          onClick={() => setActiveTab('academy')}
          className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'academy' 
              ? 'border-slate-900 text-slate-900 bg-slate-50' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          3. Góc Học Thuật (Research)
        </button>
      </div>

      {/* Tab Core Content */}
      {activeTab === 'model' && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 space-y-8 transition-all duration-300 text-slate-900">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-slate-950 flex items-center gap-1.5 leading-tight">
              <Layers className="w-5 h-5 text-amber-600" /> Mô hình 5 Trở ngại trong Làm việc Nhóm (Patrick Lencioni)
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-4xl">
              Lựa chọn từng cấp độ trở ngại dưới đây để phân tích các biểu hiện hành vi cảnh báo và phương thức khắc phục chi tiết.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Pyramid Visual */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-1.5 select-none py-4">
              {LENCIONI_DYSFUNCTIONS.map((dys) => {
                const isSelected = selectedDysfunctionLevel === dys.level;
                // Calculate width percentages decreasing from base
                const widthPercent = 60 + dys.level * 8;
                return (
                  <button
                    id={`pyramid-level-${dys.level}`}
                    key={dys.level}
                    onClick={() => setSelectedDysfunctionLevel(dys.level)}
                    className={`h-11 sm:h-12 border rounded-md font-bold text-xs sm:text-xs tracking-wide transition-all duration-350 cursor-pointer shadow-2xs mx-auto flex items-center justify-center ${
                      isSelected 
                        ? 'bg-amber-500 text-slate-950 border-amber-500 scale-[1.03] shadow-md' 
                        : `${dys.color}`
                    }`}
                    style={{ width: `${widthPercent}%` }}
                  >
                    CẤP ĐỘ {dys.level}: {dys.title.split(' (')[0]}
                  </button>
                );
              })}
            </div>

            {/* Analysis Box */}
            <div className="lg:col-span-5 bg-slate-950 text-slate-100 border border-slate-850 rounded-2xl p-6 flex flex-col justify-between">
              {selectedDysfunctionLevel !== null ? (
                (() => {
                  const currentDys = LENCIONI_DYSFUNCTIONS.find(d => d.level === selectedDysfunctionLevel)!;
                  return (
                    <div className="space-y-4">
                      <div className="border-b border-slate-850 pb-3 flex justify-between items-center">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-amber-500 font-bold">PHÂN TÍCH TỪNG CẤP ĐỘ</span>
                        <span className="text-xs bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded-sm">Cấp {selectedDysfunctionLevel}</span>
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 font-mono font-bold block mb-1">TRỜ NGẠI ĐƯỢC CHỌN:</span>
                        <h4 className="text-base font-bold text-white tracking-tight leading-snug">{currentDys.title}</h4>
                      </div>
                      <div className="space-y-3.5">
                        <div>
                          <span className="text-xs font-semibold text-red-400 block mb-1 flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5" /> Biểu hiện hành vi cảnh báo đặc trưng:
                          </span>
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal bg-red-950/20 p-3 rounded-xl border border-red-950/30">
                            {currentDys.symptoms}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-emerald-400 block mb-1 flex items-center gap-1">
                            <CheckSquare className="w-3.5 h-3.5" /> Phương pháp khắc phục đề xuất:
                          </span>
                          <p className="text-xs text-slate-400 leading-relaxed font-normal">
                            {currentDys.remedy}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })()
              ) : (
                <div className="text-center py-12 text-slate-400 text-xs">
                  Lựa chọn một cấp độ trở ngại bên trái để xem mô tả hành vi và đề xuất giải pháp chi tiết.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'guide' && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 space-y-6 transition-all duration-300 text-slate-900">
          <div>
            <h3 className="text-lg font-bold text-slate-950 flex items-center gap-1.5 leading-tight">
              <Flame className="w-5 h-5 text-amber-600" /> Khám phá từng chiếc mũ
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Chọn các phương pháp tư duy theo chiếc mũ phù hợp dưới đây để tham khảo hệ thống câu hỏi định hướng, hỗ trợ đắc lực trong thảo luận và ra quyết định tập thể.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Hat Buttons Column */}
            <div className="md:col-span-1 space-y-2">
              {Object.keys(HATS_DATA).map((hatKey) => {
                const hat = HATS_DATA[hatKey];
                const isActive = selectedHat === hatKey;
                return (
                  <button
                    id={`hat-btn-${hatKey}`}
                    key={hatKey}
                    onClick={() => setSelectedHat(hatKey)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 flex items-center justify-between cursor-pointer ${
                      isActive 
                        ? 'bg-slate-950 text-white border-slate-950 shadow-sm font-bold scale-[1.02]' 
                        : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-5 h-5 rounded-full border border-slate-350 shadow-2xs ${
                        hatKey === 'white' 
                          ? 'bg-white' 
                          : hatKey === 'red' 
                          ? 'bg-red-500' 
                          : hatKey === 'black' 
                          ? 'bg-slate-950' 
                          : hatKey === 'yellow' 
                          ? 'bg-amber-400' 
                          : hatKey === 'green' 
                          ? 'bg-emerald-500' 
                          : 'bg-blue-600'
                      }`} />
                      <span className="text-xs sm:text-sm">{hat.name.split(' ')[0]} {hat.name.split(' ').slice(1).join(' ')}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Question Display Panel */}
            <div className="md:col-span-2">
              {selectedHat ? (
                (() => {
                  const hat = HATS_DATA[selectedHat];
                  return (
                    <div className={`rounded-2xl border p-5 sm:p-6 space-y-4 transition-all duration-305 ${hat.bgClass} ${hat.borderClass}`}>
                      <div className="flex items-center gap-2 border-b border-slate-200/50 pb-3">
                        <span className={`w-3.5 h-3.5 rounded-full border ${
                          selectedHat === 'white' 
                            ? 'bg-white border-slate-300' 
                            : selectedHat === 'red' 
                            ? 'bg-red-500 border-red-500' 
                            : selectedHat === 'black' 
                            ? 'bg-slate-950 border-slate-999' 
                            : selectedHat === 'yellow' 
                            ? 'bg-amber-450 border-amber-300' 
                            : selectedHat === 'green' 
                            ? 'bg-emerald-500 border-emerald-500' 
                            : 'bg-blue-600 border-blue-600'
                        }`} />
                        <h4 className={`font-bold text-sm sm:text-base ${hat.textClass} tracking-tight`}>
                          HƯỚNG DẪN ĐỊNH HƯỚNG TƯ DUY • {hat.name.toUpperCase()}
                        </h4>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-1">TRỌNG TÂM CHIẾC MŨ:</span>
                        <p className="text-xs text-slate-600 leading-relaxed font-normal">
                          {hat.focus}
                        </p>
                      </div>

                      <div className="space-y-2.5 pt-2">
                        <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block">CÂU HỎI GỢI MỞ ĐIỂN HÌNH:</span>
                        <div className="space-y-2">
                          {hat.questions.map((q, qidx) => (
                            <div key={qidx} className="flex gap-2.5 items-start bg-white p-3.5 rounded-xl border border-slate-200/65 shadow-2xs">
                              <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                                {q}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })()
              ) : (
                <div className="text-center py-12 border border-dashed rounded-2xl text-slate-400 text-xs">
                  Chọn một chiếc mũ bên cạnh để khai phá hệ thống các câu hỏi gợi mở tư duy mẫu.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'academy' && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 space-y-6 transition-all duration-300 text-slate-800">
          <div className="border border-slate-100 rounded-xl p-5 sm:p-6 bg-slate-50">
            <div className="inline-flex bg-slate-200 text-slate-900 border px-2.5 py-1 rounded-sm text-[10px] font-mono font-bold uppercase tracking-wider mb-2">Đọc thêm chuyên sâu</div>
            <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">Nghiên Cứu thực nghiệm: Ứng dụng "6 Thinking Hats" trong tháo gỡ Xung đột tại Tổ chức Tài chính</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Nghiên cứu chỉ ra rằng các đơn vị ngân hàng thường xuyên vận hành trong áp lực tuân thủ và rủi ro dễ phát sinh <strong className="font-semibold text-slate-800">Mâu thuẫn cá nhân (Relationship Conflict)</strong> khi các quan điểm chuyên môn trái chiều bị biến tướng thành các công kích cá nhân ngoài lề. 
              Công cụ “6Thinking Hats” đem lại cơ chế hóa giải thông minh nhờ tối ưu hóa <strong className="font-semibold text-slate-800">Mâu thuẫn chuyên môn tích cực (Task Conflict)</strong>:
            </p>
            <div className="border-l-4 border-slate-900 pl-4 py-1.5 my-4 bg-white/70 rounded-r-lg">
              <span className="text-xs font-bold text-slate-900 block font-mono mb-1">ỨNG DỤNG:</span>
              <p className="text-xs sm:text-sm text-slate-650 leading-relaxed italic font-normal">
                “Bằng cách hướng dẫn toàn nhóm đồng loạt 'đội' chung một màu mũ tại một thời điểm (ví dụ: tất cả cùng dùng Mũ Đen rà soát rủi ro, sau đó chuyển sang Mũ Vàng kiến thiết cơ hội), phương pháp này triệt tiêu hoàn toàn sự phòng vệ cá nhân. Người đưa ra ý kiến phản biện rủi ro (Mũ Đen) không bị cảm giác đang cản trở dự án, bởi đó là yêu cầu của chiếc mũ. Từ đó, mâu thuẫn cá nhân giảm đáng kể, và năng lực đổi mới sáng tạo nhóm tăng vọt.”
              </p>
            </div>
          </div>

          {/* New Academic Section */}
          <div className="border border-slate-100 rounded-xl p-5 sm:p-6 bg-slate-50/50 space-y-4">
            <div className="inline-flex bg-slate-200 text-slate-900 border px-2.5 py-1 rounded-sm text-[10px] font-mono font-bold uppercase tracking-wider">
              Khảo sát học thuật nâng cao
            </div>
            <h3 className="text-lg font-bold text-slate-900 leading-tight">
              Phân tích ứng dụng thực tiễn của Mô hình 5 Trở ngại và Phương pháp 6 Chiếc mũ tư duy
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Dưới góc nhìn quản trị hiện đại, mô hình 5 Trở ngại của Patrick Lencioni và phương pháp 6 Chiếc mũ tư duy là những công cụ có tính hệ thống nhằm giải quyết các rào cản vô hình trong tương tác nội bộ, từ đó thúc đẩy năng lực phối hợp hành động hướng tới mục tiêu chung.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2 text-slate-900">
              <div className="bg-white p-4 rounded-xl border border-slate-100 space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center gap-1.5 border-b border-slate-50 pb-1.5">
                  ✦ Đối tượng cần thấu hiểu và tại sao?
                </h4>
                <div className="text-xs text-slate-500 space-y-2 font-normal leading-relaxed">
                  <p>
                    Biết được đối tượng tiếp nhận giúp tối ưu hóa việc chuyển hóa lý thuyết thành hành động:
                  </p>
                  <ul className="list-disc pl-4 space-y-1.5 text-slate-600">
                    <li><strong>Nhà quản lý & Điều phối nhóm:</strong> Cần thấu hiểu sâu sắc để chủ động nhận diện các "triệu chứng ngầm" của sự né tránh trách nhiệm hoặc đồng thuận giả tạo, đồng thời ứng dụng công cụ 6 Chiếc mũ để tháo dỡ định kiến cá nhân, hướng cuộc họp vào giải pháp khách quan.</li>
                    <li><strong>Các thành viên trong nhóm:</strong> Việc hiểu rõ tháp trở ngại giúp từng cá nhân tự điều chỉnh hành vi, phân biệt giữa tranh biện mang tính chất xây dựng công việc và tranh cãi cá nhân, từ đó nâng cao tinh thần tự giác trong thực thi cam kết.</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-100 space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center gap-1.5 border-b border-slate-50 pb-1.5">
                  ✦ Các trường hợp không áp dụng được
                </h4>
                <div className="text-xs text-slate-500 space-y-2 font-normal leading-relaxed">
                  <p>
                    Hai phương pháp này có những giới hạn vận hành nhất định và không nên áp dụng rập khuôn trong:
                  </p>
                  <ul className="list-disc pl-4 space-y-1.5 text-slate-600">
                    <li><strong>Công việc có tính độc lập cao (Silo Specialists):</strong> Khi nhiệm vụ đòi hỏi sự chuyên biệt hóa tối đa và không phụ thuộc chéo vào tiến độ của nhau, việc cưỡng ép thiết lập các quy trình thảo luận nhóm Lencioni sẽ làm giảm năng suất cá nhân và gây lãng phí thời gian.</li>
                    <li><strong>Trường hợp khẩn cấp, cần ra quyết định tức thì (Crisis Response):</strong> Trong các bối cảnh đòi hỏi tính tuân thủ tuyệt đối dưới áp lực thời gian (nhà điều hành cứu hộ, xử lý sự cố hệ thống), việc áp dụng thảo luận đa chiều sẽ làm mất đi thời cơ xử lý sự vụ bách thiết.</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-100 space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center gap-1.5 border-b border-slate-50 pb-1.5">
                  ✦ Các lỗi nhận thức và điểm mù dễ gặp
                </h4>
                <div className="text-xs text-slate-500 space-y-2 font-normal leading-relaxed">
                  <p>
                    Người áp dụng thường gặp sai lệch khi đánh giá thực tế do nhầm lẫn giữa các khái niệm:
                  </p>
                  <ul className="list-disc pl-4 space-y-1.5 text-slate-600">
                    <li><strong>Lầm tưởng về lòng tin:</strong> Nhầm giữa lòng tin theo kinh nghiệm dự đoán (đoán trước hành vi của nhau dựa trên thói quen) với lòng tin chân thực dựa trên sự an toàn tâm lý (thoải mái thừa nhận hạn chế, sai sót mà không sợ bị phán xét hay trừng phạt).</li>
                    <li><strong>Ngại thảo luận vì sợ mâu thuẫn:</strong> Đánh đồng một cuộc phản biện chuyên môn thẳng thắn (Task Conflict) với sự bất hòa về mặt cá nhân (Relationship Conflict), dẫn đến việc triệt tiêu mọi ý kiến đóng góp có giá trị để giữ lấy sự hoàn hảo giả tạo bề ngoài.</li>
                    <li><strong>Nhầm lẫn giữa hành vi và điều kiện vận hành:</strong> Đánh giá một thành viên thiếu cam kết hoặc né tránh giải trình mà bỏ qua các rào cản khách quan như quy trình nghiệp vụ thiếu rõ ràng hoặc thiếu các hướng dẫn SLA đồng cấp.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <button
              id="citation-hats-academic"
              onClick={() => setAcademyOpen(!academyOpen)}
              className="w-full text-left p-4 bg-white hover:bg-slate-50 transition-colors flex justify-between items-center text-slate-800"
            >
              <div className="flex gap-2 items-center">
                <BookOpen className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="font-bold text-xs sm:text-sm">[1] Trích nguồn khoa học: Amason (1996) • Conflict Management and Team Outcomes</span>
              </div>
              {academyOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {academyOpen && (
              <div className="p-4 bg-slate-50 border-t border-slate-201 text-xs sm:text-sm text-slate-600 space-y-2 leading-relaxed">
                <span className="font-semibold block text-slate-800 font-mono text-[10px] uppercase">Dẫn nguồn:</span>
                <p className="italic">Amason, A. C. (1996). Distinguishing the effects of cognitive and affective conflict on top management team decisions: Resolving a paradox for multiple management. Academy of Management Journal, 39(1), 123-148.</p>
                <span className="font-semibold block text-slate-800 font-mono text-[10px] uppercase mt-3">Tóm tắt đóng góp học lý:</span>
                <p>
                  Nghiên cứu thực nghiệm chứng minh sự khác biệt ranh giới giữa xung đột nhận thức/chuyên môn (Cognitive Conflict) và xung đột liên cá nhân/tình cảm (Affective Conflict). Việc phân rã dòng thảo luận bằng các kỹ thuật kịch bản khách quan giúp nâng cao năng lực tự chủ của tổ chức đối với các điểm mâu thuẫn cần thiết, cải thiện khả năng ra quyết định cuối cùng một cách toàn diện.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
