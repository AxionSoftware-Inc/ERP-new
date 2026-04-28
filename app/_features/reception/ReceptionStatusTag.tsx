import { Tag } from "antd";
import type { AppointmentStatus } from "../../_data/fakeClinicData";
import { appointmentStatusColors, appointmentStatusLabels } from "./receptionData";

export function ReceptionStatusTag({ status }: { status: AppointmentStatus }) {
  return <Tag color={appointmentStatusColors[status]}>{appointmentStatusLabels[status]}</Tag>;
}
