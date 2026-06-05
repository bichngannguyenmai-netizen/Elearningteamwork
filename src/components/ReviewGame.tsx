import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gamepad2, 
  Trophy, 
  Medal, 
  RefreshCw, 
  Check, 
  Play, 
  ArrowLeft, 
  ArrowUp, 
  ArrowDown, 
  Sparkles, 
  User, 
  Clock, 
  Star, 
  Award,
  AlertCircle,
  HelpCircle,
  ChevronRight
} from 'lucide-react';

interface LeaderboardEntry {
  id: string;
  name: string;
  bank: string;
  score: number;
  timeSpent: number; // in seconds
  date: string;
}

const DEFAULT_LEADERBOARD: LeaderboardEntry[] = [
  { id: '1', name: 'Nguyễn Hải Yến', bank: 'HD Bank Hội Sở', score: 1200, timeSpent: 42, date: '31/05/2026' },
  { id: '2', name: 'Trần Minh Quang', bank: 'Vietcombank', score: 1150, timeSpent: 48, date: '31/05/2026' },
  { id: '3', name: 'Lê Thu Hằng', bank: 'VPBank', score: 1050, timeSpent: 55, date: '30/05/2026' },
  { id: '4', name: 'Phạm Thành Nam', bank: 'BIDV Cầu Giấy', score: 950, timeSpent: 62, date: '31/05/2026' },
  { id: '5', name: 'Vũ Thị Mai', bank: 'Techcombank HQ', score: 880, timeSpent: 68, date: '30/05/2026' },
];

interface ReviewGameProps {
  onBack: () => void;
  isEnglish: boolean;
}

