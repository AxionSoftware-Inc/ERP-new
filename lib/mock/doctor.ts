import type {
  DiagnosisEntry,
  DoctorActiveEncountersResponse,
  DoctorClinicalHistoryResponse,
  DoctorCommandBarAction,
  DoctorCompletedConsultationsResponse,
  DoctorCompletedItem,
  DoctorPriority,
  DoctorQueueResponse,
  DoctorReviewItem,
  DoctorReviewQueueResponse,
  DoctorTemplatesResponse,
  DoctorVisitDetailResponse,
  DoctorWorkItem,
  DoctorWorkspaceMetric,
  DoctorWorkspaceResponse,
  Prescription,
} from "../types/doctor";
import type { ConsultationStatus } from "../types/clinical";
import type { StatusBadgeData } from "../types/shared";
import type { VisitListItem } from "../types/visits";
import type { VisitSummary } from "../types/visits";
import { getConsultationStatusBadge } from "../workflow/consultation-workflow";
import { getMockConsultationByVisitId } from "./clinical";
import { getMockDocumentsForPatient, getMockDocumentsForVisit } from "./documents";
import { mockLabOrderSummaries, mockLabResultSummaries } from "./lab";
import { mockPatients } from "./patients";
import { mockRadiologyOrderSummaries } from "./radiology";
import { hoursAgo, mockDepartments, mockDoctors } from "./shared";
import { getMockVisitById, getMockVisitDetail, mockVisitListItems } from "./visits";

const primaryDoctor = mockDoctors[0];

export const mockDoctorTemplates = [
  { id: "tpl-soap-uri", type: "clinical_note", title: "URI / shamollash SOAP", favorite: true, updatedAt: hoursAgo(12) },
  { id: "tpl-htn-plan", type: "treatment_plan", title: "Gipertoniya nazorat rejasi", favorite: true, updatedAt: hoursAgo(20) },
  { id: "tpl-cbc-glu", type: "lab_order_set", title: "CBC + Glucose order set", favorite: false, updatedAt: hoursAgo(26) },
  { id: "tpl-us-abd", type: "radiology_order_set", title: "Qorin bo'shlig'i UZI", favorite: false, updatedAt: hoursAgo(30) },
  { id: "tpl-rx-htn", type: "prescription", title: "Amlodipin boshlang'ich retsepti", favorite: true, updatedAt: hoursAgo(40) },
  { id: "tpl-doc-conclusion", type: "document", title: "Shifokor xulosasi", favorite: false, updatedAt: hoursAgo(44) },
] satisfies DoctorTemplatesResponse["templates"];

export const mockMedicationCatalog = [
  { id: "med-amlodipine", name: "Amlodipin", form: "tablet", strength: "5 mg", defaultRoute: "oral" },
  { id: "med-paracetamol", name: "Paracetamol", form: "tablet", strength: "500 mg", defaultRoute: "oral" },
  { id: "med-ors", name: "ORS", form: "powder", strength: "sachet", defaultRoute: "oral" },
];

export const mockDoctorPrescriptions: Prescription[] = [
  {
    id: "rx-doctor-001",
    visitId: "visit-009",
    patient: mockPatients[0],
    doctor: primaryDoctor,
    status: "signed",
    statusBadge: badge("Signed", "success"),
    signedAt: hoursAgo(2),
    items: [
      {
        id: "rx-line-001",
        medicationName: "Amlodipin",
        dose: "5 mg",
        frequency: "Kuniga 1 marta",
        duration: "30 kun",
        route: "oral",
        instructions: "Ertalab ovqatdan keyin",
        quantity: "30 tablet",
        substitutionAllowed: true,
      },
    ],
  },
];

