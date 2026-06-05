/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Sparkles, 
  Trash2, 
  Plus, 
  Download, 
  Check, 
  X, 
  Lightbulb, 
  ArrowRight, 
  Layers, 
  HelpCircle, 
  BookOpen, 
  Info, 
  Shuffle, 
  RotateCw,
  Clock,
  LayoutDashboard,
  Search,
  Compass,
  Users,
  Target,
  AlertTriangle
} from 'lucide-react';
import { motion } from 'motion/react';

interface StickyNote {
  id: string;
  content: string;
  category: 'problem' | 'idea' | 'action' | 'resource';
  color: 'yellow' | 'teal' | 'coral' | 'indigo';
  author: string;
  timestamp: string;
}

interface BrainstormingFramework {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  phases: { name: string; desc: string; triggerQuestions: string[] }[];
}

const BRAINSTORMING_FRAMEWORKS: BrainstormingFramework[] = [
  {
    id: 'scamper',
    title: 'Mô hình SCAMPER Tư Duy Đột Phá',
    subtitle: '7 Lăng kính mài sắc dịch vụ ngân hàng truyền thống',
    description: 'Phương pháp kích thích tư duy bằng cách thay đổi các yếu tố sẵn có trong quy trình giao dịch, dịch vụ hoặc sản phẩm tài chính.',
    phases: [
      {
        name: 'S - Substitute (Thay thế)',
        desc: 'Thay thế quy trình, vật liệu, con người, hay bước xét duyệt hiện tại bằng giải pháp khác.',
        triggerQuestions: ['Thay thế hồ sơ giấy bằng chữ ký số và xác thực khuôn mặt ID được không?', 'Thay thế quy trình phê duyệt 3 cấp bằng quy trình phân quyền tự động?']
      },
      {
        name: 'C - Combine (Kết hợp)',
        desc: 'Kết hợp hai dịch vụ, nghiệp vụ hay hai phòng ban khác nhau thành một điểm chạm tối ưu.',
        triggerQuestions: ['Kết hợp bước thẩm định hồ sơ tài sản với bước thẩm định phương án vay?', 'Kết hợp quầy giao dịch truyền thống với quầy cafe trải nghiệm số?']
      },
      {
        name: 'A - Adapt (Thích ứng)',
        desc: 'Học hỏi và áp dụng giải pháp từ ngành khác (như Grab, Shopee, Y tế) vào ngân hàng.',
        triggerQuestions: ['Học hỏi cơ chế giao hàng chặng cuối của Shopee để áp dụng cho chuyển phát thẻ vật lý?', 'Ứng dụng gamification tích điểm đổi quà như các hãng thương mại điện tử?']
      },
      {
        name: 'M - Modify / Magnify (Phóng đại/Thu nhỏ)',
        desc: 'Tăng cường một thuộc tính cốt lõi của sản phẩm, hoặc tối giản hóa nó đến mức cực độ.',
        triggerQuestions: ['Nếu giao dịch mở thẻ tín dụng chỉ tốn 3 phút thì quy trình sẽ thay đổi thế nào?', 'Phóng đại giá trị chăm sóc khách hàng VIP để áp dụng cho khách hàng đại chúng?']
      },
      {
        name: 'P - Put to other uses (Sử dụng cho mục đích khác)',
        desc: 'Tái sử dụng tài nguyên dư thừa hoặc dữ liệu khách hàng cho giá trị thặng dư khác.',
        triggerQuestions: ['Tận dụng không gian chờ tại phòng giao dịch làm nơi trưng bày sản phẩm của khách hàng SME?', 'Sử dụng dữ liệu lịch sử đóng tiền điện để chấm điểm tín dụng hành vi?']
      },
      {
        name: 'E - Eliminate (Loại bỏ)',
        desc: 'Cắt giảm triệt để các bước thừa thải, các khâu trung gian gây phiền hà cho khách hàng.',
        triggerQuestions: ['Loại bỏ hoàn toàn yêu cầu sao kê giấy tờ lương đối với khách hàng có nhận lương qua ngân hàng?', 'Hủy bỏ việc điền biểu mẫu viết tay lặp đi lặp lại?']
      },
      {
        name: 'R - Reverse (Đảo ngược)',
        desc: 'Đảo ngược trình tự phục vụ, chuyển từ "Khách tìm ngân hàng" sang "Ngân hàng tìm khách".',
        triggerQuestions: ['Thay vì khách hàng đến quầy nộp tiền, chúng ta đem ki-ốt thông minh đến chung cư?', 'Thiết kế giao diện app hiển thị các nút thao tác ngược lại theo thói quen ngón cái?']
      }
    ]
  },
  {
    id: 'reverse',
    title: 'Reverse Brainstorming (Động não đảo ngược)',
    subtitle: 'Phương pháp giải quyết vấn đề bằng cách phân tích các yếu tố nghịch lý',
    description: 'Thay vì đặt câu hỏi "Làm thế nào để cải tiến trải nghiệm khách hàng?", chúng ta đặt câu hỏi "Làm thế nào để quy trình phục vụ gặp khó khăn nhất?". Sau đó lật ngược các ý kiến cản trở thành những giải pháp phòng ngừa thông minh và thực tế.',
    phases: [
      {
        name: 'Bước 1: Xác định bài toán thực thi',
        desc: 'Mở đầu bằng mục tiêu cần đạt được.',
        triggerQuestions: ['Làm thế nào để đẩy nhanh tốc độ duyệt vay mua nhà cho khách hàng cá nhân?']
      },
      {
        name: 'Bước 2: Đảo ngược vấn đề quyết liệt',
        desc: 'Hỏi cách tạo ra khó khăn lớn nhất cho vấn đề đó.',
        triggerQuestions: ['Làm thế nào để quy trình duyệt vay mua nhà diễn ra chậm chạp và gây nhiều phiền hà nhất cho khách hàng?']
      },
      {
        name: 'Bước 3: Động não ý kiến cản trở',
        desc: 'Thu thập tất cả các rủi ro cản trở khách quan và chủ quan một cách cởi mở.',
        triggerQuestions: ['Bắt họ in 10 bộ hồ sơ giấy.', 'Yêu cầu nộp giấy xác nhận tình trạng độc thân bản gốc có đóng dấu đỏ trong vòng 3 ngày.', 'Nhân viên thẩm định im lặng 1 tuần rồi báo thiếu chứng từ.']
      },
      {
        name: 'Bước 4: Đảo ngược thành giải pháp tối ưu',
        desc: 'Chuyển từng rủi ro cản trở thành một hành động phòng ngừa nghiêm ngặt và hiệu quả.',
        triggerQuestions: ['Lật ngược: Cung cấp checklist điện tử thống nhất một lần.', 'Lập tức gửi SMS tự động thông báo tiến độ duyệt hồ sơ hàng ngày.', 'Liên thông dữ liệu để tự động tra cứu trực tuyến.']
      }
    ]
  },
  {
    id: 'brainwriting',
    title: 'Brainwriting 6-3-5 (Động não viết im lặng)',
    subtitle: 'Hóa giải rào cản tâm lý của sự nhút nhát trong phát biểu',
    description: 'Phương pháp viết im lặng giúp tất cả thành viên trong nhóm đóng góp sáng kiến một cách công bằng mà không e ngại các định kiến hay phán xét.',
    phases: [
      {
        name: '6 người tham gia',
        desc: 'Nhóm ngồi thành vòng tròn, mỗi người có 1 tờ giấy phát tay A4 chia sẵn bảng 3 cột 6 dòng.',
        triggerQuestions: ['Chuẩn bị mẫu bàn làm việc nhóm hoặc dùng bảng số hóa bên tab của chúng ta.']
      },
      {
        name: '3 ý tưởng ban đầu',
        desc: 'Trong vòng 5 phút đầu tiên, mỗi người im lặng viết 3 ý tưởng thô vào hàng số 1 của tờ giấy mình.',
        triggerQuestions: ['Không tranh luận, không phê phán, chỉ viết tập trung.']
      },
      {
        name: '5 phút luân chuyển',
        desc: 'Hết giờ, chuyển tờ giấy sang người bên phải. Người này đọc các ý tưởng trên giấy và viết tiếp 3 ý tưởng kế thừa/mở rộng vào hàng số 2.',
        triggerQuestions: ['Nếu ý của người trước là "App thông báo nhắc lịch", bạn viết tiếp "Bổ sung trợ lý thoại nhắc bằng giọng thân thiện".']
      },
      {
        name: 'Kết quả đầu ra nâng cao',
        desc: 'Sau 6 vòng quay (30 phút), nhóm sẽ tổng hợp được 108 ý tưởng đa dạng có tính cộng hưởng sâu sắc.',
        triggerQuestions: ['Tiến hành rà soát, dán nhãn đánh giá cho ý tưởng mang tính khả thi cao nhất.']
      }
    ]
  }
];

