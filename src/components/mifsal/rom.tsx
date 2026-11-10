import { useMemo, useState } from "react";
import { motions, mmtGrades } from "@/lib/pt/data";
import type { RomTab } from "@/components/mifsal/app";
import { Disclaimer, Kicker } from "@/components/mifsal/ui";

const joints = [...new Set(motions.map((item) => item.joint))];

type Props = {
  tab: RomTab;
  onTab: (tab: RomTab) => void;
};

export function Rom({ tab, onTab }: Props) {
  return (
    <div className="flex flex-col gap-5">
      <header>
        <Kicker>جونيوميتر وقوة</Kicker>
        <h1 className="mt-1 text-3xl font-semibold">المدى والقوة</h1>
      </header>

      <div className="grid grid-cols-2 rounded-full bg-surface p-1 border border-line">
        {(
          [
            ["motion", "مدى الحركة"],
            ["mmt", "درجات MMT"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => onTab(id)}
            className={`tap min-h-11 rounded-full text-sm font-medium ${
              tab === id ? "bg-ink text-bg" : "text-muted"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "motion" ? <MotionList /> : <MmtList />}
      <Disclaimer />
    </div>
  );
}

function MotionList() {
  const [joint, setJoint] = useState(joints[0]);
  const [hidden, setHidden] = useState(false);
  const [picked, setPicked] = useState<Record<string, number>>({});
  const rows = motions.filter((item) => item.joint === joint);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {joints.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setJoint(item)}
            className={`tap shrink-0 rounded-full px-3 py-2 text-sm ${
              joint === item ? "bg-sage text-bg" : "border border-line bg-surface"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted">{rows[0]?.jointEn}</p>
        <button
          type="button"
          onClick={() => {
            setHidden((value) => !value);
            setPicked({});
          }}
          className="tap min-h-11 rounded-full px-3 text-sm font-medium text-sage"
        >
          {hidden ? "أظهري الأرقام" : "اخفي الأرقام واختبري"}
        </button>
      </div>

      <ul className="flex flex-col gap-3">
        {rows.map((motion) => (
          <li key={motion.id} className="rounded-card border border-line bg-surface px-4 py-3">
            <div className="flex items-baseline justify-between gap-3">
              <div>
                <p className="font-semibold">{motion.motion}</p>
                <p className="text-xs text-muted">{motion.motionEn}</p>
              </div>
              {!hidden && <p className="text-lg font-semibold tabular-nums text-sage">{motion.norm}</p>}
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-bg">
              <div
                className="h-full rounded-full bg-sage"
                style={{ width: `${Math.min(100, Math.round((motion.end / 180) * 100))}%` }}
              />
            </div>
            {hidden && (
              <Choices
                motionId={motion.id}
                answer={motion.end}
                picked={picked[motion.id]}
                onPick={(value) => setPicked((current) => ({ ...current, [motion.id]: value }))}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Choices({
  motionId,
  answer,
  picked,
  onPick,
}: {
  motionId: string;
  answer: number;
  picked: number | undefined;
  onPick: (value: number) => void;
}) {
  const options = useMemo(() => {
    const pool = [10, 15, 20, 30, 45, 50, 60, 70, 80, 90, 120, 135, 150, 180].filter(
      (value) => value !== answer,
    );
    const nearest = [...pool].sort((a, b) => Math.abs(a - answer) - Math.abs(b - answer)).slice(0, 3);
    return [...nearest, answer].sort((a, b) => a - b);
  }, [answer]);

  return (
    <div className="mt-3 grid grid-cols-2 gap-2">
      {options.map((value) => {
        const state = picked === undefined ? "idle" : value === answer ? "ok" : picked === value ? "bad" : "idle";
        const tone =
          state === "ok"
            ? "border-sage bg-sage-soft text-sage"
            : state === "bad"
              ? "border-danger bg-danger-soft text-danger"
              : "border-line";
        return (
          <button
            key={`${motionId}-${value}`}
            type="button"
            disabled={picked !== undefined}
            onClick={() => onPick(value)}
            className={`tap min-h-11 rounded-xl border text-sm font-medium tabular-nums ${tone}`}
          >
            0–{value}
          </button>
        );
      })}
    </div>
  );
}

function MmtList() {
  return (
    <ol className="flex flex-col gap-2">
      {mmtGrades.map((grade) => (
        <li key={grade.grade} className="flex gap-3 rounded-card border border-line bg-surface px-4 py-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-sage-soft text-lg font-semibold text-sage tabular-nums">
            {grade.grade}
          </span>
          <span>
            <span className="block font-semibold">
              {grade.name}
              <span className="ms-2 font-normal text-muted">{grade.ar}</span>
            </span>
            <span className="mt-1 block text-sm text-muted">{grade.detail}</span>
          </span>
        </li>
      ))}
      <li className="rounded-card bg-sage-soft px-4 py-3 text-sm leading-relaxed">
        الدرجات + و− تُستخدم بين الأرقام (مثل 4− أقل بقليل من مقاومة الدرجة 4). في الشفوي صِفي الوضع:
        ضد الجاذبية أم بإلغائها، وأين تضعين المقاومة.
      </li>
    </ol>
  );
}
