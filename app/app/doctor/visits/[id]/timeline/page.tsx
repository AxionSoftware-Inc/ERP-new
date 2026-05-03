import { DoctorPlaceholderPage } from "@/components/doctor/doctor-placeholder-page";
import { getDoctorVisit } from "@/lib/api/client";

type Props = { params: Promise<{ id: string }> };

export default async function DoctorVisitTimelinePage({ params }: Props) {
  const { id } = await params;
  const detail = await getDoctorVisit(id);

  return (
    <DoctorPlaceholderPage
      title="Visit Timeline"
      route={`/app/doctor/visits/${id}/timeline`}
      purpose={`Clinical and operational activity timeline shell${detail ? ` for ${detail.patient.fullName}` : ""}.`}
      sections={["Visit events", "Order events", "Result events", "Document events", "Billing handoff"]}
      actions={["Open event", "Audit activity", "Print summary"]}
    />
  );
}
