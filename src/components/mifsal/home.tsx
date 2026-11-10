import { useEffect, useState, type ReactNode } from "react";
import { ChevronLeft, Flame, GraduationCap, HeartPulse } from "lucide-react";
import { cards, muscles } from "@/lib/pt/data";
import { isoDay, useStudy } from "@/lib/pt/store";
import { Disclaimer, Kicker } from "@/components/mifsal/ui";

type Props = {
  onCards: () => void;
  onCases: () => void;
  onQuiz: () => void;
  onMuscle: (id: string) => void;
  onMmt: () => void;
  onRom: () => void;
};

export function Home({ onCards, onCases, onQuiz, onMuscle, onMmt, onRom }: Props) {
  const known = useStudy((s) => s.known);
  const streak = useStudy((s) => s.streak);
  const reviews = useStudy((s) => s.reviews);
  const cases = useStudy((s) => s.cases);
  const quizBest = useStudy((s) => s.quizBest);
  const [muscleId, setMuscleId] = useState<string | null>(null);
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    const key = isoDay();
    setToday(key);
    let hash = 0;
    for (const ch of key) hash = (hash * 33 + ch.charCodeAt(0)) >>> 0;
    setMuscleId(muscles[hash % muscles.length].id);
  }, []);

  const muscle = muscles.find((item) => item.id === muscleId);
  const reviewed = today ? (reviews[today] ?? 0) : 0;
  const solved = Object.keys(cases).length;

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <Kicker>كلية العلاج الطبيعي</Kicker>
        <h1 className="text-5xl font-semibold tracking-tight">مِفصل</h1>
        <p className="max-w-md text-base text-muted">
          دفتر جيب للعملي والنظري: منشأ واندغام، مدى الحركة، واختبارات تسألين عنها في الشفوي.
        </p>
      </header>

      <section className="grid grid-cols-3 gap-2">
        <Stat label="أيام متتالية" value={streak ? String(streak) : "—"} icon={<Flame className="size-4 text-clay" />} />
        <Stat label="بطاقات اليوم" value={today ? String(reviewed) : "—"} />
        <Stat label="أفضل اختبار" value={quizBest ? `${quizBest}/8` : "—"} />
      </section>

      <section className="rounded-card border border-line bg-surface p-5 shadow-card">
        <div className="mb-4 flex items-center justify-between gap-3">
          <Kicker>عضلة اليوم</Kicker>
          <span className="text-xs text-muted">{solved}/6 حالات</span>
        </div>
        {muscle ? (
          <button type="button" onClick={() => onMuscle(muscle.id)} className="tap w-full text-start">
            <p className="text-2xl font-semibold">{muscle.en}</p>
            <p className="mt-1 text-sm text-muted">
              {muscle.ar} · {muscle.region}
            </p>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              <Fact label="المنشأ" value={muscle.origin} />
              <Fact label="الاندغام" value={muscle.insertion} />
              <Fact label="الوظيفة" value={muscle.action} />
              <Fact label="التعصيب" value={muscle.nerve} />
            </dl>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-sage">
              ملف العضلة
              <ChevronLeft className="size-4" />
            </span>
          </button>
        ) : (
          <div className="h-40 animate-pulse rounded-2xl bg-bg" />
        )}
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        <Action
          title="بطاقات المراجعة"
          body={known.length ? `عرفتِ ${known.length} من ${cards.length}` : `${cards.length} بطاقة: عصب، اختبار، ومدى`}
          onClick={onCards}
        />
        <Action title="حالة سريرية" body="ست صور قصيرة بأسلوب الشفوي" onClick={onCases} />
        <Action title="اختبار من ٨" body="خيارات سريعة قبل السكشن" onClick={onQuiz} />
        <Action title="جدول المدى" body="أرقام AAOS الشائعة حسب المفصل" onClick={onRom} />
      </section>

      <button
        type="button"
        onClick={onMmt}
        className="tap flex min-h-11 items-center gap-3 rounded-card border border-line bg-clay-soft px-4 py-3 text-start"
      >
        <HeartPulse className="size-5 shrink-0 text-clay" />
        <span>
          <span className="block text-sm font-semibold">درجات القوة ٠–٥</span>
          <span className="block text-xs text-muted">MMT كما يُطلب في العملي</span>
        </span>
        <GraduationCap className="ms-auto size-4 text-muted" />
      </button>

      <Disclaimer />
    </div>
  );
}

function Stat({ label, value, icon }: { label: string; value: string; icon?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-surface px-3 py-3">
      <div className="flex items-center gap-1 text-xs text-muted">
        {icon}
        {label}
      </div>
      <p className="mt-1 text-xl font-semibold tabular-nums">{value}</p>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="text-sm leading-snug">{value}</dd>
    </div>
  );
}

function Action({ title, body, onClick }: { title: string; body: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="tap rounded-card border border-line bg-surface px-4 py-4 text-start shadow-card"
    >
      <span className="block text-base font-semibold">{title}</span>
      <span className="mt-1 block text-sm text-muted">{body}</span>
    </button>
  );
}
