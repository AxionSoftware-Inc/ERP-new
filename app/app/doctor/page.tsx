import Link from "next/link";
import { WorkbenchListCard } from "@/components/workbench/workbench-list-card";
import { WorkbenchRowLimit } from "@/components/workbench/workbench-row-limit";
import { WorkbenchTableHeader, WorkbenchTableRow } from "@/components/workbench/workbench-table-row";
import { getDoctorModuleWorkspace } from "@/lib/api/client";
import type { DoctorCompletedItem, DoctorReviewItem, DoctorScheduleItem, DoctorWorkItem } from "@/lib/types/doctor";
import type { StatusBadgeData } from "@/lib/types/shared";

type QueueKey = "queue" | "active" | "reviews" | "completed";

type Props = {
  searchParams?: Promise<{ view?: string }>;
};

export default async function DoctorWorkspacePage({ searchParams }: Props) {
  const [resolvedSearchParams, workspace] = await Promise.all([
    searchParams ?? Promise.resolve({} as { view?: string }),
    getDoctorModuleWorkspace(),
  ]);
  const defaultKey: QueueKey = workspace.queues.needsReview.length ? "reviews" : "queue";
  const selectedKey = normalizeQueueKey(resolvedSearchParams.view, defaultKey);
  const expandedQueues = {
    myQueue: expandWorkItems(workspace.queues.myQueue, 24),
    activeEncounters: expandWorkItems(workspace.queues.activeEncounters, 24),
    needsReview: expandReviewItems(workspace.queues.needsReview, 24),
    completedToday: expandCompletedItems(workspace.queues.completedToday, 24),
  };
  const selectedItems = getSelectedItems(selectedKey, expandedQueues);
  const urgentCount = workspace.rightRail.urgentCases.length + expandedQueues.needsReview.filter((item) => item.flag === "critical").length;

  return (
    <div>
      <section className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_330px]">
        <main className="min-w-0">
          <WorkbenchListCard
            title="Clinical Workbench"
            summary={`${selectedItems.length} holat / avval 8 qator ko'rinadi`}
            selectedKey={selectedKey}
            selector={[
              { key: "queue", label: "Navbatim", count: expandedQueues.myQueue.length, href: "/app/doctor?view=queue" },
              { key: "active", label: "Aktiv", count: expandedQueues.activeEncounters.length, href: "/app/doctor?view=active" },
              { key: "reviews", label: "Reviews", count: expandedQueues.needsReview.length, href: "/app/doctor?view=reviews" },
              { key: "completed", label: "Yakunlangan", count: expandedQueues.completedToday.length, href: "/app/doctor?view=completed" },
            ]}
            filters={["Ustuvorlik", "Bo'lim", "Natija yoshi", "Holat"]}
            fullListHref={fullListHref(selectedKey)}
            fullListLabel="To'liq ro'yxat"
            searchPlaceholder="Klinik list ichida qidirish..."
          >
            {selectedItems.length ? (
              <>
                <WorkbenchTableHeader />
                <WorkbenchRowLimit initialCount={8}>
                  {selectedItems.map((item) => (
                    <DoctorWorkbenchRow item={item} key={item.id} />
                  ))}
                </WorkbenchRowLimit>
              </>
            ) : (
              <div className="border-t border-slate-100 px-3 py-8 text-center text-sm text-slate-500">Bu klinik ko&apos;rinishda ochiq holat yo&apos;q.</div>
            )}
          </WorkbenchListCard>
        </main>

        <aside className="space-y-3">
          <DoctorFlowPanel
            items={[
              { label: "Kutayotgan", value: expandedQueues.myQueue.length, href: "/app/doctor?view=queue", tone: "warning" },
              { label: "Aktiv", value: expandedQueues.activeEncounters.length, href: "/app/doctor?view=active", tone: "accent" },
              { label: "Review", value: expandedQueues.needsReview.length, href: "/app/doctor?view=reviews", tone: "warning" },
              { label: "Urgent", value: urgentCount, href: "/app/doctor/reviews", tone: urgentCount ? "danger" : "neutral" },
              { label: "Yakunlangan", value: expandedQueues.completedToday.length, href: "/app/doctor?view=completed", tone: "success" },
            ]}
          />
          <TodaySchedulePanel items={workspace.rightRail.todaySchedule} />
          <ResultsPanel items={workspace.rightRail.recentResults} />
          <DoctorControlPanel accepting={workspace.rightRail.controls.acceptingPatients} room={workspace.rightRail.controls.currentRoom} tasks={workspace.rightRail.controls.unreadTasks} />
          <ClinicalTasksPanel />
          <SafetyPanel />
          <ShortcutPanel />
        </aside>
      </section>
    </div>
  );
}

