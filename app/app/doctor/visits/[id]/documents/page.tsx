import { DoctorPlaceholderPage } from "@/components/doctor/doctor-placeholder-page";
import { getDoctorVisit } from "@/lib/api/client";

type Props = { params: Promise<{ id: string }> };

export default async function DoctorVisitDocumentsPage({ params }: Props) {
  const { id } = await params;
  const detail = await getDoctorVisit(id);

  return (
    <DoctorPlaceholderPage
      title="Visit Documents"
      route={`/app/doctor/visits/${id}/documents`}
      purpose={`Medical conclusion, certificate, referral note va visit summary shell${detail ? ` for ${detail.patient.fullName}` : ""}.`}
      sections={["Medical conclusion", "Sick leave note", "Referral note", "Certificate", "Visit summary"]}
      actions={["Generate", "Edit template", "Print", "Export PDF", "Attach to patient"]}
    />
  );
}
