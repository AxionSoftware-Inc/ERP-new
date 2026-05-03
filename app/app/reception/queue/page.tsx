import { getReceptionQueueControl } from "@/lib/api/client";
import {
  ReceptionPlaceholderPage,
  ReceptionPreviewCard,
} from "@/components/reception/reception-placeholder-page";

export default async function ReceptionQueuePage() {
  const queueControl = await getReceptionQueueControl();

  return (
    <ReceptionPlaceholderPage
      metrics={queueControl.summary.slice(0, 4).map((item) => ({
        label: item.label,
        value: item.count,
        tone: item.tone,
      }))}
      pageType="Ish stoli"
      primaryActionLabel="Navbat boshqaruvi keyingi bosqichda"
      purpose="Qabulxona va katta administrator uchun to‘liq operatsion navbat boshqaruvi."
      route="/app/reception/queue"
      sections={[
        {
          title: "Filterlar preview",
          description: "To‘liq sahifada mas’ul, holat va kutish vaqti bo‘yicha filterlar bo‘ladi.",
          children: (
            <div className="grid gap-2 md:grid-cols-3">
              <ReceptionPreviewCard description="Shifokor, bo‘lim, holat." meta="Klinik" title="Mas’ul filterlari" />
              <ReceptionPreviewCard description="Ustuvorlik, kutish vaqti, tashrif davomiyligi." meta="Vaqt" title="Vaqt filterlari" tone="warning" />
              <ReceptionPreviewCard description="To‘lov holati va tashrif turi." meta="Biznes" title="To‘lov filterlari" tone="info" />
            </div>
          ),
        },
        {
          title: "Navbat bo‘limlari preview",
          description: "Reception queue mock data’dan olingan yengil ko‘rsatkichlar.",
          children: (
            <>
              <ReceptionPreviewCard description={`${queueControl.queues.byPriority.count} ta holat ustuvorlik bo‘yicha saralangan.`} title="Ustuvorlik bo‘yicha" tone="warning" />
              <ReceptionPreviewCard description={`${queueControl.queues.byWaitingTime.count} ta holat kutish vaqti bo‘yicha saralangan.`} title="Kutish vaqti bo‘yicha" tone="info" />
              <ReceptionPreviewCard description={`${queueControl.queues.billingOrClosing.count} ta to‘lov yoki yakunlash holati.`} title="To‘lov / yakunlash" tone="success" />
              <ReceptionPreviewCard description={`${queueControl.queues.unresolved.count} ta qabulxona e’tiborini talab qiladigan ochiq holat.`} title="Hal qilinmagan" tone="danger" />
            </>
          ),
        },
        {
          title: "O‘ng kontekst preview",
          description: "Shifokor yuklamasi, kechikkan bemorlar va tiqilish signallari.",
          children: (
            <>
              <ReceptionPreviewCard description={`${queueControl.rightPanel.delayedCases.length} ta kechikkan holat mock data’da bor.`} title="Kechikkan bemorlar" tone="warning" />
              <ReceptionPreviewCard description={`${queueControl.rightPanel.doctorLoad.length} ta shifokor yuklamasi kartasi yo‘naltirishga yordam beradi.`} title="Shifokor yuklamasi" />
              <ReceptionPreviewCard description={queueControl.rightPanel.bottlenecks.join(" / ") || "Tiqilish yo‘q."} title="Tiqilishlar" tone="info" />
            </>
          ),
        },
      ]}
      title="Navbat boshqaruvi"
    />
  );
}
