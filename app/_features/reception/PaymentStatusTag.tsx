import { Tag } from "antd";
import type { ReceptionAppointmentRow } from "./receptionData";
import { paymentStatusColors, paymentStatusLabels } from "./receptionData";

export function PaymentStatusTag({ status }: { status: ReceptionAppointmentRow["paymentStatus"] }) {
  return <Tag color={paymentStatusColors[status]}>{paymentStatusLabels[status]}</Tag>;
}
