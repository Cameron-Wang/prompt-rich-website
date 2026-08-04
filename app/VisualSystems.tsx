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
  properties?: Record<string, unknown>;
};

type GeoCollection = {
  features: GeoFeature[];
};

const publicAsset = (path: string) =>
  `${process.env.NEXT_PUBLIC_SITE_BASE ?? ""}${path}`;

const mapCopy = {
  en: {
    eyebrow: "THAILAND ORDER FLOW",
    title: "One market. Millions of movements.",
    body:
      "Every moving streak represents an order. Bangkok leads the flow while Thailand’s other commercial centres send demand across all 77 provinces.",
    nodes: [
      ["Bangkok", "Primary commerce engine"],
      ["Eastern Seaboard", "Industry · retail · logistics"],
      ["Chiang Mai", "Northern demand hub"],
      ["Northeast", "Korat · Khon Kaen"],
      ["Phuket", "Tourism · lifestyle"],
      ["Songkhla", "Southern trade hub"],
    ],
    scale: "Billion-scale order-flow simulation",
    note: "Illustrative order-flow model · origin intensity weighted by 2024 provincial GPP",
  },
  th: {
    eyebrow: "การไหลของออเดอร์ทั่วประเทศไทย",
    title: "หนึ่งตลาด หลายล้านการเคลื่อนไหว",
    body:
      "ทุกเส้นแสงที่เคลื่อนไหวแทนหนึ่งออเดอร์ กรุงเทพฯ เป็นศูนย์กลางหลัก ขณะที่หัวเมืองเศรษฐกิจส่งดีมานด์ไปยังทั้ง 77 จังหวัด",
    nodes: [
      ["กรุงเทพฯ", "เครื่องยนต์คอมเมิร์ซหลัก"],
      ["ภาคตะวันออก", "อุตสาหกรรม · ค้าปลีก · โลจิสติกส์"],
      ["เชียงใหม่", "ศูนย์กลางดีมานด์ภาคเหนือ"],
      ["ภาคอีสาน", "โคราช · ขอนแก่น"],
      ["ภูเก็ต", "ท่องเที่ยว · ไลฟ์สไตล์"],
      ["สงขลา", "ศูนย์กลางการค้าภาคใต้"],
    ],
    scale: "ภาพจำลองการไหลของออเดอร์ระดับหลายร้อยล้าน",
    note: "แบบจำลองเพื่อการสื่อสาร · ความถี่ต้นทางถ่วงน้ำหนักด้วย GPP จังหวัดปี 2024",
  },
  zh: {
    eyebrow: "泰国订单流动版图",
    title: "一个市场，亿级流动。",
    body:
      "每一道移动轨迹代表一笔订单。曼谷是最大核心，其他主要经济城市同时向泰国77府释放并承接需求。",
    nodes: [
      ["曼谷", "核心商业引擎"],
      ["东部经济走廊", "工业 · 零售 · 物流"],
      ["清迈", "北部需求中心"],
      ["东北部", "呵叻 · 孔敬"],
      ["普吉", "旅游 · 生活方式"],
      ["宋卡", "南部贸易中心"],
    ],
    scale: "亿级订单流动模拟",
    note: "订单流为视觉模拟 · 发射强度按2024年府级GPP加权",
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
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
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

type GeoPoint = { lon: number; lat: number };

type OrderStream = {
  origin: number;
  destination: number;
  phase: number;
  speed: number;
  bend: number;
  lift: number;
  size: number;
};

// Relative source weights approximate the latest available provincial economic
// structure. The visual discloses this as a GPP-weighted simulation, not order data.
const commerceOrigins = [
  { name: "Bangkok", lon: 100.5018, lat: 13.7563, weight: 5.98 },
  { name: "Chon Buri", lon: 100.9847, lat: 13.3611, weight: 1.25 },
  { name: "Rayong", lon: 101.2816, lat: 12.6814, weight: 1.05 },
  { name: "Samut Prakan", lon: 100.5998, lat: 13.5991, weight: 0.78 },
  { name: "Nakhon Ratchasima", lon: 102.0977, lat: 14.9799, weight: 0.34 },
  { name: "Chiang Mai", lon: 98.9853, lat: 18.7883, weight: 0.3 },
  { name: "Songkhla", lon: 100.5954, lat: 7.1898, weight: 0.28 },
  { name: "Khon Kaen", lon: 102.835, lat: 16.4419, weight: 0.26 },
  { name: "Surat Thani", lon: 99.3331, lat: 9.1382, weight: 0.23 },
  { name: "Phuket", lon: 98.3923, lat: 7.8804, weight: 0.22 },
] as const;

const orderColors = [
  [238, 205, 145],
  [151, 197, 220],
  [207, 126, 145],
] as const;

function featureCentre(feature: GeoFeature): GeoPoint | null {
  const geometry = feature.geometry;
  const rings = geometry.type === "Polygon"
    ? [(geometry.coordinates as number[][][])[0]]
    : (geometry.coordinates as number[][][][]).map((polygon) => polygon[0]);
  const points = rings.flat().filter((point) => point.length >= 2);
  if (!points.length) return null;
  let minLon = Infinity;
  let maxLon = -Infinity;
  let minLat = Infinity;
  let maxLat = -Infinity;
  points.forEach(([lon, lat]) => {
    minLon = Math.min(minLon, lon);
    maxLon = Math.max(maxLon, lon);
    minLat = Math.min(minLat, lat);
    maxLat = Math.max(maxLat, lat);
  });
  return { lon: (minLon + maxLon) / 2, lat: (minLat + maxLat) / 2 };
}

function weightedOrigin(seed: number) {
  const total = commerceOrigins.reduce((sum, origin) => sum + origin.weight, 0);
  let cursor = seed * total;
  for (let index = 0; index < commerceOrigins.length; index += 1) {
    cursor -= commerceOrigins[index].weight;
    if (cursor <= 0) return index;
  }
  return 0;
}

export function ThailandGrowthMap({ language }: { language: MapLanguage }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const copy = mapCopy[language];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let collection: GeoCollection | null = null;
    let destinations: GeoPoint[] = [];
    let streams: OrderStream[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const project = (lon: number, lat: number) => {
      const minLon = 97.25;
      const maxLon = 105.75;
      const minLat = 5.5;
      const maxLat = 20.75;
      const centreLon = (minLon + maxLon) / 2;
      const centreLat = (minLat + maxLat) / 2;
      const longitudeScale = Math.cos((centreLat * Math.PI) / 180);
      const geographicWidth = (maxLon - minLon) * longitudeScale;
      const geographicHeight = maxLat - minLat;
      const scale = Math.min((width * 0.84) / geographicWidth, (height * 0.84) / geographicHeight);
      return {
        x: width * 0.52 + (lon - centreLon) * longitudeScale * scale,
        y: height * 0.5 + (centreLat - lat) * scale,
      };
    };

    const traceRing = (ring: number[][]) => {
      ring.forEach(([lon, lat], index) => {
        const point = project(lon, lat);
        if (index === 0) context.moveTo(point.x, point.y);
        else context.lineTo(point.x, point.y);
      });
      context.closePath();
    };

    const traceFeature = (feature: GeoFeature) => {
      const geometry = feature.geometry;
      context.beginPath();
      if (geometry.type === "Polygon") {
        (geometry.coordinates as number[][][]).forEach((ring) => traceRing(ring));
      } else {
        (geometry.coordinates as number[][][][]).forEach((polygon) => {
          polygon.forEach((ring) => traceRing(ring));
        });
      }
    };

    const draw = (time: number) => {
      if (!visible || !collection) {
        frame = window.requestAnimationFrame(draw);
        return;
      }
      const seconds = reduceMotion ? 0 : time / 1000;
      context.clearRect(0, 0, width, height);

      const ambient = context.createRadialGradient(
        width * 0.5,
        height * 0.45,
        0,
        width * 0.5,
        height * 0.45,
        Math.max(width, height) * 0.55,
      );
      ambient.addColorStop(0, "rgba(151,197,220,.15)");
      ambient.addColorStop(0.38, "rgba(111,32,56,.13)");
      ambient.addColorStop(1, "rgba(0,0,0,0)");
      context.fillStyle = ambient;
      context.fillRect(0, 0, width, height);

      const topGradient = context.createLinearGradient(0, height * 0.12, width, height * 0.86);
      topGradient.addColorStop(0, "rgba(228,216,199,.9)");
      topGradient.addColorStop(0.48, "rgba(132,128,132,.92)");
      topGradient.addColorStop(1, "rgba(49,44,48,.96)");
      collection.features.forEach((feature) => {
        traceFeature(feature);
        context.fillStyle = topGradient;
        context.fill("evenodd");
        context.strokeStyle = "rgba(247,232,211,.28)";
        context.lineWidth = 0.65;
        context.stroke();
      });

      destinations.forEach((node, index) => {
        const point = project(node.lon, node.lat);
        const pulse = 0.5 + Math.sin(seconds * 1.7 + index * 0.71) * 0.2;
        context.beginPath();
        context.fillStyle = `rgba(246,230,206,${0.24 + pulse * 0.22})`;
        context.arc(point.x, point.y, width < 700 ? 0.65 : 0.85, 0, Math.PI * 2);
        context.fill();
      });

      const originPoints = commerceOrigins.map((origin) => project(origin.lon, origin.lat));
      const maxWeight = commerceOrigins[0].weight;
      const streamLimit = reduceMotion ? 48 : width < 700 ? 82 : width < 1080 ? 142 : 218;

      context.save();
      context.globalCompositeOperation = "lighter";
      streams.slice(0, streamLimit).forEach((stream, index) => {
        const origin = originPoints[stream.origin];
        const destinationNode = destinations[stream.destination];
        if (!origin || !destinationNode) return;
        const destination = project(destinationNode.lon, destinationNode.lat);
        const dx = destination.x - origin.x;
        const dy = destination.y - origin.y;
        const distance = Math.hypot(dx, dy);
        const control = {
          x: (origin.x + destination.x) / 2 + stream.bend * Math.max(18, distance * 0.18),
          y: Math.min(origin.y, destination.y) - stream.lift * (46 + distance * 0.2),
        };
        const pointAt = (progress: number) => {
          const t = Math.max(0, Math.min(1, progress));
          const inverse = 1 - t;
          return {
            x: inverse * inverse * origin.x + 2 * inverse * t * control.x + t * t * destination.x,
            y: inverse * inverse * origin.y + 2 * inverse * t * control.y + t * t * destination.y,
          };
        };

        const cycle = reduceMotion ? 0.72 : (seconds * stream.speed * 2.2 + stream.phase) % 1;
        const growth = Math.min(1, cycle / 0.68);
        const fade = cycle < 0.72 ? 1 : Math.max(0, (1 - cycle) / 0.28);
        const color = orderColors[stream.origin % orderColors.length];
        const head = pointAt(growth);
        context.beginPath();
        for (let segment = 0; segment <= 18; segment += 1) {
          const point = pointAt(growth * (segment / 18));
          if (segment === 0) context.moveTo(point.x, point.y);
          else context.lineTo(point.x, point.y);
        }
        context.strokeStyle = `rgba(${color[0]},${color[1]},${color[2]},${(0.12 + stream.size * 0.22) * fade})`;
        context.lineWidth = 0.45 + stream.size * 0.62;
        context.stroke();
        context.beginPath();
        context.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${0.72 * fade})`;
        context.shadowColor = `rgba(${color[0]},${color[1]},${color[2]},${0.72 * fade})`;
        context.shadowBlur = 5 + stream.size * 5;
        context.arc(head.x, head.y, 0.5 + stream.size * 0.55, 0, Math.PI * 2);
        context.fill();
      });
      context.restore();
      context.shadowBlur = 0;

      commerceOrigins.forEach((node, index) => {
        const point = originPoints[index];
        const weightScale = Math.sqrt(node.weight / maxWeight);
        const pulse = 0.82 + Math.sin(seconds * 2.2 + index) * 0.18;
        const heightScale = (32 + weightScale * 104) * pulse;
        const gradient = context.createLinearGradient(point.x, point.y, point.x, point.y - heightScale);
        gradient.addColorStop(0, "rgba(232,205,169,.04)");
        gradient.addColorStop(1, index === 0 ? "rgba(238,205,145,.98)" : "rgba(151,197,220,.86)");
        context.fillStyle = gradient;
        context.fillRect(point.x - 1, point.y - heightScale, 2, heightScale);
        context.beginPath();
        context.fillStyle = index === 0 ? "#eecd91" : "#97c5dc";
        context.shadowColor = context.fillStyle;
        context.shadowBlur = index === 0 ? 26 : 15;
        context.arc(point.x, point.y - heightScale, index === 0 ? 4.6 : 2.4 + weightScale, 0, Math.PI * 2);
        context.fill();
        context.beginPath();
        context.strokeStyle = index === 0 ? "rgba(238,205,145,.62)" : "rgba(151,197,220,.42)";
        context.lineWidth = 0.8;
        context.arc(point.x, point.y, (8 + weightScale * 13) * pulse, 0, Math.PI * 2);
        context.stroke();
      });
      context.shadowBlur = 0;

      if (!reduceMotion) frame = window.requestAnimationFrame(draw);
    };

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    visibilityObserver.observe(canvas);
    window.addEventListener("resize", resize, { passive: true });
    resize();

    fetch(publicAsset("/data/thailand-adm1.geojson"))
      .then((response) => response.json())
      .then((data: GeoCollection) => {
        collection = data;
        destinations = data.features
          .map(featureCentre)
          .filter((point): point is GeoPoint => Boolean(point));
        streams = Array.from({ length: 420 }, (_, index) => ({
          origin: weightedOrigin(seeded(index, 31)),
          destination:
            destinations.length > 0
              ? (index * 29 + Math.floor(seeded(index, 32) * destinations.length)) % destinations.length
              : 0,
          phase: seeded(index, 33),
          speed: 0.11 + seeded(index, 34) * 0.2,
          bend: (seeded(index, 35) - 0.5) * 2,
          lift: 0.55 + seeded(index, 36) * 0.9,
          size: 0.35 + seeded(index, 37) * 0.9,
        }));
        draw(0);
      })
      .catch(() => {
        collection = { features: [] };
      });

    return () => {
      window.cancelAnimationFrame(frame);
      visibilityObserver.disconnect();
      window.removeEventListener("resize", resize);
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
        <div className="map-flow-legend" aria-hidden="true">
          <strong>300M+</strong>
          <span>{copy.scale}</span>
        </div>
      </div>
    </section>
  );
}
