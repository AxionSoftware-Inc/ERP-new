# Reception Module Specification

## Purpose

The Reception module is the front-office operating system of the clinic ERP/HIS.

It manages the full patient access workflow:

Patient arrives or calls → patient is found or registered → appointment is checked in or walk-in is created → visit is created → doctor/department/service is selected → patient is queued → clinical workflow begins → billing/closing is monitored.

Reception is not just a list of patients. It is the operational control layer for patient intake, routing, queue control, and front desk coordination.

---

# Product Goals

The Reception module must help front desk operators answer:

1. Who just arrived?
2. Is this patient already registered?
3. Does the patient have an appointment?
4. Should we create a new visit or use an existing appointment?
5. Which doctor/department should handle the patient?
6. What is the estimated wait?
7. Who is waiting too long?
8. Who needs billing or closing?
9. Are there duplicate patient records?
10. What action should the operator take next?

---

# Reception User Roles

## Receptionist

Primary front desk operator.

Responsibilities:
- Register patients
- Search existing patients
- Create visits
- Check in appointments
- Handle walk-ins
- Assign doctors
- Queue patients
- Monitor patient movement
- Send patients to billing or closing

## Senior Receptionist / Front Desk Manager

Responsibilities:
- Monitor all queues
- Reassign doctors
- Resolve delayed cases
- Handle exceptions
- Monitor no-shows/cancellations
- View shift summary

## Call Center Operator

Responsibilities:
- Search patients
- Create appointments
- Confirm appointments
- Reschedule appointments
- Add communication notes

## Reception Admin

Responsibilities:
- View daily performance
- Audit reception actions
- Manage unresolved reception cases

---

# Reception Routes

## Core Routes

```txt
/app/reception
/app/reception/intake/new
/app/reception/patient-search
/app/reception/check-in
/app/reception/walk-ins
/app/reception/queue
/app/reception/doctor-assignment
/app/reception/appointments-today
/app/reception/delayed
/app/reception/documents
/app/reception/shift
```

---

# Route Priority

## Phase R1 — Must-have for sellable Reception

```txt
/app/reception
/app/reception/intake/new
/app/reception/patient-search
/app/reception/check-in
/app/reception/walk-ins
/app/reception/queue
```

## Phase R2 — Strong product layer

```txt
/app/reception/doctor-assignment
/app/reception/appointments-today
/app/reception/delayed
/app/reception/documents
/app/reception/shift
```

## Phase R3 — Later enterprise features

```txt
/app/reception/communications
/app/reception/call-center
/app/reception/kiosk
/app/reception/waiting-room-display
```

---

# Reception Information Architecture

The Reception module has 6 core product areas:

1. Command workspace
2. Patient lookup
3. Intake / visit creation
4. Appointment check-in
5. Walk-in management
6. Queue control

Supporting areas:

7. Doctor assignment
8. Reception documents
9. Delayed cases
10. Shift summary
11. Communication/call center

---

# 1. Reception Command Workspace

## Route

```txt
/app/reception
```

## Purpose

Show the current operational state of the front desk.

This is not a data table. This is the operator’s command workspace.

## Page Layout

```txt
WorkspaceHeader
SummaryStrip

Main grid:
  Left:
    Operator focus
    Needs action
    In progress
    Billing / closing
    Closed today

  Right:
    Fast patient search
    Today's appointments
    Reception control
    Delayed cases
    Recent registrations
```

## Header

Title:

```txt
Reception Workspace
```

Subtitle:

```txt
Manage intake, doctor assignment, and patient flow for today.
```

Meta:

```txt
Branch
Date
Active cases
Current shift
```

Primary action:

```txt
New intake → /app/reception/intake/new
```

## Summary Strip

Counters:

```txt
Needs action
In progress
Billing / closing
Closed today
Delayed
```

## Operator Focus

Shows top priority reception cases.

Sources:

```txt
needsAction
billingAndClosing
delayedCases
```