export default function ReviewGame({ onBack, isEnglish }: ReviewGameProps) {
  // Game states: 'selection' | 'disc' | 'lencioni' | 'cloze' | 'm4quiz'
  const [activeGameTab, setActiveGameTab] = useState<'selection' | 'disc' | 'lencioni' | 'cloze' | 'm4quiz'>('selection');
  
  // Leaderboard state
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  
  // Player session scoring
  const [currentScore, setCurrentScore] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showSubmission, setShowSubmission] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [playerBank, setPlayerBank] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // High-level complete notification
  const [gameFeedback, setGameFeedback] = useState<{ show: boolean, msg: string, scoreGained: number } | null>(null);

  // 1. DISC MATCH GAME STATES
  const discMatches = [
    { id: 'D', title: 'Dominance (D - Áp đặt)', definition: isEnglish ? 'Prefers rapid decision-making, results-oriented, direct, and values control.' : 'Thích ra quyết định nhanh, hướng tới kết quả cốt lõi, thích kiểm soát và có xu hướng nói thẳng thắn.' },
    { id: 'I', title: 'Influence (I - Ảnh hưởng)', definition: isEnglish ? 'Enthusiastic, optimistic, loves to inspire others, extremely expressive but occasionally misses details.' : 'Năng nổ, nhiệt huyết, thích truyền cảm hứng, cực kỳ hoạt ngôn nhưng đôi khi thiếu chi tiết trong hồ sơ.' },
    { id: 'S', title: 'Steadiness (S - Kiên định)', definition: isEnglish ? 'Calm, patient, deliberate, loves deep listening, and acts as the relational glue of the team.' : 'Điềm tĩnh, có xu hướng lắng nghe sâu sắc, thích sự ổn định, là chất keo kết dính tập thể.' },
    { id: 'C', title: 'Conscientiousness (C - Tuân thủ)', definition: isEnglish ? 'Highly analytical, methodical, precision-focused, operates strictly on data and compliance guidelines.' : 'Cực kỳ chi tiết, thích làm việc dựa trên dữ liệu chuẩn mực, tuân thủ đúng quy trình nghiệp vụ ngân hàng.' }
  ];
  const [selectedDiscItem, setSelectedDiscItem] = useState<string | null>(null);
  const [selectedDiscTarget, setSelectedDiscTarget] = useState<string | null>(null);
  const [discAnswers, setDiscAnswers] = useState<Record<string, string>>({}); // TargetDefId -> SourceDiscId
  const [discCompleted, setDiscCompleted] = useState(false);

  // 2. LENCIONI PYRAMID GAME STATES
  // Scrambled by default - user must arrange them from bottom to top (Level 1 to 5)
  // Level 1: Absence of Trust (Đáy)
  // Level 2: Fear of Conflict
  // Level 3: Lack of Commitment
  // Level 4: Avoidance of Accountability
  // Level 5: Inattention to Results (Đỉnh)
  const lencioniItemsCorrect = [
    { level: 5, label: isEnglish ? 'Inattention to Results (Thờ ơ kết quả chung)' : 'Thờ ơ với kết quả chung', desc: isEnglish ? 'Focusing on personal status or ego over collective team achievements.' : 'Đặt cái tôi hoặc danh tiếng bộ phận lên trước mục tiêu chung của Ngân hàng.' },
    { level: 4, label: isEnglish ? 'Avoidance of Accountability (Trốn tránh trách nhiệm)' : 'Trốn tránh trách nhiệm', desc: isEnglish ? 'Tolerating low standards without constructively calling out peers.' : 'Dễ dãi chấp nhận hiệu suất kém, không chất vấn các đồng nghiệp có biểu hiện đi lùi.' },
    { level: 3, label: isEnglish ? 'Lack of Commitment (Thiếu cam kết)' : 'Thiếu cam kết', desc: isEnglish ? 'Feigning agreement but remaining unaligned due to fear of honesty.' : 'Giả tạo đồng thuận trong cuộc họp nhưng không thực sự dốc lòng thực thi vì thiếu tin tưởng.' },
    { level: 2, label: isEnglish ? 'Fear of Conflict (Sợ xung đột)' : 'Sợ xung đột', desc: isEnglish ? 'Maintaining artificial harmony instead of demanding passionate debate.' : 'Giữ hòa khí giả tạo thay vì sẵn sàng tranh luận thẳng thắn tìm gốc rễ vấn đề nghiệp vụ.' },
    { level: 1, label: isEnglish ? 'Absence of Trust (Thiếu tin tưởng - Đáy tháp)' : 'Sự thiếu tin tưởng (Đáy tháp)', desc: isEnglish ? 'Invulnerability filter; being unwilling to show flaws and weaknesses.' : 'Không dám mở lòng bộc lộ điểm yếu, luôn cảnh giác và thủ thế với đồng đội.' },
  ];
  const [lencioniUserOrder, setLencioniUserOrder] = useState<typeof lencioniItemsCorrect>([]);
  const [lencioniCompleted, setLencioniCompleted] = useState(false);

  // 3. CLOZE GAME STATES (FILL IN THE BLANK)
  const clozeQuestions = [
    {
      id: 1,
      text: isEnglish 
        ? "Agile Daily Standup meetings are designed to run for a strict maximum of _____ minutes to ensure extreme operational focus." 
        : "Cuộc họp Agile Daily Standup hàng ngày được thiết kế để diễn ra tối đa trong khoảng _____ phút nhằm đảm bảo nhịp độ tập trung cao độ.",
      blank: "15",
      options: ["10", "15", "30", "45"]
    },
    {
      id: 2,
      text: isEnglish
        ? "In the SCAMPER creative technique, the first letter 'S' stands for _____ to re-engineer existing bank operations."
        : "Chữ S đầu tiên trong mô hình tư duy đột phá nghiệp vụ SCAMPER đại diện cho _____ giúp thiết kế lại quy trình hiện hữu.",
      blank: isEnglish ? "Substitute" : "Thay thế",
      options: isEnglish ? ["Simplify", "Standardize", "Substitute", "Support"] : ["Sắp đặt", "Sáng tạo", "Thay thế", "Song hành"]
    },
    {
      id: 3,
      text: isEnglish
        ? "The Daily Standup loops strictly around three core questions: What was done, What will be done, and any _____ identified."
        : "Thực hành họp đứng Agile xoay quanh 3 câu hỏi cốt lõi: Bạn đã làm gì, Sẽ làm gì, và các _____ mà bạn đang gặp phải.",
      blank: isEnglish ? "Blockers" : "Khó khăn",
      options: isEnglish ? ["Suggestions", "Opinions", "Blockers", "Prizes"] : ["Ý kiến", "Khó khăn", "Đề xuất", "Chỉ thị"]
    },
    {
      id: 4,
      text: isEnglish
        ? "The highest stage of group performance curvature described by Katzenbach & Smith is the _____ Team."
        : "Đỉnh cao tuyệt đối trên đường cong hiệu suất tập thể được Katzenbach & Smith định nghĩa là Đội ngũ _____.",
      blank: isEnglish ? "High-Performance" : "Hiệu suất vượt trội",
      options: isEnglish 
        ? ["Potential", "Real", "High-Performance", "Pseudo"] 
        : ["Đội ngũ thực sự", "Hiệu suất vượt trội", "Nhóm tiềm năng", "Giả đội ngũ"]
    }
  ];
  const [clozeAnswers, setClozeAnswers] = useState<Record<number, string>>({});
  const [clozeCompleted, setClozeCompleted] = useState(false);

  // 4. MODULE 4 TRIVIA QUIZ STATE / DATA
  const m4QuizQuestions = [
    {
      id: 1,
      question: isEnglish
        ? "When applying 'A - Adapt' from SCAMPER to bank process improvements, which action is most suitable?"
        : "Khi áp dụng lăng kính 'A - Adapt (Thích ứng)' từ mô hình SCAMPER vào cải tiến quy trình ngân hàng, hành vi nào dưới đây là phù hợp nhất?",
      options: isEnglish
        ? [
            "A. Eliminate all security steps in traditional transactions.",
            "B. Apply the delivery tracking and notifications mechanisms of Shopee/Grab to bank card shipping.",
            "C. Combine credit evaluation and document submission steps.",
            "D. Request customers to submit physical, original paper documents."
          ]
        : [
            "A. Loại bỏ mọi bước kiểm soát bảo mật trong giao dịch truyền thống.",
            "B. Học hỏi cơ chế xếp hạng và thông báo chặng cuối của Shopee/Grab áp dụng cho khâu chuyển phát thẻ.",
            "C. Gộp quầy thẩm định tín dụng cùng quầy tiếp nhận hỗ trợ chứng từ lẻ.",
            "D. Bắt buộc khách hàng phải cung cấp toàn bộ hồ sơ bản gốc viết tay."
          ],
      correct: "B",
      explanation: isEnglish
        ? "Adaptation imports proven outer-industry paradigms (like e-commerce delivery mechanisms) into banking operations."
        : "Thích ứng (Adapt) là việc học tập và mang các giải pháp xuất sắc đã được chứng minh từ ngành khác (như thương mại điện tử, gọi xe) vào bối cảnh ngân hàng."
    },
    {
      id: 2,
      question: isEnglish
        ? "What is the very first step recommended by 'Reverse Brainstorming' to solve a long bank queue problem?"
        : "Triết lý 'Reverse Brainstorming' (Động não đảo ngược) khuyên bạn nên làm gì đầu tiên khi tìm cách đẩy nhanh tốc độ phục vụ khách hàng?",
      options: isEnglish
        ? [
            "A. Immediately set up digital touchpoints and smart kiosks.",
            "B. Ask: 'How can we make our customer waiting times as slow, confusing, and painful as possible?'",
            "C. Allocate team tasks using the DISC behavioral categories.",
            "D. Instruct everyone to write 3 ideas silently."
          ]
        : [
            "A. Lập tức đầu tư thiết lập các quầy số hóa và ki-ốt tự động.",
            "B. Đặt câu hỏi ngược: 'Làm thế nào để quy trình giao dịch chậm nhất và gây ức chế nhất cho khách hàng?'",
            "C. Phân chia công việc theo phong cách hành vi DISC của giao dịch viên.",
            "D. Yêu cầu toàn bộ thành viên im lặng viết ra 3 ý kiến ban đầu."
          ],
      correct: "B",
      explanation: isEnglish
        ? "Reverse brainstorming starts by identifying how to make the problem worse, revealing invisible friction points."
        : "Động não đảo ngược bắt đầu bằng việc đặt câu hỏi làm sao để làm tệ đi vấn đề, giúp vạch trần những nút thắt hoặc rủi ro ẩn giấu một cách trọn vẹn và thực tế."
    },
    {
      id: 3,
      question: isEnglish
        ? "In the 'Brainwriting 6-3-5' method, what does the number '3' represent?"
        : "Trong phương pháp động não viết im lặng 'Brainwriting 6-3-5', con số '3' đại diện cho ý nghĩa gì?",
      options: isEnglish
        ? [
            "A. Limit discussion to exactly 3 departments.",
            "B. 3 initial raw ideas written in 5 minutes by each participant on their sheet.",
            "C. 3 main psychological barriers in operational banking teams.",
            "D. 3 layers of strict compliance security."
          ]
        : [
            "A. Giới hạn đối tượng tham gia trong tối đa 3 phòng ban nghiệp vụ.",
            "B. 3 ý tưởng thô ban đầu viết xuống giấy trong vòng 5 phút của mỗi người.",
            "C. 3 rào cản tâm lý chính yếu trong nhóm vận hành.",
            "D. 3 tầng bảo mật tuân thủ nghiêm ngặt trong hệ thống thông tin."
          ],
      correct: "B",
      explanation: isEnglish
        ? "Brainwriting 6-3-5 stands for: 6 participants, 3 ideas per round, in 5 minutes per turn."
        : "Mô hình 6-3-5 đại diện cho: 6 người tham gia, mỗi người viết 3 ý tưởng thô ban đầu, thực hiện luân chuyển xoay vòng mỗi 5 phút."
    },
    {
      id: 4,
      question: isEnglish
        ? "What is the primary psychological purpose of Brainwriting 6-3-5 over traditional voice-based brainstorming?"
        : "Mục đích tâm lý học quan trọng nhất của viết im lặng Brainwriting 6-3-5 so với họp động não bằng lời nói truyền thống là gì?",
      options: isEnglish
        ? [
            "A. Speeding up typing metrics for younger digital staff.",
            "B. Eliminating fear of judgment, shyness, and prevent dominant voices from overshadowing introverted team members.",
            "C. Saving paper documents for sustainability goals.",
            "D. Minimizing physical workspace requirements."
          ]
        : [
            "A. Gia tăng tốc độ nhập liệu văn bản trên máy tính của nhân sự Gen Z.",
            "B. Loại bỏ rào cản sợ phán xét, e ngại phát biểu và ngăn chặn việc các cá nhân hoạt ngôn lấn át đồng đội rụt rè.",
            "C. Tiết kiệm tối đa chi phí in ấn tài liệu theo định hướng phát triển bền vững.",
            "D. Tối giản diện tích không gian phòng sảnh họp vật lý của chi nhánh."
          ],
      correct: "B",
      explanation: isEnglish
        ? "Brainwriting ensures democratic participation, protecting quieter stakeholders from dominant peers."
        : "Viết im lặng tạo cơ hội đóng góp ý kiến bình đẳng, tôn trọng sự độc lập và giúp giải phóng sức sáng tạo mà không sợ phán xét ngoại cảnh."
    }
  ];
  const [m4Answers, setM4Answers] = useState<Record<number, string>>({});
  const [m4Completed, setM4Completed] = useState(false);

  // Load Leaderboard on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('edura_interactive_games_leaderboard');
      if (saved) {
        setLeaderboard(JSON.parse(saved));
      } else {
        setLeaderboard(DEFAULT_LEADERBOARD);
        localStorage.setItem('edura_interactive_games_leaderboard', JSON.stringify(DEFAULT_LEADERBOARD));
      }
    } catch (e) {
      setLeaderboard(DEFAULT_LEADERBOARD);
    }
  }, []);

  // Timer loop when a game is active
  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => {
        setTotalTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Handle Starting a Game
  const startSession = (gameType: 'disc' | 'lencioni' | 'cloze' | 'm4quiz') => {
    setActiveGameTab(gameType);
    setIsRunning(true);
    
    // Initialize DISC
    setSelectedDiscItem(null);
    setSelectedDiscTarget(null);
    setDiscAnswers({});
    setDiscCompleted(false);

    // Initialize Lencioni scrambling
    const scrambled = [...lencioniItemsCorrect].sort(() => Math.random() - 0.5);
    setLencioniUserOrder(scrambled);
    setLencioniCompleted(false);

    // Initialize Cloze Answers
    setClozeAnswers({});
    setClozeCompleted(false);

    // Initialize M4Quiz Answers
    setM4Answers({});
    setM4Completed(false);
    
    // Clear submission
    setIsSubmitted(false);
  };

  // Format Time
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Game 1: DISC Matching selection
  const handleDiscSelectSource = (id: string) => {
    if (discCompleted) return;
    setSelectedDiscItem(id);
    if (selectedDiscTarget) {
      // Complete matching
      setDiscAnswers(prev => ({
        ...prev,
        [selectedDiscTarget]: id
      }));
      setSelectedDiscItem(null);
      setSelectedDiscTarget(null);
    }
  };

  const handleDiscSelectTarget = (targetDefId: string) => {
    if (discCompleted) return;
    if (selectedDiscItem) {
      setDiscAnswers(prev => ({
        ...prev,
        [targetDefId]: selectedDiscItem
      }));
      setSelectedDiscItem(null);
      setSelectedDiscTarget(null);
    } else {
      setSelectedDiscTarget(targetDefId);
    }
  };

  const handleRemoveDiscAnswer = (targetDefId: string) => {
    if (discCompleted) return;
    setDiscAnswers(prev => {
      const copy = { ...prev };
      delete copy[targetDefId];
      return copy;
    });
  };

  const checkDiscGame = () => {
    let scoreGained = 0;
    discMatches.forEach(item => {
      if (discAnswers[item.id] === item.id) {
        scoreGained += 100;
      }
    });

    setCurrentScore(prev => prev + scoreGained);
    setDiscCompleted(true);
    setGameFeedback({
      show: true,
      msg: isEnglish 
        ? `Matched ${Math.floor(scoreGained / 100)}/4 correctly!` 
        : `Bạn đã ghép chính xác ${Math.floor(scoreGained / 100)}/4 phong cách hành vi!`,
      scoreGained
    });
  };

  // Game 2: Lencioni re-order
  const handleMoveLencioni = (index: number, direction: 'up' | 'down') => {
    if (lencioniCompleted) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= lencioniUserOrder.length) return;

    const updated = [...lencioniUserOrder];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setLencioniUserOrder(updated);
  };

  const checkLencioniGame = () => {
    let scoreGained = 0;
    lencioniUserOrder.forEach((item, index) => {
      const correctItem = lencioniItemsCorrect[index];
      if (item.level === correctItem.level) {
        scoreGained += 80; // 5 steps * 80 = 400 total
      }
    });

    setCurrentScore(prev => prev + scoreGained);
    setLencioniCompleted(true);
    setGameFeedback({
      show: true,
      msg: isEnglish 
        ? `Lencioni sorting calculated! High alignment standard verified.` 
        : `Xác lập Tháp mâu thuẫn hoàn tất! Trực quan hóa rào cản chuẩn xác.`,
      scoreGained
    });
  };

  // Game 3: Fill Blanks
  const handleClozeSelect = (questionId: number, val: string) => {
    if (clozeCompleted) return;
    setClozeAnswers(prev => ({
      ...prev,
      [questionId]: val
    }));
  };

  const checkClozeGame = () => {
    let scoreGained = 0;
    clozeQuestions.forEach(q => {
      if (clozeAnswers[q.id] === q.blank) {
        scoreGained += 100; // 4 questions * 100 = 400 total
      }
    });

    setCurrentScore(prev => prev + scoreGained);
    setClozeCompleted(true);
    setGameFeedback({
      show: true,
      msg: isEnglish 
        ? `Review quiz scored. Great job refreshing the Agile/SCAMPER definitions!` 
        : `Bài tập trắc nghiệm điền khuyết đã chấm điểm. Rất xuất sắc!`,
      scoreGained
    });
  };

  // End all review matches & reveal final dashboard entry
  const endTotalGameSession = () => {
    setIsRunning(false);
    setShowSubmission(true);
  };

  // Reset entirely
  const restartOverallSession = () => {
    setCurrentScore(0);
    setTotalTime(0);
    setIsRunning(false);
    setShowSubmission(false);
    setIsSubmitted(false);
    setActiveGameTab('selection');
    setM4Answers({});
    setM4Completed(false);
  };

  // Submit score to local storage leaderboard
  const handleSubmitScore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) return;

    const newEntry: LeaderboardEntry = {
      id: Date.now().toString(),
      name: playerName.trim(),
      bank: playerBank.trim() || 'Ngân hàng đối tác',
      score: currentScore,
      timeSpent: totalTime,
      date: new Date().toLocaleDateString('vi-VN')
    };

    const updated = [...leaderboard, newEntry].sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.timeSpent - b.timeSpent; // Faster time wins on tie
    });

    setLeaderboard(updated);
    localStorage.setItem('edura_interactive_games_leaderboard', JSON.stringify(updated));
    setIsSubmitted(true);
    setShowSubmission(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in text-left">
      {/* Return Navigation & Header Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <button
            id="back-to-dash-btn"
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition font-bold font-mono cursor-pointer uppercase mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isEnglish ? 'BACK TO DASHBOARD' : 'VỀ TRANG CHỦ PORTAL'}</span>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-900 text-teal-400 border border-slate-800">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight font-sans">
                {isEnglish ? 'Digital Revision Games & Arena' : 'Game Ôn Tập Trực Quan'}
              </h1>
              <p className="text-slate-500 text-xs sm:text-sm font-sans mt-0.5 font-medium">
                {isEnglish 
                  ? 'Interactive diagnostic playrooms: DISC matching, Lencioni tower, Agile fillers, and Creative Trivia.' 
                  : 'Bể phóng tri thức: Kéo thả DISC, sắp xếp xếp tháp Lencioni, điền khuyết Agile & Đố vui trắc nghiệm Module 4.'}
              </p>
            </div>
          </div>
        </div>

        {/* Global session leaderboard tracker */}
        <div className="bg-slate-950 text-white rounded-2xl p-4 border border-slate-800 flex items-center gap-4 shadow-sm shrink-0">
          <div className="text-center px-2">
            <span className="text-[9px] font-mono font-bold block text-slate-400 uppercase tracking-widest">
              {isEnglish ? 'REVISION SCORE' : 'ĐIỂM ÔN TẬP'}
            </span>
            <div className="flex items-center justify-center gap-1.5 mt-1 font-mono">
              <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-xl font-black text-teal-400 tracking-tight">{currentScore}</span>
            </div>
          </div>
          
          <div className="w-px h-8 bg-slate-800" />

          <div className="text-left">
            <span className="text-[9px] font-mono font-bold block text-slate-400 uppercase tracking-widest">
              {isEnglish ? 'TOTAL TIMER' : 'THỜI GIAN CHƠI'}
            </span>
            <div className="flex items-center gap-1.5 mt-1 font-mono">
              <Clock className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="text-base font-bold text-slate-200">{formatTime(totalTime)}</span>
            </div>
          </div>

          {(currentScore > 0 || totalTime > 0) && (
            <>
              <div className="w-px h-8 bg-slate-800" />
              <button
                id="reset-overall-session-btn"
                onClick={restartOverallSession}
                className="p-1 px-2.5 rounded-lg bg-slate-905 border border-slate-800 text-[10px] text-slate-300 hover:text-white font-mono hover:bg-slate-900 transition flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3 shrink-0" />
                <span>{isEnglish ? 'RESET' : 'CHƠI LẠI'}</span>
              </button>
            </>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* GAME TAB SELECTOR SCREEN */}
        {activeGameTab === 'selection' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Arena Entrance Grid */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-teal-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-md">
                <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                <div className="absolute -right-12 -top-12 w-48 h-48 bg-white opacity-5 rounded-full blur-3xl pointer-events-none" />
                
                <span className="bg-teal-500/10 text-teal-300 text-[10px] font-bold font-mono px-3 py-1 rounded-full border border-teal-500/20 uppercase tracking-widest">
                  {isEnglish ? 'EDURA INTERACTIVE STATIONS' : 'KHÔNG GIAN KIỂM TRA TRÙNG KHỚP'}
                </span>
                <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight mt-3 text-left">
                  {isEnglish ? 'Verify Your Corporate L&D Competency!' : 'Kiểm Tra Mức Độ Thấu Hiểu Toàn Bộ Lý Thuyết'}
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed max-w-2xl text-left">
                  {isEnglish
                    ? "Test your familiarity with BIC NGAN NGUYEN's specialized banking framework curriculum. Complete each active playroom sequentially to claim your spot on the banking leaderboard."
                    : "Hệ thống hóa toàn bộ tri thức về DISC, biểu đồ Lencioni, Agile Standup, SCAMPER, Động não đảo ngược và Động não nháp 6-3-5. Hoàn thành để lưu danh lên Bảng Vàng danh dự."}
                </p>

                <div className="mt-6 flex flex-wrap gap-3.5">
                  <button
                    id="trigger-game-disc"
                    onClick={() => startSession('disc')}
                    className="inline-flex items-center gap-2 bg-white text-slate-950 font-bold px-5 py-3 rounded-xl text-xs hover:bg-slate-100 transition shadow-md cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-slate-950" />
                    <span>{isEnglish ? 'Start Revision Arena' : 'Bắt Đầu Đấu Trường Ôn Tập'}</span>
                  </button>
                  {currentScore > 0 && (
                    <button
                      id="finish-session-submit"
                      onClick={endTotalGameSession}
                      className="inline-flex items-center gap-1.5 bg-teal-500 text-slate-950 font-black px-5 py-3 rounded-xl text-xs hover:bg-teal-400 transition cursor-pointer"
                    >
                      <Trophy className="w-3.5 h-3.5" />
                      <span>{isEnglish ? 'Submit Final Score' : 'Nộp Điểm Để Xếp Hạng'}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Individual station cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Game Card 1 */}
                <motion.div
                  whileHover={{ y: -5, borderColor: '#3b82f6' }}
                  className="bg-white border border-slate-200 p-4 rounded-2xl shadow-2xs flex flex-col justify-between text-left relative overflow-hidden group"
                >
                  <div className="absolute top-4 right-4 bg-blue-50 text-blue-700 text-[9px] font-mono font-bold px-2 py-0.5 rounded">
                    400 PTS Max
                  </div>
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 mb-3.5">
                      <Medal className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono tracking-widest font-extrabold uppercase text-blue-600">STATION 01</span>
                    <h4 className="text-sm font-extrabold text-slate-900 mt-1 tracking-tight">
                      {isEnglish ? 'DISC Matrix Pairing' : 'Ghép Cặp Hành Vi DISC'}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-2 leading-relaxed font-normal">
                      {isEnglish 
                        ? 'Align individual behavioral traits (D, I, S, C) to banking workplace definitions.'
                        : 'Nắm chắc đặc tính 4 nhóm tính cách nổi bật nhằm thấu hiểu đồng đội tối đa.'}
                    </p>
                  </div>
                  <button
                    id="play-game-disc-btn"
                    onClick={() => startSession('disc')}
                    className="w-full text-center mt-5 py-2.5 rounded-lg bg-slate-950 text-white hover:bg-slate-900 text-xs font-bold leading-none cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>{isEnglish ? 'Play Now' : 'Bắt đầu chơi'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>

                {/* Game Card 2 */}
                <motion.div
                  whileHover={{ y: -5, borderColor: '#eab308' }}
                  className="bg-white border border-slate-200 p-4 rounded-2xl shadow-2xs flex flex-col justify-between text-left relative overflow-hidden group"
                >
                  <div className="absolute top-4 right-4 bg-amber-50 text-amber-700 text-[9px] font-mono font-bold px-2 py-0.5 rounded">
                    400 PTS Max
                  </div>
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100 mb-3.5">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono tracking-widest font-bold uppercase text-amber-600">STATION 02</span>
                    <h4 className="text-sm font-extrabold text-slate-900 mt-1 tracking-tight">
                      {isEnglish ? 'Lencioni Pyramid Sorting' : 'Sắp xếp Tháp Lencioni'}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-2 leading-relaxed font-normal">
                      {isEnglish 
                        ? 'Assemble the 5 core dysfunctions from foundation to peak.'
                        : 'Sắp xếp 5 mức độ rào cản mâu thuẫn cản trở vận hành ngân hàng từ đáy tháp.'}
                    </p>
                  </div>
                  <button
                    id="play-game-lencioni-btn"
                    onClick={() => startSession('lencioni')}
                    className="w-full text-center mt-5 py-2.5 rounded-lg bg-slate-950 text-white hover:bg-slate-900 text-xs font-bold leading-none cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>{isEnglish ? 'Play Now' : 'Bắt đầu chơi'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>

                {/* Game Card 3 */}
                <motion.div
                  whileHover={{ y: -5, borderColor: '#10b981' }}
                  className="bg-white border border-slate-200 p-4 rounded-2xl shadow-2xs flex flex-col justify-between text-left relative overflow-hidden group"
                >
                  <div className="absolute top-4 right-4 bg-emerald-50 text-emerald-700 text-[9px] font-mono font-bold px-2 py-0.5 rounded">
                    400 PTS Max
                  </div>
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 mb-3.5">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono tracking-widest font-bold uppercase text-emerald-600">STATION 03</span>
                    <h4 className="text-sm font-extrabold text-slate-900 mt-1 tracking-tight">
                      {isEnglish ? 'Agile & SCAMPER Cloze' : 'Ôn Tập Điền Chỗ Trống'}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-2 leading-relaxed font-normal">
                      {isEnglish 
                        ? 'Demonstrate familiarity with Agile standup rules and SCAMPER terms.'
                        : 'Điền khuyết chính xác các chỉ số họp đứng, cải cách công việc tinh gọn.'}
                    </p>
                  </div>
                  <button
                    id="play-game-cloze-btn"
                    onClick={() => startSession('cloze')}
                    className="w-full text-center mt-5 py-2.5 rounded-lg bg-slate-950 text-white hover:bg-slate-900 text-xs font-bold leading-none cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>{isEnglish ? 'Play Now' : 'Bắt đầu chơi'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>

                {/* Game Card 4 (Module 4 Frameworks Trivia Quiz) */}
                <motion.div
                  whileHover={{ y: -5, borderColor: '#f59e0b' }}
                  className="bg-white border border-slate-200 p-4 rounded-2xl shadow-2xs flex flex-col justify-between text-left relative overflow-hidden group"
                >
                  <div className="absolute top-4 right-4 bg-amber-50 text-amber-700 text-[9px] font-mono font-bold px-2 py-0.5 rounded">
                    400 PTS Max
                  </div>
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100 mb-3.5">
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono tracking-widest font-bold uppercase text-amber-600">STATION 04</span>
                    <h4 className="text-sm font-extrabold text-slate-900 mt-1 tracking-tight">
                      {isEnglish ? 'M4 Creative Frameworks' : 'Trắc Nghiệm 3 Khung Tư Duy'}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-2 leading-relaxed font-normal">
                      {isEnglish 
                        ? 'Trivia challenge focusing on SCAMPER, Reverse Brainstorming, and Brainwriting 6-3-5.'
                        : 'Kiểm tra độ nhớ quy tắc SCAMPER, Động não đảo ngược và Brainwriting 6-3-5.'}
                    </p>
                  </div>
                  <button
                    id="play-game-m4quiz-btn"
                    onClick={() => startSession('m4quiz')}
                    className="w-full text-center mt-5 py-2.5 rounded-lg bg-slate-950 text-white hover:bg-slate-900 text-xs font-bold leading-none cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>{isEnglish ? 'Play Now' : 'Bắt đầu chơi'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>

              </div>
            </div>

            {/* LEADERBOARD BOARD (Right Column) */}
            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-500 shrink-0" />
                    <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                      {isEnglish ? 'Top Contender Standings' : 'Bảng Xếp Hạng Đấu Sĩ'}
                    </h3>
                  </div>
                  <span className="text-[10px] bg-slate-100 border border-slate-200 font-mono text-slate-500 font-bold px-2 py-0.5 rounded">
                    L&D LIVE
                  </span>
                </div>

                <div className="space-y-3">
                  {leaderboard.map((player, index) => {
                    const isTopThree = index < 3;
                    return (
                      <div 
                        key={player.id} 
                        className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                          isTopThree 
                            ? 'bg-slate-50/50 border-slate-150 shadow-2xs font-semibold' 
                            : 'bg-white border-slate-120'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {/* Rank badge */}
                          <div className={`w-6 h-6 rounded-md flex items-center justify-center font-mono text-[11px] font-bold ${
                            index === 0 ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                            index === 1 ? 'bg-slate-200 text-slate-800' :
                            index === 2 ? 'bg-orange-100 text-orange-850' :
                            'bg-slate-50 text-slate-500'
                          }`}>
                            {index + 1}
                          </div>
                          <div className="text-left">
                            <span className="block text-xs text-slate-800 font-extrabold">{player.name}</span>
                            <span className="block text-[9px] text-slate-400 font-medium">{player.bank}</span>
                          </div>
                        </div>

                        {/* Player score & duration */}
                        <div className="text-right">
                          <span className="block text-xs font-mono font-extrabold text-slate-900">{player.score} pts</span>
                          <span className="block text-[8px] font-mono text-slate-400">🕒 {player.timeSpent}s</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Footer action inside leaderboard block */}
              <div className="border-t border-slate-100 pt-5 mt-6 justify-center flex">
                <p className="text-[10px] font-mono text-slate-400 text-center uppercase tracking-wider font-semibold">
                  {isEnglish ? 'Scores reset on application relaunch' : 'Ghi nhận lưu lượng cục bộ của trình duyệt'}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* GAME 1: DISC MATCH GAME SCREEN */}
        {activeGameTab === 'disc' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6"
          >
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-blue-600 block uppercase">STATION ONE • GAMESTATION</span>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight mt-1">
                  {isEnglish ? 'DISC Behavioral Attribute Pairing' : 'Ghép Cặp Điền Ma Trận DISC'}
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm mt-1">
                  {isEnglish 
                    ? 'Step 1: Select a DISC class code, then click the matching banking trait description.' 
                    : 'Bước 1: Chọn thẻ chữ cái DISC, sau đó nhấp vào mô tả đặc tính hành vi phù hợp dưới đây.'}
                </p>
              </div>
              <button
                id="quit-game-tab"
                onClick={() => setActiveGameTab('selection')}
                className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold font-mono rounded-xl cursor-pointer"
              >
                {isEnglish ? 'Back to Selector' : 'Quay Lại Sảnh'}
              </button>
            </div>

            {/* Drag source cards selection */}
            <div className="space-y-3">
              <span className="text-[11px] font-mono text-slate-400 font-bold block uppercase tracking-wider">
                {isEnglish ? '1. SELECT DISC CARD STYLE:' : '1. CHỌN PHONG CÁCH HÀNH VI:'}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {['D', 'I', 'S', 'C'].map(code => {
                  const matchData = discMatches.find(m => m.id === code)!;
                  const isSelected = selectedDiscItem === code;
                  // Has this source card been matched already?
                  const isAlreadyPlaced = Object.values(discAnswers).includes(code);

                  return (
                    <motion.button
                      key={code}
                      id={`disc-source-${code}`}
                      onClick={() => !isAlreadyPlaced && handleDiscSelectSource(code)}
                      disabled={isAlreadyPlaced || discCompleted}
                      whileHover={{ scale: isAlreadyPlaced ? 1 : 1.02 }}
                      className={`p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                        isAlreadyPlaced 
                          ? 'bg-slate-50 border-slate-200 text-slate-300 line-through cursor-not-allowed opacity-40'
                          : isSelected
                            ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                            : 'bg-white border-slate-200 hover:border-blue-500 text-slate-800 hover:bg-blue-50/20'
                      }`}
                    >
                      <div className="font-mono text-3xl font-black">{code}</div>
                      <div className="text-[11px] font-bold mt-1 uppercase tracking-wide">
                        {code === 'D' ? 'Dominance' :
                         code === 'I' ? 'Influence' :
                         code === 'S' ? 'Steadiness' : 'Compliance'}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Drop target area */}
            <div className="space-y-4 pt-4">
              <span className="text-[11px] font-mono text-slate-400 font-bold block uppercase tracking-wider">
                {isEnglish ? '2. MAP TO CORRECT BANK WORKPLACE DESCRIPTION:' : '2. GHÉP VÀO MÔ TẢ ĐẶC TRƯNG HÀNH VI:'}
              </span>

              <div className="space-y-4">
                {discMatches.map(targetItem => {
                  // Which source card is currently mapped here?
                  const mappedSourceCode = discAnswers[targetItem.id];
                  const isCurrentlyTargeted = selectedDiscTarget === targetItem.id;

                  return (
                    <div 
                      key={targetItem.id}
                      className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                        isCurrentlyTargeted 
                          ? 'border-blue-500 bg-blue-50/10' 
                          : 'border-slate-150 bg-slate-50/50'
                      }`}
                    >
                      {/* Left: Definition text */}
                      <p className="text-slate-700 text-xs sm:text-sm font-medium leading-relaxed md:max-w-2xl">
                        {targetItem.definition}
                      </p>

                      {/* Right: Slot selector button */}
                      <div className="flex items-center gap-2 shrink-0 justify-end">
                        {mappedSourceCode ? (
                          <div className="flex items-center gap-1.5">
                            <div className="bg-slate-900 text-teal-400 font-mono text-base font-bold px-4 py-1.5 rounded-xl border border-slate-800 flex items-center gap-2">
                              <span>{mappedSourceCode}</span>
                              {discCompleted && (
                                <span className={mappedSourceCode === targetItem.id ? 'text-emerald-400' : 'text-red-400'}>
                                  {mappedSourceCode === targetItem.id ? '✓' : '✗'}
                                </span>
                              )}
                            </div>
                            
                            {!discCompleted && (
                              <button
                                id={`remove-mapping-${targetItem.id}`}
                                onClick={() => handleRemoveDiscAnswer(targetItem.id)}
                                className="text-red-500 hover:text-red-700 text-xs font-mono font-bold hover:underline cursor-pointer p-1"
                              >
                                {isEnglish ? 'Clear' : 'Gỡ'}
                              </button>
                            )}
                          </div>
                        ) : (
                          <button
                            id={`map-target-${targetItem.id}`}
                            onClick={() => handleDiscSelectTarget(targetItem.id)}
                            disabled={discCompleted}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer border ${
                              isCurrentlyTargeted
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            {isEnglish ? 'Select definition slot' : 'Ghim đáp án'}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Check answers and continue action button */}
            <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left">
                {!discCompleted ? (
                  <p className="text-slate-500 text-xs">
                    {isEnglish ? '*Ensure 4/4 slots are mapped before checking answers.' : '*Vui lòng ghim tất cả 4 đáp án trước khi bấm chấm điểm.'}
                  </p>
                ) : (
                  <p className="text-emerald-600 text-xs font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>{isEnglish ? 'Answers calculated! Proceed to Next Stage.' : 'Đã chấm điểm thành công! Hãy tiếp tục.'}</span>
                  </p>
                )}
              </div>

              <div className="flex gap-3 w-full sm:w-auto">
                {!discCompleted ? (
                  <button
                    id="submit-game-disc-verify"
                    onClick={checkDiscGame}
                    disabled={Object.keys(discAnswers).length < 4}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-300 disabled:border-slate-200 text-white font-extrabold px-6 py-3 rounded-xl text-xs transition cursor-pointer disabled:cursor-not-allowed border-0"
                  >
                    <span>{isEnglish ? 'Check Match Results' : 'Xác Nhận Chấm Điểm'}</span>
                  </button>
                ) : (
                  <button
                    id="disc-next-step"
                    onClick={() => startSession('lencioni')}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-teal-500 text-slate-950 font-black px-6 py-3 rounded-xl text-xs hover:bg-teal-400 transition cursor-pointer border-0"
                  >
                    <span>{isEnglish ? 'Stage 2: Lencioni Tower (Next) →' : 'Trạm 2: Sắp xếp Tháp Lencioni →'}</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* GAME 2: LENCIONI PYRAMID SORTING SCREEN */}
        {activeGameTab === 'lencioni' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6"
          >
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-amber-500 block uppercase">STATION TWO • COMMITMENT STRENGTHEN</span>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight mt-1">
                  {isEnglish ? 'Lencioni Dysfunction Pyramid Reordering' : 'Tái Thiết Lập Tháp Rào Cản Lencioni'}
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm mt-1">
                  {isEnglish 
                    ? 'Arrange dysfunctions from Level 1 (Absence of Trust) at the bottom, up to Level 5 (Inattention to Results) at the top.' 
                    : 'Hướng dẫn: Sắp xếp các lớp từ Level 1 (Sự thiếu tin tưởng - Đáy tháp) trở dần lên Level 5 (Thờ ơ kết quả - Đỉnh tháp).'}
                </p>
              </div>
              <button
                id="quit-game-sorting"
                onClick={() => setActiveGameTab('selection')}
                className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold font-mono rounded-xl cursor-pointer"
              >
                {isEnglish ? 'Back to Selector' : 'Quay Lại Sảnh'}
              </button>
            </div>

            {/* Pyramid Representation Layout rendering */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Visual pyramid schematic */}
              <div className="lg:col-span-4 bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center space-y-2 relative overflow-hidden">
                <div className="absolute top-2 left-3 text-[8px] font-mono text-slate-500 uppercase tracking-widest">
                  SHIELD PREVIEW
                </div>

                {/* Displaying visual layers matching active states */}
                <div className="flex flex-col items-center justify-center gap-1 ml-auto mr-auto w-full max-w-[240px] pt-4">
                  {lencioniUserOrder.map((layer, index) => {
                    const isCorrect = layer.level === lencioniItemsCorrect[index].level;
                    // Adjust width dynamically to emphasize pyramid wedge shape
                    const baseWidths = ["w-full", "w-[90%]", "w-[80%]", "w-[70%]", "w-[60%]"];
                    const widthClass = baseWidths[index];

                    return (
                      <div 
                        key={layer.level}
                        className={`${widthClass} h-8 rounded-md flex items-center justify-center font-mono text-[9px] font-bold text-slate-200 border transition-all ${
                          lencioniCompleted
                            ? isCorrect 
                              ? 'bg-teal-500/20 text-teal-400 border-teal-500/40 font-black' 
                              : 'bg-red-500/25 text-red-300 border-red-550/40 line-through'
                            : 'bg-slate-900 border-slate-800'
                        }`}
                      >
                        Level {layer.level}: {layer.label.substring(0, 15)}...
                      </div>
                    );
                  })}
                </div>
                <div className="text-[10px] text-slate-500 mt-4 leading-relaxed">
                  {isEnglish 
                    ? '▲ Pyramidal structure: Base starts at physical bottom (Level 1).' 
                    : '▲ Cấu trúc tháp ngược: Đáy bắt đầu từ Level 1 nằm cuối danh sách.'}
                </div>
              </div>

              {/* Right Column: Re-order controller cards */}
              <div className="lg:col-span-8 space-y-3">
                <span className="text-[11px] font-mono text-slate-400 font-bold block uppercase tracking-wider">
                  {isEnglish ? 'ARRANGE MOVEMENT TILES:' : 'THAO TÁC SẮP XẾP SÂN ĐẤU:'}
                </span>

                <div className="space-y-2">
                  {lencioniUserOrder.map((item, index) => {
                    const expectedCode = lencioniItemsCorrect[index];
                    const isCorrect = item.level === expectedCode.level;

                    return (
                      <motion.div
                        layout
                        key={item.level}
                        className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                          lencioniCompleted
                            ? isCorrect
                              ? 'bg-emerald-50/50 border-emerald-300'
                              : 'bg-red-50/50 border-red-200'
                            : 'bg-white border-slate-200 hover:border-slate-350 shadow-2xs'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {/* visual sorting tracker label */}
                          <div className="w-8 h-8 rounded-xl bg-slate-900 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                            #{index + 1}
                          </div>
                          <div className="text-left">
                            <h4 className="text-sm font-extrabold text-slate-950 tracking-tight leading-sm flex items-center gap-2">
                              <span>{item.label}</span>
                              {lencioniCompleted && (
                                <span className={`text-[10px] font-mono px-1.5 rounded ${
                                  isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                                }`}>
                                  {isCorrect ? `Correct Level ${item.level}` : `Expected Level ${expectedCode.level}`}
                                </span>
                              )}
                            </h4>
                            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </div>

                        {/* Arrows controllers */}
                        {!lencioniCompleted && (
                          <div className="flex flex-col gap-1 shrink-0">
                            <button
                              id={`move-lencioni-up-${index}`}
                              onClick={() => handleMoveLencioni(index, 'up')}
                              disabled={index === 0}
                              className="p-1 px-2 text-slate-500 hover:text-slate-900 disabled:opacity-20 rounded hover:bg-slate-100 transition cursor-pointer"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              id={`move-lencioni-down-${index}`}
                              onClick={() => handleMoveLencioni(index, 'down')}
                              disabled={index === lencioniUserOrder.length - 1}
                              className="p-1 px-2 text-slate-500 hover:text-slate-900 disabled:opacity-20 rounded hover:bg-slate-100 transition cursor-pointer"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Check action button */}
            <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left">
                {!lencioniCompleted ? (
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    {isEnglish 
                      ? '*Level 1 (Absence of Trust) belongs on the very bottom segment (Rank #5).'
                      : '*Nhắc nhỏ học thuật: Level 1 (Sự thiếu tin tưởng) phải nằm cuối danh sách (Vị trí số 5 dưới đáy tháp).'}
                  </p>
                ) : (
                  <p className="text-emerald-600 text-xs font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>{isEnglish ? 'Lencioni Alignment Saved! Proceed onwards.' : 'Tháp rào cản hoàn thành! Tiến tới trạm tiếp theo.'}</span>
                  </p>
                )}
              </div>

              <div className="flex gap-3 w-full sm:w-auto">
                {!lencioniCompleted ? (
                  <button
                    id="submit-game-lencioni-verify"
                    onClick={checkLencioniGame}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold px-6 py-3 rounded-xl text-xs transition cursor-pointer border-0"
                  >
                    <span>{isEnglish ? 'Check Alignment Scores' : 'Kiểm Tra Tháp Mâu Thuẫn'}</span>
                  </button>
                ) : (
                  <button
                    id="lencioni-next-step"
                    onClick={() => startSession('cloze')}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-teal-500 text-slate-950 font-black px-6 py-3 rounded-xl text-xs hover:bg-teal-400 transition cursor-pointer border-0"
                  >
                    <span>{isEnglish ? 'Stage 3: Cloze Fill Blanks →' : 'Trạm 3: Ôn Tập Điền Chỗ Trống →'}</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* GAME 3: CLOZE GAME SCREEN */}
        {activeGameTab === 'cloze' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6"
          >
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-600 block uppercase">STATION THREE • KNOWLEDGE PILLS</span>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight mt-1">
                  {isEnglish ? 'Interactive Agile/SCAMPER Knowledge Blanks' : 'Chẩn Nghiệm Trắc Nghiệm Điền Khuyết'}
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm mt-1">
                  {isEnglish 
                    ? 'Review basic definitions by choosing the missing terms to ensure knowledge retention.' 
                    : 'Chọn từ hoặc chỉ số thích hợp nhất để hoàn tất 4 nhận định học thuật tinh gọn dưới đây.'}
                </p>
              </div>
              <button
                id="quit-game-cloze"
                onClick={() => setActiveGameTab('selection')}
                className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold font-mono rounded-xl cursor-pointer"
              >
                {isEnglish ? 'Back to Selector' : 'Quay Lại Sảnh'}
              </button>
            </div>

            {/* Questions area */}
            <div className="space-y-6">
              {clozeQuestions.map(q => {
                const userChoice = clozeAnswers[q.id];
                const isCorrect = userChoice === q.blank;

                return (
                  <div 
                    key={q.id}
                    className={`p-5 rounded-2xl border transition-all space-y-4 shadow-2xs ${
                      clozeCompleted
                        ? isCorrect 
                          ? 'bg-emerald-50/40 border-emerald-200' 
                          : 'bg-red-50/40 border-red-150'
                        : 'bg-slate-50/50 border-slate-100'
                    }`}
                  >
                    {/* Header index badge */}
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-extrabold text-slate-400">QUESTION 0{q.id}</span>
                      {clozeCompleted && (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {isCorrect ? 'CORRECT' : 'INCORRECT'}
                        </span>
                      )}
                    </div>

                    {/* Styled Text body showing matching visual blank gap */}
                    <p className="text-slate-800 text-sm sm:text-base leading-relaxed tracking-tight text-left">
                      {q.text.split("_____")[0]}
                      <span className={`inline-block px-3 py-1 mx-1.5 font-mono text-sm font-bold border-b-2 rounded-md ${
                        userChoice 
                          ? 'text-teal-700 bg-slate-100 border-teal-500' 
                          : 'text-slate-350 bg-slate-100/50 border-slate-300 animate-pulse'
                      }`}>
                        {userChoice || (isEnglish ? "• • •" : "Trống")}
                      </span>
                      {q.text.split("_____")[1]}
                    </p>

                    {/* Render custom options */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                      {q.options.map(opt => {
                        const isOptionSelected = userChoice === opt;
                        let optionStyle = "bg-white border-slate-200 hover:border-slate-400 hover:bg-slate-50 text-slate-750";
                        if (isOptionSelected) {
                          optionStyle = "bg-slate-905 border-slate-950 text-slate-900 border-2 shadow-2xs font-bold";
                        }
                        if (clozeCompleted) {
                          if (opt === q.blank) {
                            optionStyle = "bg-emerald-500 text-slate-950 font-black border-emerald-500 shadow-sm disabled:opacity-100";
                          } else if (isOptionSelected) {
                            optionStyle = "bg-red-100 text-red-850 line-through border-red-200 disabled:opacity-100";
                          } else {
                            optionStyle = "bg-white border-slate-150 text-slate-300 disabled:opacity-50";
                          }
                        }

                        return (
                          <button
                            key={opt}
                            id={`option-card-${q.id}-${opt}`}
                            disabled={clozeCompleted}
                            onClick={() => handleClozeSelect(q.id, opt)}
                            className={`p-2.5 rounded-xl border text-center transition-all text-xs cursor-pointer ${optionStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Check Answers Block */}
            <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left font-serif-academic italic">
                {!clozeCompleted ? (
                  <p className="text-slate-500 text-xs font-normal">
                    {isEnglish ? '*Complete all 4 questions to verify aggregate outcomes.' : '*Cần trả lời đủ 4 câu hỏi để ghi nhận kết quả ôn tập.'}
                  </p>
                ) : (
                  <p className="text-slate-950 font-semibold text-xs py-0.5">
                    {isEnglish ? 'Review Completed! Time to submit scores.' : 'Trải nghiệm hoàn tất! Ghi danh kết nạp Bảng xếp hạng.'}
                  </p>
                )}
              </div>

              <div className="flex gap-3 w-full sm:w-auto">
                {!clozeCompleted ? (
                  <button
                    id="submit-cloze-answers"
                    onClick={checkClozeGame}
                    disabled={Object.keys(clozeAnswers).length < 4}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-300 disabled:border-slate-200 text-white font-extrabold px-6 py-3 rounded-xl text-xs transition cursor-pointer disabled:cursor-not-allowed border-0"
                  >
                    <span>{isEnglish ? 'Check Blank Answers' : 'Cộng Điểm Tổng Kết'}</span>
                  </button>
                ) : (
                  <button
                    id="cloze-next-step"
                    onClick={() => startSession('m4quiz')}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-teal-500 text-slate-950 font-black px-6 py-3 rounded-xl text-xs hover:bg-teal-400 transition cursor-pointer border-0"
                  >
                    <span>{isEnglish ? 'Stage 4: Creative Frameworks →' : 'Trạm 4: Trắc Nghiệm 3 Khung Tư Duy →'}</span>
                  </button>
                )}
              </div>
            </div>

          </motion.div>
        )}

        {/* GAME 4: MODULE 4 FRAMEWORKS TRIVIA QUIZ SCREEN */}
        {activeGameTab === 'm4quiz' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6"
          >
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-amber-500 block uppercase">STATION FOUR • BRAINSTORMING BUZZ</span>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight mt-1">
                  {isEnglish ? 'Creative Brainstorming Trivia Quiz' : 'Đố Vui Trắc Nghiệm 3 Khung Tư Duy (Module 4)'}
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm mt-1">
                  {isEnglish 
                    ? 'Reinforce knowledge of SCAMPER, Reverse Brainstorming, and Brainwriting 6-3-5 with fun trivia.' 
                    : 'Kiểm tra mức độ ghi nhớ 3 Khung tư duy sáng tạo: SCAMPER, Động não đảo ngược & Brainwriting 6-3-5.'}
                </p>
              </div>
              <button
                id="quit-game-m4quiz"
                onClick={() => setActiveGameTab('selection')}
                className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold font-mono rounded-xl cursor-pointer"
              >
                {isEnglish ? 'Back to Selector' : 'Quay Lại Sảnh'}
              </button>
            </div>

            {/* Questions area */}
            <div className="space-y-6">
              {m4QuizQuestions.map(q => {
                const userChoice = m4Answers[q.id];
                const isCorrect = userChoice === q.correct;

                return (
                  <div 
                    key={q.id}
                    className={`p-5 rounded-2xl border transition-all space-y-4 shadow-2xs ${
                      m4Completed
                        ? isCorrect 
                          ? 'bg-emerald-50/40 border-emerald-200' 
                          : 'bg-red-50/40 border-red-150'
                        : 'bg-slate-50/50 border-slate-100 hover:bg-slate-50'
                    }`}
                  >
                    {/* Header index badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-extrabold text-slate-400">QUESTION 0{q.id}</span>
                        {m4Completed && (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {isCorrect ? 'CORRECT (+100 PTS)' : 'INCORRECT'}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Question text */}
                    <h3 className="text-slate-900 font-bold text-sm sm:text-base leading-snug tracking-tight text-left">
                      {q.question}
                    </h3>

                    {/* Options grid */}
                    <div className="grid grid-cols-1 gap-2.5 pt-1 text-left">
                      {q.options.map((opt, oIdx) => {
                        const optionLetter = ["A", "B", "C", "D"][oIdx];
                        const isOptionSelected = userChoice === optionLetter;
                        
                        let optionStyle = "bg-white border-slate-200 hover:border-slate-400 hover:bg-slate-50 text-slate-850";
                        if (isOptionSelected) {
                          optionStyle = "bg-slate-950 border-slate-950 text-white font-bold border-2 shadow-2xs";
                        }
                        
                        if (m4Completed) {
                          if (optionLetter === q.correct) {
                            optionStyle = "bg-emerald-500 text-slate-950 font-black border-emerald-500 shadow-sm disabled:opacity-100";
                          } else if (isOptionSelected) {
                            optionStyle = "bg-red-100 text-red-805 border-red-200 disabled:opacity-100 line-through";
                          } else {
                            optionStyle = "bg-white border-slate-150 text-slate-300 disabled:opacity-50";
                          }
                        }

                        return (
                          <button
                            key={opt}
                            id={`option-m4quiz-${q.id}-${optionLetter}`}
                            disabled={m4Completed}
                            onClick={() => {
                              if (m4Completed) return;
                              setM4Answers(prev => ({
                                ...prev,
                                [q.id]: optionLetter
                              }));
                            }}
                            className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm cursor-pointer transition-all flex items-start gap-2.5 ${optionStyle}`}
                          >
                            <span className="font-mono font-extrabold">{optionLetter}.</span>
                            <span className="flex-1">{opt.substring(3)}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanatory notes when completed */}
                    {m4Completed && (
                      <div className="mt-4 p-3 bg-slate-100/50 rounded-xl border border-slate-200 text-[11px] text-slate-600 leading-relaxed text-left">
                        <strong className="text-slate-900 text-xs block mb-0.5">💡 {isEnglish ? "Expert Insight:" : "Giải nghĩa học thuật:"}</strong>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Check Answers Block */}
            <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left font-serif-academic italic">
                {!m4Completed ? (
                  <p className="text-slate-500 text-xs font-normal">
                    {isEnglish ? '*Give answers to all 4 questions to verify aggregate outcomes.' : '*Cần trả lời đủ 4 câu hỏi đố vui để hệ thống ghi điểm.'}
                  </p>
                ) : (
                  <p className="text-slate-950 font-semibold text-xs py-0.5">
                    {isEnglish ? 'Creative Trivia Completed! Time to submit scores.' : 'Trải nghiệm hoàn tất! Ghi danh kết nạp Bảng xếp hạng.'}
                  </p>
                )}
              </div>

              <div className="flex gap-3 w-full sm:w-auto">
                {!m4Completed ? (
                  <button
                    id="submit-m4quiz-answers"
                    onClick={() => {
                      let scoreGained = 0;
                      m4QuizQuestions.forEach(q => {
                        if (m4Answers[q.id] === q.correct) {
                          scoreGained += 100; // 4 questions * 100 = 400 total
                        }
                      });

                      setCurrentScore(prev => prev + scoreGained);
                      setM4Completed(true);
                      setGameFeedback({
                        show: true,
                        msg: isEnglish 
                          ? `Completed Creative Trivia with ${Math.floor(scoreGained / 100)}/4 correct replies!` 
                          : `Đố vui hoàn thành! Bạn đạt ${Math.floor(scoreGained / 100)}/4 câu trả lời sáng tạo chính xác!`,
                        scoreGained
                      });
                    }}
                    disabled={Object.keys(m4Answers).length < 4}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-300 disabled:border-slate-200 text-white font-extrabold px-6 py-3 rounded-xl text-xs transition cursor-pointer disabled:cursor-not-allowed border-0"
                  >
                    <span>{isEnglish ? 'Verify Trivia Answers' : 'Cộng Điểm Trắc Nghiệm'}</span>
                  </button>
                ) : (
                  <button
                    id="trigger-submission-dialog"
                    onClick={endTotalGameSession}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-teal-500 text-slate-950 font-black px-6 py-3 rounded-xl text-xs hover:bg-teal-400 transition cursor-pointer border-0"
                  >
                    <span>{isEnglish ? 'Calculate Placement Rank →' : 'Nộp Điểm Để Xếp Hạng →'}</span>
                  </button>
                )}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* FINAL SUBMISSION MODAL DIALOG */}
      {showSubmission && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-150 shadow-2xl relative text-left"
          >
            <div className="text-center space-y-3">
              <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center border border-amber-100 ml-auto mr-auto">
                <Trophy className="w-7 h-7 text-amber-500" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                {isEnglish ? 'Victory! Review Completed' : 'Chúc Mừng Hoàn Thành!'}
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm">
                {isEnglish
                  ? 'Your expert revision metrics are collected. Save to Leaderboard now!'
                  : 'Bạn đã xuất sắc vượt qua các trạm thử thách thấu hiểu. Lưu điểm để đối chứng năng lực.'}
              </p>
            </div>

            {/* Score strip table */}
            <div className="my-5 bg-slate-50 p-4 rounded-2xl border border-slate-200/60 font-mono text-center flex justify-around">
              <div>
                <span className="block text-[9px] text-slate-400 uppercase tracking-widest">{isEnglish ? 'AGGREGATE SCORE' : 'ĐIỂM SỐ'}</span>
                <span className="text-2xl font-black text-teal-600 block mt-0.5">{currentScore} pts</span>
              </div>
              <div className="w-px bg-slate-200" />
              <div>
                <span className="block text-[9px] text-slate-400 uppercase tracking-widest">{isEnglish ? 'TIME SPEED' : 'THỜI GIAN'}</span>
                <span className="text-xl font-bold text-slate-800 block mt-0.5">{formatTime(totalTime)}</span>
              </div>
            </div>

            {/* Input submission Form */}
            <form onSubmit={handleSubmitScore} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-1">
                  {isEnglish ? "Candidate Name:" : "Tên Thí Sinh / Biệt Danh:"}
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    id="submit-player-name"
                    required
                    maxLength={24}
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder={isEnglish ? "e.g., Bich Ngan Nguyen" : "Ví dụ: Bich Ngan Nguyen"}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-250 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-1">
                  {isEnglish ? "Affiliated Organization:" : "Đơn vị / Chi nhánh Ngân hàng:"}
                </label>
                <input
                  id="submit-player-bank"
                  maxLength={32}
                  value={playerBank}
                  onChange={(e) => setPlayerBank(e.target.value)}
                  placeholder={isEnglish ? "e.g., HD Bank" : "Ví dụ: HD Bank Hội Sở"}
                  className="w-full px-4 py-3 bg-white border border-slate-250 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-hidden"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  id="cancel-submit-score-btn"
                  type="button"
                  onClick={restartOverallSession}
                  className="w-1/3 py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold font-mono text-xs rounded-xl cursor-pointer"
                >
                  {isEnglish ? 'Skip' : 'Bỏ Qua'}
                </button>
                <button
                  id="save-submit-score-btn"
                  type="submit"
                  className="w-2/3 py-3 bg-slate-950 text-white font-extrabold hover:bg-slate-900 text-xs rounded-xl cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isEnglish ? 'Submit Rank Score' : 'Ghi Danh Đấu Trường'}</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* FEEDBACK HELPER NOTIFICATION */}
      {gameFeedback && gameFeedback.show && (
        <div className="fixed bottom-6 right-6 z-40 bg-slate-900 text-white rounded-2xl p-4 border border-slate-800 shadow-2xl flex items-center gap-3.5 max-w-sm animate-fade-in">
          <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0 border border-teal-500/20">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
          </div>
          <div className="text-left flex-1">
            <span className="text-[9px] font-mono font-bold text-slate-400 uppercase block tracking-widest">
              {isEnglish ? 'CHAMPIONSHIP BOOST' : 'KẾT QUẢ GHI NHẬN'}
            </span>
            <p className="text-xs text-slate-200 mt-0.5 leading-relaxed font-semibold">
              {gameFeedback.msg}
            </p>
            <span className="text-[10px] text-teal-400 font-mono font-bold mt-1 block">
              +{gameFeedback.scoreGained} PTS ADDED
            </span>
          </div>
          <button
            id="close-feedback-popup"
            onClick={() => setGameFeedback(null)}
            className="text-slate-400 hover:text-white transition text-xs font-mono font-black"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
