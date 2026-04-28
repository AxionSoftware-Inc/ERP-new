import { ErpShell } from "../_components/ErpShell";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <ErpShell>{children}</ErpShell>;
}