Each focus card shows:

```txt
Patient name
Visit code
Phone
Workflow badge
Next action
Queue position
Visit age
Last moved time
Primary CTA
```

## Queue Sections

### Needs action

Statuses:

```txt
intake_created
doctor_assigned
```

Actions:

```txt
Assign doctor
Queue patient
Open visit
Patient profile
```

### In progress

Statuses:

```txt
queued_for_doctor
with_doctor
awaiting_lab
lab_in_progress
awaiting_radiology
radiology_in_progress
awaiting_procedure
procedure_in_progress
awaiting_doctor_review
```

Actions:

```txt
Open visit
Check status
Patient profile
```

### Billing / closing

Statuses:

```txt
consultation_completed
billing_pending
partially_paid
paid
```

Actions:

```txt
Issue invoice
Record payment
Collect remaining
Complete visit
Open visit
Patient profile
```

### Closed today

Statuses:

```txt
completed
cancelled
```

Actions:

```txt
View
Open visit
Patient profile
```

## Right Rail

### Fast Patient Search

Fields:

```txt
Name
Phone
Patient code
Passport/ID
```

Actions:

```txt
New patient
New intake
```

### Today's Appointments

Shows:

```txt
Patient
Time
Doctor
Status
Next action
```

### Reception Control

Metrics:

```txt
Waiting for doctor
Billing waiting
Recent registrations
Delayed cases
No-show candidates
```

### Delayed Cases

Shows:

```txt
Patient
Visit code
Current status
Waiting time
Next action
```

### Recent Registrations

Shows:

```txt
Patient
Patient code
Phone
Active visit or last visit
```

---

# 2. New Intake Flow

## Route

```txt
/app/reception/intake/new
```

## Purpose

Create a patient visit quickly and safely.

This is the most important Reception flow.

It must support:

```txt
Existing patient → new visit
New patient → create patient + new visit
Appointment patient → convert appointment to visit
Walk-in patient → create visit and queue
```

## Page Type

Guided create flow.

## Layout

```txt
Header
Step indicator
Main form
Right context rail
Footer actions
```

## Steps

### Step 1 — Patient

Operator can:

```txt
Search existing patient
Select existing patient
Create minimal patient
Create full patient
Detect possible duplicate
```

Search fields:

```txt
Name
Phone
Patient code
Passport/ID
Birth date
```

Patient result card:

```txt
Full name
Patient code
Age/gender
Phone
Last visit
Active visit warning
Balance/debt
Risk flags
```

Required for new minimal patient:

```txt
Full name
Phone
Gender optional
Birth date or age optional
```

### Step 2 — Visit Details

Fields:

```txt
Visit type
Reason / chief complaint
Priority
Department
Doctor preference
Source
Notes
```

Visit types:

```txt
walk_in
appointment
follow_up
emergency
```

Priority:

```txt
normal
urgent
emergency
vip
```

Source:

```txt
walk_in
phone
telegram
referral
corporate
insurance
doctor_referral
```

### Step 3 — Service / Payment Context

Fields:

```txt
Consultation service
Additional services optional
Payment type
Insurance/corporate optional
Discount optional
Price preview
```

Payment types:

```txt
cash
card
insurance
corporate
mixed
```

Right rail should show:

```txt
Selected service
Price estimate
Patient balance
Debt warning
Coverage warning
```

### Step 4 — Routing

Fields:

```txt
Branch
Department
Doctor
Room optional
Queue option
Estimated wait
```

Doctor selection should show:

```txt
Doctor name
Specialization
Department
Current queue count
Estimated wait
Status: available / busy / unavailable
```

## Primary Actions

```txt
Create visit
Create and assign doctor
Create and queue
Create appointment instead
Cancel
```

## Validation Rules

Required:

```txt
Patient
Visit type
Reason
Department or doctor
```

Warnings:

```txt
Duplicate patient possible
Patient has active visit
Patient has unpaid balance
Doctor unavailable
Department closed
```

