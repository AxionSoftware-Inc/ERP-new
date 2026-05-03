import type { ReactNode } from "react";
import { ReceptionModuleShell } from "@/components/reception/reception-module-shell";

export default function ReceptionLayout({ children }: { children: ReactNode }) {
  return <ReceptionModuleShell>{children}</ReceptionModuleShell>;
}
