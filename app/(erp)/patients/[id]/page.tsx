import { PatientDetailPage } from "../../../_features/patients/PatientDetailPage";

type Props = { params: Promise<{ id: string }> };

export default async function PatientDetailRoute({ params }: Props) {
  const { id } = await params;
  return <PatientDetailPage patientId={id} />;
}
