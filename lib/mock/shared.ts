import type { BranchSummary, DepartmentSummary, DoctorSummary, Money, UserSummary } from "../types/shared";

export const mockBranches: BranchSummary[] = [
  { id: "branch-main", name: "Toshkent Central Clinic", code: "TCC" },
  { id: "branch-chilonzor", name: "Chilonzor Family Clinic", code: "CFC" },
];

export const mockDepartments: DepartmentSummary[] = [
  { id: "dep-therapy", name: "Therapy", code: "THR" },
  { id: "dep-cardiology", name: "Cardiology", code: "CRD" },
  { id: "dep-neurology", name: "Neurology", code: "NEU" },
  { id: "dep-endocrinology", name: "Endocrinology", code: "END" },
  { id: "dep-laboratory", name: "Laboratory", code: "LAB" },
  { id: "dep-radiology", name: "Radiology", code: "RAD" },
  { id: "dep-procedures", name: "Procedures", code: "PRC" },
];

export const mockDoctors: DoctorSummary[] = [
  { id: "doc-akmal", fullName: "Dr. Akmal Rahimov", specialization: "Cardiologist", department: mockDepartments[1] },
  { id: "doc-sevara", fullName: "Dr. Sevara Karimova", specialization: "Neurologist", department: mockDepartments[2] },
  { id: "doc-nodir", fullName: "Dr. Nodir Xasanov", specialization: "Therapist", department: mockDepartments[0] },
  { id: "doc-dilfuza", fullName: "Dr. Dilfuza Tohirova", specialization: "Endocrinologist", department: mockDepartments[3] },
  { id: "doc-rustam", fullName: "Dr. Rustam Saidov", specialization: "Radiologist", department: mockDepartments[5] },
];

export const mockUsers: UserSummary[] = [
  { id: "usr-reception-1", fullName: "Gulnoza Abdullayeva", role: "receptionist" },
  { id: "usr-lab-1", fullName: "Bekzod Hamroyev", role: "lab_operator" },
  { id: "usr-lab-verifier-1", fullName: "Malika Usmonova", role: "lab_verifier" },
  { id: "usr-cashier-1", fullName: "Aziza Rahmonova", role: "cashier" },
  { id: "usr-admin-1", fullName: "Jasur Muminov", role: "admin" },
];

export function createMoney(amount: number, currency: Money["currency"] = "UZS"): Money {
  return {
    amount,
    currency,
    formatted: `${new Intl.NumberFormat("uz-UZ").format(amount)} ${currency}`,
  };
}

export function daysAgo(days: number, hour = 9): string {
  const date = new Date("2026-05-02T00:00:00.000Z");
  date.setUTCDate(date.getUTCDate() - days);
  date.setUTCHours(hour, 0, 0, 0);
  return date.toISOString();
}

export function hoursAgo(hours: number): string {
  const date = new Date("2026-05-02T12:00:00.000Z");
  date.setUTCHours(date.getUTCHours() - hours);
  return date.toISOString();
}
