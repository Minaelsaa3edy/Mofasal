import { useEffect, useState } from "react";
import { Bone, House, Layers, Ruler, Stethoscope } from "lucide-react";
import { useStudy } from "@/lib/pt/store";
import { Atlas } from "@/components/mifsal/atlas";
import { Cards } from "@/components/mifsal/cards";
import { Cases } from "@/components/mifsal/cases";
import { Home } from "@/components/mifsal/home";
import { Quiz } from "@/components/mifsal/quiz";
import { Rom } from "@/components/mifsal/rom";

export type View = "home" | "atlas" | "rom" | "cards" | "cases" | "quiz";
export type RomTab = "motion" | "mmt";

const nav: { id: View; label: string; icon: typeof House }[] = [
  { id: "home", label: "اليوم", icon: House },
  { id: "atlas", label: "عضلات", icon: Bone },
  { id: "rom", label: "المدى", icon: Ruler },
  { id: "cards", label: "بطاقات", icon: Layers },
  { id: "cases", label: "حالات", icon: Stethoscope },
];

export function App() {
  const [view, setView] = useState<View>("home");
  const [romTab, setRomTab] = useState<RomTab>("motion");
  const [muscleId, setMuscleId] = useState<string | null>(null);

  useEffect(() => {
    void useStudy.persist.rehydrate();
  }, []);

  function open(next: View) {
    if (next !== "atlas") setMuscleId(null);
    setView(next);
  }

  return (
    <div className="min-h-dvh bg-bg text-ink">
      <main className="mx-auto w-full max-w-3xl px-4 pt-6 pb-28">
        {view === "home" && (
          <Home
            onCards={() => open("cards")}
            onCases={() => open("cases")}
            onQuiz={() => open("quiz")}
            onMuscle={(id) => {
              setMuscleId(id);
              setView("atlas");
            }}
            onMmt={() => {
              setRomTab("mmt");
              setView("rom");
            }}
            onRom={() => {
              setRomTab("motion");
              setView("rom");
            }}
          />
        )}
        {view === "atlas" && (
          <Atlas
            selectedId={muscleId}
            onSelect={setMuscleId}
            onBack={() => setMuscleId(null)}
          />
        )}
        {view === "rom" && <Rom tab={romTab} onTab={setRomTab} />}
        {view === "cards" && <Cards />}
        {view === "cases" && <Cases />}
        {view === "quiz" && <Quiz onDone={() => open("home")} />}
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-20 flex justify-center px-3 pb-3">
        <div className="flex w-full max-w-md items-stretch justify-between rounded-full border border-line bg-surface px-1 py-1 shadow-card">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = view === item.id || (item.id === "home" && view === "quiz");
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => open(item.id)}
                className={`tap flex min-h-11 flex-1 flex-col items-center justify-center gap-0.5 rounded-full text-xs font-medium ${
                  active ? "bg-sage-soft text-sage" : "text-muted"
                }`}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="size-5" strokeWidth={1.75} />
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
