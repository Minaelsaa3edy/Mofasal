import { useMemo, useState } from "react";
import { Bookmark, ChevronRight, Search } from "lucide-react";
import { muscles, normalize, regions, type Region } from "@/lib/pt/data";
import { useStudy } from "@/lib/pt/store";
import { Kicker } from "@/components/mifsal/ui";

type Props = {
  selectedId: string | null;
  onSelect: (id: string) => void;
  onBack: () => void;
};

export function Atlas({ selectedId, onSelect, onBack }: Props) {
  const selected = muscles.find((item) => item.id === selectedId);
  if (selected) return <MuscleDetail muscleId={selected.id} onBack={onBack} />;
  return <MuscleList onSelect={onSelect} />;
}

function MuscleList({ onSelect }: { onSelect: (id: string) => void }) {
  const bookmarks = useStudy((s) => s.bookmarks);
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<Region | "الكل" | "محفوظ">("الكل");

  const filtered = useMemo(() => {
    const q = normalize(query);
    return muscles.filter((muscle) => {
      if (region === "محفوظ" && !bookmarks.includes(muscle.id)) return false;
      if (region !== "الكل" && region !== "محفوظ" && muscle.region !== region) return false;
      if (!q) return true;
      const hay = normalize(`${muscle.en} ${muscle.ar} ${muscle.nerve} ${muscle.action} ${muscle.group}`);
      return hay.includes(q);
    });
  }, [bookmarks, query, region]);

  return (
    <div className="flex flex-col gap-4">
      <header>
        <Kicker>أطلس عملي</Kicker>
        <h1 className="mt-1 text-3xl font-semibold">العضلات</h1>
        <p className="mt-1 text-sm text-muted">{muscles.length} عضلة تتكرر في العملي والنظري.</p>
      </header>

      <label className="relative block">
        <Search className="pointer-events-none absolute start-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="ابحثي بالعربي أو الإنجليزي"
          className="min-h-11 w-full rounded-full border border-line bg-surface ps-11 pe-4 text-sm outline-none focus:border-sage"
        />
      </label>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {(["الكل", "محفوظ", ...regions] as const).map((item) => {
          const active = region === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setRegion(item)}
              className={`tap shrink-0 rounded-full px-3 py-2 text-sm ${
                active ? "bg-ink text-bg" : "bg-surface text-ink border border-line"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      <ul className="flex flex-col gap-2">
        {filtered.length === 0 && (
          <li className="rounded-card border border-dashed border-line px-4 py-8 text-center text-sm text-muted">
            لا نتائج. جرّبي اسم العصب أو المنطقة.
          </li>
        )}
        {filtered.map((muscle) => (
          <li key={muscle.id}>
            <button
              type="button"
              onClick={() => onSelect(muscle.id)}
              className="tap flex min-h-11 w-full items-center gap-3 rounded-card border border-line bg-surface px-4 py-3 text-start"
            >
              <span className="min-w-0 flex-1">
                <span className="block font-semibold">{muscle.en}</span>
                <span className="block text-sm text-muted">
                  {muscle.ar} · {muscle.region}
                </span>
              </span>
              {bookmarks.includes(muscle.id) && <Bookmark className="size-4 text-clay" />}
              <ChevronRight className="size-4 rotate-180 text-muted" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MuscleDetail({ muscleId, onBack }: { muscleId: string; onBack: () => void }) {
  const muscle = muscles.find((item) => item.id === muscleId);
  const saved = useStudy((s) => s.bookmarks.includes(muscleId));
  const toggle = useStudy((s) => s.toggleBookmark);
  if (!muscle) return null;

  return (
    <article className="flex flex-col gap-5">
      <button type="button" onClick={onBack} className="tap inline-flex min-h-11 items-center gap-1 text-sm text-sage">
        <ChevronRight className="size-4" />
        كل العضلات
      </button>
      <header>
        <Kicker>
          {muscle.region} · {muscle.group}
        </Kicker>
        <h1 className="mt-1 text-4xl font-semibold">{muscle.en}</h1>
        <p className="mt-1 text-lg text-muted">{muscle.ar}</p>
      </header>

      <dl className="grid gap-3 sm:grid-cols-2">
        <Field label="المنشأ" value={muscle.origin} />
        <Field label="الاندغام" value={muscle.insertion} />
        <Field label="الوظيفة" value={muscle.action} />
        <Field label="التعصيب" value={muscle.nerve} />
      </dl>

      <section className="rounded-card bg-clay-soft px-4 py-4">
        <h2 className="text-sm font-semibold text-clay">في العملي</h2>
        <p className="mt-1 text-sm leading-relaxed">{muscle.practical}</p>
      </section>

      <p className="text-sm leading-relaxed text-muted">{muscle.note}</p>

      <button
        type="button"
        onClick={() => toggle(muscle.id)}
        className="tap inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-line bg-surface px-4 text-sm font-medium"
      >
        <Bookmark className={`size-4 ${saved ? "fill-clay text-clay" : ""}`} />
        {saved ? "محفوظة في الأطلس" : "احفظيها للمراجعة"}
      </button>
    </article>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-card border border-line bg-surface px-4 py-3">
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="mt-1 text-sm leading-relaxed">{value}</dd>
    </div>
  );
}