## Success States

After successful intake:

```txt
Open visit
Queue patient
Print ticket
Go to Reception Workspace
```

---

# 3. Patient Search

## Route

```txt
/app/reception/patient-search
```

## Purpose

Provide a full search tool for front desk operators.

## Layout

```txt
Header
Search panel
Results area
Right rail
```

## Search Fields

```txt
Full name
Phone
Patient code
Passport/ID
Birth date
Last visit date
```

## Result View

Use dense patient cards or table.

Each result shows:

```txt
Patient name
Patient code
Age/gender
Phone
Last visit
Active visit
Balance/debt
Risk flags
Duplicate warning
```

## Actions

```txt
Open profile
Create visit
Create appointment
Start intake
Edit contact
Upload document
```

## Right Rail

```txt
Recent patients
Recently viewed
Possible duplicates
Search tips
```

## Empty State

```txt
No matching patients found.
Create a new patient or adjust the search.
```

---

# 4. Appointment Check-in

## Route

```txt
/app/reception/check-in
```

## Purpose

Manage today’s scheduled appointments and convert arrivals into visits.

## Layout

```txt
Header
Summary strip
Appointment queues
Right rail
```

## Summary

```txt
Scheduled today
Confirmed
Arrived
Checked in
Late
No-show candidates
Cancelled
```

## Queue Sections

### Scheduled / Confirmed

Actions:

```txt
Confirm
Mark arrived
Call patient
Reschedule
Cancel
```

### Arrived

Actions:

```txt
Check in
Convert to visit
Open patient
```

### Checked in

Actions:

```txt
Create visit
Queue patient
Open visit
```

### Late / No-show

Actions:

```txt
Call patient
Mark no-show
Reschedule
Cancel
```

## Appointment Row

Shows:

```txt
Time
Patient
Doctor
Department
Status
Phone
Next action
Waiting/late time
```

## Right Rail

```txt
Doctor schedule
Late arrivals
No-show candidates
Upcoming next hour
```

---

# 5. Walk-ins

## Route

```txt
/app/reception/walk-ins
```

## Purpose

Manage patients who arrive without appointment.

## Layout

```txt
Header
Quick walk-in intake
Waiting walk-ins
Assigned walk-ins
Right rail: doctor load and estimated wait
```

## Quick Intake Fields

```txt
Patient search / new patient
Reason
Department
Doctor preference
Priority
Payment type
```

## Walk-in Queues

### New walk-ins

Actions:

```txt
Create visit
Assign doctor
```

### Waiting assignment

Actions:

```txt
Assign doctor
Queue patient
```

### Queued

Actions:

```txt
Open visit
Change doctor
Prioritize
```

## Doctor Load Right Rail

Shows:

```txt
Doctor
Department
Current queue count
Estimated wait
Current patient
Status
```

## Important Feature

Doctor availability should guide assignment.

Example:

```txt
Dr. Akmal Rahimov
6 waiting
Estimated wait: 35 min
Status: busy
```

---

# 6. Reception Queue Control

## Route

```txt
/app/reception/queue
```

## Purpose

Full operational queue control for front desk and senior reception.

## Layout

```txt
Header
Filters
Queue view
Right rail
```

## Filters

```txt
Doctor
Department
Status
Priority
Waiting time
Payment state
Visit type
```

## Queue Views

Supported views:

```txt
By doctor
By department
By workflow status
By waiting time
By priority
```

## Queue Row

Shows:

```txt
Queue number
Patient
Visit code
Doctor
Department
Workflow status
Waiting time
Visit age
Next action
Payment state
```

## Actions

```txt
Open visit
Change doctor
Move queue
Prioritize
Mark patient left
Cancel visit
Send to cashier
Complete visit
```

## Right Rail

```txt
Delayed patients
Doctor load
Queue bottlenecks
Unresolved cases
```

## Safety Rules

Danger actions require confirmation:

