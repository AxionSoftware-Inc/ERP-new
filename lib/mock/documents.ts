import type { DocumentSummary } from "../types/documents";
import { mockUsers, daysAgo } from "./shared";

export type MockDocument = DocumentSummary & {
  patientId?: string;
  visitId?: string;
};

export const mockDocuments: MockDocument[] = [
  {
    id: "doc-001",
    documentCode: "D-2026-0001",
    title: "Cardiology consultation summary",
    type: "medical_certificate",
    fileUrl: "/mock/docs/cardio-summary.pdf",
    patientId: "pat-001",
    visitId: "visit-009",
    createdAt: daysAgo(0, 11),
    createdBy: mockUsers[4],
  },
  {
    id: "doc-002",
    documentCode: "D-2026-0002",
    title: "Lab report CBC",
    type: "lab_report",
    fileUrl: "/mock/docs/cbc-report.pdf",
    patientId: "pat-005",
    visitId: "visit-005",
    createdAt: daysAgo(0, 10),
    createdBy: mockUsers[2],
  },
  {
    id: "doc-003",
    documentCode: "D-2026-0003",
    title: "Radiology report chest X-ray",
    type: "radiology_report",
    fileUrl: "/mock/docs/xray-report.pdf",
    patientId: "pat-007",
    visitId: "visit-007",
    createdAt: daysAgo(0, 12),
    createdBy: mockUsers[4],
  },
  {
    id: "doc-004",
    documentCode: "D-2026-0004",
    title: "Invoice V-2026-0009",
    type: "invoice",
    fileUrl: "/mock/docs/invoice-0009.pdf",
    patientId: "pat-001",
    visitId: "visit-009",
    createdAt: daysAgo(0, 11),
    createdBy: mockUsers[3],
  },
  {
    id: "doc-005",
    documentCode: "D-2026-0005",
    title: "Procedure consent form",
    type: "consent_form",
    patientId: "pat-002",
    visitId: "visit-010",
    createdAt: daysAgo(1),
    createdBy: mockUsers[0],
  },
];

export function getMockDocumentsForPatient(patientId: string): DocumentSummary[] {
  return mockDocuments.filter((document) => document.patientId === patientId);
}

export function getMockDocumentsForVisit(visitId: string): DocumentSummary[] {
  return mockDocuments.filter((document) => document.visitId === visitId);
}
