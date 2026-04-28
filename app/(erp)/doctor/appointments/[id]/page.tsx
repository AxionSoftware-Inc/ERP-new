import { DoctorEncounterPage } from "../../../../_features/doctor/DoctorEncounterPage";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DoctorAppointmentPage({ params }: Props) {
  const { id } = await params;

  return <DoctorEncounterPage appointmentId={id} />;
}
