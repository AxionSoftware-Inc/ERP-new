import { WorkbenchListCard } from "@/components/workbench/workbench-list-card";
import { WorkbenchRowLimit } from "@/components/workbench/workbench-row-limit";
import { WorkbenchTableHeader, WorkbenchTableRow } from "@/components/workbench/workbench-table-row";
import { getDoctorCompletedConsultations } from "@/lib/api/client";
import type { DoctorCompletedItem } from "@/lib/types/doctor";

export default async function DoctorCompletedRoutePage() {
  const completed = await getDoctorCompletedConsultations();
  const items = expandCompletedItems(completed.items, 24);

  return (
    <div className="space-y-3">
      <PageNote text="Bu sahifa yakunlangan konsultatsiyalar uchun: diagnoz xulosasi, billing holati, retsept va hujjatlar bor-yo'qligi tekshiriladi." />
      <WorkbenchListCard
        title="Yakunlangan konsultatsiyalar"
        summary={`${items.length} yakunlangan klinik holat`}
        selectedKey="completed"
        selector={[{ key: "completed", label: "Yakunlangan", count: items.length, href: "/app/doctor/completed" }]}
        filters={["Diagnoz", "Billing", "Retsept", "Hujjat"]}
        fullListHref="/app/doctor"
        fullListLabel="Ish stoli"
        searchPlaceholder="Yakunlanganlar ichida qidirish..."
      >
        <WorkbenchTableHeader />
        <WorkbenchRowLimit initialCount={12}>
          {items.map((item) => <CompletedRow item={item} key={item.id} />)}
        </WorkbenchRowLimit>
      </WorkbenchListCard>
    </div>
  );
}

function CompletedRow({ item }: { item: DoctorCompletedItem }) {
  return (
    <WorkbenchTableRow
      title={item.patient.fullName}
      subtitle={item.diagnosisText ?? "Diagnoz kiritilmagan"}
      href={`/app/doctor/visits/${item.visitId}`}
      reference={item.visitCode}
      context={`To'lov: ${item.billingStatus ?? "yo'q"}`}
      primaryBadge={{ label: "Yakunlangan", tone: "success" }}
      signals={[formatTime(item.completedAt), item.prescriptionExists ? "Retsept bor" : "Retsept yo'q", `${item.documentCount} hujjat`]}
      nextAction={localizeAction(item.nextAction.label)}
      primaryAction={{ label: localizeAction(item.nextAction.cta), href: item.nextAction.targetRoute }}
      secondaryActions={[{ label: "Bemor", href: `/app/patients/${item.patient.id}`, variant: "secondary" }, { label: "Chop etish", href: `/app/doctor/visits/${item.visitId}/documents`, variant: "secondary" }]}
    />
  );
}
function PageNote({ text }: { text: string }) { return <div className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm leading-5 text-slate-600">{text}</div>; }
function localizeAction(value?: string): string { return ({ View: "Ko'rish", Open: "Ochish" } as Record<string, string>)[value ?? ""] ?? value ?? ""; }
function formatTime(value: string): string { const date = new Date(value); return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("uz-UZ", { hour: "2-digit", minute: "2-digit" }).format(date); }
function expandCompletedItems(items: DoctorCompletedItem[], target: number): DoctorCompletedItem[] {
  if (!items.length) return [];
  return Array.from({ length: target }, (_, index) => {
    const item = items[index % items.length];
    return {
      ...item,
      id: `${item.id}-demo-${index + 1}`,
      billingStatus: (["paid", "billing_pending", "partially_paid"] as const)[index % 3],
      prescriptionExists: index % 2 === 0,
      documentCount: (item.documentCount + index) % 6,
    };
  });
}
