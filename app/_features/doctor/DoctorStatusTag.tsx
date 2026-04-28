import { Tag } from "antd";
import type { AppointmentStatus } from "../../_data/fakeClinicData";
import { doctorStatusColors, doctorStatusLabels } from "./doctorData";

export function DoctorStatusTag({ status }: { status: AppointmentStatus }) {
  return <Tag color={doctorStatusColors[status]}>{doctorStatusLabels[status]}</Tag>;
}
