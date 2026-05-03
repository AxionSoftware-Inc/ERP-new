import type { Consultation } from "../types/clinical";
import { getConsultationStatusBadge } from "../workflow/consultation-workflow";
import { mockDoctors, daysAgo, hoursAgo } from "./shared";
import { mockPatients } from "./patients";

export const mockConsultations: Consultation[] = [
  {
    id: "cons-001",
    visitId: "visit-003",
    patient: mockPatients[2],
    doctor: mockDoctors[2],
    status: "not_started",
    statusBadge: getConsultationStatusBadge("not_started"),
    chiefComplaint: "Holizlik va bosh aylanishi",
    updatedAt: hoursAgo(5),
  },
  {
    id: "cons-002",
    visitId: "visit-004",
    patient: mockPatients[3],
    doctor: mockDoctors[1],
    status: "in_progress",
    statusBadge: getConsultationStatusBadge("in_progress"),
    chiefComplaint: "Migren xurujlari",
    vitals: { temperature: 36.7, bloodPressure: "120/80", heartRate: 76, spo2: 98 },
    examination: "Nevrologik ko'rik davom etmoqda.",
    startedAt: hoursAgo(2),
    updatedAt: hoursAgo(1),
  },
  {
    id: "cons-003",
    visitId: "visit-005",
    patient: mockPatients[4],
    doctor: mockDoctors[0],
    status: "waiting_for_results",
    statusBadge: getConsultationStatusBadge("waiting_for_results"),
    chiefComplaint: "Ko'krak sohasida og'riq",
    diagnosisText: "EKG va fermentlar natijasi kutilmoqda.",
    startedAt: daysAgo(0, 8),
    updatedAt: hoursAgo(3),
  },
  {
    id: "cons-004",
    visitId: "visit-008",
    patient: mockPatients[7],
    doctor: mockDoctors[3],
    status: "reviewing_results",
    statusBadge: getConsultationStatusBadge("reviewing_results"),
    chiefComplaint: "Qand nazorati",
    diagnosisText: "Lab natijalarini ko'rib chiqish kerak.",
    startedAt: daysAgo(0, 9),
    updatedAt: hoursAgo(2),
  },
  {
    id: "cons-005",
    visitId: "visit-009",
    patient: mockPatients[0],
    doctor: mockDoctors[0],
    status: "completed",
    statusBadge: getConsultationStatusBadge("completed"),
    chiefComplaint: "Qon bosimi yuqori",
    diagnosisText: "Arterial gipertenziya.",
    plan: "Dori terapiyasi va 2 haftadan keyin nazorat.",
    doctorNote: "Holati barqaror.",
    startedAt: daysAgo(0, 8),
    completedAt: daysAgo(0, 10),
    updatedAt: daysAgo(0, 10),
  },
];

export function getMockConsultationByVisitId(visitId: string): Consultation | undefined {
  return mockConsultations.find((consultation) => consultation.visitId === visitId);
}
