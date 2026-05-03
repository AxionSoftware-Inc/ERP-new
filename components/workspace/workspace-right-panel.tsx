import { EmptyState } from "@/components/feedback/empty-state";

export type WorkspaceRightPanelSection = {
  title: string;
  items: React.ReactNode[];
  emptyTitle?: string;
  emptyDescription?: string;
};

export type WorkspaceRightPanelProps = {
  sections: WorkspaceRightPanelSection[];
};

export function WorkspaceRightPanel({ sections }: WorkspaceRightPanelProps) {
  return (
    <aside className="space-y-2.5 xl:sticky xl:top-20 xl:self-start">
      {sections.map((section) => (
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.05)]" key={section.title}>
          <div className="border-b border-slate-200 bg-slate-100/70 px-3 py-2">
            <h2 className="text-[12px] font-bold uppercase tracking-wide text-slate-700">{section.title}</h2>
          </div>
          <div className="space-y-1.5 bg-slate-50/60 p-2">
            {section.items.length ? (
              section.items.map((item, index) => (
                <div className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-sm text-slate-700 shadow-[0_1px_0_rgba(15,23,42,0.04)] transition-colors hover:border-slate-300 hover:bg-slate-50/50" key={index}>
                  {item}
                </div>
              ))
            ) : (
              <div className="rounded-lg border border-dashed border-slate-200 bg-white p-2">
                <EmptyState
                  title={section.emptyTitle ?? `No items for ${section.title.toLowerCase()}.`}
                  description={section.emptyDescription ?? "There is no supporting context for this section right now."}
                />
              </div>
            )}
          </div>
        </section>
      ))}
    </aside>
  );
}
