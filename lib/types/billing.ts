import type {
  DepartmentSummary,
  ID,
  Money,
  NextActionData,
  PatientSummary,
  StatusBadgeData,
  TimelineEvent,
  UserSummary,
} from "./shared";

export type InvoiceStatus =
  | "draft"
  | "issued"
  | "partially_paid"
  | "paid"
  | "void"
  | "refunded"
  | "cancelled";

export type PaymentMethod = "cash" | "card" | "bank_transfer" | "insurance" | "corporate" | "mixed";

export type PaymentStatus = "pending" | "recorded" | "failed" | "refunded" | "cancelled";

export type InvoiceSummary = {
  id: ID;
  invoiceCode: string;
  patient: PatientSummary;
  visitId?: ID | null;
  total: Money;
  paid: Money;
  balance: Money;
  status: InvoiceStatus;
  statusBadge: StatusBadgeData;
  nextAction: NextActionData;
  issuedAt?: string | null;
};

export type InvoiceDetailResponse = {
  invoice: Invoice;
  payments: Payment[];
  refunds: Refund[];
  timeline: TimelineEvent[];
};

export type Invoice = {
  id: ID;
  invoiceCode: string;
  patient: PatientSummary;
  visitId?: ID | null;
  status: InvoiceStatus;
  statusBadge: StatusBadgeData;
  nextAction: NextActionData;
  items: InvoiceItem[];
  subtotal: Money;
  discount: Money;
  total: Money;
  paid: Money;
  balance: Money;
  issuedBy?: UserSummary | null;
  issuedAt?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type InvoiceItem = {
  id: ID;
  serviceCode: string;
  serviceName: string;
  department?: DepartmentSummary | null;
  quantity: number;
  unitPrice: Money;
  total: Money;
};

export type Payment = {
  id: ID;
  paymentCode: string;
  invoiceId: ID;
  amount: Money;
  method: PaymentMethod;
  status: PaymentStatus;
  referenceNumber?: string | null;
  recordedBy?: UserSummary | null;
  recordedAt: string;
  notes?: string | null;
};

export type Refund = {
  id: ID;
  refundCode: string;
  paymentId: ID;
  invoiceId: ID;
  amount: Money;
  reason: string;
  approvedBy?: UserSummary | null;
  recordedBy?: UserSummary | null;
  recordedAt: string;
};
