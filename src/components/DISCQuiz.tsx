/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DISCQuestion, DISCType } from '../types';
import { ArrowLeft, RefreshCw, Layers, Award, ShieldAlert, Sparkles, MessageSquare } from 'lucide-react';

const DISC_QUESTIONS: DISCQuestion[] = [
  {
    id: 1,
    question: "Khi đối mặt với một chỉ tiêu kinh doanh mới (KPI) rất thách thức vào đầu quý, bạn thường:",
    options: [
      { text: "Lập tức hành động, tập trung vào số liệu đầu ra và tìm mọi cách vượt chỉ tiêu nhanh nhất.", type: 'D', explanation: "Tập trung vào kết quả, quyết đoán và chịu áp lực cao." },
      { text: "Tổ chức họp nhóm để truyền cảm hứng, cùng lên ý tưởng bán hàng sáng tạovà sôi nổi.", type: 'I', explanation: "Thúc đẩy tinh thần, kết nối và lan tỏa năng lượng tích cực." },
      { text: "Bàn bạc với đồng nghiệp, phân chia công việc công bằng để cả phòng cùng hoàn thành ổn định.", type: 'S', explanation: "Đề cao sự hòa hợp, đồng lòng và hỗ trợ lẫn nhau." },
      { text: "Nghiên cứu kỹ dữ liệu lịch sử, phân tích rủi ro và lập file Excel tính toán lộ trình chi tiết.", type: 'C', explanation: "Hành động dựa trên dữ liệu, cẩn trọng và chuẩn xác." }
    ]
  },
  {
    id: 2,
    question: "Trong một buổi họp tranh biện về giải pháp xử lý một hồ sơ tín dụng phức tạp, bạn sẽ:",
    options: [
      { text: "Đi thẳng vào vấn đề chính, đưa ra quyết định dứt khoát để tiết kiệm thời gian cho phòng.", type: 'D', explanation: "Thích sự ngắn gọn, trực diện và đi thẳng vào mục tiêu." },
      { text: "Kể một câu chuyện thực tế thú vị, lôi cuốn mọi người thảo luận cởi mở hơn.", type: 'I', explanation: "Dùng tầm ảnh hưởng cá nhân và ngôn từ linh hoạt để thuyết phục." },
      { text: "Lắng nghe tất cả các bên trước, cố gắng hòa giải mâu thuẫn để giữ không khí ôn hòa.", type: 'S', explanation: "Lắng nghe tích cực, tránh xung đột cá nhân tối đa." },
      { text: "Đưa ra các dẫn chứng luật, thông tư quy định cụ thể của ngân hàng để lập luận chặt chẽ.", type: 'C', explanation: "Tôn trọng quy trình, nguyên tắc và tính pháp lý." }
    ]
  },
  {
    id: 3,
    question: "Cách bạn giao tiếp hàng ngày qua email hoặc tin nhắn nội bộ thường là:",
    options: [
      { text: "Ngắn gọn, súc tích, thường dùng các câu mệnh lệnh hoặc gạch đầu dòng công việc cần làm ngay.", type: 'D', explanation: "Ưu tiên tốc độ và hiệu suất." },
      { text: "Thân thiện, nhiều cảm xúc, thường dùng các ký tự biểu cảm để tạo sự gần gũi.", type: 'I', explanation: "Tạo sự gắn kết và niềm vui trong giao tiếp." },
      { text: "Lịch sự, hỏi thăm sức khỏe/tình hình công việc trước khi nhờ vả hay trao đổi nhiệm vụ.", type: 'S', explanation: "Chu đáo, quan tâm tới trạng thái của người khác." },
      { text: "Đầy đủ chi tiết, dẫn nguồn tài liệu tham khảo rõ ràng, câu chữ chuẩn chỉnh về hình thức.", type: 'C', explanation: "Chính xác, đầy đủ thông tin để tránh hiểu lầm." }
    ]
  },
  {
    id: 4,
    question: "Khi có sự thay đổi đột ngột về quy trình nghiệp vụ từ Hội sở chính, phản ứng đầu tiên của bạn là:",
    options: [
      { text: "Nhanh chóng chấp nhận và thúc ép bản thân/đội nhóm thích ứng ngay để không giảm doanh số.", type: 'D', explanation: "Nhạy bén với cơ hội và không ngại thay đổi." },
      { text: "Hào hứng tìm kiếm xem quy trình mới có điểm gì thú vị để chia sẻ và động viên mọi người.", type: 'I', explanation: "Luôn tìm kiếm mặt tích cực trong sự đổi mới." },
      { text: "Hơi lo lắng do tính ổn định bị xáo trộn, cần thời gian để thích nghi từ từ cùng đồng đội.", type: 'S', explanation: "Ưu tiên tính ổn định và sự an toàn hệ thống." },
      { text: "Tìm đọc kỹ văn bản hướng dẫn gốc để so sánh điểm khác biệt chi tiết so với quy trình cũ.", type: 'C', explanation: "Đảm bảo tính tuân thủ tuyệt đối dưới góc nhìn phân tích chuyên sâu." }
    ]
  },
  {
    id: 5,
    question: "Bạn mong muốn nhận được sự ghi nhận hoặc khen thưởng theo cách nào nhất?",
    options: [
      { text: "Được trao quyền quyết định lớn hơn hoặc thăng chức nhờ kết quả doanh số thực tế vượt trội.", type: 'D', explanation: "Được tôn vinh năng lực dẫn đầu tự chủ." },
      { text: "Được vinh danh công khai trước toàn chi nhánh kèm theo tràng pháo tay nồng nhiệt của đồng nghiệp.", type: 'I', explanation: "Khao khát sự công nhận từ xã hội và tập thể." },
      { text: "Đơn giản là những lời cảm ơn chân thành, ấm áp từ sếp hoặc từ khách hàng mà bạn đã hỗ trợ hết lòng.", type: 'S', explanation: "Trân trọng mối quan hệ sâu sắc và lòng biết ơn chân thành." },
      { text: "Một đánh giá hiệu suất bằng số liệu khách quan, chuẩn xác với các chứng chỉ chuyên môn danh giá.", type: 'C', explanation: "Tôn trọng sự ghi nhận dựa trên năng lực và tiêu chuẩn kỹ thuật." }
    ]
  },
  {
    id: 6,
    question: "Khi làm việc nhóm trong một dự án chuyển đổi số của ngân hàng, vai trò tự nhiên của bạn là:",
    options: [
      { text: "Trưởng nhóm điều phối khối lượng việc, thúc giục tiến độ và đưa ra quyết định cuối cùng.", type: 'D', explanation: "Lãnh đạo hành động bẩm sinh." },
      { text: "Người khởi xướng ý tưởng, thuyết trình giải pháp thu hút người nghe và gắn kết các thành viên.", type: 'I', explanation: "Đồng tạo dựng văn hóa sáng tạo và gắn bó." },
      { text: "Người kiên nhẫn thực hiện nhiệm vụ được giao, hỗ trợ các thành viên khác khi họ quá tải.", type: 'S', explanation: "Hậu phương vững chắc, duy trì sự gắn kết nội bộ." },
      { text: "Người kiểm chứng dữ liệu, rà soát các lỗ hổng bảo mật và lập biên bản kiểm tra chi tiết lỗi.", type: 'C', explanation: "Người canh giữ chất lượng hệ thống." }
    ]
  },
  {
    id: 7,
    question: "Điều gì dễ khiến bạn cảm thấy căng thẳng (stress) nhất tại nơi làm việc?",
    options: [
      { text: "Sự thiếu dứt khoát, tiến độ trì trệ hoặc khi cảm thấy quyền tự quyết của mình bị hạn chế.", type: 'D', explanation: "Không chịu được sự mất kiểm soát và chậm trễ." },
      { text: "Làm việc một mình quá lâu trong văn phòng yên ắng hoặc bị từ chối/bỏ rơi trong các thảo luận.", type: 'I', explanation: "Sợ sự cô lập và không khí làm việc tẻ nhạt." },
      { text: "Môi trường nội bộ xảy ra xung đột gay gắt, đấu đá nội bộ không có sự đồng thuận chân thành.", type: 'S', explanation: "Sợ sự mất hòa khí và đứt gãy quan hệ." },
      { text: "Sự cẩu thả, thiếu chính xác về số liệu của đồng nghiệp hoặc làm việc không có quy trình rõ ràng.", type: 'C', explanation: "Sợ sai sót kỹ thuật và sự tùy tiện thiếu nguyên tắc." }
    ]
  },
  {
    id: 8,
    question: "Khi khách hàng VIP phản nàn gay gắt về một lỗi giao dịch của ngân hàng, bạn sẽ xử lý thế nào?",
    options: [
      { text: "Tập trung phân định nhanh trách nhiệm, đề xuất giải pháp đền bù trực tiếp để khách hàng nguôi giận lập tức.", type: 'D', explanation: "Giải quyết vấn đề nhanh chóng và quyết liệt." },
      { text: "Đồng cảm sâu sắc bằng giọng điệu truyền cảm, khéo léo dùng nghệ thuật trò chuyện xoa dịu tâm lý khách hàng.", type: 'I', explanation: "Khéo léo kết nối cảm xúc và nâng cao trải nghiệm khách hàng." },
      { text: "Kiên nhẫn lắng nghe toàn bộ bức xúc, bày tỏ lòng chân thành xin lỗi và hứa đồng hành xử lý đến cùng.", type: 'S', explanation: "Xây dựng sự tin cậy lâu dài bằng sự khiêm tốn chân thành." },
      { text: "Ghi chép chi tiết thời gian, mã giao dịch, tra cứu nhật ký hệ thống trước khi trả lời chính thức dựa trên quy chuẩn.", type: 'C', explanation: "Xử lý dựa trên bằng chứng kỹ thuật khách quan." }
    ]
  }
];

