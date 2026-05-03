import type { AppointmentStatus } from "@/lib/types/appointments";
import type { ConsultationStatus } from "@/lib/types/clinical";
import type { StatusBadgeData, NextActionData } from "@/lib/types/shared";
import type { VisitListItem, VisitWorkflowStatus } from "@/lib/types/visits";

export function localizeDoctorSummaryLabel(label: string): string {
  const labels: Record<string, string> = {
    "My queue": "Mening navbatim",
    "Active encounters": "Faol qabul",
    "Needs review": "Review kerak",
    "Completed today": "Bugun yakunlangan",
  };

  return labels[label] ?? label;
}

export function localizeDoctorBadge(badge: StatusBadgeData): StatusBadgeData {
  return { ...badge, label: localizeDoctorText(badge.label) };
}

export function localizeDoctorAction(action: NextActionData): NextActionData {
  return {
    ...action,
    label: localizeDoctorText(action.label),
    cta: localizeDoctorText(action.cta),
    reason: action.reason ? localizeDoctorText(action.reason) : undefined,
  };
}

export function localizeDoctorText(value: string): string {
  const labels: Record<string, string> = {
    "Queued for doctor": "Shifokor navbatida",
    "With doctor": "Shifokor qabulida",
    "Awaiting doctor review": "Shifokor review kutmoqda",
    "Consultation completed": "Konsultatsiya tugagan",
    Completed: "Yakunlangan",
    Cancelled: "Bekor qilingan",
    "Start consultation": "Konsultatsiyani boshlash",
    "Continue consultation": "Konsultatsiyani davom ettirish",
    "Review result": "Natijani ko‘rib chiqish",
    "Open visit": "Tashrifni ochish",
    View: "Ko‘rish",
    Open: "Ochish",
    "No action needed": "Harakat kerak emas",
    "View only": "Faqat ko‘rish",
    Scheduled: "Rejalashtirilgan",
    Confirmed: "Tasdiqlangan",
    Arrived: "Kelgan",
    "Checked in": "Check-in qilingan",
    "Converted to visit": "Tashrifga aylantirilgan",
    "No show": "Kelmadi",
    Ordered: "Buyurilgan",
    "Sample pending": "Namuna kutmoqda",
    "Sample collected": "Namuna olingan",
    "In progress": "Jarayonda",
    "Result entered": "Natija kiritilgan",
    Verified: "Tasdiqlangan",
    Released: "Chiqarilgan",
    Reviewed: "Ko‘rib chiqilgan",
  };

  return labels[value] ?? value;
}

export function formatPatientSubtitle(visit: VisitListItem): string {
  const parts = [
    visit.patient.patientCode,
    visit.patient.age ? `${visit.patient.age} yosh` : null,
    formatGender(visit.patient.gender),
    visit.patient.phone ?? "Telefon yo‘q",
  ].filter(Boolean);

  return parts.join(" / ");
}

export function formatVisitContext(visit: VisitListItem): string {
  const parts = [
    visit.reason ?? "Sabab kiritilmagan",
    visit.department?.name ?? "Bo‘lim yo‘q",
    visit.doctor?.fullName ?? "Shifokor biriktirilmagan",
  ];

  return parts.join(" / ");
}

export function formatGender(gender?: "male" | "female" | "other" | "unknown"): string {
  if (gender === "male") return "Erkak";
  if (gender === "female") return "Ayol";
  if (gender === "other") return "Boshqa";
  return "Noma’lum";
}

export function formatWorkflowStatus(status: VisitWorkflowStatus): string {
  const labels: Record<VisitWorkflowStatus, string> = {
    intake_created: "Qabul yaratildi",
    doctor_assigned: "Shifokor biriktirildi",
    queued_for_doctor: "Shifokor navbatida",
    with_doctor: "Shifokor qabulida",
    awaiting_lab: "Laboratoriya kutmoqda",
    lab_in_progress: "Laboratoriya jarayonda",
    awaiting_radiology: "Radiologiya kutmoqda",
    radiology_in_progress: "Radiologiya jarayonda",
    awaiting_procedure: "Muolaja kutmoqda",
    procedure_in_progress: "Muolaja jarayonda",
    awaiting_doctor_review: "Shifokor review kutmoqda",
    consultation_completed: "Konsultatsiya tugagan",
    billing_pending: "To‘lov kutmoqda",
    partially_paid: "Qisman to‘langan",
    paid: "To‘langan",
    completed: "Yakunlangan",
    cancelled: "Bekor qilingan",
  };

  return labels[status];
}

export function formatConsultationStatus(status?: ConsultationStatus): string {
  if (status === "not_started") return "Boshlanmagan";
  if (status === "in_progress") return "Jarayonda";
  if (status === "waiting_for_results") return "Natijalar kutmoqda";
  if (status === "reviewing_results") return "Natijalar ko‘rilmoqda";
  if (status === "completed") return "Tugagan";
  if (status === "cancelled") return "Bekor qilingan";
  return "Konsultatsiya yo‘q";
}

export function formatAppointmentStatus(status: AppointmentStatus): string {
  if (status === "scheduled") return "Rejalashtirilgan";
  if (status === "confirmed") return "Tasdiqlangan";
  if (status === "arrived") return "Kelgan";
  if (status === "checked_in") return "Check-in qilingan";
  if (status === "converted_to_visit") return "Tashrifga aylantirilgan";
  if (status === "no_show") return "Kelmadi";
  return "Bekor qilingan";
}

export function formatElapsed(value: string): string {
  const timestamp = new Date(value).getTime();
  if (Number.isNaN(timestamp)) return "noma’lum";

  const minutes = Math.max(0, Math.round((Date.now() - timestamp) / 60000));
  if (minutes < 1) return "hozir";
  if (minutes < 60) return `${minutes} daq`;

  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  if (hours < 24) return remaining ? `${hours} soat ${remaining} daq` : `${hours} soat`;

  return `${Math.floor(hours / 24)} kun`;
}

export function formatTime(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("uz-UZ", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
