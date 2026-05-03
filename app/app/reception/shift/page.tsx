import { getReceptionShiftSummary } from "@/lib/api/client";
import {
  ReceptionPlaceholderPage,
  ReceptionPreviewCard,
} from "@/components/reception/reception-placeholder-page";

export default async function ReceptionShiftPage() {
  const shift = await getReceptionShiftSummary();

  return (
    <ReceptionPlaceholderPage
      metrics={[
        { label: "Ro‘yxatdan o‘tgan", value: shift.summary.registeredPatients, tone: "info" },
        { label: "Yaratilgan tashriflar", value: shift.summary.createdVisits, tone: "success" },
        { label: "Hal qilinmagan", value: shift.summary.unresolvedCases, tone: "warning" },
        { label: "Kechikkan", value: shift.summary.delayedCases, tone: "danger" },
      ]}
      pageType="Ish stoli"
      primaryActionLabel="Smenani yopish keyingi bosqichda"
      purpose="Operator yoki qabulxonaning kunlik smena yakunini va hal qilinmagan holatlarni ko‘rsatish."
      route="/app/reception/shift"
      sections={[
        {
          title: "Smena ko‘rsatkichlari preview",
          description: "Reception mock client’dan olingan summary.",
          children: (
            <div className="grid gap-2 md:grid-cols-2">
              <ReceptionPreviewCard description={`${shift.summary.checkedInAppointments} ta check-in / ${shift.summary.walkIns} ta navbatsiz.`} title="Bemor oqimi" />
              <ReceptionPreviewCard description={`${shift.summary.queuedToDoctor} ta shifokor navbatiga / ${shift.summary.sentToBilling} ta to‘lovga yuborilgan.`} title="Yo‘naltirish va to‘lov" tone="info" />
              <ReceptionPreviewCard description={`${shift.summary.completedVisits} ta yakunlangan / ${shift.summary.noShows} ta no-show.`} title="Natijalar" tone="success" />
              <ReceptionPreviewCard description={`${shift.summary.cancelledAppointments} ta qabul bekor qilingan.`} title="Istisnolar" tone="warning" />
            </div>
          ),
        },
        {
          title: "Hal qilinmagan holatlar preview",
          description: "Kritik holatlar qolsa, smena yopishda ogohlantirish yoki bloklash bo‘ladi.",
          children: (
            <>
              {shift.unresolvedCases.slice(0, 5).map((item) => (
                <ReceptionPreviewCard
                  description={`${item.visit.patient.fullName} / ${formatDelayType(item.delayType)} / ${item.owner}`}
                  key={item.id}
                  meta={`${item.waitingMinutes}m`}
                  title={item.visit.visitCode}
                  tone={item.severity === "critical" ? "danger" : "warning"}
                />
              ))}
            </>
          ),
        },
        {
          title: "Smena harakatlari preview",
          description: "Eksport, chop etish va smenani yopish hal qilinmagan holatlar bilan nazorat qilinadi.",
          children: (
            <div className="grid gap-2 md:grid-cols-3">
              <ReceptionPreviewCard description="Smena yakunini yuklab olish." title="Eksport" />
              <ReceptionPreviewCard description="Qabulxona hisobotini chop etish." title="Chop etish" />
              <ReceptionPreviewCard description="Kritik holatlar uchun manager tasdig‘i." title="Smenani yopish" tone="warning" />
            </div>
          ),
        },
      ]}
      title="Smena yakuni"
    />
  );
}

function formatDelayType(value: string): string {
  const labels: Record<string, string> = {
    waiting_for_doctor: "Shifokor kutmoqda",
    lab_pending: "Laboratoriya kutmoqda",
    radiology_pending: "Radiologiya kutmoqda",
    billing_pending: "To‘lov kutmoqda",
    paid_not_closed: "To‘langan, lekin yopilmagan",
    no_show_candidate: "No-show ehtimoli",
  };

  return labels[value] ?? value.replaceAll("_", " ");
}
