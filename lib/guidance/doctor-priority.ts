import type { DoctorWorkspaceResponse } from "@/lib/types/doctor";

export type ResolvedGuidanceAction = {
  title: string;
  description: string;
  severity: "normal" | "warning" | "critical";
  href: string;
  cta: string;
  meta: { label: string; value: string }[];
};

export function getDoctorNextBestAction(workspace: DoctorWorkspaceResponse): ResolvedGuidanceAction {
  const criticalReview = workspace.queues.needsReview.find((item) => item.flag === "critical");
  if (criticalReview) {
    return {
      title: `${criticalReview.patient.fullName} kritik natijasini ko'ring`,
      description: "Critical result released bo'lgan. Doctor birinchi navbatda natijani review qilib clinical qaror berishi kerak.",
      severity: "critical",
      href: criticalReview.nextAction.targetRoute ?? `/app/doctor/visits/${criticalReview.visitId}/results`,
      cta: criticalReview.nextAction.cta ?? "Review",
      meta: [
        { label: "Patient", value: criticalReview.patient.fullName },
        { label: "Result", value: criticalReview.serviceName },
        { label: "Source", value: criticalReview.sourceCode },
        { label: "Delayed", value: `${criticalReview.delayedMinutes} min` },
      ],
    };
  }

  const needsReview = workspace.queues.needsReview[0];
  if (needsReview) {
    return {
      title: "Tayyor natijani review qiling",
      description: "Released lab/radiology/procedure natijasi doctor review kutmoqda. Natijani ko'rib, interpretation yoki keyingi orderni belgilang.",
      severity: needsReview.flag === "abnormal" ? "warning" : "normal",
      href: needsReview.nextAction.targetRoute ?? `/app/doctor/visits/${needsReview.visitId}/results`,
      cta: needsReview.nextAction.cta ?? "Review",
      meta: [
        { label: "Patient", value: needsReview.patient.fullName },
        { label: "Result", value: needsReview.serviceName },
        { label: "Flag", value: needsReview.flag },
      ],
    };
  }

  const active = workspace.queues.activeEncounters[0];
  if (active) {
    return {
      title: `${active.patient.fullName} konsultatsiyasini davom ettiring`,
      description: "Boshlangan consultation hali yopilmagan. Clinical note, order yoki complete action bo'yicha davom eting.",
      severity: "warning",
      href: active.nextAction.targetRoute ?? `/app/doctor/visits/${active.visitId}`,
      cta: active.nextAction.cta ?? "Continue",
      meta: [
        { label: "Patient", value: active.patient.fullName },
        { label: "Visit", value: active.visitCode },
        { label: "Status", value: active.consultationStatus },
        { label: "Visit age", value: `${active.visitAgeMinutes} min` },
      ],
    };
  }

  const waiting = workspace.queues.myQueue[0];
  if (waiting) {
    return {
      title: `${waiting.patient.fullName} qabulini boshlang`,
      description: "Doctor navbatida kutayotgan birinchi bemor bor. Consultationni ochib clinical workflowni boshlang.",
      severity: waiting.priority === "stat" ? "critical" : waiting.priority === "urgent" ? "warning" : "normal",
      href: waiting.nextAction.targetRoute ?? `/app/doctor/visits/${waiting.visitId}/consultation`,
      cta: waiting.nextAction.cta ?? "Start",
      meta: [
        { label: "Patient", value: waiting.patient.fullName },
        { label: "Queue", value: waiting.queueNumber ?? waiting.visitCode },
        { label: "Waiting", value: `${waiting.waitingMinutes} min` },
        { label: "Priority", value: waiting.priority },
      ],
    };
  }

  return {
    title: "My queue yoki schedule bilan boshlang",
    description: "Hozir critical review yoki active consultation yo'q. Navbatni yoki bugungi schedule'ni oching.",
    severity: "normal",
    href: workspace.rightRail.todaySchedule.length ? "/app/doctor/schedule" : "/app/doctor/queue",
    cta: workspace.rightRail.todaySchedule.length ? "Open schedule" : "Open my queue",
    meta: [
      { label: "Schedule", value: String(workspace.rightRail.todaySchedule.length) },
      { label: "Unread tasks", value: String(workspace.rightRail.controls.unreadTasks) },
    ],
  };
}
