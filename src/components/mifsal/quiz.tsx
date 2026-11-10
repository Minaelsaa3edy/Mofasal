import { useState } from "react";
import { quizBank, shuffle, type QuizItem } from "@/lib/pt/data";
import { useStudy } from "@/lib/pt/store";
import { Kicker } from "@/components/mifsal/ui";

const ROUND = 8;

type Props = { onDone: () => void };

export function Quiz({ onDone }: Props) {
  const best = useStudy((s) => s.quizBest);
  const recordQuiz = useStudy((s) => s.recordQuiz);
  const [round, setRound] = useState<QuizItem[] | null>(null);
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  function start() {
    const seed = Date.now() % 100000;
    setRound(shuffle(quizBank, seed).slice(0, ROUND));
    setStep(0);
    setPicked(null);
    setScore(0);
    setFinished(false);
  }

  if (!round) {
    return (
      <div className="flex flex-col gap-4">
        <header>
          <Kicker>قبل السكشن</Kicker>
          <h1 className="mt-1 text-3xl font-semibold">اختبار من ٨</h1>
          <p className="mt-2 max-w-md text-sm text-muted">
            أسئلة من الأطلس والاختبارات الخاصة والانعكاسات. أفضل نتيجة محفوظة على هذا الجهاز:{" "}
            <span className="font-semibold tabular-nums text-ink">{best || "—"}</span>
          </p>
        </header>
        <button
          type="button"
          onClick={start}
          className="tap min-h-11 rounded-full bg-sage px-5 text-sm font-semibold text-bg"
        >
          ابدئي الجولة
        </button>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="flex flex-col gap-4">
        <Kicker>النتيجة</Kicker>
        <h1 className="text-5xl font-semibold tabular-nums">
          {score}
          <span className="text-2xl text-muted">/{ROUND}</span>
        </h1>
        <p className="text-sm text-muted">
          {score >= 7 ? "مستوى عملي مطمئن. ثبّتي الاستثناءات فقط." : score >= 4 ? "الأساس موجود. أعيدي البطاقات الحمراء." : "ارجعي للأطلس ثم أعيدي الجولة."}
        </p>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={start} className="tap min-h-11 rounded-full bg-sage px-5 text-sm font-semibold text-bg">
            جولة جديدة
          </button>
          <button type="button" onClick={onDone} className="tap min-h-11 rounded-full border border-line bg-surface px-5 text-sm font-medium">
            العودة لليوم
          </button>
        </div>
      </div>
    );
  }

  const item = round[step];

  function choose(index: number) {
    if (picked !== null) return;
    setPicked(index);
    if (index === item.answer) setScore((value) => value + 1);
  }

  function next() {
    if (!round || picked === null) return;
    if (step + 1 >= round.length) {
      recordQuiz(score);
      setFinished(true);
      return;
    }
    setStep((value) => value + 1);
    setPicked(null);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between text-sm text-muted">
        <span className="tabular-nums">
          {step + 1}/{ROUND}
        </span>
        <span className="tabular-nums">الصحيح {score}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-surface">
        <div className="h-full bg-sage" style={{ width: `${((step + (picked !== null ? 1 : 0)) / ROUND) * 100}%` }} />
      </div>
      <h1 className="text-2xl font-semibold leading-snug">{item.prompt}</h1>
      <div className="flex flex-col gap-2">
        {item.choices.map((choice, index) => {
          let tone = "border-line bg-surface";
          if (picked !== null && index === item.answer) tone = "border-sage bg-sage-soft";
          else if (picked === index) tone = "border-danger bg-danger-soft";
          return (
            <button
              key={choice}
              type="button"
              disabled={picked !== null}
              onClick={() => choose(index)}
              className={`tap min-h-11 rounded-card border px-4 py-3 text-start text-sm ${tone}`}
            >
              {choice}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div className="flex flex-col gap-3">
          <p className="text-sm leading-relaxed text-muted">{item.explain}</p>
          <button type="button" onClick={next} className="tap min-h-11 rounded-full bg-ink px-5 text-sm font-semibold text-bg">
            {step + 1 === ROUND ? "النتيجة" : "التالي"}
          </button>
        </div>
      )}
    </div>
  );
}
