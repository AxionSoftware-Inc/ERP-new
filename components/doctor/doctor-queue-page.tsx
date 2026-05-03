import { getDoctorWorkspace } from "@/lib/api/client";
import type { VisitListItem } from "@/lib/types/visits";
import { DoctorVisitRow } from "@/components/doctor/doctor-workspace";
import { QueueSection } from "@/components/workspace/queue-section";
import { SummaryStrip } from "@/components/workspace/summary-strip";
import { WorkspaceHeader } from "@/components/workspace/workspace-header";
import { mockBranches, mockDoctors } from "@/lib/mock/shared";
import { localizeDoctorSummaryLabel } from "@/components/doctor/doctor-format";

export type DoctorQueuePageProps = {
  mode: "queue" | "active" | "reviews" | "completed";
};

const pageCopy = {
  queue: {
    title: "Shifokor navbati",
    subtitle: "Ko‘rikni kutayotgan bemorlarni tartib bilan boshlash.",
    sectionTitle: "Kutayotgan bemorlar",
    sectionDescription: "Qabulxonadan shifokor navbatiga yuborilgan tashriflar.",
    emptyTitle: "Navbatda bemor yo‘q.",
    emptyDescription: "Yangi bemorlar navbatga qo‘yilganda shu yerda ko‘rinadi.",
  },
  active: {
    title: "Faol qabul",
    subtitle: "Hozir jarayonda bo‘lgan konsultatsiyalarni davom ettirish.",
    sectionTitle: "Faol konsultatsiyalar",
    sectionDescription: "Boshlangan va davom etayotgan shifokor qabul holatlari.",
    emptyTitle: "Faol konsultatsiya yo‘q.",
    emptyDescription: "Boshlangan qabul holatlari shu yerda ko‘rinadi.",
  },
  reviews: {
    title: "Review kerak",
    subtitle: "Natijalar chiqqan yoki qayta ko‘rish kerak bo‘lgan bemorlarni ko‘rib chiqish.",
    sectionTitle: "Review kutayotganlar",
    sectionDescription: "Laboratoriya/radiologiya natijasi yoki klinik review talab qiladigan holatlar.",
    emptyTitle: "Review kutayotgan holat yo‘q.",
    emptyDescription: "Natija review kerak bo‘lganda shu yerda chiqadi.",
  },
  completed: {
    title: "Bugun yakunlangan",
    subtitle: "Bugungi tugallangan konsultatsiya va tashriflarni ko‘rish.",
    sectionTitle: "Yakunlangan konsultatsiyalar",
    sectionDescription: "Bugun yakunlangan yoki yopishga tayyor bo‘lgan holatlar.",
    emptyTitle: "Bugun yakunlangan konsultatsiya yo‘q.",
    emptyDescription: "Tugallangan qabul holatlari shu yerda chiqadi.",
  },
};

export async function DoctorQueuePage({ mode }: DoctorQueuePageProps) {
  const workspace = await getDoctorWorkspace();
  const doctor = mockDoctors[0];
  const copy = pageCopy[mode];
  const items = getItemsForMode(workspace.queues, mode);

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-slate-100/80 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
      <div className="space-y-3">
        <WorkspaceHeader
          title={copy.title}
          subtitle={copy.subtitle}
          branch={mockBranches[0]}
          department={doctor.department}
          meta={[
            { label: "Shifokor", value: doctor.fullName },
            { label: "Bo‘lim", value: doctor.department?.name ?? "Bo‘lim yo‘q" },
            { label: "Holatlar", value: String(items.length) },
          ]}
          primaryAction={{ label: "Ish stoliga qaytish", href: "/app/doctor" }}
        />

        <SummaryStrip items={workspace.summary.map((item) => ({ ...item, label: localizeDoctorSummaryLabel(item.label) }))} />

        <QueueSection
          title={copy.sectionTitle}
          description={copy.sectionDescription}
          count={items.length}
          items={items}
          renderItem={(visit, index) => (
            <DoctorVisitRow
              queueLabel={copy.sectionTitle}
              queuePosition={index + 1}
              visit={visit}
            />
          )}
          emptyTitle={copy.emptyTitle}
          emptyDescription={copy.emptyDescription}
        />
      </div>
    </div>
  );
}

function getItemsForMode(
  queues: Awaited<ReturnType<typeof getDoctorWorkspace>>["queues"],
  mode: DoctorQueuePageProps["mode"],
): VisitListItem[] {
  if (mode === "queue") return queues.myQueue.items;
  if (mode === "active") return queues.activeEncounters.items;
  if (mode === "reviews") return queues.needsReview.items;
  return queues.completedToday.items;
}