const PROMPT_CHALLENGES = [
  "Cải tiến quy trình giao dịch tín dụng cá nhân giảm từ 3 ngày xuống 30 phút bằng công nghệ.",
  "Thiết kế trải nghiệm phòng chờ tại chi nhánh ngân hàng khiến khách hàng thèm khát được đợi lâu hơn.",
  "Thiết lập kịch bản chăm sóc khách hàng gửi tiền tiết kiệm lớn tuổi cực kỳ an tâm trước rủi ro lừa đảo công nghệ.",
  "Đơn giản hóa mẫu tờ khai đăng ký mở tài khoản doanh nghiệp SME sao cho chỉ cần điền tối đa 5 trường thông tin.",
  "Giải cứu phòng giao dịch đang bị sụt giảm 40% lượng khách trực tiếp bằng mô hình tương tác cộng đồng địa phương.",
  "Sáng tạo chiến dịch giúp nhân viên tín dụng vượt qua nỗi sợ gọi điện thoại lạnh (cold-call) chào sản phẩm mới.",
  "Tối ưu hóa quy trình tiếp nhận và xử lý khiếu nại thẻ tín dụng bị trừ tiền sai, phản hồi dứt điểm trong 15 phút."
];

interface ScenarioCard {
  id: string;
  name: string;
  moduleLabel: string;
  tagline: string;
  category: 'teamwork' | 'creativity' | 'operational';
  categoryLabel: string;
  bgColor: string;
  borderColor: string;
  iconBg: string;
  iconColor: string;
  whenToUse: string[];
  howToApply: string[];
  goldenFormula: string;
  keywords: string[];
  templateText: string;
}