const DISC_QUESTIONS_EN: DISCQuestion[] = [
  {
    id: 1,
    question: "When facing a highly challenging new quarterly business target (KPI), you usually:",
    options: [
      { text: "Take action immediately, focus on output metrics, and find any way to beat targets fastest.", type: 'D', explanation: "Goal focused, decisive and works well under pressure." },
      { text: "Organize a team meeting to inspire creative sales ideas and trigger exciting energies.", type: 'I', explanation: "Motivating, highly interactive, and spreads optimistic energy." },
      { text: "Discuss with colleagues and share the workload fairly to ensure steady department success.", type: 'S', explanation: "Believes in harmony, mutual help and steady development." },
      { text: "Study historical data carefully, analyze risks, and map out a highly detailed Excel plan.", type: 'C', explanation: "Analytical, careful, precise and processes data closely." }
    ]
  },
  {
    id: 2,
    question: "In a debate meeting regarding an intricate credit appraisal process, you usually:",
    options: [
      { text: "Get straight to the core point and make a decisive ruling to save team time.", type: 'D', explanation: "Direct, time-saving, action-driven." },
      { text: "Tell an engaging real-life story to invite everyone to discuss more openly.", type: 'I', explanation: "Uses verbal skills and personal drive to influence." },
      { text: "Listen to all parties first, trying to reconcile conflicts to maintain a peaceful environment.", type: 'S', explanation: "Active listener, coordinates well and prevents clashes." },
      { text: "Present solid evidence, regulations, and bank decrees to build structured arguments.", type: 'C', explanation: "Respects rules, documentation, logic and compliance." }
    ]
  },
  {
    id: 3,
    question: "Your primary style for day-to-day email or Slack communication is usually:",
    options: [
      { text: "Short and precise, using bulleted action items or brief directives.", type: 'D', explanation: "Prioritizes speed, efficiency and directness." },
      { text: "Friendly and highly emotional, using emojis to build high collaborative warmth.", type: 'I', explanation: "Connects with warmth and brings joy to conversations." },
      { text: "Considerate and gentle, asking about health or workload before requesting assignments.", type: 'S', explanation: "Caring, empathetic, asks about feelings first." },
      { text: "Extremely detailed, referencing documents or official links with precise formatting.", type: 'C', explanation: "Accurate, structured and avoids any semantic ambiguity." }
    ]
  },
  {
    id: 4,
    question: "When head office issues a sudden operational process shift, your first reaction is:",
    options: [
      { text: "Quickly accept it and push yourself/team to adapt immediately without reducing sales.", type: 'D', explanation: "Resilient, opportunistic, swift to adapt." },
      { text: "Excitably search for what is interesting about the new rules to motivate colleagues.", type: 'I', explanation: "Optimistic, spreads positive outlooks on change." },
      { text: "Feel slightly anxious about the disruption to stability, preferring to adapt step-by-step.", type: 'S', explanation: "Prefers steady, predictable progression." },
      { text: "Examine original directives immediately to map out the exact delta from old processes.", type: 'C', explanation: "Compliance-driven, focused on logic and exact deltas." }
    ]
  },
  {
    id: 5,
    question: "How do you most desire to be recognized or rewarded?",
    options: [
      { text: "Granted larger autonomous power or a promotion due to outstanding sales results.", type: 'D', explanation: "Prefers autonomy, leadership trust, and tangible outcomes." },
      { text: "Celebrated publicly in front of the entire branch with loud applause.", type: 'I', explanation: "Enjoys social appreciation and praise." },
      { text: "Receive sincere, warm thank-you notes from supervisors or customers you assisted.", type: 'S', explanation: "Treasures true bonds and deep emotional gratitude." },
      { text: "Receive an objective performance score backed by metrics and elite certificates.", type: 'C', explanation: "Desires analytical feedback backed by technical parameters." }
    ]
  },
  {
    id: 6,
    question: "When collaborating on a digital banking transformation project, your natural role is:",
    options: [
      { text: "Leader coordinating work volume, driving timelines, and taking final decisions.", type: 'D', explanation: "Action-driven supervisor." },
      { text: "Concept architect pitching solutions to engage audiences and bond members together.", type: 'I', explanation: "Synthesizer of interactive and fresh perspectives." },
      { text: "Patiently executing assigned tasks and stepping up to help overloaded teammates.", type: 'S', explanation: "Pillar of reliability, maintaining psychological safety." },
      { text: "Inspecting data, reviewing potential bugs, and writing structured error audits.", type: 'C', explanation: "Watcher of compliance and accurate deliverables." }
    ]
  },
  {
    id: 7,
    question: "What causes you the most stress at work?",
    options: [
      { text: "Indecisiveness, stagnation, or when finding your autonomy heavily restricted.", type: 'D', explanation: "Frustrated by bottlenecks and slow decision channels." },
      { text: "Working alone for long hours in a silent office or being left out of major discussions.", type: 'I', explanation: "Dislikes silence, isolation or closed spaces." },
      { text: "Intense internal divisions or harsh conflict occurring without authentic consent.", type: 'S', explanation: "Avoids aggressive friction or deep interpersonal breakdown." },
      { text: "Carelessness, sloppy teammate metrics, or operating without explicit guidelines.", type: 'C', explanation: "Strongly dislikes technical errors or haphazard routines." }
    ]
  },
  {
    id: 8,
    question: "When a VIP customer complains intensely about a transaction error, you will:",
    options: [
      { text: "Focus on attributing responsibility quickly and table direct refunds to appease them.", type: 'D', explanation: "Aims for direct, rapid issue resolution." },
      { text: "Empathize deeply with a warm, caring tone, using conversation aesthetics to soothe them.", type: 'I', explanation: "Master of visual/verbal comfort and rapport." },
      { text: "Listen patiently to all concerns, express sincere apologies, and pledge support till resolved.", type: 'S', explanation: "Establishes authentic trust and customer respect." },
      { text: "Record precise times and codes, querying database footprints to issue a structured fix.", type: 'C', explanation: "Root cause finder based on scientific trace metrics." }
    ]
  }
];

