import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "en" | "id";

const DICT = {
  nav: {
    home: { en: "Home", id: "Beranda" },
    explore: { en: "Explore", id: "Jelajah" },
    food: { en: "Cuisine", id: "Kuliner" },
    quiz: { en: "Quiz", id: "Kuis" },
    passport: { en: "Passport", id: "Paspor" },
  },
  hero: {
    eyebrow: { en: "Interactive Digital Museum", id: "Museum Digital Interaktif" },
    title: { en: "MuseumIndonesia", id: "MuseumIndonesia" },
    subtitle: {
      en: "A living mosaic of 38 provinces, 1,300+ ethnic groups, and a millennia of cultural brilliance — explored cinematically.",
      id: "Mosaik hidup dari 38 provinsi, 1.300+ suku bangsa, dan ribuan tahun warisan budaya — dijelajahi secara sinematik.",
    },
    cta1: { en: "Start the Journey", id: "Mulai Perjalanan" },
    cta2: { en: "Explore Indonesia", id: "Jelajahi Indonesia" },
    quote: {
      en: '"Indonesia is a living mosaic of culture and heritage."',
      id: '"Indonesia adalah mosaik hidup budaya dan warisan."',
    },
  },
  stats: {
    provinces: { en: "Provinces", id: "Provinsi" },
    islands: { en: "Islands", id: "Pulau" },
    languages: { en: "Languages", id: "Bahasa" },
    heritage: { en: "UNESCO Heritage", id: "Warisan UNESCO" },
  },
  explore: {
    title: { en: "The Archipelago Map", id: "Peta Nusantara" },
    sub: { en: "Tap a glowing province to enter its world.", id: "Sentuh provinsi bercahaya untuk memasukinya." },
    visited: { en: "Visited", id: "Dikunjungi" },
  },
  detail: {
    capital: { en: "Capital", id: "Ibu Kota" },
    region: { en: "Region", id: "Wilayah" },
    house: { en: "Traditional House", id: "Rumah Adat" },
    dance: { en: "Signature Dance", id: "Tarian Khas" },
    music: { en: "Music", id: "Musik" },
    food: { en: "Iconic Dish", id: "Hidangan Ikonik" },
    wisdom: { en: "Local Wisdom", id: "Kearifan Lokal" },
    watch: { en: "Watch Documentary", id: "Tonton Dokumenter" },
    collect: { en: "Collect Stamp", id: "Koleksi Cap" },
    collected: { en: "Stamp Collected", id: "Cap Terkumpul" },
    close: { en: "Close", id: "Tutup" },
  },
  food: {
    title: { en: "Cuisine of the Archipelago", id: "Kuliner Nusantara" },
    sub: { en: "From the smoky kitchens of Padang to the sago hearths of Papua.", id: "Dari dapur berasap Padang hingga tungku sagu Papua." },
    origin: { en: "Origin", id: "Asal" },
    facts: { en: "Did you know?", id: "Tahukah kamu?" },
  },
  quiz: {
    title: { en: "Cultural Quiz", id: "Kuis Budaya" },
    sub: { en: "How well do you know the Archipelago?", id: "Seberapa kenal kamu dengan Nusantara?" },
    start: { en: "Begin Quiz", id: "Mulai Kuis" },
    next: { en: "Next", id: "Lanjut" },
    finish: { en: "Finish", id: "Selesai" },
    retry: { en: "Try Again", id: "Coba Lagi" },
    score: { en: "Your Score", id: "Skor Kamu" },
    correct: { en: "Correct!", id: "Benar!" },
    wrong: { en: "Not quite", id: "Belum tepat" },
    question: { en: "Question", id: "Pertanyaan" },
    of: { en: "of", id: "dari" },
  },
  passport: {
    title: { en: "Explorer Passport", id: "Paspor Penjelajah" },
    sub: { en: "Your journey across the Archipelago.", id: "Jejak perjalananmu di Nusantara." },
    progress: { en: "Exploration progress", id: "Progres jelajah" },
    stamps: { en: "Stamps", id: "Cap" },
    achievements: { en: "Achievements", id: "Pencapaian" },
    empty: { en: "Visit provinces to collect stamps.", id: "Kunjungi provinsi untuk mengumpulkan cap." },
    reset: { en: "Reset journey", id: "Atur ulang perjalanan" },
  },
  achievements: {
    first: { en: "First Footsteps", id: "Langkah Pertama" },
    firstDesc: { en: "Collected your first stamp.", id: "Kumpulkan cap pertamamu." },
    five: { en: "Island Hopper", id: "Penjelajah Pulau" },
    fiveDesc: { en: "Visited 5 provinces.", id: "Kunjungi 5 provinsi." },
    quiz: { en: "Cultural Scholar", id: "Cendekia Budaya" },
    quizDesc: { en: "Score 80%+ on the quiz.", id: "Raih skor 80%+ pada kuis." },
    all: { en: "Nusantara Master", id: "Sang Maestro Nusantara" },
    allDesc: { en: "Visit every featured province.", id: "Kunjungi semua provinsi unggulan." },
  },
  audio: { on: { en: "Sound On", id: "Suara On" }, off: { en: "Sound Off", id: "Suara Off" } },
} as const;

type DictTree = typeof DICT;
type Path<T, P extends string = ""> = {
  [K in keyof T & string]: T[K] extends { en: string; id: string }
  ? `${P}${P extends "" ? "" : "."}${K}`
  : Path<T[K], `${P}${P extends "" ? "" : "."}${K}`>;
}[keyof T & string];
export type TKey = Path<DictTree>;

interface Ctx { lang: Lang; setLang: (l: Lang) => void; t: (k: TKey) => string; toggle: () => void; }
const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("nv:lang") as Lang | null) : null;
    if (saved === "en" || saved === "id") setLangState(saved);
  }, []);
  const setLang = (l: Lang) => { setLangState(l); if (typeof window !== "undefined") localStorage.setItem("nv:lang", l); };
  const t = (key: TKey) => {
    const parts = key.split(".");
    let node: any = DICT;
    for (const p of parts) node = node?.[p];
    return node?.[lang] ?? key;
  };
  return <LanguageContext.Provider value={{ lang, setLang, t, toggle: () => setLang(lang === "en" ? "id" : "en") }}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}

export function pick<T>(obj: { en: T; id: T }, lang: Lang): T { return obj[lang]; }
