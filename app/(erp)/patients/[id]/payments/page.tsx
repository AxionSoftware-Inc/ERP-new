import { PatientPaymentsPage } from "../../../../_features/patients/PatientRelatedPages";

type Props = { params: Promise<{ id: string }> };

export default async function PatientPaymentsRoute({ params }: Props) {
  const { id } = await params;
  return <PatientPaymentsPage patientId={id} />;
}
