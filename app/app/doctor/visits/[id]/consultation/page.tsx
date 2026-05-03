import { DoctorPlaceholderPage } from "@/components/doctor/doctor-placeholder-page";
import { getDoctorVisit } from "@/lib/api/client";

type Props = { params: Promise<{ id: string }> };

export default async function DoctorVisitConsultationPage({ params }: Props) {
  const { id } = await params;
  const detail = await getDoctorVisit(id);

  return (
    <DoctorPlaceholderPage
      title="Visit Consultation"
      route={`/app/doctor/visits/${id}/consultation`}
      purpose={`Consultation workspace shell${detail ? ` for ${detail.patient.fullName}` : ""}. SOAP note editor keyingi phase'da build qilinadi.`}
      sections={["Chief complaint", "Vitals review", "Examination", "Diagnosis", "Plan", "Doctor note"]}
      actions={["Save draft", "Use template", "Insert previous note", "Complete consultation"]}
    />
  );
}
