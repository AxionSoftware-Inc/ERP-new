export type EntityStatus = "ACTIVE" | "INACTIVE" | "ARCHIVED" | "LOCKED" | "CANCELLED";

export type AppointmentStatus =
  | "SCHEDULED"
  | "CONFIRMED"
  | "ARRIVED"
  | "WAITING_PAYMENT"
  | "WAITING_DOCTOR"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "NO_SHOW"
  | "CANCELLED";

export type PaymentStatus = "DRAFT" | "ISSUED" | "PARTIALLY_PAID" | "PAID" | "OVERDUE" | "CANCELLED" | "REFUNDED";
export type OrderStatus = "ORDERED" | "WAITING_PAYMENT" | "WAITING_SAMPLE" | "SAMPLE_COLLECTED" | "IN_PROGRESS" | "READY_FOR_APPROVAL" | "APPROVED" | "DELIVERED" | "CANCELLED";
export type EncounterStatus = "DRAFT" | "IN_PROGRESS" | "COMPLETED" | "LOCKED" | "CANCELLED";

export type Branch = {
  id: string;
  clinicId: string;
  name: string;
  code: string;
  phone: string;
  address: string;
  workingHours: string;
  status: EntityStatus;
};

export type Department = {
  id: string;
  branchId: string;
  name: string;
  type: "RECEPTION" | "MEDICAL" | "LABORATORY" | "DIAGNOSTICS" | "CASHIER" | "ADMIN";
  status: EntityStatus;
};

export type StaffMember = {
  id: string;
  branchId: string;
  departmentId: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  gender: "MALE" | "FEMALE";
  phone: string;
  position: string;
  specialization?: string;
  status: EntityStatus;
};

export type User = {
  id: string;
  staffMemberId: string;
  username: string;
  roleCodes: string[];
  status: "ACTIVE" | "INACTIVE" | "LOCKED";
  lastLoginAt: string;
};

export type Role = {
  id: string;
  code: string;
  name: string;
  description: string;
};

export type DoctorProfile = {
  id: string;
  staffMemberId: string;
  specialty: string;
  roomNumber: string;
  defaultAppointmentDuration: number;
  consultationFeeServiceId: string;
  status: EntityStatus;
};

export type Patient = {
  id: string;
  branchId: string;
  patientNumber: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  gender: "MALE" | "FEMALE";
  birthDate: string;
  phone: string;
  address: string;
  bloodType?: string;
  allergies?: string;
  chronicDiseases?: string;
  status: EntityStatus;
};

export type ServiceCategory = {
  id: string;
  name: string;
  code: string;
  status: EntityStatus;
};

export type Service = {
  id: string;
  categoryId: string;
  departmentId: string;
  name: string;
  code: string;
  serviceType: "CONSULTATION" | "LAB_TEST" | "DIAGNOSTIC" | "PROCEDURE" | "PACKAGE";
  basePrice: number;
  currency: "UZS";
  requiresPrepayment: boolean;
  durationMinutes?: number;
  status: EntityStatus;
};

export type Appointment = {
  id: string;
  branchId: string;
  patientId: string;
  doctorProfileId: string;
  serviceId: string;
  appointmentNumber: string;
  scheduledAt: string;
  durationMinutes: number;
  source: "WALK_IN" | "PHONE" | "ONLINE" | "DOCTOR_REFERRAL";
  type: "FIRST_VISIT" | "FOLLOW_UP" | "URGENT";
  status: AppointmentStatus;
  reason: string;
  checkedInAt?: string;
  startedAt?: string;
  finishedAt?: string;
};

export type QueueTicket = {
  id: string;
  branchId: string;
  patientId: string;
  appointmentId?: string;
  departmentId: string;
  ticketNumber: string;
  currentStep: "RECEPTION" | "CASHIER" | "DOCTOR" | "LABORATORY" | "DIAGNOSTICS" | "DOCUMENTS";
  priority: "NORMAL" | "HIGH" | "URGENT";
  status: "WAITING" | "CALLED" | "IN_SERVICE" | "ON_HOLD" | "COMPLETED" | "CANCELLED";
};

