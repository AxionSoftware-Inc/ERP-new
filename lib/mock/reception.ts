import type { AppointmentStatus } from "../types/appointments";
import type {
  ReceptionCheckInItem,
  ReceptionCheckInWorkspaceResponse,
  ReceptionDelayedCase,
  ReceptionDoctorAvailability,
  ReceptionIntakeContext,
  ReceptionPatientSearchResponse,
  ReceptionPatientSearchResult,
  ReceptionPriority,
  ReceptionQueueControlResponse,
  ReceptionQueueItem,
  ReceptionServiceOption,
  ReceptionShiftSummary,
  ReceptionShiftSummaryResponse,
  ReceptionWalkInItem,
  ReceptionWalkInsWorkspaceResponse,
} from "../types/reception";
import type { NextActionData, TimelineEvent } from "../types/shared";
import type { VisitListItem, VisitSummary } from "../types/visits";
import { getAppointmentStatusBadge } from "../workflow/appointment-workflow";
import { getVisitNextActionForRole } from "../workflow/visit-workflow";
import { mockAppointmentListItems } from "./appointments";
import { mockPatientListItems } from "./patients";
import { createMoney, daysAgo, hoursAgo, mockDepartments, mockDoctors, mockUsers } from "./shared";
import { mockVisitListItems } from "./visits";

const fixedNow = new Date("2026-05-02T12:00:00.000Z").getTime();

const extraDoctor = {
  id: "doc-gavhar",
  fullName: "Dr. Gavhar Sodiqova",
  specialization: "Pediatrician",
  department: mockDepartments[0],
};

const receptionDoctors = [...mockDoctors, extraDoctor];

export const mockReceptionDoctorAvailability: ReceptionDoctorAvailability[] = receptionDoctors.map((doctor, index) => ({
  doctor,
  department: doctor.department ?? mockDepartments[index % mockDepartments.length],
  status: (["available", "busy", "unavailable", "off_shift", "available", "busy"] as const)[index],
  currentQueueCount: [2, 6, 0, 0, 3, 5][index],
  estimatedWaitMinutes: [12, 38, 0, 0, 18, 32][index],
  currentPatient: index === 1 || index === 5 ? mockPatientListItems[index].activeVisitId ? mockPatientListItems[index] : null : null,
  room: ["201", "305", "104", null, "412", "208"][index],
  nextAvailableAt: index === 1 || index === 5 ? hoursAgo(-1 - index) : null,
}));

export const mockReceptionServiceOptions: ReceptionServiceOption[] = [
  {
    id: "svc-primary-consult",
    serviceCode: "CONS-001",
    serviceName: "Primary consultation",
    department: mockDepartments[0],
    price: createMoney(150000),
    estimatedDurationMinutes: 20,
    isActive: true,
  },
  {
    id: "svc-repeat-consult",
    serviceCode: "CONS-002",
    serviceName: "Repeat consultation",
    department: mockDepartments[0],
    price: createMoney(90000),
    estimatedDurationMinutes: 15,
    isActive: true,
  },
  {
    id: "svc-cardio-consult",
    serviceCode: "CARD-001",
    serviceName: "Cardiology consultation",
    department: mockDepartments[1],
    price: createMoney(220000),
    estimatedDurationMinutes: 30,
    isActive: true,
  },
  {
    id: "svc-neuro-consult",
    serviceCode: "NEUR-001",
    serviceName: "Neurology consultation",
    department: mockDepartments[2],
    price: createMoney(210000),
    estimatedDurationMinutes: 30,
    isActive: true,
  },
  {
    id: "svc-endo-consult",
    serviceCode: "ENDO-001",
    serviceName: "Endocrinology consultation",
    department: mockDepartments[3],
    price: createMoney(200000),
    estimatedDurationMinutes: 25,
    isActive: true,
  },
  {
    id: "svc-lab-package-basic",
    serviceCode: "LAB-101",
    serviceName: "Basic lab package",
    department: mockDepartments[4],
    price: createMoney(180000),
    estimatedDurationMinutes: 45,
    isActive: true,
  },
  {
    id: "svc-ecg",
    serviceCode: "CARD-ECG",
    serviceName: "ECG",
    department: mockDepartments[1],
    price: createMoney(80000),
    estimatedDurationMinutes: 10,
    isActive: true,
  },
  {
    id: "svc-ultrasound",
    serviceCode: "RAD-USG",
    serviceName: "Ultrasound",
    department: mockDepartments[5],
    price: createMoney(160000),
    estimatedDurationMinutes: 20,
    isActive: true,
  },
];

