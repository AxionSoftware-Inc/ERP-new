import { WorkbenchListCard } from "@/components/workbench/workbench-list-card";
import { WorkbenchRowLimit } from "@/components/workbench/workbench-row-limit";
import { WorkbenchTableHeader, WorkbenchTableRow } from "@/components/workbench/workbench-table-row";
import { getDoctorActiveEncounters } from "@/lib/api/client";
import type { DoctorWorkItem } from "@/lib/types/doctor";

export default async function DoctorActiveRoutePage() {
  const active = await getDoctorActiveEncounters();
  const items = expandWorkItems(active.items, 24);

  return (
    <div className="space-y-3">
      <PageNote text="Bu sahifa boshlangan, lekin hali tugamagan konsultatsiyalar uchun. Draft note, pending order, natija kutish va yakunlash qarorlari shu yerda nazorat qilinadi." />
      <WorkbenchListCard
        title="Aktiv konsultatsiyalar"
        summary={`${items.length} ochiq klinik encounter`}
        selectedKey="active"
        selector={[{ key: "active", label: "Aktiv", count: items.length, href: "/app/doctor/active" }]}
        filters={["Draft", "Order", "Natija", "Yakunlash"]}
        fullListHref="/app/doctor"
        fullListLabel="Ish stoli"
        searchPlaceholder="Aktiv konsultatsiya qidirish..."
      >
        <WorkbenchTableHeader />
        <WorkbenchRowLimit initialCount={12}>
          {items.map((item) => <ActiveRow item={item} key={item.id} />)}
        </WorkbenchRowLimit>
      </WorkbenchListCard>
    </div>
  );
}

function ActiveRow({ item }: { item: DoctorWorkItem }) {
  return (
    <WorkbenchTableRow
      title={item.patient.fullName}
      subtitle={item.chiefComplaint ?? item.reason ?? "Klinik holat"}
      href={`/app/doctor/visits/${item.visitId}`}
      reference={item.visitCode}
      context={[item.department?.name, `${item.pendingOrdersCount} order`, `${item.pendingResultsCount} natija`].join(" / ")}
      primaryBadge={{ ...item.workflowBadge, label: localizeStatus(item.workflowBadge.label) }}
      secondaryBadge={{ ...item.consultationBadge, label: localizeStatus(item.consultationBadge.label) }}
      signals={[`${item.visitAgeMinutes} daq`, `${item.pendingOrdersCount} order`, `${item.pendingResultsCount} natija`]}
      nextAction={localizeAction(item.nextAction.label)}
      primaryAction={{ label: localizeAction(item.nextAction.cta), href: item.nextAction.targetRoute }}
      secondaryActions={[{ label: "Order", href: `/app/doctor/visits/${item.visitId}/orders`, variant: "secondary" }, { label: "Natijalar", href: `/app/doctor/visits/${item.visitId}/results`, variant: "secondary" }]}
    />
  );
}
function PageNote({ text }: { text: string }) { return <div className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm leading-5 text-slate-600">{text}</div>; }
function localizeAction(value?: string): string { return ({ "Continue consultation": "Davom ettirish", Continue: "Davom", Open: "Ochish" } as Record<string, string>)[value ?? ""] ?? value ?? ""; }
function localizeStatus(value?: string): string { return ({ "With doctor": "Shifokorda", "In progress": "Jarayonda", "Waiting for results": "Natija kutmoqda", "Reviewing results": "Review qilinmoqda" } as Record<string, string>)[value ?? ""] ?? value ?? ""; }
function expandWorkItems(items: DoctorWorkItem[], target: number): DoctorWorkItem[] {
  if (!items.length) return [];
  return Array.from({ length: target }, (_, index) => {
    const item = items[index % items.length];
    return {
      ...item,
      id: `${item.id}-demo-${index + 1}`,
      visitAgeMinutes: item.visitAgeMinutes + index * 6,
      pendingOrdersCount: (item.pendingOrdersCount + index) % 6,
      pendingResultsCount: (item.pendingResultsCount + index) % 5,
      consultationStatus: (["in_progress", "waiting_for_results", "reviewing_results"] as const)[index % 3],
      consultationBadge: {
        label: (["In progress", "Waiting for results", "Reviewing results"] as const)[index % 3],
        tone: (["accent", "warning", "warning"] as const)[index % 3],
      },
    };
  });
}
