/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowLeft, RefreshCw, Trophy, AlertTriangle, CheckCircle2, Flame, ShieldCheck, HelpCircle, ArrowLeftRight, ChevronRight, Play, Check, Plus, Trash2 } from 'lucide-react';

interface TeamStageSurveyProps {
  onBack: () => void;
  isEnglish?: boolean;
}

// 20 Questions from the official Victoria Institute PDF
const QUESTIONS_DATA = [
  {
    id: 1,
    statementVi: "Trong cuộc họp, các thành viên chủ yếu trao đổi thông tin thay vì cùng đưa ra quyết định chung.",
    statementEn: "In meetings, members primarily exchange information rather than making joint decisions.",
    category: "A" // Working Group
  },
  {
    id: 2,
    statementVi: "Mọi người thường \"đồng ý cho xong\" thay vì tranh luận thẳng thắn về các phương án.",
    statementEn: "People often \"agree just to get it over with\" instead of having open debates on options.",
    category: "B" // Pseudo-team
  },
  {
    id: 3,
    statementVi: "Vai trò và trách nhiệm của từng người không được ghi rõ hoặc thường xuyên bị nhầm lẫn.",
    statementEn: "Roles and responsibilities of each member are not clearly defined or are frequently confused.",
    category: "A" // Working Group
  },
  {
    id: 4,
    statementVi: "Có lúc nhóm bắt đầu hợp tác tốt, nhưng khi áp lực xuất hiện thì mọi thứ nhanh chóng rơi về làm việc độc lập.",
    statementEn: "At times the team starts cooperating well, but when pressure arises, everything quickly regresses to independent work.",
    category: "BC" // Counts towards both B & C (Pseudo-team & Potential Team) as per PDF
  },
  {
    id: 5,
    statementVi: "Thành viên sẵn sàng thừa nhận sai sót và xin giúp đỡ lẫn nhau.",
    statementEn: "Members are willing to admit mistakes and ask each other for help.",
    category: "C" // Potential Team
  },
  {
    id: 6,
    statementVi: "Đội có tiêu chí/ KPI chung rõ ràng mà mọi người đều hiểu và theo dõi.",
    statementEn: "The team has clear shared goals/KPIs that everyone understands and monitors.",
    category: "D" // Real Team
  },
  {
    id: 7,
    statementVi: "Khi một người không hoàn thành công việc, ít ai nhắc nhở trực tiếp vì ngại mâu thuẫn.",
    statementEn: "When someone fails to complete their work, rarely does anyone remind them directly due to fear of conflict.",
    category: "B" // Pseudo-team
  },
  {
    id: 8,
    statementVi: "Đội có quy tắc làm việc chung (định nghĩa xong việc, chuẩn giao tiếp, deadline...) và tuân thủ chúng.",
    statementEn: "The team has clear working agreements (definition of done, communication standards, deadlines...) and adheres to them.",
    category: "C" // Potential Team
  },
  {
    id: 9,
    statementVi: "Quyết định quan trọng thường bị trì hoãn do thiếu phản biện hay sợ gây xung đột.",
    statementEn: "Important decisions are often delayed due to lack of constructive debate or fear of causing conflict.",
    category: "B" // Pseudo-team
  },
  {
    id: 10,
    statementVi: "Nhóm thường tổ chức đánh giá hậu công việc (retrospective) để rút kinh nghiệm và cải tiến.",
    statementEn: "The team regularly conducts post-project reviews (retrospectives) to learn and improve.",
    category: "E" // High-performance Team
  },
  {
    id: 11,
    statementVi: "Các nỗ lực thường được đánh giá và khen thưởng theo thành quả cá nhân nhiều hơn theo kết quả đội.",
    statementEn: "Efforts are usually evaluated and rewarded based on individual achievements rather than team results.",
    category: "A" // Working Group
  },
  {
    id: 12,
    statementVi: "Có sự tin cậy cơ bản: mọi người tin là đồng đội sẽ hoàn thành phần việc đúng chuẩn và đúng hẹn.",
    statementEn: "There is basic trust: everyone believes that teammates will complete their tasks with high standard and on time.",
    category: "C" // Potential Team
  },
  {
    id: 13,
    statementVi: "Đội chủ động đề xuất cải tiến quy trình/chính sách chứ không chỉ chờ hướng dẫn từ lãnh đạo.",
    statementEn: "The team proactively proposes process/policy improvements instead of just waiting for leadership directives.",
    category: "E" // High-performance Team
  },
  {
    id: 14,
    statementVi: "Người ta dễ chấp nhận trách nhiệm cá nhân nhưng ít khi chịu trách nhiệm thay mặt đội.",
    statementEn: "People easily accept individual accountability, but rarely take responsibility on behalf of the team.",
    category: "A" // Working Group
  },
  {
    id: 15,
    statementVi: "Các cuộc họp thường có mục tiêu rõ ràng và kết luận kèm hành động cụ thể, người phụ trách.",
    statementEn: "Meetings always have clear objectives and conclude with specific action items and assigned owners.",
    category: "D" // Real Team
  },
  {
    id: 16,
    statementVi: "Khi có mâu thuẫn chuyên môn, các ý kiến trái chiều được thảo luận cởi mở để tìm phương án tốt nhất.",
    statementEn: "When professional conflicts arise, opposing ideas are discussed openly to find the best alternative.",
    category: "D" // Real Team
  },
  {
    id: 17,
    statementVi: "Đội nhanh thích ứng khi có thay đổi bên ngoài và thay đổi cách làm để hoàn thành mục tiêu mới.",
    statementEn: "The team quickly adapts to external changes and switches working methods to achieve new targets.",
    category: "E" // High-performance Team
  },
  {
    id: 18,
    statementVi: "Thành viên chủ động nhắc nhở và góp ý cho đồng đội khi chất lượng công việc không đạt tiêu chuẩn.",
    statementEn: "Members proactively remind and provide constructive feedback to teammates when work quality falls below standard.",
    category: "D" // Real Team
  },
  {
    id: 19,
    statementVi: "Đội thường đạt được kết quả vượt trội, vượt mục tiêu thông thường và duy trì được khả năng đó.",
    statementEn: "The team consistently achieves exceptional results, exceeds targets, and sustains that capability.",
    category: "E" // High-performance Team
  },
  {
    id: 20,
    statementVi: "Môi trường làm việc thúc đẩy học hỏi lẫn nhau và cho phép thử nghiệm (chấp nhận lỗi để học).",
    statementEn: "The working environment promotes mutual learning and allows experimentation (accepting mistakes to learn).",
    category: "E" // High-performance Team
  }
];

