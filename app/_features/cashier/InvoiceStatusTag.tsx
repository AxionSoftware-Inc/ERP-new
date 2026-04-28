import { Tag } from "antd";
import type { PaymentInvoice } from "../../_data/fakeClinicData";
import { invoiceStatusColors, invoiceStatusLabels } from "./cashierData";

export function InvoiceStatusTag({ status }: { status: PaymentInvoice["status"] }) {
  return <Tag color={invoiceStatusColors[status]}>{invoiceStatusLabels[status]}</Tag>;
}
