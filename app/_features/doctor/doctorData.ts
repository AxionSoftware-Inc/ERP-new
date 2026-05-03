import {
  appointments,
  diagnosticOrders,
  diagnosticResults,
  doctorProfiles,
  labOrders,
  labResults,
  labTests,
  medicalDocuments,
  medicalEncounters,
  patients,
  prescriptions,
  services,
  staffMembers,
  type Appointment,
  type MedicalEncounter,
} from "../../_data/fakeClinicData";

export type DoctorAppointmentRow = Appointment & {
  patientName: string;
  patientPhone: string;
  patientAge: number;
  patientWarnings: string[];
  doctorName: string;
  serviceName: string;
  encounterStatus: MedicalEncounter["status"] | "NOT_STARTED";
  labCount: number;
  diagnosticCount: number;
};

export const doctorStatusLabels: Record<DoctorAppointmentRow["status"], string> = {
  SCHEDULED: "Rejalashtirilgan",
  CONFIRMED: "Tasdiqlangan",
  ARRIVED: "Kelgan",
  WAITING_PAYMENT: "To'lov kutmoqda",
  WAITING_DOCTOR: "Kutmoqda",
  IN_PROGRESS: "Qabulda",
  COMPLETED: "Yakunlangan",
  NO_SHOW: "Kelmagan",
  CANCELLED: "Bekor",
};

export const doctorStatusColors: Record<DoctorAppointmentRow["status"], string> = {
  SCHEDULED: "blue",
  CONFIRMED: "cyan",
  ARRIVED: "geekblue",
  WAITING_PAYMENT: "orange",
  WAITING_DOCTOR: "gold",
  IN_PROGRESS: "processing",
  COMPLETED: "green",
  NO_SHOW: "volcano",
  CANCELLED: "red",
};

export function getDoctorAppointments(): DoctorAppointmentRow[] {
  return appointments
    .filter((appointment) => appointment.doctorProfileId === "doctor-001")
    .map((appointment) => {
      const patient = patients.find((item) => item.id === appointment.patientId);
      const doctor = doctorProfiles.find((item) => item.id === appointment.doctorProfileId);
      const staff = staffMembers.find((item) => item.id === doctor?.staffMemberId);
      const service = services.find((item) => item.id === appointment.serviceId);
      const encounter = medicalEncounters.find((item) => item.appointmentId === appointment.id);
      const warnings = [patient?.allergies ? `Allergiya: ${patient.allergies}` : "", patient?.chronicDiseases ? `Surunkali: ${patient.chronicDiseases}` : ""].filter(Boolean);

      return {
        ...appointment,
        patientName: patient ? `${patient.lastName} ${patient.firstName}` : "Noma'lum bemor",
        patientPhone: patient?.phone ?? "-",
        patientAge: patient ? calculateAge(patient.birthDate) : 0,
        patientWarnings: warnings,
        doctorName: staff ? `${staff.lastName} ${staff.firstName}` : "-",
        serviceName: service?.name ?? "-",
        encounterStatus: encounter?.status ?? "NOT_STARTED",
        labCount: labOrders.filter((item) => item.appointmentId === appointment.id).length,
        diagnosticCount: diagnosticOrders.filter((item) => item.appointmentId === appointment.id).length,
      };
    });
}

export function getDoctorMetrics() {
  const rows = getDoctorAppointments();

  return {
    today: rows.length,
    waiting: rows.filter((item) => item.status === "WAITING_DOCTOR").length,
    inProgress: rows.filter((item) => item.status === "IN_PROGRESS").length,
    completed: rows.filter((item) => item.status === "COMPLETED").length,
    needsAttention: rows.filter((item) => item.patientWarnings.length > 0).length,
  };
}

export function getDoctorAppointmentDetail(appointmentId: string) {
  const appointment = getDoctorAppointments().find((item) => item.id === appointmentId);
  if (!appointment) return undefined;

  const patient = patients.find((item) => item.id === appointment.patientId);
  const encounter = medicalEncounters.find((item) => item.appointmentId === appointment.id);
  const patientEncounters = medicalEncounters.filter((item) => item.patientId === appointment.patientId);
  const patientLabOrders = labOrders.filter((item) => item.patientId === appointment.patientId);
  const patientDiagnosticOrders = diagnosticOrders.filter((item) => item.patientId === appointment.patientId);
  const patientPrescriptions = prescriptions.filter((item) => item.patientId === appointment.patientId);
  const patientDocuments = medicalDocuments.filter((item) => item.patientId === appointment.patientId);

  return {
    appointment,
    patient,
    encounter,
    patientEncounters,
    patientLabOrders,
    patientDiagnosticOrders,
    patientPrescriptions,
    patientDocuments,
    latestLabResults: labResults.map((result) => ({
      ...result,
      testName: labTests.find((test) => test.id === result.labTestId)?.name ?? result.labTestId,
    })),
    diagnosticResults: diagnosticResults.filter((result) =>
      patientDiagnosticOrders.some((order) => order.id === result.diagnosticOrderId),
    ),
  };
}

export function calculateAge(birthDate: string) {
  const birth = new Date(birthDate);
  const now = new Date("2026-04-27T00:00:00+05:00");
  let age = now.getFullYear() - birth.getFullYear();
  const monthDiff = now.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) age -= 1;
  return age;
}

export { formatDateTime, formatTime } from "../reception/receptionData";
