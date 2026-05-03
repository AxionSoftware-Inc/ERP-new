import type { ID, UserSummary } from "./shared";

export type DocumentType =
  | "medical_certificate"
  | "consent_form"
  | "lab_report"
  | "radiology_report"
  | "invoice"
  | "receipt"
  | "other";

export type DocumentSummary = {
  id: ID;
  documentCode: string;
  title: string;
  type: DocumentType;
  fileUrl?: string | null;
  createdAt: string;
  createdBy?: UserSummary | null;
};
