import { motion } from "framer-motion";
import { PROVINCES, Province } from "@/data/provinces";
import { useLang, pick } from "@/context/LanguageContext";
import { useProgress } from "@/context/ProgressContext";

interface Props { onSelect: (p: Province) => void; }

export function IndonesiaMap({ onSelect }: Props) {
  const { lang } = useLang();
  const { visited } = useProgress();

  return (
    <div className="relative w-full overflow-hidden rounded-3xl glass p-4 md:p-8 shadow-elevated">
      <div className="absolute inset-0 batik-pattern opacity-30 pointer-events-none" />
      <svg viewBox="0 0 1000 420" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="ocean" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="oklch(0.32 0.06 220 / 0.4)" />
            <stop offset="100%" stopColor="oklch(0.16 0.02 60 / 0.1)" />
          </radialGradient>
          <filter id="glow"><feGaussianBlur stdDeviation="3" /></filter>
        </defs>

        <rect width="1000" height="420" fill="url(#ocean)" />

        {/* Stylized Indonesia silhouette: organic blobs */}
        <g fill="oklch(0.30 0.04 60)" stroke="oklch(0.82 0.15 85 / 0.45)" strokeWidth="1.2">
          {/* Sumatra */}
          <path d="M60,60 Q120,70 160,140 Q200,210 230,260 Q210,280 180,260 Q140,220 110,170 Q80,120 60,60 Z" />
          {/* Java */}
          <path d="M260,295 Q330,275 400,290 Q470,300 510,310 Q480,335 420,330 Q340,335 280,320 Q255,310 260,295 Z" />
          {/* Bali + NTB + NTT */}
          <ellipse cx="498" cy="330" rx="18" ry="9" />
          <ellipse cx="535" cy="338" rx="20" ry="8" />
          <path d="M555,342 Q600,350 640,348 Q610,358 570,355 Z" />
          {/* Kalimantan */}
          <path d="M380,80 Q470,90 520,140 Q560,210 530,250 Q470,260 420,240 Q360,200 360,140 Z" />
          {/* Sulawesi */}
          <path d="M580,160 Q610,210 600,260 Q585,290 615,260 Q640,225 650,180 Q665,140 690,110 Q670,95 645,130 Q620,160 610,140 Q605,110 580,120 Z" />
          {/* Maluku */}
          <ellipse cx="760" cy="200" rx="22" ry="14" />
          <ellipse cx="790" cy="240" rx="14" ry="10" />
          {/* Papua */}
          <path d="M820,180 Q900,170 960,210 Q980,260 940,280 Q870,290 830,260 Q800,220 820,180 Z" />
        </g>

        {/* Animated clouds */}
        {[0, 1, 2].map((i) => (
          <motion.ellipse
            key={i}
            cx={200 + i * 280}
            cy={40 + i * 12}
            rx="80" ry="10"
            fill="oklch(0.96 0.015 80 / 0.06)"
            animate={{ cx: [200 + i * 280, 1100, 200 + i * 280] }}
            transition={{ duration: 60 + i * 10, repeat: Infinity, ease: "linear" }}
          />
        ))}

        {/* Markers */}
        {PROVINCES.map((p, idx) => {
          const isVisited = visited.includes(p.id);
          return (
            <g key={p.id} onClick={() => onSelect(p)} style={{ cursor: "pointer" }}>
              <motion.circle
                cx={p.x} cy={p.y} r="14"
                fill={p.color} opacity="0.25"
                filter="url(#glow)"
                animate={{ r: [12, 22, 12], opacity: [0.15, 0.45, 0.15] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: idx * 0.18 }}
              />
              <motion.circle
                cx={p.x} cy={p.y} r="6"
                fill={isVisited ? "oklch(0.82 0.15 85)" : p.color}
                stroke="oklch(0.96 0.015 80)" strokeWidth="1.5"
                whileHover={{ scale: 1.6 }}
              />
              <text
                x={p.x} y={p.y - 22}
                textAnchor="middle"
                fontSize="11"
                fill="oklch(0.96 0.015 80 / 0.85)"
                className="pointer-events-none select-none font-medium"
              >
                {pick(p.region, lang).split(" ")[0]} · {p.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
