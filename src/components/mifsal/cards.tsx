import { useMemo, useState } from "react";
import { cards } from "@/lib/pt/data";
import { useStudy } from "@/lib/pt/store";
import { Kicker } from "@/components/mifsal/ui";

const topics = ["الكل", "عضلة", "اختبار", "عصب", "مدى"] as const;
type Topic = (typeof topics)[number];

export function Cards() {
  const known = useStudy((s) => s.known);
  const markKnown = useStudy((s) => s.markKnown);
  const markReview = useStudy((s) => s.markReview);
  const resetCards = useStudy((s) => s.resetCards);
  const [topic, setTopic] = useState<Topic>("الكل");
  const [snoozed, setSnoozed] = useState<string[]>([]);
  const [browse, setBrowse] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const deck = useMemo(
    () => cards.filter((card) => (topic === "الكل" ? true : card.topic === topic)),
    [topic],
  );
  const knownInDeck = known.filter((id) => deck.some((card) => card.id === id)).length;
  const fresh = deck.filter((card) => !known.includes(card.id) && !snoozed.includes(card.id));
  const delayed = deck.filter((card) => !known.includes(card.id) && snoozed.includes(card.id));
  const done = fresh.length + delayed.length === 0;
  const card = done ? deck[browse % Math.max(deck.length, 1)] : (fresh[0] ?? delayed[0]);

  function changeTopic(next: Topic) {
    setTopic(next);
    setSnoozed([]);
    setBrowse(0);
    setFlipped(false);
  }

  function knewIt() {
    if (!card || done) return;
    markKnown(card.id);
    setSnoozed((ids) => ids.filter((id) => id !== card.id));
    setFlipped(false);
  }

  function later() {
    if (!card || done) return;
    markReview(card.id);
    setSnoozed((ids) => [...ids.filter((id) => id !== card.id), card.id]);
    setFlipped(false);
  }

  return (
    <div className="flex flex-col gap-4">
      <header className="flex items-end justify-between gap-3">
        <div>
          <Kicker>ذاكرة قصيرة</Kicker>
          <h1 className="mt-1 text-3xl font-semibold">البطاقات</h1>
        </div>
        <p className="text-sm tabular-nums text-muted">
          {knownInDeck}/{deck.length}
        </p>
      </header>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {topics.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => changeTopic(item)}
            className={`tap shrink-0 rounded-full px-3 py-2 text-sm ${
              topic === item ? "bg-ink text-bg" : "border border-line bg-surface"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {done && (
        <p className="rounded-card bg-sage-soft px-4 py-3 text-sm">
          خلّصتي هذه المجموعة.
          <button
            type="button"
            onClick={() => {
              resetCards();
              setSnoozed([]);
              setBrowse(0);
              setFlipped(false);
            }}
            className="tap ms-2 font-semibold text-sage"
          >
            امسحي «عرفتها»
          </button>
        </p>
      )}

      {card && (
        <div className="flip-scene">
          <button
            type="button"
            onClick={() => setFlipped((value) => !value)}
            className="tap block w-full text-start"
            aria-pressed={flipped}
          >
            <div className={`flip-inner relative h-72 ${flipped ? "is-back" : ""}`}>
              <div className="flip-face absolute inset-0 flex flex-col justify-between overflow-y-auto rounded-card border border-line bg-surface p-5 shadow-card">
                <span className="text-xs font-medium text-sage">{card.topic}</span>
                <span className="text-2xl font-semibold leading-snug">{card.front}</span>
                <span className="text-xs text-muted">اضغطي لقلب البطاقة</span>
              </div>
              <div className="flip-face flip-back absolute inset-0 flex flex-col justify-between overflow-y-auto rounded-card bg-ink p-5 text-bg shadow-card">
                <span className="text-xs text-sage-soft">الإجابة</span>
                <span>
                  <span className="block text-2xl font-semibold leading-snug">{card.back}</span>
                  <span className="mt-3 block text-sm leading-relaxed text-sage-soft">{card.detail}</span>
                </span>
                <span className="text-xs text-sage-soft">اختاري تحت إن كنتِ تعرفينها</span>
              </div>
            </div>
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          disabled={!card || done}
          onClick={later}
          className="tap min-h-11 rounded-full border border-line bg-surface text-sm font-medium disabled:opacity-40"
        >
          أراجعها
        </button>
        <button
          type="button"
          disabled={!card}
          onClick={done ? () => { setBrowse((value) => value + 1); setFlipped(false); } : knewIt}
          className="tap min-h-11 rounded-full bg-sage text-sm font-semibold text-bg disabled:opacity-40"
        >
          {done ? "البطاقة التالية" : "عرفتها"}
        </button>
      </div>
    </div>
  );
}