export function getMockDoctorWorkspace(): DoctorWorkspaceResponse {
  const myQueue = getDoctorWorkItems(["queued_for_doctor"]);
  const activeEncounters = getDoctorWorkItems(["with_doctor"]);
  const needsReview = getDoctorReviewItems();
  const completedToday = getDoctorCompletedItems();
  const delayed = [...myQueue, ...activeEncounters].filter((item) => item.waitingMinutes >= 30);
  const focus = [...needsReview.slice(0, 1).map(reviewToWorkItem), ...delayed, ...activeEncounters].slice(0, 3);

  return {
    doctor: primaryDoctor,
    metrics: buildMetrics(myQueue.length, activeEncounters.length, needsReview.length, completedToday.length, delayed.length),
    focus,
    queues: {
      myQueue,
      activeEncounters,
      needsReview,
      completedToday,
    },
    rightRail: {
      todaySchedule: mockVisitListItems.slice(0, 5).map((visit, index) => ({
        id: `sched-${visit.id}`,
        appointment: {
          id: `appt-doctor-${index + 1}`,
          appointmentCode: `A-2026-D${index + 1}`,
          patient: visit.patient,
          doctor: visit.doctor ?? primaryDoctor,
          department: visit.department ?? mockDepartments[0],
          status: index % 3 === 0 ? "arrived" : "confirmed",
          statusBadge: badge(index % 3 === 0 ? "Arrived" : "Confirmed", index % 3 === 0 ? "success" : "info"),
          scheduledStart: visit.createdAt,
          scheduledEnd: hoursAgo(index),
          reason: visit.reason,
          nextAction: { label: "Open", cta: "Open", targetRoute: `/app/doctor/visits/${visit.id}` },
        },
        room: `Room ${index + 1}`,
        availabilityStatus: index === 2 ? "busy" : "available",
        nextAction: { label: "Open appointment", cta: "Open" },
      })),
      urgentCases: [...myQueue, ...activeEncounters].filter((item) => item.priority !== "routine"),
      recentResults: needsReview.slice(0, 4),
      controls: {
        acceptingPatients: true,
        currentRoom: "Room 2",
        nextBreakAt: hoursAgo(-2),
        unreadTasks: needsReview.length,
      },
    },
  };
}

export function getMockDoctorQueue(): DoctorQueueResponse {
  return {
    filters: {
      priorities: ["routine", "urgent", "stat"],
      departments: mockDepartments,
      visitTypes: ["walk_in", "appointment", "follow_up", "emergency"],
      waitingMinuteBuckets: ["0-15", "15-30", "30-60", "60+"],
    },
    items: getDoctorWorkItems(["queued_for_doctor"]),
  };
}

export function getMockDoctorActiveEncounters(): DoctorActiveEncountersResponse {
  return { items: getDoctorWorkItems(["with_doctor"]) };
}

export function getMockDoctorReviewQueue(): DoctorReviewQueueResponse {
  const items = getDoctorReviewItems();
  return {
    criticalCount: items.filter((item) => item.flag === "critical").length,
    abnormalCount: items.filter((item) => item.flag === "abnormal").length,
    delayedCount: items.filter((item) => item.delayedMinutes > 30).length,
    items,
  };
}

export function getMockDoctorCompletedConsultations(): DoctorCompletedConsultationsResponse {
  return { items: getDoctorCompletedItems() };
}

