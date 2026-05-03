import type { DoctorSummary, ID, PatientSummary, StatusBadgeData } from "./shared";

export type ConsultationStatus =
  | "not_started"
  | "in_progress"
  | "waiting_for_results"
  | "reviewing_results"
  | "completed"
  | "cancelled";

export type Vitals = {
  temperature?: number | null;
  bloodPressure?: string | null;
  heartRate?: number | null;
  respiratoryRate?: number | null;
  spo2?: number | null;
  weightKg?: number | null;
  heightCm?: number | null;
};

export type Consultation = {
  id: ID;
  visitId: ID;
  patient: PatientSummary;
  doctor: DoctorSummary;
  status: ConsultationStatus;
  statusBadge: StatusBadgeData;
  chiefComplaint?: string | null;
  vitals?: Vitals | null;
  examination?: string | null;
  diagnosisText?: string | null;
  plan?: string | null;
  doctorNote?: string | null;
  startedAt?: string | null;
  completedAt?: string | null;
  updatedAt: string;
};
