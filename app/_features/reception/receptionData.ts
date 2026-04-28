import {
  appointments,
  callRequests,
  doctorProfiles,
  paymentInvoices,
  patients,
  queueTickets,
  services,
  staffMembers,
  type Appointment,
  type AppointmentStatus,
} from "../../_data/fakeClinicData";

export type ReceptionAppointmentRow = Appointment & {
  patientName: string;
  patientPhone: string;
  patientNumber: string;
  patientWarnings: string[];
  doctorName: string;
  serviceName: string;
  queueTicket?: string;
  queueStep?: string;
  invoiceNumber?: string;
  paymentStatus: "NO_INVOICE" | "PAID" | "PARTIALLY_PAID" | "DEBT" | "WAITING";
  debtAmount: number;
};

export const appointmentStatusLabels: Record<AppointmentStatus, string> = {
  SCHEDULED: "Rejalashtirilgan",
  CONFIRMED: "Tasdiqlangan",
  ARRIVED: "Kelgan",
  WAITING_PAYMENT: "To'lov kutmoqda",
  WAITING_DOCTOR: "Shifokor kutmoqda",
  IN_PROGRESS: "Jarayonda",
  COMPLETED: "Yakunlangan",
  NO_SHOW: "Kelmagan",
  CANCELLED: "Bekor qilingan",
};

