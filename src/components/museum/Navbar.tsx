import { Link } from "@tanstack/react-router";
import { useLang } from "@/context/LanguageContext";
import { Compass, Languages } from "lucide-react";

export function Navbar() {
  const { t, lang, toggle } = useLang();
  const linkCls = "relative text-sm tracking-wide text-ivory/70 hover:text-gold transition-colors";
  const activeCls = "text-gold";
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between glass rounded-b-2xl">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-gold to-accent shadow-glow">
            <Compass className="h-5 w-5 text-background" />
          </span>
          <span className="font-display text-xl tracking-wide text-ivory">
            Museum<span className="text-gold">Indonesia</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className={linkCls} activeOptions={{ exact: true }} activeProps={{ className: activeCls }}>{t("nav.home")}</Link>
          <Link to="/explore" className={linkCls} activeProps={{ className: activeCls }}>{t("nav.explore")}</Link>
          <Link to="/food" className={linkCls} activeProps={{ className: activeCls }}>{t("nav.food")}</Link>
          <Link to="/quiz" className={linkCls} activeProps={{ className: activeCls }}>{t("nav.quiz")}</Link>
          <Link to="/passport" className={linkCls} activeProps={{ className: activeCls }}>{t("nav.passport")}</Link>
        </nav>
        <button
          onClick={toggle}
          className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3 py-1.5 text-xs font-medium text-gold hover:bg-gold/15 transition"
        >
          <Languages className="h-3.5 w-3.5" />
          <span className={lang === "en" ? "text-gold" : "text-ivory/40"}>EN</span>
          <span className="text-ivory/30">/</span>
          <span className={lang === "id" ? "text-gold" : "text-ivory/40"}>ID</span>
        </button>
      </div>
    </header>
  );
}
