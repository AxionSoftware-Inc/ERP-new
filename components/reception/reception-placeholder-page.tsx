import Link from "next/link";
import type { ReactNode } from "react";

export type ReceptionPreviewMetric = {
  label: string;
  value: string | number;
  tone?: "neutral" | "info" | "warning" | "success" | "danger" | "accent";
};

export type ReceptionPreviewSection = {
  title: string;
  description?: string;
  children: ReactNode;
};

export type ReceptionPlaceholderPageProps = {
  title: string;
  route: string;
  purpose: string;
  pageType: string;
  status?: string;
  primaryActionLabel?: string;
  sections: ReceptionPreviewSection[];
  metrics?: ReceptionPreviewMetric[];
};

export function ReceptionPlaceholderPage({
  title,
  route,
  purpose,
  pageType,
  status = "Qabulxona moduli placeholder",
  primaryActionLabel = "Keyingi bosqichda",
  sections,
  metrics = [],
}: ReceptionPlaceholderPageProps) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-slate-100/80 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
      <div className="space-y-3">
        <header className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-[0_1px_2px_rgba(15,23,42,0.05)]">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <Link
                className="text-xs font-semibold text-slate-500 hover:text-slate-900"
                href="/app/reception"
              >
                Qabulxona umumiy sahifasiga qaytish
              </Link>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-slate-950">{title}</h1>
                <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-800">
                  {status}
                </span>
              </div>
              <p className="mt-1 max-w-3xl text-sm text-slate-500">{purpose}</p>
            </div>
            <button
              className="inline-flex h-9 cursor-not-allowed items-center rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-400"
              disabled
              type="button"
            >
              {primaryActionLabel}
            </button>
          </div>

          <dl className="mt-3 grid gap-2 md:grid-cols-3">
            <HeaderFact label="Route" value={route} mono />
            <HeaderFact label="Sahifa turi" value={pageType} />
            <HeaderFact label="Joriy holat" value={status} />
          </dl>
        </header>

        {metrics.length ? (
          <section className="grid gap-2 md:grid-cols-4">
            {metrics.map((metric) => (
              <div
                className={[
                  "rounded-xl border px-3 py-2 shadow-[0_1px_1px_rgba(15,23,42,0.04)]",
                  getMetricToneClass(metric.tone ?? "neutral"),
                ].join(" ")}
                key={metric.label}
              >
                <div className="text-[10.5px] font-semibold uppercase tracking-wide opacity-70">
                  {metric.label}
                </div>
                <div className="mt-1 text-xl font-bold">{metric.value}</div>
              </div>
            ))}
          </section>
        ) : null}

        <main className="grid gap-3 xl:grid-cols-2">
          {sections.map((section) => (
            <section
              className="rounded-xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.05)]"
              key={section.title}
            >
              <div className="border-b border-slate-200 bg-slate-50 px-3 py-2">
                <h2 className="text-sm font-semibold text-slate-950">{section.title}</h2>
                {section.description ? (
                  <p className="mt-0.5 text-xs text-slate-500">{section.description}</p>
                ) : null}
              </div>
              <div className="space-y-2 p-3">{section.children}</div>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}

export function ReceptionPreviewCard({
  title,
  description,
  meta,
  tone = "neutral",
}: {
  title: string;
  description: string;
  meta?: string;
  tone?: "neutral" | "warning" | "danger" | "success" | "info";
}) {
  return (
    <div className={["rounded-xl border px-3 py-2", getPreviewToneClass(tone)].join(" ")}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-slate-950">{title}</h3>
          <p className="mt-0.5 text-xs leading-5 text-slate-600">{description}</p>
        </div>
        {meta ? (
          <span className="shrink-0 rounded-full border border-white/70 bg-white px-2 py-0.5 text-xs font-semibold text-slate-700">
            {meta}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function HeaderFact({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
      <dt className="text-[10.5px] font-semibold uppercase tracking-wide text-slate-400">{label}</dt>
      <dd className={["mt-0.5 truncate text-sm font-semibold text-slate-800", mono ? "font-mono" : ""].join(" ")}>
        {value}
      </dd>
    </div>
  );
}

function getMetricToneClass(tone: ReceptionPreviewMetric["tone"]): string {
  if (tone === "info") return "border-sky-200 bg-sky-50 text-sky-950";
  if (tone === "warning") return "border-amber-200 bg-amber-50 text-amber-950";
  if (tone === "success") return "border-emerald-200 bg-emerald-50 text-emerald-950";
  if (tone === "danger") return "border-red-200 bg-red-50 text-red-950";
  if (tone === "accent") return "border-teal-200 bg-teal-50 text-teal-950";
  return "border-slate-200 bg-white text-slate-950";
}

function getPreviewToneClass(tone: "neutral" | "warning" | "danger" | "success" | "info"): string {
  if (tone === "info") return "border-sky-100 bg-sky-50/70";
  if (tone === "warning") return "border-amber-100 bg-amber-50/70";
  if (tone === "success") return "border-emerald-100 bg-emerald-50/70";
  if (tone === "danger") return "border-red-100 bg-red-50/70";
  return "border-slate-200 bg-white";
}