export type CallRequest = {
  id: string;
  branchId: string;
  patientId?: string;
  callerName: string;
  phone: string;
  topic: string;
  comment: string;
  assignedToId: string;
  status: "NEW" | "IN_PROGRESS" | "APPOINTMENT_CREATED" | "CLOSED" | "MISSED";
  followUpAt?: string;
  createdAt: string;
};

export type MedicalEncounter = {
  id: string;
  branchId: string;
  patientId: string;
  appointmentId: string;
  doctorProfileId: string;
  chiefComplaint: string;
  anamnesis: string;
  objectiveExam: string;
  preliminaryDiagnosis: string;
  finalDiagnosis?: string;
  icdCode?: string;
  treatmentPlan: string;
  recommendations: string;
  followUpDate?: string;
  status: EncounterStatus;
};

export type LabTest = {
  id: string;
  serviceId: string;
  name: string;
  code: string;
  category: string;
  sampleType: "BLOOD" | "URINE" | "SWAB";
  unit: string;
  referenceRange: string;
  status: EntityStatus;
};

export type LabOrder = {
  id: string;
  branchId: string;
  patientId: string;
  appointmentId?: string;
  encounterId?: string;
  doctorProfileId?: string;
  orderNumber: string;
  priority: "NORMAL" | "URGENT";
  status: OrderStatus;
  orderedAt: string;
  sampleCollectedAt?: string;
  completedAt?: string;
  testIds: string[];
};

export type LabResult = {
  id: string;
  labOrderId: string;
  labTestId: string;
  value: string;
  unit: string;
  referenceRange: string;
  isAbnormal: boolean;
  comment?: string;
  status: "DRAFT" | "ENTERED" | "APPROVED" | "REJECTED";
};

export type DiagnosticService = {
  id: string;
  serviceId: string;
  name: string;
  code: string;
  category: "ULTRASOUND" | "XRAY" | "ECG" | "CT" | "MRI";
  defaultDuration: number;
  status: EntityStatus;
};

export type DiagnosticOrder = {
  id: string;
  branchId: string;
  patientId: string;
  appointmentId?: string;
  encounterId?: string;
  doctorProfileId?: string;
  diagnosticServiceId: string;
  scheduledAt: string;
  status: "ORDERED" | "WAITING_PAYMENT" | "SCHEDULED" | "IN_PROGRESS" | "READY" | "APPROVED" | "DELIVERED" | "CANCELLED";
  priority: "NORMAL" | "URGENT";
};

export type DiagnosticResult = {
  id: string;
  diagnosticOrderId: string;
  conclusion: string;
  findings: string;
  fileUrls: string[];
  status: "DRAFT" | "APPROVED";
};

export type PaymentInvoice = {
  id: string;
  branchId: string;
  patientId: string;
  invoiceNumber: string;
  subtotal: number;
  discountAmount: number;
  totalAmount: number;
  paidAmount: number;
  debtAmount: number;
  currency: "UZS";
  status: PaymentStatus;
  issuedAt: string;
};

export type PaymentInvoiceItem = {
  id: string;
  invoiceId: string;
  serviceId: string;
  quantity: number;
  unitPrice: number;
  discountAmount: number;
  totalPrice: number;
  status: "ACTIVE" | "CANCELLED";
};

export type Payment = {
  id: string;
  branchId: string;
  invoiceId: string;
  patientId: string;
  cashierId: string;
  paymentNumber: string;
  amount: number;
  currency: "UZS";
  method: "CASH" | "CARD" | "BANK_TRANSFER" | "INSURANCE" | "CORPORATE" | "ONLINE";
  status: "PENDING" | "COMPLETED" | "CANCELLED" | "REFUNDED";
  paidAt: string;
};

export type MedicalDocument = {
  id: string;
  branchId: string;
  patientId: string;
  encounterId?: string;
  documentType: "DOCTOR_CONCLUSION" | "LAB_RESULT" | "DIAGNOSTIC_RESULT" | "PRESCRIPTION" | "CERTIFICATE" | "REFERRAL";
  documentNumber: string;
  title: string;
  status: "DRAFT" | "SIGNED" | "CANCELLED";
  generatedById: string;
  signedAt?: string;
};