// Group references based on the PDF scoring guide
const GROUPS_META = {
  A: {
    titleVi: "Working Group (Nhóm làm việc)",
    titleEn: "Working Group",
    max: 20,
    descriptionVi: "Làm việc độc lập, chia sẻ thông tin là chính, chưa có mục tiêu chung thực sự.",
    descriptionEn: "Independent work, information sharing is primary, no real shared goal yet.",
    detailedDescriptionVi: "Các thành viên chủ yếu làm việc độc lập. Họ tụ họp cốt chỉ để trao đổi thông tin thô, báo cáo tiến độ cơ học và phân rã các nhiệm vụ riêng rẽ chứ không trực tiếp chia sẻ mục tiêu chiến lược hay cùng nỗ lực ra quyết định chung. Trách nhiệm cá nhân được tôn trọng cao nhưng trách nhiệm đồng cam cộng khổ của tập thể thì mờ nhạt.",
    detailedDescriptionEn: "Members mostly operate in silos. They gather primarily for mechanical status updates and raw information transfers rather than pursuing a cohesive joint mission or making direct collaborative decisions. Individual accountability stands strong, but mutual or collective ownership is virtually absent."
  },
  B: {
    titleVi: "Pseudo-team (Nhóm giả hiệu)",
    titleEn: "Pseudo-team",
    max: 20,
    descriptionVi: "Hiệu quả thấp nhất. Tránh né xung đột, bằng mặt không bằng lòng, thiếu trách nhiệm.",
    descriptionEn: "Lowest effectiveness. Avoids conflict, artificial harmony, low mutual accountability.",
    detailedDescriptionVi: "Đây là giai đoạn có hiệu năng vận hành thấp nhất trên thực tế. Mặc dù mang danh nghĩa là một đội, các thành viên thường chọn cơ chế phòng thủ 'Bằng mặt không bằng lòng' (Artificial Harmony), ngại va chạm hay thảo luận mở, dẫn đến các quyết định trọng yếu bộc lộ sức ì lớn. Sự nghi kỵ ngầm và việc đùn đẩy trách nhiệm dễ bùng phát khi gặp thử thách áp lực.",
    detailedDescriptionEn: "This is practically the lowest-performing phase. Despite being structured as a team, members adopt defensive behaviors known as 'artificial harmony,' avoiding constructive friction or raw feedback. This creates heavy sluggishness in critical decisions, turning trust into defensive skepticism under pressure."
  },
  C: {
    titleVi: "Potential team (Nhóm tiềm năng)",
    titleEn: "Potential team",
    max: 20,
    descriptionVi: "Đang nỗ lực kết nối, bắt đầu có quy trình nhưng còn mong manh trước áp lực.",
    descriptionEn: "Connecting efforts, starting to have processes but fragile under pressure.",
    detailedDescriptionVi: "Nhóm đang có những dấu hiệu chuyển mình tích cực để hướng tới một mục tiêu chung và bắt đầu kiến tạo các quy tắc, chuẩn mực hoạt động của riêng mình. Tuy nhiên các thỏa ước này vẫn còn non nớt và dễ dàng bị bẻ gãy, tụt lùi về cách làm việc biệt lập (Solo) khi đứng trước áp lực chỉ tiêu hay những khủng hoảng đột xuất bên ngoài.",
    detailedDescriptionEn: "The team is exhibiting encouraging transitions toward a unified direction, beginning to codify and establish common operational agreements. However, these collective linkages remain fragile and easily fracture under peak stress or market crises, regressing members back to independent survival behaviors."
  },
  D: {
    titleVi: "Real team (Nhóm thực)",
    titleEn: "Real team",
    max: 20,
    descriptionVi: "Tin tương nhau, có mục tiêu chung, kỹ năng bổ trợ và cùng chịu trách nhiệm.",
    descriptionEn: "Deep mutual trust, shared goals, complementary skills, and mutual accountability.",
    detailedDescriptionVi: "Đây là đỉnh cao của sự phối hợp chuyên nghiệp bền vững. Một mục tiêu chung sâu sắc được thấu hiểu một cách trọn vẹn, được định dạng rõ nét qua các KPI phối hợp hành động. Các thành viên có tính bổ trợ cao về kỹ năng, liên kết chặt chẽ bởi niềm tin sâu sắc, cởi mở đón nhận mâu thuẫn chuyên môn và sẵn sàng nhắc nhở ngang hàng tự giác.",
    detailedDescriptionEn: "A highly professional and stable peak. A clear compelling goal is shared and deeply internalized across all stakeholders, tracked with collective KPIs. Colleagues have highly complementary skills, are anchored by robust interpersonal safety, debate technical problems openly, and enforce peer accountability proactively."
  },
  E: {
    titleVi: "High Performance Team (Nhóm Hiệu suất cao)",
    titleEn: "High Performance Team",
    max: 25,
    descriptionVi: "Gắn kết sâu sắc, tự chủ cao, liên tục cải tiến và vượt kỳ vọng.",
    descriptionEn: "Deeply bonded, highly autonomous, continuous improvement, and exceeding expectations.",
    detailedDescriptionVi: "Đây là đỉnh cao tinh hoa lý tưởng của sự hợp tác vượt bậc. Đội nhóm vận hành như một tế bào hay một thực thể sinh học tự tiến hóa, tự chủ hoàn toàn mà không cần mệnh lệnh hành chính. Họ gắn kết hữu cơ ở mức độ cao về cảm xúc, liên tục thực hiện Retrospectives sâu sắc, thách thức mọi giới hạn chỉ tiêu quy trình truyền thống.",
    detailedDescriptionEn: "The absolute pinnacle of high-performing synergy. The team operates as a self-correcting neural network, exhibiting autonomous evolution without needing top-down bureaucratic control. Deep personal care and shared conviction fuel intense continuous retrospectives, constantly exceeding conventional bank performance targets."
  }
};

