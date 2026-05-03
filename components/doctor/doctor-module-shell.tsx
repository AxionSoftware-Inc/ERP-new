import type { ReactNode } from "react";
import { DoctorModuleNav } from "@/components/doctor/doctor-module-nav";

export function DoctorModuleShell({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-3">
      <DoctorModuleNav />
      {children}
    </div>
  );
}