const SCENARIO_CARDS: ScenarioCard[] = [
  {
    id: 'disc',
    name: 'DISC - Đọc Vị Hành Vi Nhóm',
    moduleLabel: 'Module 1 • Giao tiếp',
    tagline: 'Giải mã xung đột tính cách, tối ưu hóa giao tiếp đúng tần số.',
    category: 'teamwork',
    categoryLabel: 'Tương tác & Thấu hiểu',
    bgColor: 'bg-blue-50/50',
    borderColor: 'border-blue-100 hover:border-blue-300 shadow-sm',
    iconBg: 'bg-blue-100 text-blue-700',
    iconColor: 'blue',
    whenToUse: [
      'Xuất hiện xung đột cá nhân, bất đồng quan điểm sống hoặc lệch pha trong giao tiếp hằng ngày.',
      'Khi phân vai dự án mới, cần giao đúng trách nhiệm cho đúng người có đặc tính phù hợp.',
      'Khi thuyết phục, thương lượng với đối tác/khách hàng hoặc trình bày dự án lên cấp trên.'
    ],
    howToApply: [
      'Xác định nhanh nhóm tính cách đối phương: D (Hành động, Áp đảo), I (Sáng tạo, Cảm hứng), S (Hòa giải, Điềm đạm), C (Logic, Chuẩn mực).',
      'Đổi kênh truyền thông: Ngắn gọn với người nhóm D; Thân thiện, vui tươi với nhóm I; Kiên nhẫn, chân thành với nhóm S; Chi tiết, số liệu minh bạch với nhóm C.'
    ],
    goldenFormula: 'DISC: Nhìn người giao việc - Đọc vị nói đúng kênh.',
    keywords: ['mâu thuẫn', 'cãi nhau', 'giao việc', 'tính cách', 'giao tiếp', 'bất đồng', 'khách hàng', 'xung đột', 'rm', 'giao dịch viên'],
    templateText: '💡 [Áp dụng DISC] Sáng kiến cải thiện giao tiếp nhóm:\n- Thấu hiểu nhóm tính cách của nhân sự:\n- Giải pháp đồng bộ hóa kênh giao tiếp tương thích:'
  },
  {
    id: 'katzenbach',
    name: 'Katzenbach - 5 Giai Đoạn Trưởng Thành',
    moduleLabel: 'Module 2 • Phát triển Đội nhóm',
    tagline: 'Nâng cấp sức khỏe vận hành từ tập hợp rời rạc thành nhóm hiệu năng cao.',
    category: 'operational',
    categoryLabel: 'Đội ngũ xuất sắc',
    bgColor: 'bg-emerald-50/50',
    borderColor: 'border-emerald-100 hover:border-emerald-300 shadow-sm',
    iconBg: 'bg-emerald-100 text-emerald-700',
    iconColor: 'emerald',
    whenToUse: [
      'Khi phòng ban mới thành lập còn bỡ ngỡ, rụt rè chưa hiểu rõ năng lực và phong cách của nhau.',
      'Khi nhóm làm việc trì trệ, dẫm chân tại chỗ với hiệu suất trung bình và thiếu đi gắn kết đột phá.',
      'Khi muốn tái cơ cấu chi nhánh, phân bổ lại chỉ tiêu kinh doanh theo mức độ trưởng thành của đội hình.'
    ],
    howToApply: [
      'Định vị nhóm đang ở nấc thang nào: Nhóm làm việc thông thường -> Nhóm giả tạo -> Nhóm tiềm năng -> Nhóm thực sự -> Nhóm hiệu năng cao.',
      'Mài sắc 3 trụ cột: Đồng thuận mục đích chung đầy cảm hứng, chia nhỏ mục tiêu cụ thể từng tuần, phát triển kỹ năng bổ trợ chéo giữa các thành viên.'
    ],
    goldenFormula: 'Katzenbach: 1 Mục đích chung + Chia sẻ trách nhiệm giải trình = Nhóm Hiệu năng cao.',
    keywords: ['trì trệ', 'chậm', 'hiệu suất', 'mới thành lập', 'lãnh đạo', 'gắn kết', 'sức khỏe nhóm', 'mục tiêu', 'tăng trưởng', 'dự án'],
    templateText: '💡 [Sử dụng Katzenbach] Kế hoạch nâng cấp hiệu suất nhóm:\n- Xác định bối cảnh chuyển giai đoạn nhóm:\n- Thiết lập mục tiêu chung thúc đẩy cam kết:'
  },
  {
    id: 'lencioni',
    name: 'Lencioni - Triệt Tiêu 5 Rào Cản',
    moduleLabel: 'Module 3 • Gắn kết & Đồng lòng',
    tagline: 'Vực dậy tinh thần chịu trách nhiệm, gắn kết tập thể vững bền từ đáy tháp.',
    category: 'teamwork',
    categoryLabel: 'Mâu thuẫn & Trách nhiệm',
    bgColor: 'bg-rose-50/50',
    borderColor: 'border-rose-100 hover:border-rose-300 shadow-sm',
    iconBg: 'bg-rose-100 text-rose-700',
    iconColor: 'rose',
    whenToUse: [
      'Nhân viên có biểu hiện đùn đẩy trách nhiệm, đổ lỗi cho hoàn cảnh hoặc chối bỏ sai sót.',
      'Các cuộc họp diễn ra trong sự im lặng bề nổi, đồng thuận giả tạo những vẫn thắc mắc sau lưng.',
      'Chỉ tiêu chi nhánh sụt giảm nghiêm trọng nhưng mọi người thờ ơ với kết quả chung.'
    ],
    howToApply: [
      'Xây dựng lòng tin (Trust): Cho phép các thành viên cởi mở thừa nhận điểm yếu hay sai sót mà không sợ bị trừng phạt.',
      'Khơi dậy xung đột lành mạnh (Conflict): Tập trung tranh luận kịch tính bảo vệ ý kiến chuyên môn dựa trên công việc, nói không với công kích cá nhân.',
      'Thiết lập cam kết thép (Commitment), áp đặt trách nhiệm giải trình chéo (Accountability) và vinh danh kết quả của tập thể (Results).'
    ],
    goldenFormula: 'Lencioni: Can đảm nhìn nhận yếu điểm -> Đồng lòng cam kết đạt kết quả chung.',
    keywords: ['đổ lỗi', 'đùn đẩy', 'sợ sai', 'im lặng', 'họp dở', 'mất đoàn kết', 'thờ ơ', 'chỉ tiêu', 'mâu thuẫn', 'lòng tin'],
    templateText: '💡 [Sử dụng Lencioni] Giải pháp gạt bỏ 5 rào cản tập thể:\n- Khắc phục lỗ hổng lòng tin bằng giải pháp cởi mở:\n- Thúc đẩy tinh thần chịu trách nhiệm giải trình:'
  },
  {
    id: 'agile',
    name: 'Agile Standup - Vận Hành Tinh Gọn',
    moduleLabel: 'Module 4 • Vận hành & Phản ứng nhanh',
    tagline: 'Đồng bộ thông tin thời gian thực, phá vỡ lối mòn làm việc biệt lập (Silo).',
    category: 'operational',
    categoryLabel: 'Vận hành tinh gọn',
    bgColor: 'bg-indigo-50/50',
    borderColor: 'border-indigo-100 hover:border-indigo-300 shadow-sm',
    iconBg: 'bg-indigo-100 text-indigo-700',
    iconColor: 'indigo',
    whenToUse: [
      'Hồ sơ phê duyệt khách hàng bị chậm trễ do RM, Thẩm định viên và Quản lý rủi ro giao tiếp chậm.',
      'Các buổi họp tuần rườm rà kéo dài hàng giờ đồng hồ nhưng không giải quyết triệt để nút thắt.',
      'Sự thay đổi chính sách tín dụng liên tục từ ngân hàng trung ương cần đồng bộ ngay lập tức.'
    ],
    howToApply: [
      'Triển khai cuộc họp đứng (Daily Standup) 15 phút cố định vào đầu ngày.',
      'Mỗi nhân sự chỉ báo cáo ngắn gọn 3 câu hỏi: Hôm qua tôi đã hoàn thành gì? Hôm nay tôi sẽ cam kết làm xong việc gì? Những điểm nghẽn/rào cản nào đang làm chậm tôi?',
      'Lập tức xử lý điểm nghẽn ngay sau họp, không thảo luận lan man trong giờ đứng.'
    ],
    goldenFormula: 'Agile Standup: 15 Phút tập trung - 3 Câu hỏi mục tiêu - Vạch mặt và tháo gỡ điểm lỗi.',
    keywords: ['họp lâu', 'nghẽn', 'hồ sơ chậm', 'silo', 'biệt lập', 'bị chồng chéo', 'thông tin cũ', 'standup', 'daily', '15 phút', 'chậm trễ'],
    templateText: '💡 [Sử dụng Agile Standup] Kịch bản họp đứng 15 phút đầu ngày:\n- 3 Đầu việc trọng tâm cần cam kết hôm nay:\n- Nhận diện điểm nghẽn rào cản cần gỡ ngay:'
  },
  {
    id: 'scamper_scenario',
    name: 'SCAMPER - Cải Tien Quy Trình Ngân Hàng',
    moduleLabel: 'Module 4 • Sáng tạo Đột phá',
    tagline: 'Đột phá tư duy bằng 7 lăng kính cải cách quy trình thủ tục cũ rườm rà.',
    category: 'creativity',
    categoryLabel: 'Cải tiến mô hình',
    bgColor: 'bg-amber-50/50',
    borderColor: 'border-amber-100 hover:border-amber-300 shadow-sm',
    iconBg: 'bg-amber-100 text-amber-700',
    iconColor: 'amber',
    whenToUse: [
      'Khi thủ tục mở tài khoản doanh nghiệp hoặc phê duyệt mức tín chấp quá phức tạp, rườm rà.',
      'Khi dịch vụ chi nhánh nghèo nàn, sụt giảm doanh số trầm trọng trước làn sóng Fintech và ví điện tử.',
      'Cần sáng chế ý tưởng cải cải sản phẩm dịch vụ mới mẻ trong ngân hàng bán lẻ.'
    ],
    howToApply: [
      'Mang quy trình hiện hữu quét lần lượt qua 7 bộ lọc thông minh: S (Thay thế hồ sơ giấy), C (Kết hợp thẩm định), A (Thích ứng ví điện tử), M (Mở rộng tính năng số), P (Sử dụng sảnh chờ làm nơi cafe), E (Loại bỏ bước duyệt trung gian), R (Đảo ngược phục vụ số).'
    ],
    goldenFormula: 'SCAMPER: Có thể Thay thế, Kết hợp hay Cắt bỏ tối giản hóa khâu nào để nhanh gấp đôi không?',
    keywords: ['giấy tờ', 'rườm rà', 'thủ tục', 'cải tiến', 'đối thủ cạnh tranh', 'bão hòa', 'lỗi thời', 'đơn giản hóa', 'scamper', 'sáng tạo'],
    templateText: '💡 [Áp dụng SCAMPER] Đề xuất cải cách quy trình bán lẻ:\n- Lăng kính Thay thế / Kết hợp:\n- Lăng kính Loại bỏ / Thu gọn để tăng trải nghiệm:'
  },
  {
    id: 'reverse_scenario',
    name: 'Reverse Brainstorming - Động Não Đảo Ngược',
    moduleLabel: 'Module 4 • Tháo gỡ Điểm nghẽn',
    tagline: 'Lật ngược vấn đề để dự đoán và triệt biến điểm yếu thành giải pháp ngăn ngừa rủi ro.',
    category: 'creativity',
    categoryLabel: 'Giải pháp phòng thủ',
    bgColor: 'bg-sky-50/50',
    borderColor: 'border-sky-100 hover:border-sky-300 shadow-sm',
    iconBg: 'bg-sky-100 text-sky-700',
    iconColor: 'sky',
    whenToUse: [
      'Khi nhóm thảo luận bế tắc ý tưởng cải tiến do đi theo lối mòn thói quen cũ mòn.',
      'Cần rà soát toàn bộ rủi ro của dự án bảo mật, nâng cấp Core banking mới trước khi bấm nút khởi chạy.',
      'Khắc phục triệt để lỗ hổng trải nghiệm khách hàng khi sử dụng thẻ tín dụng thế hệ mới.'
    ],
    howToApply: [
      'Đảo ngược bài toán: Đặt câu hỏi làm cách nào để phá hoại, làm chậm và gây ức chế tuyệt đối cho khách hàng.',
      'Liệt kê danh sách phá hoại một cách chi tiết, trung thực và dí hỏm.',
      'Lật ngược từng điểm phá hoại thành các điều kiện phòng vệ và hành động tối ưu.'
    ],
    goldenFormula: 'Động não ngược: Thiết kế quy trình tệ nhất -> Biến hiểm họa thành chốt phòng ngự tối tân.',
    keywords: ['bí ý tưởng', 'bế tắc', 'nguy cơ', 'rủi ro', 'thử nghiệm', 'lỗ hổng', 'sợ sai', 'bảo mật', 'đảo ngược', 'phá hoại'],
    templateText: '💡 [Áp dụng Động não đảo ngược] Khắc phục nguy cơ chi nhánh:\n- Kịch bản quy trình gây chậm trễ ức chế nhất có thể:\n- Lật ngược thành giải pháp kiểm soát nghiêm ngặt:'
  },
  {
    id: 'brainwriting_scenario',
    name: 'Brainwriting 6-3-5 - Viết Ý Kiến Im Lặng',
    moduleLabel: 'Module 4 • Giải phóng Sáng tạo',
    tagline: 'Thu hoạch 108 sáng kiến chất lượng trong 30 phút, tống khứ nỗi sợ phát biểu.',
    category: 'creativity',
    categoryLabel: 'Bình đẳng sáng kiến',
    bgColor: 'bg-teal-50/50',
    borderColor: 'border-teal-100 hover:border-teal-300 shadow-sm',
    iconBg: 'bg-teal-100 text-teal-700',
    iconColor: 'teal',
    whenToUse: [
      'Buổi họp sột soạt một chiều: Chỉ sếp phát biểu, cấp dưới im lặng gật đầu thụ động.',
      'Các ý tưởng độc đáo của nhân viên mới bị dập tắt sớm vì nỗi sợ bị sếp chê hoặc bị đồng nghiệp phán xét.',
      'Cần giải pháp nhanh, nhiều góc nhìn kế thừa sâu rộng giữa các phòng ban.'
    ],
    howToApply: [
      '6 người ngồi quanh bảng ghi chú. Mỗi người viết 3 ý tưởng ban đầu trong 5 phút đầu tiên.',
      'Cứ sau mỗi 5 phút, chuyển thẻ giấy sang người bên cạnh để đọc kế thừa, viết tiếp 3 ý tưởng mở rộng chuyên sâu.',
      'Thu hoạch 108 ý tưởng cực kỳ đa dạng không thông qua tranh luận gây mất lòng hòa khí.'
    ],
    goldenFormula: 'Brainwriting: Không thảo luận tự do - Im lặng viết ý kiến kế thừa cộng hưởng.',
    keywords: ['sếp áp đặt', 'sợ phát biểu', 'nhút nhát', 'thụ động', 'bình đẳng', 'không dám nói', 'đóng góp ý kiến', 'viết im lặng', '6-3-5', 'sáng kiến'],
    templateText: '💡 [Áp dụng Brainwriting 6-3-5] Tổng hợp ý tưởng kế thừa:\n- Ý tưởng cốt lõi ban đầu:\n- Ý tưởng kế thừa mở rộng chuyên sâu:'
  }
];

