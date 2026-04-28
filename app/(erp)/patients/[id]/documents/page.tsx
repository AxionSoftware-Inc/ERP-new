import { PatientDocumentsPage } from "../../../../_features/patients/PatientRelatedPages";

type Props = { params: Promise<{ id: string }> };

export default async function PatientDocumentsRoute({ params }: Props) {
  const { id } = await params;
  return <PatientDocumentsPage patientId={id} />;
}
