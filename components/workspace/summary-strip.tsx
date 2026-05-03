"use client";

import Link from "next/link";
import type { WorkspaceSummaryItem } from "@/lib/types/workspaces";

export type SummaryStripProps = {
  items: WorkspaceSummaryItem[];
  onItemClick?: (key: string) => void;
};

const toneClass: Record<NonNullable<WorkspaceSummaryItem["tone"]>, string> = {
  neutral: "border-slate-200 bg-white text-slate-700",
  info: "border-blue-200 bg-blue-50/90 text-blue-800",
  warning: "border-amber-200 bg-amber-50 text-amber-900",
  success: "border-emerald-200 bg-emerald-50/90 text-emerald-800",
  danger: "border-red-200 bg-red-50 text-red-800",
  accent: "border-teal-200 bg-teal-50/90 text-teal-800",
};

export function SummaryStrip({ items, onItemClick }: SummaryStripProps) {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4 xl:grid-cols-6">
      {items.map((item) => {
        const className = [
          "group flex min-h-[66px] flex-col justify-between rounded-xl border px-3 py-2.5 text-left shadow-[0_1px_2px_rgba(15,23,42,0.05)] ring-1 ring-white/70 transition",
          toneClass[item.tone ?? "neutral"],
          item.href || onItemClick ? "cursor-pointer hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm" : "",
        ].join(" ");
        const content = (
          <>
            <span className="min-w-0 truncate text-[10.5px] font-semibold uppercase tracking-wide opacity-80">{item.label}</span>
            <strong className="mt-1 text-xl font-bold leading-none text-slate-950">{item.count}</strong>
          </>
        );

        if (item.href) {
          return (
            <Link className={className} href={item.href} key={item.key}>
              {content}
            </Link>
          );
        }

        if (onItemClick) {
          return (
            <button className={className} type="button" onClick={() => onItemClick(item.key)} key={item.key}>
              {content}
            </button>
          );
        }

        return (
          <div className={className} key={item.key}>
            {content}
          </div>
        );
      })}
    </div>
  );
}