interface DISCQuizProps {
  onBack: () => void;
  isEnglish?: boolean;
}

export default function DISCQuiz({ onBack, isEnglish = false }: DISCQuizProps) {
  const QUESTIONS = isEnglish ? DISC_QUESTIONS_EN : DISC_QUESTIONS;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<DISCType[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const handleSelectOption = (type: DISCType) => {
    const updated = [...answers, type];
    setAnswers(updated);
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setIsFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setAnswers([]);
    setIsFinished(false);
  };

  // Calculate results
  const counts = answers.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, { D: 0, I: 0, S: 0, C: 0 } as Record<DISCType, number>);

  const total = answers.length || 1;
  const percentages = {
    D: Math.round((counts.D / total) * 100),
    I: Math.round((counts.I / total) * 100),
    S: Math.round((counts.S / total) * 100),
    C: Math.round((counts.C / total) * 100),
  };

  // Find dominant style
  let dominant: DISCType = 'D';
  let maxVal = -1;
  (Object.keys(percentages) as DISCType[]).forEach((key) => {
    if (percentages[key] > maxVal) {
      maxVal = percentages[key];
      dominant = key;
    }
  });

  const getDominantInfo = (type: DISCType) => {
    if (isEnglish) {
      switch (type) {
        case 'D':
          return {
            title: "Dominance (Decisive - Assertive - D)",
            badgeColor: "bg-red-50 text-red-700 border-red-200",
            barColor: "bg-red-600",
            desc: "You are results-driven, rapid-paced, and embrace intense operational challenges. In a banking office, you coordinate drive systems and execute firm pathways under pressure.",
            strengths: ["Highly competitive, clear target orientation", "Decisive during emergency standoffs", "Willingly assumes risk and delivery accountability"],
            weaknesses: ["Impatient with slow processing backlogs", "Can impose high-pressure guidelines", "Occasionally ignores tedious statistical audit items"],
            collabTip: "To collaborate better: Take 3 seconds to actively listen before ruling; coordinate steps to assist S group partners with incremental transitions."
          };
        case 'I':
          return {
            title: "Influence (Inspiring - Engaging - I)",
            badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
            barColor: "bg-amber-500",
            desc: "You possess glowing collaborative energy, engaging speaking skills, and natural motivation. During team debates, you spark the creative flame, reducing tension and bonding staff together.",
            strengths: ["Compelling presenter, motivates the team beautifully", "Generates fresh creative concepts for marketing client profiles", "Sets a lively, dynamic and exciting team mood"],
            weaknesses: ["Easily distracted by repetitive ledger procedures", "Sometimes over-promises results or skips follow-through schedules", "Highly vulnerable to feedback filters and peer rejection"],
            collabTip: "To collaborate better: Document project specifications in written files; team up with C group members to focus on tracking granular milestones."
          };
        case 'S':
          return {
            title: "Steadiness (Steady - Harmonious - S)",
            badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
            barColor: "bg-emerald-600",
            desc: "You are highly patient, loyal, trustworthy, and prioritize cohesion. You are a natural active listener, shielding the workspace from internal division. You represent the resilient glue keeping staff bonded.",
            strengths: ["Exceptional active listener, empathetic and caring", "Resilient supporter who finishes long-term operations reliably", "Quietly resolves internal divisions, keeping the peace"],
            weaknesses: ["Avoids direct confrontation, letting minor frustrations compound", "Struggles to say 'no' to over-scoped demands", "Anxious during swift, abrupt systemic processes"],
            collabTip: "To collaborate better: Express your specific personal claims directly; practice graceful refusal strategies to protect your workflow."
          };
        case 'C':
          return {
            title: "Conscientiousness (Precise - Compliant - C)",
            badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
            barColor: "bg-blue-600",
            desc: "You embody logic, deep analysis, and procedural excellence. In transactions, you are the meticulous safeguard spotting errors and guarding operational risk sheets.",
            strengths: ["Sharply analytical, highly prudent and accurate", "Respects regulations, rules, and standard banking checklists", "Quickly spots technical anomalies and structural hazards"],
            weaknesses: ["Perfectionism can extend delivery timelines unnecessarily", "Can trigger a cold atmosphere or sound overlay rigid in discussions", "Anxious regarding radical concepts backed by thin telemetry"],
            collabTip: "To collaborate better: Accept that velocity is occasionally superior to absolute perfection; sync with I partners to boost emotional ease."
          };
      }
    }

    switch (type) {
      case 'D':
        return {
          title: "Dominance (Người Tiên Phong - Quyết Đoán)",
          badgeColor: "bg-red-50 text-red-700 border-red-200",
          barColor: "bg-red-600",
          desc: "Bạn là người hành động nhanh, hướng tới kết quả và thích đối mặt với các thử thách lớn. Tại môi trường ngân hàng, bạn là đầu tàu thúc đẩy doanh số, ra quyết định dứt khoát dưới áp lực lớn.",
          strengths: ["Cạnh tranh cao, định hướng kết quả rõ ràng", "Nhanh chóng đưa ra quyết định khi khẩn cấp", "Chấp nhận thách thức và dám làm dám chịu"],
          weaknesses: ["Có thể thiếu kiên nhẫn với các quy trình rườm rà", "Đôi khi áp đặt ý kiến lên đồng nghiệp", "Ít quan tâm tới tiểu tiết của số liệu phân tích"],
          collabTip: "Để phối hợp tốt hơn: Hãy dành thêm 3 giây lắng nghe ý kiến của người khác trước khi quyết định; tích cực hỗ trợ đồng nghiệp nhóm S thích nghi từ từ."
        };
      case 'I':
        return {
          title: "Influence (Người Truyền Cảm Hứng - Gắn Kết)",
          badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
          barColor: "bg-amber-500",
          desc: "Bạn sở hữu năng lượng tích cực dồi dào, khả năng giao tiếp lôi cuốn và lan tỏa cảm hứng mạnh mẽ. Trong các cuộc họp đội nhóm của ngân hàng, bạn chính là ngọn lửa sáng tạo giúp giảm căng thẳng và kết nối tất cả mọi người.",
          strengths: ["Giao tiếp thuyết phục, truyền động lực xuất sắc", "Nhiều sáng kiến độc đáo trong tiếp thị khách hàng", "Xây dựng không khí làm việc vui tươi, năng động"],
          weaknesses: ["Dễ bị phân tâm, khó tập trung làm việc thủ tục lặp đi lặp lại", "Đôi khi nói nhiều hơn làm hoặc thiếu tính nhất trí trong cam kết", "Nhạy cảm cao với sự khước từ từ người khác"],
          collabTip: "Để phối hợp tốt hơn: Hãy ghi chú chi tiết công việc bằng văn bản; rèn luyện tính kỷ luật khi theo dõi tiến độ công việc vụn vặt cùng nhóm C."
        };
      case 'S':
        return {
          title: "Steadiness (Người Đồng Hành - Hòa Nhã)",
          badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
          barColor: "bg-emerald-600",
          desc: "Bạn là người kiên nhẫn, trung thành và đề cao sự an toàn của tập thể. Bạn luôn lắng nghe sâu sắc và sẵn lòng hộ vệ sau lưng đồng nghiệp. Bạn đại diện cho chất keo bền bỉ giữ các thành viên gắn kết lâu dài.",
          strengths: ["Lắng nghe xuất sắc, chân thành và thấu hiểu", "Tính kiên định cao, hoàn thành tốt việc hỗ trợ lâu dài", "Góp phần làm dịu các mâu thuẫn nội bộ êm thấm"],
          weaknesses: ["Thường né tránh va chạm trực tiếp, giữ uất ức trong lòng", "Khó đưa ra quyết định từ chối người khác", "Dễ cảm thấy quá tải khi có thay đổi quá nhanh chóng"],
          collabTip: "Để phối hợp tốt hơn: Hãy mạnh dạn bày tỏ quan điểm cá nhân trực tiếp; học cách nói lời từ chối khéo léo để bảo vệ tiến độ công việc của mình."
        };
      case 'C':
        return {
          title: "Conscientiousness (Người Hoàn Hảo - Chuẩn Xác)",
          badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
          barColor: "bg-blue-600",
          desc: "Bạn là hiện thân của sự logic, tư duy phân tích chặt chẽ và coi trọng tính tuân thủ quy trình. Trong hoạt động ngân hàng, bạn là chốt chặn tin cậy rà soát rủi ro, bảo vệ cơ sở dữ liệu và đảm bảo tính chính xác tuyệt đối.",
          strengths: ["Tư duy logic cực kỳ sắc bén, cẩn trọng cao độ", "Tôn trọng tuyệt đối các quy chế tác nghiệp, biểu mẫu chuẩn", "Phát hiện nhanh chóng các lỗi sai và lỗ hổng rủi ro"],
          weaknesses: ["Có xu hướng quá cầu toàn dẫn đến kéo dài thời gian hoàn thành", "Thường khắt khe quá mức hoặc tạo cảm giác lạnh lùng trong giao tiếp", "Dễ lo lắng trước các ý tưởng quá phá cách thiếu số liệu chứng minh"],
          collabTip: "Để phối hợp tốt hơn: Hãy chấp nhận rằng đôi khi sự nhanh chóng quan trọng hơn sự hoàn hảo tuyệt đối; kết hợp với nhóm I để tăng tính linh hoạt cảm xúc."
        };
    }
  };

  const domInfo = getDominantInfo(dominant);

  return (
    <div id="disc-quiz" className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden text-slate-900 transition-all duration-300">
      {/* Quiz Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 flex items-center justify-between border-b border-slate-800">
        <div>
          <button 
            id="disc-back-btn"
            onClick={onBack} 
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium mb-3"
          >
            <ArrowLeft className="w-4 h-4" /> {isEnglish ? 'Back to Dashboard' : 'Quay lại Dashboard'}
          </button>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
            {isEnglish ? 'Office DISC Personality Quiz' : 'Trắc Nghiệm Tính Cách DISC tại Văn Phòng'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {isEnglish 
              ? 'Discover your natural communication style via 8 real bank operational situation questions.' 
              : 'Khám phá phong cách làm việc, giao tiếp ngân hàng tự nhiên của bạn chỉ sau 8 câu hỏi tình huống mẫu theo tiêu chuẩn chuyên gia.'}
          </p>
        </div>
        <div className="hidden md:flex bg-slate-800 p-3 rounded-full text-amber-400 border border-slate-700">
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>
      </div>

      {!isFinished ? (
        <div className="p-6 sm:p-8">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-6 text-xs text-slate-500 font-mono">
            <span>{isEnglish ? 'QUESTION' : 'CÂU HỎI'} {currentIdx + 1} / {QUESTIONS.length}</span>
            <span>{isEnglish ? 'PROGRESS' : 'TIẾN ĐỘ'}: {Math.round(((currentIdx + 1) / QUESTIONS.length) * 100)}%</span>
          </div>
          
          <div className="w-full bg-slate-100 h-1.5 rounded-full mb-8 overflow-hidden">
            <div 
              className="bg-slate-950 h-full transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / QUESTIONS.length) * 100}%` }}
            ></div>
          </div>

          {/* Question Text */}
          <h3 className="text-base sm:text-lg font-medium text-slate-900 mb-6 leading-relaxed">
            {QUESTIONS[currentIdx].question}
          </h3>

          {/* Options List */}
          <div className="space-y-4">
            {QUESTIONS[currentIdx].options.map((option, oIdx) => (
              <button
                id={`q-${currentIdx}-opt-${oIdx}`}
                key={oIdx}
                onClick={() => handleSelectOption(option.type)}
                className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-slate-800 hover:bg-slate-50 transition-all duration-200 group flex items-start gap-3"
              >
                <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 font-mono text-xs flex items-center justify-center font-bold group-hover:bg-slate-900 group-hover:text-white transition-colors duration-200 shrink-0 mt-0.5">
                  {String.fromCharCode(65 + oIdx)}
                </span>
                <span className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                  {option.text}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-6 sm:p-8">
          <div className="text-center mb-8">
            <div className="inline-flex bg-slate-100 p-3 rounded-full text-slate-900 border border-slate-200 mb-3">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              {isEnglish ? 'DIAGNOSTIC REPORT RESULTS' : 'KẾT QUẢ PHÂN TÍCH BAN ĐẦU'}
            </h3>
            <p className="text-slate-500 text-sm mt-1">
              {isEnglish 
                ? 'Based on your simulated behavioral selections for daily bank operations.' 
                : 'Dựa trên câu trả lời chọn lọc tình huống làm việc thực tế tại ngân hàng'}
            </p>
          </div>

          {/* Score breakdown charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h4 className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider mb-4">
                {isEnglish ? 'Personality Distribution Chart' : 'Biểu Đồ Phân Bổ Nhóm Tính Cách'}
              </h4>
              <div className="space-y-4">
                {/* D */}
                <div>
                  <div className="flex justify-between items-center text-xs font-semibold mb-1">
                    <span className="text-red-700">{isEnglish ? 'D (Dominance / Decisive)' : 'D (Xác Quyết / Quyết Đoán)'}</span>
                    <span className="text-red-700 font-mono">{percentages.D}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-red-600 h-full" style={{ width: `${percentages.D}%` }}></div>
                  </div>
                </div>
                {/* I */}
                <div>
                   <div className="flex justify-between items-center text-xs font-semibold mb-1">
                    <span className="text-amber-700">{isEnglish ? 'I (Influence / Inspiring)' : 'I (Truyền Cảm Hứng / Gắn Kết)'}</span>
                    <span className="text-amber-700 font-mono">{percentages.I}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full" style={{ width: `${percentages.I}%` }}></div>
                  </div>
                </div>
                {/* S */}
                <div>
                  <div className="flex justify-between items-center text-xs font-semibold mb-1">
                    <span className="text-emerald-700">{isEnglish ? 'S (Steadiness / Supportive)' : 'S (Đồng Hành / Hòa Nhã)'}</span>
                    <span className="text-emerald-700 font-mono">{percentages.S}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full" style={{ width: `${percentages.S}%` }}></div>
                  </div>
                </div>
                {/* C */}
                <div>
                  <div className="flex justify-between items-center text-xs font-semibold mb-1">
                    <span className="text-blue-700">{isEnglish ? 'C (Conscientiousness / Precise)' : 'C (Hoàn Hảo / Chuẩn Xác)'}</span>
                    <span className="text-blue-700 font-mono">{percentages.C}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full" style={{ width: `${percentages.C}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dominant Style Details */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${domInfo.badgeColor}`}>
                    {isEnglish ? `Dominant Profile Group: ${dominant}` : `Nhóm Dominant chính: ${dominant}`}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-slate-900 tracking-tight">{domInfo.title}</h4>
                <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">{domInfo.desc}</p>
                <div className="mt-4">
                  <span className="text-xs font-bold text-slate-800">{isEnglish ? 'Key Core Strengths:' : 'Thế mạnh vượt trội:'}</span>
                  <ul className="text-xs text-slate-600 list-disc list-inside mt-1.5 space-y-1">
                    {domInfo.strengths.map((str, idx) => (
                      <li key={idx}>{str}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Practical application tip card */}
          <div className="bg-slate-950 text-white rounded-2xl p-6 sm:p-8 mb-8 border border-slate-800">
            <div className="flex items-center gap-2 mb-3 text-amber-400">
              <MessageSquare className="w-5 h-5 shrink-0" />
              <h4 className="text-sm font-semibold tracking-wider font-mono">
                {isEnglish ? 'COLLABORATION & SYNC ADVICE (EXPERT TIPS)' : 'LỜI KHUYÊN PHỐI HỢP ĐỒNG ĐỘI (CHUYÊN GIA GỢI Ý)'}
              </h4>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{domInfo.collabTip}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-800">
              <div>
                <span className="text-red-400 font-bold block text-xs">
                  {isEnglish ? 'Beware Under Stress (Avoid):' : 'Cẩn trọng khi giao tiếp (Avoid):'}
                </span>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                  {domInfo.weaknesses.join(", ")}. {isEnglish ? 'Recognize these tendencies when disputes flare.' : 'Hãy nhận biết điểm yếu này của bản thân khi căng thẳng trong các thảo luận khẩn cấp.'}
                </p>
              </div>
              <div>
                <span className="text-emerald-400 font-bold block text-xs">
                  {isEnglish ? 'Action Core Priority (Focus):' : 'Nên tập trung (Focus):'}
                </span>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                  {isEnglish 
                    ? 'Offset colleague constraints with adaptable, empathetic supporting behaviors.'
                    : 'Bọc lót khi làm việc nhóm bằng kỹ năng giao tiếp bổ khuyết phù hợp cho đồng đội xung quanh.'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              id="quiz-reset-btn"
              onClick={resetQuiz}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-all cursor-pointer border border-slate-200"
            >
              <RefreshCw className="w-4 h-4" /> {isEnglish ? 'Retake Quiz' : 'Làm lại trắc nghiệm'}
            </button>
            <button
              id="quiz-done-btn"
              onClick={onBack}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-semibold text-sm transition-all cursor-pointer shadow-sm shadow-slate-950/20"
            >
              <Layers className="w-4 h-4" /> {isEnglish ? 'Back to Dashboard' : 'Quay lại Dashboard'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