function DoctorWorkbenchRow({ item }: { item: DoctorWorkItem | DoctorReviewItem | DoctorCompletedItem }) {
  if ("serviceName" in item) {
    return (
      <WorkbenchTableRow
        title={item.patient.fullName}
        subtitle={item.sourceCode}
        href={`/app/doctor/visits/${item.visitId}/results`}
        reference={item.visitCode}
        context={`${item.resultType} / ${item.serviceName}`}
        primaryBadge={flagBadge(item.flag)}
        signals={[`${item.delayedMinutes} daq`, item.reviewed ? "Ko'rilgan" : "Ochiq", item.sourceCode]}
        nextAction={localizeAction(item.nextAction.label)}
        primaryAction={{ label: localizeAction(item.nextAction.cta), href: item.nextAction.targetRoute }}
        secondaryActions={[{ label: "Tashrif", href: `/app/doctor/visits/${item.visitId}`, variant: "secondary" }]}
      />
    );
  }

  if ("billingStatus" in item) {
    return (
      <WorkbenchTableRow
        title={item.patient.fullName}
        subtitle={item.diagnosisText ?? "Klinik xulosa"}
        href={`/app/doctor/visits/${item.visitId}`}
        reference={item.visitCode}
        context={`To'lov: ${item.billingStatus ?? "yo'q"}`}
        primaryBadge={{ label: "Yakunlangan", tone: "success" }}
        signals={[formatTime(item.completedAt), item.prescriptionExists ? "Retsept bor" : "Retsept yo'q", `${item.documentCount} hujjat`]}
        nextAction={localizeAction(item.nextAction.label)}
        primaryAction={{ label: localizeAction(item.nextAction.cta), href: item.nextAction.targetRoute }}
        secondaryActions={[{ label: "Bemor", href: `/app/patients/${item.patient.id}`, variant: "secondary" }]}
      />
    );
  }

  if ("pendingOrdersCount" in item) {
    return (
      <WorkbenchTableRow
        title={item.patient.fullName}
        subtitle={item.chiefComplaint ?? item.reason ?? "Klinik holat"}
        href={`/app/doctor/visits/${item.visitId}`}
        reference={item.visitCode}
        context={[item.department?.name, item.queueNumber, item.reason].filter(Boolean).join(" / ")}
        primaryBadge={localizeStatusBadge(item.workflowBadge)}
        secondaryBadge={localizeStatusBadge(item.consultationBadge)}
        signals={[`${item.waitingMinutes} daq`, priorityLabel(item.priority), `${item.pendingResultsCount} natija`]}
        nextAction={localizeAction(item.nextAction.label)}
        primaryAction={{ label: localizeAction(item.nextAction.cta), href: item.nextAction.targetRoute }}
        secondaryActions={[{ label: "Tashrif", href: `/app/doctor/visits/${item.visitId}`, variant: "secondary" }, { label: "Bemor", href: `/app/patients/${item.patient.id}`, variant: "secondary" }]}
      />
    );
  }

  return null;
}

