import type { ReactNode } from "react";
import { DoctorModuleShell } from "@/components/doctor/doctor-module-shell";

export default function DoctorLayout({ children }: { children: ReactNode }) {
  return <DoctorModuleShell>{children}</DoctorModuleShell>;
}
