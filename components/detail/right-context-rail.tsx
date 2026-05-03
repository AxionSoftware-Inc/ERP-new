export type RightContextRailSection = {
  title: string;
  content: React.ReactNode;
};

export type RightContextRailProps = {
  sections: RightContextRailSection[];
};

export function RightContextRail({ sections }: RightContextRailProps) {
  return (
    <aside className="space-y-3">
      {sections.map((section) => (
        <section className="rounded-md border border-slate-200 bg-white" key={section.title}>
          <div className="border-b border-slate-200 px-3 py-2">
            <h2 className="text-sm font-semibold text-slate-950">{section.title}</h2>
          </div>
          <div className="p-3 text-sm text-slate-700">{section.content}</div>
        </section>
      ))}
    </aside>
  );
}