export const mockReceptionQueueItems: ReceptionQueueItem[] = mockVisitListItems.map((visit, index) => ({
  ...visit,
  queueNumber: `Q-${String(index + 1).padStart(3, "0")}`,
  waitingMinutes: [8, 16, 34, 22, 41, 55, 19, 47, 28, 36, 52, 13, 5, 0][index] ?? 10,
  visitAgeMinutes: minutesSince(visit.createdAt),
  lastMovedAt: visit.updatedAt,
  priority: resolvePriority(visit, index),
  ownerRole: resolveOwnerRole(visit),
  slaState: resolveSlaState([8, 16, 34, 22, 41, 55, 19, 47, 28, 36, 52, 13, 5, 0][index] ?? 10),
}));

export const mockReceptionPatientSearchResults: ReceptionPatientSearchResult[] = mockPatientListItems.slice(0, 6).map((patient, index) => {
  const activeVisit = patient.activeVisitId ? toVisitSummary(mockVisitListItems.find((visit) => visit.id === patient.activeVisitId)) : null;
  const patientVisits = mockVisitListItems.filter((visit) => visit.patient.id === patient.id);
  const lastVisit = toVisitSummary(patientVisits[patientVisits.length - 1] ?? mockVisitListItems[index]);

  return {
    patient,
    activeVisit,
    lastVisit,
    balance: patient.balance,
    riskFlags: patient.riskFlags ?? [],
    duplicateScore: index === 1 ? 86 : undefined,
    duplicateReason: index === 1 ? "Similar phone and matching first name found in archive." : null,
    nextActions: [
      { label: "Open profile", cta: "Open profile", targetRoute: `/app/patients/${patient.id}` },
      { label: "Create visit", cta: "Create visit", targetRoute: "/app/reception/intake/new" },
      { label: "Create appointment", cta: "Create appointment", targetRoute: "/app/appointments/new" },
    ],
  };
});

export const mockReceptionCheckInItems: ReceptionCheckInItem[] = mockAppointmentListItems.map((appointment, index) => {
  const arrivalState = resolveArrivalState(appointment.status, index);
  const linkedVisit = appointment.status === "converted_to_visit" ? toVisitSummary(mockVisitListItems[3]) : null;

  return {
    ...appointment,
    statusBadge: getAppointmentStatusBadge(appointment.status),
    arrivalState,
    lateMinutes: arrivalState === "late" || arrivalState === "no_show_candidate" ? [12, 28, 45][index % 3] : undefined,
    linkedVisit,
    nextActions: buildCheckInActions(appointment.status, appointment.id, linkedVisit?.id),
  };
});

export const mockReceptionWalkInItems: ReceptionWalkInItem[] = [
  buildWalkIn("walkin-001", 0, "Chest discomfort", "urgent", "new", 7),
  buildWalkIn("walkin-002", 1, "Headache and dizziness", "normal", "waiting_assignment", 18),
  buildWalkIn("walkin-003", 2, "High glucose follow-up", "normal", "assigned", 24),
  buildWalkIn("walkin-004", 3, "Palpitations", "emergency", "queued", 9),
  buildWalkIn("walkin-005", 4, "Corporate annual check", "vip", "waiting_assignment", 14),
  buildWalkIn("walkin-006", 5, "Patient left before intake", "normal", "cancelled", 3),
];

export const mockReceptionDelayedCases: ReceptionDelayedCase[] = [
  buildDelayedCase("delay-001", 2, "waiting_for_doctor", 42, 20, "Doctor", "critical"),
  buildDelayedCase("delay-002", 4, "lab_pending", 58, 35, "Laboratory", "critical"),
  buildDelayedCase("delay-003", 6, "radiology_pending", 36, 25, "Radiology", "warning"),
  buildDelayedCase("delay-004", 9, "billing_pending", 31, 15, "Cashier", "warning"),
  buildDelayedCase("delay-005", 11, "paid_not_closed", 22, 10, "Reception", "warning"),
  buildDelayedCase("delay-006", 1, "no_show_candidate", 29, 10, "Reception", "critical"),
];

export const mockReceptionShiftSummary: ReceptionShiftSummary = {
  registeredPatients: 18,
  createdVisits: 34,
  checkedInAppointments: 11,
  walkIns: 9,
  noShows: 3,
  cancelledAppointments: 2,
  queuedToDoctor: 21,
  sentToBilling: 14,
  completedVisits: 12,
  unresolvedCases: 7,
  delayedCases: mockReceptionDelayedCases.length,
};