function DoctorFlowPanel({ items }: { items: { label: string; value: number; href: string; tone: string }[] }) {
  const max = Math.max(...items.map((item) => item.value), 1);
  return (
    <section className="rounded-md border border-slate-200 bg-white p-3">
      <h2 className="text-sm font-semibold text-slate-950">Klinik oqim</h2>
      <div className="mt-2 space-y-2">
        {items.map((item) => (
          <Link className="grid grid-cols-[82px_minmax(0,1fr)_28px] items-center gap-2 text-xs hover:bg-slate-50" href={item.href} key={item.label}>
            <span className="truncate font-semibold text-slate-600">{item.label}</span>
            <span className="h-2 rounded-full bg-slate-100"><span className={`block h-2 rounded-full ${flowTone(item.tone)}`} style={{ width: `${Math.max(8, Math.round((item.value / max) * 100))}%` }} /></span>
            <span className="text-right font-mono font-semibold text-slate-800">{item.value}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function TodaySchedulePanel({ items }: { items: DoctorScheduleItem[] }) {
  return (
    <section className="rounded-md border border-slate-200 bg-white p-3">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-slate-950">Bugungi jadval</h2>
        <Link className="text-xs font-semibold text-teal-700" href="/app/doctor/schedule">Hammasi</Link>
      </div>
      <div className="mt-2 divide-y divide-slate-100">
        {items.slice(0, 5).map((item) => (
          <Link className="grid grid-cols-[42px_minmax(0,1fr)_auto] items-center gap-2 py-2 hover:bg-slate-50" href={item.appointment.nextAction.targetRoute ?? "/app/doctor/schedule"} key={item.id}>
            <span className="font-mono text-xs font-semibold text-slate-700">{formatTime(item.appointment.scheduledStart)}</span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-slate-900">{item.appointment.patient.fullName}</span>
              <span className="block truncate text-xs text-slate-500">{item.room ?? item.appointment.department.name}</span>
            </span>
            <span className="text-xs font-semibold text-slate-500">{availabilityLabel(item.availabilityStatus)}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ResultsPanel({ items }: { items: DoctorReviewItem[] }) {
  return (
    <section className="rounded-md border border-slate-200 bg-white p-3">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-slate-950">Kritik / yangi natijalar</h2>
        <Link className="text-xs font-semibold text-teal-700" href="/app/doctor/reviews">Review</Link>
      </div>
      <div className="mt-2 divide-y divide-slate-100">
        {items.slice(0, 4).map((item) => (
          <Link className="block py-2 hover:bg-slate-50" href={item.nextAction.targetRoute ?? "/app/doctor/reviews"} key={item.id}>
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-sm font-semibold text-slate-900">{item.patient.fullName}</span>
              <span className={item.flag === "critical" ? "text-xs font-semibold text-red-700" : "text-xs font-semibold text-amber-700"}>{flagLabel(item.flag)}</span>
            </div>
            <div className="truncate text-xs text-slate-500">{item.sourceCode} / {item.serviceName}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function DoctorControlPanel({ accepting, room, tasks }: { accepting: boolean; room?: string | null; tasks: number }) {
  const lines = [
    ["Bemor qabul qiladi", accepting ? "Ha" : "Yo'q"],
    ["Xona", room ?? "Belgilanmagan"],
    ["O'qilmagan vazifa", String(tasks)],
  ];
  return (
    <section className="rounded-md border border-slate-200 bg-white p-3">
      <h2 className="text-sm font-semibold text-slate-950">Shifokor nazorati</h2>
      <div className="mt-2 divide-y divide-slate-100">
        {lines.map(([label, value]) => (
          <div className="flex items-center justify-between gap-2 py-2 text-sm" key={label}>
            <span className="text-xs font-semibold text-slate-500">{label}</span>
            <span className="font-semibold text-slate-900">{value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ShortcutPanel() {
  const shortcuts = [
    { label: "Shablonlar", href: "/app/doctor/templates" },
    { label: "Klinik tarix", href: "/app/doctor/clinical-history" },
    { label: "Review", href: "/app/doctor/reviews" },
    { label: "Yakunlangan", href: "/app/doctor/completed" },
  ];
  return (
    <section className="rounded-md border border-slate-200 bg-white p-3">
      <h2 className="text-sm font-semibold text-slate-950">Shablon / tarix</h2>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {shortcuts.map((item) => (
          <Link className="rounded-md border border-slate-200 bg-slate-50 px-2 py-2 text-center text-xs font-semibold text-slate-700 hover:border-teal-200 hover:bg-white" href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  );
}

function ClinicalTasksPanel() {
  const tasks = [
    ["Imzosiz retsept", "3"],
    ["Draft note", "6"],
    ["Order javobi", "8"],
    ["Hujjat chiqarish", "4"],
  ];
  return (
    <section className="rounded-md border border-slate-200 bg-white p-3">
      <h2 className="text-sm font-semibold text-slate-950">Klinik vazifalar</h2>
      <div className="mt-2 divide-y divide-slate-100">
        {tasks.map(([label, value]) => (
          <div className="flex items-center justify-between gap-2 py-2 text-sm" key={label}>
            <span className="text-xs font-semibold text-slate-500">{label}</span>
            <span className="font-mono font-semibold text-slate-900">{value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function SafetyPanel() {
  const items = [
    ["Allergiya", "2 bemor"],
    ["Surunkali kasallik", "7 bemor"],
    ["Kritik natija", "1 bemor"],
    ["Qayta ko'rik", "5 bemor"],
  ];
  return (
    <section className="rounded-md border border-slate-200 bg-white p-3">
      <h2 className="text-sm font-semibold text-slate-950">Bemor xavfsizligi</h2>
      <div className="mt-2 divide-y divide-slate-100">
        {items.map(([label, value]) => (
          <Link className="flex items-center justify-between gap-2 py-2 text-sm hover:bg-slate-50" href="/app/doctor/clinical-history" key={label}>
            <span className="text-xs font-semibold text-slate-500">{label}</span>
            <span className="font-semibold text-slate-900">{value}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function getSelectedItems(
  key: QueueKey,
  queues: {
    myQueue: DoctorWorkItem[];
    activeEncounters: DoctorWorkItem[];
    needsReview: DoctorReviewItem[];
    completedToday: DoctorCompletedItem[];
  },
) {
  if (key === "active") return queues.activeEncounters;
  if (key === "reviews") return queues.needsReview;
  if (key === "completed") return queues.completedToday;
  return queues.myQueue;
}

function normalizeQueueKey(value: string | undefined, fallback: QueueKey): QueueKey {
  if (value === "queue" || value === "active" || value === "reviews" || value === "completed") return value;
  return fallback;
}

function fullListHref(key: QueueKey): string {
  if (key === "active") return "/app/doctor/active";
  if (key === "reviews") return "/app/doctor/reviews";
  if (key === "completed") return "/app/doctor/completed";
  return "/app/doctor/queue";
}

function expandWorkItems(items: DoctorWorkItem[], target: number): DoctorWorkItem[] {
  if (!items.length) return [];
  return Array.from({ length: target }, (_, index) => {
    const item = items[index % items.length];
    const priority = (["routine", "urgent", "stat"] as const)[index % 3];
    return {
      ...item,
      id: `${item.id}-demo-${index + 1}`,
      queueNumber: item.queueNumber ? `D-${String(index + 1).padStart(3, "0")}` : item.queueNumber,
      waitingMinutes: item.waitingMinutes + index * 3,
      visitAgeMinutes: item.visitAgeMinutes + index * 5,
      pendingOrdersCount: (item.pendingOrdersCount + index) % 5,
      pendingResultsCount: (item.pendingResultsCount + index) % 4,
      priority,
    };
  });
}

function expandReviewItems(items: DoctorReviewItem[], target: number): DoctorReviewItem[] {
  if (!items.length) return [];
  return Array.from({ length: target }, (_, index) => {
    const item = items[index % items.length];
    const flag = (["critical", "abnormal", "normal"] as const)[index % 3];
    const resultType = (["lab", "radiology", "procedure"] as const)[index % 3];
    return {
      ...item,
      id: `${item.id}-demo-${index + 1}`,
      sourceCode: `${resultType.toUpperCase()}-${String(index + 1).padStart(4, "0")}`,
      flag,
      resultType,
      delayedMinutes: item.delayedMinutes + index * 4,
      reviewed: index % 5 === 0,
    };
  });
}

function expandCompletedItems(items: DoctorCompletedItem[], target: number): DoctorCompletedItem[] {
  if (!items.length) return [];
  return Array.from({ length: target }, (_, index) => {
    const item = items[index % items.length];
    return {
      ...item,
      id: `${item.id}-demo-${index + 1}`,
      billingStatus: (["paid", "billing_pending", "partially_paid"] as const)[index % 3],
      prescriptionExists: index % 2 === 0,
      documentCount: (item.documentCount + index) % 6,
    };
  });
}

function flagBadge(flag: DoctorReviewItem["flag"]): StatusBadgeData {
  if (flag === "critical") return { label: "Kritik", tone: "danger" };
  if (flag === "abnormal") return { label: "Normadan tashqari", tone: "warning" };
  return { label: "Normal", tone: "neutral" };
}

function localizeStatusBadge(badge: StatusBadgeData): StatusBadgeData {
  const labels: Record<string, string> = {
    "Queued for doctor": "Kutmoqda",
    "With doctor": "Shifokorda",
    "Awaiting doctor review": "Review",
    "Not started": "Boshlanmagan",
    "In progress": "Jarayonda",
    "Waiting for results": "Natija kutmoqda",
    "Reviewing results": "Review qilinmoqda",
    Completed: "Yakunlangan",
  };
  return { ...badge, label: labels[badge.label] ?? badge.label };
}

function priorityLabel(priority: DoctorWorkItem["priority"]): string {
  if (priority === "stat") return "STAT";
  if (priority === "urgent") return "Tezkor";
  return "Oddiy";
}

function localizeAction(value?: string): string {
  const labels: Record<string, string> = { "Start consultation": "Konsultatsiyani boshlash", Start: "Boshlash", "Continue consultation": "Davom ettirish", Continue: "Davom", "Review result": "Natijani ko'rish", Review: "Review", View: "Ko'rish", Open: "Ochish" };
  return value ? labels[value] ?? value : "";
}
function flagLabel(value: DoctorReviewItem["flag"]): string { if (value === "critical") return "Kritik"; if (value === "abnormal") return "Normadan tashqari"; return "Normal"; }
function availabilityLabel(value: DoctorScheduleItem["availabilityStatus"]): string { return ({ available: "Bo'sh", busy: "Band", break: "Tanaffus", cancelled: "Bekor", no_show: "No-show" } as Record<DoctorScheduleItem["availabilityStatus"], string>)[value]; }
function flowTone(tone: string): string { if (tone === "danger") return "bg-red-600"; if (tone === "warning") return "bg-amber-500"; if (tone === "success") return "bg-emerald-600"; if (tone === "accent") return "bg-teal-600"; return "bg-slate-300"; }

function formatTime(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("uz-UZ", { hour: "2-digit", minute: "2-digit" }).format(date);
}
