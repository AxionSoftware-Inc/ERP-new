import { patients, paymentInvoiceItems, paymentInvoices, payments, services, staffMembers, type PaymentInvoice } from "../../_data/fakeClinicData";
import { formatDateTime, formatMoney } from "../reception/receptionData";

export type InvoiceRow = PaymentInvoice & {
  patientName: string;
  patientPhone: string;
  serviceNames: string[];
};

export const invoiceStatusLabels: Record<PaymentInvoice["status"], string> = {
  DRAFT: "Draft",
  ISSUED: "Berilgan",
  PARTIALLY_PAID: "Qisman",
  PAID: "To'langan",
  OVERDUE: "Muddati o'tgan",
  CANCELLED: "Bekor",
  REFUNDED: "Qaytarilgan",
};

export const invoiceStatusColors: Record<PaymentInvoice["status"], string> = {
  DRAFT: "default",
  ISSUED: "blue",
  PARTIALLY_PAID: "processing",
  PAID: "green",
  OVERDUE: "red",
  CANCELLED: "red",
  REFUNDED: "volcano",
};

export function getInvoices(): InvoiceRow[] {
  return paymentInvoices.map((invoice) => {
    const patient = patients.find((item) => item.id === invoice.patientId);
    const items = paymentInvoiceItems.filter((item) => item.invoiceId === invoice.id);
    return {
      ...invoice,
      patientName: patient ? `${patient.lastName} ${patient.firstName}` : "Noma'lum bemor",
      patientPhone: patient?.phone ?? "-",
      serviceNames: items.map((item) => services.find((service) => service.id === item.serviceId)?.name ?? item.serviceId),
    };
  });
}

export function getCashierMetrics() {
  return {
    revenue: payments.reduce((sum, payment) => sum + payment.amount, 0),
    cash: payments.filter((payment) => payment.method === "CASH").reduce((sum, payment) => sum + payment.amount, 0),
    card: payments.filter((payment) => payment.method === "CARD").reduce((sum, payment) => sum + payment.amount, 0),
    debt: paymentInvoices.reduce((sum, invoice) => sum + invoice.debtAmount, 0),
    waiting: paymentInvoices.filter((invoice) => invoice.status === "ISSUED").length,
  };
}

export function getPaymentRows() {
  return payments.map((payment) => {
    const patient = patients.find((item) => item.id === payment.patientId);
    const cashier = staffMembers.find((item) => item.id === payment.cashierId);
    return {
      ...payment,
      patientName: patient ? `${patient.lastName} ${patient.firstName}` : "-",
      cashierName: cashier ? `${cashier.lastName} ${cashier.firstName}` : "-",
    };
  });
}

export function getPaymentDetail(paymentId: string) {
  const payment = getPaymentRows().find((item) => item.id === paymentId);
  if (!payment) return undefined;
  const invoice = getInvoices().find((item) => item.id === payment.invoiceId);
  const items = paymentInvoiceItems
    .filter((item) => item.invoiceId === payment.invoiceId)
    .map((item) => ({
      ...item,
      serviceName: services.find((service) => service.id === item.serviceId)?.name ?? item.serviceId,
    }));
  return { payment, invoice, items };
}

export { formatDateTime, formatMoney };