export function getMockDoctorVisitDetail(visitId: string): DoctorVisitDetailResponse | undefined {
  const detail = getMockVisitDetail(visitId);
  const visit = getMockVisitById(visitId);
  if (!detail || !visit) return undefined;
  const consultation = detail.consultation ?? getMockConsultationByVisitId(visitId) ?? null;
  const prescription = mockDoctorPrescriptions.find((item) => item.visitId === visitId) ?? null;

  return {
    visit,
    patient: visit.patient,
    doctor: visit.doctor ?? primaryDoctor,
    consultation: {
      consultation,
      soap: {
        subjective: consultation?.chiefComplaint ?? visit.reason ?? null,
        objective: consultation?.examination ?? null,
        assessment: consultation?.diagnosisText ?? null,
        plan: consultation?.plan ?? null,
        notes: consultation?.doctorNote ?? null,
      },
      vitals: consultation?.vitals ?? null,
      vitalsReviewed: Boolean(consultation?.vitals),
      diagnoses: buildDiagnoses(consultation?.diagnosisText),
      followUp: {
        followUpDate: hoursAgo(-72),
        lifestyleRecommendation: "Tuz iste'molini kamaytirish, qon bosimini uyda kuzatish.",
        homeCareInstruction: "Holat yomonlashsa qayta murojaat qilish.",
      },
      lastSavedAt: consultation?.updatedAt ?? visit.updatedAt,
    },
    orders: {
      labOrders: detail.labOrders,
      radiologyOrders: detail.radiologyOrders,
      procedureOrders: detail.procedureOrders,
      nursingTasks: [
        { id: `nurse-${visitId}-vitals`, title: "Vitals review", status: "completed", priority: "routine", assignedTo: "Nurse" },
      ],
      referrals: [
        { id: `ref-${visitId}-cardio`, targetDepartment: "Kardiologiya", reason: "Qon bosimi nazorati", status: "draft" },
      ],
      orderSets: mockDoctorTemplates.filter((template) => template.type.includes("order")),
    },
    results: {
      labResults: detail.labOrders.map((order, index) => ({
        order,
        results: [
          {
            id: `result-${order.id}`,
            testCode: "CBC",
            testName: order.testNames[0] ?? "Lab test",
            value: index === 0 ? "Leykotsitlar 12.5" : "Normal",
            unit: "10^9/L",
            referenceRange: "4.0-9.0",
            flag: index === 0 ? "high" : "normal",
          },
        ],
        flag: index === 0 ? "abnormal" : "normal",
      })),
      radiologyReports: detail.radiologyOrders.map((order) => ({
        order,
        report: {
          id: `report-${order.id}`,
          findings: "Diffuz o'zgarishlar aniqlanmadi.",
          impression: "Patologik o'zgarish yo'q.",
        },
        flag: "normal",
      })),
      procedureResults: detail.procedureOrders.map((order) => ({
        order,
        completionNote: "Procedure completed.",
        flag: "normal",
      })),
      attachments: detail.documents,
    },
    prescription: {
      prescription,
      medicationCatalog: mockMedicationCatalog,
      templates: mockDoctorTemplates.filter((template) => template.type === "prescription"),
      recommendations: [
        { id: "rec-001", category: "lifestyle", text: "Kunlik yurish va qon bosimini monitoring qilish." },
        { id: "rec-002", category: "diet", text: "Tuz va shakar iste'molini kamaytirish." },
      ],
    },
    documents: {
      documents: detail.documents,
      availableTemplates: mockDoctorTemplates.filter((template) => template.type === "document"),
    },
    rightRail: {
      patientSummary: visit.patient,
      allergies: visit.patient.id === "patient-001" ? ["Penicillin"] : [],
      chronicConditions: visit.patient.id === "patient-001" ? ["Hypertension"] : [],
      currentMedications: prescription?.items.map((item) => item.medicationName) ?? [],
      previousVisits: mockVisitListItems
        .filter((item) => item.patient.id === visit.patient.id && item.id !== visit.id)
        .map(toVisitSummary),
      previousLabResults: mockLabResultSummaries,
      previousRadiologyReports: mockRadiologyOrderSummaries.slice(0, 3),
      invoiceContext: detail.invoice
        ? {
            status: detail.invoice.status,
            amountDue: detail.invoice.balance.formatted,
            canSendToBilling: visit.workflowStatus === "consultation_completed",
          }
        : null,
      documents: getMockDocumentsForPatient(visit.patient.id),
    },
    timeline: detail.timeline,
    commandBar: buildCommandBar(visit.workflowStatus, consultation?.status ?? "not_started"),
  };
}

export function getMockDoctorTemplates(): DoctorTemplatesResponse {
  return { templates: mockDoctorTemplates };
}

