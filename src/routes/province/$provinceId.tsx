import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { FloatingParticles } from "@/components/museum/FloatingParticles";
import { PROVINCE_BY_ID } from "@/data/provinces";
import { useLang, pick } from "@/context/LanguageContext";
import { useProgress } from "@/context/ProgressContext";
import {
  ArrowLeft,
  MapPin,
  Home,
  Music,
  Drum,
  UtensilsCrossed,
  Sparkles,
  Stamp,
  CheckCircle2,
  Film,
} from "lucide-react";

export const Route = createFileRoute("/province/$provinceId")({
  head: ({ params }) => {
    const province = PROVINCE_BY_ID[params.provinceId];
    return {
      meta: [
        {
          title: province
            ? `${province.name} — NusantaraVerse`
            : "Province — NusantaraVerse",
        },
        {
          name: "description",
          content: province
            ? `Explore the culture, cuisine, and heritage of ${province.name}, Indonesia.`
            : "Province detail page.",
        },
      ],
    };
  },
  component: ProvincePage,
});

function ProvincePage() {
  const { provinceId } = Route.useParams();
  const { t, lang } = useLang();
  const { visit, visited } = useProgress();
  const { scrollY } = useScroll();

  const backgroundY = useTransform(scrollY, [0, 500], ["0%", "30%"]);
  const textY = useTransform(scrollY, [0, 500], ["0%", "60%"]);
  const textOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  const province = PROVINCE_BY_ID[provinceId];

  if (!province) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-5xl text-gold">404</h1>
          <p className="mt-3 text-ivory/70">Province not found</p>
          <Link
            to="/explore"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-background"
          >
            <ArrowLeft className="h-4 w-4" /> Back to map
          </Link>
        </div>
      </div>
    );
  }

  const isVisited = visited.includes(province.id);

  return (
    <div className="relative min-h-screen -mt-20">
      <FloatingParticles count={14} />

      {/* Hero */}
      <div className="relative h-[60vh] min-h-[440px] overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to bottom, ${province.color}80, rgba(0,0,0,0.9)), url(${province.heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            y: backgroundY,
          }}
        />
        
        {/* Batik overlay */}
        <div className="absolute inset-0 batik-pattern opacity-20" />

        {/* Gradient darkening at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

        {/* Back button */}
        <div className="absolute top-24 left-6 z-10">
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 rounded-full bg-background/50 backdrop-blur-sm border border-gold/30 px-4 py-2 text-sm font-medium text-ivory hover:bg-background/70 transition"
          >
            <ArrowLeft className="h-4 w-4 text-gold" />
            Back to Map
          </Link>
        </div>

        {/* Visited badge */}
        {isVisited && (
          <div className="absolute top-24 right-6 z-10 inline-flex items-center gap-1.5 rounded-full bg-gold/20 border border-gold/40 px-3 py-1.5 text-xs font-semibold text-gold">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Stamp Collected
          </div>
        )}

        {/* Title block */}
        <motion.div 
          className="absolute bottom-10 left-0 right-0 px-6 md:px-12"
          style={{ y: textY, opacity: textOpacity }}
        >
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-ivory/60">
                <MapPin className="h-3 w-3 text-gold" />
                {pick(province.region, lang)}
              </div>
              <h1 className="mt-2 font-display text-5xl md:text-7xl text-ivory drop-shadow-lg">
                {province.name}
              </h1>
              <p className="mt-1 text-sm text-ivory/50">
                Capital: {province.capital}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 md:px-12 pb-20">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-10"
        >
          <p className="text-ivory/80 leading-relaxed text-lg md:text-xl">
            {pick(province.intro, lang)}
          </p>
        </motion.div>

        {/* Cultural Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          <StatCard
            icon={<Home className="h-4 w-4" />}
            label={t("detail.house")}
            value={pick(province.house, lang)}
            color={province.color}
          />
          <StatCard
            icon={<Drum className="h-4 w-4" />}
            label={t("detail.dance")}
            value={pick(province.dance, lang)}
            color={province.color}
          />
          <StatCard
            icon={<Music className="h-4 w-4" />}
            label={t("detail.music")}
            value={pick(province.music, lang)}
            color={province.color}
          />
          <StatCard
            icon={<UtensilsCrossed className="h-4 w-4" />}
            label={t("detail.food")}
            value={province.food}
            color={province.color}
          />
          <StatCard
            icon={<Sparkles className="h-4 w-4" />}
            label={t("detail.wisdom")}
            value={pick(province.wisdom, lang)}
            color={province.color}
            wide
          />
        </motion.div>

        {/* Divider */}
        <div
          className="mt-12 h-px w-full"
          style={{
            background: `linear-gradient(to right, transparent, ${province.color}60, transparent)`,
          }}
        />

        {/* Documentary Embed */}
        {province.documentary && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mt-10"
          >
            <div className="flex items-center gap-2 mb-4">
              <Film className="h-5 w-5" style={{ color: province.color }} />
              <h2 className="font-display text-2xl text-ivory">
                {t("detail.watch")}
              </h2>
            </div>

            {/* Player wrapper with cinematic frame */}
            <div
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              style={{
                border: `1px solid ${province.color}40`,
                boxShadow: `0 0 40px ${province.color}25, 0 20px 60px rgba(0,0,0,0.6)`,
              }}
            >
              {/* Top bar decoration */}
              <div
                className="h-1.5 w-full"
                style={{
                  background: `linear-gradient(to right, ${province.color}, ${province.color}60, transparent)`,
                }}
              />

              {/* Responsive 16:9 iframe */}
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  src={`https://www.youtube.com/embed/${province.documentary}?rel=0&modestbranding=1&color=white`}
                  title={`${province.name} Documentary`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0 }}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Divider after documentary */}
        <div
          className="mt-10 h-px w-full"
          style={{
            background: `linear-gradient(to right, transparent, ${province.color}40, transparent)`,
          }}
        />

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="mt-8 flex flex-wrap gap-4 items-center"
        >
          <button
            onClick={() => visit(province.id)}
            disabled={isVisited}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-accent px-6 py-3 font-semibold text-background shadow-glow hover:scale-[1.03] transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Stamp className="h-4 w-4" />
            {isVisited ? t("detail.collected") : t("detail.collect")}
          </button>

          <Link
            to="/explore"
            className="inline-flex items-center gap-2 rounded-full border border-ivory/20 px-6 py-3 text-sm font-medium text-ivory/70 hover:text-ivory hover:border-ivory/40 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Map
          </Link>
        </motion.div>

        {/* Other Provinces Quick Nav */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-16"
        >
          <h2 className="font-display text-2xl text-gold mb-6">
            Explore More Provinces
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {Object.values(PROVINCE_BY_ID)
              .filter((p) => p.id !== province.id)
              .map((p) => (
                <Link
                  key={p.id}
                  to="/province/$provinceId"
                  params={{ provinceId: p.id }}
                  className="group relative rounded-xl glass p-3 hover:scale-[1.03] transition overflow-hidden text-left"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition"
                    style={{
                      background: `radial-gradient(circle at center, ${p.color}33, transparent 70%)`,
                    }}
                  />
                  <div className="relative">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3 w-3 text-gold shrink-0" />
                      {visited.includes(p.id) && (
                        <span className="text-[10px] text-gold">★</span>
                      )}
                    </div>
                    <div className="mt-1.5 font-display text-base text-ivory">
                      {p.name}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-ivory/50">
                      {pick(p.region, lang).split(" ").slice(0, 2).join(" ")}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
  wide = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
  wide?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl glass border p-4 transition hover:scale-[1.01] ${wide ? "col-span-2 md:col-span-1" : ""}`}
      style={{ borderColor: `${color}30` }}
    >
      <div
        className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest mb-2"
        style={{ color: `${color}cc` }}
      >
        {icon}
        <span>{label}</span>
      </div>
      <div className="text-sm text-ivory leading-snug">{value}</div>
    </div>
  );
}
