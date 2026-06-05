import React from 'react';
import { 
  ArrowLeft,
  Compass,
  User,
  Users,
  CheckCircle,
  Clock,
  Layout,
  Zap,
  ArrowRight,
  ClipboardList,
  Sparkles,
  Award
} from 'lucide-react';

interface UserGuideProps {
  onBack: () => void;
  onNavigate?: (target: 'dashboard' | 'disc-quiz' | 'team-survey' | 'handouts' | 'module-1' | 'module-2' | 'module-3' | 'module-4' | 'guide') => void;
  isEnglish?: boolean;
}

export default function UserGuide({ onBack, onNavigate, isEnglish = false }: UserGuideProps) {
  
  const handleJump = (target: 'dashboard' | 'disc-quiz' | 'team-survey' | 'handouts' | 'module-1' | 'module-2' | 'module-3' | 'module-4') => {
    if (onNavigate) {
      onNavigate(target);
    }
  };

  return (
    <div id="modern-user-guide-container" className="space-y-6 sm:space-y-8 animate-fade-in text-slate-900 max-w-7xl mx-auto">
      
      {/* 1. TOP HEADER & NAVIGATION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <button 
            id="guide-back-to-home-btn"
            onClick={onBack} 
            className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-950 transition-colors text-xs font-semibold mb-1 group cursor-pointer font-mono"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" /> 
            {isEnglish ? 'BACK TO DASHBOARD' : 'VỀ TRANG CHỦ PORTAL'}
          </button>
        </div>
      </div>

      {/* 2. AREA A: START HERE (5-Second Scanner Card) */}
      <div id="section-start-here" className="relative overflow-hidden rounded-3xl bg-slate-950 text-white border border-slate-900 p-6 sm:p-8 shadow-xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Cyber grid and ambient light details */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-teal-550/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-3 text-left">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping"></span>
              <span className="text-[10px] font-mono text-teal-400 font-bold uppercase tracking-widest">
                {isEnglish ? '01 // ONBOARDING FORMULA' : '01 // BẮT ĐẦU ĐỊNH VỊ'}
              </span>
            </div>
            
            <h1 className="text-xl sm:text-3xl font-black tracking-tight text-white leading-tight uppercase">
              {isEnglish ? 'Start Here: The 5-Second Blueprint' : 'Bắt đầu từ đâu? Định vị nhanh trong 5 giây'}
            </h1>
          </div>

          <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-4">
            <span className="block text-[9px] font-mono uppercase tracking-wider text-slate-400 mb-1">
              {isEnglish ? 'KICKSTART TRACER' : 'QUYẾT ĐỊNH HÀNH ĐỘNG CỦA BẠN'}
            </span>
            
            <div className="space-y-2.5">
              <button
                id="guide-start-disc-btn"
                onClick={() => handleJump('disc-quiz')}
                className="w-full flex items-center justify-between p-3 bg-slate-950 hover:bg-slate-900 border border-slate-850 rounded-xl transition duration-200 group text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold font-mono text-teal-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">DISC</span>
                  <span className="text-white text-xs font-bold">{isEnglish ? 'Who am I? Take personality test' : 'Tôi là ai? Đo lường phong cách DISC'}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-teal-400 group-hover:translate-x-1 transition-transform shrink-0" />
              </button>

              <button
                id="guide-start-survey-btn"
                onClick={() => handleJump('team-survey')}
                className="w-full flex items-center justify-between p-3 bg-slate-950 hover:bg-slate-900 border border-slate-850 rounded-xl transition duration-200 group text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold font-mono text-teal-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">STAGE</span>
                  <span className="text-white text-xs font-bold">{isEnglish ? 'How is my team? Audit maturity' : 'Nhóm tôi thế nào? Khảo sát 5 giai đoạn'}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-teal-400 group-hover:translate-x-1 transition-transform shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Areas B and C */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 3. AREA B: TÔI LÀ NHÂN VIÊN */}
        <div id="section-for-employee" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 hover:shadow-2xs transition duration-200 relative overflow-hidden">
          {/* Subtle decoration marker */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/40 rounded-full blur-xl pointer-events-none" />
          
          <div className="flex items-center gap-3 pb-3 border-b border-rose-100">
            <div className="bg-blue-50 text-blue-650 w-10 h-10 rounded-xl flex items-center justify-center border border-blue-105">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-blue-600 font-bold uppercase tracking-wider block">ROLE 02 // FOR INDIVIDUÁLS</span>
              <h3 className="text-lg font-black text-slate-950 uppercase">{isEnglish ? 'I am a Staff Member' : 'Tôi là nhân viên'}</h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
            {isEnglish 
              ? 'Enhance personal collaboration & adapt seamlessly to multi-department workflow demands in 2 visual milestones:' 
              : 'Tối ưu hiệu quả đóng góp ý kiến cá nhân và thích nghi nhanh trước áp lực liên phòng ban qua 2 chặng mốc:'}
          </p>

          {/* Persona Journey Steps */}
          <div className="relative pl-6 border-l-2 border-slate-100 space-y-6 pt-2">
            
            {/* Step 1 */}
            <div className="relative group">
              <div className="absolute -left-[31px] top-1 bg-white border border-blue-200 text-blue-600 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold group-hover:bg-blue-600 group-hover:text-white transition duration-200">
                1
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-xs sm:text-sm text-slate-950 flex items-center gap-1.5">
                  {isEnglish ? 'Determine Your DISC Archetype' : 'Định hình phong cách hành vi (DISC)'}
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-550 leading-relaxed">
                  {isEnglish 
                    ? 'Spot communication advantages and blindspots under stress.' 
                    : 'Nhận ra lợi thế giao tiếp, ngôn ngữ tương thích và điểm mù trước áp lực ngân hàng.'}
                </p>
                <button
                  id="employee-step-1-btn"
                  onClick={() => handleJump('disc-quiz')}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-750 transition cursor-pointer pt-0.5"
                >
                  {isEnglish ? 'Go to Assessment' : 'Làm Quiz khám phá ngay'} <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative group">
              <div className="absolute -left-[31px] top-1 bg-white border border-blue-200 text-blue-600 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold group-hover:bg-blue-600 group-hover:text-white transition duration-200">
                2
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-xs sm:text-sm text-slate-950">
                  {isEnglish ? 'Acquire Core Soft Skills (4 Modules)' : 'Nâng cấp 4 năng lực phối hợp'}
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-550 leading-relaxed">
                  {isEnglish 
                    ? 'Master team adaptability curve, constructive debates, agile syncs, and SCAMPER ideation.' 
                    : 'Nắm chắc kiến thức cốt lõi: từ Katzenbach đến 6 chiếc mũ tranh luận cứu cánh và kỹ thuật tối ưu hóa.'}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <button onClick={() => handleJump('module-1')} className="px-2 py-0.5 text-[10px] font-mono bg-slate-50 text-slate-600 border border-slate-200 rounded-md hover:bg-slate-100 transition cursor-pointer">Module 1</button>
                  <button onClick={() => handleJump('module-2')} className="px-2 py-0.5 text-[10px] font-mono bg-slate-50 text-slate-600 border border-slate-200 rounded-md hover:bg-slate-100 transition cursor-pointer">Module 2</button>
                  <button onClick={() => handleJump('module-3')} className="px-2 py-0.5 text-[10px] font-mono bg-slate-50 text-slate-600 border border-slate-200 rounded-md hover:bg-slate-100 transition cursor-pointer">Module 3</button>
                  <button onClick={() => handleJump('module-4')} className="px-2 py-0.5 text-[10px] font-mono bg-slate-50 text-slate-600 border border-slate-200 rounded-md hover:bg-slate-100 transition cursor-pointer">Module 4</button>
                </div>
              </div>
            </div>

          </div>

          <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-2xl flex items-start gap-2.5">
            <Award className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div className="text-[11px] text-blue-900 leading-relaxed">
              <strong>Best Practice:</strong> {isEnglish ? 'Encourage shared DISC insights on social channels' : 'Thành thật chia sẻ phong cách DISC với 2 cộng sự thân cận để họ biết cách giao thiết lập công việc dịu nhẹ, tránh xung đột.'}
            </div>
          </div>
        </div>

        {/* 4. AREA C: TÔI LÀ TRƯỞNG NHÓM */}
        <div id="section-for-leader" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 hover:shadow-2xs transition duration-200 relative overflow-hidden">
          {/* Subtle decoration marker */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50/40 rounded-full blur-xl pointer-events-none" />

          <div className="flex items-center gap-3 pb-3 border-b border-emerald-100">
            <div className="bg-emerald-50 text-emerald-650 w-10 h-10 rounded-xl flex items-center justify-center border border-emerald-102">
              <Users className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-emerald-600 font-bold uppercase tracking-wider block">ROLE 03 // FOR ACTIVE MANAGERS</span>
              <h3 className="text-lg font-black text-slate-950 uppercase">{isEnglish ? 'I am a Team Leader' : 'Tôi là trưởng nhóm / Quản lý'}</h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
            {isEnglish 
              ? 'Unlock operational synergy, minimize communication lag, and cultivate safe corporate teams:' 
              : 'Thúc đẩy hiệu suất nhóm, loại bỏ độ trễ thông tin giấy tờ và kiến tạo môi trường an toàn tâm lý:'}
          </p>

          {/* Leader Application Framework */}
          <div className="relative pl-6 border-l-2 border-slate-100 space-y-6 pt-2">
            
            {/* Step 1 */}
            <div className="relative group">
              <div className="absolute -left-[31px] top-1 bg-white border border-emerald-200 text-emerald-600 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold group-hover:bg-emerald-600 group-hover:text-white transition duration-200">
                1
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-xs sm:text-sm text-slate-950">
                  {isEnglish ? 'Assess Team Cohesion & Maturity' : 'Khảo sát thực trạng sức khỏe tập thể'}
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-550 leading-relaxed">
                  {isEnglish 
                    ? 'Identify bottlenecks around goal comprehension, disciplines, and execution gaps.' 
                    : 'Thực hiện khảo sát sức khỏe 5 giai đoạn để phát hiện điểm dồn ứ (Lencioni/Katzenbach).'}
                </p>
                <button
                  id="leader-step-1-btn"
                  onClick={() => handleJump('team-survey')}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 hover:text-emerald-750 transition cursor-pointer pt-0.5"
                >
                  {isEnglish ? 'Launch Survey' : 'Bắt đầu chẩn bệnh đội nhóm'} <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative group">
              <div className="absolute -left-[31px] top-1 bg-white border border-emerald-200 text-emerald-600 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold group-hover:bg-emerald-600 group-hover:text-white transition duration-200">
                2
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-xs sm:text-sm text-slate-950">
                  {isEnglish ? 'Enforce the 15-Minute Daily Sync' : 'Gõ nhịp Agile Daily Standup 15 phút'}
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-550 leading-relaxed">
                  {isEnglish 
                    ? 'Instinctively resolve daily blocks using our built-in countdown clock.' 
                    : 'Thay đổi thói quen họp dài dòng. Dựng lại khung 3 câu hỏi mục tiêu hằng ngày cùng công cụ đồng hồ số đếm ngược.'}
                </p>
                <button
                  id="leader-step-2-btn"
                  onClick={() => handleJump('module-3')}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 hover:text-emerald-750 transition cursor-pointer pt-0.5"
                >
                  {isEnglish ? 'View Agile Standup Guide' : 'Tìm hiểu mô hình họp Agile & Đồng hồ đếm ngược'} <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative group">
              <div className="absolute -left-[31px] top-1 bg-white border border-emerald-200 text-emerald-600 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold group-hover:bg-emerald-600 group-hover:text-white transition duration-200">
                3
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-xs sm:text-sm text-slate-950">
                  {isEnglish ? 'Trigger Sáng kiến with SCAMPER sticky boards' : 'Khơi nguồn sáng tạo dịch vụ (SCAMPER)'}
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-550 leading-relaxed">
                  {isEnglish 
                    ? 'Conduct modern brainstorming sessions. Shift old working models into quick improvements.' 
                    : 'Hướng dẫn nhóm sử dụng bộ đổi hướng tư duy SCAMPER kèm bảng sticky note để thiết kế lại nghiệp vụ cũ.'}
                </p>
                <button
                  id="leader-step-3-btn"
                  onClick={() => handleJump('module-4')}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 hover:text-emerald-750 transition cursor-pointer pt-0.5"
                >
                  {isEnglish ? 'Explore SCAMPER Toolkit' : 'Truy cập bảng Sticky & Câu hỏi SCAMPER'} <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

          </div>

          <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl flex items-start gap-2.5">
            <Zap className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-[11px] text-emerald-900 leading-relaxed">
              <strong>Best Practice:</strong> {isEnglish ? 'Establish early psychological safety boundaries' : 'Xác lập văn hóa bảo hộ ý kiến dị biệt trong các vòng tranh luận (đội mũ xanh). Khuyến khích nêu trở ngại hơn là giấu lỗ hổng.'}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
