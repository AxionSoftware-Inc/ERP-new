import { ReceptionAppointmentDetail } from "../../../../_features/reception/ReceptionAppointmentDetail";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ReceptionAppointmentDetailPage({ params }: Props) {
  const { id } = await params;

  return <ReceptionAppointmentDetail appointmentId={id} />;
}
