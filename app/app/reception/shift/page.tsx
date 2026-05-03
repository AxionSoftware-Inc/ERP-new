import { WorkbenchListCard } from "@/components/workbench/workbench-list-card";
import { WorkbenchRowLimit } from "@/components/workbench/workbench-row-limit";
import { WorkbenchTableHeader, WorkbenchTableRow } from "@/components/workbench/workbench-table-row";
import { getReceptionShiftSummary } from "@/lib/api/client";

export default async function ReceptionShiftPage() {
  const shift = await getReceptionShiftSummary();
  const metrics = Object.entries(shift.summary).map(([key, value]) => ({ key, label: labelMetric(key), value }));

  return (
    <div className="space-y-3">
      <PageNote text="Bu sahifa smena oxirida ochiq holatlar qolmaganini tekshirish uchun: unresolved, delayed, no-show, billing va yakunlanmagan tashriflar shu yerda ko'rinadi." />
      <section className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_330px]">
      <main className="min-w-0">
        <WorkbenchListCard
          title="Smena yakuni"
          summary={`${shift.summary.unresolvedCases} hal qilinmagan / ${shift.summary.delayedCases} kechikkan`}
          selectedKey="summary"
          selector={[{ key: "summary", label: "Summary", count: metrics.length, href: "/app/reception/shift" }, { key: "unresolved", label: "Ochiq", count: shift.unresolvedCases.length, href: "/app/reception/shift" }]}
          filters={["Eksport", "Chop etish", "Smenani yopish", "Audit"]}
          fullListHref="/app/reception/delayed"
          fullListLabel="Ochiq holatlar"
          searchPlaceholder="Smena ichida qidirish..."
        >
          <WorkbenchTableHeader />
          <WorkbenchRowLimit initialCount={12}>
            {shift.unresolvedCases.map((item) => (
              <WorkbenchTableRow
                key={item.id}
                title={item.visit.patient.fullName}
                subtitle={[item.visit.patient.patientCode, item.visit.patient.phone].filter(Boolean).join(" / ")}
                href={`/app/visits/${item.visit.id}`}
                reference={item.visit.visitCode}
                context={`${formatDelayType(item.delayType)} / ${item.owner}`}
                primaryBadge={{ label: item.severity === "critical" ? "Kritik" : "Ogoh", tone: item.severity === "critical" ? "danger" : "warning" }}
                signals={[`${item.waitingMinutes} daq`, `SLA ${item.expectedMinutes}`, item.owner]}
                nextAction="Smenadan oldin hal qilish"
                primaryAction={{ label: "Ochish", href: `/app/visits/${item.visit.id}` }}
                secondaryActions={[{ label: "Delayed", href: "/app/reception/delayed", variant: "secondary" }, { label: "Queue", href: "/app/reception/queue", variant: "secondary" }]}
              />
            ))}
          </WorkbenchRowLimit>
        </WorkbenchListCard>
      </main>
      <aside className="space-y-3">
        <section className="rounded-md border border-slate-200 bg-white p-3">
          <h2 className="text-sm font-semibold text-slate-950">Smena metrikalari</h2>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {metrics.slice(0, 10).map((item) => <div className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5" key={item.key}><div className="truncate text-[11px] font-semibold text-slate-500">{item.label}</div><div className="font-mono text-base font-semibold text-slate-950">{item.value}</div></div>)}
          </div>
        </section>
        <section className="rounded-md border border-slate-200 bg-white p-3">
          <h2 className="text-sm font-semibold text-slate-950">Smena amallari</h2>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {["Eksport", "Chop etish", "Yopish"].map((item) => <button className="rounded-md border border-slate-200 bg-slate-50 px-2 py-2 text-xs font-semibold text-slate-700" type="button" key={item}>{item}</button>)}
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

function labelMetric(value: string): string {
  return value.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());
}
function formatDelayType(value: string): string {
  return value.replaceAll("_", " ");
}