export type Prescription = {
  id: string;
  patientId: string;
  encounterId: string;
  doctorProfileId: string;
  prescriptionNumber: string;
  status: "DRAFT" | "ISSUED" | "CANCELLED";
  issuedAt: string;
  items: {
    id: string;
    medicineName: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
  }[];
};

export type AuditLog = {
  id: string;
  actorUserId: string;
  module: string;
  entityName: string;
  entityId: string;
  action: string;
  createdAt: string;
};

export const clinic = {
  id: "clinic-001",
  name: "Shifo Med Clinic",
  legalName: "Shifo Med Clinic MChJ",
  taxNumber: "309001122",
  phone: "+998 71 200 10 10",
  email: "info@shifomed.uz",
  address: "Toshkent shahri, Yunusobod tumani",
  defaultCurrency: "UZS",
  timezone: "Asia/Tashkent",
  status: "ACTIVE" as const,
};

export const branches: Branch[] = [
  {
    id: "branch-main",
    clinicId: clinic.id,
    name: "Asosiy filial",
    code: "MAIN",
    phone: "+998 71 200 10 10",
    address: "Toshkent shahri, Yunusobod tumani, 12-mavze",
    workingHours: "08:00-20:00",
    status: "ACTIVE",
  },
];

export const departments: Department[] = [
  { id: "dep-reception", branchId: "branch-main", name: "Registratura", type: "RECEPTION", status: "ACTIVE" },
  { id: "dep-therapy", branchId: "branch-main", name: "Terapiya", type: "MEDICAL", status: "ACTIVE" },
  { id: "dep-lab", branchId: "branch-main", name: "Laboratoriya", type: "LABORATORY", status: "ACTIVE" },
  { id: "dep-diagnostics", branchId: "branch-main", name: "Diagnostika", type: "DIAGNOSTICS", status: "ACTIVE" },
  { id: "dep-cashier", branchId: "branch-main", name: "Kassa", type: "CASHIER", status: "ACTIVE" },
];

export const roles: Role[] = [
  { id: "role-admin", code: "SUPER_ADMIN", name: "Super admin", description: "Barcha bo'limlarga to'liq kirish." },
  { id: "role-director", code: "DIRECTOR", name: "Rahbar", description: "Boshqaruv paneli va hisobotlar." },
  { id: "role-registrar", code: "REGISTRAR", name: "Registrator", description: "Bemor va qabul jarayonlari." },
  { id: "role-cashier", code: "CASHIER", name: "Kassir", description: "To'lov, qarzdorlik va kassa." },
  { id: "role-doctor", code: "DOCTOR", name: "Shifokor", description: "Tibbiy qabul va hujjatlar." },
  { id: "role-lab", code: "LAB_TECHNICIAN", name: "Laborant", description: "Laboratoriya order va natijalari." },
];

export const staffMembers: StaffMember[] = [
  { id: "staff-001", branchId: "branch-main", departmentId: "dep-therapy", firstName: "Aziza", lastName: "Karimova", gender: "FEMALE", phone: "+998 90 111 22 33", position: "Bosh shifokor", specialization: "Terapevt", status: "ACTIVE" },
  { id: "staff-002", branchId: "branch-main", departmentId: "dep-reception", firstName: "Madina", lastName: "Sobirova", gender: "FEMALE", phone: "+998 90 222 33 44", position: "Registrator", status: "ACTIVE" },
  { id: "staff-003", branchId: "branch-main", departmentId: "dep-cashier", firstName: "Dilshod", lastName: "Nazarov", gender: "MALE", phone: "+998 90 333 44 55", position: "Kassir", status: "ACTIVE" },
  { id: "staff-004", branchId: "branch-main", departmentId: "dep-lab", firstName: "Gulnoza", lastName: "Rasulova", gender: "FEMALE", phone: "+998 90 444 55 66", position: "Laborant", status: "ACTIVE" },
  { id: "staff-005", branchId: "branch-main", departmentId: "dep-diagnostics", firstName: "Jasur", lastName: "Tursunov", gender: "MALE", phone: "+998 90 555 66 77", position: "UZI mutaxassisi", specialization: "Ultratovush diagnostikasi", status: "ACTIVE" },
];

