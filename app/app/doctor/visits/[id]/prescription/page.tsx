import { DoctorPlaceholderPage } from "@/components/doctor/doctor-placeholder-page";
import { getDoctorVisit } from "@/lib/api/client";

type Props = { params: Promise<{ id: string }> };

export default async function DoctorVisitPrescriptionPage({ params }: Props) {
  const { id } = await params;
  const detail = await getDoctorVisit(id);

  return (
    <DoctorPlaceholderPage
      title="Visit Prescription"
      route={`/app/doctor/visits/${id}/prescription`}
      purpose={`Medication plan, recommendations va pharmacy handoff shell${detail ? ` for ${detail.patient.fullName}` : ""}.`}
      sections={["Medication lines", "Dose/frequency/duration", "Instructions", "Recommendations", "Prescription status"]}
      actions={["Add medication", "Use template", "Sign prescription", "Send to pharmacy", "Print prescription"]}
    />
  );
}
