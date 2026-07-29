"use client";

import { useEffect, useRef } from "react";

type FieldVariant = "hero" | "closing";
type MapLanguage = "en" | "th" | "zh";

type Particle = {
  angle: number;
  radius: number;
  depth: number;
  speed: number;
  size: number;
  phase: number;
};

type GeoGeometry = {
  type: "Polygon" | "MultiPolygon";
  coordinates: number[][][] | number[][][][];
};

type GeoFeature = {
  geometry: GeoGeometry;
};

type GeoCollection = {
  features: GeoFeature[];
};

const mapCopy = {
  en: {
    eyebrow: "THAILAND GROWTH TERRAIN",
    title: "Local demand moves through connected markets.",
    body:
      "Bangkok is the commercial core, but growth is distributed across creator communities, retail corridors, tourism economies and emerging online demand.",
    nodes: [
      ["Bangkok", "Commerce core"],
      ["Chiang Mai", "Creator demand"],
      ["Eastern Seaboard", "Retail · logistics"],
      ["Phuket", "Tourism · lifestyle"],
      ["Northeast", "Emerging online demand"],
    ],
    note: "Illustrative market signals · geographic boundaries are accurate",
  },
  th: {
    eyebrow: "ภูมิทัศน์การเติบโตของประเทศไทย",
    title: "ดีมานด์ท้องถิ่นเติบโตผ่านตลาดที่เชื่อมโยงกัน",
    body:
      "กรุงเทพฯ คือศูนย์กลางการค้า แต่การเติบโตกระจายอยู่ในคอมมูนิตี้ครีเอเตอร์ เส้นทางค้าปลีก เมืองท่องเที่ยว และดีมานด์ออนไลน์ในภูมิภาค",
    nodes: [
      ["กรุงเทพฯ", "ศูนย์กลางคอมเมิร์ซ"],
      ["เชียงใหม่", "ดีมานด์จากครีเอเตอร์"],
      ["ภาคตะวันออก", "ค้าปลีก · โลจิสติกส์"],
      ["ภูเก็ต", "ท่องเที่ยว · ไลฟ์สไตล์"],
      ["ภาคอีสาน", "ดีมานด์ออนไลน์เกิดใหม่"],
    ],
    note: "สัญญาณตลาดเพื่อการอธิบาย · ใช้ขอบเขตภูมิศาสตร์จริง",
  },
  zh: {
    eyebrow: "泰国增长版图",
    title: "本地需求，正在多个互联市场中同时生长。",
    body:
      "曼谷是商业核心，但增长同时来自达人社区、零售与物流走廊、旅游经济以及快速形成的区域线上需求。",
    nodes: [
      ["曼谷", "商业核心"],
      ["清迈", "达人驱动需求"],
      ["东部经济走廊", "零售 · 物流"],
      ["普吉", "旅游 · 生活方式"],
      ["东北部", "新兴线上需求"],
    ],
    note: "市场信号为示意表达 · 地理边界采用真实数据",
  },
} as const;

function seeded(index: number, salt: number) {
  const value = Math.sin(index * 91.731 + salt * 17.133) * 43758.5453;
  return value - Math.floor(value);
}

