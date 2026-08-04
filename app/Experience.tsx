"use client";

import { useEffect, useRef, useState } from "react";
import { GrowthField, ThailandGrowthMap } from "./VisualSystems";

type Language = "en" | "th" | "zh";

const publicAsset = (path: string) =>
  `${process.env.NEXT_PUBLIC_SITE_BASE ?? ""}${path}`;

const content = {
  en: {
    nav: ["Solutions", "System", "Proof"],
    reviewBadge: "REVIEW BUILD · SELECT ROLES & SCALE SCENARIOS PENDING VERIFICATION",
    contact: "Book a growth diagnostic",
    heroEyebrow: "A Thailand brand & commerce company",
    heroTitleA: "Turn brand desire",
    heroTitleB: "into daily sales.",
    heroIntro:
      "Brand strategy, content production, TikTok Shop operations and performance media—one accountable growth system for Thailand.",
    explore: "Explore the system",
    proof: "See the evidence",
    heroChapters: [
      ["01", "DESIRE", "Fashion content production"],
      ["02", "EXECUTION", "Commerce operations"],
      ["03", "GROWTH", "Performance control room"],
    ],
    heroStats: [
      ["฿25.5M", "Peak monthly GMV", "Single store · internal operating record"],
      ["52M+", "Documented campaign views", "Five selected Thailand client projects"],
      ["39", "Direct client brands", "Beauty · fashion · technology · consumer"],
      ["1,000+", "Creator resources", "Thailand · multi-category"],
    ],
    marketEyebrow: "THE COST OF WAITING · THAILAND 2030",
    marketTitleA: "The market will not wait",
    marketTitleB: "for your transformation.",
    marketBody:
      "Thailand is moving toward a ฿1.8T e-commerce economy. Brands building their content, commerce and media systems now are accumulating customer data, platform learning and execution advantage every day.",
    marketStats: [
      ["฿1.8T", "Projected e-commerce market", "Thailand · 2030"],
      [">14%", "Projected annual growth", "2025–2030 CAGR"],
      ["$33B", "E-commerce GMV", "2025 · +22% YoY"],
      ["$56B", "Digital economy GMV", "2025 · SEA #2"],
      ["1.3B", "Video-commerce transactions", "Thailand · regional #2"],
      ["850K", "Video-commerce sellers", "+175% YoY"],
      ["56.6M", "Active social identities", "79.1% of population"],
      ["21%", "Fashion & accessories", "Share of video-commerce GMV"],
    ],
    marketConclusion: "The opportunity is growing. So is the cost of being late.",
    marketSource: "Sources: CUBE Insights / Lazada Thailand forecast; Google, Temasek & Bain e-Conomy SEA 2025; DataReportal Digital 2026 Thailand.",
    diagnosticEyebrow: "Growth readiness diagnostic",
    diagnosticTitle: "Which signal feels closest to your business?",
    diagnosticBody:
      "Select one path. A good diagnosis begins with the business you have—not the channel somebody wants to sell you.",
    diagnosticOptions: [
      ["Offline → online", "Most revenue is still offline, with no repeatable online sales engine."],
      ["Online growth", "Activity rises, but sales or profit no longer keep pace."],
      ["Brand demand", "Reach grows, but content, creators and media do not convert into demand."],
      ["Thailand entry", "The opportunity is clear, but localisation and local execution remain fragmented."],
    ],
    diagnosticSelect: "SELECT A SIGNAL",
    diagnosticResult: "The market opportunity may not be the bottleneck. The operating system may be.",
    serviceEyebrow: "What we operate",
    serviceTitle: "Five growth levers. One accountable system.",
    serviceLabels: ["Scope", "Client receives", "Measured by"],
    services: [
      {
        name: "Brand & marketing agency",
        outcome: "Turn positioning into market demand and coordinated commercial action.",
        scope: ["Brand positioning", "Message architecture", "Campaign strategy", "Content systems", "Integrated market execution"],
        output: "Brand platform, campaign direction, content system and 90-day commercial calendar.",
        metrics: "Consideration, qualified reach, content response, traffic and revenue contribution.",
      },
      {
        name: "TikTok Shop operations",
        outcome: "Build a repeatable store, content and LIVE engine—not a collection of disconnected tasks.",
        scope: ["Store and assortment", "Product-page conversion", "LIVE operations", "Content cadence", "Customer-service coordination"],
        output: "Operating calendar, promotion plan, weekly business review and performance dashboard.",
        metrics: "GMV, conversion, orders, customers, AOV, content mix and repeat purchase.",
      },
      {
        name: "Performance media",
        outcome: "Allocate budget around attributable commercial results and faster creative learning.",
        scope: ["Account structure", "Tracking and attribution", "Budget allocation", "Creative testing", "GMV Max optimisation"],
        output: "Media plan, testing backlog, budget rules and performance reporting.",
        metrics: "Attributed revenue, ROI, cost per order, conversion and marginal efficiency.",
      },
      {
        name: "KOL & creator marketing",
        outcome: "Match the right creators, message and commercial objective for the Thailand market.",
        scope: ["Creator strategy", "Selection and screening", "Brief development", "Content coordination", "Campaign reporting"],
        output: "Creator shortlist, briefs, content plan, coordination and results review.",
        metrics: "Qualified views, completion, engagement, traffic, attributed sales and content reuse.",
      },
      {
        name: "Thailand market entry",
        outcome: "Translate market opportunity into a local route to revenue.",
        scope: ["Category research", "Competitive mapping", "Positioning and pricing", "Channel strategy", "Launch support"],
        output: "Market-entry thesis, channel priorities, localisation plan and launch roadmap.",
        metrics: "Speed to launch, channel readiness, early demand, conversion and commercial learning.",
      },
    ],
    methodEyebrow: "Prompt Rich commerce growth system",
    methodTitle: "Diagnosis is only useful when it changes execution.",
    methodBody:
      "Explore each stage to see the inputs, tools and decisions behind the work.",
    methodLabels: ["Methods & tools", "Decision output", "Framework"],
    methodSteps: [
      {
        step: "01",
        name: "Discover",
        detail: "Find the constraint that matters before adding more activity.",
        tools: ["Business goals and constraints", "Channel P&L and unit economics", "Growth-driver tree", "Consumer journey and operating-data audit"],
        output: "Prioritised growth diagnosis and a measurable baseline.",
        framework: "Consumer Decision Journey · driver-tree analysis · unit economics",
      },
      {
        step: "02",
        name: "Design",
        detail: "Make clear choices about where to play, how to win and what to measure.",
        tools: ["Where-to-play choices", "Channel architecture", "KPI tree", "90-day roadmap and resource plan"],
        output: "Growth strategy, channel priorities and execution roadmap.",
        framework: "Playing to Win strategy choices · KPI architecture",
      },
      {
        step: "03",
        name: "Operate",
        detail: "Run store, content, LIVE and media on one commercial cadence.",
        tools: ["Commercial calendar", "Roles and decision rights", "Weekly business review", "Dashboard and issue escalation"],
        output: "Coordinated execution with visible ownership and pace.",
        framework: "Prompt Rich integrated operating cadence",
      },
      {
        step: "04",
        name: "Optimise & scale",
        detail: "Turn performance data into the next decision and a repeatable advantage.",
        tools: ["Experiment backlog", "Creative and offer testing", "Budget reallocation", "SOP and learning-loop updates"],
        output: "Validated improvements, standardised learning and the next scale decision.",
        framework: "PDCA · test–measure–learn",
      },
    ],
    caseEyebrow: "Operator proof · GMG",
    caseTitleA: "Build a brand.",
    caseTitleB: "Then build the engine.",
    caseBody:
      "GMG evolved from an early creator-led launch into an independent brand system operated by Prompt Rich across brand, content, LIVE, store and paid growth.",
    caseWindow: "30 days ending 26 Jul 2026",
    caseChapters: [
      ["01", "Brand shift", "From personality-led launch to an independent brand asset."],
      ["02", "Commercial engine", "LIVE, content, store and media connected to one operating rhythm."],
      ["03", "Measurable growth", "Revenue, reach, visitors, orders and customers move together."],
      ["04", "Paid scale", "Spend is tied to attributed revenue and operating economics."],
    ],
    caseSceneLabels: ["Connected operating system", "30-day conversion flow", "Commercial result", "Paid growth loop"],
    actualLabel: "ACTUAL RESULT",
    scaleLabel: "2× SCALE SCENARIO",
    scaleNote: "ILLUSTRATIVE VISUAL MODEL · NOT AN ACTUAL GMG RESULT",
    liveLabel: "GMV from LIVE",
    adWindow: "GMV Max · 19–26 Jul 2026",
    adLabels: ["Ad spend", "Attributed revenue", "ROI", "Cost / SKU order"],
    clientEyebrow: "External client evidence",
    clientTitle: "One operating standard. Five different briefs.",
    clientBody:
      "Selected Thailand projects demonstrate repeatability across conversion, reach and product education. Draft role descriptions remain subject to final verification.",
    roleDraft: "ROLE DRAFT · PENDING VERIFICATION",
    bridgeA: "Built through operator experience.",
    bridgeB: "Proven across client campaigns.",
    proofEyebrow: "Evidence at a glance",
    proofTitle: "Scale is a pattern, not a single number.",
    proofCards: [
      ["52M+", "Documented campaign views", "Five selected Thailand client projects"],
      ["39", "Direct client brands", "Beauty · fashion · technology · consumer"],
      ["1,000+", "Creator resources", "Beauty · fashion · lifestyle · more"],
      ["17.7M", "Product impressions", "GMG · documented 30-day period"],
      ["15.7K", "Orders", "GMG · documented 30-day period"],
      ["16.45", "Advertising ROI", "GMG Max · documented 8-day period"],
      ["฿1B+", "Modelled five-year GMV capacity", "Illustrative: Jul daily average × 31 × 12 × 5 years × 2 brands"],
    ],
    workEyebrow: "Direct client experience",
    workNote:
      "A growing portfolio of direct client engagements across beauty, fashion, technology, food and consumer commerce.",
    platformEyebrow: "Omnichannel operating experience",
    platformTitle: "We work where commerce happens.",
    platformBody:
      "These are channels our team has operated. They demonstrate hands-on experience, not platform endorsement.",
    media: "Client projects and selected team members have received media coverage.",
    closeEyebrow: "Built in Thailand. Fluent in growth.",
    closeTitleA: "What could this system",
    closeTitleB: "unlock for your brand?",
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
    nav: ["โซลูชัน", "ระบบการทำงาน", "ผลงาน"],
    reviewBadge: "เวอร์ชันตรวจงาน · บทบาทบางส่วนและโมเดลการขยายผลอยู่ระหว่างยืนยัน",
    contact: "นัดวิเคราะห์การเติบโต",
    heroEyebrow: "บริษัทด้านแบรนด์และคอมเมิร์ซในประเทศไทย",
    heroTitleA: "เปลี่ยนความน่าดึงดูดของแบรนด์",
    heroTitleB: "ให้เป็นยอดขายที่เกิดขึ้นทุกวัน",
    heroIntro:
      "กลยุทธ์แบรนด์ การผลิตคอนเทนต์ การดำเนินงาน TikTok Shop และ Performance Media เชื่อมเป็นระบบการเติบโตเดียวที่รับผิดชอบผลลัพธ์ในประเทศไทย",
    explore: "ดูระบบการทำงาน",
    proof: "ดูหลักฐาน",
    heroChapters: [
      ["01", "DESIRE", "การผลิตคอนเทนต์แฟชั่น"],
      ["02", "EXECUTION", "การดำเนินงานคอมเมิร์ซ"],
      ["03", "GROWTH", "ศูนย์ควบคุมผลลัพธ์"],
    ],
    heroStats: [
      ["฿25.5M", "GMV สูงสุดต่อเดือน", "ร้านเดียว · บันทึกผลการดำเนินงานภายใน"],
      ["52M+", "ยอดชมแคมเปญที่มีข้อมูล", "5 โครงการลูกค้าในประเทศไทย"],
      ["39", "แบรนด์ลูกค้าโดยตรง", "ความงาม · แฟชั่น · เทคโนโลยี · สินค้าอุปโภคบริโภค"],
      ["1,000+", "เครือข่ายครีเอเตอร์", "ประเทศไทย · หลากหลายหมวดหมู่"],
    ],
    marketEyebrow: "ต้นทุนของการรอ · ประเทศไทย 2030",
    marketTitleA: "ตลาดจะไม่รอ",
    marketTitleB: "ให้ธุรกิจของคุณพร้อม",
    marketBody:
      "อีคอมเมิร์ซไทยกำลังมุ่งสู่มูลค่า 1.8 ล้านล้านบาท แบรนด์ที่สร้างระบบคอนเทนต์ คอมเมิร์ซ และสื่อในวันนี้ กำลังสะสมข้อมูลลูกค้า การเรียนรู้จากแพลตฟอร์ม และความได้เปรียบในการลงมือทำทุกวัน",
    marketStats: [
      ["฿1.8T", "มูลค่าตลาดอีคอมเมิร์ซคาดการณ์", "ประเทศไทย · ปี 2030"],
      [">14%", "อัตราเติบโตต่อปีคาดการณ์", "CAGR ปี 2025–2030"],
      ["$33B", "GMV อีคอมเมิร์ซ", "ปี 2025 · +22% YoY"],
      ["$56B", "GMV เศรษฐกิจดิจิทัล", "ปี 2025 · อันดับ 2 ใน SEA"],
      ["1.3B", "ธุรกรรมวิดีโอคอมเมิร์ซ", "ไทย · อันดับ 2 ของภูมิภาค"],
      ["850K", "ผู้ขายวิดีโอคอมเมิร์ซ", "+175% YoY"],
      ["56.6M", "ตัวตนผู้ใช้โซเชียลที่ใช้งาน", "79.1% ของประชากร"],
      ["21%", "แฟชั่นและแอ็กเซสซอรี", "สัดส่วน GMV วิดีโอคอมเมิร์ซ"],
    ],
    marketConclusion: "โอกาสกำลังเติบโต และต้นทุนของการเริ่มช้าก็กำลังสูงขึ้นเช่นกัน",
    marketSource: "แหล่งข้อมูล: CUBE Insights / Lazada Thailand; Google, Temasek & Bain e-Conomy SEA 2025; DataReportal Digital 2026 Thailand",
    diagnosticEyebrow: "Growth readiness diagnostic",
    diagnosticTitle: "สัญญาณใดใกล้เคียงกับธุรกิจของคุณที่สุด?",
    diagnosticBody:
      "เลือกหนึ่งเส้นทาง การวิเคราะห์ที่ดีต้องเริ่มจากธุรกิจที่คุณมี ไม่ใช่จากช่องทางที่ใครต้องการขายให้คุณ",
    diagnosticOptions: [
      ["Offline → Online", "รายได้ส่วนใหญ่ยังมาจากออฟไลน์ และยังไม่มีระบบขายออนไลน์ที่ทำซ้ำได้"],
      ["Online Growth", "กิจกรรมเพิ่มขึ้น แต่ยอดขายหรือกำไรไม่เติบโตตาม"],
      ["Brand Demand", "ยอดเข้าถึงเพิ่ม แต่คอนเทนต์ ครีเอเตอร์ และโฆษณายังไม่สร้างดีมานด์เชิงพาณิชย์"],
      ["Thailand Entry", "เห็นโอกาสชัดเจน แต่การโลคัลไลซ์ ช่องทาง และการดำเนินงานยังแยกส่วน"],
    ],
    diagnosticSelect: "เลือกหนึ่งสัญญาณ",
    diagnosticResult: "คอขวดอาจไม่ใช่โอกาสของตลาด แต่อาจเป็นระบบการทำงาน",
    serviceEyebrow: "สิ่งที่เราดำเนินงาน",
    serviceTitle: "5 กลไกการเติบโต เชื่อมเป็นระบบเดียวที่วัดผลได้",
    serviceLabels: ["ขอบเขต", "สิ่งที่ลูกค้าได้รับ", "ตัวชี้วัด"],
    services: [
      {
        name: "Brand & Marketing Agency",
        outcome: "เปลี่ยนตำแหน่งแบรนด์ให้เป็นดีมานด์และการลงมือทำเชิงพาณิชย์",
        scope: ["วางตำแหน่งแบรนด์", "โครงสร้างข้อความ", "กลยุทธ์แคมเปญ", "ระบบคอนเทนต์", "การดำเนินงานการตลาดแบบบูรณาการ"],
        output: "Brand platform ทิศทางแคมเปญ ระบบคอนเทนต์ และปฏิทินการค้า 90 วัน",
        metrics: "Brand consideration, qualified reach, content response, traffic และรายได้ที่เกี่ยวข้อง",
      },
      {
        name: "TikTok Shop Operations",
        outcome: "สร้างเครื่องยนต์ร้านค้า คอนเทนต์ และ LIVE ที่ทำซ้ำได้",
        scope: ["ร้านค้าและสินค้า", "การแปลงผลบนหน้าสินค้า", "LIVE operations", "จังหวะคอนเทนต์", "ประสานงานบริการลูกค้า"],
        output: "ปฏิทินดำเนินงาน แผนโปรโมชัน Weekly Business Review และแดชบอร์ด",
        metrics: "GMV, conversion, orders, customers, AOV, content mix และ repeat purchase",
      },
      {
        name: "Performance Media",
        outcome: "จัดสรรงบประมาณตามผลลัพธ์เชิงพาณิชย์ที่ตรวจสอบได้",
        scope: ["โครงสร้างบัญชี", "Tracking และ attribution", "จัดสรรงบ", "ทดสอบครีเอทีฟ", "ปรับ GMV Max"],
        output: "แผนสื่อ รายการทดสอบ กติกางบประมาณ และรายงานผล",
        metrics: "Attributed revenue, ROI, cost per order, conversion และ marginal efficiency",
      },
      {
        name: "KOL & Creator Marketing",
        outcome: "เชื่อมครีเอเตอร์ ข้อความ และเป้าหมายการขายให้เหมาะกับตลาดไทย",
        scope: ["กลยุทธ์ครีเอเตอร์", "คัดเลือกและตรวจสอบ", "จัดทำบรีฟ", "ประสานงานคอนเทนต์", "รายงานแคมเปญ"],
        output: "รายชื่อครีเอเตอร์ บรีฟ แผนคอนเทนต์ การประสานงาน และผลลัพธ์",
        metrics: "Qualified views, completion, engagement, traffic, attributed sales และ content reuse",
      },
      {
        name: "Thailand Market Entry",
        outcome: "เปลี่ยนโอกาสของตลาดให้เป็นเส้นทางสู่รายได้ในประเทศไทย",
        scope: ["วิจัยหมวดหมู่", "วิเคราะห์คู่แข่ง", "ตำแหน่งและราคา", "กลยุทธ์ช่องทาง", "สนับสนุนการเปิดตลาด"],
        output: "สมมติฐานตลาด ช่องทางหลัก แผนโลคัลไลซ์ และ roadmap การเปิดตัว",
        metrics: "Speed to launch, channel readiness, early demand, conversion และ commercial learning",
      },
    ],
    methodEyebrow: "Prompt Rich commerce growth system",
    methodTitle: "การวิเคราะห์มีคุณค่าเมื่อเปลี่ยนวิธีลงมือทำ",
    methodBody: "เปิดดูแต่ละขั้นเพื่อเห็นข้อมูล เครื่องมือ และการตัดสินใจเบื้องหลังงาน",
    methodLabels: ["วิธีและเครื่องมือ", "ผลลัพธ์การตัดสินใจ", "กรอบแนวคิด"],
    methodSteps: [
      { step: "01", name: "Discover", detail: "หาคอขวดที่สำคัญก่อนเพิ่มกิจกรรม", tools: ["เป้าหมายและข้อจำกัด", "Channel P&L และ unit economics", "Growth-driver tree", "Consumer journey และ data audit"], output: "การวิเคราะห์ปัญหาที่จัดลำดับแล้วและ baseline ที่วัดผลได้", framework: "Consumer Decision Journey · driver tree · unit economics" },
      { step: "02", name: "Design", detail: "เลือกว่าจะเล่นที่ไหน ชนะอย่างไร และวัดอะไร", tools: ["Where-to-play choices", "Channel architecture", "KPI tree", "Roadmap 90 วันและแผนทรัพยากร"], output: "กลยุทธ์การเติบโต ลำดับช่องทาง และ execution roadmap", framework: "Playing to Win · KPI architecture" },
      { step: "03", name: "Operate", detail: "บริหารร้าน คอนเทนต์ LIVE และสื่อบนจังหวะเดียวกัน", tools: ["Commercial calendar", "บทบาทและสิทธิ์ตัดสินใจ", "Weekly business review", "Dashboard และ issue escalation"], output: "การดำเนินงานร่วมกันที่มีเจ้าของและความเร็วชัดเจน", framework: "Prompt Rich integrated operating cadence" },
      { step: "04", name: "Optimise & scale", detail: "เปลี่ยนข้อมูลให้เป็นการตัดสินใจและความได้เปรียบที่ทำซ้ำได้", tools: ["Experiment backlog", "ทดสอบครีเอทีฟและข้อเสนอ", "จัดสรรงบใหม่", "อัปเดต SOP และ learning loop"], output: "การปรับปรุงที่พิสูจน์แล้วและการตัดสินใจขยายผล", framework: "PDCA · test–measure–learn" },
    ],
    caseEyebrow: "ผลงานจากการลงมือทำ · GMG",
    caseTitleA: "สร้างแบรนด์",
    caseTitleB: "แล้วสร้างเครื่องยนต์การเติบโต",
    caseBody:
      "GMG พัฒนาจากการเปิดตัวร่วมกับครีเอเตอร์ สู่ระบบแบรนด์อิสระที่ Prompt Rich ดูแลทั้งแบรนด์ คอนเทนต์ LIVE ร้านค้า และ paid growth",
    caseWindow: "30 วัน สิ้นสุดวันที่ 26 ก.ค. 2026",
    caseChapters: [
      ["01", "Brand shift", "จากการเริ่มต้นที่พึ่งพาบุคคล สู่ทรัพย์สินแบรนด์ที่เป็นอิสระ"],
      ["02", "Commercial engine", "LIVE คอนเทนต์ ร้านค้า และสื่อทำงานในจังหวะเดียวกัน"],
      ["03", "Measurable growth", "รายได้ การเข้าถึง ผู้ชม คำสั่งซื้อ และลูกค้าเติบโตไปด้วยกัน"],
      ["04", "Paid scale", "เชื่อมค่าโฆษณากับรายได้และเศรษฐศาสตร์การดำเนินงาน"],
    ],
    caseSceneLabels: ["ระบบการทำงานที่เชื่อมกัน", "Conversion flow 30 วัน", "ผลลัพธ์เชิงพาณิชย์", "Paid growth loop"],
    actualLabel: "ผลลัพธ์จริง",
    scaleLabel: "โมเดลขยาย 2×",
    scaleNote: "โมเดลภาพเพื่อการประเมินเท่านั้น · ไม่ใช่ผลลัพธ์จริงของ GMG",
    liveLabel: "GMV จาก LIVE",
    adWindow: "GMV Max · 19–26 ก.ค. 2026",
    adLabels: ["ค่าโฆษณา", "รายได้จากโฆษณา", "ROI", "ต้นทุน / คำสั่งซื้อ SKU"],
    clientEyebrow: "หลักฐานจากลูกค้าภายนอก",
    clientTitle: "มาตรฐานการทำงานเดียว บนโจทย์ลูกค้า 5 แบบ",
    clientBody: "โครงการในไทยแสดงความสามารถที่ทำซ้ำได้ทั้ง conversion, reach และ product education โดยคำอธิบายบทบาทยังรอการยืนยัน",
    roleDraft: "บทบาทฉบับร่าง · รอยืนยัน",
    bridgeA: "สร้างจากประสบการณ์ผู้ลงมือทำ",
    bridgeB: "พิสูจน์ผ่านแคมเปญลูกค้า",
    proofEyebrow: "หลักฐานโดยสรุป",
    proofTitle: "Scale คือรูปแบบที่ทำซ้ำได้ ไม่ใช่ตัวเลขเดียว",
    proofCards: [
      ["52M+", "ยอดชมแคมเปญที่มีข้อมูล", "5 โครงการลูกค้าในประเทศไทย"],
      ["39", "แบรนด์ลูกค้าโดยตรง", "ความงาม · แฟชั่น · เทคโนโลยี · สินค้าอุปโภคบริโภค"],
      ["1,000+", "เครือข่ายครีเอเตอร์", "ความงาม · แฟชั่น · ไลฟ์สไตล์ · อื่น ๆ"],
      ["17.7M", "Product impressions", "GMG · ช่วง 30 วันที่มีหลักฐาน"],
      ["15.7K", "คำสั่งซื้อ", "GMG · ช่วง 30 วันที่มีหลักฐาน"],
      ["16.45", "Advertising ROI", "GMG Max · ช่วง 8 วันที่มีหลักฐาน"],
      ["฿1B+", "ศักยภาพ GMV 5 ปีตามโมเดล", "ตัวอย่าง: ค่าเฉลี่ยรายวันเดือน ก.ค. × 31 × 12 × 5 ปี × 2 แบรนด์"],
    ],
    workEyebrow: "ประสบการณ์ลูกค้าโดยตรง",
    workNote: "ผลงานโดยตรงกับลูกค้าในกลุ่มความงาม แฟชั่น เทคโนโลยี อาหาร และสินค้าอุปโภคบริโภค",
    platformEyebrow: "ประสบการณ์ดำเนินงานแบบ Omnichannel",
    platformTitle: "เราทำงานในทุกพื้นที่ที่การค้าเกิดขึ้น",
    platformBody: "แพลตฟอร์มเหล่านี้คือช่องทางที่ทีมเคยดำเนินงานจริง ไม่ใช่การอ้างการรับรองจากแพลตฟอร์ม",
    media: "โครงการของลูกค้าและสมาชิกทีมบางส่วนเคยได้รับการนำเสนอผ่านสื่อ",
    closeEyebrow: "สร้างในประเทศไทย เข้าใจการเติบโต",
    closeTitleA: "ระบบนี้จะปลดล็อก",
    closeTitleB: "อะไรให้แบรนด์ของคุณ?",
    closeBody: "ส่งคำถามทางการตลาดมาให้เรา แล้วเราจะเชื่อมกลยุทธ์ ครีเอเตอร์ คอมเมิร์ซ และการลงมือทำ",
    line: "เพิ่ม LINE",
    proposal: "ขอรับข้อเสนอ",
    placeholder: "ข้อมูลติดต่อเป็นข้อความชั่วคราวสำหรับตรวจงานออกแบบ",
    modalTitle: "เริ่มต้นการสนทนาที่นี่",
    modalBody: "ช่องทางติดต่อนี้จะเชื่อมต่อก่อนเปิดเว็บไซต์จริง ขณะนี้ใช้เพื่อแสดงประสบการณ์การนัดหมาย",
    modalClose: "ปิด",
    legal: "พร้อมริช อินเตอร์เทรดดิ้ง",
  },
  zh: {
    nav: ["解决方案", "增长系统", "案例证据"],
    reviewBadge: "审核版本 · 部分案例职责与规模情景待最终核实",
    contact: "预约增长诊断",
    heroEyebrow: "扎根泰国的品牌与商业增长公司",
    heroTitleA: "把品牌吸引力，",
    heroTitleB: "变成每天发生的销售。",
    heroIntro: "品牌策略、内容拍摄、TikTok Shop运营与效果投放，由一套增长系统统一负责。",
    explore: "了解增长系统",
    proof: "查看真实证据",
    heroChapters: [
      ["01", "DESIRE", "时尚内容拍摄制作"],
      ["02", "EXECUTION", "电商运营执行"],
      ["03", "GROWTH", "经营数据控制台"],
    ],
    heroStats: [
      ["฿25.5M", "单店最高月度GMV", "内部运营记录"],
      ["52M+", "有据可查的活动播放", "五个泰国客户项目"],
      ["39", "直接服务品牌", "美妆 · 时尚 · 科技 · 消费品"],
      ["1,000+", "泰国达人资源", "覆盖多品类"],
    ],
    marketEyebrow: "等待的代价 · 泰国2030",
    marketTitleA: "市场不会等待，",
    marketTitleB: "你的转型完成。",
    marketBody: "泰国电商正在向1.8万亿泰铢迈进。现在开始建立内容、电商与投放系统的品牌，每一天都在积累客户数据、平台经验和执行优势。",
    marketStats: [
      ["฿1.8T", "电商市场预计规模", "泰国 · 2030年"],
      [">14%", "预计年复合增长率", "2025–2030"],
      ["$33B", "电商GMV", "2025年 · 同比+22%"],
      ["$56B", "数字经济GMV", "2025年 · 东南亚第二"],
      ["1.3B", "视频电商交易量", "泰国 · 东南亚第二"],
      ["850K", "视频电商卖家", "同比+175%"],
      ["56.6M", "活跃社交媒体用户身份", "占总人口79.1%"],
      ["21%", "时尚与配饰", "视频电商GMV占比"],
    ],
    marketConclusion: "机会在增长，入场过晚的成本也在增长。",
    marketSource: "来源：CUBE Insights / Lazada Thailand；Google、Temasek与Bain《e-Conomy SEA 2025》；DataReportal《Digital 2026: Thailand》。",
    diagnosticEyebrow: "增长准备度诊断",
    diagnosticTitle: "哪一种信号最接近你的业务？",
    diagnosticBody: "选择一条路径。好的诊断从你真实拥有的业务开始，而不是从别人想卖给你的渠道开始。",
    diagnosticOptions: [
      ["线下 → 线上", "大部分收入仍来自线下，尚未建立可重复的线上销售引擎。"],
      ["线上增长", "工作量不断增加，但销售或利润已经无法同步增长。"],
      ["品牌声量", "曝光在增长，但内容、达人和投放没有转化为商业需求。"],
      ["进入泰国", "市场机会明确，但本地化、渠道与本地执行仍然割裂。"],
    ],
    diagnosticSelect: "请选择一种业务信号",
    diagnosticResult: "真正的瓶颈可能不是市场机会，而是业务操作系统。",
    serviceEyebrow: "我们实际运营什么",
    serviceTitle: "五个增长杠杆，一套对结果负责的系统。",
    serviceLabels: ["工作范围", "客户获得", "衡量指标"],
    services: [
      { name: "品牌与营销代理", outcome: "把品牌定位转化为市场需求与协同商业行动。", scope: ["品牌定位", "信息架构", "营销活动策略", "内容系统", "整合市场执行"], output: "品牌平台、活动方向、内容系统及90天商业日历。", metrics: "品牌考虑度、有效触达、内容反馈、流量及收入贡献。" },
      { name: "TikTok Shop运营", outcome: "建立可重复的店铺、内容与直播引擎，而不是零散任务集合。", scope: ["店铺与商品结构", "商品页转化", "直播运营", "内容节奏", "客服协同"], output: "运营日历、促销方案、每周经营复盘及数据看板。", metrics: "GMV、转化率、订单、客户、客单价、内容结构及复购。" },
      { name: "效果广告投放", outcome: "围绕可归因商业结果配置预算，并加快创意学习。", scope: ["账户结构", "追踪与归因", "预算配置", "创意测试", "GMV Max优化"], output: "媒体计划、测试清单、预算规则及绩效报告。", metrics: "归因收入、ROI、单均成本、转化率及边际效率。" },
      { name: "KOL与达人营销", outcome: "让合适的达人、信息与商业目标匹配泰国市场。", scope: ["达人策略", "筛选与审核", "Brief制定", "内容协同", "活动复盘"], output: "达人名单、Brief、内容计划、执行协调及结果复盘。", metrics: "有效播放、完播、互动、流量、归因销售及内容复用。" },
      { name: "泰国市场进入咨询", outcome: "把市场机会转化为本地收入路径。", scope: ["品类研究", "竞争分析", "定位与定价", "渠道策略", "上市支持"], output: "市场进入判断、渠道优先级、本地化方案及上市路线图。", metrics: "上市速度、渠道准备度、早期需求、转化及商业学习。" },
    ],
    methodEyebrow: "Prompt Rich电商增长系统",
    methodTitle: "只有改变执行的诊断，才真正有价值。",
    methodBody: "浏览每个阶段，查看工作背后的输入、工具、决策与交付。",
    methodLabels: ["方法与工具", "决策产出", "参考框架"],
    methodSteps: [
      { step: "01", name: "Discover", detail: "在增加工作量之前，先找到真正限制增长的因素。", tools: ["业务目标与限制", "渠道P&L与单位经济模型", "增长驱动树", "消费者路径与运营数据审计"], output: "按照影响排序的增长诊断及可衡量基准线。", framework: "Consumer Decision Journey · 驱动树 · Unit economics" },
      { step: "02", name: "Design", detail: "明确在哪里竞争、如何获胜，以及用什么衡量。", tools: ["Where-to-play选择", "渠道架构", "KPI树", "90天路线图与资源方案"], output: "增长战略、渠道优先级及执行路线图。", framework: "Playing to Win · KPI architecture" },
      { step: "03", name: "Operate", detail: "让店铺、内容、直播和投放按照同一商业节奏运行。", tools: ["商业日历", "职责与决策权", "每周经营复盘", "数据看板与问题升级"], output: "责任明确、有节奏、可追踪的协同执行。", framework: "Prompt Rich一体化运营节奏" },
      { step: "04", name: "Optimise & scale", detail: "把绩效数据转化为下一次决策与可重复优势。", tools: ["实验清单", "创意与Offer测试", "预算重新分配", "SOP及学习循环更新"], output: "经过验证的改进、标准化学习和下一步放大决定。", framework: "PDCA · test–measure–learn" },
    ],
    caseEyebrow: "经营实战 · GMG",
    caseTitleA: "建立品牌，",
    caseTitleB: "再建立增长引擎。",
    caseBody: "GMG从早期达人合作起盘，逐步转向由Prompt Rich负责品牌、内容、直播、店铺与付费增长的独立品牌系统。",
    caseWindow: "截至2026年7月26日的30天",
    caseChapters: [
      ["01", "品牌转变", "从依赖个人影响力起盘，转向独立品牌资产。"],
      ["02", "商业引擎", "直播、内容、店铺与投放按照统一节奏运转。"],
      ["03", "可衡量增长", "收入、曝光、访客、订单与客户同步变化。"],
      ["04", "付费放大", "将广告花费与归因收入及运营经济模型连接。"],
    ],
    caseSceneLabels: ["协同运营系统", "30天转化路径", "商业结果", "付费增长循环"],
    actualLabel: "真实结果",
    scaleLabel: "2×规模情景",
    scaleNote: "仅用于视觉评审的推演模型 · 并非GMG真实业绩",
    liveLabel: "直播贡献GMV",
    adWindow: "GMV Max · 2026年7月19–26日",
    adLabels: ["广告花费", "广告归因收入", "ROI", "单个SKU订单成本"],
    clientEyebrow: "外部客户证据",
    clientTitle: "一套执行标准，五种客户任务。",
    clientBody: "泰国项目证明团队能够在转化、曝光和产品教育等不同任务中重复交付；案例职责描述目前仍待最终核实。",
    roleDraft: "职责草稿 · 待最终核实",
    bridgeA: "建立在亲自经营的经验上，",
    bridgeB: "并在客户项目中得到验证。",
    proofEyebrow: "跨项目证据",
    proofTitle: "规模是一种可重复的模式，而不是一个孤立数字。",
    proofCards: [
      ["52M+", "有记录的客户项目播放量", "5个泰国客户项目"],
      ["39", "直接客户品牌", "美妆 · 时尚 · 科技 · 消费品"],
      ["1,000+", "达人资源", "美妆 · 时尚 · 生活方式 · 更多"],
      ["17.7M", "商品曝光", "GMG · 有后台证据的30天"],
      ["15.7K", "订单", "GMG · 有后台证据的30天"],
      ["16.45", "广告ROI", "GMG Max · 有后台证据的8天"],
      ["฿1B+", "五年GMV模型容量", "示意模型：7月日均 × 31 × 12 × 5年 × 2个品牌"],
    ],
    workEyebrow: "直接客户经验",
    workNote: "覆盖美妆、时尚、科技、餐饮与消费电商的直接客户合作经验。",
    platformEyebrow: "全渠道运营经验",
    platformTitle: "在电商发生的地方工作。",
    platformBody: "这些是团队实际运营过的渠道，代表执行经验，并不表示平台提供官方背书。",
    media: "团队执行的客户项目及部分团队成员曾获得媒体报道。",
    closeEyebrow: "扎根泰国，精通增长。",
    closeTitleA: "这套系统能为你的品牌",
    closeTitleB: "释放什么增长潜力？",
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

const externalCases = [
  {
    name: "Y.O.U",
    logo: publicAsset("/clients/you.png"),
    metricA: "36M",
    metricB: "ROI 3.5",
    role: {
      en: "Conversion creative, creator coordination and performance amplification.",
      th: "ครีเอทีฟเพื่อ Conversion การประสานงานครีเอเตอร์ และการขยายผลด้วยสื่อ",
      zh: "销售转化创意、达人协同与效果放大。",
    },
  },
  {
    name: "MAKUKU",
    logo: publicAsset("/clients/makuku.png"),
    metricA: "6.62M",
    metricB: "ROI 2.7",
    role: {
      en: "Creator-led product education, conversion content and media optimisation.",
      th: "Product education ผ่านครีเอเตอร์ คอนเทนต์ Conversion และการปรับสื่อ",
      zh: "达人产品教育、转化内容与媒体优化。",
    },
  },
  {
    name: "Barenbliss",
    logo: publicAsset("/clients/barenbliss.png"),
    metricA: "4.18M",
    metricB: "ROI 2.8",
    role: {
      en: "Launch content, creator seeding and performance-media coordination.",
      th: "คอนเทนต์เปิดตัว Creator seeding และการประสานงาน Performance media",
      zh: "上市内容、达人种草与效果媒体协同。",
    },
  },
  {
    name: "vivo",
    logo: publicAsset("/clients/vivo.png"),
    metricA: "5.2M",
    metricB: "32.1% COMPLETE",
    role: {
      en: "Reach creative and creator-content coordination for product visibility.",
      th: "ครีเอทีฟเพื่อ Reach และการประสานงานคอนเทนต์ครีเอเตอร์",
      zh: "曝光创意与达人内容协同。",
    },
  },
  {
    name: "Kiehl’s",
    logo: publicAsset("/clients/kiehls.jpeg"),
    metricA: "480K",
    metricB: "29.3% COMPLETE",
    role: {
      en: "Product-education creative and creator-content coordination.",
      th: "ครีเอทีฟ Product education และการประสานงานคอนเทนต์ครีเอเตอร์",
      zh: "产品教育创意与达人内容协同。",
    },
  },
] as const;

const clients = [
  { name: "Estée Lauder", logo: publicAsset("/clients/estee-lauder.jpeg") },
  { name: "Kiehl’s", logo: publicAsset("/clients/kiehls.jpeg") },
  { name: "Eve Lom", logo: publicAsset("/clients/eve-lom.jpeg") },
  { name: "Y.O.U", logo: publicAsset("/clients/you.png") },
  { name: "by.t", logo: publicAsset("/clients/byt.png") },
  { name: "O.TWO.O", logo: publicAsset("/clients/otwoo.png") },
  { name: "Dazzle Me", logo: publicAsset("/clients/dazzle-me.png") },
  { name: "SKINTIFIC", logo: publicAsset("/clients/skintific.png") },
  { name: "SOMETHINC", logo: publicAsset("/clients/somethinc.png") },
  { name: "GrabMart", logo: publicAsset("/clients/grabmart.png") },
  { name: "Lavojoy", logo: publicAsset("/clients/lavojoy.png") },
  { name: "SK-II", logo: publicAsset("/clients/skii.png") },
  { name: "SEYVEN", logo: publicAsset("/clients/seyven.png") },
  { name: "La Mer", logo: publicAsset("/clients/la-mer.png") },
  { name: "Lancôme", logo: publicAsset("/clients/lancome.jpeg") },
  { name: "Studio Tropik", logo: publicAsset("/clients/studio-tropik.png") },
  { name: "Salsa", logo: publicAsset("/clients/salsa.png") },
  { name: "L’Oréal Paris", logo: publicAsset("/clients/loreal-paris.png") },
  { name: "Clé de Peau Beauté", logo: publicAsset("/clients/cle-de-peau.jpeg") },
  { name: "NPURE", logo: publicAsset("/clients/npure.png") },
  { name: "Scarlett", logo: publicAsset("/clients/scarlett.png") },
  { name: "BROS Fried Chicken", logo: publicAsset("/clients/bros-fried-chicken.png") },
  { name: "MAKUKU", logo: publicAsset("/clients/makuku.png") },
  { name: "Barenbliss", logo: publicAsset("/clients/barenbliss.png") },
  { name: "vivo", logo: publicAsset("/clients/vivo.png") },
  { name: "TeraBox", logo: publicAsset("/clients/terabox.png") },
  { name: "Made To Clothes", logo: publicAsset("/clients/made-to-clothes.jpg") },
  { name: "ลูกสาวคุณนาย", logo: publicAsset("/clients/luksao-khunnai.png") },
  { name: "PRIMAYA", logo: publicAsset("/clients/primaya.jpg") },
  { name: "YG", logo: publicAsset("/clients/yg.jpg") },
  { name: "OMOM", logo: publicAsset("/clients/omom.jpg") },
  { name: "BASICS BY SITA", logo: publicAsset("/clients/basics-by-sita.jpg") },
  { name: "mauv", logo: publicAsset("/clients/mauv.jpg") },
  { name: "The Karaked", logo: publicAsset("/clients/the-karaked.jpg") },
  { name: "Kloset Dress Secret", logo: publicAsset("/clients/kloset.jpg") },
  { name: "Bloom Boom", logo: publicAsset("/clients/bloom-boom.jpg") },
  { name: "Mogwany Closet", logo: publicAsset("/clients/mogwany-closet.jpg") },
  { name: "Wanna Accessories by Wheang", logo: publicAsset("/clients/wanna-accessories.jpg") },
  { name: "ORZENIC", logo: publicAsset("/clients/orzenic.png") },
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
  const [activeDiagnostic, setActiveDiagnostic] = useState<number | null>(null);
  const [activeService, setActiveService] = useState(0);
  const [activeMethod, setActiveMethod] = useState(0);
  const [scalePreview, setScalePreview] = useState(true);
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
        section.dataset.phase = `${Math.min(3, Math.floor(progress * 4))}`;
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
      <div className="review-banner">{t.reviewBadge}</div>

      <nav className="topbar" aria-label="Primary navigation">
        <a className="wordmark" href="#top" aria-label="Prompt Rich home">
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

      <section id="top" ref={heroRef} className="hero cinematic-hero dark-section">
        <div className="film-prologue" aria-hidden="true">
          <span>A Thailand growth company</span>
          <strong>Prompt Rich</strong>
          <i />
        </div>

        <div className="cinema-media cinema-documentary" aria-hidden="true">
          <picture className="documentary-frame">
            <source
              srcSet={publicAsset("/hero/prompt-rich-documentary-b11.webp")}
              type="image/webp"
            />
            <img
              src={publicAsset("/hero/prompt-rich-documentary-b11.png")}
              alt=""
            />
          </picture>
          <div className="documentary-chapters">
            {t.heroChapters.map(([number, title, detail], index) => (
              <div className={`documentary-chapter chapter-${index + 1}`} key={number}>
                <span>{number}</span>
                <strong>{title}</strong>
                <small>{detail}</small>
              </div>
            ))}
          </div>
        </div>
        <div className="cinema-vignette" aria-hidden="true" />
        <div className="cinema-grain" aria-hidden="true" />

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

        <div className="hero-stats">
          {t.heroStats.map(([value, label, note]) => (
            <article key={value}>
              <strong>{value}</strong>
              <span>{label}</span>
              <small>{note}</small>
            </article>
          ))}
        </div>
        <a className="scroll-cue" href="#audience" aria-label="Scroll to next section">
          <i />
          <span>SCROLL</span>
        </a>
      </section>

      <section id="audience" className="market-shift light-section">
        <div className="market-visual-band">
          <div className="section-shell market-heading">
            <p className="eyebrow" data-reveal>{t.marketEyebrow}</p>
            <h2 data-reveal>
              <span>{t.marketTitleA}</span>
              <span>{t.marketTitleB}</span>
            </h2>
            <p data-reveal>{t.marketBody}</p>
          </div>
          <div className="section-shell market-stats">
            {t.marketStats.map(([metric, label, note], index) => (
              <article data-reveal key={metric} style={{ transitionDelay: `${120 + index * 95}ms` }}>
                <span>0{index + 1}</span>
                <strong>{metric}</strong>
                <h3>{label}</h3>
                <p>{note}</p>
              </article>
            ))}
          </div>
          <p className="section-shell market-conclusion" data-reveal>{t.marketConclusion}</p>
          <p className="section-shell market-source">
            {t.marketSource}
            {" · "}
            <a
              href="https://th.mofcom.gov.cn/jmdt/art/2026/art_f014270c2db54d6b883ee9f96b0bafdc.html"
              target="_blank"
              rel="noreferrer"
            >
              FORECAST ↗
            </a>
            {" · "}
            <a
              href="https://blog.google/intl/th-th/company-news/inside-google/e-conomy-sea-2025/"
              target="_blank"
              rel="noreferrer"
            >
              GOOGLE 2025 ↗
            </a>
            {" · "}
            <a
              href="https://datareportal.com/reports/digital-2026-thailand"
              target="_blank"
              rel="noreferrer"
            >
              DIGITAL 2026 ↗
            </a>
          </p>
        </div>

        <ThailandGrowthMap language={language} />

        <div className="section-shell diagnostic-panel">
          <div className="diagnostic-heading">
            <p className="eyebrow dark-eyebrow">{t.diagnosticEyebrow}</p>
            <h3>{t.diagnosticTitle}</h3>
            <p>{t.diagnosticBody}</p>
          </div>
          <div className="diagnostic-options">
            {t.diagnosticOptions.map(([name, detail], index) => (
              <button
                type="button"
                className={activeDiagnostic === index ? "is-active" : ""}
                aria-pressed={activeDiagnostic === index}
                onClick={() => setActiveDiagnostic(index)}
                key={name}
              >
                <span>0{index + 1}</span>
                <strong>{name}</strong>
                <small>{detail}</small>
                <i aria-hidden="true">↗</i>
              </button>
            ))}
          </div>
          <div className={`diagnostic-result ${activeDiagnostic !== null ? "is-visible" : ""}`}>
            <span>
              {activeDiagnostic === null
                ? t.diagnosticSelect
                : t.diagnosticOptions[activeDiagnostic][0]}
            </span>
            <strong>{t.diagnosticResult}</strong>
          </div>
        </div>
      </section>

      <section id="services" className="services dark-section">
        <div className="section-shell">
          <div className="services-heading">
            <p className="eyebrow" data-reveal>{t.serviceEyebrow}</p>
            <h2 data-reveal>{t.serviceTitle}</h2>
          </div>
          <div className="service-system" data-reveal>
            <div className="service-tabs" role="tablist" aria-label={t.serviceEyebrow}>
              {t.services.map((service, index) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeService === index}
                  className={activeService === index ? "is-active" : ""}
                  onClick={() => setActiveService(index)}
                  onPointerEnter={() => setActiveService(index)}
                  key={service.name}
                >
                  <span>0{index + 1}</span>
                  <strong>{service.name}</strong>
                  <i aria-hidden="true">↗</i>
                </button>
              ))}
            </div>
            <article className="service-detail" role="tabpanel">
              <span className="service-detail-index">0{activeService + 1} / 05</span>
              <h3>{t.services[activeService].name}</h3>
              <p className="service-outcome">{t.services[activeService].outcome}</p>
              <div className="service-detail-grid">
                <div>
                  <small>{t.serviceLabels[0]}</small>
                  <ul>
                    {t.services[activeService].scope.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
                <div>
                  <small>{t.serviceLabels[1]}</small>
                  <p>{t.services[activeService].output}</p>
                </div>
                <div>
                  <small>{t.serviceLabels[2]}</small>
                  <p>{t.services[activeService].metrics}</p>
                </div>
              </div>
            </article>
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
            {t.methodSteps.map((method, index) => (
              <button
                type="button"
                className={activeMethod === index ? "is-active" : ""}
                aria-pressed={activeMethod === index}
                onClick={() => setActiveMethod(index)}
                onPointerEnter={() => setActiveMethod(index)}
                data-reveal
                key={method.step}
              >
                <span>{method.step}</span>
                <div>
                  <h3>{method.name}</h3>
                  <p>{method.detail}</p>
                </div>
                <i aria-hidden="true">↗</i>
              </button>
            ))}
          </div>
          <article className="method-detail" data-reveal>
            <div>
              <small>{t.methodLabels[0]}</small>
              <ul>
                {t.methodSteps[activeMethod].tools.map((tool) => <li key={tool}>{tool}</li>)}
              </ul>
            </div>
            <div>
              <small>{t.methodLabels[1]}</small>
              <p>{t.methodSteps[activeMethod].output}</p>
            </div>
            <div>
              <small>{t.methodLabels[2]}</small>
              <p>{t.methodSteps[activeMethod].framework}</p>
              <span className="framework-links">
                {activeMethod === 0 && (
                  <a href="https://www.mckinsey.com/~/media/McKinsey/Business%20Functions/Marketing%20and%20Sales/Our%20Insights/The%20consumer%20decision%20journey/The%20consumer%20decision%20journey.ashx" target="_blank" rel="noreferrer">McKinsey source ↗</a>
                )}
                {activeMethod === 1 && (
                  <a href="https://hbr.org/webinar/2014/12/playing-to-win-how-strategy-really-works" target="_blank" rel="noreferrer">HBR source ↗</a>
                )}
                {activeMethod === 3 && (
                  <a href="https://www.lean.org/lexicon-terms/pdca/" target="_blank" rel="noreferrer">Lean source ↗</a>
                )}
              </span>
            </div>
          </article>
        </div>
      </section>

      <section id="proof" ref={caseRef} className="case-story" data-phase="0">
        <div className="case-sticky">
          <div className="case-copy">
            <p className="eyebrow" data-reveal>{t.caseEyebrow}</p>
            <h2>
              <span>{t.caseTitleA}</span>
              <span>{t.caseTitleB}</span>
            </h2>
            <p>{t.caseBody}</p>
            <div className="case-chapters">
              {t.caseChapters.map(([step, name, detail]) => (
                <article key={step}>
                  <span>{step}</span>
                  <div>
                    <strong>{name}</strong>
                    <small>{detail}</small>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="case-visual">
            <div className="case-mode-switch">
              <button
                type="button"
                className={!scalePreview ? "is-active" : ""}
                onClick={() => setScalePreview(false)}
              >
                {t.actualLabel}
              </button>
              <button
                type="button"
                className={scalePreview ? "is-active" : ""}
                onClick={() => setScalePreview(true)}
              >
                {t.scaleLabel}
              </button>
            </div>
            {scalePreview && <p className="scale-note">{t.scaleNote}</p>}

            <div className="case-scenes">
              <article className="case-scene scene-system">
                <small>01 / {t.caseSceneLabels[0]}</small>
                <div className="system-orbit">
                  {["BRAND", "CONTENT", "LIVE", "STORE", "MEDIA"].map((node) => (
                    <span key={node}>{node}</span>
                  ))}
                  <strong>GMG</strong>
                </div>
              </article>

              <article className="case-scene scene-funnel">
                <small>02 / {t.caseSceneLabels[1]}</small>
                <div className="funnel-flow">
                  <span>
                    <strong>{scalePreview ? "35.4M" : "17.7M"}</strong>
                    <small>IMPRESSIONS</small>
                  </span>
                  <i>→</i>
                  <span>
                    <strong>{scalePreview ? "592K" : "296K"}</strong>
                    <small>VISITORS</small>
                  </span>
                  <i>→</i>
                  <span>
                    <strong>{scalePreview ? "31.4K" : "15.7K"}</strong>
                    <small>ORDERS</small>
                  </span>
                </div>
                <div className="funnel-bars" aria-hidden="true"><i /><i /><i /></div>
              </article>

              <article className="case-scene scene-growth">
                <small>03 / {t.caseSceneLabels[2]} · {t.caseWindow}</small>
                <div className="growth-number">
                  <strong>{scalePreview ? "฿14.96M" : "฿7.48M"}</strong>
                  <span>GMV</span>
                  <b>+33.29%</b>
                </div>
                <div className="growth-support">
                  <span><small>ORDERS</small><strong>{scalePreview ? "31,478" : "15,739"}</strong></span>
                  <span><small>CUSTOMERS</small><strong>{scalePreview ? "28,510" : "14,255"}</strong></span>
                  <span><small>{t.liveLabel}</small><strong>87.2%</strong></span>
                </div>
                <div className="growth-chart" aria-hidden="true">
                  {[18, 27, 35, 34, 51, 62, 78, 92].map((height, index) => (
                    <i style={{ "--bar": `${height}%`, "--i": index } as React.CSSProperties} key={index} />
                  ))}
                </div>
              </article>

              <article className="case-scene scene-paid">
                <small>04 / {t.caseSceneLabels[3]} · {t.adWindow}</small>
                <div className="paid-flow">
                  <span>
                    <small>{t.adLabels[0]}</small>
                    <strong>{scalePreview ? "฿325.8K" : "฿162.9K"}</strong>
                  </span>
                  <i>→</i>
                  <span>
                    <small>{t.adLabels[1]}</small>
                    <strong>{scalePreview ? "฿5.36M" : "฿2.68M"}</strong>
                  </span>
                </div>
                <div className="paid-economics">
                  <span><small>{t.adLabels[2]}</small><strong>16.45</strong></span>
                  <span><small>{t.adLabels[3]}</small><strong>฿30.55</strong></span>
                </div>
                <div className="paid-pulse" aria-hidden="true"><i /><i /><i /></div>
              </article>
            </div>
          </div>

          <div className="case-progress" aria-hidden="true">
            <span>01</span><i /><span>04</span>
          </div>
        </div>
      </section>

      <section className="external-cases light-section">
        <div className="section-shell client-case-heading">
          <div>
            <p className="eyebrow dark-eyebrow" data-reveal>{t.clientEyebrow}</p>
            <h2 data-reveal>{t.clientTitle}</h2>
          </div>
          <p data-reveal>{t.clientBody}</p>
        </div>
        <div className="section-shell client-case-grid">
          {externalCases.map((project, index) => (
            <article className={index === 0 ? "is-featured" : ""} data-reveal key={project.name}>
              <div className="client-case-top">
                <div className="client-case-logo">
                  <img src={project.logo} alt={`${project.name} logo`} loading="lazy" />
                </div>
                <span>0{index + 1}</span>
              </div>
              <h3>{project.name}</h3>
              <div className="client-case-metrics">
                <strong>{project.metricA}</strong>
                <span>{project.metricB}</span>
              </div>
              <p>{project.role[language]}</p>
              <small>{t.roleDraft}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="proof-bridge dark-section">
        <div className="section-shell">
          <span data-reveal>{t.bridgeA}</span>
          <strong data-reveal>{t.bridgeB}</strong>
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
              <article className={index === t.proofCards.length - 1 ? "is-modelled" : ""} data-reveal key={`proof-${index}`}>
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
        <div className="closing-visual" aria-hidden="true">
          <GrowthField variant="closing" />
          <div className="closing-core">
            <i className="core-surface" />
            <span>Prompt</span>
            <span>Rich</span>
            <small>THAILAND</small>
          </div>
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
