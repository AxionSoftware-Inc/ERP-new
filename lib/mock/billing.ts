import type { Invoice, InvoiceDetailResponse, InvoiceStatus, Payment, Refund } from "../types/billing";
import type { TimelineEvent } from "../types/shared";
import { getCashierNextAction, getInvoiceStatusBadge } from "../workflow/invoice-workflow";
import { mockPatients } from "./patients";
import { createMoney, mockDepartments, mockUsers, daysAgo, hoursAgo } from "./shared";

const invoiceStatuses: InvoiceStatus[] = ["draft", "issued", "partially_paid", "paid", "void", "refunded", "cancelled", "issued"];

export const mockInvoices: Invoice[] = invoiceStatuses.map((status, index) => {
  const subtotalAmount = 180000 + index * 45000;
  const discountAmount = index % 3 === 0 ? 20000 : 0;
  const totalAmount = subtotalAmount - discountAmount;
  const paidAmount = status === "paid" || status === "refunded" ? totalAmount : status === "partially_paid" ? Math.floor(totalAmount / 2) : 0;
  const invoice = {
    id: `inv-${String(index + 1).padStart(3, "0")}`,
    invoiceCode: `I-2026-${String(index + 1).padStart(4, "0")}`,
    patient: mockPatients[index % mockPatients.length],
    visitId: `visit-${String(index + 5).padStart(3, "0")}`,
    status,
    statusBadge: getInvoiceStatusBadge(status),
    nextAction: { label: "View", cta: "View" },
    items: [
      {
        id: `inv-item-${index + 1}`,
        serviceCode: index % 2 === 0 ? "CARD-CONS" : "LAB-CBC",
        serviceName: index % 2 === 0 ? "Cardiology consultation" : "Complete Blood Count",
        department: index % 2 === 0 ? mockDepartments[1] : mockDepartments[4],
        quantity: 1,
        unitPrice: createMoney(subtotalAmount),
        total: createMoney(subtotalAmount),
      },
    ],
    subtotal: createMoney(subtotalAmount),
    discount: createMoney(discountAmount),
    total: createMoney(totalAmount),
    paid: createMoney(paidAmount),
    balance: createMoney(Math.max(totalAmount - paidAmount, 0)),
    issuedBy: status === "draft" ? null : mockUsers[3],
    issuedAt: status === "draft" ? null : daysAgo(index % 2, 11),
    createdAt: daysAgo(index % 5, 10),
    updatedAt: hoursAgo(index + 1),
  } satisfies Invoice;
  return { ...invoice, nextAction: getCashierNextAction(invoice) };
});

export const mockInvoiceSummaries = mockInvoices.map((invoice) => ({
  id: invoice.id,
  invoiceCode: invoice.invoiceCode,
  patient: invoice.patient,
  visitId: invoice.visitId,
  total: invoice.total,
  paid: invoice.paid,
  balance: invoice.balance,
  status: invoice.status,
  statusBadge: invoice.statusBadge,
  nextAction: invoice.nextAction,
  issuedAt: invoice.issuedAt,
}));

export const mockPayments: Payment[] = mockInvoices
  .filter((invoice) => invoice.paid.amount > 0)
  .map((invoice, index) => ({
    id: `pay-${String(index + 1).padStart(3, "0")}`,
    paymentCode: `PM-2026-${String(index + 1).padStart(4, "0")}`,
    invoiceId: invoice.id,
    amount: invoice.paid,
    method: index % 2 === 0 ? "card" : "cash",
    status: invoice.status === "refunded" ? "refunded" : "recorded",
    referenceNumber: index % 2 === 0 ? `UZCARD-${1000 + index}` : null,
    recordedBy: mockUsers[3],
    recordedAt: invoice.updatedAt,
    notes: invoice.status === "partially_paid" ? "Partial payment received." : null,
  }));

export const mockRefunds: Refund[] = [
  {
    id: "refund-001",
    refundCode: "RF-2026-0001",
    paymentId: mockPayments.find((payment) => payment.status === "refunded")?.id ?? "pay-001",
    invoiceId: mockInvoices.find((invoice) => invoice.status === "refunded")?.id ?? "inv-006",
    amount: createMoney(225000),
    reason: "Service cancelled after payment reconciliation.",
    approvedBy: mockUsers[4],
    recordedBy: mockUsers[3],
    recordedAt: hoursAgo(3),
  },
];

export function getMockInvoiceById(id: string): Invoice | undefined {
  return mockInvoices.find((invoice) => invoice.id === id);
}

export function getMockInvoiceSummaryByVisitId(visitId: string) {
  return mockInvoiceSummaries.find((invoice) => invoice.visitId === visitId);
}

export function getMockInvoiceDetail(id: string): InvoiceDetailResponse | undefined {
  const invoice = getMockInvoiceById(id);
  if (!invoice) return undefined;
  return {
    invoice,
    payments: mockPayments.filter((payment) => payment.invoiceId === id),
    refunds: mockRefunds.filter((refund) => refund.invoiceId === id),
    timeline: buildInvoiceTimeline(invoice),
  };
}

function buildInvoiceTimeline(invoice: Invoice): TimelineEvent[] {
  return [
    {
      id: `tl-${invoice.id}-created`,
      entityType: "invoice",
      entityId: invoice.id,
      eventType: "invoice_issued",
      title: invoice.status === "draft" ? "Invoice drafted" : "Invoice issued",
      actor: invoice.issuedBy ?? mockUsers[3],
      createdAt: invoice.createdAt,
    },
    {
      id: `tl-${invoice.id}-status`,
      entityType: "invoice",
      entityId: invoice.id,
      eventType: "status_change",
      title: invoice.statusBadge.label,
      actor: mockUsers[3],
      createdAt: invoice.updatedAt,
    },
  ];
}
