"use client";

import { useState } from "react";
import type { BranchSummary, UserSummary } from "@/lib/types/shared";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

export type AppShellProps = {
  children: React.ReactNode;
  currentUser?: UserSummary;
  currentBranch?: BranchSummary;
};

export function AppShell({ children, currentUser, currentBranch }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-950">
      <Sidebar collapsed={collapsed} onCollapsedChange={setCollapsed} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar currentUser={currentUser} currentBranch={currentBranch} />
        <main className="min-w-0 flex-1 overflow-x-auto p-3">
          <div className="min-w-[960px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
