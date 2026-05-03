import { notFound } from "next/navigation";
import { getVisitDetail } from "@/lib/api/client";
import { DetailHeader } from "@/components/detail/detail-header";
import { DetailSection } from "@/components/detail/detail-section";
import { DetailWorkspace } from "@/components/detail/detail-workspace";
import { RightContextRail } from "@/components/detail/right-context-rail";
import { StickyCommandBar } from "@/components/detail/sticky-command-bar";
import { StatusBadge } from "@/components/status/status-badge";
import {
  formatConsultationStatus,
  formatElapsed,
  formatGender,
  formatWorkflowStatus,
  localizeDoctorAction,
  localizeDoctorBadge,
} from "@/components/doctor/doctor-format";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DoctorVisitDetailPage({ params }: Props) {
  const { id } = await params;
  const detail = await getVisitDetail(id);
  if (!detail) notFound();

  const { visit, consultation, labOrders, radiologyOrders, procedureOrders, invoice, timeline } = detail;
  const action = localizeDoctorAction(visit.nextAction);

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-slate-100/80 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
      <DetailWorkspace
        header={
          <DetailHeader
            title={`${visit.patient.fullName} / ${visit.visitCode}`}
            subtitle={visit.reason ?? "Tashrif sababi kiritilmagan"}
            badges={[localizeDoctorBadge(visit.workflowBadge)]}
            meta={[
              { label: "Bemor kodi", value: visit.patient.patientCode },
              { label: "Yosh / jins", value: `${visit.patient.age ?? "?"} / ${formatGender(visit.patient.gender)}` },
              { label: "Shifokor", value: visit.doctor?.fullName ?? "Biriktirilmagan" },
              { label: "Bo‘lim", value: visit.department?.name ?? "Tanlanmagan" },
            ]}
            primaryAction={{ label: action.cta || "Davom ettirish", href: `/app/visits/${visit.id}` }}
          />
        }
        commandBar={
          <StickyCommandBar
            primaryAction={{ label: action.cta || "Davom ettirish", href: `/app/visits/${visit.id}` }}
            actions={[
              { label: "Bemor profili", href: `/app/patients/${visit.patient.id}` },
              { label: "Lab buyurish", href: `/app/visits/${visit.id}/orders` },
              { label: "To‘liq tashrif", href: `/app/visits/${visit.id}` },
            ]}
            dangerActions={[{ label: "Bekor qilish", href: `/app/visits/${visit.id}`, disabled: true, reason: "Mock rejimda xavfli amal o‘chiq" }]}
          />
        }
        rightRail={
          <RightContextRail
            sections={[
              {
                title: "Bemor konteksti",
                content: (
                  <div className="space-y-2 text-sm">
                    <InfoLine label="Telefon" value={visit.patient.phone ?? "Telefon yo‘q"} />
                    <InfoLine label="Tashrif turi" value={formatVisitType(visit.visitType)} />
                    <InfoLine label="Yaratilgan" value={formatElapsed(visit.createdAt)} />
                    <InfoLine label="Holat" value={formatWorkflowStatus(visit.workflowStatus)} />
                  </div>
                ),
              },
              {
                title: "Moliyaviy holat",
                content: invoice ? (
                  <div className="space-y-2">
                    <InfoLine label="Hisob" value={invoice.invoiceCode} />
                    <InfoLine label="Jami" value={invoice.total.formatted} />
                    <InfoLine label="Qoldiq" value={invoice.balance.formatted} />
                    <StatusBadge badge={localizeDoctorBadge(invoice.statusBadge)} size="sm" />
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">Hisob hali yaratilmagan.</p>
                ),
              },
              {
                title: "Natijalar konteksti",
                content: (
                  <div className="space-y-2 text-sm">
                    <InfoLine label="Lab buyurtmalar" value={String(labOrders.length)} />
                    <InfoLine label="Radiologiya" value={String(radiologyOrders.length)} />
                    <InfoLine label="Muolajalar" value={String(procedureOrders.length)} />
                  </div>
                ),
              },
            ]}
          />
        }
        timeline={
          <DetailSection title="Faoliyat tarixi" description="Tashrif bo‘yicha muhim o‘zgarishlar va auditga tayyor voqealar.">
            <ol className="space-y-2">
              {timeline.map((event) => (
                <li className="grid gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 md:grid-cols-[150px_minmax(0,1fr)]" key={event.id}>
                  <time className="text-xs font-medium text-slate-500">{formatDateTime(event.createdAt)}</time>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-slate-950">{event.title}</div>
                    {event.description ? <p className="mt-0.5 text-xs leading-5 text-slate-600">{event.description}</p> : null}
                    {event.actor ? <p className="mt-1 text-xs text-slate-500">Mas’ul: {event.actor.fullName}</p> : null}
                  </div>
                </li>
              ))}
            </ol>
          </DetailSection>
        }
      >
        <DetailSection title="Klinik ish maydoni" description="Shifokor ko‘rigi, tashxis va reja uchun asosiy klinik kontekst.">
          <div className="grid gap-2 md:grid-cols-2">
            <InfoCard title="Konsultatsiya holati" value={formatConsultationStatus(consultation?.status)} />
            <InfoCard title="Asosiy shikoyat" value={consultation?.chiefComplaint ?? visit.reason ?? "Kiritilmagan"} />
            <InfoCard title="Tashxis" value={consultation?.diagnosisText ?? "Hali kiritilmagan"} />
            <InfoCard title="Reja" value={consultation?.plan ?? "Hali kiritilmagan"} />
          </div>
        </DetailSection>

        <DetailSection title="Buyurtmalar va natijalar" description="Lab, radiologiya va muolaja holatlari.">
          <div className="grid gap-2 lg:grid-cols-3">
            <OrderSummary title="Laboratoriya" count={labOrders.length} items={labOrders.map((order) => order.testNames.join(", "))} />
            <OrderSummary title="Radiologiya" count={radiologyOrders.length} items={radiologyOrders.map((order) => order.serviceName)} />
            <OrderSummary title="Muolajalar" count={procedureOrders.length} items={procedureOrders.map((order) => order.procedureName)} />
          </div>
        </DetailSection>

        <DetailSection title="Shifokor qarori" description="Keyingi amal va klinik yopish uchun qisqa yo‘l.">
          <div className="rounded-xl border border-indigo-100 bg-indigo-50 px-3 py-2">
            <div className="text-xs font-semibold uppercase tracking-wide text-indigo-700">Tavsiya etilgan keyingi amal</div>
            <div className="mt-1 text-sm font-semibold text-indigo-950">{action.label}</div>
          </div>
        </DetailSection>
      </DetailWorkspace>
    </div>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-100 bg-slate-50 px-2 py-1.5">
      <span className="text-xs font-semibold text-slate-500">{label}</span>
      <span className="min-w-0 truncate text-right text-sm font-medium text-slate-900">{value}</span>
    </div>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
      <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{title}</div>
      <div className="mt-1 text-sm font-semibold text-slate-900">{value}</div>
    </div>
  );
}

function OrderSummary({ title, count, items }: { title: string; count: number; items: string[] }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-slate-950">{title}</h3>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-semibold text-slate-700">{count}</span>
      </div>
      <div className="mt-2 space-y-1">
        {items.length ? (
          items.slice(0, 4).map((item) => (
            <div className="truncate rounded-lg border border-slate-100 bg-slate-50 px-2 py-1 text-xs text-slate-600" key={item}>
              {item}
            </div>
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-2 py-2 text-xs text-slate-500">
            Buyurtma yo‘q.
          </div>
        )}
      </div>
    </div>
  );
}

function formatVisitType(value: string): string {
  if (value === "walk_in") return "Navbatsiz";
  if (value === "appointment") return "Rejali qabul";
  if (value === "follow_up") return "Takroriy";
  return "Shoshilinch";
}

function formatDateTime(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("uz-UZ", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
