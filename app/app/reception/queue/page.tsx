import Link from "next/link";
import { WorkbenchListCard } from "@/components/workbench/workbench-list-card";
import { WorkbenchRowLimit } from "@/components/workbench/workbench-row-limit";
import { WorkbenchTableHeader, WorkbenchTableRow } from "@/components/workbench/workbench-table-row";
import { getReceptionQueueControl, getReceptionWalkInsWorkspace } from "@/lib/api/client";
import type { ReceptionDelayedCase, ReceptionQueueItem, ReceptionWalkInItem } from "@/lib/types/reception";

type ViewKey = "queue" | "walkins" | "delayed";

type Props = {
  searchParams?: Promise<{ view?: string }>;
};

export default async function ReceptionQueuePage({ searchParams }: Props) {
  const [resolvedSearchParams, queueData, walkIns] = await Promise.all([
    searchParams ?? Promise.resolve({} as { view?: string }),
    getReceptionQueueControl(),
    getReceptionWalkInsWorkspace(),
  ]);
  const view = normalizeView(resolvedSearchParams.view);
  const walkInItems = [...walkIns.queues.newWalkIns.items, ...walkIns.queues.waitingAssignment.items, ...walkIns.queues.assignedOrQueued.items];
  const delayedItems = queueData.rightPanel.delayedCases;
  const queueItems = queueData.queues.byWaitingTime.items;
  const count = view === "walkins" ? walkInItems.length : view === "delayed" ? delayedItems.length : queueItems.length;

  return (
    <div className="space-y-3">
      <PageNote
        text="Bu sahifa navbat control center: umumiy navbat, navbatsiz kelganlar va kechikkan SLA holatlari bitta joyda boshqariladi. Alohida sahifalar redirect qiladi, ish esa shu yerda tanlov orqali bajariladi."
      />
      <section className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_330px]">
        <main className="min-w-0">
          <WorkbenchListCard
            title="Navbat boshqaruvi"
            summary={`${count} holat / tanlangan operatsion ko'rinish`}
            selectedKey={view}
            selector={[
              { key: "queue", label: "Umumiy navbat", count: queueItems.length, href: "/app/reception/queue?view=queue" },
              { key: "walkins", label: "Navbatsizlar", count: walkInItems.length, href: "/app/reception/queue?view=walkins" },
              { key: "delayed", label: "Kechikkanlar", count: delayedItems.length, href: "/app/reception/queue?view=delayed" },
            ]}
            filters={view === "walkins" ? ["Ustuvorlik", "Bo'lim", "Shifokor yuklamasi", "Kutish"] : ["Shifokor", "Bo'lim", "SLA", "To'lov", "Ustuvorlik"]}
            fullListHref="/app/reception/queue"
            fullListLabel="Export"
            searchPlaceholder="Navbat ichida qidirish..."
          >
            <WorkbenchTableHeader />
            <WorkbenchRowLimit initialCount={12}>
              {view === "walkins"
                ? walkInItems.map((item) => <WalkInRow item={item} key={item.id} />)
                : view === "delayed"
                  ? delayedItems.map((item) => <DelayedRow item={item} key={item.id} />)
                  : queueItems.map((item) => <QueueRow item={item} key={item.id} />)}
            </WorkbenchRowLimit>
          </WorkbenchListCard>
        </main>
        <aside className="space-y-3">
          <Chart title="Navbat signallari" items={queueData.summary.map((item) => ({ label: localizeSummary(item.label), value: item.count, tone: item.tone, href: "/app/reception/queue" }))} />
          <Chart title="Navbatsiz oqim" items={[
            { label: "Yangi", value: walkIns.queues.newWalkIns.count, tone: "warning", href: "/app/reception/queue?view=walkins" },
            { label: "Biriktirish", value: walkIns.queues.waitingAssignment.count, tone: "warning", href: "/app/reception/queue?view=walkins" },
            { label: "Navbatda", value: walkIns.queues.assignedOrQueued.count, tone: "accent", href: "/app/reception/queue?view=walkins" },
          ]} />
          <Panel title="Tiqilishlar" href="/app/reception/queue?view=delayed">
            {queueData.rightPanel.bottlenecks.map((item) => <MiniItem key={item} title="Operatsion signal" meta={localizeBottleneck(item)} href="/app/reception/queue?view=delayed" />)}
          </Panel>
        </aside>
      </section>
    </div>
  );
}

