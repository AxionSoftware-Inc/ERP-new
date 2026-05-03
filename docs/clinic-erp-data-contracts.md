# Clinic ERP / HIS Data Contracts

## Purpose

This document defines frontend mock data shapes and future API response contracts for the clinic ERP/HIS.

The frontend is built first with realistic mock data, but mock data must look like future backend API responses.

The goal is to avoid rewriting frontend screens when the Django REST Framework backend is implemented.

---

# General API Principles

## Response Shape

List responses should use this shape:

```ts
type PaginatedResponse<T> = {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

Detail responses should return one object:

type DetailResponse<T> = T

Action responses should return the updated object plus optional timeline event:

type ActionResponse<T> = {
  data: T
  event?: TimelineEvent
  message?: string
}
Shared Types
ID

Use string IDs in frontend.

type ID = string

Backend can use UUID or integer later, but frontend should treat IDs as strings.

Money
type Money = {
  amount: number
  currency: "UZS" | "USD"
  formatted: string
}

Example:

const money = {
  amount: 150000,
  currency: "UZS",
  formatted: "150 000 UZS"
}
UserSummary
type UserSummary = {
  id: ID
  fullName: string
  role: string
  avatarUrl?: string | null
}
BranchSummary
type BranchSummary = {
  id: ID
  name: string
  code: string
}
DepartmentSummary
type DepartmentSummary = {
  id: ID
  name: string
  code: string
}
DoctorSummary
type DoctorSummary = {
  id: ID
  fullName: string
  specialization: string
  department?: DepartmentSummary
}
PatientSummary
type PatientSummary = {
  id: ID
  patientCode: string
  fullName: string
  birthDate?: string | null
  age?: number | null
  gender?: "male" | "female" | "other" | "unknown"
  phone?: string | null
}
StatusBadgeData
type StatusBadgeData = {
  label: string
  tone: "neutral" | "info" | "warning" | "success" | "danger" | "accent"
}
NextActionData
type NextActionData = {
  label: string
  cta: string
  targetRoute?: string
  disabled?: boolean
  reason?: string
}
TimelineEvent
type TimelineEvent = {
  id: ID
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
    | "staff"
  entityId: ID
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
    | "cancel"
  title: string
  description?: string
  actor?: UserSummary | null
  createdAt: string
}
Patient Contracts
Patient
type Patient = {
  id: ID
  patientCode: string
  fullName: string
  birthDate?: string | null
  age?: number | null
  gender?: "male" | "female" | "other" | "unknown"
  phone?: string | null
  secondaryPhone?: string | null
  address?: string | null
  passportNumber?: string | null
  emergencyContactName?: string | null
  emergencyContactPhone?: string | null
  riskFlags?: string[]
  balance?: Money
  createdAt: string
  updatedAt: string
}
PatientListItem
type PatientListItem = {
  id: ID
  patientCode: string
  fullName: string
  age?: number | null
  gender?: "male" | "female" | "other" | "unknown"
  phone?: string | null
  lastVisitAt?: string | null
  activeVisitId?: ID | null
  balance?: Money
  riskFlags?: string[]
}
PatientDetailResponse
type PatientDetailResponse = {
  patient: Patient
  activeVisit?: VisitSummary | null
  recentVisits: VisitSummary[]
  recentInvoices: InvoiceSummary[]
  recentLabResults: LabResultSummary[]
  documents: DocumentSummary[]
  timeline: TimelineEvent[]
}
Appointment Contracts
AppointmentStatus
type AppointmentStatus =
  | "scheduled"
  | "confirmed"
  | "arrived"
  | "checked_in"
  | "converted_to_visit"
  | "no_show"
  | "cancelled"
Appointment
type Appointment = {
  id: ID
  appointmentCode: string
  patient: PatientSummary
  doctor: DoctorSummary
  department: DepartmentSummary
  branch: BranchSummary
  scheduledStart: string
  scheduledEnd: string
  status: AppointmentStatus
  reason?: string | null
  notes?: string | null
  linkedVisitId?: ID | null
  statusBadge: StatusBadgeData
  nextAction: NextActionData
  createdAt: string
  updatedAt: string
}
AppointmentListItem
type AppointmentListItem = {
  id: ID
  appointmentCode: string
  patient: PatientSummary
  doctor: DoctorSummary
  department: DepartmentSummary
  scheduledStart: string
  scheduledEnd: string
  status: AppointmentStatus
  statusBadge: StatusBadgeData
  nextAction: NextActionData
}
Visit Contracts
VisitWorkflowStatus
type VisitWorkflowStatus =
  | "intake_created"
  | "doctor_assigned"
  | "queued_for_doctor"
  | "with_doctor"
  | "awaiting_lab"
  | "lab_in_progress"
  | "awaiting_radiology"
  | "radiology_in_progress"
  | "awaiting_procedure"
  | "procedure_in_progress"
  | "awaiting_doctor_review"
  | "consultation_completed"
  | "billing_pending"
  | "partially_paid"
  | "paid"
  | "completed"
  | "cancelled"
VisitSummary
type VisitSummary = {
  id: ID
  visitCode: string
  patient: PatientSummary
  doctor?: DoctorSummary | null
  department?: DepartmentSummary | null
  workflowStatus: VisitWorkflowStatus
  workflowBadge: StatusBadgeData
  nextAction: NextActionData
  createdAt: string
}
VisitListItem
type VisitListItem = {
  id: ID
  visitCode: string
  patient: PatientSummary
  doctor?: DoctorSummary | null
  department?: DepartmentSummary | null
  reason?: string | null
  workflowStatus: VisitWorkflowStatus
  workflowBadge: StatusBadgeData
  nextAction: NextActionData
  invoiceStatus?: InvoiceStatus | null
  invoiceBadge?: StatusBadgeData | null
  createdAt: string
  updatedAt: string
}
VisitDetailResponse
type VisitDetailResponse = {
  visit: Visit
  consultation?: Consultation | null
  labOrders: LabOrderSummary[]
  radiologyOrders: RadiologyOrderSummary[]
  procedureOrders: ProcedureOrderSummary[]
  invoice?: InvoiceSummary | null
  documents: DocumentSummary[]
  timeline: TimelineEvent[]
}
Visit
type Visit = {
  id: ID
  visitCode: string
  patient: PatientSummary
  branch: BranchSummary
  department?: DepartmentSummary | null
  doctor?: DoctorSummary | null
  reason?: string | null
  visitType: "walk_in" | "appointment" | "follow_up" | "emergency"
  workflowStatus: VisitWorkflowStatus
  workflowBadge: StatusBadgeData
  nextAction: NextActionData
  appointmentId?: ID | null
  createdBy?: UserSummary | null
  createdAt: string
  updatedAt: string
}
Consultation Contracts
ConsultationStatus
type ConsultationStatus =
  | "not_started"
  | "in_progress"
  | "waiting_for_results"
  | "reviewing_results"
  | "completed"
  | "cancelled"
Consultation
type Consultation = {
  id: ID
  visitId: ID
  patient: PatientSummary
  doctor: DoctorSummary
  status: ConsultationStatus
  statusBadge: StatusBadgeData
  chiefComplaint?: string | null
  vitals?: Vitals | null
  examination?: string | null
  diagnosisText?: string | null
  plan?: string | null
  doctorNote?: string | null
  startedAt?: string | null
  completedAt?: string | null
  updatedAt: string
}
Vitals
type Vitals = {
  temperature?: number | null
  bloodPressure?: string | null
  heartRate?: number | null
  respiratoryRate?: number | null
  spo2?: number | null
  weightKg?: number | null
  heightCm?: number | null
}
Lab Contracts
LabOrderStatus
type LabOrderStatus =
  | "ordered"
  | "sample_pending"
  | "sample_collected"
  | "in_progress"
  | "result_entered"
  | "verified"
  | "released"
  | "reviewed_by_doctor"
  | "cancelled"
LabOrderSummary
type LabOrderSummary = {
  id: ID
  labOrderCode: string
  visitId: ID
  patient: PatientSummary
  requestedBy: DoctorSummary
  status: LabOrderStatus
  statusBadge: StatusBadgeData
  nextAction: NextActionData
  priority: "routine" | "urgent" | "stat"
  testNames: string[]
  createdAt: string
}
LabOrderDetailResponse
type LabOrderDetailResponse = {
  order: LabOrder
  results: LabResult[]
  timeline: TimelineEvent[]
}
LabOrder
type LabOrder = {
  id: ID
  labOrderCode: string
  visitId: ID
  patient: PatientSummary
  requestedBy: DoctorSummary
  status: LabOrderStatus
  statusBadge: StatusBadgeData
  nextAction: NextActionData
  priority: "routine" | "urgent" | "stat"
  tests: LabOrderItem[]
  sample?: LabSample | null
  notes?: string | null
  createdAt: string
  updatedAt: string
}
LabOrderItem
type LabOrderItem = {
  id: ID
  testCode: string
  testName: string
  category?: string | null
  status: LabOrderStatus
  result?: LabResult | null
}
LabSample
type LabSample = {
  id: ID
  sampleCode: string
  sampleType: string
  collectedAt?: string | null
  collectedBy?: UserSummary | null
}
LabResult
type LabResult = {
  id: ID
  testCode: string
  testName: string
  value?: string | number | null
  unit?: string | null
  referenceRange?: string | null
  flag?: "low" | "normal" | "high" | "critical" | null
  comment?: string | null
  enteredBy?: UserSummary | null
  verifiedBy?: UserSummary | null
  enteredAt?: string | null
  verifiedAt?: string | null
}
LabResultSummary
type LabResultSummary = {
  id: ID
  labOrderCode: string
  testNames: string[]
  status: LabOrderStatus
  statusBadge: StatusBadgeData
  releasedAt?: string | null
}
Radiology Contracts
RadiologyOrderStatus
type RadiologyOrderStatus =
  | "ordered"
  | "scheduled"
  | "patient_arrived"
  | "imaging_in_progress"
  | "image_captured"
  | "report_drafted"
  | "report_verified"
  | "released"
  | "reviewed_by_doctor"
  | "cancelled"
RadiologyOrderSummary
type RadiologyOrderSummary = {
  id: ID
  radiologyOrderCode: string
  visitId: ID
  patient: PatientSummary
  requestedBy: DoctorSummary
  serviceName: string
  status: RadiologyOrderStatus
  statusBadge: StatusBadgeData
  nextAction: NextActionData
  scheduledAt?: string | null
  createdAt: string
}
RadiologyOrder
type RadiologyOrder = {
  id: ID
  radiologyOrderCode: string
  visitId: ID
  patient: PatientSummary
  requestedBy: DoctorSummary
  serviceName: string
  status: RadiologyOrderStatus
  statusBadge: StatusBadgeData
  nextAction: NextActionData
  clinicalIndication?: string | null
  scheduledAt?: string | null
  report?: RadiologyReport | null
  attachments: DocumentSummary[]
  createdAt: string
  updatedAt: string
}
RadiologyReport
type RadiologyReport = {
  id: ID
  findings?: string | null
  impression?: string | null
  draftedBy?: UserSummary | null
  verifiedBy?: UserSummary | null
  draftedAt?: string | null
  verifiedAt?: string | null
}
Procedure Contracts
ProcedureOrderStatus
type ProcedureOrderStatus =
  | "ordered"
  | "scheduled"
  | "ready"
  | "in_progress"
  | "completed"
  | "reviewed_by_doctor"
  | "cancelled"
ProcedureOrderSummary
type ProcedureOrderSummary = {
  id: ID
  procedureOrderCode: string
  visitId: ID
  patient: PatientSummary
  procedureName: string
  status: ProcedureOrderStatus
  statusBadge: StatusBadgeData
  nextAction: NextActionData
  scheduledAt?: string | null
  createdAt: string
}
Billing Contracts
InvoiceStatus
type InvoiceStatus =
  | "draft"
  | "issued"
  | "partially_paid"
  | "paid"
  | "void"
  | "refunded"
  | "cancelled"
InvoiceSummary
type InvoiceSummary = {
  id: ID
  invoiceCode: string
  patient: PatientSummary
  visitId?: ID | null
  total: Money
  paid: Money
  balance: Money
  status: InvoiceStatus
  statusBadge: StatusBadgeData
  nextAction: NextActionData
  issuedAt?: string | null
}
InvoiceDetailResponse
type InvoiceDetailResponse = {
  invoice: Invoice
  payments: Payment[]
  refunds: Refund[]
  timeline: TimelineEvent[]
}
Invoice
type Invoice = {
  id: ID
  invoiceCode: string
  patient: PatientSummary
  visitId?: ID | null
  status: InvoiceStatus
  statusBadge: StatusBadgeData
  nextAction: NextActionData
  items: InvoiceItem[]
  subtotal: Money
  discount: Money
  total: Money
  paid: Money
  balance: Money
  issuedBy?: UserSummary | null
  issuedAt?: string | null
  createdAt: string
  updatedAt: string
}
InvoiceItem
type InvoiceItem = {
  id: ID
  serviceCode: string
  serviceName: string
  department?: DepartmentSummary | null
  quantity: number
  unitPrice: Money
  total: Money
}
Payment
type Payment = {
  id: ID
  paymentCode: string
  invoiceId: ID
  amount: Money
  method: "cash" | "card" | "bank_transfer" | "insurance" | "corporate" | "mixed"
  status: "pending" | "recorded" | "failed" | "refunded" | "cancelled"
  referenceNumber?: string | null
  recordedBy?: UserSummary | null
  recordedAt: string
  notes?: string | null
}
Refund
type Refund = {
  id: ID
  refundCode: string
  paymentId: ID
  invoiceId: ID
  amount: Money
  reason: string
  approvedBy?: UserSummary | null
  recordedBy?: UserSummary | null
  recordedAt: string
}
Document Contracts
DocumentSummary
type DocumentSummary = {
  id: ID
  documentCode: string
  title: string
  type:
    | "medical_certificate"
    | "consent_form"
    | "lab_report"
    | "radiology_report"
    | "invoice"
    | "receipt"
    | "other"
  fileUrl?: string | null
  createdAt: string
  createdBy?: UserSummary | null
}
Workspace Contracts
WorkspaceSummaryItem
type WorkspaceSummaryItem = {
  key: string
  label: string
  count: number
  tone?: "neutral" | "info" | "warning" | "success" | "danger" | "accent"
  href?: string
}
QueueSectionData
type QueueSectionData<T> = {
  key: string
  title: string
  description?: string
  count: number
  items: T[]
}
Reception Workspace Contract
type ReceptionWorkspaceResponse = {
  summary: WorkspaceSummaryItem[]
  queues: {
    needsAction: QueueSectionData<VisitListItem>
    inProgress: QueueSectionData<VisitListItem>
    billingAndClosing: QueueSectionData<VisitListItem>
    closedToday: QueueSectionData<VisitListItem>
  }
  rightPanel: {
    todayAppointments: AppointmentListItem[]
    recentRegistrations: PatientListItem[]
    delayedCases: VisitListItem[]
  }
}
Doctor Workspace Contract
type DoctorWorkspaceResponse = {
  summary: WorkspaceSummaryItem[]
  queues: {
    myQueue: QueueSectionData<VisitListItem>
    activeEncounters: QueueSectionData<VisitListItem>
    needsReview: QueueSectionData<VisitListItem>
    completedToday: QueueSectionData<VisitListItem>
  }
  rightPanel: {
    todayAppointments: AppointmentListItem[]
    urgentCases: VisitListItem[]
    recentResults: LabResultSummary[]
  }
}
Lab Workspace Contract
type LabWorkspaceResponse = {
  summary: WorkspaceSummaryItem[]
  queues: {
    sampleCollection: QueueSectionData<LabOrderSummary>
    processing: QueueSectionData<LabOrderSummary>
    resultEntry: QueueSectionData<LabOrderSummary>
    verification: QueueSectionData<LabOrderSummary>
    released: QueueSectionData<LabOrderSummary>
  }
  rightPanel: {
    urgentTests: LabOrderSummary[]
    delayedSamples: LabOrderSummary[]
    equipmentWarnings: string[]
    reagentWarnings: string[]
  }
}
Cashier Workspace Contract
type CashierWorkspaceResponse = {
  summary: WorkspaceSummaryItem[]
  queues: {
    needsBillingAction: QueueSectionData<InvoiceSummary>
    awaitingPayment: QueueSectionData<InvoiceSummary>
    partialPayments: QueueSectionData<InvoiceSummary>
    settledToday: QueueSectionData<InvoiceSummary>
    voidOrCancelled: QueueSectionData<InvoiceSummary>
  }
  rightPanel: {
    shiftTotal: Money
    cashTotal: Money
    cardTotal: Money
    recentPayments: Payment[]
    highPriorityUnpaid: InvoiceSummary[]
  }
}
Mock Data Rules
Mock data must use the same field names as the future API contracts.
Mock IDs should be strings.
Mock dates should use ISO strings.
Mock money must use the Money type.
Mock statuses must come from workflow docs.
Mock rows must include statusBadge and nextAction.
Mock workspace responses must include summary, queues, and rightPanel.
Mock detail responses must include entity, linked records, and timeline.
Do not use generic names like “Test Patient”.
Use realistic Uzbek/Central Asian names and clinic examples.
Suggested Mock Naming

Patients:

Aliyev Sardor
Karimova Madina
Tursunov Javohir
Nazarova Dilnoza
Ergashev Bekzod
Yusupova Malika

Doctors:

Dr. Akmal Rahimov — Cardiologist
Dr. Sevara Karimova — Neurologist
Dr. Nodir Xasanov — Therapist
Dr. Dilfuza Tohirova — Endocrinologist

Departments:

Therapy
Cardiology
Neurology
Endocrinology
Laboratory
Radiology
Initial Frontend File Suggestions

Types:

lib/types/shared.ts
lib/types/patients.ts
lib/types/appointments.ts
lib/types/visits.ts
lib/types/clinical.ts
lib/types/lab.ts
lib/types/radiology.ts
lib/types/billing.ts
lib/types/workspaces.ts

Mock data:

lib/mock/shared.ts
lib/mock/patients.ts
lib/mock/appointments.ts
lib/mock/visits.ts
lib/mock/lab.ts
lib/mock/billing.ts
lib/mock/workspaces.ts

Workflow helpers:

lib/workflow/status-tones.ts
lib/workflow/visit-workflow.ts
lib/workflow/appointment-workflow.ts
lib/workflow/lab-workflow.ts
lib/workflow/invoice-workflow.ts

API client placeholder:

lib/api/client.ts
lib/api/mock-client.ts
Backend Compatibility Notes

Django REST Framework can later expose:

/api/patients/
/api/patients/{id}/
/api/appointments/
/api/appointments/{id}/
/api/visits/
/api/visits/{id}/
/api/workspaces/reception/
/api/workspaces/doctor/
/api/workspaces/lab/
/api/workspaces/cashier/
/api/lab/orders/
/api/lab/orders/{id}/
/api/billing/invoices/
/api/billing/invoices/{id}/

Frontend should call mock client first, but the function names should match future API operations.

Example:

getReceptionWorkspace()
getDoctorWorkspace()
getVisitDetail(id)
getPatientDetail(id)
getLabOrderDetail(id)
getInvoiceDetail(id)

Later these functions can switch from mock data to real HTTP calls.