export const users: User[] = [
  { id: "user-001", staffMemberId: "staff-001", username: "doctor.aziza", roleCodes: ["DOCTOR", "DIRECTOR"], status: "ACTIVE", lastLoginAt: "2026-04-27T08:05:00+05:00" },
  { id: "user-002", staffMemberId: "staff-002", username: "registrar.madina", roleCodes: ["REGISTRAR"], status: "ACTIVE", lastLoginAt: "2026-04-27T07:55:00+05:00" },
  { id: "user-003", staffMemberId: "staff-003", username: "cashier.dilshod", roleCodes: ["CASHIER"], status: "ACTIVE", lastLoginAt: "2026-04-27T08:01:00+05:00" },
  { id: "user-004", staffMemberId: "staff-004", username: "lab.gulnoza", roleCodes: ["LAB_TECHNICIAN"], status: "ACTIVE", lastLoginAt: "2026-04-27T08:10:00+05:00" },
];

export const doctorProfiles: DoctorProfile[] = [
  {
    id: "doctor-001",
    staffMemberId: "staff-001",
    specialty: "Terapevt",
    roomNumber: "204",
    defaultAppointmentDuration: 20,
    consultationFeeServiceId: "srv-consult-therapy",
    status: "ACTIVE",
  },
];

export const patients: Patient[] = [
  { id: "patient-001", branchId: "branch-main", patientNumber: "P-000001", firstName: "Sardor", lastName: "Aliyev", gender: "MALE", birthDate: "1988-02-14", phone: "+998 90 777 11 22", address: "Toshkent, Chilonzor", bloodType: "O+", allergies: "Penitsillin", chronicDiseases: "Gipertoniya", status: "ACTIVE" },
  { id: "patient-002", branchId: "branch-main", patientNumber: "P-000002", firstName: "Dilnoza", lastName: "Karimova", gender: "FEMALE", birthDate: "1994-09-03", phone: "+998 91 222 11 00", address: "Toshkent, Mirzo Ulug'bek", bloodType: "A+", status: "ACTIVE" },
  { id: "patient-003", branchId: "branch-main", patientNumber: "P-000003", firstName: "Javohir", lastName: "Rahmonov", gender: "MALE", birthDate: "2012-06-21", phone: "+998 93 123 45 67", address: "Toshkent, Yunusobod", allergies: "Yo'q", status: "ACTIVE" },
  { id: "patient-004", branchId: "branch-main", patientNumber: "P-000004", firstName: "Malika", lastName: "Usmonova", gender: "FEMALE", birthDate: "1979-12-11", phone: "+998 94 555 20 20", address: "Toshkent, Shayxontohur", chronicDiseases: "Qandli diabet 2-tip", status: "ACTIVE" },
];

export const serviceCategories: ServiceCategory[] = [
  { id: "cat-consult", name: "Shifokor qabuli", code: "CONSULT", status: "ACTIVE" },
  { id: "cat-lab", name: "Laboratoriya", code: "LAB", status: "ACTIVE" },
  { id: "cat-diagnostics", name: "Diagnostika", code: "DIAG", status: "ACTIVE" },
  { id: "cat-docs", name: "Tibbiy hujjatlar", code: "DOC", status: "ACTIVE" },
];

