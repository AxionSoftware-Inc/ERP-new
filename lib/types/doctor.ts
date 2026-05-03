import type { AppointmentListItem } from "./appointments";
import type { Consultation, ConsultationStatus, Vitals } from "./clinical";
import type { DocumentSummary } from "./documents";
import type { LabOrderSummary, LabResult, LabResultSummary } from "./lab";
import type { ProcedureOrderSummary } from "./procedures";
import type { RadiologyOrderSummary, RadiologyReport } from "./radiology";
import type {
  DepartmentSummary,
  DoctorSummary,
  ID,
  NextActionData,
  PatientSummary,
  StatusBadgeData,
  TimelineEvent,
} from "./shared";
import type { Visit, VisitSummary, VisitWorkflowStatus } from "./visits";

export type DoctorVisitWorkflowStatus =
  | "queued_for_doctor"
  | "with_doctor"
  | "awaiting_doctor_review"
  | "consultation_completed"
  | "completed"
  | "cancelled";

export type DoctorPriority = "routine" | "urgent" | "stat";

export type DoctorResultType = "lab" | "radiology" | "procedure";

export type PrescriptionStatus =
  | "draft"
  | "signed"
  | "sent_to_pharmacy"
  | "partially_dispensed"
  | "dispensed"
  | "cancelled";

export type DoctorWorkspaceMetricKey =
  | "waiting"
  | "active"
  | "needs_review"
  | "completed_today"
  | "delayed";

export type DoctorWorkspaceMetric = {
  key: DoctorWorkspaceMetricKey;
  label: string;
  count: number;
  badge: StatusBadgeData;
  href: string;
};

export type DoctorWorkItem = {
  id: ID;
  visitId: ID;
  visitCode: string;
  patient: PatientSummary;
  doctor: DoctorSummary;
  department?: DepartmentSummary | null;
  reason?: string | null;
  chiefComplaint?: string | null;
  workflowStatus: VisitWorkflowStatus;
  workflowBadge: StatusBadgeData;
  consultationStatus: ConsultationStatus;
  consultationBadge: StatusBadgeData;
  priority: DoctorPriority;
  queueNumber?: string | null;
  waitingMinutes: number;
  visitAgeMinutes: number;
  assignedAt?: string | null;
  lastUpdatedAt: string;
  pendingOrdersCount: number;
  pendingResultsCount: number;
  nextAction: NextActionData;
};

export type DoctorReviewItem = {
  id: ID;
  visitId: ID;
  visitCode: string;
  patient: PatientSummary;
  resultType: DoctorResultType;
  serviceName: string;
  sourceCode: string;
  flag: "normal" | "abnormal" | "critical";
  releasedAt: string;
  delayedMinutes: number;
  reviewed: boolean;
  nextAction: NextActionData;
};

export type DoctorCompletedItem = {
  id: ID;
  visitId: ID;
  visitCode: string;
  patient: PatientSummary;
  diagnosisText?: string | null;
  completedAt: string;
  billingStatus?: string | null;
  prescriptionExists: boolean;
  documentCount: number;
  nextAction: NextActionData;
};

export type DoctorScheduleItem = {
  id: ID;
  appointment: AppointmentListItem;
  room?: string | null;
  availabilityStatus: "available" | "busy" | "break" | "cancelled" | "no_show";
  nextAction: NextActionData;
};

export type DoctorWorkspaceResponse = {
  doctor: DoctorSummary;
  metrics: DoctorWorkspaceMetric[];
  focus: DoctorWorkItem[];
  queues: {
    myQueue: DoctorWorkItem[];
    activeEncounters: DoctorWorkItem[];
    needsReview: DoctorReviewItem[];
    completedToday: DoctorCompletedItem[];
  };
  rightRail: {
    todaySchedule: DoctorScheduleItem[];
    urgentCases: DoctorWorkItem[];
    recentResults: DoctorReviewItem[];
    controls: DoctorControlState;
  };
};

export type DoctorQueueResponse = {
  filters: DoctorQueueFilters;
  items: DoctorWorkItem[];
};

export type DoctorQueueFilters = {
  priorities: DoctorPriority[];
  departments: DepartmentSummary[];
  visitTypes: string[];
  waitingMinuteBuckets: string[];
};

export type DoctorActiveEncountersResponse = {
  items: DoctorWorkItem[];
};

export type DoctorReviewQueueResponse = {
  criticalCount: number;
  abnormalCount: number;
  delayedCount: number;
  items: DoctorReviewItem[];
};

export type DoctorCompletedConsultationsResponse = {
  items: DoctorCompletedItem[];
};

export type DoctorControlState = {
  acceptingPatients: boolean;
  currentRoom?: string | null;
  nextBreakAt?: string | null;
  unreadTasks: number;
};

export type DoctorVisitDetailResponse = {
  visit: Visit;
  patient: PatientSummary;
  doctor: DoctorSummary;
  consultation: DoctorConsultationWorkspace;
  orders: DoctorOrdersWorkspace;
  results: DoctorResultsWorkspace;
  prescription: DoctorPrescriptionWorkspace;
  documents: DoctorDocumentsWorkspace;
  rightRail: DoctorVisitRightRail;
  timeline: TimelineEvent[];
  commandBar: DoctorCommandBarAction[];
};

