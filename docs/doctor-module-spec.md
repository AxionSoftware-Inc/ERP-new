# Doctor module spec

Doctor module klinik ERP ichidagi shifokor ish joyini boshqaradi. Bu modul faqat bemorlar ro'yxati emas; u quyidagi to'liq oqimni qamrab oladi:

`Doctor queue -> Start consultation -> Clinical note -> Diagnosis -> Orders -> Results review -> Prescription / plan -> Complete consultation -> Billing handoff`

## 1. Purpose

Doctor module maqsadi:
- Shifokorga bugungi ish hajmini ko'rsatish.
- Kutayotgan bemorlarni klinik prioritet bo'yicha tartiblash.
- Aktiv konsultatsiyalarni davom ettirish.
- Lab/radiology/procedure natijalarini review qilish.
- SOAP formatida klinik yozuv yuritish.
- Diagnosis, orders, prescription, documents va timeline ni bitta visit kontekstida boshqarish.
- Konsultatsiyani tugatib billingga topshirish.

## 2. Doctor roles

Asosiy rollar:
- `doctor`: o'z queue, active consultation, result review, prescription, document va clinical history bilan ishlaydi.
- `head_doctor`: doctor funksiyalariga qo'shimcha ravishda review, template, clinical quality va override actionlarga ega.
- `nurse`: vitals kiritadi, nurse task/procedure orderlarni bajaradi, doctor reviewga tayyorlaydi.
- `registrar`: doctor schedule va visit routingni ko'radi, lekin klinik yozuvni tahrirlamaydi.
- `cashier`: consultation completed bo'lgan visitni billing workflowga oladi.

## 3. Final route map

Doctor workspace routes:
- `/app/doctor`
- `/app/doctor/queue`
- `/app/doctor/active`
- `/app/doctor/reviews`
- `/app/doctor/completed`
- `/app/doctor/schedule`
- `/app/doctor/templates`
- `/app/doctor/clinical-history`

Visit routes:
- `/app/doctor/visits/[id]`
- `/app/doctor/visits/[id]/consultation`
- `/app/doctor/visits/[id]/orders`
- `/app/doctor/visits/[id]/results`
- `/app/doctor/visits/[id]/prescription`
- `/app/doctor/visits/[id]/documents`
- `/app/doctor/visits/[id]/timeline`

## 4. Route priority

Phase D1:
- `docs/doctor-module-spec.md`
- `lib/types/doctor.ts`
- `lib/mock/doctor.ts`
- mock API functions

Phase D2:
- Doctor module shell and subnav.
- Tabs: Overview, My queue, Active, Reviews, Completed, Schedule, Templates.

Phase D3:
- `/app/doctor`
- `/app/doctor/queue`
- `/app/doctor/active`
- `/app/doctor/reviews`
- `/app/doctor/completed`

Phase D4:
- `/app/doctor/visits/[id]`
- Visit detail clinical shell.

Phase D5-D9:
- Consultation editor.
- Orders.
- Results review.
- Prescription.
- Documents, templates, clinical history.

## 5. Doctor overview workspace

Route: `/app/doctor`

Shows:
- Summary strip: Waiting, Active, Needs review, Completed today, Delayed.
- Doctor focus: top clinical priority cases.
- My queue.
- Active encounters.
- Needs review.
- Completed today.
- Right rail: today's schedule, urgent cases, recent results, doctor control.

Row fields:
- Patient.
- Visit code.
- Reason / chief complaint.
- Workflow badge.
- Consultation status.
- Waiting time.
- Visit age.
- Next action.
- Primary CTA.

Actions:
- Start consultation.
- Continue consultation.
- Review result.
- Open visit.
- Complete consultation.

## 6. My queue

Route: `/app/doctor/queue`

Shows visits with `workflow_status = queued_for_doctor`.

Fields:
- Patient identity.
- Visit code.
- Reason / chief complaint.
- Queue number.
- Waiting time.
- Priority.
- Assigned time.
- Department.

Actions:
- Start consultation.
- Open patient profile.
- View previous visits.
- Mark not present if allowed.

Filters:
- Priority.
- Waiting time.
- Department.
- Visit type.

## 7. Active encounters

Route: `/app/doctor/active`

Shows visits with active or unfinished consultation:
- `workflow_status = with_doctor`
- consultation status: `in_progress`, `waiting_for_results`, `reviewing_results`

Fields:
- Patient.
- Visit.
- Draft note state.
- Pending orders.
- Diagnosis draft.
- Last saved time.

