import type { Appointment, AppointmentListItem, AppointmentStatus } from "../types/appointments";
import { getAppointmentNextAction, getAppointmentStatusBadge } from "../workflow/appointment-workflow";
import { mockBranches, mockDepartments, mockDoctors, daysAgo } from "./shared";
import { mockPatients } from "./patients";

const appointmentStatuses: AppointmentStatus[] = [
  "scheduled",
  "confirmed",
  "arrived",
  "checked_in",
  "converted_to_visit",
  "no_show",
  "cancelled",
  "scheduled",
];

export const mockAppointments: Appointment[] = appointmentStatuses.map((status, index) => {
  const id = `appt-${String(index + 1).padStart(3, "0")}`;
  const linkedVisitId = status === "converted_to_visit" ? "visit-004" : null;
  const appointment = {
    id,
    appointmentCode: `A-2026-${String(index + 1).padStart(4, "0")}`,
    patient: mockPatients[index % mockPatients.length],
    doctor: mockDoctors[index % 4],
    department: mockDepartments[index % 4],
    branch: mockBranches[0],
    scheduledStart: daysAgo(index % 3, 8 + index),
    scheduledEnd: daysAgo(index % 3, 9 + index),
    status,
    reason: ["Chest pain", "Headache", "Follow-up", "Thyroid check"][index % 4],
    notes: index % 2 === 0 ? "Telefon orqali tasdiqlangan." : null,
    linkedVisitId,
    statusBadge: getAppointmentStatusBadge(status),
    nextAction: { label: "View", cta: "View" },
    createdAt: daysAgo(5 + index),
    updatedAt: daysAgo(index % 2),
  } satisfies Appointment;
  return { ...appointment, nextAction: getAppointmentNextAction(appointment) };
});

export const mockAppointmentListItems: AppointmentListItem[] = mockAppointments.map((appointment) => ({
  id: appointment.id,
  appointmentCode: appointment.appointmentCode,
  patient: appointment.patient,
  doctor: appointment.doctor,
  department: appointment.department,
  scheduledStart: appointment.scheduledStart,
  scheduledEnd: appointment.scheduledEnd,
  status: appointment.status,
  statusBadge: appointment.statusBadge,
  nextAction: appointment.nextAction,
}));

export function getMockAppointmentById(id: string): Appointment | undefined {
  return mockAppointments.find((appointment) => appointment.id === id);
}