export const services: Service[] = [
  { id: "srv-consult-therapy", categoryId: "cat-consult", departmentId: "dep-therapy", name: "Terapevt qabuli", code: "CONS-THER-001", serviceType: "CONSULTATION", basePrice: 150000, currency: "UZS", requiresPrepayment: true, durationMinutes: 20, status: "ACTIVE" },
  { id: "srv-cbc", categoryId: "cat-lab", departmentId: "dep-lab", name: "Umumiy qon tahlili", code: "LAB-CBC", serviceType: "LAB_TEST", basePrice: 60000, currency: "UZS", requiresPrepayment: true, status: "ACTIVE" },
  { id: "srv-glucose", categoryId: "cat-lab", departmentId: "dep-lab", name: "Qonda glyukoza", code: "LAB-GLU", serviceType: "LAB_TEST", basePrice: 45000, currency: "UZS", requiresPrepayment: true, status: "ACTIVE" },
  { id: "srv-ultrasound", categoryId: "cat-diagnostics", departmentId: "dep-diagnostics", name: "Qorin bo'shlig'i UZI", code: "DIAG-US-ABD", serviceType: "DIAGNOSTIC", basePrice: 180000, currency: "UZS", requiresPrepayment: true, durationMinutes: 25, status: "ACTIVE" },
  { id: "srv-certificate", categoryId: "cat-docs", departmentId: "dep-reception", name: "Tibbiy ma'lumotnoma", code: "DOC-CERT", serviceType: "PROCEDURE", basePrice: 30000, currency: "UZS", requiresPrepayment: false, status: "ACTIVE" },
];

export const appointments: Appointment[] = [
  { id: "apt-001", branchId: "branch-main", patientId: "patient-001", doctorProfileId: "doctor-001", serviceId: "srv-consult-therapy", appointmentNumber: "A-20260427-001", scheduledAt: "2026-04-27T09:00:00+05:00", durationMinutes: 20, source: "PHONE", type: "FIRST_VISIT", status: "COMPLETED", reason: "Bosh og'rig'i va qon bosimi", checkedInAt: "2026-04-27T08:52:00+05:00", startedAt: "2026-04-27T09:02:00+05:00", finishedAt: "2026-04-27T09:24:00+05:00" },
  { id: "apt-002", branchId: "branch-main", patientId: "patient-002", doctorProfileId: "doctor-001", serviceId: "srv-consult-therapy", appointmentNumber: "A-20260427-002", scheduledAt: "2026-04-27T09:30:00+05:00", durationMinutes: 20, source: "WALK_IN", type: "FIRST_VISIT", status: "IN_PROGRESS", reason: "Holizlik va isitma", checkedInAt: "2026-04-27T09:20:00+05:00", startedAt: "2026-04-27T09:34:00+05:00" },
  { id: "apt-003", branchId: "branch-main", patientId: "patient-003", doctorProfileId: "doctor-001", serviceId: "srv-consult-therapy", appointmentNumber: "A-20260427-003", scheduledAt: "2026-04-27T10:00:00+05:00", durationMinutes: 20, source: "PHONE", type: "FOLLOW_UP", status: "WAITING_DOCTOR", reason: "Takroriy ko'rik" },
  { id: "apt-004", branchId: "branch-main", patientId: "patient-004", doctorProfileId: "doctor-001", serviceId: "srv-consult-therapy", appointmentNumber: "A-20260427-004", scheduledAt: "2026-04-27T10:30:00+05:00", durationMinutes: 20, source: "WALK_IN", type: "FIRST_VISIT", status: "WAITING_PAYMENT", reason: "Qand nazorati" },
  { id: "apt-005", branchId: "branch-main", patientId: "patient-003", doctorProfileId: "doctor-001", serviceId: "srv-consult-therapy", appointmentNumber: "A-20260427-005", scheduledAt: "2026-04-27T08:30:00+05:00", durationMinutes: 20, source: "PHONE", type: "FOLLOW_UP", status: "NO_SHOW", reason: "Bolada yo'tal bo'yicha qayta ko'rik" },
];

export const callRequests: CallRequest[] = [
  {
    id: "call-001",
    branchId: "branch-main",
    patientId: "patient-002",
    callerName: "Dilnoza Karimova",
    phone: "+998 91 222 11 00",
    topic: "Terapevt qabuliga yozilish",
    comment: "Bugun tushdan keyin bo'sh vaqt so'radi.",
    assignedToId: "staff-002",
    status: "APPOINTMENT_CREATED",
    createdAt: "2026-04-27T08:15:00+05:00",
  },
  {
    id: "call-002",
    branchId: "branch-main",
    callerName: "Akmal Murodov",
    phone: "+998 90 888 10 20",
    topic: "UZI narxi va vaqtini so'rash",
    comment: "Qorin bo'shlig'i UZI uchun ertaga vaqt kerak.",
    assignedToId: "staff-002",
    status: "IN_PROGRESS",
    followUpAt: "2026-04-27T15:00:00+05:00",
    createdAt: "2026-04-27T10:12:00+05:00",
  },
  {
    id: "call-003",
    branchId: "branch-main",
    callerName: "Noma'lum qo'ng'iroq",
    phone: "+998 93 700 44 11",
    topic: "Narxlar haqida",
    comment: "Qayta qo'ng'iroq qilish kerak.",
    assignedToId: "staff-002",
    status: "NEW",
    followUpAt: "2026-04-27T13:30:00+05:00",
    createdAt: "2026-04-27T11:05:00+05:00",
  },
];

