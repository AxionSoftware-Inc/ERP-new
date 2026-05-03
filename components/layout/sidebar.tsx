"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { appNavGroups, appNavItems, type AppNavGroup, type AppNavItem } from "@/lib/navigation/app-nav";

export type SidebarProps = {
  items?: AppNavItem[];
  activePath?: string;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
};

export function Sidebar({ items = appNavItems, activePath, collapsed = false, onCollapsedChange }: SidebarProps) {
  const pathname = usePathname();
  const currentPath = activePath ?? pathname;

  return (
    <aside
      className={[
        "flex min-h-0 shrink-0 flex-col border-r border-slate-200 bg-white transition-[width]",
        collapsed ? "w-[72px]" : "w-[248px]",
      ].join(" ")}
    >
      <div className="flex h-12 items-center justify-between border-b border-slate-200 px-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-teal-700 text-sm font-bold text-white">K</span>
          {!collapsed ? (
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-slate-950">Clinic ERP</div>
              <div className="truncate text-[11px] text-slate-500">Operator shell</div>
            </div>
          ) : null}
        </div>
        {onCollapsedChange ? (
          <button
            className="rounded-md border border-slate-200 px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50"
            type="button"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={() => onCollapsedChange(!collapsed)}
          >
            {collapsed ? ">" : "<"}
          </button>
        ) : null}
      </div>

      <nav className="min-h-0 flex-1 overflow-y-auto px-2 py-3" aria-label="Primary modules">
        {appNavGroups.map((group) => (
          <NavGroup group={group} items={items.filter((item) => item.group === group)} activePath={currentPath} collapsed={collapsed} key={group} />
        ))}
      </nav>
    </aside>
  );
}

function NavGroup({
  group,
  items,
  activePath,
  collapsed,
}: {
  group: AppNavGroup;
  items: AppNavItem[];
  activePath: string;
  collapsed: boolean;
}) {
  if (!items.length) return null;

  return (
    <div className="mb-4">
      {!collapsed ? <div className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-normal text-slate-500">{group}</div> : null}
      <div className="space-y-1">
        {items.map((item) => {
          const active = activePath === item.href || activePath.startsWith(`${item.href}/`);
          return (
            <Link
              className={[
                "flex h-9 items-center gap-2 rounded-md border px-2 text-sm font-medium",
                active
                  ? "border-teal-200 bg-teal-50 text-teal-800"
                  : "border-transparent text-slate-700 hover:border-slate-200 hover:bg-slate-50",
                collapsed ? "justify-center" : "",
              ].join(" ")}
              href={item.href}
              title={collapsed ? item.label : undefined}
              key={item.href}
            >
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded bg-slate-100 text-[10px] font-bold text-slate-600">
                {item.label.slice(0, 1)}
              </span>
              {!collapsed ? <span className="truncate">{item.label}</span> : null}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
