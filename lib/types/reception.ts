import type { AppointmentListItem } from "./appointments";
import type { PatientListItem } from "./patients";
import type {
  DepartmentSummary,
  DoctorSummary,
  ID,
  Money,
  NextActionData,
  PatientSummary,
  TimelineEvent,
} from "./shared";
import type { VisitListItem, VisitSummary, VisitType } from "./visits";
import type { QueueSectionData, WorkspaceSummaryItem } from "./workspaces";

export type ReceptionPriority = "normal" | "urgent" | "emergency" | "vip";

export type ReceptionSource =
  | "walk_in"
  | "phone"
  | "telegram"
  | "referral"
  | "corporate"
  | "insurance"
  | "doctor_referral";

export type ReceptionPaymentType = "cash" | "card" | "insurance" | "corporate" | "mixed";

export type ReceptionIntakeDraft = {
  patientId?: ID | null;
  appointmentId?: ID | null;
  newPatient?: {
    fullName: string;
    phone?: string | null;
    gender?: "male" | "female" | "other" | "unknown";
    birthDate?: string | null;
    age?: number | null;
  };
  visitType: VisitType;
  reason: string;
  priority: ReceptionPriority;
  source: ReceptionSource;
  departmentId?: ID | null;
  doctorId?: ID | null;
  serviceIds: ID[];
  paymentType: ReceptionPaymentType;
  notes?: string | null;
};

export type ReceptionDoctorAvailability = {
  doctor: DoctorSummary;
  department: DepartmentSummary;
  status: "available" | "busy" | "unavailable" | "off_shift";
  currentQueueCount: number;
  estimatedWaitMinutes: number;
  currentPatient?: PatientSummary | null;
  room?: string | null;
  nextAvailableAt?: string | null;
};

export type ReceptionQueueItem = VisitListItem & {
  queueNumber?: string | null;
  waitingMinutes?: number;
  visitAgeMinutes?: number;
  lastMovedAt?: string | null;
  priority?: ReceptionPriority;
  ownerRole?: string | null;
  slaState?: "normal" | "warning" | "breached";
};

export type ReceptionPatientSearchResult = {
  patient: PatientListItem;
  activeVisit?: VisitSummary | null;
  lastVisit?: VisitSummary | null;
  balance?: Money;
  riskFlags?: string[];
  duplicateScore?: number;
  duplicateReason?: string | null;
  nextActions: NextActionData[];
};

export type ReceptionCheckInItem = AppointmentListItem & {
  arrivalState: "not_arrived" | "arrived" | "late" | "checked_in" | "no_show_candidate";
  lateMinutes?: number;
  linkedVisit?: VisitSummary | null;
  nextActions: NextActionData[];
};

export type ReceptionWalkInItem = {
  id: ID;
  patient: PatientSummary;
  visit?: VisitSummary | null;
  reason: string;
  priority: ReceptionPriority;
  requestedDepartment?: DepartmentSummary | null;
  requestedDoctor?: DoctorSummary | null;
  status: "new" | "waiting_assignment" | "assigned" | "queued" | "cancelled";
  waitingMinutes: number;
  nextAction: NextActionData;
  createdAt: string;
};

export type ReceptionDelayedCase = {
  id: ID;
  visit: VisitListItem;
  delayType:
    | "waiting_for_doctor"
    | "lab_pending"
    | "radiology_pending"
    | "billing_pending"
    | "paid_not_closed"
    | "no_show_candidate";
  waitingMinutes: number;
  expectedMinutes: number;
  owner: string;
  severity: "warning" | "critical";
  nextAction: NextActionData;
};

export type ReceptionShiftSummary = {
  registeredPatients: number;
  createdVisits: number;
  checkedInAppointments: number;
  walkIns: number;
  noShows: number;
  cancelledAppointments: number;
  queuedToDoctor: number;
  sentToBilling: number;
  completedVisits: number;
  unresolvedCases: number;
  delayedCases: number;
};

export type ReceptionServiceOption = {
  id: ID;
  serviceCode: string;
  serviceName: string;
  department: DepartmentSummary;
  price: Money;
  estimatedDurationMinutes?: number;
  isActive: boolean;
};

export type ReceptionIntakeContext = {
  recentPatients: PatientListItem[];
  todayAppointments: ReceptionCheckInItem[];
  doctorAvailability: ReceptionDoctorAvailability[];
  serviceOptions: ReceptionServiceOption[];
  warnings: string[];
};

export type ReceptionPatientSearchResponse = {
  query: string;
  results: ReceptionPatientSearchResult[];
  possibleDuplicates: ReceptionPatientSearchResult[];
  recentPatients: PatientListItem[];
};

export type ReceptionCheckInWorkspaceResponse = {
  summary: WorkspaceSummaryItem[];
  queues: {
    scheduled: QueueSectionData<ReceptionCheckInItem>;
    arrived: QueueSectionData<ReceptionCheckInItem>;
    checkedIn: QueueSectionData<ReceptionCheckInItem>;
    lateOrNoShow: QueueSectionData<ReceptionCheckInItem>;
  };
  rightPanel: {
    doctorSchedule: ReceptionDoctorAvailability[];
    lateArrivals: ReceptionCheckInItem[];
    upcomingNextHour: ReceptionCheckInItem[];
  };
};

export type ReceptionWalkInsWorkspaceResponse = {
  summary: WorkspaceSummaryItem[];
  quickContext: {
    doctorAvailability: ReceptionDoctorAvailability[];
    serviceOptions: ReceptionServiceOption[];
  };
  queues: {
    newWalkIns: QueueSectionData<ReceptionWalkInItem>;
    waitingAssignment: QueueSectionData<ReceptionWalkInItem>;
    assignedOrQueued: QueueSectionData<ReceptionWalkInItem>;
  };
  rightPanel: {
    doctorLoad: ReceptionDoctorAvailability[];
    delayedWalkIns: ReceptionWalkInItem[];
  };
};

export type ReceptionQueueControlResponse = {
  summary: WorkspaceSummaryItem[];
  queues: {
    byPriority: QueueSectionData<ReceptionQueueItem>;
    byWaitingTime: QueueSectionData<ReceptionQueueItem>;
    billingOrClosing: QueueSectionData<ReceptionQueueItem>;
    unresolved: QueueSectionData<ReceptionQueueItem>;
  };
  rightPanel: {
    delayedCases: ReceptionDelayedCase[];
    doctorLoad: ReceptionDoctorAvailability[];
    bottlenecks: string[];
  };
};

export type ReceptionShiftSummaryResponse = {
  summary: ReceptionShiftSummary;
  unresolvedCases: ReceptionDelayedCase[];
  recentActions: TimelineEvent[];
};

export type ReceptionIntakeDraftResponse = {
  draft: ReceptionIntakeDraft;
  message: string;
};

export type ReceptionIntakePreviewResponse = {
  selectedDoctor?: ReceptionDoctorAvailability | null;
  selectedServices: ReceptionServiceOption[];
  estimatedTotal: Money;
  warnings: string[];
};
