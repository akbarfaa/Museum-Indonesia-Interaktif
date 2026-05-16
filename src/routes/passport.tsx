import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { useProgress } from "@/context/ProgressContext";
import { PROVINCES } from "@/data/provinces";
import { FloatingParticles } from "@/components/museum/FloatingParticles";
import { Award, Stamp, Lock } from "lucide-react";

export const Route = createFileRoute("/passport")({
  head: () => ({
    meta: [
      { title: "Explorer Passport — NusantaraVerse" },
      { name: "description", content: "Your stamps and achievements across the Archipelago." },
    ],
  }),
  component: PassportPage,
});

function PassportPage() {
  const { t } = useLang();
  const { visited, achievements, reset, quizBest } = useProgress();
  const pct = Math.round((visited.length / PROVINCES.length) * 100);

  return (
    <div className="relative min-h-screen px-6 py-12">
      <FloatingParticles count={14} />
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <h1 className="font-display text-5xl md:text-6xl text-gradient-gold">{t("passport.title")}</h1>
          <p className="mt-3 text-ivory/70">{t("passport.sub")}</p>
        </div>

        <div className="rounded-3xl glass p-8 mb-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-gold">{t("passport.progress")}</div>
              <div className="font-display text-5xl text-gradient-gold mt-1">{pct}%</div>
              <div className="text-sm text-ivory/60 mt-1">{visited.length} / {PROVINCES.length} {t("passport.stamps")} · Quiz {quizBest}%</div>
            </div>
            <button onClick={reset} className="text-xs text-ivory/50 hover:text-volcano underline">
              {t("passport.reset")}
            </button>
          </div>
          <div className="h-2 rounded-full bg-secondary overflow-hidden mt-5">
            <motion.div className="h-full bg-gradient-to-r from-gold to-accent" initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8 }} />
          </div>
        </div>

        <div className="mb-12">
          <h2 className="font-display text-2xl text-ivory mb-4">{t("passport.stamps")}</h2>
          {visited.length === 0 ? (
            <div className="rounded-2xl glass p-10 text-center text-ivory/60">{t("passport.empty")}</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {PROVINCES.map((p) => {
                const got = visited.includes(p.id);
                return (
                  <motion.div
                    key={p.id}
                    whileHover={got ? { rotate: -3, scale: 1.04 } : {}}
                    className={`relative aspect-square rounded-2xl flex flex-col items-center justify-center p-3 text-center border-2 border-dashed transition
                      ${got ? "border-gold bg-gold/10 shadow-glow" : "border-ivory/10 bg-card/30 opacity-50"}`}
                  >
                    {got ? <Stamp className="h-7 w-7 text-gold" /> : <Lock className="h-7 w-7 text-ivory/30" />}
                    <div className="mt-2 text-xs font-display text-ivory">{p.name}</div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        <div>
          <h2 className="font-display text-2xl text-ivory mb-4">{t("passport.achievements")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((a) => (
              <div
                key={a.id}
                className={`rounded-2xl p-5 flex items-start gap-4 border transition
                  ${a.unlocked ? "border-gold/50 bg-gradient-to-br from-gold/10 to-accent/5 shadow-glow" : "border-ivory/10 bg-card/30 opacity-60"}`}
              >
                <div className={`h-12 w-12 rounded-full flex items-center justify-center ${a.unlocked ? "bg-gradient-to-br from-gold to-accent text-background" : "bg-secondary text-ivory/40"}`}>
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-display text-lg text-ivory">{t(`achievements.${a.id}` as any)}</div>
                  <div className="text-sm text-ivory/60">{t(`achievements.${a.id}Desc` as any)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
