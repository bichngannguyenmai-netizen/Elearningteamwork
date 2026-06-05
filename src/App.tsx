/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import DISCQuiz from './components/DISCQuiz';
import TeamStageSurvey from './components/TeamStageSurvey';
import HandoutChecklist from './components/HandoutChecklist';
import ModuleOne from './components/ModuleOne';
import ModuleTwo from './components/ModuleTwo';
import ModuleThree from './components/ModuleThree';
import ModuleFour from './components/ModuleFour';
import UserGuide from './components/UserGuide';
import ReviewGame from './components/ReviewGame';

import { 
  LayoutDashboard, 
  Layers, 
  Bot, 
  Clock, 
  HelpCircle, 
  BookOpen, 
  FileText, 
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Globe,
  ShieldCheck,
  CheckCircle2,
  Menu,
  X,
  Sparkles,
  Pocket,
  Info,
  Award,
  Zap,
  Target,
  Lightbulb,
  Compass,
  ArrowRight,
  UserCheck,
  Users,
  Activity,
  Star,
  GraduationCap,
  Briefcase,
  Tv,
  Gamepad2
} from 'lucide-react';

type ScreenType = 'dashboard' | 'disc-quiz' | 'team-survey' | 'handouts' | 'module-1' | 'module-2' | 'module-3' | 'module-4' | 'guide' | 'game';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export default function App() {
  const [screen, setScreen] = useState<ScreenType>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [checkedHandoutCount, setCheckedHandoutCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isEnglish, setIsEnglish] = useState(false);
  
  // Interactive Hero banner states
  const [selectedNode, setSelectedNode] = useState<'disc' | 'conflict' | 'daily' | 'creative'>('disc');

  // Sync checklist stats dynamically
  useEffect(() => {
    const checkState = () => {
      try {
        const saved = localStorage.getItem('it_toolkit_checked_handouts');
        if (saved) {
          const parsed = JSON.parse(saved);
          setCheckedHandoutCount(parsed.length);
        }
      } catch (e) {
        // Keep initial count
      }
    };
    checkState();
    window.addEventListener('storage', checkState);
    return () => window.removeEventListener('storage', checkState);
  }, [screen]);

  const handleNavigate = (target: ScreenType) => {
    setScreen(target);
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans selection:bg-slate-900 selection:text-white antialiased">
      {/* Top Banner Navigation Header */}
      <header className="sticky top-0 z-40 bg-slate-950 text-white border-b border-slate-800 shadow-sm backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              id="header-logo-btn"
              onClick={() => handleNavigate('dashboard')} 
              className="flex items-center gap-2.5 hover:opacity-90 transition cursor-pointer"
            >
              <div className="bg-slate-900 text-teal-400 p-2 rounded-lg border border-slate-850">
                <Bot className="w-5 h-5 flex-shrink-0" />
              </div>
              <div className="text-left">
                <span className="block font-display text-sm font-extrabold tracking-tight uppercase text-white">Digital Learning Library</span>
              </div>
            </button>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1.5 text-xs font-semibold relative">
            <button
              id="nav-dash"
              onClick={() => handleNavigate('dashboard')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                screen === 'dashboard' ? 'bg-slate-900 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-900/50'
              }`}
            >
              {isEnglish ? 'Dashboard' : 'Trang Chủ'}
            </button>
            <span className="text-slate-800 font-mono text-[10px]">|</span>
            
            {/* Combined Modules Dropdown */}
            <div className="relative">
              <button
                id="nav-modules-dropdown-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`px-3 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 select-none ${
                  screen.startsWith('module-') ? 'bg-slate-900 text-teal-400 border border-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-900/50'
                }`}
              >
                <span>{isEnglish ? 'Learning Modules' : 'Chương Trình Học'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                  <div className="absolute left-0 mt-2 w-64 bg-slate-950 border border-slate-800 rounded-xl shadow-2xl py-1 px-1 z-20 animate-fade-in text-slate-200">
                    <button
                      id="dropdown-mod-1"
                      onClick={() => handleNavigate('module-1')}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-2 ${
                        screen === 'module-1' ? 'bg-slate-900 text-teal-400 font-bold' : 'hover:bg-slate-900 hover:text-white'
                      }`}
                    >
                      <span className="text-[10px] bg-slate-900 text-slate-400 px-1.5 py-0.5 rounded-sm font-mono shrink-0">M1</span>
                      <span>{isEnglish ? 'M1: Team Understanding' : 'Module 1: Thấu Hiểu'}</span>
                    </button>
                    <button
                      id="dropdown-mod-2"
                      onClick={() => handleNavigate('module-2')}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-2 ${
                        screen === 'module-2' ? 'bg-slate-900 text-teal-400 font-bold' : 'hover:bg-slate-900 hover:text-white'
                      }`}
                    >
                      <span className="text-[10px] bg-slate-900 text-slate-400 px-1.5 py-0.5 rounded-sm font-mono shrink-0">M2</span>
                      <span>{isEnglish ? 'M2: Conflict Management' : 'Module 2: Mâu Thuẫn'}</span>
                    </button>
                    <button
                      id="dropdown-mod-3"
                      onClick={() => handleNavigate('module-3')}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-2 ${
                        screen === 'module-3' ? 'bg-slate-900 text-teal-400 font-bold' : 'hover:bg-slate-900 hover:text-white'
                      }`}
                    >
                      <span className="text-[10px] bg-slate-900 text-slate-400 px-1.5 py-0.5 rounded-sm font-mono shrink-0">M3</span>
                      <span>{isEnglish ? 'M3: Agile Daily 15\'' : 'Module 3: Agile'}</span>
                    </button>
                    <button
                      id="dropdown-mod-4"
                      onClick={() => handleNavigate('module-4')}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-2 ${
                        screen === 'module-4' ? 'bg-slate-900 text-teal-400 font-bold' : 'hover:bg-slate-900 hover:text-white'
                      }`}
                    >
                      <span className="text-[10px] bg-slate-900 text-slate-400 px-1.5 py-0.5 rounded-sm font-mono shrink-0">M4</span>
                      <span>{isEnglish ? 'M4: Brainstorming' : 'Module 4: Brainstorming'}</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            <span className="text-slate-800 font-mono text-[10px]">|</span>

            <button
              id="nav-guide"
              onClick={() => handleNavigate('guide')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                screen === 'guide' ? 'bg-slate-900 text-teal-400 border border-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-900/50'
              }`}
            >
              {isEnglish ? 'User Guide' : 'Hướng Dẫn'}
            </button>

            <span className="text-slate-800 font-mono text-[10px]">|</span>

            <button
              id="nav-game"
              onClick={() => handleNavigate('game')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                screen === 'game' ? 'bg-slate-900 text-teal-400 border border-slate-800' : 'text-[#E2E8F0] hover:text-white hover:bg-slate-900/50'
              }`}
            >
              {isEnglish ? 'Review Games' : 'Game Ôn Tập'}
            </button>

            <span className="text-slate-800 font-mono text-[10px]">|</span>

            <button
              id="language-toggle-btn"
              onClick={() => setIsEnglish(!isEnglish)}
              className="px-3 py-1.5 rounded-lg border border-teal-500/10 bg-slate-900 text-teal-400 hover:text-white hover:bg-slate-800 text-[11px] font-mono font-bold flex items-center gap-1.5 transition cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{isEnglish ? 'EN' : 'VI'}</span>
            </button>
          </nav>



          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-900 transition text-slate-300 focus:outline-hidden"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 text-white border-b border-slate-850 p-4 space-y-2 z-50 sticky top-16">
          <div className="pb-3 border-b border-slate-900 flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-400 font-mono">{isEnglish ? 'Digital Library' : 'Thư viện số'}</span>
            <button
              id="mobile-lang-switch"
              onClick={() => setIsEnglish(!isEnglish)}
              className="text-[10px] font-mono font-bold bg-slate-900 text-teal-400 px-2 py-1 rounded border border-teal-500/10 flex items-center gap-1 cursor-pointer"
            >
              <Globe className="w-3 h-3" />
              <span>{isEnglish ? 'EN' : 'VI'}</span>
            </button>
          </div>

          <button
            id="mobile-nav-dash"
            onClick={() => handleNavigate('dashboard')}
            className={`w-full text-left px-4 py-3 rounded-xl transition flex items-center justify-between text-sm cursor-pointer ${
              screen === 'dashboard' ? 'bg-slate-900 text-teal-400 font-bold shadow-inner' : 'hover:bg-slate-900 text-slate-300'
            }`}
          >
            <span>{isEnglish ? 'Dashboard Home' : 'Trang Chủ (Dashboard)'}</span>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </button>

          <button
            id="mobile-nav-guide"
            onClick={() => handleNavigate('guide')}
            className={`w-full text-left px-4 py-3 rounded-xl transition flex items-center justify-between text-sm cursor-pointer ${
              screen === 'guide' ? 'bg-slate-900 text-teal-400 font-bold shadow-inner' : 'hover:bg-slate-900 text-slate-300'
            }`}
          >
            <span>{isEnglish ? 'User Manual' : 'Hướng Dẫn Sử Dụng'}</span>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </button>

          <button
            id="mobile-nav-game"
            onClick={() => handleNavigate('game')}
            className={`w-full text-left px-4 py-3 rounded-xl transition flex items-center justify-between text-sm cursor-pointer ${
              screen === 'game' ? 'bg-slate-900 text-teal-400 font-bold shadow-inner' : 'hover:bg-slate-900 text-slate-300'
            }`}
          >
            <span>{isEnglish ? 'Review Game (Arena)' : 'Game Ôn Tập Trải Nghiệm'}</span>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </button>
          
          <div className="h-px bg-slate-900 my-1" />
          
          <div className="px-4 py-1 text-[10px] font-mono font-bold text-slate-500 uppercase">
            {isEnglish ? 'Quick tests' : 'Trắc nghiệm nhận diện'}
          </div>
          
          <button
            id="mobile-nav-disc"
            onClick={() => handleNavigate('disc-quiz')}
            className={`w-full text-left px-4 py-3 rounded-xl transition flex items-center justify-between text-sm cursor-pointer ${
              screen === 'disc-quiz' ? 'bg-slate-900 text-teal-400 font-bold shadow-inner' : 'hover:bg-slate-900 text-slate-300'
            }`}
          >
            <span>{isEnglish ? 'DISC Personality Test' : 'Bài Test nhóm tính cách DISC'}</span>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </button>
          <button
            id="mobile-nav-team"
            onClick={() => handleNavigate('team-survey')}
            className={`w-full text-left px-4 py-3 rounded-xl transition flex items-center justify-between text-sm cursor-pointer ${
              screen === 'team-survey' ? 'bg-slate-900 text-teal-400 font-bold shadow-inner' : 'hover:bg-slate-900 text-slate-300'
            }`}
          >
            <span>{isEnglish ? '5 Team Stages survey' : 'Khảo Sát 5 Giai Đoạn Đội Nhóm'}</span>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </button>
          
          <div className="h-px bg-slate-900 my-1" />
          
          <span className="block px-4 py-1 text-[10px] font-mono font-bold text-slate-500 uppercase">
            {isEnglish ? 'Study Program (4 Modules)' : 'Chương Trình Học (4 Modules)'}
          </span>
          <div className="pl-2 space-y-1">
            <button
              id="mobile-nav-m1"
              onClick={() => handleNavigate('module-1')}
              className={`w-full text-left px-4 py-2.5 rounded-xl transition flex items-center justify-between text-xs cursor-pointer ${
                screen === 'module-1' ? 'bg-slate-900 text-teal-400 font-bold shadow-inner' : 'hover:bg-slate-900 text-slate-400'
              }`}
            >
              <span>{isEnglish ? 'Module 1: Team Understanding' : 'Module 1: Thấu Hiểu'}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            </button>
            <button
              id="mobile-nav-m2"
              onClick={() => handleNavigate('module-2')}
              className={`w-full text-left px-4 py-2.5 rounded-xl transition flex items-center justify-between text-xs cursor-pointer ${
                screen === 'module-2' ? 'bg-slate-900 text-teal-400 font-bold shadow-inner' : 'hover:bg-slate-900 text-slate-400'
              }`}
            >
              <span>{isEnglish ? 'Module 2: Conflict Management' : 'Module 2: Mâu Thuẫn'}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            </button>
            <button
              id="mobile-nav-m3"
              onClick={() => handleNavigate('module-3')}
              className={`w-full text-left px-4 py-2.5 rounded-xl transition flex items-center justify-between text-xs cursor-pointer ${
                screen === 'module-3' ? 'bg-slate-900 text-teal-400 font-bold shadow-inner' : 'hover:bg-slate-900 text-slate-400'
              }`}
            >
              <span>{isEnglish ? 'Module 3: Agile Daily 15\'' : 'Module 3: Agile'}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            </button>
            <button
              id="mobile-nav-m4"
              onClick={() => handleNavigate('module-4')}
              className={`w-full text-left px-4 py-2.5 rounded-xl transition flex items-center justify-between text-xs cursor-pointer ${
                screen === 'module-4' ? 'bg-slate-900 text-teal-400 font-bold shadow-inner' : 'hover:bg-slate-900 text-slate-400'
              }`}
            >
              <span>{isEnglish ? 'Module 4: Brainstorming' : 'Module 4: Brainstorming'}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            </button>
          </div>
        </div>
      )}

      {/* Main Container Wrapper */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {screen === 'dashboard' && (
          <div className="space-y-8 animate-fade-in">
            {/* Visual Intro Banner in High-Tech Quiet Luxury style - NOW COMPACT & HIGHLY INTERACTIVE */}
            <div className="relative overflow-hidden rounded-3xl bg-slate-950 text-white border border-slate-800 p-6 sm:p-10 shadow-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
              {/* Cyber decoration lines with modern grid overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)] opacity-25" />
              
              {/* Glowing ambient background spots */}
              <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 right-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />

              <div className="flex flex-col lg:flex-row items-stretch justify-between gap-8 relative z-10">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6 max-w-2xl text-left flex-1 flex flex-col justify-center"
                >
                  <div>
                    {/* Mini luxurious indicator line */}
                    <motion.div variants={itemVariants} className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 bg-slate-900/90 px-3 py-1 rounded-full border border-slate-800 text-[10px] font-mono tracking-widest text-teal-400 font-semibold uppercase shadow-inner">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping"></span>
                        {isEnglish ? 'COLLABORATIVE INTERACTIVE ARSENAL v2.1' : 'CẤU TRÚC PHỐI HỢP TRỰC QUAN v2.1'}
                      </span>
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="text-3xl sm:text-[42px] font-extrabold uppercase tracking-[0.05em] leading-tight mt-4">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-300">
                        TEAMWORK
                      </span>{' '}
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-emerald-400 to-sky-305">
                        EXCELLENCE
                      </span>
                    </motion.h1>

                    <motion.p variants={itemVariants} className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl mt-4">
                      {isEnglish
                        ? 'Equip your core competencies natively inside financial environments. Connect DISC styles, Lencioni conflict solutions, Katzenbach stages, Agile sync structures, and SCAMPER ideation loops instantly.'
                        : 'Nền tảng hỗ trợ đắc lực giúp học viên kết nối tức thì các mô hình thực chiến (DISC, Katzenbach, Lencioni, Agile & SCAMPER) trực tiếp vào nghiệp vụ Ngân hàng nhằm tối ưu hiệu quả làm việc nhóm.'}
                    </motion.p>

                    {/* Program Framework Tags */}
                    <motion.div variants={itemVariants} className="flex flex-wrap gap-1.5 pt-3">
                      {['DISC', 'Katzenbach', 'Lencioni', 'Agile Synergy', 'SCAMPER'].map((tag) => (
                        <motion.span
                          key={tag}
                          whileHover={{ scale: 1.05, y: -1, backgroundColor: "#0f172a", color: "#ffffff", borderColor: "#1e293b" }}
                          className="text-[10px] font-mono font-semibold bg-slate-900 text-slate-300 px-3 py-1 rounded-full border border-slate-800 transition-all cursor-default shadow-3xs"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </motion.div>

                    {/* Action buttons with high interactivity */}
                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-5">
                      <motion.button
                        id="intro-guide-cta"
                        onClick={() => handleNavigate('guide')}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative inline-flex items-center justify-center gap-2 bg-white text-slate-950 font-extrabold px-6 py-3.5 rounded-xl text-xs sm:text-sm transition-all duration-300 shadow-lg cursor-pointer text-center overflow-hidden hover:bg-slate-100"
                      >
                        {/* Shimmer reflection */}
                        <div className="absolute inset-0 w-1/2 h-full bg-slate-950/5 skew-x-12 -translate-x-full group-hover:translate-x-[250%] transition-transform duration-1000 ease-out" />
                        <span>{isEnglish ? 'Explore User Manual' : 'Xem Cẩm Nang Hướng Dẫn'}</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </motion.button>

                      <motion.button
                        id="intro-game-cta"
                        onClick={() => handleNavigate('game')}
                        animate={{ 
                          boxShadow: [
                            "0 10px 15px -3px rgba(245, 158, 11, 0.3), 0 0 12px rgba(245, 158, 11, 0.2)", 
                            "0 10px 25px -3px rgba(245, 158, 11, 0.7), 0 0 25px rgba(245, 158, 11, 0.5)", 
                            "0 10px 15px -3px rgba(245, 158, 11, 0.3), 0 0 12px rgba(245, 158, 11, 0.2)"
                          ],
                          scale: [1, 1.02, 1]
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 2.2,
                          ease: "easeInOut"
                        }}
                        whileHover={{ 
                          scale: 1.06, 
                          y: -3, 
                          boxShadow: "0 20px 35px -5px rgba(245, 158, 11, 0.8), 0 0 35px rgba(251, 191, 36, 0.6)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black px-7 py-3.5 rounded-xl text-xs sm:text-sm cursor-pointer text-center border border-amber-300 shadow-xl overflow-hidden"
                      >
                        {/* Shifting sweep shimmer lines */}
                        <motion.div 
                          className="absolute inset-y-0 w-8 bg-white/30 skew-x-12 pointer-events-none"
                          animate={{
                            left: ["-100%", "200%"],
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 2.5,
                            ease: "easeInOut",
                            delay: 0.2
                          }}
                        />
                        
                        {/* Highlight notification badge icon */}
                        <span className="relative flex h-2 w-2 mr-0.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-950"></span>
                        </span>

                        <Gamepad2 className="w-4 h-4 text-slate-950 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" />
                        <span className="tracking-wide uppercase font-extrabold">{isEnglish ? 'Try Review Games' : 'Chơi Game Ôn Tập 🎮'}</span>
                        
                        {/* Golden light spot follow cursor effect simulated */}
                        <div className="absolute inset-0 bg-radial-gradient(ellipse_at_center, rgba(255,255,255,0.15)_0%, transparent_70%) opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Luxury Interactive High-Tech Blueprint Widget - ABSOLUTELY ALIVE & CLICKABLE */}
                <div className="relative shrink-0 flex flex-col items-center justify-center w-full lg:w-80 bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl backdrop-blur-md shadow-xl select-none">
                  <div className="w-full flex justify-between items-center mb-3">
                    <span className="text-[9px] font-mono text-teal-400 border border-teal-500/20 px-2 py-0.5 rounded bg-teal-950/40 font-bold tracking-wider animate-pulse flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-teal-400 animate-ping" />
                      SYS.SYNC
                    </span>
                    <span className="text-[9px] font-mono text-slate-500 font-medium">TERMINAL_ALPHA_V2</span>
                  </div>

                  {/* Svg Cyber Blueprint Graph with Clickable coordinates */}
                  <div className="relative w-full h-36 flex items-center justify-center">
                    {/* Animated radar sonar pulse circles */}
                    <div className="absolute w-28 h-28 rounded-full border border-teal-500/10 animate-ping pointer-events-none" />
                    <div className="absolute w-16 h-16 rounded-full border border-blue-500/5 animate-pulse pointer-events-none" />

                    <svg className="w-full h-full text-slate-700/40 animate-fade-in" viewBox="0 0 100 50">
                      {/* Connection lines back glowing depending on state */}
                      <motion.line
                        x1="20" y1="25" x2="50" y2="10"
                        stroke={selectedNode === 'disc' || selectedNode === 'conflict' ? '#3b82f6' : '#1e293b'}
                        strokeWidth={selectedNode === 'disc' || selectedNode === 'conflict' ? '1.5' : '1'}
                        className="transition-all duration-300"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                      <motion.line
                        x1="20" y1="25" x2="50" y2="40"
                        stroke={selectedNode === 'disc' || selectedNode === 'daily' ? '#10b981' : '#1e293b'}
                        strokeWidth={selectedNode === 'disc' || selectedNode === 'daily' ? '1.5' : '1'}
                        className="transition-all duration-300"
                        strokeDasharray="1.5 1.5"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.8, ease: "easeOut" }}
                      />
                      <motion.line
                        x1="50" y1="10" x2="80" y2="25"
                        stroke={selectedNode === 'conflict' || selectedNode === 'creative' ? '#f59e0b' : '#1e293b'}
                        strokeWidth={selectedNode === 'conflict' || selectedNode === 'creative' ? '1.5' : '1'}
                        className="transition-all duration-300"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.6, ease: "easeOut" }}
                      />
                      <motion.line
                        x1="50" y1="40" x2="80" y2="25"
                        stroke={selectedNode === 'daily' || selectedNode === 'creative' ? '#d97706' : '#1e293b'}
                        strokeWidth={selectedNode === 'daily' || selectedNode === 'creative' ? '1.5' : '1'}
                        className="transition-all duration-300"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.7, ease: "easeOut" }}
                      />
                      <motion.line
                        x1="50" y1="10" x2="50" y2="40"
                        stroke="#1e293b"
                        strokeWidth="0.75"
                        strokeDasharray="2"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                      />
                      
                      {/* DISC Core node (clickable) */}
                      <g onClick={() => setSelectedNode('disc')} className="cursor-pointer group">
                        <motion.circle
                          cx="20" cy="25"
                          r="8"
                          fill="rgba(45,212,191,0.15)"
                          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
                          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                          style={{ transformOrigin: '20px 25px' }}
                        />
                        <circle cx="20" cy="25" r={selectedNode === 'disc' ? '6.5' : '4.5'} fill="#090d16" stroke={selectedNode === 'disc' ? '#2dd4bf' : '#1e293b'} strokeWidth="2.5" className="transition-all duration-300" />
                        <circle cx="20" cy="25" r="2.5" fill="#2dd4bf" className={selectedNode === 'disc' ? 'animate-ping' : ''} />
                        <text x="20" y="17" fill={selectedNode === 'disc' ? '#2dd4bf' : '#94a3b8'} lg:fill="#94a3b8" fontSize="5.5" fontWeight={selectedNode === 'disc' ? 'bold' : 'normal'} fontFamily="monospace" textAnchor="middle" className="transition-all duration-300">DISC</text>
                      </g>

                      {/* CONFLICT Core node (clickable) */}
                      <g onClick={() => setSelectedNode('conflict')} className="cursor-pointer group">
                        <motion.circle
                          cx="50" cy="10"
                          r="8"
                          fill="rgba(59,130,246,0.15)"
                          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
                          transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
                          style={{ transformOrigin: '50px 10px' }}
                        />
                        <circle cx="50" cy="10" r={selectedNode === 'conflict' ? '6.5' : '4.5'} fill="#090d16" stroke={selectedNode === 'conflict' ? '#3b82f6' : '#1e293b'} strokeWidth="2.5" className="transition-all duration-300" />
                        <circle cx="50" cy="10" r="2.5" fill="#3b82f6" className={selectedNode === 'conflict' ? 'animate-ping' : ''} />
                        <text x="50" y="5" fill={selectedNode === 'conflict' ? '#3b82f6' : '#94a3b8'} lg:fill="#94a3b8" fontSize="5.5" fontWeight={selectedNode === 'conflict' ? 'bold' : 'normal'} fontFamily="monospace" textAnchor="middle" className="transition-all duration-300">CONFLICT</text>
                      </g>

                      {/* DAILY Core node (clickable) */}
                      <g onClick={() => setSelectedNode('daily')} className="cursor-pointer group">
                        <motion.circle
                          cx="50" cy="40"
                          r="8"
                          fill="rgba(16,185,129,0.15)"
                          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
                          transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
                          style={{ transformOrigin: '50px 40px' }}
                        />
                        <circle cx="50" cy="40" r={selectedNode === 'daily' ? '6.5' : '4.5'} fill="#090d16" stroke={selectedNode === 'daily' ? '#10b981' : '#1e293b'} strokeWidth="2.5" className="transition-all duration-300" />
                        <circle cx="50" cy="40" r="2.5" fill="#10b981" className={selectedNode === 'daily' ? 'animate-ping' : ''} />
                        <text x="50" y="47.5" fill={selectedNode === 'daily' ? '#10b981' : '#94a3b8'} lg:fill="#94a3b8" fontSize="5.5" fontWeight={selectedNode === 'daily' ? 'bold' : 'normal'} fontFamily="monospace" textAnchor="middle" className="transition-all duration-300">DAILY</text>
                      </g>

                      {/* CREATIVE Core node (clickable) */}
                      <g onClick={() => setSelectedNode('creative')} className="cursor-pointer group">
                        <motion.circle
                          cx="80" cy="25"
                          r="8"
                          fill="rgba(245,158,11,0.15)"
                          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
                          transition={{ repeat: Infinity, duration: 3.4, ease: "easeInOut" }}
                          style={{ transformOrigin: '80px 25px' }}
                        />
                        <circle cx="80" cy="25" r={selectedNode === 'creative' ? '6.5' : '4.5'} fill="#090d16" stroke={selectedNode === 'creative' ? '#f59e0b' : '#1e293b'} strokeWidth="2.5" className="transition-all duration-300" />
                        <circle cx="80" cy="25" r="2.5" fill="#f59e0b" className={selectedNode === 'creative' ? 'animate-ping' : ''} />
                        <text x="80" y="17" fill={selectedNode === 'creative' ? '#f59e0b' : '#94a3b8'} lg:fill="#94a3b8" fontSize="5.5" fontWeight={selectedNode === 'creative' ? 'bold' : 'normal'} fontFamily="monospace" textAnchor="middle" className="transition-all duration-300">CREATIVE</text>
                      </g>
                    </svg>

                    {/* Left-Right mini nudge tips */}
                    <div className="absolute left-1 bottom-1 text-[8px] font-mono text-slate-500 animate-pulse hidden sm:block">
                      {isEnglish ? '← Click nodes to inspect' : '← Nhấp vào các nút để kiểm tra'}
                    </div>
                  </div>

                  {/* Real-time Dynamic Console Feedback based on active selectedNode */}
                  <div className={`w-full mt-3 p-3 rounded-xl border bg-slate-950/80 transition-all duration-300 ${
                    selectedNode === 'disc' ? 'border-teal-500/20 shadow-[inset_0_1px_8px_rgba(45,212,191,0.03)]' :
                    selectedNode === 'conflict' ? 'border-blue-500/20 shadow-[inset_0_1px_8px_rgba(59,130,246,0.03)]' :
                    selectedNode === 'daily' ? 'border-emerald-500/20 shadow-[inset_0_1px_8px_rgba(16,185,129,0.03)]' :
                    'border-amber-500/20 shadow-[inset_0_1px_8px_rgba(245,158,11,0.03)]'
                  }`}>
                    <div className="flex items-center justify-between gap-1 mb-1 border-b border-slate-900 pb-1.5">
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 ${
                        selectedNode === 'disc' ? 'text-teal-400' :
                        selectedNode === 'conflict' ? 'text-blue-400' :
                        selectedNode === 'daily' ? 'text-emerald-400' :
                        'text-amber-400'
                      }`}>
                        <span className={`w-1 h-1 rounded-full ${
                          selectedNode === 'disc' ? 'bg-teal-400' :
                          selectedNode === 'conflict' ? 'bg-blue-400' :
                          selectedNode === 'daily' ? 'bg-emerald-400' :
                          'bg-amber-400'
                        } pulse`} />
                        {selectedNode === 'disc' ? (isEnglish ? '✦ DISC PROFILING' : '✦ PHONG CÁCH DISC') :
                         selectedNode === 'conflict' ? (isEnglish ? '✦ LENCIONI CORE' : '✦ CHẨN TRỊ RÀO CẢN') :
                         selectedNode === 'daily' ? (isEnglish ? '✦ 15M AGILE SYNC' : '✦ HỌP AGILE 15 PHÚT') :
                         (isEnglish ? '✦ SCAMPER IDEATION' : '✦ SÁNG KIẾN SCAMPER')}
                      </span>
                      <span className="text-[8px] font-mono text-slate-500 font-bold uppercase tracking-widest">{isEnglish ? 'LIVE READOUT' : 'TRẠM CHẨN ĐOÁN'}</span>
                    </div>
                    <p className="text-[10.5px] text-slate-350 leading-relaxed font-normal min-h-[36px]">
                      {selectedNode === 'disc' ? (
                        isEnglish ? 'Adapting communication keywords and speed to minimize friction and maximize trust with D, I, S, C behavioral patterns.' : 'Chuyển đổi linh hoạt từ khóa và phản ứng giao tiếp để triệt tiêu ma sát, hòa hợp tối đa với các phong cách hành vi khác nhau.'
                      ) : selectedNode === 'conflict' ? (
                        isEnglish ? 'Identify systemic pitfalls of the Lencioni pyramid to convert interpersonal friction into healthy operational arguments.' : 'Truy vết và khắc phục 5 rào cản nền móng của Lencioni nhằm giải phóng xung đột nhân sự thành tranh luận nghiệp vụ chất lượng cao.'
                      ) : selectedNode === 'daily' ? (
                        isEnglish ? 'Deploy 15-minute quick synchronizations. Uncover active structural bottlenecks immediately instead of having long passive discussions.' : 'Thiết lập nhịp họp Agile 15 phút đầu giờ. Bản đồ hóa các rào cản luồng thông tin trung gian, giải quyết bế tắc và nâng cao tốc độ tác nghiệp.'
                      ) : (
                        isEnglish ? 'Re-engineer sluggish pipelines through 7 systematic substitution, combination, and modification design heuristics.' : 'Cải tiến và bẻ khóa các nút thắt quy trình ngân hàng bằng cách ứng dụng sáng tạo 7 bộ câu hỏi kích hoạt tư duy thiết kế lại.'
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>





            {/* DIAGNOSTIC QUICK APPLET ASSESSMENTS */}
            <div className="space-y-4">
              <h2 className="text-[24px] font-semibold tracking-tight text-slate-900 flex items-center gap-2 text-left">
                <LayoutDashboard className="w-5 h-5 text-slate-800" /> {isEnglish ? 'Diagnostic Applets & Interactive Calculators' : 'Bộ Công Cụ Chẩn Đoán & Trắc Nghiệm Tình Huống'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. DISC Test link */}
                <motion.button
                  id="dashboard-disc-btn"
                  onClick={() => handleNavigate('disc-quiz')}
                  whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.03)", borderColor: "#0f172a" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white text-left p-6 rounded-2xl border border-slate-200 hover:border-slate-800 transition-all duration-200 group relative block cursor-pointer"
                >
                  <div className="absolute top-4 right-4 bg-red-50 text-red-700 text-[9px] font-mono font-bold px-2 py-0.5 rounded">
                    {isEnglish ? '8 QUESTIONS' : '8 CÂU HỎI'}
                  </div>
                  <div className="bg-red-50 text-red-650 w-11 h-11 rounded-xl flex items-center justify-center border border-red-100 mb-4 group-hover:scale-105 transition-transform duration-200">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-[15px] text-slate-900 group-hover:text-black tracking-tight">
                    {isEnglish ? 'DISC Behavioral Style Quiz' : 'Test nhóm tính cách DISC'}
                  </h3>
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-red-700">
                    {isEnglish ? 'Start Quiz' : 'Bắt đầu đánh giá'} <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.button>

                {/* 2. Team survey link */}
                <motion.button
                  id="dashboard-survey-btn"
                  onClick={() => handleNavigate('team-survey')}
                  whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.03)", borderColor: "#0f172a" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white text-left p-6 rounded-2xl border border-slate-200 hover:border-slate-800 transition-all duration-200 group relative block cursor-pointer"
                >
                  <div className="absolute top-4 right-4 bg-emerald-50 text-emerald-700 text-[9px] font-mono font-bold px-2 py-0.5 rounded">
                    {isEnglish ? '10 QUESTIONS' : '10 CÂU HỎI'}
                  </div>
                  <div className="bg-emerald-50 text-emerald-605 w-11 h-11 rounded-xl flex items-center justify-center border border-emerald-100 mb-4 group-hover:scale-105 transition-transform duration-200">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-[15px] text-slate-900 group-hover:text-black tracking-tight">
                    {isEnglish ? '5 Team Stages Diagnostic' : 'Khảo sát 5 Giai Đoạn Nhóm'}
                  </h3>
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                    {isEnglish ? 'Begin Evaluation' : 'Bắt đầu đo lường'} <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.button>
              </div>
            </div>

            {/* EDURA POPULAR COURSES GRID IN QUIET LUXURY STYLE */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <h2 className="text-[24px] font-semibold tracking-tight text-slate-900 flex items-center gap-2 text-left">
                  <Layers className="w-5 h-5 text-slate-800" /> {isEnglish ? 'Our Popular Corporate Learning Modules' : 'Chương Trình Học Tập Phát Triển Đội Nhóm Cốt Lõi'}
                </h2>
                <span className="text-xs text-slate-500 font-medium font-mono text-left block">
                  {isEnglish ? '*Tài liệu học khoa học thực tiễn độc quyền' : '*Học liệu khoa học thực hành chuẩn hóa'}
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Module 1: Thấu Hiểu Đồng Đội */}
                <motion.div
                  whileHover={{ y: -6, boxShadow: "0 22px 30px -10px rgba(0, 0, 0, 0.08), 0 10px 15px -3px rgba(0, 0, 0, 0.04)", borderColor: "#bfdbfe" }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border border-slate-150 rounded-3xl overflow-hidden shadow-2xs flex flex-col justify-between group relative"
                >
                  {/* Premium Badge indicating estimated study duration */}
                  <span className="absolute top-3.5 left-3.5 z-10 text-[9px] font-mono tracking-wider font-extrabold px-2.5 py-1 rounded bg-blue-100 text-blue-700 uppercase">
                    {isEnglish ? '10 MINS' : '10 PHÚT'}
                  </span>
                  
                  {/* Star Rating Overlay matching EDURA */}
                  <div className="absolute top-3.5 right-3.5 z-10 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded border border-slate-200/50 flex items-center gap-1 text-[10px] font-bold text-amber-500 font-mono shadow-sm">
                    <Star className="w-3 h-3 fill-amber-500" />
                    <span>5.0</span>
                  </div>

                  {/* Header visual theme block */}
                  <div className="h-2.5 bg-gradient-to-r from-blue-400 to-indigo-500" />

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] font-mono font-bold text-indigo-600 block uppercase mt-1">
                        {isEnglish ? 'M1 • TEAMS & PROFILES' : 'CHUYÊN ĐỀ 1 • ĐỘI NGŨ'}
                      </span>
                      <h3 className="text-[15px] font-semibold text-slate-900 leading-tight mt-1 group-hover:text-black tracking-tight text-left">
                        {isEnglish ? 'Team Understanding' : 'Thấu hiểu đồng đội'}
                      </h3>
                    </div>
                  </div>

                  <button
                    id="m1-enter-btn"
                    onClick={() => handleNavigate('module-1')}
                    className="w-full text-center py-3 bg-slate-950 text-white hover:bg-slate-900 text-xs font-bold leading-none border-t border-slate-950 cursor-pointer transition-colors duration-200"
                  >
                    {isEnglish ? 'Study Module 1' : 'Vào học Module 1'}
                  </button>
                </motion.div>

                {/* Module 2: Quản Trị Mâu Thuẫn */}
                <motion.div
                  whileHover={{ y: -6, boxShadow: "0 22px 30px -10px rgba(0, 0, 0, 0.08), 0 10px 15px -3px rgba(0, 0, 0, 0.04)", borderColor: "#fde68a" }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border border-slate-150 rounded-3xl overflow-hidden shadow-2xs flex flex-col justify-between group relative"
                >
                  <span className="absolute top-3.5 left-3.5 z-10 text-[9px] font-mono tracking-wider font-extrabold px-2.5 py-1 rounded bg-amber-100 text-amber-700 uppercase">
                    {isEnglish ? '10 MINS' : '10 PHÚT'}
                  </span>
                  
                  <div className="absolute top-3.5 right-3.5 z-10 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded border border-slate-200/50 flex items-center gap-1 text-[10px] font-bold text-amber-500 font-mono shadow-sm">
                    <Star className="w-3 h-3 fill-amber-500" />
                    <span>4.9</span>
                  </div>

                  <div className="h-2.5 bg-gradient-to-r from-amber-400 to-orange-500" />

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] font-mono font-bold text-amber-600 block uppercase mt-1">
                        {isEnglish ? 'M2 • CONFLICTS' : 'CHUYÊN ĐỀ 2 • MÂU THUẪN'}
                      </span>
                      <h3 className="text-[15px] font-semibold text-slate-900 leading-tight mt-1 group-hover:text-black tracking-tight text-left">
                        {isEnglish ? 'Conflict Management' : 'Quản trị mâu thuẫn'}
                      </h3>
                    </div>
                  </div>

                  <button
                    id="m2-enter-btn"
                    onClick={() => handleNavigate('module-2')}
                    className="w-full text-center py-3 bg-slate-950 text-white hover:bg-slate-900 text-xs font-bold leading-none border-t border-slate-950 cursor-pointer transition-colors duration-200"
                  >
                    {isEnglish ? 'Study Module 2' : 'Vào học Module 2'}
                  </button>
                </motion.div>

                {/* Module 3: Tinh Gọn Agile */}
                <motion.div
                  whileHover={{ y: -6, boxShadow: "0 22px 30px -10px rgba(0, 0, 0, 0.08), 0 10px 15px -3px rgba(0, 0, 0, 0.04)", borderColor: "#a7f3d0" }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border border-slate-150 rounded-3xl overflow-hidden shadow-2xs flex flex-col justify-between group relative"
                >
                  <span className="absolute top-3.5 left-3.5 z-10 text-[9px] font-mono tracking-wider font-extrabold px-2.5 py-1 rounded bg-emerald-100 text-emerald-700 uppercase">
                    {isEnglish ? '10 MINS' : '10 PHÚT'}
                  </span>
                  
                  <div className="absolute top-3.5 right-3.5 z-10 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded border border-slate-200/50 flex items-center gap-1 text-[10px] font-bold text-amber-500 font-mono shadow-sm">
                    <Star className="w-3 h-3 fill-amber-500" />
                    <span>4.8</span>
                  </div>

                  <div className="h-2.5 bg-gradient-to-r from-emerald-400 to-teal-500" />

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] font-mono font-bold text-emerald-600 block uppercase mt-1">
                        {isEnglish ? 'M3 • LEAN STANDSTAND' : 'CHUYÊN ĐỀ 3 • TINH GỌN'}
                      </span>
                      <h3 className="text-[15px] font-semibold text-slate-900 leading-tight mt-1 group-hover:text-black tracking-tight text-left">
                        {isEnglish ? 'Agile Standup Meeting' : 'Cuộc họp Agile Standup'}
                      </h3>
                    </div>
                  </div>

                  <button
                    id="m3-enter-btn"
                    onClick={() => handleNavigate('module-3')}
                    className="w-full text-center py-3 bg-slate-950 text-white hover:bg-slate-900 text-xs font-bold leading-none border-t border-slate-950 cursor-pointer transition-colors duration-200"
                  >
                    {isEnglish ? 'Study Module 3' : 'Vào học Module 3'}
                  </button>
                </motion.div>

                {/* Module 4: Động Não Sáng Tạo */}
                <motion.div
                  whileHover={{ y: -6, boxShadow: "0 22px 30px -10px rgba(0, 0, 0, 0.08), 0 10px 15px -3px rgba(0, 0, 0, 0.04)", borderColor: "#99f6e4" }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border border-slate-150 rounded-3xl overflow-hidden shadow-2xs flex flex-col justify-between group relative"
                >
                  <span className="absolute top-3.5 left-3.5 z-10 text-[9px] font-mono tracking-wider font-extrabold px-2.5 py-1 rounded bg-teal-100 text-teal-700 uppercase">
                    {isEnglish ? '10 MINS' : '10 PHÚT'}
                  </span>
                  
                  <div className="absolute top-3.5 right-3.5 z-10 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded border border-slate-200/50 flex items-center gap-1 text-[10px] font-bold text-amber-500 font-mono shadow-sm">
                    <Star className="w-3 h-3 fill-amber-500" />
                    <span>5.0</span>
                  </div>

                  <div className="h-2.5 bg-gradient-to-r from-teal-400 to-cyan-500" />

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] font-mono font-bold text-teal-600 block uppercase mt-1">
                        {isEnglish ? 'M4 • SCAMPER CREATIVE' : 'CHUYÊN ĐỀ 4 • ĐỘT PHÁ'}
                      </span>
                      <h3 className="text-[15px] font-semibold text-slate-900 leading-tight mt-1 group-hover:text-black tracking-tight text-left">
                        {isEnglish ? 'Creative Brainstorming' : 'Động não Brainstorming'}
                      </h3>
                    </div>
                  </div>

                  <button
                    id="m4-enter-btn"
                    onClick={() => handleNavigate('module-4')}
                    className="w-full text-center py-3 bg-slate-950 text-white hover:bg-slate-900 text-xs font-bold leading-none border-t border-slate-950 cursor-pointer transition-colors duration-200"
                  >
                    {isEnglish ? 'Study Module 4' : 'Vào học Module 4'}
                  </button>
                </motion.div>

              </div>
            </div>


          </div>
        )}

        {/* Modular View Router */}
        {screen === 'disc-quiz' && <DISCQuiz onBack={() => handleNavigate('dashboard')} isEnglish={isEnglish} />}
        {screen === 'team-survey' && <TeamStageSurvey onBack={() => handleNavigate('dashboard')} isEnglish={isEnglish} />}
        {screen === 'handouts' && <HandoutChecklist onBack={() => handleNavigate('dashboard')} isEnglish={isEnglish} />}
        {screen === 'module-1' && <ModuleOne isEnglish={isEnglish} />}
        {screen === 'module-2' && <ModuleTwo isEnglish={isEnglish} />}
        {screen === 'module-3' && <ModuleThree isEnglish={isEnglish} />}
        {screen === 'module-4' && <ModuleFour isEnglish={isEnglish} />}
        {screen === 'guide' && <UserGuide onBack={() => handleNavigate('dashboard')} onNavigate={handleNavigate} isEnglish={isEnglish} />}
        {screen === 'game' && <ReviewGame onBack={() => handleNavigate('dashboard')} isEnglish={isEnglish} />}

      </main>

      {/* Elegant minimalist footer */}
      <footer className="bg-slate-950 text-slate-500 border-t border-slate-850 py-8 text-center text-xs font-mono">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p>© 2026 BichNganNguyenMai E-Learning. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
