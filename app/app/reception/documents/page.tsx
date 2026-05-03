import Link from "next/link";
import { WorkbenchListCard } from "@/components/workbench/workbench-list-card";
import { WorkbenchTableHeader, WorkbenchTableRow } from "@/components/workbench/workbench-table-row";
import { searchReceptionPatients } from "@/lib/api/client";

const documentRows = [
  { id: "doc-passport", title: "Passport / ID", owner: "Patient identity", status: "Upload", tone: "warning" as const },
  { id: "doc-insurance", title: "Insurance document", owner: "Coverage", status: "Verify", tone: "neutral" as const },
  { id: "doc-referral", title: "Referral document", owner: "Visit context", status: "Attach", tone: "accent" as const },
  { id: "doc-consent", title: "Consent form", owner: "Procedure", status: "Print", tone: "warning" as const },
  { id: "doc-contract", title: "Contract", owner: "Billing", status: "Generate", tone: "neutral" as const },
];

export default async function ReceptionDocumentsPage() {
  const patients = await searchReceptionPatients();

  return (
    <div className="space-y-3">
      <PageNote text="Bu sahifa qabulxonadagi hujjatlarni bemor yoki tashrif kontekstiga biriktirish uchun: ID, sug'urta, yo'llanma, rozilik va shartnoma hujjatlari shu yerdan boshqariladi." />
      <section className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_330px]">
      <main className="min-w-0">
        <WorkbenchListCard
          title="Qabulxona hujjatlari"
          summary="Hujjat yuklash, yaratish va bemor/tashrifga biriktirish"
          selectedKey="documents"
          selector={[{ key: "documents", label: "Hujjatlar", count: documentRows.length, href: "/app/reception/documents" }, { key: "patients", label: "Bemor konteksti", count: patients.results.length, href: "/app/reception/documents" }]}
          filters={["Bemor", "Tashrif", "Yuklash", "Chop etish"]}
          fullListHref="/app/reception/patient-search"
          fullListLabel="Bemor qidirish"
          searchPlaceholder="Hujjat yoki bemor..."
        >
          <WorkbenchTableHeader />
          {documentRows.map((item) => (
            <WorkbenchTableRow
              key={item.id}
              title={item.title}
              subtitle={item.owner}
              href="/app/reception/documents"
              reference={item.id}
              context="Qabulxona hujjat workflow"
              primaryBadge={{ label: item.status, tone: item.tone }}
              signals={["Bemor kerak", "Tashrif ixtiyoriy", "Audit"]}
              nextAction={`${item.status} hujjat`}
              primaryAction={{ label: item.status, href: "/app/reception/documents" }}
              secondaryActions={[{ label: "Bemor qidirish", href: "/app/reception/patient-search", variant: "secondary" }, { label: "Yangi qabul", href: "/app/reception/intake/new", variant: "secondary" }]}
            />
          ))}
        </WorkbenchListCard>
      </main>
      <aside className="space-y-3">
        <section className="rounded-md border border-slate-200 bg-white p-3">
          <h2 className="text-sm font-semibold text-slate-950">Bemor konteksti</h2>
          <div className="mt-2 divide-y divide-slate-100">
            {patients.recentPatients.slice(0, 5).map((patient) => <Link className="block py-2 hover:bg-slate-50" href={`/app/patients/${patient.id}`} key={patient.id}><div className="truncate text-sm font-semibold text-slate-900">{patient.fullName}</div><div className="truncate text-xs text-slate-500">{patient.patientCode}</div></Link>)}
          </div>
        </section>
      </aside>
      </section>
    </div>
  );
}

function PageNote({ text }: { text: string }) {
  return <div className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm leading-5 text-slate-600">{text}</div>;
}