```txt
Cancel visit
Mark patient left
Remove from queue
```

---

# 7. Doctor Assignment

## Route

```txt
/app/reception/doctor-assignment
```

## Purpose

Assign or change doctor using availability and queue load context.

This may be a full page or modal launched from intake/visit/queue.

## Layout

```txt
Patient/visit context
Doctor selection
Availability/load panel
Confirm actions
```

## Doctor Card

Shows:

```txt
Doctor name
Specialization
Department
Room
Status
Queue count
Estimated wait
Next available time
```

## Actions

```txt
Assign doctor
Assign and queue
Change doctor
Transfer department
Cancel
```

---

# 8. Today's Appointments

## Route

```txt
/app/reception/appointments-today
```

## Purpose

Focused view of all appointments for today.

Can be used by front desk or call center.

## Layout

```txt
Header
Date / doctor / department filters
Appointment list
Right rail
```

## Actions

```txt
Confirm
Call
Mark arrived
Check in
Convert to visit
Reschedule
No-show
Cancel
```

---

# 9. Delayed Cases

## Route

```txt
/app/reception/delayed
```

## Purpose

Monitor cases exceeding expected waiting or workflow timing.

## Delayed Types

```txt
Waiting for doctor too long
Lab pending too long
Radiology pending too long
Billing pending too long
Unclosed paid visits
No-show candidates
```

## Row Shows

```txt
Patient
Visit
Current status
Owner
Waiting time
Expected SLA
Next action
```

## Actions

```txt
Open visit
Notify owner
Change doctor
Escalate
Send to cashier
Complete visit
```

---

# 10. Reception Documents

## Route

```txt
/app/reception/documents
```

## Purpose

Upload, scan, generate, and attach documents at the front desk.

## Supported Documents

```txt
Passport/ID
Insurance document
Referral document
Consent form
Contract
Previous medical document
Generated certificate
Payment-related document
```

## Actions

```txt
Upload
Scan
Attach to patient
Attach to visit
Generate form
Print
```

## Layout

```txt
Patient search
Document upload/generate panel
Recent documents
Right rail
```

---

# 11. Reception Shift Summary

## Route

```txt
/app/reception/shift
```

## Purpose

Show operator or front desk daily shift summary.

## Metrics

```txt
Registered patients
Created visits
Checked-in appointments
Walk-ins
No-shows
Cancelled appointments
Queued to doctor
Sent to billing
Completed visits
Unresolved cases
Delayed cases
```

## Actions

```txt
Export
Print
Close shift
```

## Safety

Shift cannot be closed if critical unresolved cases remain, unless overridden by manager.

---

# Reception Data Contracts Needed

The current general data contracts are not enough for full Reception.

Add or extend later:

```ts
type ReceptionIntakeDraft
type ReceptionPatientSearchResult
type ReceptionDoctorAvailability
type ReceptionQueueItem
type ReceptionCheckInItem
type ReceptionWalkInItem
type ReceptionShiftSummary
type ReceptionDelayedCase
```

---

## ReceptionIntakeDraft

```ts
type ReceptionIntakeDraft = {
  patientId?: ID | null
  newPatient?: {
    fullName: string
    phone?: string | null
    gender?: "male" | "female" | "other" | "unknown"
    birthDate?: string | null
    age?: number | null
  }
  visitType: "walk_in" | "appointment" | "follow_up" | "emergency"
  reason: string
  priority: "normal" | "urgent" | "emergency" | "vip"
  departmentId?: ID | null
  doctorId?: ID | null
  serviceIds: ID[]
  paymentType: "cash" | "card" | "insurance" | "corporate" | "mixed"
  notes?: string | null
}
```

## ReceptionDoctorAvailability

```ts
type ReceptionDoctorAvailability = {
  doctor: DoctorSummary
  department: DepartmentSummary
  status: "available" | "busy" | "unavailable" | "off_shift"
  currentQueueCount: number
  estimatedWaitMinutes: number
  currentPatient?: PatientSummary | null
  room?: string | null
}
```

