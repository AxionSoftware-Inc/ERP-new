export type ID = string;

export type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type DetailResponse<T> = T;

export type ActionResponse<T> = {
  data: T;
  event?: TimelineEvent;
  message?: string;
};

export type Money = {
  amount: number;
  currency: "UZS" | "USD";
  formatted: string;
};

export type UserSummary = {
  id: ID;
  fullName: string;
  role: string;
  avatarUrl?: string | null;
};

export type BranchSummary = {
  id: ID;
  name: string;
  code: string;
};

export type DepartmentSummary = {
  id: ID;
  name: string;
  code: string;
};

export type DoctorSummary = {
  id: ID;
  fullName: string;
  specialization: string;
  department?: DepartmentSummary;
};

export type PatientSummary = {
  id: ID;
  patientCode: string;
  fullName: string;
  birthDate?: string | null;
  age?: number | null;
  gender?: "male" | "female" | "other" | "unknown";
  phone?: string | null;
};

export type StatusTone = "neutral" | "info" | "warning" | "success" | "danger" | "accent";

export type StatusBadgeData = {
  label: string;
  tone: StatusTone;
};

export type NextActionData = {
  label: string;
  cta: string;
  targetRoute?: string;
  disabled?: boolean;
  reason?: string;
};

export type TimelineEvent = {
  id: ID;
  entityType:
    | "patient"
    | "appointment"
    | "visit"
    | "consultation"
    | "lab_order"
    | "radiology_order"
    | "procedure_order"
    | "invoice"
    | "payment"
    | "inventory_item"
    | "staff";
  entityId: ID;
  eventType:
    | "create"
    | "update"
    | "status_change"
    | "payment_recorded"
    | "invoice_issued"
    | "result_released"
    | "note_added"
    | "document_uploaded"
    | "print"
    | "cancel";
  title: string;
  description?: string;
  actor?: UserSummary | null;
  createdAt: string;
};