export function GrowthField({ variant }: { variant: FieldVariant }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const particleCount = variant === "hero" ? 150 : 120;
    const particles: Particle[] = Array.from({ length: particleCount }, (_, index) => ({
      angle: seeded(index, 1) * Math.PI * 2,
      radius: 0.12 + seeded(index, 2) * 0.78,
      depth: 0.18 + seeded(index, 3) * 0.82,
      speed: (0.06 + seeded(index, 4) * 0.17) * (index % 2 ? 1 : -1),
      size: 0.45 + seeded(index, 5) * 1.8,
      phase: seeded(index, 6) * Math.PI * 2,
    }));

    let width = 0;
    let height = 0;
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;
    let visible = true;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const pointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      targetX = (event.clientX - bounds.left) / bounds.width - 0.5;
      targetY = (event.clientY - bounds.top) / bounds.height - 0.5;
    };

    const pointerLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const draw = (time: number) => {
      if (!visible) {
        frame = window.requestAnimationFrame(draw);
        return;
      }
      const seconds = reduceMotion ? 0 : time / 1000;
      pointerX += (targetX - pointerX) * 0.035;
      pointerY += (targetY - pointerY) * 0.035;
      context.clearRect(0, 0, width, height);

      const cx = width * (variant === "hero" ? 0.53 : 0.5) + pointerX * 34;
      const cy = height * (variant === "hero" ? 0.5 : 0.47) + pointerY * 24;
      const radius = Math.min(width, height) * (variant === "hero" ? 0.43 : 0.42);

      const fieldGlow = context.createRadialGradient(cx, cy, 0, cx, cy, radius * 1.15);
      fieldGlow.addColorStop(0, variant === "hero" ? "rgba(84,242,204,.19)" : "rgba(124,108,255,.20)");
      fieldGlow.addColorStop(0.36, "rgba(124,108,255,.09)");
      fieldGlow.addColorStop(1, "rgba(0,0,0,0)");
      context.fillStyle = fieldGlow;
      context.fillRect(0, 0, width, height);

      const projected = particles.map((particle) => {
        const angle = particle.angle + seconds * particle.speed;
        const wave = 0.84 + Math.sin(seconds * 0.6 + particle.phase) * 0.08;
        const orbit = radius * particle.radius * wave;
        const perspective = 0.42 + particle.depth * 0.58;
        const x = cx + Math.cos(angle) * orbit * perspective;
        const y =
          cy +
          Math.sin(angle) * orbit * 0.42 +
          Math.sin(angle * 2 + particle.phase) * radius * 0.055 +
          (particle.depth - 0.5) * radius * 0.15;
        return { ...particle, x, y, angle, alpha: 0.18 + particle.depth * 0.72 };
      });

      context.lineWidth = 0.6;
      for (let i = 0; i < projected.length; i += 1) {
        const a = projected[i];
        for (let j = i + 1; j < Math.min(i + 14, projected.length); j += 1) {
          const b = projected[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.hypot(dx, dy);
          if (distance < radius * 0.22) {
            context.strokeStyle = `rgba(${a.depth > 0.56 ? "84,242,204" : "124,108,255"},${(1 - distance / (radius * 0.22)) * 0.18})`;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.stroke();
          }
        }
      }

      projected
        .sort((a, b) => a.depth - b.depth)
        .forEach((particle) => {
          const pulse = 0.72 + Math.sin(seconds * 1.4 + particle.phase) * 0.28;
          context.beginPath();
          context.fillStyle = particle.depth > 0.58
            ? `rgba(84,242,204,${particle.alpha * pulse})`
            : `rgba(171,163,255,${particle.alpha * pulse})`;
          context.shadowColor = particle.depth > 0.58 ? "rgba(84,242,204,.72)" : "rgba(124,108,255,.62)";
          context.shadowBlur = particle.size * 5;
          context.arc(particle.x, particle.y, particle.size * (0.55 + particle.depth), 0, Math.PI * 2);
          context.fill();
        });
      context.shadowBlur = 0;

      for (let lane = 0; lane < 5; lane += 1) {
        const laneAngle = seconds * (0.11 + lane * 0.008) + lane * 1.27;
        const laneRadius = radius * (0.3 + lane * 0.11);
        context.strokeStyle = lane % 2
          ? "rgba(124,108,255,.15)"
          : "rgba(84,242,204,.13)";
        context.lineWidth = lane === 2 ? 1.2 : 0.7;
        context.beginPath();
        context.ellipse(
          cx + Math.cos(laneAngle) * 8,
          cy + Math.sin(laneAngle) * 5,
          laneRadius,
          laneRadius * (0.31 + lane * 0.018),
          -0.18 + pointerX * 0.08,
          laneAngle,
          laneAngle + Math.PI * (0.62 + lane * 0.08),
        );
        context.stroke();
      }

      if (!reduceMotion) frame = window.requestAnimationFrame(draw);
    };

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    visibilityObserver.observe(canvas);
    window.addEventListener("resize", resize, { passive: true });
    canvas.addEventListener("pointermove", pointerMove);
    canvas.addEventListener("pointerleave", pointerLeave);
    resize();
    draw(0);

    return () => {
      window.cancelAnimationFrame(frame);
      visibilityObserver.disconnect();
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", pointerMove);
      canvas.removeEventListener("pointerleave", pointerLeave);
    };
  }, [variant]);

  return <canvas ref={canvasRef} className={`growth-field growth-field-${variant}`} />;
}

