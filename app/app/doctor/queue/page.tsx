import { WorkbenchListCard } from "@/components/workbench/workbench-list-card";
import { WorkbenchRowLimit } from "@/components/workbench/workbench-row-limit";
import { WorkbenchTableHeader, WorkbenchTableRow } from "@/components/workbench/workbench-table-row";
import { getDoctorQueue } from "@/lib/api/client";
import type { DoctorWorkItem } from "@/lib/types/doctor";

export default async function DoctorQueueRoutePage() {
  const queue = await getDoctorQueue();
  const items = expandWorkItems(queue.items, 24);

  return (
    <div className="space-y-3">
      <PageNote text="Bu sahifa shifokorga biriktirilgan, lekin konsultatsiya hali boshlanmagan bemorlar uchun. Bu yerda navbat, kutish va ustuvorlik ko'rinadi; asosiy amal konsultatsiyani boshlash." />
      <WorkbenchListCard
        title="Shifokor navbati"
        summary={`${items.length} bemor konsultatsiya boshlanishini kutmoqda`}
        selectedKey="queue"
        selector={[{ key: "queue", label: "Navbatim", count: items.length, href: "/app/doctor/queue" }]}
        filters={["Ustuvorlik", "Kutish vaqti", "Bo'lim", "Tashrif turi"]}
        fullListHref="/app/doctor"
        fullListLabel="Ish stoli"
        searchPlaceholder="Navbat ichida qidirish..."
      >
        <WorkbenchTableHeader />
        <WorkbenchRowLimit initialCount={12}>
          {items.map((item) => <DoctorWorkRow item={item} key={item.id} />)}
        </WorkbenchRowLimit>
      </WorkbenchListCard>
    </div>
  );
}

function DoctorWorkRow({ item }: { item: DoctorWorkItem }) {
  return (
    <WorkbenchTableRow
      title={item.patient.fullName}
      subtitle={[item.patient.patientCode, item.patient.phone].filter(Boolean).join(" / ")}
      href={`/app/doctor/visits/${item.visitId}/consultation`}
      reference={`${item.queueNumber ?? "-"} / ${item.visitCode}`}
      context={[item.department?.name, item.reason].filter(Boolean).join(" / ")}
      primaryBadge={{ ...item.workflowBadge, label: localizeStatus(item.workflowBadge.label) }}
      secondaryBadge={{ ...item.consultationBadge, label: localizeStatus(item.consultationBadge.label) }}
      signals={[`${item.waitingMinutes} daq`, priorityLabel(item.priority), `${item.visitAgeMinutes} daq tashrif`]}
      nextAction={localizeAction(item.nextAction.label)}
      primaryAction={{ label: localizeAction(item.nextAction.cta), href: item.nextAction.targetRoute }}
      secondaryActions={[{ label: "Tashrif", href: `/app/doctor/visits/${item.visitId}`, variant: "secondary" }, { label: "Bemor", href: `/app/patients/${item.patient.id}`, variant: "secondary" }]}
    />
  );
}
function PageNote({ text }: { text: string }) { return <div className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm leading-5 text-slate-600">{text}</div>; }
function priorityLabel(value: DoctorWorkItem["priority"]): string { if (value === "stat") return "STAT"; if (value === "urgent") return "Tezkor"; return "Oddiy"; }
function localizeAction(value?: string): string { return ({ "Start consultation": "Konsultatsiyani boshlash", Start: "Boshlash", Open: "Ochish" } as Record<string, string>)[value ?? ""] ?? value ?? ""; }
function localizeStatus(value?: string): string { return ({ "Queued for doctor": "Kutmoqda", "Not started": "Boshlanmagan" } as Record<string, string>)[value ?? ""] ?? value ?? ""; }
function expandWorkItems(items: DoctorWorkItem[], target: number): DoctorWorkItem[] {
  if (!items.length) return [];
  return Array.from({ length: target }, (_, index) => {
    const item = items[index % items.length];
    return {
      ...item,
      id: `${item.id}-demo-${index + 1}`,
      queueNumber: `D-${String(index + 1).padStart(3, "0")}`,
      waitingMinutes: item.waitingMinutes + index * 3,
      visitAgeMinutes: item.visitAgeMinutes + index * 4,
      priority: (["routine", "urgent", "stat"] as const)[index % 3],
    };
  });
}
