import type { InvoiceSummary } from "./billing";
import type { DocumentSummary } from "./documents";
import type { LabResultSummary } from "./lab";
import type { ID, Money, TimelineEvent } from "./shared";
import type { VisitSummary } from "./visits";

export type PatientGender = "male" | "female" | "other" | "unknown";

export type Patient = {
  id: ID;
  patientCode: string;
  fullName: string;
  birthDate?: string | null;
  age?: number | null;
  gender?: PatientGender;
  phone?: string | null;
  secondaryPhone?: string | null;
  address?: string | null;
  passportNumber?: string | null;
  emergencyContactName?: string | null;
  emergencyContactPhone?: string | null;
  riskFlags?: string[];
  balance?: Money;
  createdAt: string;
  updatedAt: string;
};

export type PatientListItem = {
  id: ID;
  patientCode: string;
  fullName: string;
  age?: number | null;
  gender?: PatientGender;
  phone?: string | null;
  lastVisitAt?: string | null;
  activeVisitId?: ID | null;
  balance?: Money;
  riskFlags?: string[];
};

export type PatientDetailResponse = {
  patient: Patient;
  activeVisit?: VisitSummary | null;
  recentVisits: VisitSummary[];
  recentInvoices: InvoiceSummary[];
  recentLabResults: LabResultSummary[];
  documents: DocumentSummary[];
  timeline: TimelineEvent[];
};
