"use client";

import { useEffect, useRef, useState } from "react";

type Language = "en" | "th" | "zh";

const content = {
  en: {
    nav: ["Services", "Method", "Proof"],
    contact: "Book a consultation",
    heroEyebrow: "Thailand · Brand · Commerce · Growth",
    heroTitleA: "From attention",
    heroTitleB: "to revenue.",
    heroIntro:
      "Prompt Rich unites brand strategy, TikTok commerce, creators, content and paid media—so growth works as one connected system.",
    explore: "Explore our work",
    proof: "See the numbers",
    heroNotes: ["Built in Thailand", "Thai · 中文 · English", "Operator-led"],
    audienceEyebrow: "Where growth gets stuck",
    audienceTitle: "Good products still lose momentum.",
    audienceBody:
      "We step in when strategy, content, commerce and execution stop working as one connected system.",
    audiences: [
      "Sales plateau despite more activity",
      "Ad spend grows faster than profitable revenue",
      "Content, LIVE and store teams work in silos",
      "Local execution is missing or inconsistent",
    ],
    serviceEyebrow: "What we do",
    serviceTitle: "Five capabilities. One commercial system.",
    services: [
      ["Brand & marketing agency", "Positioning, identity, campaigns and integrated market execution."],
      ["TikTok Shop operations", "Store, content, LIVE, service and commercial rhythm—managed end to end."],
      ["Performance media", "Paid growth designed around attributable revenue, not surface-level reach."],
      ["KOL & creator marketing", "Creator strategy, selection, content collaborations and campaign coordination."],
      ["Thailand market entry", "Research, localisation, route-to-market and operating support."],
    ],
    caseEyebrow: "Operator proof · GMG",
    caseTitleA: "Build a brand.",
    caseTitleB: "Not a dependency.",
    caseBody:
      "GMG began with an early creator partnership. Prompt Rich is now building the independent brand system behind its next stage of growth—from identity and LIVE to content, store operations and paid media.",
    caseWindow: "30 days ending 26 Jul 2026",
    metricLabels: ["GMV", "vs previous 30 days", "orders", "customers"],
    liveLabel: "GMV from LIVE",
    adWindow: "GMV Max · 19–26 Jul 2026",
    adLabels: ["Ad spend", "Attributed revenue", "ROI", "Cost / SKU order"],
    systemSteps: [
      ["01", "Brand system", "A clearer identity built to outlast any single personality."],
      ["02", "LIVE engine", "87.2% of GMV powered by a managed live-commerce operation."],
      ["03", "Paid growth", "THB 162.9K spend generated THB 2.68M attributed revenue."],
    ],
    proofEyebrow: "More than one success story",
    proofTitle: "Experience across brands, creators and commerce.",
    proofCards: [
      ["THB 10M+", "Verified monthly GMV", "MissyClassy · single TikTok Shop"],
      ["39", "Direct client brands", "Beauty · fashion · technology · consumer"],
      ["1,000+", "Creator resources", "Beauty · fashion · lifestyle · more"],
    ],
    workEyebrow: "Direct client experience",
    workNote:
      "A growing portfolio of direct client engagements across beauty, fashion, technology, food and consumer commerce.",
    methodEyebrow: "How we work",
    methodTitle: "A clear path from diagnosis to scale.",
    methodBody:
      "Every engagement moves through measurable decisions, coordinated execution and a repeatable learning loop.",
    methodSteps: [
      ["01", "Discover", "Business goals, constraints, economics and current operating data."],
      ["02", "Design", "Strategy, channel priorities, KPI architecture and an execution roadmap."],
      ["03", "Operate", "Store, content, LIVE and paid media run together on one commercial cadence."],
      ["04", "Optimise & scale", "Performance data becomes the next decision—not just another report."],
    ],
    externalEyebrow: "External client proof · Y.O.U",
    externalTitleA: "One conversion asset.",
    externalTitleB: "36 million views.",
    externalBody:
      "A sales-conversion video executed for the Thailand market reached 36M views—evidence that local creative execution can turn product communication into scale.",
    externalSteps: [
      ["01", "Challenge", "Build product communication that could scale in the Thailand market."],
      ["02", "Intervention", "A sales-conversion video created and executed for the local audience."],
      ["03", "Result", "36M views on one sales-conversion video."],
    ],
    externalResult: "VIEWS",
    midCtaText: "Facing a similar growth challenge?",
    midCtaAction: "Book a growth consultation",
    platformEyebrow: "Omnichannel operating experience",
    platformTitle: "We work where commerce happens.",
    platformBody:
      "These are channels our team has operated. They demonstrate hands-on experience, not platform endorsement.",
    media: "Client projects and selected team members have received media coverage.",
    closeEyebrow: "Built in Thailand. Fluent in growth.",
    closeTitleA: "Ready for your",
    closeTitleB: "next commercial chapter?",
    closeBody:
      "Bring us the market question. We will connect strategy, creators, commerce and execution.",
    line: "Add LINE",
    proposal: "Request a proposal",
    placeholder: "Contact details are placeholders for design review.",
    modalTitle: "The conversation starts here.",
    modalBody:
      "This contact channel will be connected before launch. For now, this panel demonstrates the final consultation experience.",
    modalClose: "Close",
    legal: "PROMRIT INTERTRADING CO., LTD.",
  },
  th: {
    nav: ["บริการ", "วิธีการทำงาน", "ผลงาน"],
    contact: "นัดหมายปรึกษา",
    heroEyebrow: "ประเทศไทย · แบรนด์ · คอมเมิร์ซ · การเติบโต",
    heroTitleA: "เปลี่ยนความสนใจ",
    heroTitleB: "ให้เป็นรายได้",
    heroIntro:
      "Prompt Rich เชื่อมกลยุทธ์แบรนด์ TikTok Commerce ครีเอเตอร์ คอนเทนต์ และสื่อโฆษณาให้ทำงานเป็นระบบเดียวกัน",
    explore: "ดูผลงานของเรา",
    proof: "ดูผลลัพธ์",
    heroNotes: ["สร้างและดำเนินงานในประเทศไทย", "ไทย · 中文 · English", "บริหารโดยผู้ลงมือทำจริง"],
    audienceEyebrow: "จุดที่การเติบโตมักติดขัด",
    audienceTitle: "สินค้าที่ดีก็ยังเสียโมเมนตัมได้",
    audienceBody:
      "เราเข้ามาเมื่อกลยุทธ์ คอนเทนต์ คอมเมิร์ซ และการลงมือทำยังไม่เชื่อมเป็นระบบเดียวกัน",
    audiences: [
      "ยอดขายหยุดโต แม้กิจกรรมจะเพิ่มขึ้น",
      "ค่าโฆษณาโตเร็วกว่ารายได้ที่ทำกำไร",
      "คอนเทนต์ LIVE และร้านค้าทำงานแยกกัน",
      "การดำเนินงานในตลาดไทยยังไม่ต่อเนื่อง",
    ],
    serviceEyebrow: "บริการของเรา",
    serviceTitle: "5 ความสามารถ เชื่อมเป็นระบบการเติบโตเดียว",
    services: [
      ["Brand & Marketing Agency", "วางตำแหน่งแบรนด์ อัตลักษณ์ แคมเปญ และการตลาดแบบบูรณาการ"],
      ["TikTok Shop Operations", "ดูแลร้านค้า คอนเทนต์ LIVE บริการ และจังหวะการขายแบบครบวงจร"],
      ["Performance Media", "วางระบบโฆษณาที่มุ่งรายได้ซึ่งตรวจสอบและวัดผลได้"],
      ["KOL & Creator Marketing", "วางกลยุทธ์ครีเอเตอร์ คัดเลือก ประสานงานคอนเทนต์ และบริหารแคมเปญ"],
      ["Thailand Market Entry", "วิจัยตลาด โลคัลไลซ์ ช่องทางเข้าสู่ตลาด และการสนับสนุนการดำเนินงาน"],
    ],
    caseEyebrow: "ผลงานจากการลงมือทำ · GMG",
    caseTitleA: "สร้างให้เป็นแบรนด์",
    caseTitleB: "ไม่ใช่การพึ่งพาบุคคล",
    caseBody:
      "GMG เริ่มต้นจากความร่วมมือกับครีเอเตอร์ในช่วงแรก ปัจจุบัน Prompt Rich กำลังสร้างระบบแบรนด์ที่เป็นอิสระ ตั้งแต่อัตลักษณ์ LIVE คอนเทนต์ ร้านค้า ไปจนถึงสื่อโฆษณา",
    caseWindow: "30 วัน สิ้นสุดวันที่ 26 ก.ค. 2026",
    metricLabels: ["GMV", "เทียบกับ 30 วันก่อนหน้า", "คำสั่งซื้อ", "ลูกค้า"],
    liveLabel: "GMV จาก LIVE",
    adWindow: "GMV Max · 19–26 ก.ค. 2026",
    adLabels: ["ค่าโฆษณา", "รายได้จากโฆษณา", "ROI", "ต้นทุน / คำสั่งซื้อ SKU"],
    systemSteps: [
      ["01", "ระบบแบรนด์", "สร้างอัตลักษณ์ที่แข็งแรงกว่าการพึ่งพาบุคคลใดบุคคลหนึ่ง"],
      ["02", "เครื่องยนต์ LIVE", "87.2% ของ GMV มาจากระบบไลฟ์คอมเมิร์ซที่บริหารอย่างเป็นระบบ"],
      ["03", "การเติบโตจากโฆษณา", "ค่าโฆษณา 162.9K บาท สร้างรายได้จากโฆษณา 2.68M บาท"],
    ],
    proofEyebrow: "มากกว่าหนึ่งเรื่องราวความสำเร็จ",
    proofTitle: "ประสบการณ์ครอบคลุมแบรนด์ ครีเอเตอร์ และคอมเมิร์ซ",
    proofCards: [
      ["10M+ บาท", "GMV รายเดือนที่มีหลักฐานยืนยัน", "MissyClassy · TikTok Shop ร้านเดียว"],
      ["39", "แบรนด์ลูกค้าโดยตรง", "ความงาม · แฟชั่น · เทคโนโลยี · สินค้าอุปโภคบริโภค"],
      ["1,000+", "เครือข่ายครีเอเตอร์", "ความงาม · แฟชั่น · ไลฟ์สไตล์ · อื่น ๆ"],
    ],
    workEyebrow: "ประสบการณ์ลูกค้าโดยตรง",
    workNote:
      "ผลงานจากการทำงานโดยตรงกับลูกค้าในกลุ่มความงาม แฟชั่น เทคโนโลยี อาหาร และสินค้าอุปโภคบริโภค",
    methodEyebrow: "วิธีการทำงาน",
    methodTitle: "เส้นทางที่ชัดเจน จากการวิเคราะห์สู่การขยายผล",
    methodBody:
      "ทุกโปรเจกต์ขับเคลื่อนด้วยการตัดสินใจที่วัดผลได้ การทำงานร่วมกัน และวงจรเรียนรู้ที่ทำซ้ำได้",
    methodSteps: [
      ["01", "ค้นหาโจทย์", "เป้าหมาย ข้อจำกัด เศรษฐศาสตร์ธุรกิจ และข้อมูลการดำเนินงานปัจจุบัน"],
      ["02", "ออกแบบ", "กลยุทธ์ ลำดับความสำคัญของช่องทาง โครงสร้าง KPI และแผนปฏิบัติการ"],
      ["03", "ลงมือทำ", "ร้านค้า คอนเทนต์ LIVE และสื่อโฆษณาทำงานบนจังหวะการขายเดียวกัน"],
      ["04", "ปรับและขยาย", "เปลี่ยนข้อมูลผลลัพธ์ให้เป็นการตัดสินใจครั้งถัดไป ไม่ใช่แค่รายงาน"],
    ],
    externalEyebrow: "ผลงานลูกค้าภายนอก · Y.O.U",
    externalTitleA: "วิดีโอเพื่อการขายหนึ่งชิ้น",
    externalTitleB: "ยอดชม 36 ล้านครั้ง",
    externalBody:
      "วิดีโอเพื่อการขายสำหรับตลาดไทยทำยอดชมได้ 36M ครั้ง สะท้อนความสามารถในการเปลี่ยนการสื่อสารสินค้าให้เป็นการเข้าถึงในวงกว้าง",
    externalSteps: [
      ["01", "โจทย์", "สร้างการสื่อสารสินค้าที่สามารถขยายการเข้าถึงในตลาดไทย"],
      ["02", "การดำเนินงาน", "สร้างและดำเนินงานวิดีโอเพื่อการขายสำหรับผู้ชมในประเทศไทย"],
      ["03", "ผลลัพธ์", "วิดีโอเพื่อการขายหนึ่งชิ้นทำยอดชม 36M ครั้ง"],
    ],
    externalResult: "ยอดชม",
    midCtaText: "กำลังเจอความท้าทายด้านการเติบโตแบบเดียวกันหรือไม่?",
    midCtaAction: "นัดหมายวิเคราะห์การเติบโต",
    platformEyebrow: "ประสบการณ์ดำเนินงานแบบ Omnichannel",
    platformTitle: "เราทำงานในทุกพื้นที่ที่การค้าเกิดขึ้น",
    platformBody:
      "แพลตฟอร์มเหล่านี้คือช่องทางที่ทีมเคยดำเนินงานจริง แสดงถึงประสบการณ์ในการปฏิบัติงาน ไม่ใช่การอ้างการรับรองจากแพลตฟอร์ม",
    media: "โครงการของลูกค้าและสมาชิกทีมบางส่วนเคยได้รับการนำเสนอผ่านสื่อ",
    closeEyebrow: "สร้างในประเทศไทย เข้าใจการเติบโต",
    closeTitleA: "พร้อมสำหรับ",
    closeTitleB: "บทต่อไปของธุรกิจหรือยัง?",
    closeBody:
      "ส่งคำถามทางการตลาดมาให้เรา แล้วเราจะเชื่อมกลยุทธ์ ครีเอเตอร์ คอมเมิร์ซ และการลงมือทำเข้าด้วยกัน",
    line: "เพิ่ม LINE",
    proposal: "ขอรับข้อเสนอ",
    placeholder: "ข้อมูลติดต่อเป็นข้อความชั่วคราวสำหรับตรวจงานออกแบบ",
    modalTitle: "เริ่มต้นการสนทนาที่นี่",
    modalBody:
      "ช่องทางติดต่อนี้จะเชื่อมต่อก่อนเปิดเว็บไซต์จริง ขณะนี้หน้าต่างนี้ใช้เพื่อแสดงประสบการณ์การนัดหมายในเวอร์ชันสุดท้าย",
    modalClose: "ปิด",
    legal: "พร้อมริช อินเตอร์เทรดดิ้ง",
  },
  zh: {
    nav: ["服务", "方法", "案例"],
    contact: "预约咨询",
    heroEyebrow: "泰国 · 品牌 · 电商 · 增长",
    heroTitleA: "从获得关注",
    heroTitleB: "到创造收入。",
    heroIntro:
      "Prompt Rich将品牌战略、TikTok电商、达人、内容与付费投放整合成一套协同运转的增长系统。",
    explore: "了解我们的能力",
    proof: "查看真实数据",
    heroNotes: ["扎根泰国", "泰语 · 中文 · English", "实战团队主导"],
    audienceEyebrow: "增长通常卡在哪里",
    audienceTitle: "好产品也会失去增长动能。",
    audienceBody:
      "当战略、内容、电商和执行无法作为一个系统协同工作时，我们介入解决问题。",
    audiences: ["工作越来越多，销售却停止增长", "广告投入增长快于盈利收入", "内容、直播和店铺团队各自为战", "本地执行能力缺失或不稳定"],
    serviceEyebrow: "我们的服务",
    serviceTitle: "五项能力，一套商业增长系统。",
    services: [
      ["品牌与营销代理", "从定位、视觉识别到整合营销活动与市场执行。"],
      ["TikTok Shop运营", "店铺、内容、直播、客服及销售节奏的一体化管理。"],
      ["效果广告投放", "围绕可归因收入设计投放，而不是只追求表面曝光。"],
      ["KOL与达人营销", "达人策略、筛选、内容合作及营销活动管理。"],
      ["泰国市场进入咨询", "市场研究、本地化、渠道策略及实际运营支持。"],
    ],
    caseEyebrow: "实战案例 · GMG",
    caseTitleA: "建立一个品牌，",
    caseTitleB: "而不是一种依赖。",
    caseBody:
      "GMG早期通过达人合作完成起盘。现在，Prompt Rich正在搭建支撑下一阶段增长的独立品牌系统——覆盖品牌形象、直播、内容、店铺运营与付费投放。",
    caseWindow: "截至2026年7月26日的30天",
    metricLabels: ["GMV", "较前30天", "订单", "客户"],
    liveLabel: "直播贡献GMV",
    adWindow: "GMV Max · 2026年7月19–26日",
    adLabels: ["广告花费", "广告归因收入", "ROI", "单个SKU订单成本"],
    systemSteps: [
      ["01", "品牌系统", "建立不依赖任何单一个人的独立品牌资产。"],
      ["02", "直播引擎", "87.2%的GMV来自系统化管理的直播电商。"],
      ["03", "付费增长", "THB 162.9K广告花费带来THB 2.68M广告归因收入。"],
    ],
    proofEyebrow: "不止一个成功案例",
    proofTitle: "覆盖品牌、达人与电商的真实经验。",
    proofCards: [
      ["THB 10M+", "有后台证据的单月GMV", "MissyClassy · 单个TikTok Shop店铺"],
      ["39", "直接客户品牌", "美妆 · 时尚 · 科技 · 消费品"],
      ["1,000+", "达人资源", "美妆 · 时尚 · 生活方式 · 更多"],
    ],
    workEyebrow: "直接客户经验",
    workNote: "覆盖美妆、时尚、科技、餐饮与消费电商的直接客户合作经验。",
    methodEyebrow: "我们的工作方法",
    methodTitle: "从诊断问题到规模增长的清晰路径。",
    methodBody: "每个项目都围绕可衡量的决策、协同执行和可重复的学习循环推进。",
    methodSteps: [
      ["01", "发现问题", "明确业务目标、限制条件、商业模型及当前运营数据。"],
      ["02", "设计方案", "制定战略、渠道优先级、KPI体系和执行路线图。"],
      ["03", "协同执行", "让店铺、内容、直播和付费投放按照统一商业节奏运转。"],
      ["04", "优化与放大", "让每一轮绩效数据成为下一次决策，而不只是另一份报告。"],
    ],
    externalEyebrow: "外部客户案例 · Y.O.U",
    externalTitleA: "一条销售转化视频，",
    externalTitleB: "获得3600万播放。",
    externalBody:
      "面向泰国市场执行的销售转化视频获得36M播放，证明本地化内容执行能够把产品沟通转化为规模化触达。",
    externalSteps: [
      ["01", "业务问题", "为产品建立能够在泰国市场规模传播的内容。"],
      ["02", "Prompt Rich介入", "面向泰国受众制作并执行销售转化视频。"],
      ["03", "结果", "单条销售转化视频获得36M播放。"],
    ],
    externalResult: "播放量",
    midCtaText: "正在面对类似的增长问题？",
    midCtaAction: "预约增长诊断",
    platformEyebrow: "全渠道运营经验",
    platformTitle: "在电商发生的地方工作。",
    platformBody:
      "这些是团队实际运营过的渠道，代表真实执行经验，并不表示相关平台对Prompt Rich提供官方背书。",
    media: "团队执行的客户项目及部分团队成员曾获得媒体报道。",
    closeEyebrow: "扎根泰国，精通增长。",
    closeTitleA: "准备开启下一段",
    closeTitleB: "商业增长了吗？",
    closeBody: "告诉我们你的市场问题，我们将战略、达人、电商与执行连接起来。",
    line: "添加LINE",
    proposal: "索取方案",
    placeholder: "联系信息为视觉评审占位内容。",
    modalTitle: "从一次对话开始。",
    modalBody: "正式发布前将接入真实联系方式。目前此界面用于展示最终的咨询预约体验。",
    modalClose: "关闭",
    legal: "PROMRIT INTERTRADING CO., LTD.",
  },
} as const;

