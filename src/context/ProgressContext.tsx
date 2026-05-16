import { createContext, useContext, useEffect, useState, ReactNode, useMemo } from "react";

interface ProgressState {
  visited: string[];
  quizBest: number;
}
interface Ctx extends ProgressState {
  visit: (id: string) => void;
  setQuizBest: (n: number) => void;
  reset: () => void;
  achievements: { id: string; unlocked: boolean }[];
}

const KEY = "nv:progress";
const ProgressContext = createContext<Ctx | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>({ visited: [], quizBest: 0 });
  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem(KEY);
    if (raw) try { setState(JSON.parse(raw)); } catch {}
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(state));
  }, [state]);

  const visit = (id: string) =>
    setState((s) => (s.visited.includes(id) ? s : { ...s, visited: [...s.visited, id] }));
  const setQuizBest = (n: number) => setState((s) => ({ ...s, quizBest: Math.max(s.quizBest, n) }));
  const reset = () => setState({ visited: [], quizBest: 0 });

  const achievements = useMemo(() => [
    { id: "first", unlocked: state.visited.length >= 1 },
    { id: "five", unlocked: state.visited.length >= 5 },
    { id: "quiz", unlocked: state.quizBest >= 80 },
    { id: "all", unlocked: state.visited.length >= 8 },
  ], [state]);

  return (
    <ProgressContext.Provider value={{ ...state, visit, setQuizBest, reset, achievements }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
