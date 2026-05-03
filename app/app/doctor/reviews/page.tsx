import { WorkbenchListCard } from "@/components/workbench/workbench-list-card";
import { WorkbenchRowLimit } from "@/components/workbench/workbench-row-limit";
import { WorkbenchTableHeader, WorkbenchTableRow } from "@/components/workbench/workbench-table-row";
import { getDoctorReviews } from "@/lib/api/client";
import type { DoctorReviewItem } from "@/lib/types/doctor";

export default async function DoctorReviewsRoutePage() {
  const reviews = await getDoctorReviews();
  const items = expandReviewItems(reviews.items, 24);
  const criticalCount = items.filter((item) => item.flag === "critical").length;
  const abnormalCount = items.filter((item) => item.flag === "abnormal").length;
  const delayedCount = items.filter((item) => item.delayedMinutes > 30).length;

  return (
    <div className="space-y-3">
      <PageNote text="Bu sahifa laboratoriya, radiologiya va procedure natijalari shifokor reviewini kutayotgan holatlar uchun. Kritik va normadan tashqari natijalar birinchi ko'rilishi kerak." />
      <WorkbenchListCard
        title="Natijalar review"
        summary={`${items.length} natija / ${criticalCount} kritik`}
        selectedKey="reviews"
        selector={[
          { key: "reviews", label: "Barchasi", count: items.length, href: "/app/doctor/reviews" },
          { key: "critical", label: "Kritik", count: criticalCount, href: "/app/doctor/reviews" },
          { key: "abnormal", label: "Normadan tashqari", count: abnormalCount, href: "/app/doctor/reviews" },
          { key: "delayed", label: "Kechikkan", count: delayedCount, href: "/app/doctor/reviews" },
        ]}
        filters={["Natija turi", "Flag", "Chiqqan vaqt", "Kechikish"]}
        fullListHref="/app/doctor"
        fullListLabel="Ish stoli"
        searchPlaceholder="Natija yoki bemor..."
      >
        <WorkbenchTableHeader />
        <WorkbenchRowLimit initialCount={12}>
          {items.map((item) => <ReviewRow item={item} key={item.id} />)}
        </WorkbenchRowLimit>
      </WorkbenchListCard>
    </div>
  );
}

function ReviewRow({ item }: { item: DoctorReviewItem }) {
  return (
    <WorkbenchTableRow
      title={item.patient.fullName}
      subtitle={item.serviceName}
      href={item.nextAction.targetRoute ?? `/app/doctor/visits/${item.visitId}/results`}
      reference={`${item.sourceCode} / ${item.visitCode}`}
      context={`${resultType(item.resultType)} / ${formatTime(item.releasedAt)}`}
      primaryBadge={{ label: flagLabel(item.flag), tone: item.flag === "critical" ? "danger" : item.flag === "abnormal" ? "warning" : "neutral" }}
      signals={[`${item.delayedMinutes} daq`, item.reviewed ? "Ko'rilgan" : "Ochiq", resultType(item.resultType)]}
      nextAction={localizeAction(item.nextAction.label)}
      primaryAction={{ label: localizeAction(item.nextAction.cta), href: item.nextAction.targetRoute }}
      secondaryActions={[{ label: "Tashrif", href: `/app/doctor/visits/${item.visitId}`, variant: "secondary" }, { label: "Konsultatsiya", href: `/app/doctor/visits/${item.visitId}/consultation`, variant: "secondary" }]}
    />
  );
}
function PageNote({ text }: { text: string }) { return <div className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm leading-5 text-slate-600">{text}</div>; }
function flagLabel(value: DoctorReviewItem["flag"]): string { if (value === "critical") return "Kritik"; if (value === "abnormal") return "Normadan tashqari"; return "Normal"; }
function resultType(value: DoctorReviewItem["resultType"]): string { return ({ lab: "Lab", radiology: "Radiologiya", procedure: "Procedure" } as Record<DoctorReviewItem["resultType"], string>)[value]; }
function localizeAction(value?: string): string { return ({ "Review result": "Natijani ko'rish", Review: "Review", Open: "Ochish" } as Record<string, string>)[value ?? ""] ?? value ?? ""; }
function formatTime(value: string): string { const date = new Date(value); return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("uz-UZ", { hour: "2-digit", minute: "2-digit" }).format(date); }
function expandReviewItems(items: DoctorReviewItem[], target: number): DoctorReviewItem[] {
  if (!items.length) return [];
  return Array.from({ length: target }, (_, index) => {
    const item = items[index % items.length];
    const resultType = (["lab", "radiology", "procedure"] as const)[index % 3];
    return {
      ...item,
      id: `${item.id}-demo-${index + 1}`,
      sourceCode: `${resultType.toUpperCase()}-${String(index + 1).padStart(4, "0")}`,
      resultType,
      flag: (["critical", "abnormal", "normal"] as const)[index % 3],
      delayedMinutes: item.delayedMinutes + index * 4,
      reviewed: index % 6 === 0,
    };
  });
}