export const queueTickets: QueueTicket[] = [
  { id: "queue-001", branchId: "branch-main", patientId: "patient-002", appointmentId: "apt-002", departmentId: "dep-therapy", ticketNumber: "D-012", currentStep: "DOCTOR", priority: "NORMAL", status: "IN_SERVICE" },
  { id: "queue-002", branchId: "branch-main", patientId: "patient-003", appointmentId: "apt-003", departmentId: "dep-therapy", ticketNumber: "D-013", currentStep: "DOCTOR", priority: "NORMAL", status: "WAITING" },
  { id: "queue-003", branchId: "branch-main", patientId: "patient-004", appointmentId: "apt-004", departmentId: "dep-cashier", ticketNumber: "K-007", currentStep: "CASHIER", priority: "NORMAL", status: "WAITING" },
];

export const medicalEncounters: MedicalEncounter[] = [
  {
    id: "enc-001",
    branchId: "branch-main",
    patientId: "patient-001",
    appointmentId: "apt-001",
    doctorProfileId: "doctor-001",
    chiefComplaint: "Bosh og'rig'i, ensa sohasida bosim, holsizlik.",
    anamnesis: "Oxirgi 3 kun davomida qon bosimi ko'tarilgan.",
    objectiveExam: "AB 150/95, puls 86, umumiy ahvoli qoniqarli.",
    preliminaryDiagnosis: "Arterial gipertenziya kuchayishi",
    finalDiagnosis: "Essensial gipertenziya, nazorat talab qilinadi",
    icdCode: "I10",
    treatmentPlan: "Qon bosimini monitoring qilish, tuz iste'molini kamaytirish.",
    recommendations: "7 kundan keyin takroriy qabul.",
    followUpDate: "2026-05-04",
    status: "LOCKED",
  },
  {
    id: "enc-002",
    branchId: "branch-main",
    patientId: "patient-002",
    appointmentId: "apt-002",
    doctorProfileId: "doctor-001",
    chiefComplaint: "Isitma, tomoq og'rig'i, holsizlik.",
    anamnesis: "Kecha boshlangan.",
    objectiveExam: "Tana harorati 37.8, tomoq qizarishi bor.",
    preliminaryDiagnosis: "O'tkir respirator infeksiya",
    treatmentPlan: "Laboratoriya tahlili va simptomatik davo.",
    recommendations: "Ko'p suyuqlik ichish, dam olish.",
    status: "IN_PROGRESS",
  },
];

export const labTests: LabTest[] = [
  { id: "labtest-cbc", serviceId: "srv-cbc", name: "Umumiy qon tahlili", code: "CBC", category: "Gematologiya", sampleType: "BLOOD", unit: "panel", referenceRange: "Yosh va jinsga bog'liq", status: "ACTIVE" },
  { id: "labtest-glucose", serviceId: "srv-glucose", name: "Glyukoza", code: "GLU", category: "Biokimyo", sampleType: "BLOOD", unit: "mmol/L", referenceRange: "3.9-5.5", status: "ACTIVE" },
];

