import { PatientNotesPage } from "../../../../_features/patients/PatientRelatedPages";

type Props = { params: Promise<{ id: string }> };

export default async function PatientNotesRoute({ params }: Props) {
  const { id } = await params;
  return <PatientNotesPage patientId={id} />;
}
