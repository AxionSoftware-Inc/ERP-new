import type { StatusBadgeData } from "@/lib/types/shared";

export type StatusBadgeProps = {
  badge: StatusBadgeData;
  size?: "sm" | "md";
};

const toneClass: Record<StatusBadgeData["tone"], string> = {
  neutral: "border-slate-300 bg-slate-100 text-slate-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]",
  info: "border-blue-300 bg-blue-100 text-blue-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]",
  warning: "border-amber-300 bg-amber-100 text-amber-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]",
  success: "border-emerald-300 bg-emerald-100 text-emerald-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]",
  danger: "border-red-300 bg-red-100 text-red-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]",
  accent: "border-teal-300 bg-teal-100 text-teal-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]",
};

const sizeClass: Record<NonNullable<StatusBadgeProps["size"]>, string> = {
  sm: "px-2 py-0.5 text-[10.5px]",
  md: "px-2.5 py-1 text-[11px]",
};

export function StatusBadge({ badge, size = "sm" }: StatusBadgeProps) {
  return (
    <span className={["inline-flex max-w-full items-center rounded-full border font-semibold leading-none", toneClass[badge.tone], sizeClass[size]].join(" ")}>
      <span className="truncate">{badge.label}</span>
    </span>
  );
}