export const labOrders: LabOrder[] = [
  { id: "labord-001", branchId: "branch-main", patientId: "patient-002", appointmentId: "apt-002", encounterId: "enc-002", doctorProfileId: "doctor-001", orderNumber: "L-20260427-001", priority: "NORMAL", status: "SAMPLE_COLLECTED", orderedAt: "2026-04-27T09:42:00+05:00", sampleCollectedAt: "2026-04-27T09:50:00+05:00", testIds: ["labtest-cbc"] },
  { id: "labord-002", branchId: "branch-main", patientId: "patient-004", appointmentId: "apt-004", doctorProfileId: "doctor-001", orderNumber: "L-20260427-002", priority: "NORMAL", status: "WAITING_PAYMENT", orderedAt: "2026-04-27T10:05:00+05:00", testIds: ["labtest-glucose"] },
];

export const labResults: LabResult[] = [
  { id: "labres-001", labOrderId: "labord-001", labTestId: "labtest-cbc", value: "Leykotsitlar 8.2", unit: "10^9/L", referenceRange: "4.0-9.0", isAbnormal: false, status: "ENTERED" },
];

export const diagnosticServices: DiagnosticService[] = [
  { id: "diag-us-abd", serviceId: "srv-ultrasound", name: "Qorin bo'shlig'i UZI", code: "US-ABD", category: "ULTRASOUND", defaultDuration: 25, status: "ACTIVE" },
];

export const diagnosticOrders: DiagnosticOrder[] = [
  { id: "diagord-001", branchId: "branch-main", patientId: "patient-001", appointmentId: "apt-001", encounterId: "enc-001", doctorProfileId: "doctor-001", diagnosticServiceId: "diag-us-abd", scheduledAt: "2026-04-27T11:00:00+05:00", status: "SCHEDULED", priority: "NORMAL" },
];

export const diagnosticResults: DiagnosticResult[] = [
  { id: "diagres-001", diagnosticOrderId: "diagord-001", conclusion: "Jigar o'lchami me'yorida, o't pufagida yirik patologiya aniqlanmadi.", findings: "Diffuz o'zgarishlar kuzatilmadi.", fileUrls: [], status: "DRAFT" },
];

export const paymentInvoices: PaymentInvoice[] = [
  { id: "inv-001", branchId: "branch-main", patientId: "patient-001", invoiceNumber: "INV-20260427-001", subtotal: 330000, discountAmount: 0, totalAmount: 330000, paidAmount: 330000, debtAmount: 0, currency: "UZS", status: "PAID", issuedAt: "2026-04-27T08:55:00+05:00" },
  { id: "inv-002", branchId: "branch-main", patientId: "patient-002", invoiceNumber: "INV-20260427-002", subtotal: 210000, discountAmount: 10000, totalAmount: 200000, paidAmount: 200000, debtAmount: 0, currency: "UZS", status: "PAID", issuedAt: "2026-04-27T09:25:00+05:00" },
  { id: "inv-003", branchId: "branch-main", patientId: "patient-004", invoiceNumber: "INV-20260427-003", subtotal: 195000, discountAmount: 0, totalAmount: 195000, paidAmount: 0, debtAmount: 195000, currency: "UZS", status: "ISSUED", issuedAt: "2026-04-27T10:01:00+05:00" },
];

export const paymentInvoiceItems: PaymentInvoiceItem[] = [
  { id: "invit-001", invoiceId: "inv-001", serviceId: "srv-consult-therapy", quantity: 1, unitPrice: 150000, discountAmount: 0, totalPrice: 150000, status: "ACTIVE" },
  { id: "invit-002", invoiceId: "inv-001", serviceId: "srv-ultrasound", quantity: 1, unitPrice: 180000, discountAmount: 0, totalPrice: 180000, status: "ACTIVE" },
  { id: "invit-003", invoiceId: "inv-002", serviceId: "srv-consult-therapy", quantity: 1, unitPrice: 150000, discountAmount: 10000, totalPrice: 140000, status: "ACTIVE" },
  { id: "invit-004", invoiceId: "inv-002", serviceId: "srv-cbc", quantity: 1, unitPrice: 60000, discountAmount: 0, totalPrice: 60000, status: "ACTIVE" },
  { id: "invit-005", invoiceId: "inv-003", serviceId: "srv-consult-therapy", quantity: 1, unitPrice: 150000, discountAmount: 0, totalPrice: 150000, status: "ACTIVE" },
  { id: "invit-006", invoiceId: "inv-003", serviceId: "srv-glucose", quantity: 1, unitPrice: 45000, discountAmount: 0, totalPrice: 45000, status: "ACTIVE" },
];

