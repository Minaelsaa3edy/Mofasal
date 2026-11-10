import { create } from "zustand";
import { persist } from "zustand/middleware";

export function isoDay(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function previousDay(key: string) {
  const [y, m, d] = key.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() - 1);
  return isoDay(date);
}

type StudyState = {
  known: string[];
  bookmarks: string[];
  streak: number;
  lastDay: string | null;
  reviews: Record<string, number>;
  cases: Record<string, number>;
  quizBest: number;
  quizTaken: number;
  markKnown: (id: string) => void;
  markReview: (id: string) => void;
  toggleBookmark: (id: string) => void;
  answerCase: (id: string, choice: number) => void;
  recordQuiz: (score: number) => void;
  resetCards: () => void;
};

function withStreak(state: StudyState) {
  const today = isoDay();
  if (state.lastDay === today) {
    return { streak: state.streak, lastDay: state.lastDay };
  }
  const streak = state.lastDay === previousDay(today) ? state.streak + 1 : 1;
  return { streak, lastDay: today };
}

export const useStudy = create<StudyState>()(
  persist(
    (set, get) => ({
      known: [],
      bookmarks: [],
      streak: 0,
      lastDay: null,
      reviews: {},
      cases: {},
      quizBest: 0,
      quizTaken: 0,
      markKnown: (id) => {
        const today = isoDay();
        const current = get();
        const known = current.known.includes(id) ? current.known : [...current.known, id];
        set({
          ...withStreak(current),
          known,
          reviews: { ...current.reviews, [today]: (current.reviews[today] ?? 0) + 1 },
        });
      },
      markReview: () => {
        const today = isoDay();
        const current = get();
        set({
          ...withStreak(current),
          reviews: { ...current.reviews, [today]: (current.reviews[today] ?? 0) + 1 },
        });
      },
      toggleBookmark: (id) => {
        const bookmarks = get().bookmarks;
        set({
          bookmarks: bookmarks.includes(id)
            ? bookmarks.filter((item) => item !== id)
            : [...bookmarks, id],
        });
      },
      answerCase: (id, choice) => {
        const current = get();
        if (current.cases[id] !== undefined) return;
        set({
          ...withStreak(current),
          cases: { ...current.cases, [id]: choice },
        });
      },
      recordQuiz: (score) => {
        const current = get();
        set({
          ...withStreak(current),
          quizBest: Math.max(current.quizBest, score),
          quizTaken: current.quizTaken + 1,
        });
      },
      resetCards: () => set({ known: [] }),
    }),
    { name: "mifsal-study", skipHydration: true },
  ),
);