Actions:
- Continue consultation.
- Order lab.
- Order radiology.
- Complete consultation.
- Save draft.

## 8. Reviews / results review

Route: `/app/doctor/reviews`

Shows:
- Visit workflow `awaiting_doctor_review`.
- Lab orders with `released`.
- Radiology reports with `released`.
- Procedure orders with `completed`.

Fields:
- Patient.
- Visit.
- Result type.
- Test/service.
- Abnormal / critical flag.
- Released time.
- Next action.

Actions:
- Review result.
- Mark reviewed.
- Return to consultation.
- Complete consultation.
- Order additional test.

Critical and abnormal results must be visually louder than normal results.

## 9. Completed consultations

Route: `/app/doctor/completed`

Shows:
- Completed consultation list by today or filter range.

Fields:
- Patient.
- Visit code.
- Diagnosis.
- Completed time.
- Billing status.
- Prescription exists.
- Documents.

Actions:
- View.
- Print summary.
- Open patient.
- Copy as template.

## 10. Doctor schedule

Route: `/app/doctor/schedule`

Shows:
- Today schedule.
- Upcoming appointments.
- Cancelled/no-show.
- Breaks.
- Room.
- Availability.

Actions:
- Open appointment.
- Start visit if arrived.
- Mark unavailable if allowed.

## 11. Doctor visit detail

Route: `/app/doctor/visits/[id]`

This is the flagship doctor page.

Layout:
- Compact patient/visit header.
- Sticky clinical command bar.
- Main clinical workspace.
- Orders.
- Results.
- Prescription / plan.
- Timeline.
- Right rail with patient summary, previous visits, allergy/risk flags, invoice/payment context and documents.

Header fields:
- Patient name.
- Age/gender.
- Visit code.
- Reason.
- Workflow badge.
- Consultation status.
- Doctor.
- Department.

Command bar:
- Start consultation.
- Save draft.
- Order lab.
- Order radiology.
- Add prescription.
- Complete consultation.
- Send to billing.
- Print.
- Cancel.

## 12. Consultation workspace

Minimal fields:
- Chief complaint.
- Examination.
- Diagnosis.
- Plan.
- Notes.

Professional SOAP fields:
- Subjective: complaint/history.
- Objective: vitals/examination/results.
- Assessment: diagnosis/clinical impression.
- Plan: treatment/orders/follow-up.

Actions:
- Save draft.
- Use template.
- Insert previous note.
- Complete consultation.

## 13. Vitals review

Fields:
- Temperature.
- Blood pressure.
- Heart rate.
- Respiratory rate.
- SpO2.
- Weight.
- Height.
- BMI.
- Pain score.

Actions:
- Edit vitals if allowed.
- Request nurse vitals.
- Mark reviewed.

## 14. Diagnosis

Fields:
- Primary diagnosis.
- Secondary diagnoses.
- Diagnosis text.
- ICD-10 code optional.
- Clinical impression.
- Differential diagnosis optional.

Actions:
- Add diagnosis.
- Search ICD.
- Mark primary.
- Remove.

## 15. Orders

Order types:
- Lab order.
- Radiology order.
- Procedure order.
- Nursing task.
- Referral.
- Follow-up appointment.

Lab order fields:
- Selected lab tests.
- Priority.
- Clinical note.
- Sample instruction.

Radiology order fields:
- Diagnostic service.
- Clinical indication.
- Priority.
- Preferred time.

Procedure order fields:
- Procedure.
- Instructions.
- Priority.
- Material note.

Actions:
- Order lab.
- Order radiology.
- Order procedure.
- Cancel order.
- View status.

## 16. Results review

Route/tab: `/app/doctor/visits/[id]/results`

Shows:
- Lab results.
- Radiology reports.
- Procedure completion notes.
- Attachments.
- Critical flags.

Actions:
- Mark reviewed.
- Add interpretation.
- Return to consultation.
- Order additional test.
- Complete consultation.

## 17. Prescription

Route/tab: `/app/doctor/visits/[id]/prescription`

Fields:
- Medication name.
- Dose.
- Frequency.
- Duration.
- Route.
- Instructions.
- Quantity.
- Substitution allowed.

Actions:
- Add medication.
- Use template.
- Sign prescription.
- Send to pharmacy.
- Print prescription.

Statuses:
- `draft`
- `signed`
- `sent_to_pharmacy`
- `partially_dispensed`
- `dispensed`
- `cancelled`

## 18. Treatment plan / recommendations

Fields:
- Lifestyle recommendation.
- Diet.
- Rest/work restriction.
- Follow-up date.
- Referral to specialist.
- Home care instruction.