const marketNodes = [
  { lon: 100.5018, lat: 13.7563, strength: 1 },
  { lon: 98.9853, lat: 18.7883, strength: 0.66 },
  { lon: 101.15, lat: 13.15, strength: 0.74 },
  { lon: 98.3923, lat: 7.8804, strength: 0.6 },
  { lon: 102.835, lat: 16.4419, strength: 0.7 },
] as const;

export function ThailandGrowthMap({ language }: { language: MapLanguage }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const copy = mapCopy[language];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let collection: GeoCollection | null = null;
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    let targetTilt = 0;
    let tilt = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const project = (lon: number, lat: number, depth = 0) => {
      const nx = (lon - 97.25) / (105.75 - 97.25);
      const ny = (20.75 - lat) / (20.75 - 5.5);
      const mapWidth = Math.min(width * 0.72, height * 0.55);
      const mapHeight = Math.min(height * 0.76, width * 1.12);
      const baseX = width * 0.5 + (nx - 0.5) * mapWidth;
      const baseY = height * 0.4 + (ny - 0.5) * mapHeight;
      const skewX = (baseY - height * 0.5) * (0.17 + tilt * 0.025);
      return {
        x: baseX + skewX + depth * 0.9,
        y: height * 0.44 + (baseY - height * 0.44) * 0.76 - depth * 1.35,
      };
    };

    const traceRing = (ring: number[][], depth = 0) => {
      ring.forEach(([lon, lat], index) => {
        const point = project(lon, lat, depth);
        if (index === 0) context.moveTo(point.x, point.y);
        else context.lineTo(point.x, point.y);
      });
      context.closePath();
    };

    const traceFeature = (feature: GeoFeature, depth = 0) => {
      const geometry = feature.geometry;
      context.beginPath();
      if (geometry.type === "Polygon") {
        (geometry.coordinates as number[][][]).forEach((ring) => traceRing(ring, depth));
      } else {
        (geometry.coordinates as number[][][][]).forEach((polygon) => {
          polygon.forEach((ring) => traceRing(ring, depth));
        });
      }
    };

    const pointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      targetTilt = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    };
    const pointerLeave = () => {
      targetTilt = 0;
    };

    const draw = (time: number) => {
      if (!visible || !collection) {
        frame = window.requestAnimationFrame(draw);
        return;
      }
      const seconds = reduceMotion ? 0 : time / 1000;
      tilt += (targetTilt - tilt) * 0.035;
      context.clearRect(0, 0, width, height);

      const ambient = context.createRadialGradient(
        width * 0.5,
        height * 0.45,
        0,
        width * 0.5,
        height * 0.45,
        Math.max(width, height) * 0.55,
      );
      ambient.addColorStop(0, "rgba(84,242,204,.12)");
      ambient.addColorStop(0.38, "rgba(124,108,255,.09)");
      ambient.addColorStop(1, "rgba(0,0,0,0)");
      context.fillStyle = ambient;
      context.fillRect(0, 0, width, height);

      for (let layer = 12; layer >= 1; layer -= 1) {
        collection.features.forEach((feature) => {
          traceFeature(feature, layer);
          context.fillStyle = `rgba(${18 + layer},${19 + layer},${28 + layer * 2},.78)`;
          context.fill("evenodd");
          context.strokeStyle = "rgba(124,108,255,.045)";
          context.lineWidth = 0.45;
          context.stroke();
        });
      }

      const topGradient = context.createLinearGradient(0, height * 0.12, width, height * 0.86);
      topGradient.addColorStop(0, "rgba(193,188,255,.86)");
      topGradient.addColorStop(0.48, "rgba(92,82,158,.9)");
      topGradient.addColorStop(1, "rgba(39,46,64,.96)");
      collection.features.forEach((feature) => {
        traceFeature(feature);
        context.fillStyle = topGradient;
        context.fill("evenodd");
        context.strokeStyle = "rgba(226,224,255,.23)";
        context.lineWidth = 0.65;
        context.stroke();
      });

      const bangkok = project(marketNodes[0].lon, marketNodes[0].lat);
      marketNodes.slice(1).forEach((node, index) => {
        const destination = project(node.lon, node.lat);
        const controlX = (bangkok.x + destination.x) / 2 + (index % 2 ? -34 : 30);
        const controlY = Math.min(bangkok.y, destination.y) - 58 - index * 5;
        context.beginPath();
        context.moveTo(bangkok.x, bangkok.y);
        context.quadraticCurveTo(controlX, controlY, destination.x, destination.y);
        context.strokeStyle = index % 2 ? "rgba(84,242,204,.42)" : "rgba(187,178,255,.45)";
        context.lineWidth = 1;
        context.stroke();

        const progress = (seconds * (0.13 + index * 0.016) + index * 0.22) % 1;
        const oneMinus = 1 - progress;
        const movingX =
          oneMinus * oneMinus * bangkok.x +
          2 * oneMinus * progress * controlX +
          progress * progress * destination.x;
        const movingY =
          oneMinus * oneMinus * bangkok.y +
          2 * oneMinus * progress * controlY +
          progress * progress * destination.y;
        context.beginPath();
        context.fillStyle = index % 2 ? "#54f2cc" : "#b7aeff";
        context.shadowColor = context.fillStyle;
        context.shadowBlur = 12;
        context.arc(movingX, movingY, 2.2, 0, Math.PI * 2);
        context.fill();
      });

      marketNodes.forEach((node, index) => {
        const point = project(node.lon, node.lat);
        const pulse = 0.78 + Math.sin(seconds * 2 + index) * 0.22;
        const heightScale = (42 + node.strength * 76) * pulse;
        const gradient = context.createLinearGradient(point.x, point.y, point.x, point.y - heightScale);
        gradient.addColorStop(0, "rgba(84,242,204,.08)");
        gradient.addColorStop(1, index === 0 ? "rgba(84,242,204,.95)" : "rgba(183,174,255,.82)");
        context.fillStyle = gradient;
        context.fillRect(point.x - 1.25, point.y - heightScale, 2.5, heightScale);
        context.beginPath();
        context.fillStyle = index === 0 ? "#54f2cc" : "#b7aeff";
        context.shadowColor = context.fillStyle;
        context.shadowBlur = index === 0 ? 22 : 14;
        context.arc(point.x, point.y - heightScale, index === 0 ? 4.2 : 2.8, 0, Math.PI * 2);
        context.fill();
      });
      context.shadowBlur = 0;

      if (!reduceMotion) frame = window.requestAnimationFrame(draw);
    };

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    visibilityObserver.observe(canvas);
    window.addEventListener("resize", resize, { passive: true });
    canvas.addEventListener("pointermove", pointerMove);
    canvas.addEventListener("pointerleave", pointerLeave);
    resize();

    fetch("/data/thailand-adm1.geojson")
      .then((response) => response.json())
      .then((data: GeoCollection) => {
        collection = data;
        draw(0);
      })
      .catch(() => {
        collection = { features: [] };
      });

    return () => {
      window.cancelAnimationFrame(frame);
      visibilityObserver.disconnect();
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", pointerMove);
      canvas.removeEventListener("pointerleave", pointerLeave);
    };
  }, []);

  return (
    <section className="thailand-map-section" aria-label={copy.eyebrow}>
      <div className="thailand-map-copy">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h3>{copy.title}</h3>
        <p>{copy.body}</p>
        <div className="map-node-list">
          {copy.nodes.map(([name, signal], index) => (
            <span key={name}>
              <i>0{index + 1}</i>
              <strong>{name}</strong>
              <small>{signal}</small>
            </span>
          ))}
        </div>
        <small className="map-note">{copy.note}</small>
      </div>
      <div className="thailand-map-stage">
        <canvas ref={canvasRef} className="thailand-map-canvas" />
        <div className="map-axis" aria-hidden="true"><span>LOCAL SIGNAL</span><i /></div>
      </div>
    </section>
  );
}
