import { getReceptionCheckInWorkspace } from "@/lib/api/client";
import {
  ReceptionPlaceholderPage,
  ReceptionPreviewCard,
} from "@/components/reception/reception-placeholder-page";

export default async function ReceptionCheckInPage() {
  const workspace = await getReceptionCheckInWorkspace();

  return (
    <ReceptionPlaceholderPage
      metrics={workspace.summary.slice(0, 4).map((item) => ({
        label: item.label,
        value: item.count,
        tone: item.tone,
      }))}
      pageType="Ish stoli"
      primaryActionLabel="Check-in flow keyingi bosqichda"
      purpose="Rejadagi bemorlarning kelishini boshqarish va qabulni tashrifga aylantirish."
      route="/app/reception/check-in"
      sections={[
        {
          title: "Qabul navbatlari preview",
          description: "Rejalashtirilgan, kelgan, check-in qilingan va kechikkan/no-show yo‘laklari.",
          children: (
            <div className="grid gap-2 md:grid-cols-2">
              <ReceptionPreviewCard description={`${workspace.queues.scheduled.count} ta rejalashtirilgan yoki tasdiqlangan qabul.`} meta="Navbat" title="Rejali / tasdiqlangan" />
              <ReceptionPreviewCard description={`${workspace.queues.arrived.count} ta bemor kelgan deb belgilangan va check-in kutmoqda.`} meta="Navbat" title="Kelganlar" tone="info" />
              <ReceptionPreviewCard description={`${workspace.queues.checkedIn.count} ta qabul allaqachon check-in qilingan.`} meta="Navbat" title="Check-in qilingan" tone="success" />
              <ReceptionPreviewCard description={`${workspace.queues.lateOrNoShow.count} ta kechikkan yoki no-show ehtimoli bor qabul.`} meta="Navbat" title="Kechikkan / no-show" tone="warning" />
            </div>
          ),
        },
        {
          title: "Harakat modeli",
          description: "Haqiqiy ish stolida xavfsiz qabul amallari bo‘ladi.",
          children: (
            <>
              <ReceptionPreviewCard description="Qabulni tasdiqlash, kelgan deb belgilash, bemorga qo‘ng‘iroq qilish, qayta rejalash, bekor qilish." title="Rejali qabul harakatlari" />
              <ReceptionPreviewCard description="Check-in qilish, tashrifga aylantirish, bemorni ochish, navbatga qo‘yish." title="Kelgan bemor harakatlari" tone="info" />
            </>
          ),
        },
      ]}
      title="Qabul check-in"
    />
  );
}
