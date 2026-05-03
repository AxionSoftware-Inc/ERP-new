import type { ReceptionQueueControlResponse } from "@/lib/types/reception";
import type { NextActionData } from "@/lib/types/shared";
import type { VisitListItem } from "@/lib/types/visits";
import type { ReceptionWorkspaceResponse } from "@/lib/types/workspaces";

export type ResolvedGuidanceAction = {
  title: string;
  description: string;
  severity: "normal" | "warning" | "critical";
  href: string;
  cta: string;
  meta: { label: string; value: string }[];
};

export function getReceptionNextBestAction(
  workspace: ReceptionWorkspaceResponse,
  queueControl: ReceptionQueueControlResponse,
): ResolvedGuidanceAction {
  const breachedDelayedCase = queueControl.rightPanel.delayedCases.find((item) => item.severity === "critical");
  if (breachedDelayedCase) {
    return {
      title: `${breachedDelayedCase.visit.patient.fullName} kechikkan holatini hal qiling`,
      description: "SLA buzilgan yoki kritik kechikkan holat bor. Operator birinchi navbatda shu case bo'yicha keyingi amalni bajarishi kerak.",
      severity: "critical",
      href: resolveActionHref(breachedDelayedCase.nextAction, breachedDelayedCase.visit),
      cta: breachedDelayedCase.nextAction.cta ?? breachedDelayedCase.nextAction.label,
      meta: [
        { label: "Patient", value: breachedDelayedCase.visit.patient.fullName },
        { label: "Visit", value: breachedDelayedCase.visit.visitCode },
        { label: "Waiting", value: `${breachedDelayedCase.waitingMinutes} min` },
        { label: "Owner", value: breachedDelayedCase.owner },
      ],
    };
  }

  const breachedQueueItem = queueControl.queues.byWaitingTime.items.find((item) => item.slaState === "breached");
  if (breachedQueueItem) {
    return visitGuidance(
      breachedQueueItem,
      "SLA buzilgan bemorni oldin suring",
      "Kutish vaqti chegaradan oshgan. Navbatni tekshirib, mas'ul bo'limga yo'naltiring.",
      "critical",
      [
        { label: "Queue", value: breachedQueueItem.queueNumber ?? "No queue" },
        { label: "Waiting", value: formatMinutes(breachedQueueItem.waitingMinutes) },
        { label: "Priority", value: breachedQueueItem.priority ?? "normal" },
      ],
    );
  }

  const needsAction = workspace.queues.needsAction.items[0];
  if (needsAction) {
    return visitGuidance(
      needsAction,
      "Yangi qabulni navbatga tayyorlang",
      "Harakat kutayotgan birinchi bemorga doctor/service/queue bo'yicha keyingi qadamni bering.",
      "warning",
      [{ label: "Queue", value: "Needs action" }],
    );
  }

  const billing = workspace.queues.billingAndClosing.items[0];
  if (billing) {
    return visitGuidance(
      billing,
      "To'lov yoki yakunlashni tugating",
      "Hisob, to'lov yoki visit closing kutayotgan bemor bor. Case yopilmasa smena oxirida qarzdorlik qoladi.",
      "warning",
      [{ label: "Queue", value: "Billing / close" }],
    );
  }

  const inProgressWarning = queueControl.queues.byWaitingTime.items.find((item) => item.slaState === "warning") ?? workspace.queues.inProgress.items[0];
  if (inProgressWarning) {
    return visitGuidance(
      inProgressWarning,
      "Jarayondagi bemorni monitoring qiling",
      "Workflow ichida turgan bemor bo'yicha status va keyingi amalni tekshiring.",
      "warning",
      [{ label: "Queue", value: "In progress" }],
    );
  }

  return {
    title: "Yangi qabuldan boshlang",
    description: "Hozir kritik queue signali yo'q. Yangi bemor qabulini oching yoki patient search orqali mavjud bemorni toping.",
    severity: "normal",
    href: "/app/reception/intake/new",
    cta: "Start new intake",
    meta: [
      { label: "Active", value: String(workspace.queues.needsAction.count + workspace.queues.inProgress.count) },
      { label: "Closed today", value: String(workspace.queues.closedToday.count) },
    ],
  };
}

function visitGuidance(
  visit: VisitListItem,
  title: string,
  description: string,
  severity: ResolvedGuidanceAction["severity"],
  extraMeta: { label: string; value: string }[],
): ResolvedGuidanceAction {
  return {
    title,
    description,
    severity,
    href: resolveActionHref(visit.nextAction, visit),
    cta: visit.nextAction.cta ?? visit.nextAction.label,
    meta: [
      { label: "Patient", value: visit.patient.fullName },
      { label: "Visit", value: visit.visitCode },
      { label: "Status", value: visit.workflowBadge.label },
      ...extraMeta,
    ],
  };
}

function resolveActionHref(action: NextActionData, visit: VisitListItem): string {
  if (!action.targetRoute || action.targetRoute.includes("/invoices/[id]")) return `/app/visits/${visit.id}`;
  return action.targetRoute.replace("[id]", visit.id);
}

function formatMinutes(value?: number): string {
  if (typeof value !== "number") return "No signal";
  return `${value} min`;
}
