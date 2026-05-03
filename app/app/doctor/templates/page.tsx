import { WorkbenchListCard } from "@/components/workbench/workbench-list-card";
import { WorkbenchRowLimit } from "@/components/workbench/workbench-row-limit";
import { WorkbenchTableHeader, WorkbenchTableRow } from "@/components/workbench/workbench-table-row";
import { getDoctorTemplates } from "@/lib/api/client";
import type { DoctorTemplateSummary } from "@/lib/types/doctor";

export default async function DoctorTemplatesRoutePage() {
  const response = await getDoctorTemplates();

  return (
    <div className="space-y-3">
      <PageNote text="Bu sahifa klinik yozuv, diagnoz, retsept, order set va hujjat shablonlari uchun. Shifokor konsultatsiya vaqtida tez ishlatadigan matn va order presetlari shu yerda boshqariladi." />
      <WorkbenchListCard
        title="Shablonlar"
        summary={`${response.templates.length} klinik shablon`}
        selectedKey="all"
        selector={[
          { key: "all", label: "Barchasi", count: response.templates.length, href: "/app/doctor/templates" },
          { key: "fav", label: "Sevimli", count: response.templates.filter((item) => item.favorite).length, href: "/app/doctor/templates" },
        ]}
        filters={["SOAP", "Retsept", "Order set", "Hujjat"]}
        fullListHref="/app/doctor"
        fullListLabel="Ish stoli"
        searchPlaceholder="Shablon qidirish..."
      >
        <WorkbenchTableHeader />
        <WorkbenchRowLimit initialCount={12}>
          {response.templates.map((item) => <TemplateRow item={item} key={item.id} />)}
        </WorkbenchRowLimit>
      </WorkbenchListCard>
    </div>
  );
}

function TemplateRow({ item }: { item: DoctorTemplateSummary }) {
  return (
    <WorkbenchTableRow
      title={item.title}
      subtitle={typeLabel(item.type)}
      href="/app/doctor/templates"
      reference={item.id}
      context={`Yangilangan: ${formatTime(item.updatedAt)}`}
      primaryBadge={{ label: typeLabel(item.type), tone: "neutral" }}
      secondaryBadge={item.favorite ? { label: "Sevimli", tone: "warning" } : undefined}
      signals={[item.favorite ? "Sevimli" : "Oddiy", typeLabel(item.type), formatTime(item.updatedAt)]}
      nextAction="Shablonni ishlatish"
      primaryAction={{ label: "Ishlatish", href: "/app/doctor/templates" }}
      secondaryActions={[{ label: "Tahrirlash", href: "/app/doctor/templates", variant: "secondary" }]}
    />
  );
}
function PageNote({ text }: { text: string }) { return <div className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm leading-5 text-slate-600">{text}</div>; }
function typeLabel(value: DoctorTemplateSummary["type"]): string { return ({ clinical_note: "Klinik yozuv", diagnosis: "Diagnoz", prescription: "Retsept", lab_order_set: "Lab order set", radiology_order_set: "Radiologiya order set", treatment_plan: "Davolash rejasi", document: "Hujjat" } as Record<DoctorTemplateSummary["type"], string>)[value]; }
function formatTime(value: string): string { const date = new Date(value); return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("uz-UZ", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }).format(date); }
