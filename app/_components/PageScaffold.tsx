import Link from "next/link";

export type Metric = {
  label: string;
  value: string;
  tone?: "neutral" | "good" | "warning" | "danger";
};

export type PageConfig = {
  title: string;
  description: string;
  primaryAction?: string;
  primaryHref?: string;
  metrics?: Metric[];
  sections?: string[];
  tableTitle?: string;
  tableColumns?: string[];
};

const toneClass: Record<NonNullable<Metric["tone"]>, string> = {
  neutral: "metric-neutral",
  good: "metric-good",
  warning: "metric-warning",
  danger: "metric-danger",
};

export function PageScaffold({ config }: { config: PageConfig }) {
  const metrics = config.metrics ?? [
    { label: "Aktiv yozuvlar", value: "24", tone: "neutral" },
    { label: "Bugungi jarayonlar", value: "18", tone: "good" },
    { label: "E'tibor kerak", value: "3", tone: "warning" },
  ];

  const columns = config.tableColumns ?? ["Nomi", "Status", "Mas'ul", "Oxirgi o'zgarish"];

  return (
    <div className="page-stack">
      <section className="page-header">
        <div>
          <p className="eyebrow">Klinika ERP</p>
          <h1>{config.title}</h1>
          <span>{config.description}</span>
        </div>
        {config.primaryAction ? (
          <Link className="primary-button" href={config.primaryHref ?? "#"}>
            {config.primaryAction}
          </Link>
        ) : null}
      </section>

      <section className="metrics-grid">
        {metrics.map((metric) => (
          <div className={`metric-card ${toneClass[metric.tone ?? "neutral"]}`} key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </div>
        ))}
      </section>

      <section className="work-panel">
        <div className="panel-header">
          <div>
            <h2>{config.tableTitle ?? "Ish ro'yxati"}</h2>
            <p>Keyingi bosqichda bu joy real ma&apos;lumot, filter va amallar bilan to&apos;ldiriladi.</p>
          </div>
          <div className="filter-row">
            <button>Bugun</button>
            <button>Status</button>
            <button>Filter</button>
          </div>
        </div>

        <div className="data-table" role="table" aria-label={config.tableTitle ?? config.title}>
          <div className="table-row table-head" role="row">
            {columns.map((column) => (
              <span role="columnheader" key={column}>
                {column}
              </span>
            ))}
          </div>
          {[1, 2, 3].map((item) => (
            <div className="table-row" role="row" key={item}>
              {columns.map((column, index) => (
                <span role="cell" key={`${item}-${column}`}>
                  {index === 1 ? <b className="status-badge">Tayyorlanmoqda</b> : sampleCell(column, item)}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {config.sections?.length ? (
        <section className="section-grid">
          {config.sections.map((section) => (
            <div className="section-tile" key={section}>
              <h3>{section}</h3>
              <p>Bu blok sahifaning keyingi batafsil ishlanmasida forma, jadval yoki workflowga aylanadi.</p>
            </div>
          ))}
        </section>
      ) : null}
    </div>
  );
}

function sampleCell(column: string, index: number) {
  if (column.toLowerCase().includes("sana")) return "27.04.2026";
  if (column.toLowerCase().includes("mas")) return index === 1 ? "Registrator" : "Admin";
  if (column.toLowerCase().includes("summa")) return `${index * 120_000} so'm`;
  if (column.toLowerCase().includes("bemor")) return index === 1 ? "Aliyev Sardor" : "Karimova Dilnoza";
  return `${column} #${index}`;
}
