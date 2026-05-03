import type { Appointment, AppointmentListItem } from "../types/appointments";
import type { InvoiceDetailResponse, InvoiceSummary } from "../types/billing";
import type {
  DoctorActiveEncountersResponse,
  DoctorClinicalHistoryResponse,
  DoctorCompletedConsultationsResponse,
  DoctorQueueResponse,
  DoctorReviewQueueResponse,
  DoctorTemplatesResponse,
  DoctorVisitDetailResponse,
  DoctorWorkspaceResponse as DoctorModuleWorkspaceResponse,
} from "../types/doctor";
import type { LabOrderDetailResponse, LabOrderSummary } from "../types/lab";
import type { PatientDetailResponse, PatientListItem } from "../types/patients";
import type {
  ReceptionCheckInWorkspaceResponse,
  ReceptionDoctorAvailability,
  ReceptionIntakeContext,
  ReceptionIntakeDraft,
  ReceptionIntakeDraftResponse,
  ReceptionIntakePreviewResponse,
  ReceptionPatientSearchResponse,
  ReceptionQueueControlResponse,
  ReceptionServiceOption,
  ReceptionShiftSummaryResponse,
  ReceptionWalkInsWorkspaceResponse,
} from "../types/reception";
import type { TimelineEvent } from "../types/shared";
import type { VisitDetailResponse, VisitListItem } from "../types/visits";
import type {
  CashierWorkspaceResponse,
  DoctorWorkspaceResponse,
  LabWorkspaceResponse,
  ReceptionWorkspaceResponse,
} from "../types/workspaces";
import { getMockAppointmentById, mockAppointmentListItems } from "../mock/appointments";
import { getMockInvoiceDetail, mockInvoiceSummaries } from "../mock/billing";
import { getMockDocumentsForPatient } from "../mock/documents";
import {
  getMockDoctorActiveEncounters,
  getMockDoctorClinicalHistory,
  getMockDoctorCompletedConsultations,
  getMockDoctorQueue,
  getMockDoctorReviewQueue,
  getMockDoctorTemplates,
  getMockDoctorVisitDetail,
  getMockDoctorWorkspace,
} from "../mock/doctor";
import { getMockLabOrderDetail, mockLabOrderSummaries, mockLabResultSummaries } from "../mock/lab";
import { getMockPatientById, mockPatientListItems } from "../mock/patients";
import {
  mockReceptionCheckInWorkspace,
  mockReceptionDoctorAvailability,
  mockReceptionIntakeContext,
  mockReceptionPatientSearchResponse,
  mockReceptionQueueControl,
  mockReceptionServiceOptions,
  mockReceptionShiftSummaryResponse,
  mockReceptionWalkInsWorkspace,
} from "../mock/reception";
import { getMockVisitDetail, mockVisitListItems } from "../mock/visits";
import {
  mockCashierWorkspace,
  mockDoctorWorkspace,
  mockLabWorkspace,
  mockReceptionWorkspace,
} from "../mock/workspaces";

export function getReceptionWorkspace(): Promise<ReceptionWorkspaceResponse> {
  return Promise.resolve(mockReceptionWorkspace);
}

export function getReceptionIntakeContext(): Promise<ReceptionIntakeContext> {
  return Promise.resolve(mockReceptionIntakeContext);
}

export function searchReceptionPatients(query = ""): Promise<ReceptionPatientSearchResponse> {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return Promise.resolve(mockReceptionPatientSearchResponse);
  }

  const results = mockReceptionPatientSearchResponse.results.filter((result) => {
    const patient = result.patient;
    return (
      patient.fullName.toLowerCase().includes(normalizedQuery) ||
      patient.patientCode.toLowerCase().includes(normalizedQuery) ||
      (patient.phone?.toLowerCase().includes(normalizedQuery) ?? false)
    );
  });

  return Promise.resolve({
    ...mockReceptionPatientSearchResponse,
    query,
    results,
    possibleDuplicates: results.filter((result) => (result.duplicateScore ?? 0) > 0),
  });
}

export function getReceptionCheckInWorkspace(): Promise<ReceptionCheckInWorkspaceResponse> {
  return Promise.resolve(mockReceptionCheckInWorkspace);
}

export function getReceptionWalkInsWorkspace(): Promise<ReceptionWalkInsWorkspaceResponse> {
  return Promise.resolve(mockReceptionWalkInsWorkspace);
}

export function getReceptionQueueControl(): Promise<ReceptionQueueControlResponse> {
  return Promise.resolve(mockReceptionQueueControl);
}

export function getReceptionShiftSummary(): Promise<ReceptionShiftSummaryResponse> {
  return Promise.resolve(mockReceptionShiftSummaryResponse);
}

export function getReceptionDoctorAvailability(): Promise<ReceptionDoctorAvailability[]> {
  return Promise.resolve(mockReceptionDoctorAvailability);
}

export function getReceptionServiceOptions(): Promise<ReceptionServiceOption[]> {
  return Promise.resolve(mockReceptionServiceOptions);
}

export function createReceptionIntakeDraft(draft: ReceptionIntakeDraft): Promise<ReceptionIntakeDraftResponse> {
  return Promise.resolve({
    draft,
    message: "Intake draft accepted in mock mode.",
  });
}

