"use client";

import Link from "next/link";
import { useState } from "react";
import type { ActionButtonAction } from "@/components/actions/action-button";
import { StatusBadge } from "@/components/status/status-badge";
import type { StatusBadgeData } from "@/lib/types/shared";

export type WorkbenchTableRowProps = {
  title: string;
  subtitle?: string;
  href: string;
  reference: string;
  context: string;
  primaryBadge?: StatusBadgeData;
  secondaryBadge?: StatusBadgeData;
  signals: string[];
  nextAction: string;
  primaryAction: ActionButtonAction;
  secondaryActions?: ActionButtonAction[];
};

export function WorkbenchTableRow({
  title,
  subtitle,
  href,
  reference,
  context,
  primaryBadge,
  secondaryBadge,
  signals,
  nextAction,
  primaryAction,
  secondaryActions = [],
}: WorkbenchTableRowProps) {
  const [open, setOpen] = useState(false);
  const actions = [primaryAction, ...secondaryActions];

  return (
    <div className="grid min-h-[58px] items-center gap-2 border-t border-slate-100 px-2 py-1.5 text-sm hover:bg-slate-50 lg:grid-cols-[minmax(190px,1.25fr)_minmax(170px,1fr)_minmax(160px,.8fr)_minmax(150px,.8fr)_72px]">
      <div className="min-w-0">
        <Link className="block truncate font-semibold leading-5 text-slate-950 hover:text-teal-700" href={href}>
          {title}
        </Link>
        {subtitle ? <div className="truncate text-xs leading-4 text-slate-500">{subtitle}</div> : null}
      </div>
      <div className="min-w-0">
        <div className="truncate font-mono text-xs font-semibold text-slate-700">{reference}</div>
        <div className="truncate text-xs leading-4 text-slate-500">{context}</div>
      </div>
      <div className="flex min-w-0 flex-wrap items-center gap-1">
        {primaryBadge ? <StatusBadge badge={primaryBadge} size="sm" /> : null}
        {secondaryBadge ? <StatusBadge badge={secondaryBadge} size="sm" /> : null}
      </div>
      <div className="min-w-0">
        <div className="truncate text-xs font-medium text-slate-700">{nextAction}</div>
        <div className="mt-0.5 flex min-w-0 gap-1.5 overflow-hidden">
          {signals.slice(0, 3).map((signal) => (
            <span className="truncate rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[11px] text-slate-600" key={signal}>
              {signal}
            </span>
          ))}
        </div>
      </div>
      <div className="relative flex justify-start lg:justify-end">
        <button
          className="h-7 rounded-md border border-slate-200 bg-white px-2.5 text-xs font-semibold text-slate-700 hover:border-teal-200 hover:text-teal-800"
          type="button"
          onClick={() => setOpen((value) => !value)}
        >
          Action
        </button>
        {open ? (
          <div className="absolute right-0 top-8 z-20 w-40 rounded-md border border-slate-200 bg-white p-1 shadow-lg">
            {actions.map((action) => {
              const href = action.href ?? action.targetRoute;
              const className = [
                "block w-full rounded px-2 py-1.5 text-left text-xs font-semibold",
                action.variant === "danger" ? "text-red-700 hover:bg-red-50" : "text-slate-700 hover:bg-slate-50 hover:text-teal-800",
              ].join(" ");
              if (href && !action.disabled) {
                return (
                  <Link className={className} href={href} key={action.label}>
                    {action.label}
                  </Link>
                );
              }
              return (
                <button className={className} disabled={action.disabled} key={action.label} type="button" onClick={action.onClick}>
                  {action.label}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function WorkbenchTableHeader() {
  return (
    <div className="hidden border-t border-slate-100 bg-slate-50 px-2 py-1.5 text-[11px] font-semibold uppercase tracking-normal text-slate-500 lg:grid lg:grid-cols-[minmax(190px,1.25fr)_minmax(170px,1fr)_minmax(160px,.8fr)_minmax(150px,.8fr)_72px] lg:gap-2">
      <div>Patient</div>
      <div>Visit / context</div>
      <div>Status</div>
      <div>Next / signals</div>
      <div className="text-right">Actions</div>
    </div>
  );
}