export const appointmentStatusColors: Record<AppointmentStatus, string> = {
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

export const appointmentTypeLabels: Record<Appointment["type"], string> = {
  FIRST_VISIT: "Birinchi qabul",
  FOLLOW_UP: "Takroriy qabul",
  URGENT: "Shoshilinch",
};

export const appointmentSourceLabels: Record<Appointment["source"], string> = {
  WALK_IN: "Joyida",
  PHONE: "Telefon",
  ONLINE: "Online",
  DOCTOR_REFERRAL: "Shifokor yo'llanmasi",
};

export const paymentStatusLabels: Record<ReceptionAppointmentRow["paymentStatus"], string> = {
  NO_INVOICE: "Hisob yo'q",
  PAID: "To'langan",
  PARTIALLY_PAID: "Qisman",
  DEBT: "Qarzdor",
  WAITING: "To'lov kutmoqda",
};

export const paymentStatusColors: Record<ReceptionAppointmentRow["paymentStatus"], string> = {
  NO_INVOICE: "default",
  PAID: "green",
  PARTIALLY_PAID: "processing",
  DEBT: "red",
  WAITING: "orange",
};

export const queueStepLabels: Record<string, string> = {
  RECEPTION: "Registratura",
  CASHIER: "Kassa",
  DOCTOR: "Shifokor",
  LABORATORY: "Laboratoriya",
  DIAGNOSTICS: "Diagnostika",
  DOCUMENTS: "Hujjatlar",
};

export function getReceptionAppointments(): ReceptionAppointmentRow[] {
  return appointments.map((appointment) => {
    const patient = patients.find((item) => item.id === appointment.patientId);
    const doctor = doctorProfiles.find((item) => item.id === appointment.doctorProfileId);
    const doctorStaff = staffMembers.find((item) => item.id === doctor?.staffMemberId);
    const service = services.find((item) => item.id === appointment.serviceId);
    const ticket = queueTickets.find((item) => item.appointmentId === appointment.id);
    const invoice = paymentInvoices.find((item) => item.patientId === appointment.patientId);
    const warnings = [patient?.allergies ? `Allergiya: ${patient.allergies}` : "", patient?.chronicDiseases ? `Surunkali: ${patient.chronicDiseases}` : ""].filter(Boolean);

    return {
      ...appointment,
      patientName: patient ? `${patient.lastName} ${patient.firstName}` : "Noma'lum bemor",
      patientPhone: patient?.phone ?? "-",
      patientNumber: patient?.patientNumber ?? "-",
      patientWarnings: warnings,
      doctorName: doctorStaff ? `${doctorStaff.lastName} ${doctorStaff.firstName}` : "Noma'lum shifokor",
      serviceName: service?.name ?? "Noma'lum xizmat",
      queueTicket: ticket?.ticketNumber,
      queueStep: ticket?.currentStep,
      invoiceNumber: invoice?.invoiceNumber,
      paymentStatus: resolvePaymentStatus(invoice),
      debtAmount: invoice?.debtAmount ?? 0,
    };
  });
}

function resolvePaymentStatus(invoice: (typeof paymentInvoices)[number] | undefined): ReceptionAppointmentRow["paymentStatus"] {
  if (!invoice) return "NO_INVOICE";
  if (invoice.status === "PAID") return "PAID";
  if (invoice.status === "PARTIALLY_PAID") return "PARTIALLY_PAID";
  if (invoice.debtAmount > 0 && invoice.paidAmount === 0) return "WAITING";
  if (invoice.debtAmount > 0) return "DEBT";
  return "NO_INVOICE";
}

export function getReceptionNoShows() {
  return getReceptionAppointments().filter((appointment) => appointment.status === "NO_SHOW");
}

export function getReceptionCallRows() {
  return callRequests.map((call) => {
    const patient = patients.find((item) => item.id === call.patientId);
    const assigned = staffMembers.find((item) => item.id === call.assignedToId);

    return {
      ...call,
      patientName: patient ? `${patient.lastName} ${patient.firstName}` : "-",
      assignedName: assigned ? `${assigned.lastName} ${assigned.firstName}` : "-",
    };
  });
}

export function getReceptionMetrics() {
  const rows = getReceptionAppointments();

  return {
    totalToday: rows.length,
    arrived: rows.filter((item) => ["ARRIVED", "WAITING_DOCTOR", "IN_PROGRESS", "COMPLETED"].includes(item.status)).length,
    waiting: rows.filter((item) => ["WAITING_PAYMENT", "WAITING_DOCTOR", "SCHEDULED"].includes(item.status)).length,
    noShow: rows.filter((item) => item.status === "NO_SHOW").length,
    cancelled: rows.filter((item) => item.status === "CANCELLED").length,
    waitingPayment: rows.filter((item) => item.status === "WAITING_PAYMENT" || item.paymentStatus === "WAITING").length,
    waitingDoctor: rows.filter((item) => item.status === "WAITING_DOCTOR").length,
    callFollowUps: callRequests.filter((item) => item.followUpAt && ["NEW", "IN_PROGRESS"].includes(item.status)).length,
  };
}

export function getReceptionPatientSearchRows() {
  return patients.map((patient) => {
    const patientAppointments = appointments.filter((appointment) => appointment.patientId === patient.id);
    const lastAppointment = patientAppointments.sort((a, b) => b.scheduledAt.localeCompare(a.scheduledAt))[0];
    const invoiceDebt = paymentInvoices
      .filter((invoice) => invoice.patientId === patient.id)
      .reduce((sum, invoice) => sum + invoice.debtAmount, 0);

    return {
      id: patient.id,
      patientNumber: patient.patientNumber,
      name: `${patient.lastName} ${patient.firstName}`,
      phone: patient.phone,
      lastAppointmentAt: lastAppointment?.scheduledAt,
      debtAmount: invoiceDebt,
      warnings: [patient.allergies ? `Allergiya: ${patient.allergies}` : "", patient.chronicDiseases ? `Surunkali: ${patient.chronicDiseases}` : ""].filter(Boolean),
    };
  });
}

export function getAvailableSlots() {
  const slots = ["08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "14:00", "14:30", "15:00", "15:30"];

  return slots.map((slot) => {
    const booked = appointments.find((appointment) => formatTime(appointment.scheduledAt) === slot);

    return {
      time: slot,
      status: booked ? "BOOKED" : "FREE",
      appointmentNumber: booked?.appointmentNumber,
      patientName: booked ? getReceptionAppointments().find((appointment) => appointment.id === booked.id)?.patientName : undefined,
    };
  });
}

export function getDoctorOptions() {
  return doctorProfiles.map((doctor) => {
    const staff = staffMembers.find((item) => item.id === doctor.staffMemberId);

    return {
      label: staff ? `${staff.lastName} ${staff.firstName} - ${doctor.specialty}` : doctor.specialty,
      value: doctor.id,
    };
  });
}

export function getPatientOptions() {
  return patients.map((patient) => ({
    label: `${patient.lastName} ${patient.firstName} (${patient.phone})`,
    value: patient.id,
  }));
}

export function getServiceOptions() {
  return services
    .filter((service) => service.status === "ACTIVE")
    .map((service) => ({
      label: `${service.name} - ${formatMoney(service.basePrice)}`,
      value: service.id,
    }));
}

export function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("uz-UZ", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

export function formatTime(value: string) {
  return new Intl.DateTimeFormat("uz-UZ", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function formatMoney(value: number) {
  return `${new Intl.NumberFormat("uz-UZ").format(value)} so'm`;
}
