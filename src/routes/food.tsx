import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FOODS } from "@/data/foods";
import { useLang, pick } from "@/context/LanguageContext";
import { FloatingParticles } from "@/components/museum/FloatingParticles";
import { Sparkles, MapPin } from "lucide-react";

export const Route = createFileRoute("/food")({
  head: () => ({
    meta: [
      { title: "Cuisine of the Archipelago — NusantaraVerse" },
      { name: "description", content: "From rendang to papeda — taste the iconic dishes of Indonesia's regions." },
    ],
  }),
  component: FoodPage,
});

function FoodPage() {
  const { t, lang } = useLang();
  return (
    <div className="relative min-h-screen px-6 py-12">
      <FloatingParticles count={16} />
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="font-display text-5xl md:text-6xl text-gradient-gold">{t("food.title")}</h1>
          <p className="mt-3 text-ivory/70 max-w-2xl mx-auto">{t("food.sub")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FOODS.map((f, i) => (
            <motion.article
              key={f.id}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl glass p-6"
            >
              <div className="absolute inset-0 opacity-40" style={{ background: `radial-gradient(circle at top right, ${f.color}66, transparent 65%)` }} />
              <div className="relative">
                <div className="text-6xl mb-4 transition-transform group-hover:scale-110 group-hover:-rotate-6">{f.emoji}</div>
                <h3 className="font-display text-2xl text-ivory">{f.name}</h3>
                <div className="mt-1 inline-flex items-center gap-1 text-[11px] uppercase tracking-widest text-gold">
                  <MapPin className="h-3 w-3" /> {f.origin}
                </div>
                <p className="mt-4 text-sm text-ivory/75 leading-relaxed">{pick(f.description, lang)}</p>
                <div className="mt-4 rounded-lg border border-gold/20 bg-gold/5 p-3 text-xs text-ivory/80">
                  <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-gold mb-1">
                    <Sparkles className="h-3 w-3" /> {t("food.facts")}
                  </div>
                  {pick(f.fact, lang)}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