## ReceptionQueueItem

```ts
type ReceptionQueueItem = VisitListItem & {
  queueNumber?: string | null
  waitingMinutes?: number
  visitAgeMinutes?: number
  lastMovedAt?: string | null
  priority?: "normal" | "urgent" | "emergency" | "vip"
}
```

## ReceptionShiftSummary

```ts
type ReceptionShiftSummary = {
  registeredPatients: number
  createdVisits: number
  checkedInAppointments: number
  walkIns: number
  noShows: number
  cancelledAppointments: number
  queuedToDoctor: number
  sentToBilling: number
  completedVisits: number
  unresolvedCases: number
  delayedCases: number
}
```

---

# Reception Workflow Integration

Reception interacts with these statuses:

## Visit.workflow_status

```txt
intake_created
doctor_assigned
queued_for_doctor
with_doctor
awaiting_lab
lab_in_progress
awaiting_radiology
radiology_in_progress
awaiting_procedure
procedure_in_progress
awaiting_doctor_review
consultation_completed
billing_pending
partially_paid
paid
completed
cancelled
```

## Appointment.status

```txt
scheduled
confirmed
arrived
checked_in
converted_to_visit
no_show
cancelled
```

## Invoice.status

```txt
draft
issued
partially_paid
paid
void
refunded
cancelled
```

---

# Reception Action Map

## Patient Actions

```txt
Search patient
Create patient
Edit contact
Open profile
Upload document
```

## Visit Actions

```txt
Create visit
Assign doctor
Queue patient
Change doctor
Cancel visit
Complete visit
Open visit
```

## Appointment Actions

```txt
Confirm
Mark arrived
Check in
Convert to visit
Reschedule
Mark no-show
Cancel
```

## Queue Actions

```txt
Move queue
Prioritize
Mark patient left
Change doctor
Notify owner
```

## Billing/Closing Actions

```txt
Issue invoice
Record payment
Collect remaining
Send to cashier
Complete visit
```

## Document Actions

```txt
Upload
Scan
Generate
Print
Attach to patient
Attach to visit
```

---

# Reception Sellable Product Criteria

Reception module is sellable when it supports:

```txt
1. Reception command workspace
2. Fast patient search
3. New patient registration
4. Existing patient intake
5. New visit creation
6. Appointment check-in
7. Appointment to visit conversion
8. Walk-in intake
9. Doctor assignment with queue load
10. Queue control
11. Basic document upload
12. Billing/closing visibility
13. Delayed cases visibility
14. Reception shift summary
```

---

# Reception Implementation Plan

## R1 — Spec and contracts

```txt
Create reception-module-spec.md
Extend reception type contracts
Create mock reception data
Create reception mock client functions
```

## R2 — Intake flow

```txt
/app/reception/intake/new
```

Build guided intake:

```txt
Patient search/create
Visit details
Service/payment context
Doctor assignment/routing
```

## R3 — Patient search

```txt
/app/reception/patient-search
```

Build full patient lookup with actions.

## R4 — Check-in

```txt
/app/reception/check-in
```

Build appointment check-in and conversion to visit.

## R5 — Walk-ins

```txt
/app/reception/walk-ins
```

Build walk-in intake and routing.

## R6 — Queue control

```txt
/app/reception/queue
```

Build full queue management.

## R7 — Supporting pages

```txt
/app/reception/documents
/app/reception/delayed
/app/reception/shift
```

---

# Codex Implementation Rules

1. Do not treat Reception as one page.
2. Build it as a full module.
3. Use `/app/reception` as command workspace only.
4. Keep all Reception pages visually consistent with the workspace.
5. Use shared components where possible.
6. Add Reception-specific components only when needed.
7. Keep mock data shaped like future API responses.
8. Do not hardcode data inside pages.
9. Do not implement backend yet.
10. Do not move to Doctor/Lab/Cashier until core Reception flows exist.