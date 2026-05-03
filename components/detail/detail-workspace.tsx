export type DetailWorkspaceProps = {
  header: React.ReactNode;
  commandBar?: React.ReactNode;
  children: React.ReactNode;
  rightRail?: React.ReactNode;
  timeline?: React.ReactNode;
};

export function DetailWorkspace({ header, commandBar, children, rightRail, timeline }: DetailWorkspaceProps) {
  return (
    <div className="space-y-3">
      {header}
      {commandBar ? <div className="sticky top-12 z-10">{commandBar}</div> : null}
      <div className={rightRail ? "grid gap-3 xl:grid-cols-[minmax(0,1fr)_320px]" : "grid gap-3"}>
        <main className="min-w-0 space-y-3">{children}</main>
        {rightRail ? <div className="min-w-0 xl:sticky xl:top-28 xl:self-start">{rightRail}</div> : null}
      </div>
      {timeline ? <div>{timeline}</div> : null}
    </div>
  );
}
