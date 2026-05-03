import { DoctorPlaceholderPage } from "@/components/doctor/doctor-placeholder-page";
import { getDoctorVisit } from "@/lib/api/client";

type Props = { params: Promise<{ id: string }> };

export default async function DoctorVisitResultsPage({ params }: Props) {
  const { id } = await params;
  const detail = await getDoctorVisit(id);

  return (
    <DoctorPlaceholderPage
      title="Visit Results"
      route={`/app/doctor/visits/${id}/results`}
      purpose={`Lab, radiology va procedure natijalarini review qilish shell${detail ? ` for ${detail.patient.fullName}` : ""}.`}
      sections={["Lab results", "Radiology reports", "Procedure notes", "Critical flags", "Attachments"]}
      actions={["Mark reviewed", "Add interpretation", "Order additional test", "Return to consultation", "Complete consultation"]}
    />
  );
}
