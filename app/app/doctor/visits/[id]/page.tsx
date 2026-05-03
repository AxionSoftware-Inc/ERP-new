import Link from "next/link";
import { DoctorPlaceholderPage } from "@/components/doctor/doctor-placeholder-page";
import { getDoctorVisit } from "@/lib/api/client";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const visitTabs = [
  { label: "Consultation", href: "consultation" },
  { label: "Orders", href: "orders" },
  { label: "Results", href: "results" },
  { label: "Prescription", href: "prescription" },
  { label: "Documents", href: "documents" },
  { label: "Timeline", href: "timeline" },
];

export default async function DoctorVisitDetailPage({ params }: Props) {
  const { id } = await params;
  const detail = await getDoctorVisit(id);

  return (
    <DoctorPlaceholderPage
      title={detail ? `${detail.patient.fullName} / ${detail.visit.visitCode}` : "Doctor Visit Detail"}
      route={`/app/doctor/visits/${id}`}
      purpose="Doctor module yuragi bo'lgan visit detail uchun shell. Clinical workspace keyingi D4/D5 bosqichlarida to'liq ochiladi."
      sections={["Compact patient header", "Clinical command bar", "Clinical workspace", "Orders", "Results", "Prescription", "Right rail", "Timeline"]}
      actions={["Start consultation", "Save draft", "Order lab", "Order radiology", "Add prescription", "Complete consultation", "Send to billing", "Print"]}
    >
      <div className="rounded-md border border-slate-200 bg-white p-3">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-base font-semibold text-slate-950">
              {detail ? detail.patient.fullName : "Mock visit not found"}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {detail
                ? `${detail.visit.visitCode} / ${detail.visit.reason ?? "No reason"} / ${detail.doctor.fullName}`
                : "Fallback placeholder is shown because this id does not exist in mock doctor data."}
            </p>
          </div>
          <span className="rounded-md border border-indigo-200 bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-700">
            Doctor visit detail placeholder
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5 border-t border-slate-100 pt-3">
          {visitTabs.map((tab) => (
            <Link
              className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-800"
              href={`/app/doctor/visits/${id}/${tab.href}`}
              key={tab.href}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        {detail ? (
          <div className="mt-3 grid gap-2 md:grid-cols-3">
            <Info label="Consultation" value={detail.consultation.consultation?.status ?? "not_started"} />
            <Info label="Orders" value={String(detail.orders.labOrders.length + detail.orders.radiologyOrders.length + detail.orders.procedureOrders.length)} />
            <Info label="Results" value={String(detail.results.labResults.length + detail.results.radiologyReports.length + detail.results.procedureResults.length)} />
          </div>
        ) : null}
      </div>
    </DoctorPlaceholderPage>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-slate-100 bg-slate-50 px-3 py-2">
      <div className="text-[11px] font-semibold uppercase tracking-normal text-slate-500">{label}</div>
      <div className="mt-1 text-sm font-semibold text-slate-900">{value}</div>
    </div>
  );
}
