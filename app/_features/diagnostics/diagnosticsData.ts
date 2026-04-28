import {
  diagnosticOrders,
  diagnosticResults,
  diagnosticServices,
  patients,
  staffMembers,
  type DiagnosticOrder,
} from "../../_data/fakeClinicData";
import { formatDateTime } from "../reception/receptionData";

export type DiagnosticOrderRow = DiagnosticOrder & {
  patientName: string;
  patientPhone: string;
  serviceName: string;
  specialistName: string;
  resultStatus: "NO_RESULT" | "DRAFT" | "APPROVED";
};

export const diagnosticStatusLabels: Record<DiagnosticOrder["status"], string> = {
  ORDERED: "Buyurtma",
  WAITING_PAYMENT: "To'lov kutmoqda",
  SCHEDULED: "Rejalashtirilgan",
  IN_PROGRESS: "Jarayonda",
  READY: "Tayyor",
  APPROVED: "Tasdiqlangan",
  DELIVERED: "Yetkazilgan",
  CANCELLED: "Bekor",
};

export const diagnosticStatusColors: Record<DiagnosticOrder["status"], string> = {
  ORDERED: "blue",
  WAITING_PAYMENT: "orange",
  SCHEDULED: "cyan",
  IN_PROGRESS: "processing",
  READY: "purple",
  APPROVED: "green",
  DELIVERED: "green",
  CANCELLED: "red",
};

export function getDiagnosticOrders(): DiagnosticOrderRow[] {
  return diagnosticOrders.map((order) => {
    const patient = patients.find((item) => item.id === order.patientId);
    const service = diagnosticServices.find((item) => item.id === order.diagnosticServiceId);
    const specialist = staffMembers.find((item) => item.id === "staff-005");
    const result = diagnosticResults.find((item) => item.diagnosticOrderId === order.id);

    return {
      ...order,
      patientName: patient ? `${patient.lastName} ${patient.firstName}` : "Noma'lum bemor",
      patientPhone: patient?.phone ?? "-",
      serviceName: service?.name ?? "-",
      specialistName: specialist ? `${specialist.lastName} ${specialist.firstName}` : "-",
      resultStatus: result?.status ?? "NO_RESULT",
    };
  });
}

export function getDiagnosticMetrics() {
  const rows = getDiagnosticOrders();
  return {
    total: rows.length,
    scheduled: rows.filter((item) => item.status === "SCHEDULED").length,
    inProgress: rows.filter((item) => item.status === "IN_PROGRESS").length,
    ready: rows.filter((item) => item.status === "READY").length,
    approved: rows.filter((item) => item.status === "APPROVED").length,
  };
}

export function getDiagnosticDetail(orderId: string) {
  const order = getDiagnosticOrders().find((item) => item.id === orderId);
  if (!order) return undefined;
  const result = diagnosticResults.find((item) => item.diagnosticOrderId === order.id);
  return { order, result };
}

export { formatDateTime };
