import { getReceptionWalkInsWorkspace } from "@/lib/api/client";
import {
  ReceptionPlaceholderPage,
  ReceptionPreviewCard,
} from "@/components/reception/reception-placeholder-page";

export default async function ReceptionWalkInsPage() {
  const workspace = await getReceptionWalkInsWorkspace();

  return (
    <ReceptionPlaceholderPage
      metrics={[
        { label: "Yangi navbatsizlar", value: workspace.queues.newWalkIns.count, tone: "info" },
        { label: "Biriktirish kutmoqda", value: workspace.queues.waitingAssignment.count, tone: "warning" },
        { label: "Biriktirilgan / navbatda", value: workspace.queues.assignedOrQueued.count, tone: "success" },
        { label: "Ko‘rinayotgan shifokorlar", value: workspace.quickContext.doctorAvailability.length },
      ]}
      pageType="Ish stoli"
      primaryActionLabel="Navbatsiz flow keyingi bosqichda"
      purpose="Oldindan yozilmasdan kelgan bemorlarni qabul qilish va shifokor yuklamasiga qarab yo‘naltirish."
      route="/app/reception/walk-ins"
      sections={[
        {
          title: "Tez navbatsiz qabul",
          description: "Ixcham forma bemor, sabab, bo‘lim, ustuvorlik va to‘lov turini oladi.",
          children: (
            <div className="grid gap-2 md:grid-cols-2">
              <ReceptionPreviewCard description="Mavjud bemorni qidirish yoki minimal yangi bemor ma’lumotlarini kiritish." title="Bemorni topish" />
              <ReceptionPreviewCard description="Sabab, bo‘lim, shifokor xohishi, ustuvorlik, to‘lov turi." title="Navbatsiz qabul konteksti" tone="info" />
            </div>
          ),
        },
        {
          title: "Navbatsiz bemorlar navbati preview",
          description: "Navbatlar yangi, biriktirish kutayotgan va biriktirilgan/navbatdagi bemorlarni ajratadi.",
          children: (
            <>
              <ReceptionPreviewCard description={`${workspace.queues.newWalkIns.count} ta bemorga tashrif yaratish yoki shifokor biriktirish kerak.`} title="Yangi navbatsizlar" />
              <ReceptionPreviewCard description={`${workspace.queues.waitingAssignment.count} ta bemorga shifokor biriktirish kerak.`} title="Biriktirish kutmoqda" tone="warning" />
              <ReceptionPreviewCard description={`${workspace.queues.assignedOrQueued.count} ta bemor allaqachon biriktirilgan yoki navbatda.`} title="Biriktirilgan / navbatda" tone="success" />
            </>
          ),
        },
      ]}
      title="Navbatsiz kelganlar"
    />
  );
}