Actions:
- Add recommendation.
- Print plan.
- Attach to visit summary.

## 19. Medical documents

Route/tab: `/app/doctor/visits/[id]/documents`

Documents:
- Medical conclusion.
- Sick leave note.
- Referral note.
- Certificate.
- Visit summary.
- Consent if needed.

Actions:
- Generate.
- Edit template.
- Print.
- Export PDF.
- Attach to patient.

## 20. Patient history / clinical history

Route: `/app/doctor/clinical-history`

Shows:
- Previous visits.
- Previous diagnoses.
- Previous lab results.
- Previous radiology reports.
- Chronic conditions.
- Allergies.
- Current medications.
- Documents.

Actions:
- Open previous visit.
- View lab history.
- View radiology history.
- Copy previous note.
- Compare results.

## 21. Templates

Route: `/app/doctor/templates`

Template types:
- Clinical note templates.
- Diagnosis templates.
- Prescription templates.
- Lab order sets.
- Radiology order sets.
- Treatment plan templates.

Actions:
- Use template.
- Create template.
- Edit template.
- Favorite.

## 22. Doctor tasks and notifications

Task types:
- Review lab result.
- Review radiology report.
- Complete unfinished consultation.
- Sign prescription.
- Respond to nurse task.
- Approve document.

These can live in global tasks later, but must appear in doctor workspace.

## 23. Status contracts

Visit workflow statuses doctor uses:
- `queued_for_doctor`
- `with_doctor`
- `awaiting_doctor_review`
- `consultation_completed`
- `completed`
- `cancelled`

Consultation statuses:
- `not_started`
- `in_progress`
- `waiting_for_results`
- `reviewing_results`
- `completed`
- `cancelled`

Lab statuses:
- `ordered`
- `sample_pending`
- `sample_collected`
- `in_progress`
- `result_entered`
- `verified`
- `released`
- `reviewed_by_doctor`
- `cancelled`

Radiology statuses:
- `ordered`
- `scheduled`
- `patient_arrived`
- `imaging_in_progress`
- `image_captured`
- `report_drafted`
- `report_verified`
- `released`
- `reviewed_by_doctor`
- `cancelled`

Prescription statuses:
- `draft`
- `signed`
- `sent_to_pharmacy`
- `partially_dispensed`
- `dispensed`
- `cancelled`

## 24. Sellable product criteria

Minimum sellable doctor module:
1. Doctor workspace.
2. My queue.
3. Active consultations.
4. Results review.
5. Completed consultations.
6. Doctor visit detail.
7. Start/continue consultation.
8. Clinical note editor.
9. Diagnosis section.
10. Lab order.
11. Radiology order.
12. Result review.
13. Complete consultation.
14. Prescription basic.
15. Patient previous visit/history view.
16. Timeline/activity.
17. Print/summary basic.

Professional product additions:
18. Templates.
19. ICD search.
20. Medication catalog.
21. Order sets.
22. Clinical document generation.
23. Result comparison.
24. Follow-up appointment creation.
25. Referral.
26. Doctor schedule.

## 25. Data contracts needed

Required frontend contracts:
- `DoctorWorkspaceResponse`
- `DoctorQueueResponse`
- `DoctorActiveEncountersResponse`
- `DoctorReviewQueueResponse`
- `DoctorCompletedConsultationsResponse`
- `DoctorVisitDetailResponse`
- `DoctorConsultationWorkspace`
- `DoctorOrdersWorkspace`
- `DoctorResultsWorkspace`
- `DoctorPrescriptionWorkspace`
- `DoctorDocumentsWorkspace`
- `DoctorTemplatesResponse`
- `DoctorClinicalHistoryResponse`

## 26. Implementation plan

D1 - Doctor contracts + mock client extension:
- Add `lib/types/doctor.ts`.
- Add `lib/mock/doctor.ts`.
- Extend `lib/api/mock-client.ts` with doctor-specific mock functions.

D2 - Doctor module navigation/shell:
- Create doctor subnav/shell.
- Wire routes for Overview, Queue, Active, Reviews, Completed, Schedule, Templates.

D3 - Doctor workspace pages:
- Implement `/app/doctor`, `/app/doctor/queue`, `/app/doctor/active`, `/app/doctor/reviews`, `/app/doctor/completed`.

D4 - Doctor visit detail:
- Implement `/app/doctor/visits/[id]` with header, command bar, right rail and clinical sections.

D5-D9:
- Consultation editor.
- Orders.
- Results review.
- Prescription.
- Documents/templates/history.
