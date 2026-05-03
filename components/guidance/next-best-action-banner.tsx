import Link from "next/link";

export type GuidanceSeverity = "normal" | "warning" | "critical";

export type NextBestActionBannerProps = {
  eyebrow?: string;
  title: string;
  description: string;
  severity?: GuidanceSeverity;
  primaryAction: {
    label: string;
    href: string;
  };
  secondaryActions?: {
    label: string;
    href: string;
  }[];
  meta?: {
    label: string;
    value: string;
  }[];
};

const severityClass: Record<GuidanceSeverity, string> = {
  normal: "border-teal-200 bg-teal-50/80 text-teal-950",
  warning: "border-amber-200 bg-amber-50 text-amber-950",
  critical: "border-red-200 bg-red-50 text-red-950",
};

const ctaClass: Record<GuidanceSeverity, string> = {
  normal: "border-teal-700 bg-teal-700 text-white hover:bg-teal-800",
  warning: "border-amber-700 bg-amber-700 text-white hover:bg-amber-800",
  critical: "border-red-700 bg-red-700 text-white hover:bg-red-800",
};

export function NextBestActionBanner({
  eyebrow = "Next best action",
  title,
  description,
  severity = "normal",
  primaryAction,
  secondaryActions = [],
  meta = [],
}: NextBestActionBannerProps) {
  return (
    <section className={["rounded-md border p-3 shadow-[0_1px_2px_rgba(15,23,42,0.05)]", severityClass[severity]].join(" ")}>
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div className="min-w-0">
          <div className="text-[11px] font-semibold uppercase tracking-normal opacity-75">{eyebrow}</div>
          <h2 className="mt-1 text-lg font-semibold leading-6">{title}</h2>
          <p className="mt-1 max-w-4xl text-sm leading-5 opacity-80">{description}</p>
          {meta.length ? (
            <dl className="mt-2 flex flex-wrap gap-1.5">
              {meta.map((item) => (
                <div className="rounded-md border border-white/70 bg-white/70 px-2 py-1 text-xs" key={`${item.label}-${item.value}`}>
                  <dt className="inline font-semibold opacity-70">{item.label}: </dt>
                  <dd className="inline font-semibold">{item.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-1.5 lg:justify-end">
          {secondaryActions.slice(0, 2).map((action) => (
            <Link
              className="inline-flex h-9 items-center justify-center rounded-md border border-white/80 bg-white/70 px-3 text-sm font-semibold hover:bg-white"
              href={action.href}
              key={action.href}
            >
              {action.label}
            </Link>
          ))}
          <Link
            className={["inline-flex h-9 items-center justify-center rounded-md border px-4 text-sm font-semibold shadow-[0_1px_2px_rgba(15,23,42,0.14)]", ctaClass[severity]].join(" ")}
            href={primaryAction.href}
          >
            {primaryAction.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