const clients = [
  { name: "Estée Lauder", logo: "/clients/estee-lauder.jpeg" },
  { name: "Kiehl’s", logo: "/clients/kiehls.jpeg" },
  { name: "Eve Lom", logo: "/clients/eve-lom.jpeg" },
  { name: "Y.O.U", logo: "/clients/you.png" },
  { name: "by.t", logo: "/clients/byt.png" },
  { name: "O.TWO.O", logo: "/clients/otwoo.png" },
  { name: "Dazzle Me", logo: "/clients/dazzle-me.png" },
  { name: "SKINTIFIC", logo: "/clients/skintific.png" },
  { name: "SOMETHINC", logo: "/clients/somethinc.png" },
  { name: "GrabMart", logo: "/clients/grabmart.png" },
  { name: "Lavojoy", logo: "/clients/lavojoy.png" },
  { name: "SK-II", logo: "/clients/skii.png" },
  { name: "SEYVEN", logo: "/clients/seyven.png" },
  { name: "La Mer", logo: "/clients/la-mer.png" },
  { name: "Lancôme", logo: "/clients/lancome.jpeg" },
  { name: "Studio Tropik", logo: "/clients/studio-tropik.png" },
  { name: "Salsa", logo: "/clients/salsa.png" },
  { name: "L’Oréal Paris", logo: "/clients/loreal-paris.png" },
  { name: "Clé de Peau Beauté", logo: "/clients/cle-de-peau.jpeg" },
  { name: "NPURE", logo: "/clients/npure.png" },
  { name: "Scarlett", logo: "/clients/scarlett.png" },
  { name: "BROS Fried Chicken", logo: "/clients/bros-fried-chicken.png" },
  { name: "MAKUKU", logo: "/clients/makuku.png" },
  { name: "Barenbliss", logo: "/clients/barenbliss.png" },
  { name: "vivo", logo: "/clients/vivo.png" },
  { name: "TeraBox", logo: "/clients/terabox.png" },
  { name: "Made To Clothes", logo: "/clients/made-to-clothes.jpg" },
  { name: "ลูกสาวคุณนาย", logo: "/clients/luksao-khunnai.png" },
  { name: "PRIMAYA", logo: "/clients/primaya.jpg" },
  { name: "YG", logo: "/clients/yg.jpg" },
  { name: "OMOM", logo: "/clients/omom.jpg" },
  { name: "BASICS BY SITA", logo: "/clients/basics-by-sita.jpg" },
  { name: "mauv", logo: "/clients/mauv.jpg" },
  { name: "The Karaked", logo: "/clients/the-karaked.jpg" },
  { name: "Kloset Dress Secret", logo: "/clients/kloset.jpg" },
  { name: "Bloom Boom", logo: "/clients/bloom-boom.jpg" },
  { name: "Mogwany Closet", logo: "/clients/mogwany-closet.jpg" },
  { name: "Wanna Accessories by Wheang", logo: "/clients/wanna-accessories.jpg" },
  { name: "ORZENIC", logo: "/clients/orzenic.png" },
] as const;

