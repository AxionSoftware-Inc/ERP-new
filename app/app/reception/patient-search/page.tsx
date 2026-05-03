import Link from "next/link";
import { WorkbenchListCard } from "@/components/workbench/workbench-list-card";
import { WorkbenchRowLimit } from "@/components/workbench/workbench-row-limit";
import { WorkbenchTableHeader, WorkbenchTableRow } from "@/components/workbench/workbench-table-row";
import { searchReceptionPatients } from "@/lib/api/client";

export default async function ReceptionPatientSearchPage() {
  const data = await searchReceptionPatients();

  return (
    <div className="space-y-3">
      <PageNote text="Bu sahifa bemorning butun klinik tarixini ko'rsatish uchun emas. Maqsad: qabul boshlashdan oldin bemorni aniq topish, dublikat, faol tashrif, qarzdorlik va risk signallarini tekshirish." />
      <section className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_330px]">
      <main className="min-w-0">
        <WorkbenchListCard
          title="Bemor qidirish"
          summary={`${data.results.length} bemor / dublikat va faol tashrif signallari bilan`}
          selectedKey="results"
          selector={[
            { key: "results", label: "Natijalar", count: data.results.length, href: "/app/reception/patient-search" },
            { key: "duplicates", label: "Dublikat", count: data.possibleDuplicates.length, href: "/app/reception/patient-search" },
            { key: "recent", label: "Yaqinda", count: data.recentPatients.length, href: "/app/reception/patient-search" },
          ]}
          filters={["Telefon", "Bemor kodi", "Faol tashrif", "Qarz"]}
          fullListHref="/app/patients"
          fullListLabel="Bemorlar"
          searchPlaceholder="Bemor, telefon yoki kod..."
        >
          <WorkbenchTableHeader />
          <WorkbenchRowLimit initialCount={12}>
            {data.results.map((item) => (
              <WorkbenchTableRow
                key={item.patient.id}
                title={item.patient.fullName}
                subtitle={[item.patient.patientCode, item.patient.phone].filter(Boolean).join(" / ")}
                href={`/app/patients/${item.patient.id}`}
                reference={item.activeVisit?.visitCode ?? item.lastVisit?.visitCode ?? "Tashrif yo'q"}
                context={[item.patient.age ? `${item.patient.age} yosh` : null, item.patient.gender, item.lastVisit?.department?.name].filter(Boolean).join(" / ")}
                primaryBadge={{ label: item.activeVisit ? "Faol tashrif" : "Profil", tone: item.activeVisit ? "warning" : "neutral" }}
                secondaryBadge={item.balance && item.balance.amount > 0 ? { label: item.balance.formatted, tone: "warning" } : undefined}
                signals={[item.riskFlags?.[0] ?? "Risk yo'q", item.duplicateScore ? `Dublikat ${item.duplicateScore}%` : "Yagona", item.lastVisit ? "Oldingi tashrif" : "Yangi"]}
                nextAction={item.activeVisit ? "Faol tashrifni ochish" : "Yangi qabul boshlash"}
                primaryAction={{ label: item.activeVisit ? "Tashrif" : "Qabul", href: item.activeVisit ? `/app/visits/${item.activeVisit.id}` : "/app/reception/intake/new" }}
                secondaryActions={[
                  { label: "Profil", href: `/app/patients/${item.patient.id}`, variant: "secondary" },
                  { label: "Yangi qabul", href: "/app/reception/intake/new", variant: "secondary" },
                ]}
              />
            ))}
          </WorkbenchRowLimit>
        </WorkbenchListCard>
      </main>
      <aside className="space-y-3">
        <Panel title="Dublikat nazorati" href="/app/reception/patient-search">
          {data.possibleDuplicates.slice(0, 4).map((item) => (
            <MiniItem key={item.patient.id} title={item.patient.fullName} meta={`${item.duplicateScore ?? 0}% / ${item.duplicateReason ?? "similar"}`} href={`/app/patients/${item.patient.id}`} />
          ))}
        </Panel>
        <Panel title="Yaqinda ko'rilganlar" href="/app/patients">
          {data.recentPatients.slice(0, 5).map((patient) => (
            <MiniItem key={patient.id} title={patient.fullName} meta={[patient.patientCode, patient.phone].filter(Boolean).join(" / ")} href={`/app/patients/${patient.id}`} />
          ))}
        </Panel>
      </aside>
      </section>
    </div>
  );
}

function PageNote({ text }: { text: string }) {
  return <div className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm leading-5 text-slate-600">{text}</div>;
}

function Panel({ title, href, children }: { title: string; href: string; children: React.ReactNode }) {
  return (
    <section className="rounded-md border border-slate-200 bg-white p-3">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-slate-950">{title}</h2>
        <Link className="text-xs font-semibold text-teal-700" href={href}>Ochish</Link>
      </div>
      <div className="mt-2 divide-y divide-slate-100">{children}</div>
    </section>
  );
}

function MiniItem({ title, meta, href }: { title: string; meta: string; href: string }) {
  return (
    <Link className="block py-2 hover:bg-slate-50" href={href}>
      <div className="truncate text-sm font-semibold text-slate-900">{title}</div>
      <div className="truncate text-xs text-slate-500">{meta}</div>
    </Link>
  );
}
