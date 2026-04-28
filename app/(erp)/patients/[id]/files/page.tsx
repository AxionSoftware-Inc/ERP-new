import { PatientFilesPage } from "../../../../_features/patients/PatientRelatedPages";

type Props = { params: Promise<{ id: string }> };

export default async function PatientFilesRoute({ params }: Props) {
  const { id } = await params;
  return <PatientFilesPage patientId={id} />;
}