export function getMockDoctorClinicalHistory(patientId?: string): DoctorClinicalHistoryResponse {
  const patient = patientId ? mockPatients.find((item) => item.id === patientId) ?? null : null;
  const visits = mockVisitListItems.filter((visit) => !patientId || visit.patient.id === patientId).map(toVisitSummary);
  return {
    patient,
    visits,
    diagnoses: [
      { id: "dx-history-001", text: "Arterial gipertenziya", icd10Code: "I10", type: "primary" },
      { id: "dx-history-002", text: "O'tkir respirator infeksiya", icd10Code: "J06.9", type: "secondary" },
    ],
    labResults: mockLabResultSummaries,
    radiologyReports: mockRadiologyOrderSummaries.slice(0, 4),
    documents: patientId ? getMockDocumentsForPatient(patientId) : [],
    currentMedications: ["Amlodipin"],
    allergies: patientId === "patient-001" ? ["Penicillin"] : [],
    chronicConditions: patientId === "patient-001" ? ["Hypertension"] : [],
  };
}

function getDoctorWorkItems(statuses: readonly string[]): DoctorWorkItem[] {
  return mockVisitListItems
    .filter((visit) => statuses.includes(visit.workflowStatus))
    .map((visit, index) => toDoctorWorkItem(visit, index));
}

function toDoctorWorkItem(visit: VisitListItem, index = 0): DoctorWorkItem {
  const consultation = getMockConsultationByVisitId(visit.id);
  const consultationStatus = consultation?.status ?? (visit.workflowStatus === "queued_for_doctor" ? "not_started" : "in_progress");
  const priority: DoctorPriority = visit.workflowStatus === "awaiting_doctor_review" ? "urgent" : index % 5 === 0 ? "stat" : index % 2 === 0 ? "urgent" : "routine";
  return {
    id: `doctor-item-${visit.id}`,
    visitId: visit.id,
    visitCode: visit.visitCode,
    patient: visit.patient,
    doctor: visit.doctor ?? primaryDoctor,
    department: visit.department ?? null,
    reason: visit.reason,
    chiefComplaint: consultation?.chiefComplaint ?? visit.reason ?? null,
    workflowStatus: visit.workflowStatus,
    workflowBadge: visit.workflowBadge,
    consultationStatus,
    consultationBadge: getConsultationStatusBadge(consultationStatus),
    priority,
    queueNumber: `D-${String(index + 11).padStart(3, "0")}`,
    waitingMinutes: 12 + index * 17,
    visitAgeMinutes: 25 + index * 22,
    assignedAt: visit.createdAt,
    lastUpdatedAt: visit.updatedAt,
    pendingOrdersCount: mockLabOrderSummaries.filter((order) => order.visitId === visit.id).length + mockRadiologyOrderSummaries.filter((order) => order.visitId === visit.id).length,
    pendingResultsCount: visit.workflowStatus === "awaiting_doctor_review" ? 1 : 0,
    nextAction: primaryNextAction(visit.workflowStatus, visit.id),
  };
}

function getDoctorReviewItems(): DoctorReviewItem[] {
  const resultVisits = mockVisitListItems.filter((visit) => visit.workflowStatus === "awaiting_doctor_review");
  return resultVisits.flatMap((visit, index) => [
    {
      id: `review-lab-${visit.id}`,
      visitId: visit.id,
      visitCode: visit.visitCode,
      patient: visit.patient,
      resultType: "lab",
      serviceName: "CBC + Glucose",
      sourceCode: `LAB-${String(index + 1).padStart(4, "0")}`,
      flag: index === 0 ? "critical" : "abnormal",
      releasedAt: hoursAgo(index + 1),
      delayedMinutes: 18 + index * 25,
      reviewed: false,
      nextAction: { label: "Review result", cta: "Review", targetRoute: `/app/doctor/visits/${visit.id}/results` },
    },
  ]);
}

function getDoctorCompletedItems(): DoctorCompletedItem[] {
  return mockVisitListItems
    .filter((visit) => ["consultation_completed", "completed"].includes(visit.workflowStatus))
    .map((visit) => {
      const consultation = getMockConsultationByVisitId(visit.id);
      return {
        id: `completed-${visit.id}`,
        visitId: visit.id,
        visitCode: visit.visitCode,
        patient: visit.patient,
        diagnosisText: consultation?.diagnosisText ?? "Clinical summary completed",
        completedAt: consultation?.completedAt ?? visit.updatedAt,
        billingStatus: visit.invoiceStatus,
        prescriptionExists: mockDoctorPrescriptions.some((item) => item.visitId === visit.id),
        documentCount: getMockDocumentsForVisit(visit.id).length,
        nextAction: { label: "View", cta: "View", targetRoute: `/app/doctor/visits/${visit.id}` },
      };
    });
}

