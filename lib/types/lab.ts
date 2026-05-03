import type {
  DoctorSummary,
  ID,
  NextActionData,
  PatientSummary,
  StatusBadgeData,
  TimelineEvent,
  UserSummary,
} from "./shared";

export type LabOrderStatus =
  | "ordered"
  | "sample_pending"
  | "sample_collected"
  | "in_progress"
  | "result_entered"
  | "verified"
  | "released"
  | "reviewed_by_doctor"
  | "cancelled";

export type LabPriority = "routine" | "urgent" | "stat";

export type LabOrderSummary = {
  id: ID;
  labOrderCode: string;
  visitId: ID;
  patient: PatientSummary;
  requestedBy: DoctorSummary;
  status: LabOrderStatus;
  statusBadge: StatusBadgeData;
  nextAction: NextActionData;
  priority: LabPriority;
  testNames: string[];
  createdAt: string;
};

export type LabOrderDetailResponse = {
  order: LabOrder;
  results: LabResult[];
  timeline: TimelineEvent[];
};

export type LabOrder = {
  id: ID;
  labOrderCode: string;
  visitId: ID;
  patient: PatientSummary;
  requestedBy: DoctorSummary;
  status: LabOrderStatus;
  statusBadge: StatusBadgeData;
  nextAction: NextActionData;
  priority: LabPriority;
  tests: LabOrderItem[];
  sample?: LabSample | null;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type LabOrderItem = {
  id: ID;
  testCode: string;
  testName: string;
  category?: string | null;
  status: LabOrderStatus;
  result?: LabResult | null;
};

export type LabSample = {
  id: ID;
  sampleCode: string;
  sampleType: string;
  collectedAt?: string | null;
  collectedBy?: UserSummary | null;
};

export type LabResult = {
  id: ID;
  testCode: string;
  testName: string;
  value?: string | number | null;
  unit?: string | null;
  referenceRange?: string | null;
  flag?: "low" | "normal" | "high" | "critical" | null;
  comment?: string | null;
  enteredBy?: UserSummary | null;
  verifiedBy?: UserSummary | null;
  enteredAt?: string | null;
  verifiedAt?: string | null;
};

export type LabResultSummary = {
  id: ID;
  labOrderCode: string;
  testNames: string[];
  status: LabOrderStatus;
  statusBadge: StatusBadgeData;
  releasedAt?: string | null;
};
