import {
  labOrders,
  labResults,
  labTests,
  patients,
  staffMembers,
  type LabOrder,
  type OrderStatus,
} from "../../_data/fakeClinicData";
import { formatDateTime } from "../reception/receptionData";

export type LabOrderRow = LabOrder & {
  patientName: string;
  patientPhone: string;
  testNames: string[];
  doctorName: string;
  resultCount: number;
};

export const labStatusLabels: Record<OrderStatus, string> = {
  ORDERED: "Buyurtma",
  WAITING_PAYMENT: "To'lov kutmoqda",
  WAITING_SAMPLE: "Namuna kutmoqda",
  SAMPLE_COLLECTED: "Namuna olindi",
  IN_PROGRESS: "Jarayonda",
  READY_FOR_APPROVAL: "Tasdiq kutmoqda",
  APPROVED: "Tasdiqlangan",
  DELIVERED: "Yetkazilgan",
  CANCELLED: "Bekor",
};

export const labStatusColors: Record<OrderStatus, string> = {
  ORDERED: "blue",
  WAITING_PAYMENT: "orange",
  WAITING_SAMPLE: "gold",
  SAMPLE_COLLECTED: "cyan",
  IN_PROGRESS: "processing",
  READY_FOR_APPROVAL: "purple",
  APPROVED: "green",
  DELIVERED: "green",
  CANCELLED: "red",
};

export function getLabOrders(): LabOrderRow[] {
  return labOrders.map((order) => {
    const patient = patients.find((item) => item.id === order.patientId);
    const doctor = staffMembers.find((item) => item.id === "staff-001");
    const tests = order.testIds.map((testId) => labTests.find((test) => test.id === testId)?.name ?? testId);

    return {
      ...order,
      patientName: patient ? `${patient.lastName} ${patient.firstName}` : "Noma'lum bemor",
      patientPhone: patient?.phone ?? "-",
      testNames: tests,
      doctorName: doctor ? `${doctor.lastName} ${doctor.firstName}` : "-",
      resultCount: labResults.filter((result) => result.labOrderId === order.id).length,
    };
  });
}

export function getLabMetrics() {
  const rows = getLabOrders();

  return {
    total: rows.length,
    waitingSample: rows.filter((item) => item.status === "WAITING_SAMPLE" || item.status === "ORDERED").length,
    collected: rows.filter((item) => item.status === "SAMPLE_COLLECTED").length,
    inProgress: rows.filter((item) => item.status === "IN_PROGRESS").length,
    approval: rows.filter((item) => item.status === "READY_FOR_APPROVAL").length,
  };
}

export function getLabOrderDetail(orderId: string) {
  const order = getLabOrders().find((item) => item.id === orderId);
  if (!order) return undefined;

  return {
    order,
    tests: order.testIds
      .map((testId) => labTests.find((test) => test.id === testId))
      .filter((test): test is (typeof labTests)[number] => Boolean(test)),
    results: labResults.filter((result) => result.labOrderId === order.id),
  };
}

export { formatDateTime };
