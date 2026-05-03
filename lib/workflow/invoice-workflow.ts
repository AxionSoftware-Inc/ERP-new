import type { Invoice, InvoiceStatus, InvoiceSummary, PaymentStatus } from "../types/billing";
import type { NextActionData, StatusBadgeData } from "../types/shared";
import type { Visit, VisitListItem, VisitSummary } from "../types/visits";

type InvoiceLike = Pick<Invoice | InvoiceSummary, "id" | "status">;
type VisitLike = Pick<Visit | VisitListItem | VisitSummary, "id" | "workflowStatus">;

const invoiceStatusMap: Record<InvoiceStatus, { label: string; tone: StatusBadgeData["tone"]; action: NextActionData }> = {
  draft: { label: "Draft", tone: "neutral", action: { label: "Issue invoice", cta: "Issue invoice" } },
  issued: { label: "Issued", tone: "warning", action: { label: "Record payment", cta: "Record payment" } },
  partially_paid: {
    label: "Partially paid",
    tone: "warning",
    action: { label: "Collect remaining payment", cta: "Collect remaining" },
  },
  paid: { label: "Paid", tone: "success", action: { label: "Complete visit", cta: "Complete visit" } },
  void: { label: "Void", tone: "danger", action: { label: "No action", cta: "View", disabled: true } },
  refunded: { label: "Refunded", tone: "danger", action: { label: "No action", cta: "View", disabled: true } },
  cancelled: { label: "Cancelled", tone: "danger", action: { label: "No action", cta: "View", disabled: true } },
};

const paymentStatusMap: Record<PaymentStatus, { label: string; tone: StatusBadgeData["tone"] }> = {
  pending: { label: "Pending", tone: "warning" },
  recorded: { label: "Recorded", tone: "success" },
  failed: { label: "Failed", tone: "danger" },
  refunded: { label: "Refunded", tone: "danger" },
  cancelled: { label: "Cancelled", tone: "danger" },
};

export function getInvoiceStatusLabel(status: InvoiceStatus | string): string {
  return invoiceStatusMap[status as InvoiceStatus]?.label ?? "Unknown status";
}

export function getInvoiceStatusTone(status: InvoiceStatus | string): StatusBadgeData["tone"] {
  return invoiceStatusMap[status as InvoiceStatus]?.tone ?? "neutral";
}

export function getInvoiceStatusBadge(status: InvoiceStatus | string): StatusBadgeData {
  return { label: getInvoiceStatusLabel(status), tone: getInvoiceStatusTone(status) };
}

export function getCashierNextAction(invoice: InvoiceLike, visit?: VisitLike | null): NextActionData {
  const meta = invoiceStatusMap[invoice.status];
  if (!meta) return viewInvoice(invoice.id);
  if (isInvoiceTerminalStatus(invoice.status)) return { ...viewInvoice(invoice.id), label: "No action" };
  if (invoice.status === "paid") {
    if (visit && visit.workflowStatus === "paid") {
      return { label: "Complete visit", cta: "Complete visit", targetRoute: `/app/visits/${visit.id}` };
    }
    return { label: "Payment settled", cta: "View", targetRoute: `/app/cashier/invoices/${invoice.id}` };
  }
  return { ...meta.action, targetRoute: `/app/cashier/invoices/${invoice.id}` };
}

export function getAllowedInvoiceActions(invoice: InvoiceLike, visit?: VisitLike | null): NextActionData[] {
  const actions = [getCashierNextAction(invoice, visit), viewInvoice(invoice.id)];
  if (invoice.status === "issued" || invoice.status === "partially_paid") {
    actions.push({ label: "Void invoice", cta: "Void", targetRoute: `/app/cashier/invoices/${invoice.id}` });
  }
  if (invoice.status === "paid") {
    actions.push({ label: "Refund payment", cta: "Refund", targetRoute: `/app/cashier/invoices/${invoice.id}` });
  }
  return dedupeActions(actions);
}

export function isInvoiceTerminalStatus(status: InvoiceStatus | string): boolean {
  return status === "void" || status === "refunded" || status === "cancelled";
}

export function getPaymentStatusLabel(status: PaymentStatus | string): string {
  return paymentStatusMap[status as PaymentStatus]?.label ?? "Unknown status";
}

export function getPaymentStatusTone(status: PaymentStatus | string): StatusBadgeData["tone"] {
  return paymentStatusMap[status as PaymentStatus]?.tone ?? "neutral";
}

export function getPaymentStatusBadge(status: PaymentStatus | string): StatusBadgeData {
  return { label: getPaymentStatusLabel(status), tone: getPaymentStatusTone(status) };
}

export function isPaymentTerminalStatus(status: PaymentStatus | string): boolean {
  return status === "recorded" || status === "failed" || status === "refunded" || status === "cancelled";
}

function viewInvoice(id?: string): NextActionData {
  return { label: "View", cta: "View", targetRoute: id ? `/app/cashier/invoices/${id}` : undefined };
}

function dedupeActions(actions: NextActionData[]): NextActionData[] {
  return actions.filter((action, index, list) => list.findIndex((item) => item.cta === action.cta) === index);
}