const clientRows = [clients.slice(0, 20), clients.slice(20)];

const platforms = [
  "TikTok Shop",
  "Instagram",
  "Facebook",
  "Shopee",
  "Lazada",
  "Amazon",
  "AliExpress",
  "Shopify",
  "eBay",
];

const media = ["VOGUE", "Harper's BAZAAR", "Madame Figaro"];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function Experience() {
  const [language, setLanguage] = useState<Language>("en");
  const [contactOpen, setContactOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const caseRef = useRef<HTMLElement>(null);
  const t = content[language];

  useEffect(() => {
    document.documentElement.lang =
      language === "zh" ? "zh-CN" : language === "th" ? "th" : "en";
  }, [language]);

  useEffect(() => {
    const reveals = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 },
    );
    reveals.forEach((element) => {
      const bounds = element.getBoundingClientRect();
      if (bounds.top < window.innerHeight * 0.96 && bounds.bottom > 0) {
        element.classList.add("is-visible");
      }
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [language]);

  useEffect(() => {
    let ticking = false;
    const updateScroll = () => {
      const maximum =
        document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty(
        "--page-progress",
        `${maximum > 0 ? window.scrollY / maximum : 0}`,
      );

      const section = caseRef.current;
      if (section) {
        const bounds = section.getBoundingClientRect();
        const travel = section.offsetHeight - window.innerHeight;
        const progress = Math.min(
          1,
          Math.max(0, -bounds.top / Math.max(travel, 1)),
        );
        section.style.setProperty("--case-progress", `${progress}`);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    const onPointer = (event: PointerEvent) => {
      const hero = heroRef.current;
      if (!hero) return;
      const bounds = hero.getBoundingClientRect();
      hero.style.setProperty(
        "--pointer-x",
        `${(event.clientX - bounds.left) / bounds.width - 0.5}`,
      );
      hero.style.setProperty(
        "--pointer-y",
        `${(event.clientY - bounds.top) / bounds.height - 0.5}`,
      );
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setContactOpen(false);
    };

    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    heroRef.current?.addEventListener("pointermove", onPointer);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
      heroRef.current?.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <main className={`site language-${language}`}>
      <div className="page-progress" aria-hidden="true" />

      <nav className="topbar" aria-label="Primary navigation">
        <a className="wordmark" href="#top" aria-label="Prompt Rich home">
          <span className="wordmark-mark">PR</span>
          <span className="wordmark-name">Prompt Rich</span>
        </a>
        <div className="nav-links">
          <a href="#services">{t.nav[0]}</a>
          <a href="#method">{t.nav[1]}</a>
          <a href="#proof">{t.nav[2]}</a>
        </div>
        <div className="nav-actions">
          <div className="language-switcher" aria-label="Language">
            {(["en", "th", "zh"] as Language[]).map((code) => (
              <button
                type="button"
                aria-pressed={language === code}
                className={language === code ? "is-active" : ""}
                key={code}
                onClick={() => setLanguage(code)}
              >
                {code === "en" ? "EN" : code === "th" ? "ไทย" : "中"}
              </button>
            ))}
          </div>
          <button
            className="nav-cta"
            type="button"
            onClick={() => setContactOpen(true)}
          >
            {t.contact}
          </button>
        </div>
      </nav>

      <section id="top" ref={heroRef} className="hero dark-section">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow" data-reveal>
            {t.heroEyebrow}
          </p>
          <h1 data-reveal>
            <span>{t.heroTitleA}</span>
            <span className="hero-accent">{t.heroTitleB}</span>
          </h1>
          <p className="hero-intro" data-reveal>
            {t.heroIntro}
          </p>
          <div className="hero-actions" data-reveal>
            <a href="#services" className="primary-button">
              {t.explore} <Arrow />
            </a>
            <a href="#proof" className="quiet-button">
              {t.proof}
            </a>
          </div>
        </div>

        <div className="growth-stage" aria-hidden="true">
          <div className="growth-ring ring-one"><i /></div>
          <div className="growth-ring ring-two"><i /></div>
          <div className="growth-ring ring-three"><i /></div>
          <div className="growth-core">
            <span>PR</span>
            <small>THAILAND</small>
          </div>
          <div className="data-float data-float-one">
            <small>30D GMV</small>
            <strong>฿7.48M</strong>
            <span>+33.29%</span>
          </div>
          <div className="data-float data-float-two">
            <small>AD ROI</small>
            <strong>16.45</strong>
            <span>GMV MAX</span>
          </div>
          <div className="data-float data-float-three">
            <small>CREATORS</small>
            <strong>1,000+</strong>
            <span>TH NETWORK</span>
          </div>
        </div>

        <div className="hero-notes">
          {t.heroNotes.map((note) => <span key={note}>{note}</span>)}
        </div>
        <a className="scroll-cue" href="#audience" aria-label="Scroll to next section">
          <i />
          <span>SCROLL</span>
        </a>
      </section>

      <section id="audience" className="audience light-section">
        <div className="section-shell audience-layout">
          <div>
            <p className="eyebrow dark-eyebrow" data-reveal>
              {t.audienceEyebrow}
            </p>
            <h2 data-reveal>{t.audienceTitle}</h2>
          </div>
          <div className="audience-side">
            <p data-reveal>{t.audienceBody}</p>
            <div className="audience-tags" data-reveal>
              {t.audiences.map((audience, index) => (
                <span key={audience}>
                  <i>0{index + 1}</i>
                  {audience}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="services dark-section">
        <div className="section-shell">
          <div className="services-heading">
            <p className="eyebrow" data-reveal>{t.serviceEyebrow}</p>
            <h2 data-reveal>{t.serviceTitle}</h2>
          </div>
          <div className="service-list">
            {t.services.map(([name, description], index) => (
              <article className="service-row" data-reveal key={`service-${index}`}>
                <span className="service-index">0{index + 1}</span>
                <h3>{name}</h3>
                <p>{description}</p>
                <span className="service-arrow" aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="method" className="method light-section">
        <div className="section-shell">
          <div className="method-heading">
            <div>
              <p className="eyebrow dark-eyebrow" data-reveal>{t.methodEyebrow}</p>
              <h2 data-reveal>{t.methodTitle}</h2>
            </div>
            <p data-reveal>{t.methodBody}</p>
          </div>
          <div className="method-grid">
            {t.methodSteps.map(([step, name, detail]) => (
              <article data-reveal key={step}>
                <span>{step}</span>
                <div>
                  <h3>{name}</h3>
                  <p>{detail}</p>
                </div>
                <i aria-hidden="true">↗</i>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="proof" ref={caseRef} className="case-story">
        <div className="case-sticky">
          <div className="case-copy">
            <p className="eyebrow" data-reveal>{t.caseEyebrow}</p>
            <h2>
              <span>{t.caseTitleA}</span>
              <span>{t.caseTitleB}</span>
            </h2>
            <p>{t.caseBody}</p>
            <div className="case-system">
              {t.systemSteps.map(([index, name, detail]) => (
                <article key={index}>
                  <span>{index}</span>
                  <div>
                    <strong>{name}</strong>
                    <small>{detail}</small>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="data-cockpit">
            <div className="cockpit-aura" aria-hidden="true">
              <i /><i /><i />
            </div>
            <div className="gmv-card">
              <span>{t.caseWindow}</span>
              <strong>฿7.48M</strong>
              <small>{t.metricLabels[0]}</small>
              <b>+33.29%</b>
            </div>
            <div className="case-mini case-mini-one">
              <span>{t.metricLabels[2]}</span>
              <strong>15,739</strong>
              <small>+42.13%</small>
            </div>
            <div className="case-mini case-mini-two">
              <span>{t.metricLabels[3]}</span>
              <strong>14,255</strong>
              <small>+42.38%</small>
            </div>
            <div className="live-share">
              <div className="live-dial">
                <span>87.2%</span>
              </div>
              <p>{t.liveLabel}</p>
            </div>
            <div className="ad-card">
              <span>{t.adWindow}</span>
              <div className="ad-flow">
                <div><small>{t.adLabels[0]}</small><strong>฿162.9K</strong></div>
                <i>→</i>
                <div><small>{t.adLabels[1]}</small><strong>฿2.68M</strong></div>
              </div>
              <div className="ad-bottom">
                <span><small>{t.adLabels[2]}</small><strong>16.45</strong></span>
                <span><small>{t.adLabels[3]}</small><strong>฿30.55</strong></span>
              </div>
            </div>
          </div>

          <div className="case-progress" aria-hidden="true">
            <span>01</span><i /><span>03</span>
          </div>
        </div>
      </section>

      {/* This client-case module is intentionally reusable when a new approved case is ready. */}
      <section className="external-case light-section">
        <div className="section-shell external-case-layout">
          <div className="external-case-copy">
            <p className="eyebrow dark-eyebrow" data-reveal>{t.externalEyebrow}</p>
            <h2 data-reveal>
              <span>{t.externalTitleA}</span>
              <span>{t.externalTitleB}</span>
            </h2>
            <p data-reveal>{t.externalBody}</p>
          </div>
          <div className="external-case-board" data-reveal>
            {t.externalSteps.map(([step, name, detail]) => (
              <article key={step}>
                <span>{step}</span>
                <div>
                  <h3>{name}</h3>
                  <p>{detail}</p>
                </div>
              </article>
            ))}
            <div className="external-result">
              <small>Y.O.U · THAILAND</small>
              <strong>36M</strong>
              <span>{t.externalResult}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mid-cta dark-section">
        <div className="section-shell mid-cta-inner">
          <p data-reveal>{t.midCtaText}</p>
          <button
            type="button"
            className="primary-button"
            data-reveal
            onClick={() => setContactOpen(true)}
          >
            {t.midCtaAction} <Arrow />
          </button>
        </div>
      </section>

      <section className="proof-grid light-section">
        <div className="section-shell">
          <div className="proof-heading">
            <p className="eyebrow dark-eyebrow" data-reveal>{t.proofEyebrow}</p>
            <h2 data-reveal>{t.proofTitle}</h2>
          </div>
          <div className="proof-cards">
            {t.proofCards.map(([metric, label, detail], index) => (
              <article data-reveal key={`proof-${index}`}>
                <span>0{index + 1}</span>
                <strong>{metric}</strong>
                <h3>{label}</h3>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="client-work dark-section">
        <div className="section-shell client-heading">
          <p className="eyebrow" data-reveal>{t.workEyebrow}</p>
          <p data-reveal>{t.workNote}</p>
        </div>
        <div className="client-marquee" aria-label={t.workEyebrow}>
          {clientRows.map((row, rowIndex) => (
            <div className="client-row" key={`client-row-${rowIndex}`}>
              <div className="client-track">
                {[0, 1].map((copy) => (
                  <div
                    className="client-sequence"
                    aria-hidden={copy === 1}
                    key={`client-copy-${copy}`}
                  >
                    {row.map((client) => (
                      <article className="client-logo-card" key={`${client.name}-${copy}`}>
                        <div className="client-logo-frame">
                          <img src={client.logo} alt="" loading="lazy" />
                        </div>
                        <span>{client.name}</span>
                      </article>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="platforms dark-section">
        <div className="section-shell platform-layout">
          <div>
            <p className="eyebrow" data-reveal>{t.platformEyebrow}</p>
            <h2 data-reveal>{t.platformTitle}</h2>
            <p className="platform-copy" data-reveal>{t.platformBody}</p>
          </div>
          <div className="platform-cloud" data-reveal>
            {platforms.map((platform, index) => (
              <span style={{ "--delay": `${index * 90}ms` } as React.CSSProperties} key={platform}>
                {platform}
              </span>
            ))}
          </div>
        </div>
        <div className="media-strip section-shell">
          <p>{t.media}</p>
          <div>{media.map((publication) => <span key={publication}>{publication}</span>)}</div>
        </div>
      </section>

      <section id="contact" className="closing dark-section">
        <div className="closing-sphere" aria-hidden="true">
          <div><span>PR</span></div>
        </div>
        <div className="closing-copy">
          <p className="eyebrow" data-reveal>{t.closeEyebrow}</p>
          <h2 data-reveal>
            <span>{t.closeTitleA}</span>
            <span>{t.closeTitleB}</span>
          </h2>
          <p data-reveal>{t.closeBody}</p>
          <div className="closing-actions" data-reveal>
            <button type="button" className="primary-button" onClick={() => setContactOpen(true)}>
              {t.contact} <Arrow />
            </button>
            <button type="button" className="quiet-button" onClick={() => setContactOpen(true)}>
              {t.line}
            </button>
            <button type="button" className="quiet-button" onClick={() => setContactOpen(true)}>
              {t.proposal}
            </button>
          </div>
          <small className="placeholder-note">{t.placeholder}</small>
        </div>
      </section>

      <footer>
        <div className="wordmark footer-wordmark">
          <span className="wordmark-mark">PR</span>
          <span className="wordmark-name">Prompt Rich</span>
        </div>
        <span>{t.legal}</span>
        <span>Pathum Thani · Thailand · © 2026</span>
      </footer>

      <div
        className={`contact-layer ${contactOpen ? "is-open" : ""}`}
        aria-hidden={!contactOpen}
      >
        <button
          className="contact-backdrop"
          type="button"
          aria-label={t.modalClose}
          onClick={() => setContactOpen(false)}
        />
        <div className="contact-sheet" role="dialog" aria-modal="true" aria-labelledby="contact-title">
          <button className="sheet-close" type="button" onClick={() => setContactOpen(false)}>
            ×
          </button>
          <span className="sheet-index">PROMPT RICH / CONTACT</span>
          <h2 id="contact-title">{t.modalTitle}</h2>
          <p>{t.modalBody}</p>
          <div className="contact-preview">
            <span><small>LINE OFFICIAL</small><strong>@promptrich</strong></span>
            <span><small>EMAIL</small><strong>hello@promptrich.co</strong></span>
          </div>
          <small>{t.placeholder}</small>
        </div>
      </div>
    </main>
  );
}
