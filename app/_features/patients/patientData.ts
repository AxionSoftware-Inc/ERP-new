import {
  appointments,
  diagnosticOrders,
  diagnosticResults,
  labOrders,
  labResults,
  medicalDocuments,
  medicalEncounters,
  patients,
  paymentInvoices,
  prescriptions,
  type Patient,
} from "../../_data/fakeClinicData";
import { calculateAge } from "../doctor/doctorData";
import { formatDateTime, formatMoney } from "../reception/receptionData";

export type PatientRow = Patient & {
  fullName: string;
  age: number;
  lastAppointmentAt?: string;
  debtAmount: number;
  appointmentCount: number;
};

export function getPatientRows(): PatientRow[] {
  return patients.map((patient) => {
    const patientAppointments = appointments.filter((item) => item.patientId === patient.id);
    const lastAppointment = [...patientAppointments].sort((a, b) => b.scheduledAt.localeCompare(a.scheduledAt))[0];
    return {
      ...patient,
      fullName: `${patient.lastName} ${patient.firstName}`,
      age: calculateAge(patient.birthDate),
      lastAppointmentAt: lastAppointment?.scheduledAt,
      debtAmount: paymentInvoices.filter((item) => item.patientId === patient.id).reduce((sum, invoice) => sum + invoice.debtAmount, 0),
      appointmentCount: patientAppointments.length,
    };
  });
}

export function getPatientDetail(patientId: string) {
  const patient = getPatientRows().find((item) => item.id === patientId);
  if (!patient) return undefined;
  const patientAppointments = appointments.filter((item) => item.patientId === patient.id);
  const encounters = medicalEncounters.filter((item) => item.patientId === patient.id);
  const invoices = paymentInvoices.filter((item) => item.patientId === patient.id);
  const labs = labOrders.filter((item) => item.patientId === patient.id);
  const diagnostics = diagnosticOrders.filter((item) => item.patientId === patient.id);
  return {
    patient,
    appointments: patientAppointments,
    encounters,
    invoices,
    labs,
    labResults,
    diagnostics,
    diagnosticResults,
    documents: medicalDocuments.filter((item) => item.patientId === patient.id),
    prescriptions: prescriptions.filter((item) => item.patientId === patient.id),
  };
}

export { formatDateTime, formatMoney };