export type DoctorCommandBarAction = {
  key:
    | "start_consultation"
    | "save_draft"
    | "order_lab"
    | "order_radiology"
    | "add_prescription"
    | "complete_consultation"
    | "send_to_billing"
    | "print"
    | "cancel";
  label: string;
  primary?: boolean;
  danger?: boolean;
  enabled: boolean;
  reason?: string;
};

export type DoctorConsultationWorkspace = {
  consultation?: Consultation | null;
  soap: SoapNote;
  vitals?: Vitals | null;
  vitalsReviewed: boolean;
  diagnoses: DiagnosisEntry[];
  followUp?: FollowUpPlan | null;
  lastSavedAt?: string | null;
};

export type SoapNote = {
  subjective?: string | null;
  objective?: string | null;
  assessment?: string | null;
  plan?: string | null;
  notes?: string | null;
};

export type DiagnosisEntry = {
  id: ID;
  text: string;
  icd10Code?: string | null;
  type: "primary" | "secondary" | "differential";
  clinicalImpression?: string | null;
};

export type FollowUpPlan = {
  followUpDate?: string | null;
  referralTo?: string | null;
  lifestyleRecommendation?: string | null;
  dietRecommendation?: string | null;
  homeCareInstruction?: string | null;
};

export type DoctorOrdersWorkspace = {
  labOrders: LabOrderSummary[];
  radiologyOrders: RadiologyOrderSummary[];
  procedureOrders: ProcedureOrderSummary[];
  nursingTasks: NursingTaskSummary[];
  referrals: ReferralSummary[];
  orderSets: DoctorTemplateSummary[];
};

export type NursingTaskSummary = {
  id: ID;
  title: string;
  status: "ordered" | "in_progress" | "completed" | "cancelled";
  priority: DoctorPriority;
  assignedTo?: string | null;
};

export type ReferralSummary = {
  id: ID;
  targetDepartment: string;
  targetDoctor?: DoctorSummary | null;
  reason: string;
  status: "draft" | "sent" | "accepted" | "cancelled";
};

export type DoctorResultsWorkspace = {
  labResults: DoctorLabResultReview[];
  radiologyReports: DoctorRadiologyReview[];
  procedureResults: DoctorProcedureReview[];
  attachments: DocumentSummary[];
};

export type DoctorLabResultReview = {
  order: LabOrderSummary;
  results: LabResult[];
  flag: "normal" | "abnormal" | "critical";
  interpretation?: string | null;
  reviewedAt?: string | null;
};

export type DoctorRadiologyReview = {
  order: RadiologyOrderSummary;
  report?: RadiologyReport | null;
  flag: "normal" | "abnormal" | "critical";
  interpretation?: string | null;
  reviewedAt?: string | null;
};

export type DoctorProcedureReview = {
  order: ProcedureOrderSummary;
  completionNote?: string | null;
  flag: "normal" | "abnormal" | "critical";
  reviewedAt?: string | null;
};

export type DoctorPrescriptionWorkspace = {
  prescription?: Prescription | null;
  medicationCatalog: MedicationCatalogItem[];
  templates: DoctorTemplateSummary[];
  recommendations: TreatmentRecommendation[];
};

export type Prescription = {
  id: ID;
  visitId: ID;
  patient: PatientSummary;
  doctor: DoctorSummary;
  status: PrescriptionStatus;
  statusBadge: StatusBadgeData;
  items: PrescriptionItem[];
  signedAt?: string | null;
  sentToPharmacyAt?: string | null;
};

export type PrescriptionItem = {
  id: ID;
  medicationName: string;
  dose: string;
  frequency: string;
  duration: string;
  route: string;
  instructions?: string | null;
  quantity?: string | null;
  substitutionAllowed: boolean;
};

export type MedicationCatalogItem = {
  id: ID;
  name: string;
  form: string;
  strength: string;
  defaultRoute: string;
};

export type TreatmentRecommendation = {
  id: ID;
  category: "lifestyle" | "diet" | "rest" | "follow_up" | "home_care";
  text: string;
};

export type DoctorDocumentsWorkspace = {
  documents: DocumentSummary[];
  availableTemplates: DoctorTemplateSummary[];
};

export type DoctorTemplateType =
  | "clinical_note"
  | "diagnosis"
  | "prescription"
  | "lab_order_set"
  | "radiology_order_set"
  | "treatment_plan"
  | "document";

export type DoctorTemplateSummary = {
  id: ID;
  type: DoctorTemplateType;
  title: string;
  favorite: boolean;
  updatedAt: string;
};

export type DoctorVisitRightRail = {
  patientSummary: PatientSummary;
  allergies: string[];
  chronicConditions: string[];
  currentMedications: string[];
  previousVisits: VisitSummary[];
  previousLabResults: LabResultSummary[];
  previousRadiologyReports: RadiologyOrderSummary[];
  invoiceContext?: {
    status: string;
    amountDue: string;
    canSendToBilling: boolean;
  } | null;
  documents: DocumentSummary[];
};

export type DoctorTemplatesResponse = {
  templates: DoctorTemplateSummary[];
};

export type DoctorClinicalHistoryResponse = {
  patient?: PatientSummary | null;
  visits: VisitSummary[];
  diagnoses: DiagnosisEntry[];
  labResults: LabResultSummary[];
  radiologyReports: RadiologyOrderSummary[];
  documents: DocumentSummary[];
  currentMedications: string[];
  allergies: string[];
  chronicConditions: string[];
};