function QueueRow({ item }: { item: ReceptionQueueItem }) {
  return (
    <WorkbenchTableRow
      title={item.patient.fullName}
      subtitle={[item.patient.patientCode, item.patient.phone].filter(Boolean).join(" / ")}
      href={`/app/visits/${item.id}`}
      reference={`${item.queueNumber ?? "-"} / ${item.visitCode}`}
      context={[item.department?.name, item.doctor?.fullName, item.reason].filter(Boolean).join(" / ")}
      primaryBadge={{ ...item.workflowBadge, label: localizeStatus(item.workflowBadge.label) }}
      secondaryBadge={item.invoiceBadge ? { ...item.invoiceBadge, label: localizeStatus(item.invoiceBadge.label) } : undefined}
      signals={[`${item.waitingMinutes ?? 0} daq`, slaLabel(item.slaState), priorityLabel(item.priority)]}
      nextAction={localizeAction(item.nextAction.label)}
      primaryAction={{ label: localizeAction(item.nextAction.cta), href: item.nextAction.targetRoute?.replace("[id]", item.id) ?? `/app/visits/${item.id}` }}
      secondaryActions={[{ label: "Tashrif", href: `/app/visits/${item.id}`, variant: "secondary" }, { label: "Bemor", href: `/app/patients/${item.patient.id}`, variant: "secondary" }]}
    />
  );
}

function WalkInRow({ item }: { item: ReceptionWalkInItem }) {
  return (
    <WorkbenchTableRow
      title={item.patient.fullName}
      subtitle={[item.patient.patientCode, item.patient.phone].filter(Boolean).join(" / ")}
      href={item.visit ? `/app/visits/${item.visit.id}` : "/app/reception/intake/new"}
      reference={item.visit?.visitCode ?? item.id}
      context={[item.requestedDepartment?.name, item.requestedDoctor?.fullName, item.reason].filter(Boolean).join(" / ")}
      primaryBadge={{ label: walkInStatus(item.status), tone: item.status === "cancelled" ? "danger" : item.status === "queued" ? "accent" : "warning" }}
      secondaryBadge={{ label: priorityLabel(item.priority), tone: item.priority === "emergency" ? "danger" : item.priority === "urgent" ? "warning" : "neutral" }}
      signals={[`${item.waitingMinutes} daq`, item.requestedDoctor?.fullName ?? "Shifokor yo'q", item.requestedDepartment?.name ?? "Bo'lim yo'q"]}
      nextAction={localizeAction(item.nextAction.label)}
      primaryAction={{ label: localizeAction(item.nextAction.cta), href: item.nextAction.targetRoute?.replace("[id]", item.visit?.id ?? "") }}
      secondaryActions={[{ label: "Yangi qabul", href: "/app/reception/intake/new", variant: "secondary" }, { label: "Umumiy navbat", href: "/app/reception/queue?view=queue", variant: "secondary" }]}
    />
  );
}

function DelayedRow({ item }: { item: ReceptionDelayedCase }) {
  const visit = item.visit;
  return (
    <WorkbenchTableRow
      title={visit.patient.fullName}
      subtitle={[visit.patient.patientCode, visit.patient.phone].filter(Boolean).join(" / ")}
      href={`/app/visits/${visit.id}`}
      reference={visit.visitCode}
      context={[formatDelayType(item.delayType), item.owner, visit.department?.name].filter(Boolean).join(" / ")}
      primaryBadge={{ label: item.severity === "critical" ? "Kritik" : "Ogoh", tone: item.severity === "critical" ? "danger" : "warning" }}
      secondaryBadge={{ ...visit.workflowBadge, label: localizeStatus(visit.workflowBadge.label) }}
      signals={[`${item.waitingMinutes} daq`, `SLA ${item.expectedMinutes} daq`, localizeOwner(item.owner)]}
      nextAction={localizeAction(item.nextAction.label)}
      primaryAction={{ label: localizeAction(item.nextAction.cta), href: item.nextAction.targetRoute?.replace("[id]", visit.id) ?? `/app/visits/${visit.id}` }}
      secondaryActions={[{ label: "Tashrif", href: `/app/visits/${visit.id}`, variant: "secondary" }, { label: "Umumiy navbat", href: "/app/reception/queue?view=queue", variant: "secondary" }]}
    />
  );
}

