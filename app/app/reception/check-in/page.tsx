import Link from "next/link";
import { WorkbenchListCard } from "@/components/workbench/workbench-list-card";
import { WorkbenchRowLimit } from "@/components/workbench/workbench-row-limit";
import { WorkbenchTableHeader, WorkbenchTableRow } from "@/components/workbench/workbench-table-row";
import { getReceptionCheckInWorkspace } from "@/lib/api/client";
import type { ReceptionCheckInItem } from "@/lib/types/reception";

export default async function ReceptionCheckInPage() {
  const workspace = await getReceptionCheckInWorkspace();
  const items = [...workspace.queues.arrived.items, ...workspace.queues.lateOrNoShow.items, ...workspace.queues.scheduled.items, ...workspace.queues.checkedIn.items];

  return (
    <div className="space-y-3">
      <PageNote text="Bu sahifa rejalashtirilgan qabullarni kelgan bemorga aylantirish uchun: kelgan deb belgilash, check-in qilish, kechikkanlarni nazorat qilish va kerak bo'lsa tashrif yaratish." />
      <section className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_330px]">
      <main className="min-w-0">
        <WorkbenchListCard
          title="Check-in"
          summary={`${items.length} appointment / kelganlar va kechikkanlar birinchi`}
          selectedKey="all"
          selector={[
            { key: "all", label: "Barchasi", count: items.length, href: "/app/reception/check-in" },
            { key: "arrived", label: "Kelgan", count: workspace.queues.arrived.count, href: "/app/reception/check-in" },
            { key: "late", label: "Kechikkan", count: workspace.queues.lateOrNoShow.count, href: "/app/reception/check-in" },
            { key: "checked", label: "Check-in", count: workspace.queues.checkedIn.count, href: "/app/reception/check-in" },
          ]}
          filters={["Doctor", "Time", "Arrival", "No-show"]}
          fullListHref="/app/reception/check-in"
          fullListLabel="Yangilash"
          searchPlaceholder="Appointment yoki bemor..."
        >
          <WorkbenchTableHeader />
          <WorkbenchRowLimit initialCount={12}>
            {items.map((item) => <CheckInRow item={item} key={item.id} />)}
          </WorkbenchRowLimit>
        </WorkbenchListCard>
      </main>
      <aside className="space-y-3">
        <MetricBars items={workspace.summary.map((item) => ({ label: localize(item.label), value: item.count, href: "/app/reception/check-in", tone: item.tone }))} title="Kunlik check-in" />
        <Panel title="Keyingi soat" href="/app/reception/check-in">
          {workspace.rightPanel.upcomingNextHour.slice(0, 5).map((item) => <MiniItem key={item.id} title={item.patient.fullName} meta={`${formatTime(item.scheduledStart)} / ${item.doctor.fullName}`} href={`/app/appointments/${item.id}`} />)}
        </Panel>
      </aside>
      </section>
    </div>
  );
}

function PageNote({ text }: { text: string }) {
  return <div className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm leading-5 text-slate-600">{text}</div>;
}

function CheckInRow({ item }: { item: ReceptionCheckInItem }) {
  const action = item.nextActions[0] ?? item.nextAction;
  return (
    <WorkbenchTableRow
      title={item.patient.fullName}
      subtitle={[item.patient.patientCode, item.patient.phone].filter(Boolean).join(" / ")}
      href={`/app/appointments/${item.id}`}
      reference={item.appointmentCode}
      context={`${formatTime(item.scheduledStart)} / ${item.doctor.fullName}`}
      primaryBadge={{ ...item.statusBadge, label: localize(item.statusBadge.label) }}
      secondaryBadge={item.lateMinutes ? { label: `${item.lateMinutes} daq kech`, tone: "warning" } : undefined}
      signals={[item.department.name, arrivalLabel(item.arrivalState), item.linkedVisit?.visitCode ?? "Tashrif yo'q"]}
      nextAction={localize(action.label)}
      primaryAction={{ label: localize(action.cta), href: action.targetRoute }}
      secondaryActions={[{ label: "Qabul", href: `/app/appointments/${item.id}`, variant: "secondary" }, { label: "Qabul yaratish", href: "/app/reception/intake/new", variant: "secondary" }]}
    />
  );
}

function MetricBars({ title, items }: { title: string; items: { label: string; value: number; href: string; tone?: string }[] }) {
  const max = Math.max(...items.map((item) => item.value), 1);
  return <section className="rounded-md border border-slate-200 bg-white p-3"><h2 className="text-sm font-semibold text-slate-950">{title}</h2><div className="mt-2 space-y-2">{items.map((item) => <Link className="grid grid-cols-[86px_minmax(0,1fr)_28px] items-center gap-2 text-xs" href={item.href} key={item.label}><span className="truncate font-semibold text-slate-600">{item.label}</span><span className="h-2 rounded-full bg-slate-100"><span className="block h-2 rounded-full bg-teal-600" style={{ width: `${Math.max(8, Math.round((item.value / max) * 100))}%` }} /></span><span className="text-right font-mono font-semibold">{item.value}</span></Link>)}</div></section>;
}

function Panel({ title, href, children }: { title: string; href: string; children: React.ReactNode }) {
  return <section className="rounded-md border border-slate-200 bg-white p-3"><div className="flex items-center justify-between gap-2"><h2 className="text-sm font-semibold text-slate-950">{title}</h2><Link className="text-xs font-semibold text-teal-700" href={href}>Ochish</Link></div><div className="mt-2 divide-y divide-slate-100">{children}</div></section>;
}
function MiniItem({ title, meta, href }: { title: string; meta: string; href: string }) {
  return <Link className="block py-2 hover:bg-slate-50" href={href}><div className="truncate text-sm font-semibold text-slate-900">{title}</div><div className="truncate text-xs text-slate-500">{meta}</div></Link>;
}
function formatTime(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("uz-UZ", { hour: "2-digit", minute: "2-digit" }).format(date);
}
function arrivalLabel(value: ReceptionCheckInItem["arrivalState"]): string {
  return ({ not_arrived: "Kelmagan", arrived: "Kelgan", late: "Kechikkan", checked_in: "Check-in qilingan", no_show_candidate: "No-show ehtimoli" } as Record<ReceptionCheckInItem["arrivalState"], string>)[value];
}
function localize(value?: string): string {
  const labels: Record<string, string> = { Arrived: "Kelgan", Confirmed: "Tasdiq", Scheduled: "Reja", "Scheduled today": "Bugungi reja", "Checked in": "Check-in", Late: "Kechikkan", "Check in patient": "Check-in qilish", "Check in": "Check-in", "Convert to visit": "Tashrifga aylantirish", "Create visit": "Tashrif" };
  return value ? labels[value] ?? value : "";
}
