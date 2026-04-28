import { PatientMedicalHistoryPage } from "../../../../_features/patients/PatientMedicalHistoryPage";

type Props = { params: Promise<{ id: string }> };

export default async function PatientMedicalHistoryRoute({ params }: Props) {
  const { id } = await params;
  return <PatientMedicalHistoryPage patientId={id} />;
}