export const mockReceptionIntakeContext: ReceptionIntakeContext = {
  recentPatients: mockPatientListItems.slice(0, 6),
  todayAppointments: mockReceptionCheckInItems,
  doctorAvailability: mockReceptionDoctorAvailability,
  serviceOptions: mockReceptionServiceOptions,
  warnings: [
    "Two doctors are currently busy with queues above 5 patients.",
    "Cardiology has elevated walk-in demand this shift.",
    "Verify duplicate patients before creating a new profile.",
  ],
};

export const mockReceptionPatientSearchResponse: ReceptionPatientSearchResponse = {
  query: "",
  results: mockReceptionPatientSearchResults,
  possibleDuplicates: mockReceptionPatientSearchResults.filter((result) => (result.duplicateScore ?? 0) > 0),
  recentPatients: mockPatientListItems.slice(0, 5),
};

export const mockReceptionCheckInWorkspace: ReceptionCheckInWorkspaceResponse = {
  summary: [
    { key: "scheduled", label: "Scheduled today", count: mockReceptionCheckInItems.length, tone: "info" },
    { key: "arrived", label: "Arrived", count: countCheckIns("arrived"), tone: "warning" },
    { key: "checked_in", label: "Checked in", count: countCheckIns("checked_in"), tone: "accent" },
    { key: "late", label: "Late", count: countCheckIns("late") + countCheckIns("no_show_candidate"), tone: "danger" },
  ],
  queues: {
    scheduled: buildQueue("scheduled", "Scheduled / confirmed", "Patients expected today.", mockReceptionCheckInItems.filter((item) => item.arrivalState === "not_arrived")),
    arrived: buildQueue("arrived", "Arrived", "Patients at clinic waiting for check-in.", mockReceptionCheckInItems.filter((item) => item.arrivalState === "arrived")),
    checkedIn: buildQueue("checked_in", "Checked in", "Appointments ready to convert into visits.", mockReceptionCheckInItems.filter((item) => item.arrivalState === "checked_in")),
    lateOrNoShow: buildQueue("late_or_no_show", "Late / no-show risk", "Patients beyond scheduled arrival window.", mockReceptionCheckInItems.filter((item) => item.arrivalState === "late" || item.arrivalState === "no_show_candidate")),
  },
  rightPanel: {
    doctorSchedule: mockReceptionDoctorAvailability,
    lateArrivals: mockReceptionCheckInItems.filter((item) => item.arrivalState === "late" || item.arrivalState === "no_show_candidate"),
    upcomingNextHour: mockReceptionCheckInItems.slice(0, 4),
  },
};

export const mockReceptionWalkInsWorkspace: ReceptionWalkInsWorkspaceResponse = {
  summary: [
    { key: "new_walkins", label: "New walk-ins", count: countWalkIns("new"), tone: "warning" },
    { key: "waiting_assignment", label: "Waiting assignment", count: countWalkIns("waiting_assignment"), tone: "info" },
    { key: "queued", label: "Assigned / queued", count: countWalkIns("assigned") + countWalkIns("queued"), tone: "accent" },
    { key: "delayed", label: "Delayed", count: mockReceptionWalkInItems.filter((item) => item.waitingMinutes > 20).length, tone: "danger" },
  ],
  quickContext: {
    doctorAvailability: mockReceptionDoctorAvailability,
    serviceOptions: mockReceptionServiceOptions,
  },
  queues: {
    newWalkIns: buildQueue("new_walkins", "New walk-ins", "Patients just arrived without appointment.", mockReceptionWalkInItems.filter((item) => item.status === "new")),
    waitingAssignment: buildQueue("waiting_assignment", "Waiting assignment", "Walk-ins waiting for department or doctor.", mockReceptionWalkInItems.filter((item) => item.status === "waiting_assignment")),
    assignedOrQueued: buildQueue("assigned_or_queued", "Assigned / queued", "Walk-ins already routed into doctor queue.", mockReceptionWalkInItems.filter((item) => item.status === "assigned" || item.status === "queued")),
  },
  rightPanel: {
    doctorLoad: mockReceptionDoctorAvailability,
    delayedWalkIns: mockReceptionWalkInItems.filter((item) => item.waitingMinutes > 20),
  },
};

