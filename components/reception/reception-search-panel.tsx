import Link from "next/link";

export function ReceptionSearchPanel() {
  return (
    <section className="rounded-md border border-slate-200 bg-white p-3">
      <h2 className="text-sm font-semibold text-slate-950">Tez bemor qidirish</h2>
      <input
        className="mt-2 h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
        placeholder="Ism, telefon yoki bemor kodi"
        type="search"
      />
      <div className="mt-2 grid grid-cols-2 gap-1.5">
        <Link className="inline-flex h-8 items-center justify-center rounded-md border border-slate-200 bg-slate-50 px-2 text-xs font-semibold text-slate-700 hover:bg-white" href="/app/patients/new">
          Yangi bemor
        </Link>
        <Link className="inline-flex h-8 items-center justify-center rounded-md border border-teal-700 bg-teal-700 px-2 text-xs font-semibold text-white hover:bg-teal-800" href="/app/reception/intake/new">
          Yangi qabul
        </Link>
      </div>
    </section>
  );
}