function PageNote({ text }: { text: string }) {
  return <div className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm leading-5 text-slate-600">{text}</div>;
}
function Chart({ title, items }: { title: string; items: { label: string; value: number; tone?: string; href: string }[] }) {
  const max = Math.max(...items.map((item) => item.value), 1);
  return <section className="rounded-md border border-slate-200 bg-white p-3"><h2 className="text-sm font-semibold text-slate-950">{title}</h2><div className="mt-2 space-y-2">{items.map((item) => <Link className="grid grid-cols-[86px_minmax(0,1fr)_28px] items-center gap-2 text-xs" href={item.href} key={item.label}><span className="truncate font-semibold text-slate-600">{item.label}</span><span className="h-2 rounded-full bg-slate-100"><span className={`block h-2 rounded-full ${toneClass(item.tone)}`} style={{ width: `${Math.max(8, Math.round((item.value / max) * 100))}%` }} /></span><span className="text-right font-mono font-semibold">{item.value}</span></Link>)}</div></section>;
}
function Panel({ title, href, children }: { title: string; href: string; children: React.ReactNode }) {
  return <section className="rounded-md border border-slate-200 bg-white p-3"><div className="flex items-center justify-between gap-2"><h2 className="text-sm font-semibold text-slate-950">{title}</h2><Link className="text-xs font-semibold text-teal-700" href={href}>Ochish</Link></div><div className="mt-2 divide-y divide-slate-100">{children}</div></section>;
}
function MiniItem({ title, meta, href }: { title: string; meta: string; href: string }) {
  return <Link className="block py-2 hover:bg-slate-50" href={href}><div className="truncate text-sm font-semibold text-slate-900">{title}</div><div className="truncate text-xs text-slate-500">{meta}</div></Link>;
}
function normalizeView(value?: string): ViewKey { if (value === "walkins" || value === "delayed") return value; return "queue"; }
function toneClass(tone?: string): string { if (tone === "danger") return "bg-red-600"; if (tone === "warning") return "bg-amber-500"; if (tone === "success") return "bg-emerald-600"; return "bg-teal-600"; }
function slaLabel(value?: ReceptionQueueItem["slaState"]): string { if (value === "breached") return "SLA buzilgan"; if (value === "warning") return "SLA ogoh"; return "SLA normal"; }
function priorityLabel(value?: ReceptionQueueItem["priority"] | ReceptionWalkInItem["priority"]): string { if (value === "emergency") return "Shoshilinch"; if (value === "urgent") return "Tezkor"; if (value === "vip") return "VIP"; return "Oddiy"; }
function walkInStatus(value: ReceptionWalkInItem["status"]): string { return ({ new: "Yangi", waiting_assignment: "Biriktirish kutmoqda", assigned: "Biriktirilgan", queued: "Navbatda", cancelled: "Bekor qilingan" } as Record<ReceptionWalkInItem["status"], string>)[value]; }
function formatDelayType(value: ReceptionDelayedCase["delayType"]): string { return ({ waiting_for_doctor: "Shifokor kutmoqda", lab_pending: "Lab kutmoqda", radiology_pending: "Radiologiya kutmoqda", billing_pending: "To'lov kutmoqda", paid_not_closed: "To'langan, yopilmagan", no_show_candidate: "No-show ehtimoli" } as Record<ReceptionDelayedCase["delayType"], string>)[value]; }
function localizeSummary(value: string): string { return ({ "Priority cases": "Ustuvor", "Waiting > 30m": "30m+", "Billing / closing": "To'lov", Unresolved: "Ochiq" } as Record<string, string>)[value] ?? value; }
function localizeBottleneck(value: string): string { return ({ "Cardiology queue exceeds 30 minutes.": "Kardiologiya navbati 30 daqiqadan oshgan.", "Two paid visits are not closed.": "Ikkita to'langan tashrif yopilmagan.", "Lab pending cases need ownership confirmation.": "Lab holatlarida mas'ul tasdiqlanishi kerak." } as Record<string, string>)[value] ?? value; }
function localizeOwner(value: string): string { return ({ Doctor: "Shifokor", Laboratory: "Laboratoriya", Radiology: "Radiologiya", Cashier: "Kassa", Reception: "Qabulxona" } as Record<string, string>)[value] ?? value; }
function localizeStatus(value?: string): string {
  const labels: Record<string, string> = {
    "Intake created": "Qabul yaratildi",
    "Doctor assigned": "Shifokor biriktirildi",
    "Queued for doctor": "Shifokor navbatida",
    "With doctor": "Shifokorda",
    "Awaiting lab": "Lab kutmoqda",
    "Lab in progress": "Lab jarayonda",
    "Awaiting radiology": "Radiologiya kutmoqda",
    "Radiology in progress": "Radiologiya jarayonda",
    "Awaiting doctor review": "Shifokor review kutmoqda",
    "Consultation completed": "Konsultatsiya tugadi",
    "Billing pending": "To'lov kutilmoqda",
    "Partially paid": "Qisman to'langan",
    Paid: "To'langan",
    Completed: "Yakunlangan",
    Cancelled: "Bekor qilingan",
  };
  return value ? labels[value] ?? value : "";
}
function localizeAction(value?: string): string {
  const labels: Record<string, string> = { "Open visit": "Tashrifni ochish", Open: "Ochish", View: "Ko'rish", "Assign doctor": "Shifokor biriktirish", "Queue patient": "Navbatga qo'yish", "Create visit": "Tashrif yaratish", "Review result": "Natijani ko'rish" };
  return value ? labels[value] ?? localizeStatus(value) : "";
}