export function previewReceptionIntake(draft: ReceptionIntakeDraft): Promise<ReceptionIntakePreviewResponse> {
  const selectedDoctor =
    mockReceptionDoctorAvailability.find((availability) => availability.doctor.id === draft.doctorId) ?? null;
  const selectedServices = mockReceptionServiceOptions.filter((service) => draft.serviceIds.includes(service.id));
  const estimatedTotalAmount = selectedServices.reduce((sum, service) => sum + service.price.amount, 0);
  const warnings = [
    selectedDoctor?.status === "busy" ? `${selectedDoctor.doctor.fullName} has ${selectedDoctor.currentQueueCount} patients waiting.` : null,
    selectedDoctor?.status === "unavailable" || selectedDoctor?.status === "off_shift" ? `${selectedDoctor.doctor.fullName} is not available for routing.` : null,
    selectedServices.length === 0 ? "No billable services selected." : null,
    draft.priority === "emergency" ? "Emergency priority requires immediate clinical handoff." : null,
  ].filter((warning): warning is string => warning !== null);

  return Promise.resolve({
    selectedDoctor,
    selectedServices,
    estimatedTotal: {
      amount: estimatedTotalAmount,
      currency: "UZS",
      formatted: `${new Intl.NumberFormat("uz-UZ").format(estimatedTotalAmount)} UZS`,
    },
    warnings,
  });
}

export function getDoctorWorkspace(): Promise<DoctorWorkspaceResponse> {
  return Promise.resolve(mockDoctorWorkspace);
}

export function getDoctorModuleWorkspace(): Promise<DoctorModuleWorkspaceResponse> {
  return Promise.resolve(getMockDoctorWorkspace());
}

export function getDoctorQueue(): Promise<DoctorQueueResponse> {
  return Promise.resolve(getMockDoctorQueue());
}

export function getDoctorActiveEncounters(): Promise<DoctorActiveEncountersResponse> {
  return Promise.resolve(getMockDoctorActiveEncounters());
}

export function getDoctorReviews(): Promise<DoctorReviewQueueResponse> {
  return Promise.resolve(getMockDoctorReviewQueue());
}

export function getDoctorCompletedConsultations(): Promise<DoctorCompletedConsultationsResponse> {
  return Promise.resolve(getMockDoctorCompletedConsultations());
}

export function getDoctorVisit(id: string): Promise<DoctorVisitDetailResponse | undefined> {
  return Promise.resolve(getMockDoctorVisitDetail(id));
}

export function getDoctorTemplates(): Promise<DoctorTemplatesResponse> {
  return Promise.resolve(getMockDoctorTemplates());
}

export function getDoctorClinicalHistory(patientId?: string): Promise<DoctorClinicalHistoryResponse> {
  return Promise.resolve(getMockDoctorClinicalHistory(patientId));
}

export function getLabWorkspace(): Promise<LabWorkspaceResponse> {
  return Promise.resolve(mockLabWorkspace);
}

export function getCashierWorkspace(): Promise<CashierWorkspaceResponse> {
  return Promise.resolve(mockCashierWorkspace);
}

export function getPatients(): Promise<PatientListItem[]> {
  return Promise.resolve(mockPatientListItems);
}

export function getPatientDetail(id: string): Promise<PatientDetailResponse | undefined> {
  const patient = getMockPatientById(id);
  if (!patient) return Promise.resolve(undefined);
  const recentVisits = mockVisitListItems.filter((visit) => visit.patient.id === id);
  return Promise.resolve({
    patient,
    activeVisit: recentVisits[0] ?? null,
    recentVisits,
    recentInvoices: mockInvoiceSummaries.filter((invoice) => invoice.patient.id === id),
    recentLabResults: mockLabResultSummaries,
    documents: getMockDocumentsForPatient(id),
    timeline: buildPatientTimeline(id, patient.fullName),
  });
}

export function getAppointments(): Promise<AppointmentListItem[]> {
  return Promise.resolve(mockAppointmentListItems);
}

export function getAppointmentDetail(id: string): Promise<Appointment | undefined> {
  return Promise.resolve(getMockAppointmentById(id));
}

export function getVisits(): Promise<VisitListItem[]> {
  return Promise.resolve(mockVisitListItems);
}

export function getVisitDetail(id: string): Promise<VisitDetailResponse | undefined> {
  return Promise.resolve(getMockVisitDetail(id));
}

export function getLabOrders(): Promise<LabOrderSummary[]> {
  return Promise.resolve(mockLabOrderSummaries);
}

export function getLabOrderDetail(id: string): Promise<LabOrderDetailResponse | undefined> {
  return Promise.resolve(getMockLabOrderDetail(id));
}

export function getInvoices(): Promise<InvoiceSummary[]> {
  return Promise.resolve(mockInvoiceSummaries);
}

export function getInvoiceDetail(id: string): Promise<InvoiceDetailResponse | undefined> {
  return Promise.resolve(getMockInvoiceDetail(id));
}

function buildPatientTimeline(patientId: string, fullName: string): TimelineEvent[] {
  return [
    {
      id: `tl-${patientId}-created`,
      entityType: "patient",
      entityId: patientId,
      eventType: "create",
      title: "Patient registered",
      description: `${fullName} patient profile created.`,
      createdAt: "2026-05-01T09:00:00.000Z",
    },
  ];
}