export const mockReceptionQueueControl: ReceptionQueueControlResponse = {
  summary: [
    { key: "priority", label: "Priority cases", count: mockReceptionQueueItems.filter((item) => item.priority !== "normal").length, tone: "warning" },
    { key: "waiting", label: "Waiting > 30m", count: mockReceptionQueueItems.filter((item) => (item.waitingMinutes ?? 0) > 30).length, tone: "danger" },
    { key: "billing", label: "Billing / closing", count: mockReceptionQueueItems.filter((item) => ["consultation_completed", "billing_pending", "partially_paid", "paid"].includes(item.workflowStatus)).length, tone: "accent" },
    { key: "unresolved", label: "Unresolved", count: mockReceptionDelayedCases.length, tone: "danger" },
  ],
  queues: {
    byPriority: buildQueue("by_priority", "By priority", "Urgent, emergency, and VIP cases first.", [...mockReceptionQueueItems].sort((a, b) => priorityRank(b.priority) - priorityRank(a.priority))),
    byWaitingTime: buildQueue("by_waiting_time", "By waiting time", "Longest waiting patients first.", [...mockReceptionQueueItems].sort((a, b) => (b.waitingMinutes ?? 0) - (a.waitingMinutes ?? 0))),
    billingOrClosing: buildQueue("billing_or_closing", "Billing / closing", "Visits that need cashier or final close.", mockReceptionQueueItems.filter((item) => ["consultation_completed", "billing_pending", "partially_paid", "paid"].includes(item.workflowStatus))),
    unresolved: buildQueue("unresolved", "Unresolved", "Cases that need front desk escalation.", mockReceptionQueueItems.filter((item) => item.slaState !== "normal")),
  },
  rightPanel: {
    delayedCases: mockReceptionDelayedCases,
    doctorLoad: mockReceptionDoctorAvailability,
    bottlenecks: ["Cardiology queue exceeds 30 minutes.", "Two paid visits are not closed.", "Lab pending cases need ownership confirmation."],
  },
};

export const mockReceptionShiftSummaryResponse: ReceptionShiftSummaryResponse = {
  summary: mockReceptionShiftSummary,
  unresolvedCases: mockReceptionDelayedCases,
  recentActions: buildRecentActions(),
};

function buildWalkIn(
  id: string,
  patientIndex: number,
  reason: string,
  priority: ReceptionPriority,
  status: ReceptionWalkInItem["status"],
  waitingMinutes: number,
): ReceptionWalkInItem {
  const visit = status === "queued" || status === "assigned" ? toVisitSummary(mockVisitListItems[patientIndex]) : null;
  return {
    id,
    patient: mockPatientListItems[patientIndex],
    visit,
    reason,
    priority,
    requestedDepartment: mockDepartments[patientIndex % 4],
    requestedDoctor: mockDoctors[patientIndex % mockDoctors.length],
    status,
    waitingMinutes,
    nextAction: buildWalkInAction(status),
    createdAt: hoursAgo(Math.max(1, Math.ceil(waitingMinutes / 10))),
  };
}

function buildDelayedCase(
  id: string,
  visitIndex: number,
  delayType: ReceptionDelayedCase["delayType"],
  waitingMinutes: number,
  expectedMinutes: number,
  owner: string,
  severity: ReceptionDelayedCase["severity"],
): ReceptionDelayedCase {
  const visit = mockVisitListItems[visitIndex];
  return {
    id,
    visit,
    delayType,
    waitingMinutes,
    expectedMinutes,
    owner,
    severity,
    nextAction: getVisitNextActionForRole(visit, owner === "Cashier" ? "cashier" : owner === "Doctor" ? "doctor" : "receptionist"),
  };
}

function buildQueue<T>(key: string, title: string, description: string, items: T[]) {
  return {
    key,
    title,
    description,
    count: items.length,
    items,
  };
}

function buildCheckInActions(status: AppointmentStatus, appointmentId: string, visitId?: string): NextActionData[] {
  if (status === "scheduled") {
    return [
      { label: "Confirm appointment", cta: "Confirm", targetRoute: `/app/appointments/${appointmentId}` },
      { label: "Mark arrived", cta: "Mark arrived", targetRoute: `/app/appointments/${appointmentId}` },
    ];
  }

  if (status === "confirmed" || status === "arrived") {
    return [{ label: "Check in patient", cta: "Check in", targetRoute: `/app/appointments/${appointmentId}` }];
  }

  if (status === "checked_in") {
    return [{ label: "Convert to visit", cta: "Create visit", targetRoute: "/app/reception/intake/new" }];
  }

  if (status === "converted_to_visit") {
    return [{ label: "Open linked visit", cta: "Open visit", targetRoute: `/app/visits/${visitId ?? "visit-004"}` }];
  }

  return [{ label: "View appointment", cta: "View", targetRoute: `/app/appointments/${appointmentId}` }];
}

