import Link from "next/link";
import { getDoctorClinicalHistory } from "@/lib/api/client";

export default async function DoctorClinicalHistoryRoutePage() {
  const history = await getDoctorClinicalHistory();

  return (
    <div className="space-y-3">
      <PageNote text="Bu sahifa bemorning avvalgi klinik kontekstini ko'rish uchun: oldingi tashriflar, diagnozlar, lab/radiologiya tarixi, allergiya va surunkali holatlar. Bu yangi konsultatsiyada qaror qabul qilishga yordam beradi." />
      <section className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_330px]">
        <main className="grid gap-3 lg:grid-cols-2">
          <HistoryPanel title="Oldingi tashriflar" items={history.visits.map((visit) => ({ title: visit.visitCode, meta: visit.workflowBadge.label, href: `/app/doctor/visits/${visit.id}` }))} />
          <HistoryPanel title="Diagnozlar" items={history.diagnoses.map((diagnosis) => ({ title: diagnosis.text, meta: diagnosis.icd10Code ?? "ICD yo'q", href: "/app/doctor/clinical-history" }))} />
          <HistoryPanel title="Lab tarixi" items={history.labResults.map((result) => ({ title: result.labOrderCode, meta: result.testNames.join(", "), href: "/app/doctor/clinical-history" }))} />
          <HistoryPanel title="Radiologiya" items={history.radiologyReports.map((report) => ({ title: report.radiologyOrderCode, meta: report.serviceName, href: "/app/doctor/clinical-history" }))} />
        </main>
        <aside className="space-y-3">
          <SimplePanel title="Allergiyalar" items={history.allergies.length ? history.allergies : ["Allergiya belgilanmagan"]} />
          <SimplePanel title="Surunkali holatlar" items={history.chronicConditions.length ? history.chronicConditions : ["Surunkali holat belgilanmagan"]} />
          <SimplePanel title="Joriy dorilar" items={history.currentMedications.length ? history.currentMedications : ["Dori belgilanmagan"]} />
        </aside>
      </section>
    </div>
  );
}

function PageNote({ text }: { text: string }) { return <div className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm leading-5 text-slate-600">{text}</div>; }
function HistoryPanel({ title, items }: { title: string; items: { title: string; meta: string; href: string }[] }) {
  return <section className="rounded-md border border-slate-200 bg-white p-3"><h2 className="text-sm font-semibold text-slate-950">{title}</h2><div className="mt-2 divide-y divide-slate-100">{items.slice(0, 8).map((item) => <Link className="block py-2 hover:bg-slate-50" href={item.href} key={`${item.title}-${item.meta}`}><div className="truncate text-sm font-semibold text-slate-900">{item.title}</div><div className="truncate text-xs text-slate-500">{item.meta}</div></Link>)}</div></section>;
}
function SimplePanel({ title, items }: { title: string; items: string[] }) {
  return <section className="rounded-md border border-slate-200 bg-white p-3"><h2 className="text-sm font-semibold text-slate-950">{title}</h2><div className="mt-2 space-y-2">{items.slice(0, 6).map((item) => <div className="rounded-md border border-slate-100 bg-slate-50 px-3 py-2 text-sm text-slate-700" key={item}>{item}</div>)}</div></section>;
}
