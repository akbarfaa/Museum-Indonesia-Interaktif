import { AnimatePresence, motion } from "framer-motion";
import { Province } from "@/data/provinces";
import { useLang, pick } from "@/context/LanguageContext";
import { useProgress } from "@/context/ProgressContext";
import { X, Stamp, Play, MapPin, Home, Music, Drum, UtensilsCrossed, Sparkles } from "lucide-react";

interface Props { province: Province | null; onClose: () => void; }

export function ProvinceModal({ province, onClose }: Props) {
  const { t, lang } = useLang();
  const { visit, visited } = useProgress();

  return (
    <AnimatePresence>
      {province && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />
          <motion.div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl glass shadow-elevated"
            initial={{ scale: 0.92, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 30 }}
            transition={{ type: "spring", damping: 24 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative h-56 md:h-72 overflow-hidden rounded-t-3xl"
              style={{ background: `linear-gradient(135deg, ${province.color}, oklch(0.18 0.025 60))` }}
            >
              <div className="absolute inset-0 batik-pattern opacity-25" />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 rounded-full bg-background/60 p-2 text-ivory hover:bg-background"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.2em] text-ivory/70">
                  <MapPin className="h-3 w-3" /> {pick(province.region, lang)}
                </div>
                <h2 className="mt-2 font-display text-4xl md:text-5xl text-ivory">{province.name}</h2>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              <p className="text-ivory/80 leading-relaxed text-lg">{pick(province.intro, lang)}</p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <Stat icon={<MapPin className="h-4 w-4" />} label={t("detail.capital")} value={province.capital} />
                <Stat icon={<Home className="h-4 w-4" />} label={t("detail.house")} value={pick(province.house, lang)} />
                <Stat icon={<Drum className="h-4 w-4" />} label={t("detail.dance")} value={pick(province.dance, lang)} />
                <Stat icon={<Music className="h-4 w-4" />} label={t("detail.music")} value={pick(province.music, lang)} />
                <Stat icon={<UtensilsCrossed className="h-4 w-4" />} label={t("detail.food")} value={province.food} />
                <Stat icon={<Sparkles className="h-4 w-4" />} label={t("detail.wisdom")} value={pick(province.wisdom, lang)} />
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => visit(province.id)}
                  disabled={visited.includes(province.id)}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-accent px-5 py-2.5 text-sm font-semibold text-background shadow-glow hover:scale-[1.02] transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Stamp className="h-4 w-4" />
                  {visited.includes(province.id) ? t("detail.collected") : t("detail.collect")}
                </button>
                {province.documentary && (
                  <a
                    href={`https://www.youtube.com/watch?v=${province.documentary}`}
                    target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-5 py-2.5 text-sm font-semibold text-gold hover:bg-gold/10 transition"
                  >
                    <Play className="h-4 w-4" /> {t("detail.watch")}
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-secondary/40 border border-gold/15 p-3">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-gold/80">
        {icon}<span>{label}</span>
      </div>
      <div className="mt-1 text-sm text-ivory leading-snug">{value}</div>
    </div>
  );
}
