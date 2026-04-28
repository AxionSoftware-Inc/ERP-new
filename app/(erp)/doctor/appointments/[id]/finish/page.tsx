import { DoctorFinishPage } from "../../../../../_features/doctor/DoctorFinishPage";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DoctorAppointmentFinishPage({ params }: Props) {
  const { id } = await params;

  return <DoctorFinishPage appointmentId={id} />;
}
