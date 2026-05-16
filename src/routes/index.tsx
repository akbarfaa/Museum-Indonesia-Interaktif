import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Sparkles } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { FloatingParticles } from "@/components/museum/FloatingParticles";

export const Route = createFileRoute("/")({ component: Landing });

function Landing() {
  const { t } = useLang();
  const stats = [
    { v: "38", k: "stats.provinces" as const },
    { v: "17,508", k: "stats.islands" as const },
    { v: "700+", k: "stats.languages" as const },
    { v: "10", k: "stats.heritage" as const },
  ];
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <FloatingParticles count={36} />

      {/* Decorative archipelago silhouette */}
      <svg className="absolute inset-x-0 bottom-0 w-full opacity-30 pointer-events-none" viewBox="0 0 1000 200" preserveAspectRatio="none">
        <motion.path
          d="M0,150 Q150,90 280,140 Q400,170 500,130 Q620,90 720,140 Q830,180 1000,120 L1000,200 L0,200 Z"
          fill="oklch(0.82 0.15 85 / 0.10)"
          animate={{ d: [
            "M0,150 Q150,90 280,140 Q400,170 500,130 Q620,90 720,140 Q830,180 1000,120 L1000,200 L0,200 Z",
            "M0,140 Q150,110 280,150 Q400,130 500,160 Q620,120 720,130 Q830,160 1000,140 L1000,200 L0,200 Z",
            "M0,150 Q150,90 280,140 Q400,170 500,130 Q620,90 720,140 Q830,180 1000,120 L1000,200 L0,200 Z",
          ]}}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      <section className="relative mx-auto max-w-6xl px-6 pt-20 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-gold"
        >
          <Sparkles className="h-3 w-3" /> {t("hero.eyebrow")}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.8 }}
          className="mt-8 font-display text-6xl md:text-8xl leading-[0.95] text-ivory"
        >
          <span className="text-gradient-gold">{t("hero.title")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-ivory/70 leading-relaxed"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            to="/explore"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-accent px-7 py-3.5 text-sm font-semibold text-background shadow-glow hover:scale-[1.03] transition"
          >
            <Compass className="h-4 w-4" />
            {t("hero.cta1")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/food"
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-7 py-3.5 text-sm font-semibold text-gold hover:bg-gold/10 transition"
          >
            {t("hero.cta2")}
          </Link>
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          className="mt-16 font-display italic text-ivory/50 text-lg"
        >
          {t("hero.quote")}
        </motion.blockquote>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.k}
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + i * 0.1 }}
              className="rounded-2xl glass p-6 text-left"
            >
              <div className="font-display text-4xl text-gradient-gold">{s.v}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-ivory/60">{t(s.k)}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