export default function TeamStageSurvey({ onBack, isEnglish = false }: TeamStageSurveyProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scores, setScores] = useState<number[]>(Array(20).fill(0));
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  
  // Custom Action Plan items added by user at results screen
  const [customActions, setCustomActions] = useState<string[]>([]);
  const [newActionInput, setNewActionInput] = useState('');

  // Start the survey
  const handleStart = () => {
    setIsStarted(true);
    setCurrentIdx(0);
    setScores(Array(20).fill(0));
    setIsFinished(false);
  };

  // Select score for current question
  const handleSelectScore = (scoreValue: number) => {
    const updated = [...scores];
    updated[currentIdx] = scoreValue;
    setScores(updated);

    if (currentIdx < QUESTIONS_DATA.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setIsFinished(true);
    }
  };

  // Jump back to previous question
  const handlePrevQuestion = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  // Reset/Retake survey
  const handleReset = () => {
    setCurrentIdx(0);
    setScores(Array(20).fill(0));
    setIsFinished(false);
    setIsStarted(false);
    setCustomActions([]);
  };

  // Quick fill with clean answers for instant preview (convenient for demonstrations)
  const handleQuickDemoFill = (level: 'pseudo' | 'potential' | 'real' | 'high_perf') => {
    let demoScores = Array(20).fill(3);
    if (level === 'pseudo') {
      // High scores in B questions, low in others
      demoScores = QUESTIONS_DATA.map(q => {
        if (q.category === 'B' || q.category === 'BC') return 5;
        if (q.category === 'A') return 4;
        return 1 + Math.floor(Math.random() * 2);
      });
    } else if (level === 'potential') {
      demoScores = QUESTIONS_DATA.map(q => {
        if (q.category === 'C' || q.category === 'BC') return 4;
        if (q.category === 'B') return 2;
        return 3;
      });
    } else if (level === 'real') {
      demoScores = QUESTIONS_DATA.map(q => {
        if (q.category === 'D') return 5;
        if (q.category === 'C') return 4;
        if (q.category === 'B' || q.category === 'A') return 2;
        return 3;
      });
    } else {
      demoScores = QUESTIONS_DATA.map(q => {
        if (q.category === 'E') return 5;
        if (q.category === 'D') return 4;
        return 2;
      });
    }
    setScores(demoScores);
    setIsStarted(true);
    setIsFinished(true);
  };

  // Calculate scores per Group
  // A: C1 + C11 + C14 + C3
  const scoreGroupA = scores[0] + scores[10] + scores[13] + scores[2];
  // B: C2 + C9 + C4 + C7
  const scoreGroupB = scores[1] + scores[8] + scores[3] + scores[6];
  // C: C5 + C8 + C12 + C4  (C4 is BC, counts for both)
  const scoreGroupC = scores[4] + scores[7] + scores[11] + scores[3];
  // D: C6 + C15 + C16 + C18
  const scoreGroupD = scores[5] + scores[14] + scores[15] + scores[17];
  // E: C10 + C13 + C17 + C19 + C20
  const scoreGroupE = scores[9] + scores[12] + scores[16] + scores[18] + scores[19];

  // Convert to percent weights for dominant group comparison
  const pctA = (scoreGroupA / 20) * 100;
  const pctB = (scoreGroupB / 20) * 100;
  const pctC = (scoreGroupC / 20) * 100;
  const pctD = (scoreGroupD / 20) * 100;
  const pctE = (scoreGroupE / 25) * 100;

  // Determine dominant stage
  const groupScores = [
    { key: 'A', pct: pctA, score: scoreGroupA, max: 20, meta: GROUPS_META.A },
    { key: 'B', pct: pctB, score: scoreGroupB, max: 20, meta: GROUPS_META.B },
    { key: 'C', pct: pctC, score: scoreGroupC, max: 20, meta: GROUPS_META.C },
    { key: 'D', pct: pctD, score: scoreGroupD, max: 20, meta: GROUPS_META.D },
    { key: 'E', pct: pctE, score: scoreGroupE, max: 25, meta: GROUPS_META.E },
  ];

  const dominant = [...groupScores].sort((x, y) => y.pct - x.pct)[0];

  // Evaluate maturity level footprint inside dominant stage
  const getFootprintIntensity = (domKey: string, score: number) => {
    const isGrpE = domKey === 'E';
    const weakLimit = isGrpE ? 12 : 10;
    const stableLimit = isGrpE ? 18 : 15;

    if (score < weakLimit) {
      return {
        statusVi: "Đặc tính còn rất yếu",
        statusEn: "Weak presence",
        color: "text-red-500 bg-red-500/10 border-red-500/20",
        messageVi: "Đội ngũ hầu như chưa chạm tới các đặc trưng hành vi của giai đoạn này.",
        messageEn: "The team barely exhibits behavior patterns of this development stage."
      };
    } else if (score < stableLimit) {
      return {
        statusVi: "Đầy hứa hẹn nhưng chưa ổn định",
        statusEn: "Emerging but unstable",
        color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
        messageVi: "Có dấu hiệu nhen nhóm của giai đoạn này nhưng còn lung lay mạnh khi chịu áp lực.",
        messageEn: "Signs of this stage are present, but remain highly fragile under operational stress."
      };
    } else {
      return {
        statusVi: "Đặc tính nổi trội thực thụ",
        statusEn: "Strongly established",
        color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
        messageVi: "Đặc tính nổi trội xuất sắc. Đội của bạn đang vận hành thực thụ và bền vững ở giai đoạn này.",
        messageEn: "Highly prominent. Your team is securely operating within this mature milestone."
      };
    }
  };

  const intensity = getFootprintIntensity(dominant.key, dominant.score);

  // Customized explanation of "WHY" (Giải thích tại sao) based on actual question patterns
  const getPersonalizedWhy = (domKey: string, lang: boolean) => {
    if (lang) {
      switch (domKey) {
        case 'A':
          return [
            "Your team scores high in siloed features such as individual reward focus (Q11) and isolated decision-making patterns (Q1).",
            "This clarifies why work remains segmented: discussions function as info-transfers rather than deep cooperative actions.",
            "There is a core shortage of a shared compelling vision, pushing teammates to prioritize individual safety over joint success."
          ];
        case 'B':
          return [
            "High scores in defensive loops such as artificial agreement to flee friction (Q2), delayed major choices due to debate fears (Q9), and leaving performance slips directless (Q7).",
            "This produces a passive 'artificial harmony' culture where trust is minimal and fear of being blamed blocks creative transparency.",
            "Teammates regress rapidly to lone-wolf survival mode (Q4) because psychological safety is not structurally supported."
          ];
        case 'C':
          return [
            "You registered promising points in constructive behaviors like admitting errors (Q5), aligning to core operating rules (Q8), and displaying basic trust (Q12).",
            "However, the high vulnerability score under stress (Q4) indicates that the cooperative linkages are still newly-formed and fragile.",
            "When severe target pressures or surprise changes land, the lack of fully cross-trained backups forces work back into separate silos."
          ];
        case 'D':
          return [
            "Strong scores in key structural foundations including clear joint goals (Q6), high-quality focused meetings (Q15), professional analytical debates (Q16), and peer reminder peer-feedback actions (Q18).",
            "This reflects a highly professional banking squad where mutual accountability is standard and feedback is valued without causing personal offense.",
            "Cohesion is mature, enabling swift collaborative decisions with minimum bureaucratic delays."
          ];
        case 'E':
        default:
          return [
            "Excellent scores in high-level self-evolving behaviors, notably proactive retrospectives (Q10), continuous self-directed improvements (Q13), dynamic swift adaptations (Q17), and outstanding business outputs (Q19).",
            "The squad functions as a self-correcting neural network. Cohesion is intuitive, allowing colleagues to back each other up without hierarchy prompts.",
            "Psychological safety has peaked, establishing a highly fertile sandbox for sustained service innovations."
          ];
      }
    } else {
      switch (domKey) {
        case 'A':
          return [
            "Đội nhóm ghi nhận điểm số cao ở những hành vi mang tính biệt lập như tập trung thưởng cá nhân (Câu 11), trao đổi thông tin thuần túy mà ít cùng ra quyết định (Câu 1).",
            "Điều này làm sáng tỏ tại sao ranh giới nhiệm vụ của từng người quá rạch ròi, thiếu tính liên thông hữu cơ. Các buổi gặp gỡ chủ yếu để cập nhật sự vụ tương tác thay vì xử lý nút thắt cho nhau.",
            "Nhóm đang thiếu một 'Chất keo dính' mục tiêu chung đủ thuyết phục, dẫn tới việc ai cũng ưu tiên tối đa bảo vệ hiệu suất riêng lẻ của mình."
          ];
        case 'B':
          return [
            "Điểm số cực kỳ nổi trội ở các cơ chế phòng thủ thụ động: đồng ý giả vờ để tránh va chạm chuyên môn (Câu 2), hoãn quyết định nghiệp vụ vì ngại tranh cãi (Câu 9), và không dám nhắc nhở thẳng thắn khi đồng đội trễ việc (Câu 7).",
            "Hệ quả trực tiếp là tạo sinh ra trạng thái 'bằng mặt không bằng lòng' (Artificial Harmony). Mọi người e ngại sự mâu thuẫn chuyên môn vì nhầm lẫn nó với công kích cá nhân.",
            "Môi trường thiếu hụt sự 'An toàn tâm lý' cơ bản khiến các thành viên chọn giải pháp co cụm bảo vệ bản thân, thu mình lại làm việc đơn độc khi sóng gió xuất hiện (Câu 4)."
          ];
        case 'C':
          return [
            "Khảo sát ghi nhận những nỗ lực tuyệt vời của nhóm như sẵn sàng nhận sai sót để sửa đổi (Câu 5), có ý thức thảo bản hành vi chuẩn (Câu 8) và niềm tin đồng thuận (Câu 12).",
            "Mặc dù vậy, điểm số dễ bị đẩy lùi trở lại của Câu 4 chứng minh 'Trục liên kết phối hợp' vẫn còn rất non nớt. Khi đối diện áp lực thặng dư chỉ tiêu hoặc phát sinh khủng hoảng lớn, nhóm dễ rơi rụng tính kỷ luật chung.",
            "Nguyên nhân là do các quy chế phối trợ chưa được lập đi lập lại đủ lâu để trở thành thói quen vô thức của các mắt xích."
          ];
        case 'D':
          return [
            "Sức mạnh cộng tác chuẩn mực được thiết lập xuất sắc dựa trên nền móng: KPI đo lường phối hợp rõ ràng (Câu 6), cấu trúc cuộc họp chặt chẽ mục tiêu (Câu 15), cởi mở phân định mâu thuẫn kỹ thuật (Câu 16) và cơ chế nhắc nhở ngang hàng tự giác (Câu 18).",
            "Đây là điểm tựa vàng của một đội ngũ ngân hàng trưởng thành. Thành viên coi việc đóng góp phản hồi thẳng thắn là trách nhiệm giúp đỡ đồng hành chứ không phải soi mói lỗi sai.",
            "Niềm tin sâu sắc giúp gạt bỏ mọi sự nghi kỵ trung gian, đẩy tốc độ xử lý tác nghiệp lên mức tối ưu."
          ];
        case 'E':
        default:
          return [
            "Đội nhóm đã vươn tầm tới trạng thái cộng tác tinh hoa lý tưởng qua các hành động: tự chủ retrospective sửa đổi nhanh (Câu 10), pro-active đề xuất cải cách nghiệp vụ (Câu 13), linh hoạt thích ứng thay đổi cấu trúc bên ngoài (Câu 17) và liên tục gặt hái kết quả kinh doanh vượt mong đợi (Câu 19).",
            "Mọi hoạt động tương trợ và phối hợp đồng đội diễn ra tự nhiên như một phản xạ tự động không cần sếp răn đe hành chính. Cảm hứng học hỏi liên tục và thử nghiệm lỗi được chào đón (Câu 20).",
            "Đội ngũ vận hành như một thực thể tự tiến hóa độc lập hoàn toàn, giải phóng hoàn toàn sức ép quản trị cho lãnh đạo."
          ];
      }
    }
  };

  const whyPoints = getPersonalizedWhy(dominant.key, isEnglish);

  // Personalized Roadmap Action items
  const getRoadmapPoints = (domKey: string, lang: boolean) => {
    if (lang) {
      switch (domKey) {
        case 'A':
          return [
            "Define a singular, concrete 'Mini Squad Goal' that requires absolute pair-work to complete.",
            "Align simple collaborative metrics where at least 15% of reward relies on team outcomes.",
            "Introduce a 10-minute weekly operational sync focused solely on bottleneck clearing."
          ];
        case 'B':
          return [
            "Organize an open 'Dialogue Cleanse' meeting to surface current operational frustrations safely.",
            "Draft simple rules of engagement of constructive debates using the 'Lencioni Conflict Framework.'",
            "Enable direct, kind peer-feedback channels without passing through department managers."
          ];
        case 'C':
          return [
            "Implement standard 15-minute Agile Daily Standups to systematically identify blocker items.",
            "Develop a cross-training matrix so that at least two people can operate any critical task.",
            "Explicitly define fallback procedures under peak workload stress to prevent solo regressing."
          ];
        case 'D':
          return [
            "Delegate high-level operational decision rights directly to peer pairings to foster deeper autonomy.",
            "Establish continuous psychological safety audits or anonymous retrospect check-ins.",
            "Leverage personal behavioral styles (DISC) to map advanced cross-functional project pairings."
          ];
        case 'E':
        default:
          return [
            "Position this team as a benchmark case study, hosting peer mentoring for struggling sections.",
            "Introduce strategic continuous process re-engineering using advanced heuristics like SCAMPER.",
            "Formulate strong burnout prevention parameters and plan rotational leadership challenges."
          ];
      }
    } else {
      switch (domKey) {
        case 'A':
          return [
            "Thiết lập ngay 01 mục tiêu chung siêu nhỏ, ngắn hạn bắt buộc các mảnh ghép phải ghép đôi phối hợp, tương trợ lẫn nhau.",
            "Giao thử nghiệm chỉ tiêu liên doanh nơi ít nhất 15% quyền lợi gắn với kết quả vượt hạn mức phòng.",
            "Giải thích rõ vai trò tương sinh tương khắc giữa các phong cách DISC để giảm thiểu dị biệt cá nhân."
          ];
        case 'B':
          return [
            "Tổ chức chuyên đề thảo luận mở 'Đối thoại Thẳng thắn' giúp giải phóng những rào cản thụ động tích tụ.",
            "Ban hành khung 'Quy ước Tranh luận Lành mạnh' nhằm phân tách trệt để mâu thuẫn chuyên môn và hiềm khích cá nhân.",
            "Áp dụng nguyên tắc 'Phản hồi Trực tiếp' hai chiều văn minh, loại bỏ việc méo mó thông tin thông qua sếp trung gian."
          ];
        case 'C':
          return [
            "Thiết lập kỷ luật nhịp họp Agile Daily Standup 15 phút đầu tuần để giải quyết nóng các rào cản tức thời.",
            "Vẽ sơ đồ Kỹ năng Đào tạo Chéo (Cross-training Matrix) đảm bảo mọi nghiệp vụ quan trọng luôn có ít nhất 2 nhân lực sẵn sàng hỗ trợ thay thế nhau.",
            "Xây dựng kịch bản ứng phó khẩn cấp khi chịu áp lực (Overload Guide) để ngăn chặn việc thành viên tự động rơi rụng về làm việc riêng lẻ."
          ];
        case 'D':
          return [
            "Ủy quyền tự quyết hoàn toàn các nghiệp vụ vừa và nhỏ cho các nhóm dự án tự phối hợp thúc đẩy.",
            "Xây dựng hoạt động Retrospective (Đánh giá rút kinh nghiệm) định kỳ hàng tuần để liên tục mài giũa quy trình.",
            "Sử dụng bản đồ DISC nâng cao để ghép cặp các phong cách bổ trợ nhau cho các chiến dịch đánh chiếm thị trường phức tạp."
          ];
        case 'E':
        default:
          return [
            "Đóng vai trò 'Đội ngũ Huấn luyện viên' chia sẻ bài học thực chiến hỗ trợ nghiệp vụ cho các chi nhánh/phòng ban khác.",
            "Ứng dụng bộ câu hỏi tư duy SCAMPER tối ưu hóa quy trình giúp tinh gọn vĩnh viễn các điểm nghẽn nghiệp vụ lỗi.",
            "Xây dựng hành lang chống quá tải nhiệt huyết (Burn-out Protection) và thiết lập cơ chế luân phiên lãnh đạo thử thách."
          ];
      }
    }
  };

  const roadmapRecommendations = getRoadmapPoints(dominant.key, isEnglish);

  // Add a custom user-defined action
  const handleAddAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (newActionInput.trim()) {
      setCustomActions([...customActions, newActionInput.trim()]);
      setNewActionInput('');
    }
  };

  // Delete an action
  const handleRemoveAction = (index: number) => {
    setCustomActions(customActions.filter((_, idx) => idx !== index));
  };

  return (
    <div id="team-stage-survey-container" className="bg-slate-950 text-slate-100 min-h-screen p-4 sm:p-8 font-sans transition-all duration-300">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-900 pb-6">
          <div className="space-y-1">
            <button
              id="team-survey-back-btn"
              onClick={onBack}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-teal-400 transition-colors uppercase font-mono tracking-wider cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {isEnglish ? 'Back to Dashboard' : 'Quay lại Bàn làm việc'}
            </button>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight uppercase bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
              {isEnglish ? 'TEAM DEVELOPMENT SURVEY' : 'BẢNG CHẨN ĐOÁN 5 GIAI ĐOẠN ĐỘI NGŨ'}
            </h1>
            <p className="text-xs text-slate-500 font-mono">
              {isEnglish 
                ? 'COMPREHENSIVE MATURITY INDEX ASSESSMENT v2.5' 
                : 'HỆ THỐNG ĐÁNH GIÁ CHẨN TRỊ MỨC ĐỘ TRƯỞNG THÀNH v2.5'}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 p-2 rounded-xl border border-slate-800 self-stretch sm:self-auto justify-center">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span className="text-[10px] font-mono text-slate-400 tracking-wider">
              {isEnglish ? 'DYNAMIC AUDIT ACTIVE' : 'CHẾ ĐỘ CHẨN ĐOÁN TỰ ĐỘNG'}
            </span>
          </div>
        </div>

        {/* --- SCREEN 1: WELCOME & DEMO PRESETS --- */}
        {!isStarted && !isFinished && (
          <div id="survey-welcome-screen" className="bg-slate-900/40 rounded-3xl border border-slate-800 p-6 sm:p-10 text-left space-y-8 relative overflow-hidden backdrop-blur-md">
            {/* Ambient decoration */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 bg-teal-950/40 border border-teal-500/20 px-3 py-1 rounded-full text-[10px] font-mono text-teal-400 font-bold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
                {isEnglish ? 'FOUNDATION METHODOLOGY' : 'NỀN TẢNG PHƯƠNG PHÁP LUẬN'}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase">
                {isEnglish 
                  ? 'Identify Your Team\'s Evolution Milestone' 
                  : 'Xác định Cột mốc Tiến hóa của Đội nhóm'}
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">
                {isEnglish ? (
                  <>
                    Based on the <strong>Katzenbach & Smith</strong> High-Performance Team framework. This 20-question diagnosis maps your organization across 5 evolutionary steps (Working Group, Pseudo-team, Potential Team, Real Team, High-Performance Team). Assess your current behaviors honestly to compile an accurate developmental action roadmap.
                  </>
                ) : (
                  <>
                    Dựa vào học thuyết kinh điển của <strong>Katzenbach & Smith</strong> về đường cong phát triển nhóm hiệu năng cao. Hệ thống khảo sát gồm <strong>20 câu hỏi trọng tâm</strong> giúp bóc tách chính xác trạng thái hiện tại của chi nhánh / phòng ban bạn đang thuộc nấc thang nào, qua đó biên soạn lộ trình cải cách thực chiến.
                  </>
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950/50 p-6 rounded-2xl border border-slate-800/60 font-mono text-xs text-slate-400">
              <div className="space-y-2">
                <span className="text-teal-400 font-bold uppercase">{isEnglish ? 'Survey Rules' : 'Quy tắc khảo sát'}</span>
                <ul className="space-y-1 text-slate-400">
                  <li>• {isEnglish ? '20 Questions rated on a 1★ to 5★ scale.' : '20 Câu hỏi lựa chọn mức phù hợp từ 1★ đến 5★.'}</li>
                  <li>• {isEnglish ? 'No wrong answers, assess based on current honest realities.' : 'Không có câu đúng/sai, chấm điểm dựa trên thực tế vận hành.'}</li>
                  <li>• {isEnglish ? 'Requires about 5 minutes to complete carefully.' : 'Mất khoảng 5 phút để hoàn thành thấu đáo.'}</li>
                </ul>
              </div>
              <div className="space-y-2">
                <span className="text-indigo-400 font-bold uppercase">{isEnglish ? 'Grading Categories' : 'Thang điểm phân bổ'}</span>
                <ul className="space-y-1 text-slate-400">
                  <li>• {isEnglish ? 'Working Group: C1, Q11, Q14, Q3 (Max 20)' : 'Working Group (Nhóm làm việc): C1, C11, C14, C3 (Tối đa 20đ)'}</li>
                  <li>• {isEnglish ? 'Pseudo-team: C2, Q9, Q4, Q7 (Max 20)' : 'Pseudo-team (Nhóm giả hiệu): C2, C9, C4, C7 (Tối đa 20đ)'}</li>
                  <li>• {isEnglish ? 'Potential team: C5, Q8, Q12, Q4 (Max 20)' : 'Potential team (Nhóm tiềm năng): C5, C8, C12, C4 (Tối đa 20đ)'}</li>
                  <li>• {isEnglish ? 'Real team: C6, Q15, Q16, Q18 (Max 20)' : 'Real team (Nhóm thực): C6, C15, C16, C18 (Tối đa 20đ)'}</li>
                  <li>• {isEnglish ? 'High Performance Team: C10, Q13, Q17, Q19, Q20 (Max 25)' : 'High Performance Team (Nhóm Hiệu suất cao): C10, C13, C17, C19, C20 (Tối đa 25đ)'}</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center pt-4 border-t border-slate-900">
              <button
                id="survey-start-btn"
                onClick={handleStart}
                className="px-8 py-4 bg-teal-400 text-slate-950 hover:bg-teal-300 font-black tracking-wide rounded-xl shadow-lg hover:shadow-teal-450/10 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm uppercase"
              >
                <Play className="w-4 h-4 fill-current" />
                {isEnglish ? 'Begin Diagnosis' : 'Khởi động Chẩn đoán'}
              </button>

              {/* Demo presets to easily check screens */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono text-center sm:text-left">
                  {isEnglish ? '⚡ Quick Presets (Demo Try)' : '⚡ Trực quan hoá nhanh (Dùng Thử)'}
                </span>
                <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
                  <button onClick={() => handleQuickDemoFill('pseudo')} className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-[10px] text-slate-400 rounded-md transition-colors cursor-pointer capitalize">Pseudo</button>
                  <button onClick={() => handleQuickDemoFill('potential')} className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-[10px] text-slate-400 rounded-md transition-colors cursor-pointer capitalize">Potential</button>
                  <button onClick={() => handleQuickDemoFill('real')} className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-[10px] text-slate-400 rounded-md transition-colors cursor-pointer capitalize">Real Team</button>
                  <button onClick={() => handleQuickDemoFill('high_perf')} className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-[10px] text-teal-400/80 rounded-md transition-colors cursor-pointer capitalize">High Perf</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- SCREEN 2: ACTIVE SURVEY STEPPER --- */}
        {isStarted && !isFinished && (
          <div id="survey-active-stepper" className="bg-slate-900/40 rounded-3xl border border-slate-800 p-6 sm:p-10 text-left space-y-6 relative overflow-hidden backdrop-blur-md">
            
            {/* Progress Top Bar */}
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-teal-400 font-bold bg-teal-950/30 px-2.5 py-1 rounded border border-teal-800/45 uppercase tracking-wider">
                {isEnglish ? 'CRITERION' : 'TIÊU CHÍ'} {currentIdx + 1} / {QUESTIONS_DATA.length}
              </span>
              <span className="text-slate-500 font-bold">
                {isEnglish ? 'COMPLETION' : 'ĐỘ HOÀN THÀNH'}: {Math.round(((currentIdx) / QUESTIONS_DATA.length) * 100)}%
              </span>
            </div>

            {/* Glowing progress line */}
            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800 shadow-inner">
              <div 
                className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / QUESTIONS_DATA.length) * 100}%` }}
              />
            </div>

            {/* Statement Container */}
            <div className="space-y-4 py-6">
              <span className="block text-[10px] font-mono text-slate-500 tracking-widest uppercase">
                {isEnglish ? 'QUESTION STATEMENT' : 'NỘI DUNG CÂU KHẢO SÁT'}
              </span>
              <h2 className="text-lg sm:text-2xl font-extrabold text-white leading-relaxed tracking-tight min-h-[70px]">
                {isEnglish ? QUESTIONS_DATA[currentIdx].statementEn : QUESTIONS_DATA[currentIdx].statementVi}
              </h2>
            </div>

            {/* Rating Scaler Buttons */}
            <div className="space-y-4">
              <span className="block text-[10px] font-mono text-slate-500 tracking-widest uppercase mb-1">
                {isEnglish ? 'SELECT YOUR TEAM CONFORMITY LEVEL' : 'CHỌN MỨC ĐỘ PHÙ HỢP VỚI THỰC TẾ ĐỘI CỦA BẠN'}
              </span>

              <div className="grid grid-cols-1 gap-3">
                {[
                  { val: 1, textVi: "1 - Hoàn toàn không đúng", textEn: "1 - Strongly Disagree" },
                  { val: 2, textVi: "2 - Ít khi đúng", textEn: "2 - Rarely True" },
                  { val: 3, textVi: "3 - Đúng một phần / Trung bình", textEn: "3 - Somewhat True / Neutral" },
                  { val: 4, textVi: "4 - Thường xuyên đúng", textEn: "4 - Frequently True" },
                  { val: 5, textVi: "5 - Hoàn toàn đúng", textEn: "5 - Totally True" }
                ].map((rating, rIdx) => (
                  <button
                    id={`rating-btn-${rating.val}`}
                    key={rIdx}
                    onClick={() => handleSelectScore(rating.val)}
                    className="w-full text-left p-4 rounded-xl border border-slate-800 bg-slate-950/30 hover:bg-slate-900 hover:border-teal-400/40 hover:text-white transition-all cursor-pointer group flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      {/* Interactive glowing rating indicator */}
                      <span className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 font-mono text-sm flex items-center justify-center font-bold group-hover:bg-teal-400 group-hover:text-slate-950 group-hover:border-teal-400 transition-all shrink-0">
                        {rating.val}★
                      </span>
                      <span className="text-sm sm:text-base text-slate-300 group-hover:text-white leading-relaxed font-normal transition-colors">
                        {isEnglish ? rating.textEn : rating.textVi}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-teal-400 transition-colors shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Stepper Navigation Footer */}
            <div className="flex justify-between items-center pt-6 border-t border-slate-900 mt-4">
              <button
                id="survey-prev-btn"
                disabled={currentIdx === 0}
                onClick={handlePrevQuestion}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono tracking-wider uppercase transition-colors ${
                  currentIdx === 0 
                  ? 'text-slate-700 cursor-not-allowed opacity-40' 
                  : 'text-slate-400 hover:text-white bg-slate-950/30 border border-slate-850 cursor-pointer'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                {isEnglish ? 'Previous Question' : 'Câu trước'}
              </button>

              <button
                id="survey-abort-btn"
                onClick={handleReset}
                className="text-slate-500 hover:text-red-400 text-xs font-mono tracking-wider uppercase transition-colors cursor-pointer"
              >
                {isEnglish ? 'Abort Survey' : 'Huỷ Khảo Sát'}
              </button>
            </div>
          </div>
        )}

        {/* --- SCREEN 3: EXHAUSTIVE DIAGNOSIS REPORTS --- */}
        {isFinished && (
          <div id="survey-results-screen" className="space-y-8 animate-fade-in text-left">
            
            {/* Dominant Stage Hero Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-slate-950 border border-slate-800 p-6 sm:p-10 shadow-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
              {/* Sonar decorative animation */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20 pointer-events-none" />
              <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <span className="inline-flex items-center gap-1.5 bg-teal-950/90 px-3.5 py-1.5 rounded-full border border-teal-800/40 text-[10px] font-mono tracking-widest text-teal-400 font-bold uppercase shadow-lg">
                    <Trophy className="w-3.5 h-3.5 animate-bounce" />
                    {isEnglish ? 'PRIMARY EVOLUTION STAGE' : 'GIAI ĐOẠN CHIẾM ƯU THẾ'}
                  </span>
                  
                  {/* Target Score Widget */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 font-mono text-center">
                    <span className="block text-[8px] text-slate-500 uppercase tracking-widest font-bold">
                      {isEnglish ? 'NORMALIZED' : 'ĐIỂM NHÓM'}
                    </span>
                    <span className="text-sm font-extrabold text-teal-400">
                      {dominant.score} / {dominant.max}
                    </span>
                    <span className="text-[9px] text-slate-450 block font-normal">
                      ({Math.round(dominant.pct)}%)
                    </span>
                  </div>
                </div>

                <div className="space-y-3 text-left">
                  <h2 className="text-xl sm:text-3xl font-black text-white uppercase tracking-tight leading-tight">
                    {isEnglish ? dominant.meta.titleEn : dominant.meta.titleVi}
                  </h2>
                  <div className="space-y-3 max-w-2xl">
                    <p className="text-xs sm:text-sm text-slate-305 text-slate-400 font-normal leading-relaxed bg-slate-950/70 p-3.5 rounded-xl border border-slate-900">
                      <strong className="text-teal-400 select-none mr-1.5 font-bold uppercase text-[10px] font-mono tracking-wider block mb-1">
                        {isEnglish ? '✦ Summary' : '✦ Tóm tắt chung'}
                      </strong>
                      {isEnglish ? dominant.meta.descriptionEn : dominant.meta.descriptionVi}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-350 text-slate-300 font-normal leading-relaxed bg-slate-950/70 p-3.5 rounded-xl border border-slate-900">
                      <strong className="text-indigo-400 select-none mr-1.5 font-bold uppercase text-[10px] font-mono tracking-wider block mb-1">
                        {isEnglish ? '✦ Detailed Group Description' : '✦ Mô tả đặc tính nhóm chi tiết'}
                      </strong>
                      {isEnglish ? dominant.meta.detailedDescriptionEn : dominant.meta.detailedDescriptionVi}
                    </p>
                  </div>
                </div>

                {/* Footprint intensity badges */}
                <div className="pt-4 border-t border-slate-900/80 flex flex-col md:flex-row md:items-center gap-4">
                  <div className={`px-4 py-2 rounded-xl border font-mono text-xs font-bold leading-normal text-left inline-flex flex-col ${intensity.color}`}>
                    <span className="text-[9px] uppercase tracking-wider block opacity-70 mb-0.5">
                      {isEnglish ? 'Maturity presence:' : 'Mức độ hiện diện:'}
                    </span>
                    <span className="text-sm font-extrabold uppercase">{isEnglish ? intensity.statusEn : intensity.statusVi}</span>
                  </div>
                  <p className="text-xs text-slate-450 font-normal leading-relaxed text-slate-400">
                    {isEnglish ? intensity.messageEn : intensity.messageVi}
                  </p>
                </div>
              </div>
            </div>

            {/* Stage Comparison Radar Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Category Breakdown list (2/3 col on desktop) */}
              <div className="lg:col-span-2 bg-slate-900/30 rounded-2xl border border-slate-800 p-5 sm:p-6 space-y-6">
                <div>
                  <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                    <ArrowLeftRight className="w-4 h-4 text-teal-400" />
                    {isEnglish ? 'Full Team Evolutionary Footprint' : 'Bản đồ Phân cực 5 Cấp độ Phát triển'}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-mono mt-1">
                    {isEnglish 
                      ? 'COMPARES YOUR LEVEL OF COMPLIANCE WEIGHTS FOR ALL STAGES (%)' 
                      : 'SO SÁNH TỶ LỆ TRỌNG SỐ (%) GIỮA CÁC GIAI ĐOẠN TIẾN HOÁ CỦA ĐỘI'}
                  </p>
                </div>

                <div className="space-y-4">
                  {groupScores.map((g) => {
                    const isDominant = g.key === dominant.key;
                    return (
                      <div key={g.key} className={`space-y-2 p-3.5 rounded-xl border transition-all ${
                        isDominant 
                          ? 'bg-teal-950/10 border-teal-500/30 shadow-[0_4px_20px_rgba(45,212,191,0.03)]' 
                          : 'bg-slate-950/40 border-slate-850'
                      }`}>
                        <div className="flex justify-between items-center sm:items-start text-xs font-bold">
                          <div className="space-y-1 text-left">
                            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] uppercase font-mono ${
                              isDominant ? 'bg-teal-400 text-slate-950' : 'bg-slate-900 border border-slate-800 text-slate-400'
                            }`}>
                              CẤP DETECT {g.key}
                            </span>
                            <span className="block text-[11px] font-black uppercase text-slate-200 mt-1">
                              {isEnglish ? g.meta.titleEn : g.meta.titleVi}
                            </span>
                          </div>
                          <div className="text-right font-mono shrink-0">
                            <span className={`text-[13px] font-extrabold ${isDominant ? 'text-teal-405 text-teal-400' : 'text-slate-400'}`}>
                              {g.score} / {g.max} điểm
                            </span>
                            <span className="block text-[9px] text-slate-550 font-normal mt-0.5 uppercase tracking-widest text-slate-500">
                              Trọng số {Math.round(g.pct)}%
                            </span>
                          </div>
                        </div>

                        {/* Progress slider visually */}
                        <div className="w-full bg-slate-950 h-2 rounded-full border border-slate-850 overflow-hidden relative shadow-inner">
                          <div 
                            className={`h-full transition-all duration-300 ${
                              isDominant 
                                ? 'bg-gradient-to-r from-teal-500 to-emerald-400 animate-pulse' 
                                : 'bg-slate-800'
                            }`}
                            style={{ width: `${g.pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick statistics sidebar */}
              <div className="bg-slate-900/30 rounded-2xl border border-slate-800 p-5 sm:p-6 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                      {isEnglish ? 'SURVEY METRICS' : 'THÔNG SỐ CHẨN ĐOÁN'}
                    </h4>
                    <span className="h-0.5 w-8 bg-teal-400 block mt-2" />
                  </div>

                  <div className="space-y-4 font-mono text-xs leading-relaxed text-slate-400 text-left">
                    <div className="border-b border-slate-950 pb-2.5">
                      <span className="text-slate-500 block text-[9px] uppercase tracking-widest font-bold">Total Answered</span>
                      <span className="font-extrabold text-white text-sm">20 / 20 Questions</span>
                    </div>

                    <div className="border-b border-slate-950 pb-2.5">
                      <span className="text-slate-500 block text-[9px] uppercase tracking-widest font-bold">Sum Raw Score</span>
                      <span className="font-extrabold text-teal-400 text-sm">
                        {scoreGroupA + scoreGroupB + scoreGroupC + scoreGroupD + scoreGroupE} / 105
                      </span>
                    </div>

                    <div className="pb-2">
                      <span className="text-slate-500 block text-[9px] uppercase tracking-widest font-bold">Standard Formula</span>
                      <span className="text-[10px] text-slate-450 text-slate-550 italic leading-snug">
                        {isEnglish 
                          ? 'Analyzes peer behavior patterns vs systemic traps' 
                          : 'Đo lường tính gắn kết và tinh thần tương trợ đồng đội để đối trọng 5 rào cản Lencioni.'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950/80 p-3.5 rounded-xl border border-indigo-950 space-y-2">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-indigo-950  border border-indigo-500/20 text-[9px] text-indigo-400 font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-3 h-3" />
                    Chẩn đoán của Chuyên gia
                  </span>
                  <p className="text-[10px] text-slate-400 leading-relaxed font-normal">
                    {isEnglish 
                      ? 'This automated team staging uses normalized weighted categories. Proceed to design interventions below.' 
                      : 'Kết quả dựa trên tỷ lệ chuẩn hóa bù trừ thặng số. Hãy tiến hành xây dựng phương án cải thiện cụ thể bên dưới.'}
                  </p>
                </div>
              </div>
            </div>

            {/* --- CORE REQUEST: "GIẢI THÍCH TẠI SAO PHÂN VỊ" (WHY WE GOT THIS RESULT) --- */}
            <div className="bg-slate-900/30 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <HelpCircle className="w-5 h-5 text-indigo-400 shrink-0" />
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-normal">
                    {isEnglish ? 'Why is your team classified under this stage?' : 'Giải thích tại sao đội nhóm có kết quả này?'}
                  </h3>
                  <p className="text-slate-500 font-mono text-[10px] uppercase mt-0.5">
                    {isEnglish ? 'INDIVIDUALIZED SURVEY EXPLANATION BASED ON ACTION LOG' : 'CHẨN ĐOÁN CHI TIẾT TỪ PHẢN ỨNG TRẮC NGHIỆM THỰC TẾ'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                <div className="md:col-span-2 space-y-4">
                  {whyPoints.map((point, pIdx) => (
                    <div key={pIdx} className="bg-slate-950/40 p-4 rounded-xl border border-slate-850 flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-900 border border-slate-805 text-[11px] font-mono text-indigo-400 flex items-center justify-center font-bold shrink-0 mt-0.5">
                        0{pIdx + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-950/30 border border-indigo-500/10 rounded-xl p-5 space-y-4 text-xs font-normal">
                  <h4 className="font-bold text-indigo-400 uppercase tracking-wider font-mono">
                    {isEnglish ? 'Behavioral Metrics Log' : 'Nhận định từ chuyên gia'}
                  </h4>
                  <p className="text-slate-400 leading-relaxed font-normal">
                    {isEnglish 
                      ? "A team maturity level is never static. Under load pressure (Q4), teams usually regress one step unless collaborative agreements are codified." 
                      : "Sự phân cấp tiến hoá đội ngũ mang tính động. Khi đối thoại thẳng thắn không đi đôi với 'Sự an toàn tâm lý', tập thể có xu hướng co cụm, rút lui đột ngột về tư cách làm việc biệt lập."}
                  </p>
                  <p className="text-slate-450 text-slate-500 text-[11px]">
                    {isEnglish 
                      ? "*This diagnostics algorithm references Harvard Business Review and Lencioni organizational metrics." 
                      : "*Thuật toán chẩn đoán hiệu lực bốc dỡ của Lencioni, đã được Việt hoá tương thích hệ Ngân hàng."}
                  </p>
                </div>
              </div>
            </div>

            {/* --- CHUYÊN GIA ACTION PLAN SECTION --- */}
            <div className="bg-slate-900/30 rounded-2xl border border-slate-850 p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-teal-400 shrink-0 animate-pulse" />
                  <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-wide">
                    {isEnglish ? 'Expert Recommended Action Intervention' : 'Lộ trình can thiệp cải thiện (Chuyên gia khuyên dùng)'}
                  </h3>
                </div>
                <p className="text-slate-550 text-slate-500 font-mono text-[10px] uppercase">
                  {isEnglish 
                    ? '3 MANDATORY TACTICAL ACTIONS FOR THE NEXT 30 DAYS' 
                    : '3 HÀNH ĐỘNG CAN THIỆP GẤP TRONG VÒNG 30 NGÀY TỚI'}
                </p>
              </div>

              {/* Standard 3 Actions Card list */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {roadmapRecommendations.map((rec, rIdx) => (
                  <div key={rIdx} className="bg-slate-950/50 p-5 rounded-xl border border-slate-800 flex flex-col justify-between hover:border-teal-400/20 transition-colors">
                    <div className="space-y-2">
                      <span className="inline-block bg-teal-500/15 border border-teal-500/30 text-teal-400 px-2 py-0.5 font-mono text-[9px] font-bold rounded">
                        ACTION 0{rIdx + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-200 mt-2 font-semibold leading-relaxed">
                        {rec}
                      </p>
                    </div>
                    <span className="block text-[10px] font-mono text-slate-500 mt-4 text-right uppercase">
                      {isEnglish ? 'Priority: High' : 'Độ ưu tiên: Cao'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Interactive Tactical Action Plan Builder container */}
              <div className="border-t border-slate-900 pt-6 space-y-4">
                <div className="space-y-1">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-wider">
                    {isEnglish ? '✏️ Build Your Tactical Action Blueprint (Interactive Plan)' : '✏️ Thiết lập Kế hoạch hành động tuỳ chỉnh (Kế hoạch thực chiến)'}
                  </h4>
                  <p className="text-slate-500 text-[10.5px]">
                    {isEnglish 
                      ? 'Commit to specific actions for your team based on this survey outcome, then review or track them below.' 
                      : 'Lên cam kết hành động trực tiếp dựa trên kết quả khảo sát và theo dõi hoặc in ra để giao ban.'}
                  </p>
                </div>

                {/* Input Add Form */}
                <form onSubmit={handleAddAction} className="flex gap-2 w-full">
                  <input
                    type="text"
                    value={newActionInput}
                    onChange={(e) => setNewActionInput(e.target.value)}
                    placeholder={isEnglish ? "Add custom team action task (e.g., Introduce weekly feedback retro...)" : "Nhập hành động tuỳ chỉnh (Ví dụ: Quy chế hoá Daily Standup lúc 8h30...)"}
                    className="flex-1 px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    {isEnglish ? 'Commit Action' : 'Bổ sung'}
                  </button>
                </form>

                {/* Display Lists */}
                {customActions.length > 0 && (
                  <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-850 space-y-2 text-xs">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">
                      {isEnglish ? 'MY PERSONAL TEAM COMMITMENT LIST' : 'DANH SÁCH LỘ TRÌNH CAM KẾT CÁ NHÂN'}
                    </span>
                    <div className="space-y-1.5 pt-1.5">
                      {customActions.map((action, idx) => (
                        <div key={idx} className="flex items-center justify-between gap-3 p-2 bg-slate-900/50 rounded-lg border border-slate-850 hover:border-slate-800 transition-colors">
                          <div className="flex items-center gap-2">
                            <span className="p-0.5 rounded-full bg-indigo-950 border border-indigo-700 max-w-fit text-[9px] text-indigo-400">
                              <Check className="w-2.5 h-2.5" />
                            </span>
                            <span className="text-slate-350 leading-relaxed font-medium">{action}</span>
                          </div>
                          <button
                            onClick={() => handleRemoveAction(idx)}
                            className="p-1 rounded text-slate-600 hover:text-red-400 hover:bg-slate-950 transition-all cursor-pointer"
                            title="Xoá hành động này"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Final Action Footers */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4 border-t border-slate-900">
              <button
                id="survey-retake-btn"
                onClick={handleReset}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                <RefreshCw className="w-4 h-4 text-teal-400" />
                {isEnglish ? 'Retake Survey' : 'Thực hiện lại khảo sát'}
              </button>
              <button
                id="survey-quit-btn"
                onClick={onBack}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-teal-400/90 hover:bg-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg hover:shadow-teal-400/10"
              >
                {isEnglish ? 'Back to Workspace' : 'Quay lại Bàn làm việc'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
