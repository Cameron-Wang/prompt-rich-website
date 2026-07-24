"use client";

import { useEffect, useRef } from "react";

const capabilities = [
  {
    index: "01",
    name: "Market intelligence",
    description:
      "Category sizing, competitor mapping and a go-to-market thesis grounded in local platform reality.",
  },
  {
    index: "02",
    name: "Creator network",
    description:
      "The right voices for the right brief—from trusted niche creators to scalable affiliate portfolios.",
  },
  {
    index: "03",
    name: "Content & live",
    description:
      "Local-native creative systems built to earn attention, explain products and convert demand.",
  },
  {
    index: "04",
    name: "Store & media",
    description:
      "One commercial rhythm across campaign, storefront, paid traffic and platform moments.",
  },
  {
    index: "05",
    name: "Growth analytics",
    description:
      "A shared performance language from first view to attributable revenue and repeatable learning.",
  },
];

const stages = [
  ["01", "See the market", "Signals, categories, competitors"],
  ["02", "Shape the offer", "Positioning, price, launch logic"],
  ["03", "Activate demand", "Creators, content, live, media"],
  ["04", "Compound learning", "Dashboards, testing, iteration"],
];

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      width="20"
      height="20"
      fill="none"
    >
      <path d="M4 10h11M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function Experience() {
  const narrativeRef = useRef<HTMLElement>(null);

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
      { threshold: 0.16 },
    );
    reveals.forEach((element) => observer.observe(element));

    let ticking = false;
    const updateScroll = () => {
      const pageMax = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty(
        "--page-progress",
        `${pageMax > 0 ? window.scrollY / pageMax : 0}`,
      );

      const narrative = narrativeRef.current;
      if (narrative) {
        const bounds = narrative.getBoundingClientRect();
        const distance = narrative.offsetHeight - window.innerHeight;
        const progress = Math.min(
          1,
          Math.max(0, -bounds.top / Math.max(distance, 1)),
        );
        narrative.style.setProperty("--story-progress", `${progress}`);
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };
    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <main>
      <div className="page-progress" aria-hidden="true" />

      <nav className="topbar" aria-label="Primary navigation">
        <a className="wordmark" href="#top" aria-label="Thailand Commerce Partners">
          <span className="wordmark-mark">T</span>
          <span className="wordmark-name">Thailand Commerce Partners</span>
        </a>
        <div className="nav-links">
          <a href="#capabilities">Capabilities</a>
          <a href="#model">How we work</a>
          <a href="#contact" className="nav-cta">
            Start a conversation
          </a>
        </div>
      </nav>

      <section id="top" className="hero dark-section">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow" data-reveal>
            Thailand · MCN · Commerce · Consulting
          </p>
          <h1 data-reveal>
            Make Thailand
            <br />
            your next growth market.
          </h1>
          <p className="hero-intro" data-reveal>
            We connect market intelligence, creators and commerce execution—
            so ambitious brands move from outside interest to local momentum.
          </p>
          <a className="text-link hero-link" href="#story" data-reveal>
            See how the system works <ArrowIcon />
          </a>
        </div>

        <div className="signal-stage" aria-hidden="true">
          <div className="signal-halo halo-one" />
          <div className="signal-halo halo-two" />
          <div className="signal-core">
            <span>TH</span>
          </div>
          <div className="signal-card signal-card-one">
            <span className="signal-label">Creator signal</span>
            <strong>Beauty · Live</strong>
            <i className="signal-line" />
          </div>
          <div className="signal-card signal-card-two">
            <span className="signal-label">Commerce pulse</span>
            <strong>Bangkok · 21:08</strong>
            <i className="pulse-bars">
              <b />
              <b />
              <b />
              <b />
              <b />
            </i>
          </div>
          <div className="signal-card signal-card-three">
            <span className="signal-label">Market fit</span>
            <strong>Local context</strong>
            <i>ไทย · 中文 · EN</i>
          </div>
        </div>

        <div className="hero-foot">
          <span>Strategy that understands culture.</span>
          <span>Execution that understands platforms.</span>
        </div>
      </section>

      <section id="story" className="story-intro light-section">
        <div className="section-shell centered">
          <p className="eyebrow dark-eyebrow" data-reveal>
            The market has changed
          </p>
          <h2 data-reveal>
            Discovery became
            <br />
            distribution.
          </h2>
          <p className="story-lede" data-reveal>
            In Thailand, the distance between seeing a product and buying it can
            be one swipe. That changes what a market-entry partner needs to be.
          </p>
        </div>
      </section>

      <section ref={narrativeRef} className="narrative dark-section">
        <div className="narrative-sticky">
          <div className="narrative-copy">
            <p className="eyebrow">One connected operating system</p>
            <h2>
              Signal.
              <br />
              Story.
              <br />
              Sale.
            </h2>
            <p>
              Strategy, creator influence and commerce are managed as one
              learning loop—not three disconnected vendors.
            </p>
          </div>

          <div className="commerce-device" aria-label="Illustrative commerce interface">
            <div className="device-top">
              <span>9:41</span>
              <span className="device-status">● ●</span>
            </div>
            <div className="device-scene">
              <div className="live-chip">
                <span className="live-dot" /> LIVE
              </div>
              <div className="scene-brand">THAI<br />RITUALS</div>
              <div className="scene-product">
                <span className="product-cap" />
                <span className="product-body">TR</span>
              </div>
              <div className="scene-comments">
                <span>“เนื้อดีมาก”</span>
                <span>♡ 2.4K</span>
              </div>
            </div>
            <div className="device-commerce">
              <div>
                <span className="device-kicker">LIVE EXCLUSIVE</span>
                <strong>Thai botanical serum</strong>
                <small>Local story. Clear proof.</small>
              </div>
              <button type="button" tabIndex={-1}>Add</button>
            </div>
          </div>

          <div className="orbit-note orbit-note-one">
            <span>01</span>
            <strong>Insight</strong>
            <small>Category signal</small>
          </div>
          <div className="orbit-note orbit-note-two">
            <span>02</span>
            <strong>Influence</strong>
            <small>Creator trust</small>
          </div>
          <div className="orbit-note orbit-note-three">
            <span>03</span>
            <strong>Intent</strong>
            <small>Commerce action</small>
          </div>

          <div className="chapter-counter" aria-hidden="true">
            <span>01</span>
            <i />
            <span>03</span>
          </div>
        </div>
      </section>

      <section className="ecosystem light-section">
        <div className="section-shell">
          <div className="ecosystem-heading">
            <div>
              <p className="eyebrow dark-eyebrow" data-reveal>
                A market built for momentum
              </p>
              <h2 data-reveal>Scale is already here.</h2>
            </div>
            <p className="ecosystem-copy" data-reveal>
              The opportunity is not access. It is orchestration—finding the
              right people, message and commercial rhythm inside a fast-moving
              local ecosystem.
            </p>
          </div>

          <div className="metrics" data-reveal>
            <article>
              <strong>5M+</strong>
              <span>Thai sellers on TikTok Shop</span>
            </article>
            <article>
              <strong>3M+</strong>
              <span>shoppable creators in Thailand</span>
            </article>
            <article>
              <strong>3</strong>
              <span>operating languages: Thai, Chinese, English</span>
            </article>
          </div>

          <p className="source-note">
            Platform ecosystem figures: TikTok Shop Thailand newsroom, 2026.
            Language capability represents this concept company profile.
          </p>
        </div>
      </section>

      <section id="capabilities" className="capabilities dark-section">
        <div className="section-shell">
          <div className="capabilities-heading">
            <p className="eyebrow" data-reveal>
              What clients actually need
            </p>
            <h2 data-reveal>
              One partner.
              <br />
              Five connected capabilities.
            </h2>
          </div>

          <div className="capability-list">
            {capabilities.map((capability) => (
              <article className="capability-row" data-reveal key={capability.index}>
                <span className="capability-index">{capability.index}</span>
                <h3>{capability.name}</h3>
                <p>{capability.description}</p>
                <span className="row-arrow" aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="model" className="model light-section">
        <div className="section-shell">
          <p className="eyebrow dark-eyebrow" data-reveal>
            From market question to market motion
          </p>
          <h2 data-reveal>A clear operating rhythm.</h2>
          <div className="model-grid">
            {stages.map(([index, name, detail]) => (
              <article data-reveal key={index}>
                <span>{index}</span>
                <div className="model-rule" />
                <h3>{name}</h3>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="case-study">
        <div className="case-visual">
          <span className="case-tag">Illustrative case format</span>
          <div className="case-object case-object-one">01</div>
          <div className="case-object case-object-two">90</div>
          <div className="case-object case-object-three">TH</div>
          <div className="case-caption">
            <span>Beauty · Market Entry</span>
            <span>Bangkok / 2026</span>
          </div>
        </div>
        <div className="case-copy">
          <p className="eyebrow dark-eyebrow" data-reveal>
            Proof, presented with context
          </p>
          <h2 data-reveal>From unknown to understood in 90 days.</h2>
          <p data-reveal>
            A sample beauty-market entry story: local positioning, a focused
            creator cohort, live-commerce scripts and a weekly growth room.
          </p>
          <div className="case-metrics" data-reveal>
            <div>
              <strong>4.2×</strong>
              <span>illustrative ROAS</span>
            </div>
            <div>
              <strong>68%</strong>
              <span>revenue from creators</span>
            </div>
          </div>
          <p className="case-disclaimer">
            Sample structure and placeholder metrics for design evaluation only.
          </p>
        </div>
      </section>

      <section id="contact" className="closing dark-section">
        <div className="closing-orbit" aria-hidden="true">
          <span>TH</span>
        </div>
        <div className="closing-copy">
          <p className="eyebrow" data-reveal>
            Built in Thailand. Fluent in growth.
          </p>
          <h2 data-reveal>
            Your market deserves
            <br />
            more than a translation.
          </h2>
          <p data-reveal>
            It deserves a team with local judgment, commercial discipline and
            the network to move.
          </p>
          <a href="mailto:hello@example.com" className="primary-link" data-reveal>
            Start a conversation <ArrowIcon />
          </a>
        </div>
      </section>

      <footer>
        <span>Thailand Commerce Partners</span>
        <span>Concept website · Bangkok, Thailand</span>
        <span>© 2026</span>
      </footer>
    </main>
  );
}
