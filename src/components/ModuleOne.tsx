/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  AlertCircle, 
  Quote, 
  Compass, 
  Sliders, 
  Milestone,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Award,
  Zap,
  Target,
  Lightbulb,
  CheckCircle2,
  Users,
  Bookmark,
  Share2,
  Clock,
  BookOpenCheck,
  Activity
} from 'lucide-react';

export default function ModuleOne() {
  const [activeTab, setActiveTab] = useState<'model' | 'guide' | 'academy'>('model');
  const [openResearchIdx, setOpenResearchIdx] = useState<number | null>(null);
  const [showArticle, setShowArticle] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      // clip board fail fallback
    }
  };
  const [matrixSelectedCell, setMatrixSelectedCell] = useState<{ x: string, y: string } | null>({
    x: 'Pseudo-team',
    y: 'D'
  });

  const matrixData: Record<string, Record<string, { analysis: string, advice: string }>> = {
    'Pseudo-team': {
      'D': { 
        analysis: "Nhóm Giả Hiệu thường tràn ngập xung đột do cái tôi quá cao của các nhân tố D đơn độc đấu đá giành quyền quyết định.",
        advice: "Hãy giảm bớt mong muốn áp đặt; nhường sân chơi cho quy trình hành động tập thể chung." 
      },
      'I': { 
        analysis: "Tính cách I trong nhóm này dễ tạo không khí vui vẻ ảo, tán gẫu ngoài lề để khỏa lấp mâu thuẫn thực chất trong công việc.",
        advice: "Dùng năng lực chuyển hóa cảm xúc để hướng nhóm tập trung vào hành động thực tế có trách nhiệm bổ trợ." 
      },
      'S': { 
        analysis: "Người nhóm S chọn cách im lặng tuyệt đối, nhẫn nhịn u uất dẫn đến hiện tượng rút lui tâm lý để giữ an toàn tối đa.",
        advice: "Cần được sếp bảo hộ để khuyến khích chia sẻ thật lòng mà không lo sợ bị đánh giá sỉ nhục." 
      },
      'C': { 
        analysis: "Người C ôm giữ thông tin, làm việc tách biệt và quan sát lỗi sai của người khác với sự bất mãn khép búp.",
        advice: "Chủ động chia sẻ dữ liệu tham khảo để làm cơ sở cho cả nhóm cùng rà soát khách quan." 
      }
    },
    'Potential team': {
      'D': { 
        analysis: "Nhân tố D tăng tốc bứt phá đơn lẻ, kéo số hộ nhóm nhưng dễ làm các thành viên khác nản lòng vì tốc độ không đồng đều.",
        advice: "Học cách ủy quyền thích đáng và hỗ trợ đồng đội thích nghi tiến độ." 
      },
      'I': { 
        analysis: "Nhân vật truyền cảm hứng I tạo phong trào sôi động nhưng tiến độ cam kết thường sụt giảm nhanh chóng nếu thiếu kỷ luật.",
        advice: "Ghi chép cụ thể các mốc thời vụ và cùng lập danh mục theo sát dự án." 
      },
      'S': { 
        analysis: "Người S bắt đầu đồng hành cùng team, hỗ trợ các việc vụn vặt nhưng e ngại va chạm trực tiếp khi chuyển tiếp tiến độ.",
        advice: "Đưa ra phản hồi trung thực mang tính xây dựng cho các đồng nghiệp D và I." 
      },
      'C': { 
        analysis: "Người C lập ra các quy định mẫu rườm rà nhưng mọi người lười hưởng ứng, tạo cảm giác bất mãn kỹ thuật.",
        advice: "Tinh gọn hóa biểu mẫu chuẩn, tập thích nghi linh động các ý tưởng mới đầu mẻ." 
      }
    },
    'Real team': {
      'D': { 
        analysis: "Nhân tố D đóng vai trò định hướng thách thức rõ rệt, thúc ép đạt KPI cốt lõi nhưng tôn trọng ranh giới phân vai của đồng đội.",
        advice: "Sử dụng lối tư duy sắc bén để chỉ huy giải quyết sự cố phát sinh khẩn cấp đột ngột." 
      },
      'I': { 
        analysis: "Nhân tố I liên tục khuấy động tính sáng tạo đột phá, tổ chức ăn mừng chiến thắng nhỏ nuôi dưỡng năng lượng tập thể.",
        advice: "Tập trung thuyết trình, kết nối liên phòng ban tối ưu hóa nguồn lực cho team." 
      },
      'S': { 
        analysis: "Đội ngũ S là hậu phương tin cậy tuyệt đối, kiên định hỗ trợ giao dịch, duy trì không hòa nhã tối đa.",
        advice: "Chủ động kiểm soát điều phối sự gắn kết của các thành viên trong nội bộ phòng." 
      },
      'C': { 
        analysis: "Người C vận hành chốt chặn kiểm soát rủi ro hoàn hảo, cung cấp đầy đủ luận cứ kỹ thuật khách quan tin cậy cho toàn nhóm.",
        advice: "Thiết lập hệ thống báo cáo hiệu quả chuẩn mực để duy trì cam kết chuyên sâu." 
      }
    },
    'High Performance Team': {
      'D': { 
        analysis: "Người D sẵn sàng lùi lại phía sau để hỗ trợ, san sẻ đồng nghiệp S hoặc C đang chịu áp lực kỹ thuật từ nghiệp vụ lớn.",
        advice: "Lãnh đạo phục vụ (Servant Leadership) bộc lộ tự nhiên, truyền cảm hứng phát triển." 
      },
      'I': { 
        analysis: "Sự thấu cảm nhạy bén của người I giúp họ nắm bắt tâm trạng đồng đội lập tức và xoa dịu stress ngay trước khi chuyển hóa xấu.",
        advice: "Tạo dựng môi trường an toàn tuyệt đối biểu đạt tài năng của cả đội." 
      },
      'S': { 
        analysis: "Người S chủ động và dũng cảm nói thẳng ý kiến đóng góp quyết đoán vì lợi ích thực tế tối cao của cơ quan.",
        advice: "Kiên định giữ gìn các giá trị cốt lõi, nâng tầm kết nối liên phòng." 
      },
      'C': { 
        analysis: "Người C linh hoạt chấp nhận rủi ro có tính toán, tạo dựng khung thử nghiệm các sáng kiến số hóa bứt phá.",
        advice: "Kết hợp tư duy logic bẩm sinh để nhân rộng quy mô thành quả bứt phá cho ngân hàng." 
      }
    }
  };

  const stagesList = ['Pseudo-team', 'Potential team', 'Real team', 'High Performance Team'];
  const discList = ['D', 'I', 'S', 'C'];

  if (showArticle) {
    return (
      <div id="m1-article-detail-view" className="space-y-8 animate-fade-in text-slate-800 max-w-4xl mx-auto pb-12">
        {/* Back navigation & Actions row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <button
            id="back-to-research-btn"
            onClick={() => {
              setShowArticle(false);
              window.scrollTo({ top: 350, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium text-xs sm:text-sm transition-all duration-200 hover:-translate-x-1 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại Góc Học Thuật (Research)</span>
          </button>
          
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-mono">Chuyên đề chuyên gia chọn lọc</span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1 text-slate-500 font-mono">
              <Clock className="w-3.5 h-3.5" /> 10 phút đọc
            </span>
            <button 
              id="bookmark-btn"
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-2 rounded-lg border transition cursor-pointer ${
                bookmarked 
                  ? 'bg-amber-50 border-amber-200 text-amber-600' 
                  : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800'
              }`}
              title="Lưu bài viết"
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-amber-500' : ''}`} />
            </button>
            <button 
              id="share-btn"
              onClick={handleShare}
              className={`relative p-2 rounded-lg border transition cursor-pointer ${
                copied 
                  ? 'bg-emerald-50 border-emerald-250 text-emerald-600' 
                  : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800'
              }`}
              title="Sao chép liên kết"
            >
              {copied ? (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-1.5 py-0.5 rounded shadow whitespace-nowrap">Đã sao chép!</span>
              ) : null}
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Premium Banner */}
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl border border-slate-800">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <BookOpenCheck className="w-64 h-64 text-sky-405" />
          </div>
          
          <div className="relative z-10 space-y-4">
            <span className="inline-flex items-center gap-1.5 bg-sky-500/10 border border-sky-500/20 text-sky-300 text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              <Sparkles className="w-3 h-3 text-sky-400" /> Góc Lãnh Đạo & Quản Trị
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-display leading-tight tracking-tight text-white max-w-3xl">
              Từ "Đám Đông" Đến Đội Ngũ Bách Chiến Bách Thắng: Bài Học Xây Dựng Team Dành Cho Banker
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm font-mono max-w-xl">
              Lược thảo tri thức tinh tuyển từ siêu phẩm kinh điển <span className="text-sky-300 font-serif-academic font-normal italic">"The Wisdom of Teams"</span> (John Katzenbach & Douglas Smith, McKinsey & Company).
            </p>
          </div>
        </div>

        {/* Introduction Quote Box */}
        <div className="bg-amber-50/20 border-l-4 border-amber-500 rounded-r-2xl p-6 sm:p-8 space-y-4 shadow-sm animate-fade-in">
          <p className="text-md font-semibold text-slate-850 italic">Chào các bạn đồng nghiệp,</p>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            Trong guồng quay hối hả của ngành ngân hàng – nơi chỉ tiêu kinh doanh (KPI) và các dự án chuyển đổi số luôn đặt chúng ta vào trạng thái "chạy nước rút" – có bao giờ bạn tự hỏi: Vì sao có những phòng ban luôn vượt chỉ tiêu một cách ngoạn mục, trong khi một số khác lại chật vật dù sở hữu nhiều cá nhân xuất sắc?
          </p>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-semibold">
            Câu trả lời nằm ở sự khác biệt giữa một <span className="text-slate-950 font-bold underline decoration-amber-500 decoration-2">"đám đông làm việc chung"</span> và một <span className="text-slate-950 font-bold underline decoration-teal-500 decoration-2">"đội ngũ thực sự"</span>.
          </p>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            Hôm nay, chúng ta sẽ cùng lật lại những tư tưởng vượt thời gian từ cuốn sách kinh điển <strong className="font-semibold text-slate-950 font-serif-academic italic">"The Wisdom of Teams"</strong> (Sự Khôn Ngoan Của Các Nhóm) của John Katzenbach và Douglas Smith – hai cựu chuyên gia tư vấn cấp cao từ McKinsey. Dù ra đời từ năm 1993, những đúc kết này vẫn là "kim chỉ nam" sắc bén cho bất kỳ ai đang làm quản lý tại cả Hội sở lẫn Đơn vị kinh doanh.
          </p>
        </div>

        {/* Section 1: Thế nào là một Nhóm thực sự */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-950 border-b border-slate-100 pb-2">
            Thế nào là một "Nhóm thực sự"?
          </h2>
          <p className="text-slate-655 text-sm sm:text-base">
            Chúng ta thường dễ dãi gọi bất cứ tập hợp nhân sự nào là một "team". Nhưng theo Katzenbach và Smith, một nhóm đúng nghĩa phải hội tụ đủ các yếu tố cốt lõi:
          </p>
          
          <div className="bg-slate-950 text-slate-200 rounded-2xl p-6 relative border border-slate-800 shadow-inner">
            <Quote className="absolute -top-3 -left-3 w-8 h-8 text-teal-400 bg-slate-950 rounded-full p-1 border border-slate-800" />
            <p className="text-sm sm:text-base font-medium italic text-teal-300 leading-relaxed pl-3">
              "Một số lượng nhỏ những người có kỹ năng bổ trợ lẫn nhau, cam kết vì một mục đích chung, mục tiêu hiệu suất, phương pháp làm việc và cùng chịu trách nhiệm chéo."
            </p>
          </div>

          <p className="text-slate-655 text-sm sm:text-base mt-2">
            Sức mạnh của một đội ngũ được xây dựng dựa trên thế chân kiềng vững chắc:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="bg-white border border-slate-150 rounded-xl p-5 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center mb-3">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold font-mono tracking-wider text-slate-400 mb-1">KẾT QUẢ THỰC TẾ</h3>
              <p className="text-sm font-semibold text-slate-800 leading-snug">
                Trách nhiệm + Kỹ năng = Tạo ra kết quả thực tế.
              </p>
            </div>

            <div className="bg-white border border-slate-150 rounded-xl p-5 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center mb-3">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold font-mono tracking-wider text-slate-400 mb-1">SỰ PHÁT TRIỂN CÁ NHÂN</h3>
              <p className="text-sm font-semibold text-slate-800 leading-snug">
                Cam kết + Trách nhiệm = Thúc đẩy sự phát triển cá nhân của từng thành viên.
              </p>
            </div>

            <div className="bg-white border border-slate-150 rounded-xl p-5 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold font-mono tracking-wider text-slate-400 mb-1">THÀNH QUẢ TẬP THỂ</h3>
              <p className="text-sm font-semibold text-slate-800 leading-snug">
                Kỹ năng + Cam kết = Tạo ra thành quả chung của tập thể.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Timeline Đường cong */}
        <div className="space-y-4 pt-4">
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-950 border-b border-slate-100 pb-2">
            Team của bạn đang ở đâu trên "Đường cong hiệu suất"?
          </h2>
          <p className="text-slate-655 text-sm sm:text-base">
            Mọi đội ngũ đều cần thời gian để tiến hóa. Tác giả đã chia quá trình này thành 5 giai đoạn. Hãy thử soi chiếu xem phòng ban hay dự án của bạn đang nằm ở đâu nhé:
          </p>

          <div className="space-y-4 pt-2">
            {/* Stage 1 */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:shadow-md transition-all duration-300 border-l-4 border-l-slate-400 flex gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-800 flex-shrink-0 flex items-center justify-center font-mono font-bold text-sm mt-0.5">1</div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">Nhóm làm việc (Working Group)</h4>
                  <span className="text-[10px] bg-slate-100 text-slate-600 font-mono px-2 py-0.5 rounded-full font-bold">Hiệu suất: Sơ khởi</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Mọi người tập hợp lại chủ yếu để chia sẻ thông tin, giúp mỗi người tự làm tốt việc riêng của mình. Hiệu quả chung chỉ đơn thuần là phép cộng của từng cá nhân.
                </p>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:shadow-md transition-all duration-300 border-l-4 border-l-rose-400 flex gap-4">
              <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex-shrink-0 flex items-center justify-center font-mono font-bold text-sm mt-0.5">2</div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">Nhóm giả tạo (Pseudo-team)</h4>
                  <span className="text-[10px] bg-rose-50 text-rose-700 font-mono px-2 py-0.5 rounded-full font-bold">Hiệu suất: Chậm nghẽn (Đáy)</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Mang danh nghĩa là "một team" nhưng bên trong mạnh ai nấy làm. Các thành viên có xu hướng theo đuổi lợi ích cá nhân, đánh bóng tên tuổi thay vì hướng tới mục tiêu chung.
                </p>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:shadow-md transition-all duration-300 border-l-4 border-l-amber-400 flex gap-4">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex-shrink-0 flex items-center justify-center font-mono font-bold text-sm mt-0.5">3</div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">Nhóm tiềm năng (Potential Team)</h4>
                  <span className="text-[10px] bg-amber-50 text-amber-700 font-mono px-2 py-0.5 rounded-full font-bold">Hiệu suất: Đang lên</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Cả đội đã có ý thức muốn nâng cao hiệu suất chung, nhưng chưa tìm ra được một mục đích đủ gắn kết hoặc chưa biết cách chia sẻ trách nhiệm với nhau.
                </p>
              </div>
            </div>

            {/* Stage 4 */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:shadow-md transition-all duration-300 border-l-4 border-l-indigo-400 flex gap-4">
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex-shrink-0 flex items-center justify-center font-mono font-bold text-sm mt-0.5">4</div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">Nhóm thực sự (Real Team)</h4>
                  <span className="text-[10px] bg-indigo-50 text-indigo-700 font-mono px-2 py-0.5 rounded-full font-bold">Hiệu suất: Thực chất</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Mọi người thống nhất mục tiêu, biết cách sử dụng thế mạnh để bù trừ điểm yếu cho nhau và sẵn sàng chịu trách nhiệm chéo cho sự thành bại của dự án.
                </p>
              </div>
            </div>

            {/* Stage 5 */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:shadow-md transition-all duration-300 border-l-4 border-l-teal-500 flex gap-4">
              <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex-shrink-0 flex items-center justify-center font-mono font-bold text-sm mt-0.5">5</div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">Nhóm hiệu suất cao (High-performance Team)</h4>
                  <span className="text-[10px] bg-teal-50 text-teal-700 font-mono px-2 py-0.5 rounded-full font-bold">Hiệu suất: Bứt phá dồi dào</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Đây là cảnh giới cao nhất. Tại đây, các thành viên không chỉ cam kết với thành công của nhóm, mà còn cam kết thúc đẩy sự phát triển cá nhân của từng đồng nghiệp. Họ thường xuyên tạo ra những kỷ lục vượt xa mọi kỳ vọng.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Sự thật ngược đời */}
        <div className="space-y-4 pt-4">
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-950 border-b border-slate-100 pb-2">
            Những sự thật "ngược đời" trong quản trị
          </h2>
          <p className="text-slate-655 text-sm sm:text-base">
            Nghiên cứu từ 47 tổ chức lớn đã chỉ ra những sự thật có thể làm thay đổi hoàn toàn cách chúng ta xây dựng đội ngũ:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="bg-white border border-slate-150 rounded-2xl p-6 shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                  <Award className="w-5 h-5 text-teal-300" />
                </div>
                <h4 className="font-bold text-slate-900 text-base leading-snug">Kỹ năng quan trọng hơn tính cách</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Chúng ta thường thích tuyển những người có tính cách giống nhau để "dễ hòa đồng". Tuy nhiên, một nhóm xuất sắc cần sự đa dạng về kỹ năng (người giỏi phân tích đi kèm với người giỏi giao tiếp) hơn là sự tương đồng về tính cách.
                </p>
              </div>
            </div>

            <div className="bg-white border border-slate-150 rounded-2xl p-6 shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                  <Zap className="w-5 h-5 text-amber-300" />
                </div>
                <h4 className="font-bold text-slate-900 text-base leading-snug">Thách thức mới là liều thuốc kích thích</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Động lực gắn kết mạnh mẽ nhất không đến từ các buổi teambuilding tốn kém, mà đến từ những thách thức thực tế và khao khát chinh phục mục tiêu chung.
                </p>
              </div>
            </div>

            <div className="bg-white border border-slate-150 rounded-2xl p-6 shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                  <Target className="w-5 h-5 text-sky-300" />
                </div>
                <h4 className="font-bold text-slate-900 text-base leading-snug">Lãnh đạo cấp cao lại khó làm việc nhóm nhất</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Các cá nhân xuất sắc ở cấp quản lý thường có cái tôi rất lớn. Để làm việc nhóm hiệu quả ở cấp độ này, tổ chức cần những cơ chế đặc biệt để giảm bớt tính tự tôn và hướng họ vào lợi ích chung.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Ứng dụng thực chiến */}
        <div className="space-y-6 pt-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-955 border-b border-slate-100 pb-2">
              Ứng dụng thực chiến tại Ngân hàng
            </h2>
            <p className="text-slate-655 text-sm sm:text-base mt-2">
              Lý thuyết sẽ mãi là lý thuyết nếu không được đặt vào bối cảnh thực tế. Hãy cùng xem xét 2 kịch bản quen thuộc:
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Story 1 */}
            <div className="bg-white border border-slate-150 rounded-2xl p-6 sm:p-8 shadow-xs hover:shadow-lg transition-all duration-300">
              <span className="text-[10px] font-mono font-bold text-indigo-600 uppercase tracking-widest block mb-1">CÂU CHUYỆN 1</span>
              <h3 className="text-lg font-bold text-slate-900 mb-4 font-display">Phát triển App Ngân hàng Số tại Hội sở</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-rose-50/40 border border-rose-100 p-5 rounded-xl">
                  <div className="flex items-center gap-1.5 text-rose-800 font-bold text-xs font-mono uppercase mb-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span> Vấn đề:
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                    Thay vì để quy trình chạy "chuyền tay" qua các Khối/Phòng {"(Kinh doanh lên ý tưởng -> IT viết code -> Risk thẩm định -> Pháp chế phê duyệt)"}, dự án thường xuyên chậm tiến độ vì đùn đẩy trách nhiệm (đặc trưng của Nhóm làm việc).
                  </p>
                </div>
                
                <div className="bg-teal-50/40 border border-teal-100 p-5 rounded-xl">
                  <div className="flex items-center gap-1.5 text-teal-800 font-bold text-xs font-mono uppercase mb-2">
                    <span className="w-2 h-2 rounded-full bg-teal-500"></span> Giải pháp:
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    Giám đốc dự án cần tạo ra một Nhóm thực sự bằng mô hình Squad/Agile. Kéo 1 BA, 1 Dev, 1 chuyên viên Risk và 1 Legal vào chung một đội. Giao cho họ một mục tiêu sống còn (Go-live trong 2 tháng, lỗi dưới 1%) và yêu cầu chịu trách nhiệm chéo. Khi đó, Risk và Legal sẽ chủ động tham gia tư vấn giải pháp ngay từ những dòng code đầu tiên, thay vì đóng vai trò "cảnh sát bắt lỗi" ở khâu cuối cùng.
                  </p>
                </div>
              </div>
            </div>

            {/* Story 2 */}
            <div className="bg-white border border-slate-150 rounded-2xl p-6 sm:p-8 shadow-xs hover:shadow-lg transition-all duration-300">
              <span className="text-[10px] font-mono font-bold text-indigo-600 uppercase tracking-widest block mb-1">CÂU CHUYỆN 2</span>
              <h3 className="text-lg font-bold text-slate-900 mb-4 font-display">Chạy nước rút cuối năm tại Đơn vị kinh doanh</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-rose-50/40 border border-rose-100 p-5 rounded-xl">
                  <div className="flex items-center gap-1.5 text-rose-800 font-bold text-xs font-mono uppercase mb-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span> Vấn đề:
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                    Tháng 11 sắp trôi qua, tại phòng Khách hàng Doanh nghiệp, các RM (Chuyên viên quan hệ khách hàng) bắt đầu có xu hướng "giấu khách", ngại hỗ trợ nhau thẩm định hồ sơ vì sợ ảnh hưởng đến KPI cá nhân của riêng mình (Nhóm giả tạo).
                  </p>
                </div>
                
                <div className="bg-teal-50/40 border border-teal-100 p-5 rounded-xl">
                  <div className="flex items-center gap-1.5 text-teal-800 font-bold text-xs font-mono uppercase mb-2">
                    <span className="w-2 h-2 rounded-full bg-teal-500"></span> Giải pháp:
                  </div>
                  <p className="text-xs sm:text-sm text-slate-705 leading-relaxed font-normal">
                    Giám đốc Chi nhánh cần đưa ra cơ chế chuyển đổi phòng thành Nhóm hiệu suất cao. Cụ thể: Bổ sung "Mục tiêu hiệu suất chung" (Ví dụ: Thưởng vượt cấp quỹ lương nếu toàn phòng đạt 120% chỉ tiêu). Đồng thời, ghép cặp các RM để phát triển lẫn nhau: Một RM dày dặn kinh nghiệm phân tích BCTC đi cùng một RM trẻ có khả năng cày ải, chốt sale tốt. Khi hợp đồng lớn được giải ngân, cả hai cùng ghi nhận thành quả. Môi trường cạnh tranh độc hại sẽ nhường chỗ cho tinh thần đồng đội thực chiến.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Closing Thoughts */}
        <div className="bg-slate-950 text-slate-200 rounded-3xl p-8 sm:p-12 border border-slate-800 text-center space-y-4 shadow-lg relative overflow-hidden mt-8">
          <div className="absolute top-0 left-0 w-32 h-32 bg-teal-500 opacity-5 blur-3xl rounded-full"></div>
          <p className="text-sm sm:text-base leading-relaxed italic max-w-2xl mx-auto text-teal-300 font-medium font-display">
            "Làm việc nhóm không phải là một khẩu hiệu, nó là một chuỗi những hành động có chủ đích."
          </p>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Hy vọng bài viết này sẽ cung cấp cho các anh chị quản lý và toàn thể CBNV những góc nhìn mới để cùng nhau biến "đám đông" phòng ban mình thành những Nhóm hiệu suất cao, sẵn sàng chinh phục mọi thách thức kinh doanh phía trước.
          </p>
          <div className="pt-4 flex justify-center gap-3">
            <button
              id="m1-article-bottom-back-btn"
              onClick={() => {
                setShowArticle(false);
                window.scrollTo({ top: 350, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 bg-white text-slate-900 border border-slate-200 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm hover:bg-slate-50 transition shadow-sm hover:shadow cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại Góc Học Thuật</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="module-one-view" className="space-y-6">
      {/* Intro Bannner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800">
        <span className="text-xs font-mono font-bold tracking-widest text-blue-400 block mb-2 uppercase">MODULE 1 • TIÊU CHUẨN CHUYÊN GIA</span>
        <h2 className="text-xl sm:text-3xl font-bold tracking-tight">Thấu hiểu đồng đội</h2>
        <p className="text-xs sm:text-base text-slate-400 mt-2 max-w-3xl leading-relaxed">
          Nền tảng của rèn luyện đội nhóm xuất sắc bắt đầu tư hành trình giải mã tính cách tự nhiên và xác định chính xác dòng chảy phát triển tập thể.
        </p>
      </div>

      {/* Embedded Tabs */}
      <div className="flex border-b border-slate-200 gap-1 overflow-x-auto pb-px">
        <button
          id="m1-tab-model"
          onClick={() => setActiveTab('model')}
          className={`px-5 py-3 text-sm font-semibold whitespace-nowrap cursor-pointer relative transition-all ${
            activeTab === 'model' 
              ? 'text-slate-950 bg-slate-50/50' 
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span className="relative z-10">1. Mô Hình Chuẩn (Model)</span>
          {activeTab === 'model' && (
            <motion.div
              layoutId="m1ActiveTabUnderline"
              className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-slate-950"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
        </button>
        <button
          id="m1-tab-guide"
          onClick={() => setActiveTab('guide')}
          className={`px-5 py-3 text-sm font-semibold whitespace-nowrap cursor-pointer relative transition-all ${
            activeTab === 'guide' 
              ? 'text-slate-950 bg-slate-50/50' 
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span className="relative z-10">2. Ứng Dụng & Matrix (Quick-guide)</span>
          {activeTab === 'guide' && (
            <motion.div
              layoutId="m1ActiveTabUnderline"
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-950"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
        </button>
        <button
          id="m1-tab-academy"
          onClick={() => setActiveTab('academy')}
          className={`px-5 py-3 text-sm font-semibold whitespace-nowrap cursor-pointer relative transition-all ${
            activeTab === 'academy' 
              ? 'text-slate-950 bg-slate-50/50' 
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span className="relative z-10">3. Góc Học Thuật (Research)</span>
          {activeTab === 'academy' && (
            <motion.div
              layoutId="m1ActiveTabUnderline"
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-950"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
        </button>
      </div>

      {/* Tab Core Content */}
      {activeTab === 'model' && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 space-y-8 transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Compass className="w-5 h-5 text-blue-600" /> Bản đồ 4 Nhóm Tính Cách D.I.S.C
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Hệ thống đo lường hành vi tự nhiên dựa trên hai trục định hướng chính: <strong className="font-semibold text-slate-800">Trục Hướng về Công việc (D, C) vs Hướng về Con người (I, S)</strong> kết hợp với <strong className="font-semibold text-slate-800">Trục Hành động Chủ động (D, I) vs Hành động Cẩn trọng (C, S)</strong>.
              </p>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <motion.div
                  whileHover={{ y: -2, scale: 1.01, boxShadow: "0 10px 15px -3px rgba(239, 68, 68, 0.08), 0 0 15px rgba(239, 68, 68, 0.12)" }}
                  className="border border-red-100 bg-red-50/20 p-4 rounded-xl transition-all duration-300 cursor-default"
                >
                  <span className="font-bold text-red-700 block text-xs font-mono">D - DOMINANCE</span>
                  <span className="text-xs text-slate-500 mt-1 block leading-relaxed">Tiên phong, quyết định nhanh, dứt khoát hướng tới doanh số.</span>
                </motion.div>
                <motion.div
                  whileHover={{ y: -2, scale: 1.01, boxShadow: "0 10px 15px -3px rgba(245, 158, 11, 0.08), 0 0 15px rgba(245, 158, 11, 0.12)" }}
                  className="border border-amber-100 bg-amber-50/20 p-4 rounded-xl transition-all duration-300 cursor-default"
                >
                  <span className="font-bold text-amber-700 block text-xs font-mono">I - INFLUENCE</span>
                  <span className="text-xs text-slate-500 mt-1 block leading-relaxed">Kết nối cảm xúc, truyền cảm hứng, sáng tạo không giới hạn.</span>
                </motion.div>
                <motion.div
                  whileHover={{ y: -2, scale: 1.01, boxShadow: "0 10px 15px -3px rgba(16, 185, 129, 0.08), 0 0 15px rgba(16, 185, 129, 0.12)" }}
                  className="border border-emerald-100 bg-emerald-50/20 p-4 rounded-xl transition-all duration-300 cursor-default"
                >
                  <span className="font-bold text-emerald-700 block text-xs font-mono">S - STEADINESS</span>
                  <span className="text-xs text-slate-500 mt-1 block leading-relaxed">Hòa nhã, kiên định, hỗ trợ thầm lặng và gìn giữ hòa khí.</span>
                </motion.div>
                <motion.div
                  whileHover={{ y: -2, scale: 1.01, boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.08), 0 0 15px rgba(59, 130, 246, 0.12)" }}
                  className="border border-blue-100 bg-blue-50/20 p-4 rounded-xl transition-all duration-300 cursor-default"
                >
                  <span className="font-bold text-blue-700 block text-xs font-mono">C - CONSCIENTIOUSNESS</span>
                  <span className="text-xs text-slate-500 mt-1 block leading-relaxed">Chính xác, logic, bảo vệ quy trình tác nghiệp an toàn rủi ro.</span>
                </motion.div>
              </div>
            </div>

            <div className="space-y-4 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Milestone className="w-5 h-5 text-blue-600" /> 5 giai đoạn trong đường cong hiệu suất nhóm
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Theo Katzenbach & Smith trong công trình nổi tiếng <span className="font-serif-academic font-semibold text-slate-900 italic">"The Wisdom of Teams"</span>
              </p>
              <div className="relative border-l border-slate-200 ml-3.5 pl-6 space-y-4 py-2">
                <div className="relative">
                  <div className="absolute -left-9.5 top-0 w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-mono text-xs font-bold">1</div>
                  <h4 className="text-sm font-bold text-slate-850">Working Group (Nhóm làm việc)</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mt-0.5">Mục tiêu cá nhân đóng vai trò tuyệt đối, chưa phát sinh nhu cầu phối hợp hỗ trợ thực tế.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-9.5 top-0 w-6 h-6 rounded-full bg-slate-950 text-white flex items-center justify-center font-mono text-xs font-bold">2</div>
                  <h4 className="text-sm font-bold text-slate-900">Pseudo-team (Nhóm giả hiệu)</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mt-0.5">Bắt buộc họp chung nhưng cái tôi cao, xung đột cá nhân kìm hãm hiệu năng.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-9.5 top-0 w-6 h-6 rounded-full bg-slate-950 text-white flex items-center justify-center font-mono text-xs font-bold">3</div>
                  <h4 className="text-sm font-bold text-slate-900">Potential team (Nhóm tiềm năng)</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mt-0.5">Nhận thức được lợi ích làm việc nhóm, đang học cách thiết lập cam kết.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-9.5 top-0 w-6 h-6 rounded-full bg-slate-950 text-white flex items-center justify-center font-mono text-xs font-bold">4</div>
                  <h4 className="text-sm font-bold text-slate-900">Real team (Nhóm thực)</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mt-0.5">Đã đạt mức độ tin cậy lẫn nhau cao, tự lực hỗ trợ, chia sẻ công việc khi quá tải.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-9.5 top-0 w-6 h-6 rounded-full bg-slate-950 text-white flex items-center justify-center font-mono text-xs font-bold">5</div>
                  <h4 className="text-sm font-bold text-slate-900">High Performance Team (Nhóm Hiệu suất cao)</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mt-0.5">Sự thấu cảm sâu sắc, hỗ trợ tự nhiên, tinh thần đồng hành mãnh liệt.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'guide' && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 space-y-8 transition-all duration-300">
          {/* Quick-communication rules in banks */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-1.5">
              <Sliders className="w-5 h-5 text-blue-600" /> Phương pháp giao tiếp hiệu quả theo nhóm tính cách DISC tại công sở
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-red-50/30 border border-red-100 rounded-xl p-4">
                <span className="text-xs font-mono font-bold text-red-700 block uppercase mb-1">Gặp người sếp Nhóm D:</span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Trình bày trực diện, nêu giải pháp đầu ra trước rồi đến dữ liệu phụ lục. Không nói dông dài lý do bên lề.
                </p>
              </div>
              <div className="bg-amber-50/30 border border-amber-100 rounded-xl p-4">
                <span className="text-xs font-mono font-bold text-amber-700 block uppercase mb-1">Gặp nhân sư Nhóm I:</span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Lắng nghe ý tưởng bùng nổ của họ, khen ngợi tính sáng tạo trước khi gắn chặt thời mốc triển khai chi tiết bằng văn bản.
                </p>
              </div>
              <div className="bg-emerald-50/40 border border-emerald-100 rounded-xl p-4">
                <span className="text-xs font-mono font-bold text-emerald-700 block uppercase mb-1">Gặp đồng nghiệp Nhóm S:</span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Tiếp cận nhẹ nhàng, chân thành thăm hỏi. Tránh giao việc áp đặt đột ngột; hãy giải thích rõ tác động tích cực đến cả nhóm.
                </p>
              </div>
              <div className="bg-blue-50/30 border border-blue-100 rounded-xl p-4">
                <span className="text-xs font-mono font-bold text-blue-700 block uppercase mb-1">Gặp chuyên viên Nhóm C:</span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Chuẩn bị tài liệu kỹ lưỡng, số liệu đúng quy trình và thông tư. Tránh các phát biểu ước chừng hay thiếu dẫn chứng.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Matrix Grid (DISC x Katzenbach Stages) */}
          <div className="border-t border-slate-100 pt-8">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-1.5">
                <Compass className="w-5 h-5 text-blue-600" /> Biểu đồ Ma Trận Phối Hợp (DISC x 5 Team Stages)
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Kéo lướt và chạm chọn từng khối ma trận bên dưới để phân tích chiều sâu sự đóng góp và hành vi của từng nhóm tính cách tương ứng các giai đoạn.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Matrix Table */}
              <div className="lg:col-span-2 overflow-x-auto border border-slate-200 rounded-xl bg-slate-50 p-2 sm:p-4">
                <div className="min-w-[450px]">
                  {/* Table Header */}
                  <div className="grid grid-cols-5 gap-1.5 text-center text-xs font-bold font-mono text-slate-500 pb-2 border-b border-slate-200">
                    <div className="text-left py-1 text-slate-400">D.I.S.C / Giai đoạn</div>
                    <div className="py-1 uppercase text-[10px] tracking-tight">Pseudo-team</div>
                    <div className="py-1 uppercase text-[10px] tracking-tight">Potential</div>
                    <div className="py-1 uppercase text-[10px] tracking-tight">Real team</div>
                    <div className="py-1 uppercase text-[10px] tracking-tight">High Perf</div>
                  </div>

                  {/* Rows */}
                  {discList.map((disc) => {
                    const rowColors = {
                      'D': 'hover:bg-red-50/20 text-red-700 border-red-100',
                      'I': 'hover:bg-amber-50/20 text-amber-700 border-amber-100',
                      'S': 'hover:bg-emerald-50/20 text-emerald-700 border-emerald-100',
                      'C': 'hover:bg-blue-50/20 text-blue-700 border-blue-100'
                    };
                    return (
                      <div key={disc} className="grid grid-cols-5 gap-1.5 py-2 items-center border-b border-slate-200/50 last:border-0">
                        <div className="text-left font-bold text-sm text-slate-800 flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${
                            disc === 'D' ? 'bg-red-500' : disc === 'I' ? 'bg-amber-500' : disc === 'S' ? 'bg-emerald-500' : 'bg-blue-500'
                          }`}></span>
                          Nhóm {disc}
                        </div>
                        {stagesList.map((stage) => {
                          const isSelected = matrixSelectedCell?.x === stage && matrixSelectedCell?.y === disc;
                          const isAnySelected = !!matrixSelectedCell;
                          return (
                            <button
                              id={`cell-${stage}-${disc}`}
                              key={stage}
                              onClick={() => setMatrixSelectedCell({ x: stage, y: disc })}
                              className={`py-3 text-[11px] rounded-lg border text-center font-medium transition-all duration-300 truncate px-1 cursor-pointer ${
                                isSelected 
                                  ? 'bg-slate-900 text-white border-transparent ring-2 ring-slate-950 ring-offset-2 shadow-md scale-[1.03] z-10 relative font-bold' 
                                  : isAnySelected 
                                    ? 'bg-white text-slate-600 border-slate-200 opacity-45 hover:opacity-100 hover:border-slate-800' 
                                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-800'
                              }`}
                            >
                              Xem {disc}-{stage.split(' ')[0]}
                            </button>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Cell Analysis Panel */}
              <div className="bg-slate-900 text-slate-100 rounded-xl p-5 sm:p-6 border border-slate-800 flex flex-col justify-between">
                {matrixSelectedCell ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-blue-400 font-bold">CHUYÊN GIA CHẨN ĐOÁN MA TRẬN</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 font-mono font-bold block mb-1">TÍNH CÁCH:</span>
                      <span className="text-base font-bold text-white flex items-center gap-1.5">
                        <span className={`w-2.5 h-2.5 rounded-full ${
                          matrixSelectedCell.y === 'D' ? 'bg-red-500' : matrixSelectedCell.y === 'I' ? 'bg-amber-500' : matrixSelectedCell.y === 'S' ? 'bg-emerald-500' : 'bg-blue-500'
                        }`}></span>
                        Nhóm {matrixSelectedCell.y} • {matrixSelectedCell.x}
                      </span>
                    </div>
                    <div className="space-y-3 pt-2">
                      <div>
                        <span className="text-xs text-slate-400 font-bold block mb-1">Hiện tượng đặc trưng hành vi:</span>
                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                          {matrixData[matrixSelectedCell.x][matrixSelectedCell.y].analysis}
                        </p>
                      </div>
                      <div className="bg-slate-800/60 p-3.5 rounded-lg border border-slate-800">
                        <span className="text-xs text-blue-400 font-bold block mb-1">Chuyên gia can thiệp:</span>
                        <p className="text-xs text-slate-300 leading-relaxed font-normal">
                          {matrixData[matrixSelectedCell.x][matrixSelectedCell.y].advice}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-400">
                    <p className="text-xs">Chọn chạm một ô ma trận để xem chẩn đoán hành vi chi tiết từ các chuyên gia.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'academy' && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 space-y-6 transition-all duration-300 text-slate-800">
          {/* Academic Citations Accordions */}
          <div className="space-y-5">
            {/* Citation 1: Premium Interactive Card Block */}
            <div 
              id="premium-research-card-1"
              onClick={() => {
                setShowArticle(true);
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              className="group relative bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 cursor-pointer shadow-md hover:shadow-xl hover:shadow-slate-950/20 transition-all duration-300 transform hover:-translate-y-1.5 border border-slate-800 overflow-hidden text-left"
            >
              {/* Premium rotating glowing border/sheen overlay */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/50 to-transparent animate-pulse" />
              <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-sky-400/10 to-transparent" />
              
              {/* Hardware-accelerated sliding white glossy shimmer sheen across container */}
              <motion.div
                className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] pointer-events-none"
                animate={{ left: "150%" }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", repeatDelay: 1.5 }}
              />

              {/* Background ambient light mesh */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl group-hover:bg-sky-500/15 transition-colors duration-300 pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-4 max-w-2xl">
                  {/* Badges line */}
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 bg-sky-500/10 border border-sky-500/20 text-sky-400 text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      <Sparkles className="w-2.5 h-2.5" /> Chuyên đề tinh tuyển
                    </span>
                    <span className="bg-amber-500/10 border border-amber-500/25 text-amber-400 text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Đặc sắc Chuyên gia (Hot)
                    </span>
                    <span className="bg-white/5 border border-white/10 text-slate-300 text-[9px] font-mono px-2.5 py-0.5 rounded-full">
                      10 phút đọc
                    </span>
                  </div>

                  {/* Title & metadata */}
                  <div>
                    <h5 className="font-mono text-xs text-sky-300 font-bold tracking-wider mb-1">
                      [1] KATZENBACH & SMITH (1993)
                    </h5>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight font-serif-academic italic tracking-tight group-hover:text-sky-300 transition-colors duration-250">
                      The Wisdom of Teams: Creating the High-Performance Organization
                    </h3>
                  </div>

                  {/* Narrative snippet */}
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                    Nghiên cứu kinh điển thiết lập ma trận "Đường cong hiệu suất đội nhóm" và cơ chế giải thích trách nhiệm giải trình tương hợp kỷ luật tập thể cao độ lãnh đạo. Bấm để truy cập toàn văn chuyên đề nghiên cứu thực chiến chuyên sâu cho ngành Tài chính - Ngân hàng.
                  </p>
                </div>

                {/* Right Action Trigger */}
                <div className="flex-shrink-0 flex items-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 bg-white text-slate-950 font-bold px-5 py-3 rounded-xl text-xs sm:text-sm shadow-md group-hover:bg-slate-100 transition-colors duration-200"
                  >
                    <span>Đọc Chuyên Đề Ngay</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
