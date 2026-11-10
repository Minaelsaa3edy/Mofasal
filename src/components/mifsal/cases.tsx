import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { cases } from "@/lib/pt/data";
import { useStudy } from "@/lib/pt/store";
import { Kicker } from "@/components/mifsal/ui";

export function Cases() {
  const [openId, setOpenId] = useState<string | null>(null);
  const answered = useStudy((s) => s.cases);
  const selected = cases.find((item) => item.id === openId);

  if (selected) return <CaseView id={selected.id} onBack={() => setOpenId(null)} />;

  return (
    <div className="flex flex-col gap-4">
      <header>
        <Kicker>شفوي مختصر</Kicker>
        <h1 className="mt-1 text-3xl font-semibold">حالات</h1>
        <p className="mt-1 text-sm text-muted">اقرئي الصورة ثم اختاري. الإجابة تُحفظ على هذا الجهاز.</p>
      </header>
      <ul className="flex flex-col gap-2">
        {cases.map((item, index) => {
          const choice = answered[item.id];
          const correct = choice === item.answer;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setOpenId(item.id)}
                className="tap flex min-h-11 w-full items-center gap-3 rounded-card border border-line bg-surface px-4 py-3 text-start"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-bg text-sm font-semibold tabular-nums">
                  {index + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">{item.title}</span>
                  <span className="block text-sm text-muted">{item.tag}</span>
                </span>
                {choice !== undefined && (
                  <span className={`text-xs font-medium ${correct ? "text-sage" : "text-danger"}`}>
                    {correct ? "صواب" : "مراجعة"}
                  </span>
                )}
                <ChevronRight className="size-4 rotate-180 text-muted" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function CaseView({ id, onBack }: { id: string; onBack: () => void }) {
  const item = cases.find((entry) => entry.id === id);
  const choice = useStudy((s) => s.cases[id]);
  const answerCase = useStudy((s) => s.answerCase);
  if (!item) return null;
  const locked = choice !== undefined;

  return (
    <article className="flex flex-col gap-4">
      <button type="button" onClick={onBack} className="tap inline-flex min-h-11 items-center gap-1 text-sm text-sage">
        <ChevronRight className="size-4" />
        كل الحالات
      </button>
      <header>
        <Kicker>{item.tag}</Kicker>
        <h1 className="mt-1 text-3xl font-semibold">{item.title}</h1>
      </header>
      <p className="text-base leading-relaxed">{item.vignette}</p>
      <h2 className="text-lg font-semibold">{item.question}</h2>
      <div className="flex flex-col gap-2">
        {item.choices.map((label, index) => {
          const selected = choice === index;
          const isAnswer = index === item.answer;
          let tone = "border-line bg-surface";
          if (locked && isAnswer) tone = "border-sage bg-sage-soft";
          else if (locked && selected) tone = "border-danger bg-danger-soft";
          return (
            <button
              key={label}
              type="button"
              disabled={locked}
              onClick={() => answerCase(item.id, index)}
              className={`tap min-h-11 rounded-card border px-4 py-3 text-start text-sm ${tone}`}
            >
              {label}
            </button>
          );
        })}
      </div>
      {locked && (
        <section className="flex flex-col gap-3 rounded-card bg-ink px-4 py-4 text-bg">
          <p className="text-sm font-semibold">{choice === item.answer ? "قراءة صحيحة." : "يعاد النظر."}</p>
          <p className="text-sm leading-relaxed text-sage-soft">{item.explain}</p>
          <p className="text-sm leading-relaxed">
            <span className="font-semibold text-clay">لقطة للعملي. </span>
            {item.pearl}
          </p>
        </section>
      )}
    </article>
  );
}
