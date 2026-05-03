import type { DocumentSummary } from "./documents";
import type {
  DoctorSummary,
  ID,
  NextActionData,
  PatientSummary,
  StatusBadgeData,
  UserSummary,
} from "./shared";

export type RadiologyOrderStatus =
  | "ordered"
  | "scheduled"
  | "patient_arrived"
  | "imaging_in_progress"
  | "image_captured"
  | "report_drafted"
  | "report_verified"
  | "released"
  | "reviewed_by_doctor"
  | "cancelled";

export type RadiologyOrderSummary = {
  id: ID;
  radiologyOrderCode: string;
  visitId: ID;
  patient: PatientSummary;
  requestedBy: DoctorSummary;
  serviceName: string;
  status: RadiologyOrderStatus;
  statusBadge: StatusBadgeData;
  nextAction: NextActionData;
  scheduledAt?: string | null;
  createdAt: string;
};

export type RadiologyOrder = {
  id: ID;
  radiologyOrderCode: string;
  visitId: ID;
  patient: PatientSummary;
  requestedBy: DoctorSummary;
  serviceName: string;
  status: RadiologyOrderStatus;
  statusBadge: StatusBadgeData;
  nextAction: NextActionData;
  clinicalIndication?: string | null;
  scheduledAt?: string | null;
  report?: RadiologyReport | null;
  attachments: DocumentSummary[];
  createdAt: string;
  updatedAt: string;
};

export type RadiologyReport = {
  id: ID;
  findings?: string | null;
  impression?: string | null;
  draftedBy?: UserSummary | null;
  verifiedBy?: UserSummary | null;
  draftedAt?: string | null;
  verifiedAt?: string | null;
};
