import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QUIZZES } from "@/data/quizzes";
import { useLang, pick } from "@/context/LanguageContext";
import { useProgress } from "@/context/ProgressContext";
import { FloatingParticles } from "@/components/museum/FloatingParticles";
import { Check, X, Trophy, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Cultural Quiz — NusantaraVerse" },
      { name: "description", content: "Test your knowledge of Indonesian culture, food, and tradition." },
    ],
  }),
  component: QuizPage,
});

function QuizPage() {
  const { t, lang } = useLang();
  const { setQuizBest } = useProgress();
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = QUIZZES[idx];

  const pickAnswer = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === q.answer) setScore((s) => s + 1);
  };
  const next = () => {
    if (idx + 1 >= QUIZZES.length) {
      const pct = Math.round(((score) / QUIZZES.length) * 100);
      setQuizBest(pct);
      setDone(true);
    } else {
      setIdx((i) => i + 1);
      setSelected(null);
    }
  };
  const reset = () => { setIdx(0); setSelected(null); setScore(0); setDone(false); };

  const pct = Math.round((score / QUIZZES.length) * 100);

  return (
    <div className="relative min-h-screen px-6 py-12">
      <FloatingParticles count={14} />
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="font-display text-5xl md:text-6xl text-gradient-gold">{t("quiz.title")}</h1>
          <p className="mt-3 text-ivory/70">{t("quiz.sub")}</p>
        </div>

        <AnimatePresence mode="wait">
          {done ? (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} className="rounded-3xl glass p-10 text-center">
              <Trophy className="mx-auto h-14 w-14 text-gold" />
              <div className="mt-4 text-xs uppercase tracking-widest text-gold">{t("quiz.score")}</div>
              <div className="font-display text-7xl text-gradient-gold mt-2">{pct}%</div>
              <div className="mt-2 text-ivory/70">{score} / {QUIZZES.length}</div>
              <button onClick={reset} className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-accent px-6 py-3 text-sm font-semibold text-background shadow-glow">
                <RotateCcw className="h-4 w-4" /> {t("quiz.retry")}
              </button>
            </motion.div>
          ) : (
            <motion.div key={idx} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="rounded-3xl glass p-8">
              <div className="flex items-center justify-between text-xs uppercase tracking-widest text-gold mb-4">
                <span>{t("quiz.question")} {idx + 1} {t("quiz.of")} {QUIZZES.length}</span>
                <span>{score} ★</span>
              </div>
              <div className="h-1.5 rounded-full bg-secondary overflow-hidden mb-6">
                <motion.div className="h-full bg-gradient-to-r from-gold to-accent" initial={{ width: 0 }} animate={{ width: `${(idx / QUIZZES.length) * 100}%` }} />
              </div>
              <h2 className="font-display text-2xl md:text-3xl text-ivory leading-tight">{pick(q.question, lang)}</h2>
              <div className="mt-6 grid gap-3">
                {q.options.map((opt, i) => {
                  const isAns = i === q.answer;
                  const isPicked = i === selected;
                  const show = selected !== null;
                  return (
                    <button
                      key={i}
                      onClick={() => pickAnswer(i)}
                      disabled={show}
                      className={`group relative flex items-center justify-between rounded-xl border px-5 py-4 text-left text-ivory transition
                        ${show && isAns ? "border-jade bg-jade/20" :
                          show && isPicked ? "border-volcano bg-volcano/20" :
                          "border-gold/20 hover:border-gold hover:bg-gold/5"}`}
                    >
                      <span>{pick(opt, lang)}</span>
                      {show && isAns && <Check className="h-5 w-5 text-jade" />}
                      {show && isPicked && !isAns && <X className="h-5 w-5 text-volcano" />}
                    </button>
                  );
                })}
              </div>
              {selected !== null && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-5 rounded-xl border border-gold/20 bg-gold/5 p-4 text-sm text-ivory/80">
                  {pick(q.explain, lang)}
                </motion.div>
              )}
              {selected !== null && (
                <button onClick={next} className="mt-6 w-full rounded-full bg-gradient-to-r from-gold to-accent py-3 text-sm font-semibold text-background shadow-glow">
                  {idx + 1 >= QUIZZES.length ? t("quiz.finish") : t("quiz.next")}
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