export const payments: Payment[] = [
  { id: "pay-001", branchId: "branch-main", invoiceId: "inv-001", patientId: "patient-001", cashierId: "staff-003", paymentNumber: "PAY-20260427-001", amount: 330000, currency: "UZS", method: "CARD", status: "COMPLETED", paidAt: "2026-04-27T08:58:00+05:00" },
  { id: "pay-002", branchId: "branch-main", invoiceId: "inv-002", patientId: "patient-002", cashierId: "staff-003", paymentNumber: "PAY-20260427-002", amount: 200000, currency: "UZS", method: "CASH", status: "COMPLETED", paidAt: "2026-04-27T09:27:00+05:00" },
];

export const medicalDocuments: MedicalDocument[] = [
  { id: "doc-001", branchId: "branch-main", patientId: "patient-001", encounterId: "enc-001", documentType: "DOCTOR_CONCLUSION", documentNumber: "DOC-20260427-001", title: "Shifokor xulosasi", status: "SIGNED", generatedById: "staff-001", signedAt: "2026-04-27T09:25:00+05:00" },
  { id: "doc-002", branchId: "branch-main", patientId: "patient-002", encounterId: "enc-002", documentType: "LAB_RESULT", documentNumber: "DOC-20260427-002", title: "Laboratoriya natijasi", status: "DRAFT", generatedById: "staff-004" },
];

export const prescriptions: Prescription[] = [
  {
    id: "rx-001",
    patientId: "patient-001",
    encounterId: "enc-001",
    doctorProfileId: "doctor-001",
    prescriptionNumber: "RX-20260427-001",
    status: "ISSUED",
    issuedAt: "2026-04-27T09:22:00+05:00",
    items: [
      { id: "rxitem-001", medicineName: "Amlodipin", dosage: "5 mg", frequency: "Kuniga 1 marta", duration: "30 kun", instructions: "Ertalab ovqatdan keyin" },
    ],
  },
];

export const auditLogs: AuditLog[] = [
  { id: "audit-001", actorUserId: "user-002", module: "reception", entityName: "Appointment", entityId: "apt-001", action: "CREATE", createdAt: "2026-04-27T08:40:00+05:00" },
  { id: "audit-002", actorUserId: "user-003", module: "cashier", entityName: "Payment", entityId: "pay-001", action: "CREATE", createdAt: "2026-04-27T08:58:00+05:00" },
  { id: "audit-003", actorUserId: "user-001", module: "doctor", entityName: "MedicalEncounter", entityId: "enc-001", action: "LOCK", createdAt: "2026-04-27T09:24:00+05:00" },
];

export const dashboardMetrics = {
  todayPatients: appointments.length,
  activeQueue: queueTickets.filter((ticket) => ticket.status !== "COMPLETED" && ticket.status !== "CANCELLED").length,
  todayRevenue: payments.reduce((sum, payment) => sum + payment.amount, 0),
  totalDebt: paymentInvoices.reduce((sum, invoice) => sum + invoice.debtAmount, 0),
  labWaiting: labOrders.filter((order) => ["WAITING_SAMPLE", "SAMPLE_COLLECTED", "IN_PROGRESS"].includes(order.status)).length,
  diagnosticWaiting: diagnosticOrders.filter((order) => ["SCHEDULED", "IN_PROGRESS", "READY"].includes(order.status)).length,
};

export const fakeClinicData = {
  clinic,
  branches,
  departments,
  roles,
  users,
  staffMembers,
  doctorProfiles,
  patients,
  serviceCategories,
  services,
  appointments,
  callRequests,
  queueTickets,
  medicalEncounters,
  labTests,
  labOrders,
  labResults,
  diagnosticServices,
  diagnosticOrders,
  diagnosticResults,
  paymentInvoices,
  paymentInvoiceItems,
  payments,
  medicalDocuments,
  prescriptions,
  auditLogs,
  dashboardMetrics,
};