function buildWalkInAction(status: ReceptionWalkInItem["status"]): NextActionData {
  if (status === "new") return { label: "Create visit", cta: "Create visit", targetRoute: "/app/reception/intake/new" };
  if (status === "waiting_assignment") return { label: "Assign doctor", cta: "Assign doctor", targetRoute: "/app/reception/doctor-assignment" };
  if (status === "assigned") return { label: "Queue patient", cta: "Queue patient", targetRoute: "/app/reception/queue" };
  if (status === "queued") return { label: "Open visit", cta: "Open visit", targetRoute: "/app/visits/[id]" };
  return { label: "No action", cta: "View", targetRoute: "/app/reception/walk-ins" };
}

function toVisitSummary(visit?: VisitListItem): VisitSummary | null {
  if (!visit) return null;
  return {
    id: visit.id,
    visitCode: visit.visitCode,
    patient: visit.patient,
    doctor: visit.doctor,
    department: visit.department,
    workflowStatus: visit.workflowStatus,
    workflowBadge: visit.workflowBadge,
    nextAction: visit.nextAction,
    createdAt: visit.createdAt,
  };
}

function resolveArrivalState(status: AppointmentStatus, index: number): ReceptionCheckInItem["arrivalState"] {
  if (status === "arrived") return "arrived";
  if (status === "checked_in" || status === "converted_to_visit") return "checked_in";
  if (status === "no_show") return "no_show_candidate";
  if (status === "scheduled" && index % 2 === 1) return "late";
  return "not_arrived";
}

function resolvePriority(visit: VisitListItem, index: number): ReceptionPriority {
  if (visit.workflowStatus === "cancelled" || visit.workflowStatus === "completed") return "normal";
  if (visit.workflowStatus === "awaiting_doctor_review" || visit.workflowStatus === "paid") return "urgent";
  if (index === 3 || index === 10) return "vip";
  if (index === 0 || index === 6) return "emergency";
  return "normal";
}

function resolveOwnerRole(visit: VisitListItem): string {
  if (visit.workflowStatus.includes("lab")) return "lab_operator";
  if (visit.workflowStatus.includes("radiology")) return "radiology_operator";
  if (["consultation_completed", "billing_pending", "partially_paid"].includes(visit.workflowStatus)) return "cashier";
  if (["queued_for_doctor", "with_doctor", "awaiting_doctor_review"].includes(visit.workflowStatus)) return "doctor";
  return "receptionist";
}

function resolveSlaState(minutes: number): ReceptionQueueItem["slaState"] {
  if (minutes >= 45) return "breached";
  if (minutes >= 25) return "warning";
  return "normal";
}

function priorityRank(priority?: ReceptionPriority): number {
  if (priority === "emergency") return 4;
  if (priority === "vip") return 3;
  if (priority === "urgent") return 2;
  return 1;
}

function minutesSince(value: string): number {
  const timestamp = new Date(value).getTime();
  if (Number.isNaN(timestamp)) return 0;
  return Math.max(0, Math.round((fixedNow - timestamp) / 60000));
}

function countCheckIns(state: ReceptionCheckInItem["arrivalState"]): number {
  return mockReceptionCheckInItems.filter((item) => item.arrivalState === state).length;
}

function countWalkIns(status: ReceptionWalkInItem["status"]): number {
  return mockReceptionWalkInItems.filter((item) => item.status === status).length;
}

function buildRecentActions(): TimelineEvent[] {
  return [
    {
      id: "rec-shift-tl-001",
      entityType: "visit",
      entityId: "visit-001",
      eventType: "create",
      title: "Walk-in visit created",
      description: "Front desk created a walk-in visit and prepared doctor assignment.",
      actor: mockUsers[0],
      createdAt: hoursAgo(1),
    },
    {
      id: "rec-shift-tl-002",
      entityType: "appointment",
      entityId: "appt-003",
      eventType: "status_change",
      title: "Appointment checked in",
      actor: mockUsers[0],
      createdAt: hoursAgo(2),
    },
    {
      id: "rec-shift-tl-003",
      entityType: "visit",
      entityId: "visit-012",
      eventType: "status_change",
      title: "Paid visit ready to close",
      actor: mockUsers[3],
      createdAt: daysAgo(0, 11),
    },
  ];
}
