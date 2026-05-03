import type { ReactNode } from "react";

export type ReceptionModuleShellProps = {
  children: ReactNode;
};

export function ReceptionModuleShell({ children }: ReceptionModuleShellProps) {
  return <>{children}</>;
}