export default function ModuleFour() {
  const [activeTab, setActiveTab] = useState<'frameworks' | 'sticky-board' | 'scenarios'>('sticky-board');
  const [selectedFramework, setSelectedFramework] = useState<string>('scamper');
  const [currentChallenge, setCurrentChallenge] = useState<string>(PROMPT_CHALLENGES[0]);
  
  // Sticky Notes State
  const [notes, setNotes] = useState<StickyNote[]>([]);
  const [inputContent, setInputContent] = useState('');
  const [inputCategory, setInputCategory] = useState<'problem' | 'idea' | 'action' | 'resource'>('idea');
  const [inputColor, setInputColor] = useState<'yellow' | 'teal' | 'coral' | 'indigo'>('yellow');
  const [inputAuthor, setInputAuthor] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  
  // Scenarios Tab State
  const [searchQuery, setSearchQuery] = useState('');
  const [scenarioFilter, setScenarioFilter] = useState<'all' | 'teamwork' | 'creativity' | 'operational'>('all');
  const [expandedScenario, setExpandedScenario] = useState<string | null>('disc');
  
  // Load initially from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ld_brainstorming_notes');
      if (saved) {
        setNotes(JSON.parse(saved));
      } else {
        // Prefill default helpful sample notes for first-time premium experience
        const defaultNotes: StickyNote[] = [
          {
            id: '1',
            content: 'Gặp khó khăn khi khách hàng doanh nghiệp phàn nàn về bảo mật token OTP thiết bị cũ.',
            category: 'problem',
            color: 'coral',
            author: 'Tuấn Anh (RM)',
            timestamp: 'Vừa xong'
          },
          {
            id: '2',
            content: 'Ứng dụng sinh trắc học thông minh thay thế hoàn toàn chữ ký tay cho giao dịch dưới 20 triệu đồng.',
            category: 'idea',
            color: 'yellow',
            author: 'Thùy Chi (GDV)',
            timestamp: 'Vừa xong'
          },
          {
            id: '3',
            content: 'Nâng cấp hệ thống bảng biểu hướng dẫn ngay tại ghế sofa để khách quét mã QR xem hướng dẫn nhanh.',
            category: 'action',
            color: 'teal',
            author: 'Quốc Bảo (Chuyên gia)',
            timestamp: 'Vừa xong'
          }
        ];
        setNotes(defaultNotes);
        localStorage.setItem('ld_brainstorming_notes', JSON.stringify(defaultNotes));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const saveNotesToStorage = (updatedNotes: StickyNote[]) => {
    try {
      localStorage.setItem('ld_brainstorming_notes', JSON.stringify(updatedNotes));
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputContent.trim()) return;

    const newNote: StickyNote = {
      id: Date.now().toString(),
      content: inputContent.trim(),
      category: inputCategory,
      color: inputColor,
      author: inputAuthor.trim() || 'Học viên',
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [newNote, ...notes];
    setNotes(updated);
    saveNotesToStorage(updated);
    
    // Reset state
    setInputContent('');
  };

  const handleDeleteNote = (id: string) => {
    const updated = notes.filter(n => n.id !== id);
    setNotes(updated);
    saveNotesToStorage(updated);
  };

  const handleClearAllNotes = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tất cả thẻ ghi chú hiện tại trên bảng không?")) {
      setNotes([]);
      saveNotesToStorage([]);
    }
  };

  const handleRollChallenge = () => {
    const remaining = PROMPT_CHALLENGES.filter(c => c !== currentChallenge);
    const randomIndex = Math.floor(Math.random() * remaining.length);
    setCurrentChallenge(remaining[randomIndex]);
  };

  const handleUseChallengeAsIdea = () => {
    setInputContent(`Thử thách động não: ${currentChallenge}`);
    setInputCategory('problem');
    setInputColor('coral');
    setActiveTab('sticky-board');
  };

  const handleExportText = () => {
    if (notes.length === 0) {
      alert("Bảng hiện tại chưa có thông tin nào để xuất bản!");
      return;
    }

    let reportText = `=== BAO CAO Y TUONG BRAINSTORMING ===\n`;
    reportText += `Ngày tạo: ${new Date().toLocaleDateString('vi-VN')} \n`;
    reportText += `Thử thách trọng tâm: ${currentChallenge}\n\n`;
    
    const categories = {
      problem: '🚨 VẤN ĐỀ & NƠI NGHẼN (PROBLEMS)',
      idea: '💡 SÁNG KIẾN ĐỘT PHÁ (IDEAS)',
      action: '⚡ HÀNH ĐỘNG THỰC THI (ACTIONS)',
      resource: '🛠️ TÀI NGUYÊN CẦN THIẾT (RESOURCES)'
    };

    Object.entries(categories).forEach(([key, label]) => {
      const catNotes = notes.filter(n => n.category === key);
      reportText += `${label} (${catNotes.length})\n`;
      if (catNotes.length === 0) {
        reportText += `  (Chưa có nội dung đóng góp)\n`;
      } else {
        catNotes.forEach((n, idx) => {
          reportText += `  [${idx + 1}] ${n.content} (Đóng góp bởi: ${n.author} - ${n.timestamp})\n`;
        });
      }
      reportText += `\n`;
    });

    reportText += `=====================================\n`;
    reportText += `Được biên soạn từ Integrated Learning Toolkit - Module 4 Brainstorming Tool.`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Bao_cao_Brainstorming_${new Date().toISOString().slice(0,10)}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'problem': return 'bg-red-50 text-red-700 border-red-200';
      case 'idea': return 'bg-yellow-50 text-yellow-750 border-yellow-200';
      case 'action': return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'resource': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'problem': return 'Phát hiện Rào cản';
      case 'idea': return 'Sáng kiến / Ý tưởng';
      case 'action': return 'Kế hoạch hành động';
      case 'resource': return 'Tài nguyên cần có';
      default: return category;
    }
  };

  const getStickyColorClass = (color: string) => {
    switch (color) {
      case 'yellow': return 'bg-amber-50 border-emerald-900 border-t-4 text-slate-900 shadow-amber-100/40';
      case 'teal': return 'bg-teal-50 border-t-4 border-teal-500 text-slate-900 shadow-teal-100/40';
      case 'coral': return 'bg-rose-50 border-t-4 border-rose-450 text-slate-900 shadow-rose-100/40';
      case 'indigo': return 'bg-indigo-50 border-t-4 border-indigo-500 text-slate-900 shadow-indigo-100/40';
      default: return 'bg-white border-t-4 border-slate-300 text-slate-900';
    }
  };

  const filteredNotes = notes.filter(n => filterCategory === 'all' || n.category === filterCategory);

  return (
    <div id="module-four-view" className="space-y-6">
      {/* Dynamic Master Banner */}
      <div className="bg-slate-950 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 relative overflow-hidden shadow-md">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none hidden lg:block">
          <Brain className="w-40 h-40 text-white" />
        </div>
        <div className="space-y-2 max-w-3xl z-15 relative">
          <div className="inline-flex items-center gap-1.5 bg-teal-950 text-teal-300 text-[10px] font-mono uppercase tracking-widest font-extrabold px-3 py-1.5 rounded-full border border-teal-900">
            <Sparkles className="w-3.5 h-3.5" /> MODULE 4 • THỰC CHIẾN SÁNG TẠO
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight">Công Cụ Động Não Sáng Tạo (Brainstorming Workspace)</h2>
          <p className="text-xs sm:text-sm text-slate-450 leading-relaxed font-normal">
            Bảng tương tác số hóa giúp học viên ghi chép ý tưởng nhanh tại hiện trường, đối chiếu mô hình tư duy đột phá và gạt bỏ định kiến quy trình tài chính thắt nút cổ chai.
          </p>
        </div>
      </div>

      {/* Primary Sub-Navigation Tabs */}
      <div className="flex border-b border-slate-200 gap-1 overflow-x-auto pb-px">
        <button
          id="m4-tab-sticky"
          onClick={() => setActiveTab('sticky-board')}
          className={`px-5 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'sticky-board' 
              ? 'border-slate-900 text-slate-900 bg-slate-50' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Layers className="w-4 h-4 text-teal-650" />
          <span>1. Bảng Sticky Notes Động Não</span>
          <span className="bg-slate-900 text-white text-[10px] px-1.5 py-0.5 rounded-full font-mono">{notes.length}</span>
        </button>
        <button
          id="m4-tab-frameworks"
          onClick={() => setActiveTab('frameworks')}
          className={`px-4 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'frameworks' 
              ? 'border-slate-900 text-slate-900 bg-slate-50' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4 text-blue-600" />
          <span>2. Cẩm Nang Khung Tư Duy (3 Frameworks)</span>
        </button>
        <button
          id="m4-tab-scenarios"
          onClick={() => setActiveTab('scenarios')}
          className={`px-4 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'scenarios' 
              ? 'border-slate-900 text-slate-900 bg-slate-50' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Lightbulb className="w-4 h-4 text-amber-500 animate-pulse" />
          <span>3. Cẩm Nang Ứng Dụng Tình Huống</span>
        </button>

      </div>

      {/* Tab 1: Interactive Sticky Note Board */}
      {activeTab === 'sticky-board' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Control Panel: Add Sticky Note */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xs h-fit">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Plus className="w-5 h-5 text-slate-700" />
                <h3 className="font-bold text-slate-900 text-sm">Viết Thẻ Ghi Chú Mới</h3>
              </div>

              <form onSubmit={handleAddNote} className="space-y-4">
                {/* Note Content */}
                <div className="space-y-1">
                  <label id="lbl-content" className="block text-xs font-bold text-slate-650">Nội dung Đề xuất / Sáng kiến</label>
                  <textarea
                    id="note-input-content"
                    value={inputContent}
                    onChange={(e) => setInputContent(e.target.value)}
                    placeholder="Nhập sáng kiến hoặc nhận diện vấn đề tác nghiệp của bạn vào đây (Ví dụ: Số hóa thủ tục đăng ký biểu mẫu rườm rà bằng cơ chế một cửa tự động...)"
                    rows={4}
                    maxLength={200}
                    className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:border-slate-800 focus:ring-1 focus:ring-slate-800 outline-hidden bg-slate-50 placeholder:text-slate-400 leading-relaxed text-slate-900"
                  />
                  <span className="text-[10px] text-slate-400 block text-right font-mono">{200 - inputContent.length} ký tự còn lại</span>
                </div>

                {/* Note Category */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-655">Phân Loại Danh Mục Ý Kiến</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { type: 'problem', label: '🚨 Vấn đề / Rào cản' },
                      { type: 'idea', label: '💡 Sáng kiến mới' },
                      { type: 'action', label: '⚡ Kế hoạch thực thi' },
                      { type: 'resource', label: '🛠️ Nguồn lực cần có' }
                    ].map((item) => (
                      <button
                        key={item.type}
                        type="button"
                        id={`cat-btn-${item.type}`}
                        onClick={() => setInputCategory(item.type as any)}
                        className={`text-left px-2 py-1.5 rounded-md border text-[11px] font-semibold transition cursor-pointer ${
                          inputCategory === item.type 
                            ? 'bg-slate-900 text-white border-slate-900' 
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Card Color Picker */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-600">Màu Sắc Thẻ Phát Biểu</label>
                  <div className="flex gap-3">
                    {[
                      { color: 'yellow', hex: 'bg-amber-100 ring-amber-300' },
                      { color: 'teal', hex: 'bg-teal-150 ring-teal-400' },
                      { color: 'coral', hex: 'bg-rose-100 ring-rose-400' },
                      { color: 'indigo', hex: 'bg-indigo-100 ring-indigo-400' }
                    ].map((item) => (
                      <button
                        key={item.color}
                        type="button"
                        id={`color-btn-${item.color}`}
                        onClick={() => setInputColor(item.color as any)}
                        className={`w-7 h-7 rounded-full border border-slate-350 transition-all cursor-pointer ${item.hex} ${
                          inputColor === item.color ? 'ring-2 scale-110 shadow-sm' : 'opacity-70 hover:opacity-100'
                        }`}
                        title={item.color}
                      />
                    ))}
                  </div>
                </div>

                {/* Author Name */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-600">Người sáng tạo/Nhóm (Tùy chọn)</label>
                  <input
                    id="note-input-author"
                    type="text"
                    value={inputAuthor}
                    onChange={(e) => setInputAuthor(e.target.value)}
                    placeholder="Tên thành viên hoặc ID nhóm..."
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:border-slate-800 outline-hidden bg-slate-50 text-slate-900 placeholder:text-slate-400"
                  />
                </div>

                <button
                  id="submit-note-btn"
                  type="submit"
                  disabled={!inputContent.trim()}
                  className={`w-full text-center py-2.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center justify-center gap-1.5 ${
                    inputContent.trim() 
                      ? 'bg-slate-950 hover:bg-slate-900 text-white shadow-xs' 
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Check className="w-4 h-4" /> Ghim Lên Bảng
                </button>
              </form>
            </div>

            {/* Sticky Notes Grid Area */}
            <div className="lg:col-span-2 space-y-4">
              
              {/* Filter and Export controls */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
                {/* Visual challenge highlight */}
                <div className="flex items-center gap-2 max-w-md">
                  <div className="bg-amber-50 text-amber-700 p-1.5 rounded-lg border shrink-0">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Chủ đề đang làm việc:</span>
                    <p className="text-slate-900 text-xs font-bold truncate">{currentChallenge}</p>
                  </div>
                </div>

                {/* Real-time category filtration */}
                <div className="flex items-center gap-2">
                  <select
                    id="filter-category-select"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="text-xs bg-slate-50 border border-slate-250 p-1.5 rounded-lg text-slate-800 focus:outline-hidden cursor-pointer"
                  >
                    <option value="all">Hiện Tất Cả Thẻ</option>
                    <option value="problem">Lọc: Rào cản/Lỗi 🚨</option>
                    <option value="idea">Lọc: Ý tưởng mới 💡</option>
                    <option value="action">Lọc: Kế hoạch làm ⚡</option>
                    <option value="resource">Lọc: Nguồn lực 🛠️</option>
                  </select>

                  <button
                    id="btn-export-text"
                    onClick={handleExportText}
                    title="Xuất bản báo cáo Text dán slide thuyết trình"
                    className="bg-slate-900 hover:bg-slate-850 text-white font-bold p-1.5 rounded-lg border text-xs gap-1 cursor-pointer flex items-center"
                  >
                    <Download className="w-3.5 h-3.5" /> Xuất File TXT
                  </button>

                  <button
                    id="btn-clear-all"
                    onClick={handleClearAllNotes}
                    title="Xóa bảng sạch sẽ để làm thử thách mới"
                    className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold p-1.5 rounded-lg text-xs cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Sticky Notes Canvas */}
              {filteredNotes.length === 0 ? (
                <div className="bg-slate-100 border-2 border-dashed border-slate-300 rounded-3xl p-12 text-center text-slate-550 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center mx-auto text-slate-500">
                    <Layers className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Chưa có Thẻ ghi chú nào phù hợp!</h4>
                  <p className="text-xs max-w-sm mx-auto leading-relaxed">
                    Hãy điền nội dung vào khung bên trái để tự tạo những thẻ ghi chú ý kiến nhanh rực rỡ sắc màu, phân loại danh mục khoa học.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredNotes.map((note) => (
                    <div 
                      key={note.id}
                      className={`rounded-xl border border-slate-200/50 p-5 shadow-2xs relative flex flex-col justify-between transition-transform hover:-translate-y-0.5 ${getStickyColorClass(note.color)}`}
                    >
                      {/* Delete cross */}
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="absolute top-2.5 right-2.5 p-1 rounded-full text-slate-400 hover:text-red-650 hover:bg-slate-200/50 transition duration-150 cursor-pointer"
                        title="Xóa ghi chú"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      <div className="space-y-3">
                        {/* Note Badge Category */}
                        <div className="flex justify-between items-center pr-4">
                          <span className={`px-2 py-0.5 rounded-full border text-[9px] font-bold ${getCategoryBadgeClass(note.category)}`}>
                            {getCategoryLabel(note.category)}
                          </span>
                          <span className="text-[9px] text-slate-400 font-mono">{note.timestamp}</span>
                        </div>

                        {/* Note Content */}
                        <p className="text-xs font-normal text-slate-800 leading-relaxed font-sans min-h-[48px] whitespace-pre-wrap">
                          {note.content}
                        </p>
                      </div>

                      {/* Author stamp */}
                      <div className="border-t border-slate-200/40 pt-2 mt-3 flex items-center justify-between text-[10px] text-slate-500">
                        <span className="font-semibold block truncate text-slate-700">✍️ {note.author}</span>
                        <span className="text-slate-400 capitalize text-[9px] font-mono">Note Pad</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Board Quick Advice */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-slate-450 shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  <strong>Gợi ý tương tác:</strong> Các thành viên có thể sử dụng bảng tương tác này để cập nhật nhanh sáng kiến cá nhân, hoặc ủy thác cho Điều phối viên (Facilitator/Trưởng nhóm) tổng hợp trực tiếp lên màn hình trình chiếu chung, giúp hệ thống hoá tri thức và hạn chế tối đa sự trùng lặp ý tưởng trong thảo luận thực địa.
                </p>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Mental Frameworks Guide */}
      {activeTab === 'frameworks' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Menu Framework Picker */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2 h-fit shadow-2xs">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block px-2.5 pb-2 border-b">
              Chọn Bản Đồ Tư Duy
            </span>
            {BRAINSTORMING_FRAMEWORKS.map((fw) => (
              <button
                key={fw.id}
                id={`fw-select-${fw.id}`}
                onClick={() => setSelectedFramework(fw.id)}
                className={`w-full text-left px-3 py-2.5 rounded-xl transition text-xs font-bold block cursor-pointer ${
                  selectedFramework === fw.id 
                    ? 'bg-slate-900 text-white' 
                    : 'text-slate-650 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span>{fw.title.split(' (')[0]}</span>
              </button>
            ))}
          </div>

          {/* Core Framework Details Content */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs text-slate-900">
            {BRAINSTORMING_FRAMEWORKS.filter(f => f.id === selectedFramework).map((fw) => (
              <div key={fw.id} className="space-y-6 animate-fade-in">
                <div>
                  <h3 className="text-lg sm:text-2xl font-extrabold tracking-tight text-slate-900">{fw.title}</h3>
                  <span className="text-xs font-mono font-medium text-blue-600 tracking-wide block mt-1">{fw.subtitle}</span>
                  <p className="text-slate-500 text-xs sm:text-sm mt-3 leading-relaxed">{fw.description}</p>
                </div>

                <div className="h-px bg-slate-100" />

                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-900 font-mono uppercase tracking-wider">CÁC GIAI ĐOẠN / KỸ THUẬT TRIỂN KHAI:</h4>
                  <div className="space-y-4">
                    {fw.phases.map((p, index) => (
                      <div key={index} className="bg-slate-50 border border-slate-150 rounded-xl p-4 space-y-2.5">
                        <div className="flex items-center gap-2">
                          <span className="bg-slate-900 text-white text-[10px] font-mono font-bold w-5 h-5 rounded-full flex items-center justify-center">
                            {index + 1}
                          </span>
                          <span className="font-bold text-xs text-slate-900">{p.name}</span>
                        </div>
                        <p className="text-slate-500 text-xs leading-relaxed pl-7">{p.desc}</p>
                        
                        {/* Trigger Questions Box */}
                        <div className="pl-7 pt-1 space-y-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wider block">Ví dụ tình huống ngân hàng:</span>
                          <ul className="list-disc pl-4 space-y-1 text-slate-650 text-xs">
                            {p.triggerQuestions.map((q, qIdx) => (
                              <li key={qIdx} className="leading-relaxed list-inside font-normal italic">"{q}"</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Apply Framework Button to Sticky notes */}
                <div className="pt-2 flex justify-end">
                  <button
                    id={`apply-fw-btn-${fw.id}`}
                    onClick={() => {
                      setInputContent(`💡 [Sử dụng ${fw.title.split(' (')[0]}] Sáng kiến: `);
                      setInputCategory('idea');
                      setInputColor('yellow');
                      setActiveTab('sticky-board');
                    }}
                    className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition cursor-pointer"
                  >
                    Áp dụng mô hình này vào Bảng ghi chú <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Situational Application Guide */}
      {activeTab === 'scenarios' && (() => {
        const filteredScenarios = SCENARIO_CARDS.filter(card => {
          const matchesFilter = scenarioFilter === 'all' || card.category === scenarioFilter;
          const matchesSearch = searchQuery.trim() === '' || 
            card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            card.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
            card.keywords.some(kw => kw.toLowerCase().includes(searchQuery.toLowerCase())) ||
            card.whenToUse.some(text => text.toLowerCase().includes(searchQuery.toLowerCase()));
          return matchesFilter && matchesSearch;
        });

        const activeId = (expandedScenario && filteredScenarios.some(s => s.id === expandedScenario))
          ? expandedScenario
          : (filteredScenarios[0]?.id || null);

        const activeScenario = SCENARIO_CARDS.find(s => s.id === activeId) || null;

        return (
          <motion.div 
            initial={{ opacity: 0, y: 5 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="space-y-6"
          >
            {/* Search and Quick Filters Engine */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xs text-slate-950">
              <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                    <Compass className="w-5 h-5 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
                    Hệ Thống Định Vị Mô Hình Thực Chiến Ngân Hàng
                  </h3>
                  <p className="text-slate-500 text-xs mt-1">
                    Gặp vấn đề gì trong chi nhánh, phòng ban? Gõ từ khóa để hệ thống chẩn đoán mô hình phù hợp và hướng dẫn hành động tức khắc.
                  </p>
                </div>
                
                {/* Search Input Box */}
                <div className="relative w-full md:w-80 shrink-0">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    id="scenario-search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm theo lỗi: mâu thuẫn, đổ lỗi, silo, rườm rà..."
                    className="block w-full pl-9 pr-8 py-2 text-xs border border-slate-200 rounded-xl focus:border-slate-800 outline-hidden bg-slate-50/50 text-slate-900 placeholder:text-slate-400"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-650"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Popular Suggested Search Tags */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase font-mono mr-1">Gợi ý chẩn đoán nhanh:</span>
                {[
                  { tag: 'Xung đột 💥', query: 'mâu thuẫn' },
                  { tag: 'Làm việc biệt lập (Silo) 🧱', query: 'silo' },
                  { tag: 'Sợ sếp chê / Thụ động 🫣', query: 'nhút nhát' },
                  { tag: 'Duyệt hồ sơ chậm ⏰', query: 'chậm' },
                  { tag: 'Quy trình rườm rà 📄', query: 'rườm rà' }
                ].map((item) => (
                  <button
                    key={item.tag}
                    onClick={() => {
                      setSearchQuery(item.query);
                      setScenarioFilter('all');
                    }}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border transition cursor-pointer ${
                      searchQuery === item.query 
                        ? 'bg-amber-100 text-amber-800 border-amber-300' 
                        : 'bg-slate-50 text-slate-600 border-slate-250 hover:bg-slate-100'
                    }`}
                  >
                    {item.tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Category Tabs Container */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: '💡 Tất cả mô hình', count: SCENARIO_CARDS.length },
                { id: 'teamwork', label: '👥 Tương tác nhóm', count: SCENARIO_CARDS.filter(s => s.category === 'teamwork').length },
                { id: 'operational', label: '⚡ Quy mô vận hành', count: SCENARIO_CARDS.filter(s => s.category === 'operational').length },
                { id: 'creativity', label: '🚀 Cải tiến sáng tạo', count: SCENARIO_CARDS.filter(s => s.category === 'creativity').length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setScenarioFilter(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition duration-150 cursor-pointer ${
                    scenarioFilter === tab.id 
                      ? 'bg-slate-950 text-white border-slate-950 shadow-xs' 
                      : 'bg-white text-slate-650 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {tab.label} <span className="text-[10px] font-mono opacity-60 ml-0.5">({tab.count})</span>
                </button>
              ))}
            </div>

            {/* Split Screen Master Detail View */}
            {filteredScenarios.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center text-slate-500 space-y-3 shadow-2xs">
                <div className="w-12 h-12 rounded-full bg-slate-100 border flex items-center justify-center mx-auto text-slate-450">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Không tìm thấy Mô Hình phù hợp với từ khóa "{searchQuery}"</h4>
                <p className="text-xs max-w-md mx-auto leading-relaxed">
                  Hãy thử tìm kiếm với các từ khóa khái quát hơn (như: mâu thuẫn, kiểm soát, họp, rủi ro, cải tiến, sáng tạo...) hoặc bấm nút "Tôi muốn chuẩn đoán" ở phía trên.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setScenarioFilter('all');
                  }}
                  className="mt-2 text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  Xóa bộ lọc để quay lại danh sách đầy đủ
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left Side: Master List of Frameworks */}
                <div className="lg:col-span-5 space-y-2.5">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase block pl-1">
                    BÀI TOÁN PHÙ HỢP ({filteredScenarios.length})
                  </span>
                  <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
                    {filteredScenarios.map((scen) => {
                      const isActive = scen.id === activeId;
                      return (
                        <button
                          key={scen.id}
                          onClick={() => setExpandedScenario(scen.id)}
                          className={`w-full text-left p-4 rounded-2xl border transition duration-150 cursor-pointer text-slate-900 block relative ${
                            isActive
                              ? `${scen.bgColor} border-2 border-slate-900 shadow-xs ring-1 ring-slate-900`
                              : 'bg-white border-slate-200 hover:border-slate-350 hover:bg-slate-50/50'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-xs font-mono font-bold ${scen.iconBg}`}>
                              {scen.name.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <span className="text-[9px] font-mono font-bold tracking-wider text-slate-400 block uppercase truncate">
                                  {scen.moduleLabel}
                                </span>
                                <span className="text-[9px] font-semibold text-slate-500 bg-slate-100 rounded-md px-1.5 py-0.2">
                                  {scen.categoryLabel}
                                </span>
                              </div>
                              <h4 className="text-xs font-bold text-slate-900 mt-1 truncate">{scen.name}</h4>
                              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1 italic">{scen.tagline}</p>
                            </div>
                          </div>
                          {isActive && (
                            <div className="absolute right-3 bottom-3 w-1.5 h-1.5 bg-slate-950 rounded-full animate-ping" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right Side: Detailed Workspace View */}
                <div className="lg:col-span-7">
                  {activeScenario && (
                    <motion.div
                      key={activeScenario.id}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xs relative overflow-hidden"
                    >
                      {/* Decorative corner tag */}
                      <div className="absolute top-0 right-0 bg-slate-950 text-white text-[9px] font-mono tracking-widest px-4 py-1.5 rounded-bl-xl font-bold uppercase">
                        Active Diagnostician
                      </div>

                      {/* Header Section */}
                      <div>
                        <span className="text-[10px] font-mono font-bold tracking-widest text-blue-600 block uppercase">
                          💡 {activeScenario.moduleLabel} ({activeScenario.categoryLabel})
                        </span>
                        <h3 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
                          {activeScenario.name}
                        </h3>
                        <p className="text-slate-650 text-xs sm:text-sm leading-relaxed mt-2.5 font-medium border-l-2 border-slate-900 pl-3 bg-slate-50/50 py-1.5 rounded-r">
                          "{activeScenario.tagline}"
                        </p>
                      </div>

                      <div className="h-px bg-slate-100" />

                      {/* When To Use / Bối cảnh ứng dụng */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold text-slate-900 font-mono tracking-wider flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          KHI NÀO CẦN ỨNG DỤNG? (Bối cảnh điển hình)
                        </h4>
                        <div className="space-y-2">
                          {activeScenario.whenToUse.map((text, index) => (
                            <div key={index} className="flex gap-2.5 items-start text-xs text-slate-705 bg-red-50/20 p-2.5 rounded-xl border border-red-100/45">
                              <span className="text-red-500 font-mono font-bold mt-0.5 shrink-0">🚨</span>
                              <p className="leading-relaxed font-normal text-slate-800 text-left">{text}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* How To Apply / Ứng dụng ra sao? */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold text-slate-900 font-mono tracking-wider flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                          QUY TRÌNH TRIỂN KHAI THỰC TẾ (Ứng dụng ra sao?)
                        </h4>
                        <div className="space-y-2.5">
                          {activeScenario.howToApply.map((text, index) => (
                            <div key={index} className="flex gap-3 bg-slate-50 border border-slate-100 p-3.5 rounded-xl text-xs text-slate-650">
                              <span className="bg-teal-500 text-slate-950 font-black w-5 h-5 rounded-full text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                                {index + 1}
                              </span>
                              <p className="leading-relaxed text-slate-800 font-normal text-left">{text}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Golden Formula / Công thức vàng dễ nhớ */}
                      <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-950 text-white relative border-l-4 border-amber-400">
                        <div className="flex items-start gap-2.5 relative z-10">
                          <Sparkles className="w-4.5 h-4.5 text-amber-300 shrink-0 mt-0.5 animate-bounce" />
                          <div className="space-y-0.5 text-left">
                            <span className="text-[9px] font-mono font-bold tracking-widest text-amber-300 block uppercase">
                              CHÌA KHÓA VÀNG DỄ NHỚ
                            </span>
                            <p className="text-xs sm:text-sm font-bold font-serif-academic text-amber-100 italic leading-snug">
                              {activeScenario.goldenFormula}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Actions footer */}
                      <div className="pt-4 border-t border-slate-150 flex flex-wrap gap-3 justify-end items-center">
                        <span className="text-[10px] text-slate-400 font-mono italic">
                          *Chọn áp dụng sẽ ghi thông tin mẫu vào tab 1
                        </span>
                        <button
                          id={`use-template-btn-${activeScenario.id}`}
                          onClick={() => {
                            setInputContent(activeScenario.templateText);
                            setInputCategory('idea');
                            setInputColor('yellow');
                            setActiveTab('sticky-board');
                            // Focus target input content
                            setTimeout(() => {
                              const el = document.getElementById('note-input-content');
                              if (el) el.focus();
                            }, 150);
                          }}
                          className="bg-slate-950 hover:bg-slate-900 text-white font-extrabold text-xs px-5 py-3 rounded-xl inline-flex items-center gap-2 transition cursor-pointer shadow-xs border-0"
                        >
                          <Check className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                          <span>Áp dụng mẫu & Thực hành trên Bảng Động Não</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>

              </div>
            )}

          </motion.div>
        );
      })()}


    </div>
  );
}
