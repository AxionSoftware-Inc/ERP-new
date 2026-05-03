import { getReceptionQueueControl } from "@/lib/api/client";
import {
  ReceptionPlaceholderPage,
  ReceptionPreviewCard,
} from "@/components/reception/reception-placeholder-page";

export default async function ReceptionDelayedPage() {
  const queueControl = await getReceptionQueueControl();
  const critical = queueControl.rightPanel.delayedCases.filter((item) => item.severity === "critical");
  const warnings = queueControl.rightPanel.delayedCases.filter((item) => item.severity === "warning");

  return (
    <ReceptionPlaceholderPage
      metrics={[
        { label: "Kechikkan holatlar", value: queueControl.rightPanel.delayedCases.length, tone: "warning" },
        { label: "Kritik", value: critical.length, tone: "danger" },
        { label: "Ogohlantirish", value: warnings.length, tone: "warning" },
        { label: "Shifokor yuklamasi", value: queueControl.rightPanel.doctorLoad.length },
      ]}
      pageType="Ish stoli"
      primaryActionLabel="Eskalyatsiya vositalari keyingi bosqichda"
      purpose="Kutilgan kutish yoki workflow vaqtidan oshgan holatlarni nazorat qilish."
      route="/app/reception/delayed"
      sections={[
        {
          title: "Kechikkan holatlar konsepti",
          description: "Bu sahifa SLA buzilishi va mas’ulga topshirishni markazlashtiradi.",
          children: (
            <div className="grid gap-2 md:grid-cols-2">
              <ReceptionPreviewCard description="Shifokor kutish, laboratoriya kutish, radiologiya kutish." title="Klinik kechikishlar" tone="warning" />
              <ReceptionPreviewCard description="To‘lov kutish, to‘langan lekin yopilmagan, no-show ehtimoli." title="Operatsion kechikishlar" tone="danger" />
            </div>
          ),
        },
        {
          title: "Mock kechikkan holatlar preview",
          description: "Route foydali ko‘rinishi uchun R1 mock holatlaridan bir nechtasi ko‘rsatildi.",
          children: (
            <>
              {queueControl.rightPanel.delayedCases.slice(0, 6).map((item) => (
                <ReceptionPreviewCard
                  description={`${item.visit.patient.fullName} / ${formatDelayType(item.delayType)} / mas’ul: ${item.owner}`}
                  key={item.id}
                  meta={`${item.waitingMinutes}m`}
                  title={item.visit.visitCode}
                  tone={item.severity === "critical" ? "danger" : "warning"}
                />
              ))}
            </>
          ),
        },
      ]}
      title="Kechikkan holatlar"
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