function reviewToWorkItem(review: DoctorReviewItem): DoctorWorkItem {
  const visit = mockVisitListItems.find((item) => item.id === review.visitId) ?? mockVisitListItems[0];
  return {
    ...toDoctorWorkItem(visit),
    id: `focus-${review.id}`,
    pendingResultsCount: 1,
    priority: review.flag === "critical" ? "stat" : "urgent",
    nextAction: review.nextAction,
  };
}

function buildMetrics(waiting: number, active: number, review: number, completed: number, delayed: number): DoctorWorkspaceMetric[] {
  return [
    { key: "waiting", label: "Waiting", count: waiting, badge: badge("Waiting", waiting ? "warning" : "success"), href: "/app/doctor/queue" },
    { key: "active", label: "Active", count: active, badge: badge("Active", active ? "accent" : "neutral"), href: "/app/doctor/active" },
    { key: "needs_review", label: "Needs review", count: review, badge: badge("Review", review ? "warning" : "success"), href: "/app/doctor/reviews" },
    { key: "completed_today", label: "Completed today", count: completed, badge: badge("Completed", "success"), href: "/app/doctor/completed" },
    { key: "delayed", label: "Delayed", count: delayed, badge: badge("Delayed", delayed ? "danger" : "success"), href: "/app/doctor/queue" },
  ];
}

function primaryNextAction(status: string, visitId: string) {
  if (status === "queued_for_doctor") return { label: "Start consultation", cta: "Start", targetRoute: `/app/doctor/visits/${visitId}/consultation` };
  if (status === "with_doctor") return { label: "Continue consultation", cta: "Continue", targetRoute: `/app/doctor/visits/${visitId}` };
  if (status === "awaiting_doctor_review") return { label: "Review result", cta: "Review", targetRoute: `/app/doctor/visits/${visitId}/results` };
  if (status === "consultation_completed") return { label: "Send to billing", cta: "Billing", targetRoute: `/app/doctor/visits/${visitId}` };
  return { label: "Open visit", cta: "Open", targetRoute: `/app/doctor/visits/${visitId}` };
}

function buildDiagnoses(diagnosisText?: string | null): DiagnosisEntry[] {
  if (!diagnosisText) return [];
  return [{ id: "dx-current-001", text: diagnosisText, icd10Code: null, type: "primary" }];
}

function buildCommandBar(workflowStatus: string, consultationStatus: ConsultationStatus): DoctorCommandBarAction[] {
  const canStart = workflowStatus === "queued_for_doctor" && consultationStatus === "not_started";
  const inConsultation = ["with_doctor", "awaiting_doctor_review"].includes(workflowStatus);
  return [
    { key: "start_consultation", label: "Start consultation", primary: canStart, enabled: canStart },
    { key: "save_draft", label: "Save draft", enabled: inConsultation },
    { key: "order_lab", label: "Order lab", enabled: inConsultation },
    { key: "order_radiology", label: "Order radiology", enabled: inConsultation },
    { key: "add_prescription", label: "Add prescription", enabled: inConsultation },
    { key: "complete_consultation", label: "Complete consultation", primary: inConsultation, enabled: inConsultation },
    { key: "send_to_billing", label: "Send to billing", enabled: workflowStatus === "consultation_completed" },
    { key: "print", label: "Print", enabled: true },
    { key: "cancel", label: "Cancel", danger: true, enabled: !["completed", "cancelled"].includes(workflowStatus) },
  ];
}

function toVisitSummary(visit: VisitListItem): VisitSummary {
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

function badge(label: string, tone: StatusBadgeData["tone"]): StatusBadgeData {
  return { label, tone };
}
