"use client";

import Link from "next/link";
import type { NextActionData } from "@/lib/types/shared";

export type ActionButtonAction = {
  label: string;
  href?: string;
  targetRoute?: string;
  onClick?: () => void;
  disabled?: boolean;
  reason?: string;
  variant?: "primary" | "secondary" | "danger";
};

export type ActionButtonProps = {
  action: ActionButtonAction | NextActionData;
  size?: "sm" | "md";
};

const sizeClass: Record<NonNullable<ActionButtonProps["size"]>, string> = {
  sm: "h-[26px] px-2.5 text-[11px]",
  md: "h-8 px-3 text-xs",
};

const variantClass: Record<NonNullable<ActionButtonAction["variant"]>, string> = {
  primary: "border-teal-700 bg-teal-700 text-white shadow-[0_1px_2px_rgba(15,118,110,0.25)] hover:border-teal-800 hover:bg-teal-800",
  secondary: "border-transparent bg-transparent text-slate-500 hover:border-slate-200 hover:bg-white hover:text-slate-800",
  danger: "border-red-300 bg-red-50 text-red-700 hover:border-red-400 hover:bg-red-100",
};

export function ActionButton({ action, size = "sm" }: ActionButtonProps) {
  const label = "cta" in action ? action.cta : action.label;
  const href = "href" in action ? action.href ?? action.targetRoute : action.targetRoute;
  const variant = "variant" in action ? action.variant ?? "primary" : "primary";
  const className = [
    "inline-flex shrink-0 items-center justify-center rounded-lg border font-semibold leading-none transition-colors",
    sizeClass[size],
    action.disabled ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400" : variantClass[variant],
  ].join(" ");
  const title = action.disabled ? action.reason : undefined;

  if (href && !action.disabled) {
    return (
      <Link className={className} href={href} title={title}>
        {label}
      </Link>
    );
  }

  return (
    <button className={className} type="button" disabled={action.disabled} title={title} onClick={"onClick" in action ? action.onClick : undefined}>
      {label}
    </button>
  );
}
