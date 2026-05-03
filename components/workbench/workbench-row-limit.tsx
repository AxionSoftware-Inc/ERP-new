"use client";

import { Children, type ReactNode, useState } from "react";

export function WorkbenchRowLimit({
  children,
  initialCount,
  moreLabel = "Ko'proq ko'rish",
  lessLabel = "Yig'ish",
}: {
  children: ReactNode;
  initialCount: number;
  moreLabel?: string;
  lessLabel?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const rows = Children.toArray(children);
  const visibleRows = expanded ? rows : rows.slice(0, initialCount);

  return (
    <>
      {visibleRows}
      {rows.length > initialCount ? (
        <div className="border-t border-slate-100 px-3 py-2 text-right">
          <button
            className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:border-teal-200 hover:bg-white hover:text-teal-800"
            type="button"
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded ? lessLabel : `${moreLabel} (${rows.length - initialCount})`}
          </button>
        </div>
      ) : null}
    </>
  );
}
