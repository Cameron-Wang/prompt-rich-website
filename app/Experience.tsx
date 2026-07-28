"use client";

import { useEffect, useRef, useState } from "react";

type Language = "en" | "th" | "zh";

const content = {
  en: {
    nav: ["Services", "Proof", "Team"],
    contact: "Book a consultation",
    heroEyebrow: "Thailand · Brand · Commerce · Growth",
    heroTitleA: "From attention",
    heroTitleB: "to revenue.",
    heroIntro:
      "Prompt Rich unites brand strategy, TikTok commerce, creators, content and paid media—so growth works as one connected system.",
    explore: "Explore our work",
    proof: "See the numbers",
    heroNotes: ["Built in Thailand", "Thai · 中文 · English", "Operator-led"],
    audienceEyebrow: "For the next version of your business",
    audienceTitle: "Local judgment. Commercial discipline.",
    audienceBody:
      "For Thai brands ready to scale, offline businesses moving online, and international teams entering Thailand.",
    audiences: [
      "Thai brands & sellers",
      "Offline-to-online transformation",
      "Brands building digital demand",
      "China-to-Thailand market entry",
    ],
    serviceEyebrow: "What we do",
    serviceTitle: "Five capabilities. One commercial system.",
    services: [
      ["Brand & marketing agency", "Positioning, identity, campaigns and integrated market execution."],
      ["TikTok Shop operations", "Store, content, LIVE, service and commercial rhythm—managed end to end."],
      ["Performance media", "Paid growth designed around attributable revenue, not surface-level reach."],
      ["MCN · KOL · Affiliate", "Creator strategy, selection, content and scalable affiliate activation."],
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
      ["THB 10.05M", "MissyClassy monthly GMV", "TikTok Shop · Nov 2023"],
      ["36M", "Views for a sales-conversion video", "Y.O.U · Thailand"],
      ["1,000+", "Creator resources", "Beauty · fashion · lifestyle · more"],
    ],
    workEyebrow: "Direct client experience",
    workNote:
      "A growing portfolio of direct client engagements across beauty, fashion, technology, food and consumer commerce.",
    teamEyebrow: "Leadership",
    teamTitle: "Operators around one table.",
    teamBody:
      "Four founders connect company leadership, strategy, partnerships, technology and performance.",
    team: [
      ["Kannika Chutrakul", "Nika", "CEO & Co-Founder", "Overall strategy, operations and client delivery."],
      ["Cameron Wang", "Cameron", "Strategy & Business Development", "Market opportunity, growth direction and new business."],
      ["Rachapol Kamhomgul", "Pae", "Technology & Performance", "IT, software systems and performance advertising."],
      ["Nuttamol Traiupok", "Naris", "Partnerships & People Operations", "External relations, partner development and team operations."],
    ],
    platformEyebrow: "Omnichannel operating experience",
    platformTitle: "We work where commerce happens.",
    platformBody:
      "These are channels our team has operated—not claims of platform endorsement. TikTok roles are held through the SHIZEN ACADEMY account under SHIZEN ELITE.",
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
    nav: ["บริการ", "ผลงาน", "ทีมงาน"],
    contact: "นัดหมายปรึกษา",
    heroEyebrow: "ประเทศไทย · แบรนด์ · คอมเมิร์ซ · การเติบโต",
    heroTitleA: "เปลี่ยนความสนใจ",
    heroTitleB: "ให้เป็นรายได้",
    heroIntro:
      "Prompt Rich เชื่อมกลยุทธ์แบรนด์ TikTok Commerce ครีเอเตอร์ คอนเทนต์ และสื่อโฆษณาให้ทำงานเป็นระบบเดียวกัน",
    explore: "ดูผลงานของเรา",
    proof: "ดูผลลัพธ์",
    heroNotes: ["สร้างและดำเนินงานในประเทศไทย", "ไทย · 中文 · English", "บริหารโดยผู้ลงมือทำจริง"],
    audienceEyebrow: "สำหรับธุรกิจในบทต่อไป",
    audienceTitle: "เข้าใจตลาดจริง เติบโตอย่างมีวินัย",
    audienceBody:
      "สำหรับแบรนด์ไทยที่ต้องการขยาย ธุรกิจออฟไลน์ที่กำลังเข้าสู่ออนไลน์ และทีมต่างประเทศที่ต้องการเข้าตลาดไทย",
    audiences: [
      "แบรนด์และผู้ขายในไทย",
      "เปลี่ยนจากออฟไลน์สู่ออนไลน์",
      "สร้างความต้องการบนดิจิทัล",
      "เข้าสู่ตลาดไทยจากประเทศจีน",
    ],
    serviceEyebrow: "บริการของเรา",
    serviceTitle: "5 ความสามารถ เชื่อมเป็นระบบการเติบโตเดียว",
    services: [
      ["Brand & Marketing Agency", "วางตำแหน่งแบรนด์ อัตลักษณ์ แคมเปญ และการตลาดแบบบูรณาการ"],
      ["TikTok Shop Operations", "ดูแลร้านค้า คอนเทนต์ LIVE บริการ และจังหวะการขายแบบครบวงจร"],
      ["Performance Media", "วางระบบโฆษณาที่มุ่งรายได้ซึ่งตรวจสอบและวัดผลได้"],
      ["MCN · KOL · Affiliate", "กลยุทธ์ครีเอเตอร์ การคัดเลือก คอนเทนต์ และการขยาย Affiliate"],
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
      ["10.05M บาท", "GMV รายเดือนของ MissyClassy", "TikTok Shop · พ.ย. 2023"],
      ["36M", "ยอดชมวิดีโอเพื่อยอดขาย", "Y.O.U · ประเทศไทย"],
      ["1,000+", "เครือข่ายครีเอเตอร์", "ความงาม · แฟชั่น · ไลฟ์สไตล์ · อื่น ๆ"],
    ],
    workEyebrow: "ประสบการณ์ลูกค้าโดยตรง",
    workNote:
      "ผลงานจากการทำงานโดยตรงกับลูกค้าในกลุ่มความงาม แฟชั่น เทคโนโลยี อาหาร และสินค้าอุปโภคบริโภค",
    teamEyebrow: "ทีมผู้บริหาร",
    teamTitle: "ผู้ลงมือทำจริงในทีมเดียวกัน",
    teamBody:
      "ผู้ร่วมก่อตั้ง 4 คน เชื่อมการบริหาร กลยุทธ์ ความสัมพันธ์ เทคโนโลยี และ Performance Marketing",
    team: [
      ["Kannika Chutrakul", "Nika", "CEO & Co-Founder", "ดูแลกลยุทธ์ การดำเนินงาน และการส่งมอบงานให้ลูกค้า"],
      ["Cameron Wang", "Cameron", "Strategy & Business Development", "โอกาสทางตลาด ทิศทางการเติบโต และธุรกิจใหม่"],
      ["Rachapol Kamhomgul", "Pae", "Technology & Performance", "ไอที ระบบซอฟต์แวร์ และโฆษณาแบบมุ่งผลลัพธ์"],
      ["Nuttamol Traiupok", "Naris", "Partnerships & People Operations", "ความสัมพันธ์ภายนอก การพัฒนาพันธมิตร และการบริหารทีม"],
    ],
    platformEyebrow: "ประสบการณ์ดำเนินงานแบบ Omnichannel",
    platformTitle: "เราทำงานในทุกพื้นที่ที่การค้าเกิดขึ้น",
    platformBody:
      "แพลตฟอร์มเหล่านี้คือช่องทางที่ทีมเคยดำเนินงาน ไม่ใช่การอ้างการรับรองจากแพลตฟอร์ม ส่วนบทบาทบน TikTok ดำเนินงานผ่านบัญชี SHIZEN ACADEMY ภายใต้ SHIZEN ELITE",
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
    nav: ["服务", "案例", "团队"],
    contact: "预约咨询",
    heroEyebrow: "泰国 · 品牌 · 电商 · 增长",
    heroTitleA: "从获得关注",
    heroTitleB: "到创造收入。",
    heroIntro:
      "Prompt Rich将品牌战略、TikTok电商、达人、内容与付费投放整合成一套协同运转的增长系统。",
    explore: "了解我们的能力",
    proof: "查看真实数据",
    heroNotes: ["扎根泰国", "泰语 · 中文 · English", "实战团队主导"],
    audienceEyebrow: "为业务的下一个阶段",
    audienceTitle: "本地判断，商业纪律。",
    audienceBody:
      "服务希望扩大规模的泰国品牌、准备线上转型的线下商家，以及进入泰国市场的国际团队。",
    audiences: ["泰国本地品牌与卖家", "线下业务线上转型", "提升数字声量与需求", "中国品牌进入泰国"],
    serviceEyebrow: "我们的服务",
    serviceTitle: "五项能力，一套商业增长系统。",
    services: [
      ["品牌与营销代理", "从定位、视觉识别到整合营销活动与市场执行。"],
      ["TikTok Shop运营", "店铺、内容、直播、客服及销售节奏的一体化管理。"],
      ["效果广告投放", "围绕可归因收入设计投放，而不是只追求表面曝光。"],
      ["MCN · KOL · Affiliate", "达人策略、筛选、内容执行与可规模化的联盟增长。"],
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
      ["THB 10.05M", "MissyClassy单月GMV", "TikTok Shop · 2023年11月"],
      ["36M", "销售转化视频播放量", "Y.O.U · 泰国"],
      ["1,000+", "达人资源", "美妆 · 时尚 · 生活方式 · 更多"],
    ],
    workEyebrow: "直接客户经验",
    workNote: "覆盖美妆、时尚、科技、餐饮与消费电商的直接客户合作经验。",
    teamEyebrow: "管理团队",
    teamTitle: "四位实战者，同坐一张桌。",
    teamBody: "四位联合创始人覆盖公司经营、战略、合作关系、技术与效果增长。",
    team: [
      ["Kannika Chutrakul", "Nika", "CEO兼联合创始人", "全面负责公司战略、经营与客户交付。"],
      ["Cameron Wang", "Cameron", "战略与业务发展", "负责市场机会、增长方向与新业务发展。"],
      ["Rachapol Kamhomgul", "Pae", "技术与增长", "负责IT、软件系统及效果广告投放。"],
      ["Nuttamol Traiupok", "Naris", "合作关系与团队运营", "负责对外关系、合作建联与内部团队运营。"],
    ],
    platformEyebrow: "全渠道运营经验",
    platformTitle: "在电商发生的地方工作。",
    platformBody:
      "这些是团队实际运营过的渠道，并非平台背书。TikTok相关角色通过SHIZEN ELITE主体下的SHIZEN ACADEMY账户持有。",
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
    reveals.forEach((element) => observer.observe(element));

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
      observer.disconnect();
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
          <a href="#proof">{t.nav[1]}</a>
          <a href="#team">{t.nav[2]}</a>
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
              <article className="service-row" data-reveal key={name}>
                <span className="service-index">0{index + 1}</span>
                <h3>{name}</h3>
                <p>{description}</p>
                <span className="service-arrow" aria-hidden="true">↗</span>
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

      <section className="proof-grid light-section">
        <div className="section-shell">
          <div className="proof-heading">
            <p className="eyebrow dark-eyebrow" data-reveal>{t.proofEyebrow}</p>
            <h2 data-reveal>{t.proofTitle}</h2>
          </div>
          <div className="proof-cards">
            {t.proofCards.map(([metric, label, detail], index) => (
              <article data-reveal key={metric}>
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

      <section id="team" className="team light-section">
        <div className="section-shell">
          <div className="team-heading">
            <div>
              <p className="eyebrow dark-eyebrow" data-reveal>{t.teamEyebrow}</p>
              <h2 data-reveal>{t.teamTitle}</h2>
            </div>
            <p data-reveal>{t.teamBody}</p>
          </div>
          <div className="team-grid">
            {t.team.map(([name, shortName, role, bio], index) => (
              <article data-reveal key={name}>
                <div className={`team-portrait portrait-${index + 1}`}>
                  <span>{shortName.slice(0, 1)}</span>
                  <i>PORTRAIT / 0{index + 1}</i>
                </div>
                <div className="team-card-copy">
                  <span>0{index + 1}</span>
                  <h3>{name}</h3>
                  <strong>{role}</strong>
                  <p>{bio}</p>
                </div>
              </article>
            ))}
          </div>
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
