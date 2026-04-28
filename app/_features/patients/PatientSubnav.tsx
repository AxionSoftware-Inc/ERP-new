"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function PatientSubnav({ patientId }: { patientId: string }) {
  const pathname = usePathname();
  const links = [
    { label: "Overview", href: `/patients/${patientId}` },
    { label: "Tibbiy tarix", href: `/patients/${patientId}/medical-history` },
    { label: "To'lovlar", href: `/patients/${patientId}/payments` },
    { label: "Hujjatlar", href: `/patients/${patientId}/documents` },
    { label: "Notes", href: `/patients/${patientId}/notes` },
    { label: "Files", href: `/patients/${patientId}/files` },
  ];

  return (
    <nav className="module-subnav" aria-label="Patient navigatsiyasi">
      {links.map((link) => (
        <Link className={pathname === link.href ? "active" : ""} href={link.href} key={link.href}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
