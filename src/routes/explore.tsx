import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { IndonesiaMap } from "@/components/museum/IndonesiaMap";
import { ProvinceModal } from "@/components/museum/ProvinceModal";
import { FloatingParticles } from "@/components/museum/FloatingParticles";
import { Province, PROVINCES } from "@/data/provinces";
import { useLang, pick } from "@/context/LanguageContext";
import { useProgress } from "@/context/ProgressContext";
import { motion } from "framer-motion";
import { MapPin, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore Indonesia — NusantaraVerse" },
      { name: "description", content: "An interactive map of Indonesia's provinces — tap any glowing pin to enter a cultural world." },
    ],
  }),
  component: ExplorePage,
});

function ExplorePage() {
  const { t, lang } = useLang();
  const { visited } = useProgress();
  const [selected, setSelected] = useState<Province | null>(null);

  return (
    <div className="relative min-h-screen px-6 py-12">
      <FloatingParticles count={18} />
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="font-display text-5xl md:text-6xl text-gradient-gold">{t("explore.title")}</h1>
          <p className="mt-3 text-ivory/70">{t("explore.sub")}</p>
          <div className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold">
            <CheckCircle2 className="h-3.5 w-3.5" /> {visited.length}/{PROVINCES.length} {t("explore.visited")}
          </div>
        </motion.div>

        <IndonesiaMap onSelect={setSelected} />

        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {PROVINCES.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p)}
              className="group text-left rounded-xl glass p-4 hover:scale-[1.03] transition relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition" style={{ background: `radial-gradient(circle at center, ${p.color}33, transparent 70%)` }} />
              <div className="relative">
                <div className="flex items-start justify-between">
                  <MapPin className="h-4 w-4 text-gold" />
                  {visited.includes(p.id) && <span className="text-[10px] text-gold">★</span>}
                </div>
                <div className="mt-2 font-display text-lg text-ivory">{p.name}</div>
                <div className="text-[11px] uppercase tracking-wider text-ivory/50">{pick(p.region, lang)}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <ProvinceModal province={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
