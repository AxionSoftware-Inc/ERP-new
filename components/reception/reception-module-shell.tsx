import type { ReactNode } from "react";
import { ReceptionModuleNav } from "@/components/reception/reception-module-nav";

export type ReceptionModuleShellProps = {
  children: ReactNode;
};

export function ReceptionModuleShell({ children }: ReceptionModuleShellProps) {
  return (
    <div className="space-y-3">
      <ReceptionModuleNav />
      {children}
    </div>
  );
}
