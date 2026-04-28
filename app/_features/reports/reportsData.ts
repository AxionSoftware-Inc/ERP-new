import {
  appointments,
  departments,
  doctorProfiles,
  paymentInvoiceItems,
  paymentInvoices,
  payments,
  services,
  staffMembers,
} from "../../_data/fakeClinicData";
import { formatDateTime, formatMoney } from "../reception/receptionData";

export function getRevenueSummary() {
  const billed = paymentInvoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0);
  const collected = payments.filter((payment) => payment.status === "COMPLETED").reduce((sum, payment) => sum + payment.amount, 0);
  const debt = paymentInvoices.reduce((sum, invoice) => sum + invoice.debtAmount, 0);
  const discounts = paymentInvoices.reduce((sum, invoice) => sum + invoice.discountAmount, 0);
  const cash = payments.filter((payment) => payment.method === "CASH").reduce((sum, payment) => sum + payment.amount, 0);
  const card = payments.filter((payment) => payment.method === "CARD").reduce((sum, payment) => sum + payment.amount, 0);

  return {
    billed,
    collected,
    debt,
    discounts,
    cash,
    card,
    collectionRate: billed ? Math.round((collected / billed) * 100) : 0,
    averagePayment: payments.length ? Math.round(collected / payments.length) : 0,
  };
}

export function getRevenueRows() {
  return payments.map((payment) => {
    const invoice = paymentInvoices.find((item) => item.id === payment.invoiceId);
    return {
      ...payment,
      invoiceNumber: invoice?.invoiceNumber ?? "-",
      totalAmount: invoice?.totalAmount ?? payment.amount,
      debtAmount: invoice?.debtAmount ?? 0,
      paidAtFormatted: formatDateTime(payment.paidAt),
    };
  });
}

export function getServiceReportRows() {
  const grouped = new Map<
    string,
    {
      id: string;
      serviceName: string;
      departmentName: string;
      serviceType: string;
      quantity: number;
      grossAmount: number;
      discountAmount: number;
      netAmount: number;
      collectionAmount: number;
    }
  >();

  paymentInvoiceItems.forEach((item) => {
    const service = services.find((entry) => entry.id === item.serviceId);
    const department = departments.find((entry) => entry.id === service?.departmentId);
    const invoice = paymentInvoices.find((entry) => entry.id === item.invoiceId);
    const current = grouped.get(item.serviceId) ?? {
      id: item.serviceId,
      serviceName: service?.name ?? item.serviceId,
      departmentName: department?.name ?? "-",
      serviceType: service?.serviceType ?? "-",
      quantity: 0,
      grossAmount: 0,
      discountAmount: 0,
      netAmount: 0,
      collectionAmount: 0,
    };

    current.quantity += item.quantity;
    current.grossAmount += item.unitPrice * item.quantity;
    current.discountAmount += item.discountAmount;
    current.netAmount += item.totalPrice;
    current.collectionAmount += invoice?.status === "PAID" ? item.totalPrice : 0;
    grouped.set(item.serviceId, current);
  });

  return [...grouped.values()].sort((a, b) => b.netAmount - a.netAmount);
}

export function getDoctorReportRows() {
  return doctorProfiles.map((doctor) => {
    const staff = staffMembers.find((item) => item.id === doctor.staffMemberId);
    const doctorAppointments = appointments.filter((appointment) => appointment.doctorProfileId === doctor.id);
    const completed = doctorAppointments.filter((appointment) => appointment.status === "COMPLETED").length;
    const invoiceBase = doctorAppointments.reduce((sum, appointment) => {
      const invoice = paymentInvoices.find((item) => item.patientId === appointment.patientId);
      return sum + (invoice?.totalAmount ?? 0);
    }, 0);

    return {
      id: doctor.id,
      doctorName: staff ? `${staff.lastName} ${staff.firstName}` : doctor.id,
      specialty: doctor.specialty,
      appointments: doctorAppointments.length,
      completed,
      conversionRate: doctorAppointments.length ? Math.round((completed / doctorAppointments.length) * 100) : 0,
      revenueBase: invoiceBase,
      commissionEstimate: Math.round(invoiceBase * 0.25),
    };
  });
}

export function getDebtReportRows() {
  return paymentInvoices
    .filter((invoice) => invoice.debtAmount > 0)
    .map((invoice) => ({
      ...invoice,
      paidPercent: invoice.totalAmount ? Math.round((invoice.paidAmount / invoice.totalAmount) * 100) : 0,
      issuedAtFormatted: formatDateTime(invoice.issuedAt),
    }));
}

export { formatDateTime, formatMoney };
