import type { ReactNode } from "react";

export function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-medium tracking-wide text-sage uppercase">{children}</p>
  );
}

export function Disclaimer() {
  return (
    <p className="text-xs leading-relaxed text-muted">
      للمذاكرة فقط، وليس تشخيصًا أو خطة علاج. أرقام المدى تقريبية وفق القيم الشائعة
      (AAOS) وقد تختلف المراجع. راجعي مقرركِ قبل اللجنة.
    </p>
  );
}
