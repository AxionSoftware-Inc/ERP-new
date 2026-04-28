import { Tag } from "antd";
import type { OrderStatus } from "../../_data/fakeClinicData";
import { labStatusColors, labStatusLabels } from "./labData";

export function LabStatusTag({ status }: { status: OrderStatus }) {
  return <Tag color={labStatusColors[status]}>{labStatusLabels[status]}</Tag>;
}
