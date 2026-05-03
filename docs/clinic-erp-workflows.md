# Clinic ERP / HIS Workflows

## Purpose

This document defines the core workflow logic for the clinic ERP/HIS.

The product is workflow-driven, not CRUD-driven.

Every operator workspace, queue, badge, command bar, and next action must be derived from workflow state.

The system must always answer:

1. What is the current state?
2. Who owns the next action?
3. What action is allowed now?
4. What happens after the action?
5. Which route should open next?

---

# Workflow Design Principles

## 1. One global visit workflow

The visit is the central operational object.

`Visit.workflow_status` represents the global patient journey from intake to completion.

Other modules have their own local statuses:

- `Appointment.status`
- `Consultation.status`
- `LabOrder.status`
- `RadiologyOrder.status`
- `Invoice.status`
- `Payment.status`
- `ProcedureOrder.status`

But operator queues should usually be driven by `Visit.workflow_status` plus module-specific status.

---

## 2. Workflows must produce next actions

Each status must map to:

```txt
Label
Badge tone
Owner role
Next action
Primary CTA
Allowed actions
Target route

A status without a next action is incomplete unless it is terminal.

3. Terminal statuses are clear

Terminal statuses:

completed
cancelled
void
refunded
reviewed
closed

Terminal records should not show normal operational CTAs.

They may show:

View
Print
Reopen if allowed
Audit
4. Do not show impossible actions

Example:

If a visit is queued_for_doctor, the cashier should not see “Record payment” unless an invoice already exists and is payable.

If an invoice is paid, cashier should not see “Record payment” as primary action.

If lab result is not entered, doctor should not see “Review result.”

Roles

Initial role categories:

admin
receptionist
doctor
nurse
lab_operator
lab_verifier
radiology_operator
radiologist
cashier
pharmacist
inventory_manager
hr_manager
finance_manager
operations_manager
director

RBAC can be implemented later, but workflow ownership should be defined now.

Core Visit Workflow
Visit Workflow Statuses
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
Visit Status Map

| Status                   | Label                  | Badge Tone | Owner                | Next Action               | Primary CTA           | Target Route                  |
| ------------------------ | ---------------------- | ---------- | -------------------- | ------------------------- | --------------------- | ----------------------------- |
| `intake_created`         | Intake created         | neutral    | Reception            | Assign doctor             | Assign doctor         | `/app/visits/[id]`            |
| `doctor_assigned`        | Doctor assigned        | info       | Reception            | Queue for doctor          | Queue patient         | `/app/visits/[id]`            |
| `queued_for_doctor`      | Waiting for doctor     | warning    | Doctor               | Start consultation        | Start consultation    | `/app/doctor/visits/[id]`     |
| `with_doctor`            | With doctor            | accent     | Doctor               | Continue consultation     | Continue consultation | `/app/doctor/visits/[id]`     |
| `awaiting_lab`           | Awaiting lab           | warning    | Lab                  | Collect sample            | Collect sample        | `/app/lab/orders/[id]`        |
| `lab_in_progress`        | Lab in progress        | accent     | Lab                  | Enter or verify result    | Open lab order        | `/app/lab/orders/[id]`        |
| `awaiting_radiology`     | Awaiting radiology     | warning    | Radiology            | Start diagnostic work     | Open radiology order  | `/app/radiology/orders/[id]`  |
| `radiology_in_progress`  | Radiology in progress  | accent     | Radiology            | Complete report           | Open radiology order  | `/app/radiology/orders/[id]`  |
| `awaiting_procedure`     | Awaiting procedure     | warning    | Nursing / Procedures | Perform procedure         | Open procedure        | `/app/procedures/orders/[id]` |
| `procedure_in_progress`  | Procedure in progress  | accent     | Nursing / Procedures | Complete procedure        | Complete procedure    | `/app/procedures/orders/[id]` |
| `awaiting_doctor_review` | Awaiting doctor review | warning    | Doctor               | Review results            | Review result         | `/app/doctor/visits/[id]`     |
| `consultation_completed` | Consultation completed | success    | Cashier              | Issue invoice             | Issue invoice         | `/app/cashier/invoices/[id]`  |
| `billing_pending`        | Billing pending        | warning    | Cashier              | Record payment            | Record payment        | `/app/cashier/invoices/[id]`  |
| `partially_paid`         | Partially paid         | warning    | Cashier              | Collect remaining payment | Collect remaining     | `/app/cashier/invoices/[id]`  |
| `paid`                   | Paid                   | success    | Reception / Cashier  | Complete visit            | Complete visit        | `/app/visits/[id]`            |
| `completed`              | Completed              | success    | None                 | No action                 | View                  | `/app/visits/[id]`            |
| `cancelled`              | Cancelled              | danger     | None                 | No action                 | View                  | `/app/visits/[id]`            |

Visit Workflow Transitions
intake_created -> doctor_assigned
doctor_assigned -> queued_for_doctor
queued_for_doctor -> with_doctor
with_doctor -> awaiting_lab
with_doctor -> awaiting_radiology
with_doctor -> awaiting_procedure
with_doctor -> consultation_completed
awaiting_lab -> lab_in_progress
lab_in_progress -> awaiting_doctor_review
awaiting_radiology -> radiology_in_progress
radiology_in_progress -> awaiting_doctor_review
awaiting_procedure -> procedure_in_progress
procedure_in_progress -> awaiting_doctor_review
awaiting_doctor_review -> with_doctor
awaiting_doctor_review -> consultation_completed
consultation_completed -> billing_pending
billing_pending -> partially_paid
billing_pending -> paid
partially_paid -> paid
paid -> completed
any non-terminal status -> cancelled
Role-Specific Visit Queues
Reception Queues

Reception owns:

intake_created
doctor_assigned
paid

Reception observes:

queued_for_doctor
with_doctor
awaiting_lab
lab_in_progress
awaiting_doctor_review
consultation_completed
billing_pending
completed
cancelled

Reception queue sections:

Needs action:
- intake_created
- doctor_assigned

In progress:
- queued_for_doctor
- with_doctor
- awaiting_lab
- lab_in_progress
- awaiting_radiology
- radiology_in_progress
- awaiting_doctor_review

Billing / closing:
- consultation_completed
- billing_pending
- partially_paid
- paid

Closed:
- completed
- cancelled

Reception next action map:

Visit Status	Next Action	CTA
intake_created	Assign doctor	Assign doctor
doctor_assigned	Queue for doctor	Queue patient
queued_for_doctor	Waiting for doctor	Open visit
with_doctor	In consultation	Open visit
awaiting_lab	Waiting for lab	Open visit
lab_in_progress	Lab processing	Open visit
awaiting_radiology	Waiting for radiology	Open visit
radiology_in_progress	Radiology processing	Open visit
awaiting_doctor_review	Return to doctor	Open visit
consultation_completed	Send to billing	Open visit
billing_pending	Await payment	Open visit
partially_paid	Await remaining payment	Open visit
paid	Ready to complete	Complete visit
completed	Completed	View
cancelled	Cancelled	View
Doctor Queues

Doctor owns:

queued_for_doctor
with_doctor
awaiting_doctor_review

Doctor observes:

consultation_completed
completed
cancelled

Doctor queue sections:

My queue:
- queued_for_doctor

Active encounters:
- with_doctor

Needs review:
- awaiting_doctor_review

Completed:
- consultation_completed
- completed

Doctor next action map:

Visit Status	Next Action	CTA
queued_for_doctor	Start consultation	Start consultation
with_doctor	Continue consultation	Continue consultation
awaiting_doctor_review	Review results	Review result
consultation_completed	Consultation completed	View
completed	Completed	View
cancelled	Cancelled	View

Doctor queue sorting priority:

1. awaiting_doctor_review
2. queued_for_doctor
3. with_doctor
4. consultation_completed
5. completed
6. cancelled
Lab Queues

Lab owns:

awaiting_lab
lab_in_progress

Lab queue sections:

Sample collection:
- lab orders with status sample_pending

Processing:
- lab orders with status sample_collected
- lab orders with status in_progress

Result entry:
- lab orders with status processing_completed
- lab orders with status result_entered if not verified

Verification:
- lab orders with status result_entered

Released:
- lab orders with status verified
- lab orders with status released

Lab next action depends on LabOrder.status, not only Visit.workflow_status.

Radiology Queues

Radiology owns:

awaiting_radiology
radiology_in_progress

Radiology queue sections:

Orders:
- ordered
- scheduled

In progress:
- patient_arrived
- imaging_in_progress
- image_captured

Reporting:
- report_drafted
- report_pending_verification

Released:
- report_verified
- released
Cashier Queues

Cashier owns:

consultation_completed
billing_pending
partially_paid

Cashier observes:

paid
completed
cancelled

Cashier queue sections:

Needs billing action:
- consultation_completed
- invoices with draft status

Awaiting payment:
- billing_pending
- issued invoices

Partial payments:
- partially_paid
- partially paid invoices

Settled:
- paid
- completed

Void / cancelled:
- cancelled
- void invoices

Cashier next action depends on both Visit.workflow_status and Invoice.status.

Appointment Workflow
Appointment Statuses
scheduled
confirmed
arrived
checked_in
converted_to_visit
no_show
cancelled
Appointment Status Map
Status	Label	Badge Tone	Owner	Next Action	Primary CTA
scheduled	Scheduled	info	Reception	Confirm appointment	Confirm
confirmed	Confirmed	success	Reception	Wait for arrival	Check in
arrived	Arrived	warning	Reception	Check in patient	Check in
checked_in	Checked in	accent	Reception	Convert to visit	Create visit
converted_to_visit	Converted to visit	success	None	Open visit	Open visit
no_show	No-show	danger	None	No action	View
cancelled	Cancelled	danger	None	No action	View
Appointment Transitions
scheduled -> confirmed
scheduled -> cancelled
confirmed -> arrived
confirmed -> no_show
confirmed -> cancelled
arrived -> checked_in
checked_in -> converted_to_visit
Consultation Workflow
Consultation Statuses
not_started
in_progress
waiting_for_results
reviewing_results
completed
cancelled
Consultation Status Map
Status	Label	Badge Tone	Owner	Next Action	Primary CTA
not_started	Not started	neutral	Doctor	Start consultation	Start
in_progress	In progress	accent	Doctor	Continue consultation	Continue
waiting_for_results	Waiting for results	warning	Lab/Radiology	Wait for results	View
reviewing_results	Reviewing results	warning	Doctor	Review and decide	Review
completed	Completed	success	None	No action	View
cancelled	Cancelled	danger	None	No action	View
Lab Workflow
Lab Order Statuses
ordered
sample_pending
sample_collected
in_progress
result_entered
verified
released
reviewed_by_doctor
cancelled
Lab Status Map
Status	Label	Badge Tone	Owner	Next Action	Primary CTA
ordered	Ordered	neutral	Lab	Prepare sample collection	Open
sample_pending	Sample pending	warning	Lab	Collect sample	Collect sample
sample_collected	Sample collected	info	Lab	Start processing	Start processing
in_progress	In progress	accent	Lab	Enter result	Enter result
result_entered	Result entered	warning	Lab verifier	Verify result	Verify
verified	Verified	success	Lab	Release result	Release
released	Released	success	Doctor	Review result	View result
reviewed_by_doctor	Reviewed	success	None	No action	View
cancelled	Cancelled	danger	None	No action	View
Lab Transitions
ordered -> sample_pending
sample_pending -> sample_collected
sample_collected -> in_progress
in_progress -> result_entered
result_entered -> verified
verified -> released
released -> reviewed_by_doctor
any non-terminal status -> cancelled
Lab to Visit Workflow Sync

When doctor orders lab:

Visit.workflow_status = awaiting_lab
LabOrder.status = ordered or sample_pending
Consultation.status = waiting_for_results

When lab starts:

Visit.workflow_status = lab_in_progress
LabOrder.status = in_progress

When lab result is released:

Visit.workflow_status = awaiting_doctor_review
LabOrder.status = released
Consultation.status = reviewing_results

When doctor reviews result:

LabOrder.status = reviewed_by_doctor
Consultation.status = in_progress or completed
Visit.workflow_status = with_doctor or consultation_completed
Radiology Workflow
Radiology Order Statuses
ordered
scheduled
patient_arrived
imaging_in_progress
image_captured
report_drafted
report_verified
released
reviewed_by_doctor
cancelled
Radiology Status Map
Status	Label	Badge Tone	Owner	Next Action	Primary CTA
ordered	Ordered	neutral	Radiology	Schedule or start	Open
scheduled	Scheduled	info	Radiology	Mark patient arrived	Mark arrived
patient_arrived	Patient arrived	warning	Radiology	Start imaging	Start imaging
imaging_in_progress	Imaging in progress	accent	Radiology	Capture images	Continue
image_captured	Image captured	info	Radiologist	Draft report	Draft report
report_drafted	Report drafted	warning	Radiologist	Verify report	Verify
report_verified	Report verified	success	Radiology	Release report	Release
released	Released	success	Doctor	Review result	View result
reviewed_by_doctor	Reviewed	success	None	No action	View
cancelled	Cancelled	danger	None	No action	View
Radiology Transitions
ordered -> scheduled
ordered -> patient_arrived
scheduled -> patient_arrived
patient_arrived -> imaging_in_progress
imaging_in_progress -> image_captured
image_captured -> report_drafted
report_drafted -> report_verified
report_verified -> released
released -> reviewed_by_doctor
any non-terminal status -> cancelled
Procedure Workflow
Procedure Order Statuses
ordered
scheduled
ready
in_progress
completed
reviewed_by_doctor
cancelled
Procedure Status Map
Status	Label	Badge Tone	Owner	Next Action	Primary CTA
ordered	Ordered	neutral	Nursing / Procedures	Schedule or prepare	Open
scheduled	Scheduled	info	Nursing / Procedures	Prepare patient	Prepare
ready	Ready	warning	Nursing / Procedures	Start procedure	Start
in_progress	In progress	accent	Nursing / Procedures	Complete procedure	Complete
completed	Completed	success	Doctor	Review if needed	View
reviewed_by_doctor	Reviewed	success	None	No action	View
cancelled	Cancelled	danger	None	No action	View
Invoice / Billing Workflow
Invoice Statuses
draft
issued
partially_paid
paid
void
refunded
cancelled
Invoice Status Map
Status	Label	Badge Tone	Owner	Next Action	Primary CTA
draft	Draft	neutral	Cashier	Issue invoice	Issue invoice
issued	Issued	warning	Cashier	Record payment	Record payment
partially_paid	Partially paid	warning	Cashier	Collect remaining payment	Collect remaining
paid	Paid	success	Reception / Cashier	Complete visit	Complete visit
void	Void	danger	None	No action	View
refunded	Refunded	danger	None	No action	View
cancelled	Cancelled	danger	None	No action	View
Invoice Transitions
draft -> issued
issued -> partially_paid
issued -> paid
partially_paid -> paid
issued -> void
partially_paid -> void
paid -> refunded
any non-terminal status -> cancelled
Invoice to Visit Workflow Sync

When consultation is completed:

Visit.workflow_status = consultation_completed
Invoice.status = draft or not created

When invoice is issued:

Visit.workflow_status = billing_pending
Invoice.status = issued

When partial payment is recorded:

Visit.workflow_status = partially_paid
Invoice.status = partially_paid

When full payment is recorded:

Visit.workflow_status = paid
Invoice.status = paid

When visit is completed:

Visit.workflow_status = completed
Payment Workflow
Payment Statuses
pending
recorded
failed
refunded
cancelled
Payment Methods
cash
card
bank_transfer
insurance
corporate
mixed
Payment Rules
Payment must be linked to an invoice.
Payment amount cannot exceed remaining balance unless overpayment is explicitly allowed.
Refund must be linked to an original payment.
Voiding paid invoices should require admin/finance permission.
Every payment action must be audit logged later.
Pharmacy Workflow
Prescription Statuses
draft
signed
sent_to_pharmacy
partially_dispensed
dispensed
cancelled
Prescription Status Map
Status	Label	Badge Tone	Owner	Next Action	Primary CTA
draft	Draft	neutral	Doctor	Sign prescription	Sign
signed	Signed	success	Doctor	Send to pharmacy	Send
sent_to_pharmacy	Sent to pharmacy	warning	Pharmacist	Dispense medication	Dispense
partially_dispensed	Partially dispensed	warning	Pharmacist	Complete dispense	Continue
dispensed	Dispensed	success	None	No action	View
cancelled	Cancelled	danger	None	No action	View
Inventory Workflow
Stock Movement Types
purchase
sale
dispense
lab_consumption
procedure_consumption
transfer
adjustment
write_off
return
Stock Rules
Every stock change must create a stock movement.
Batch and expiry should be tracked for medicines and lab reagents.
Low stock should generate reorder alerts.
Expiring soon stock should be visible in inventory and pharmacy.
Write-off should require reason and responsible user.
HR Workflow
Staff Statuses
active
on_leave
suspended
terminated
archived
Attendance Statuses
present
late
absent
on_leave
sick_leave
holiday
HR Rules
Staff can be linked to system user accounts.
Not every staff member needs login access.
Doctors and nurses should be linked to departments.
Shift planning can be implemented after basic staff directory.
Task / Notification Workflow
Task Statuses
open
in_progress
blocked
done
cancelled
Notification Types
workflow_alert
delayed_case
lab_result_ready
payment_required
stock_low
stock_expiring
system_alert
assigned_task
Rules
Notifications should link to a target route.
Critical alerts should appear in right panels.
Delayed cases should be generated from workflow aging later.
Audit Workflow
Audit Event Types
create
update
delete
status_change
payment_recorded
invoice_voided
refund_issued
login
logout
view_patient_record
export
print
permission_change
Audit Rules
Every important workflow transition should create an audit event later.
Patient data access should be audit-ready.
Financial actions must be audit-ready from the start.
Audit UI can be built later, but backend design must not ignore auditability.
Workflow Helper Functions

Frontend should eventually use shared helper functions.

Suggested helpers:

getVisitWorkflowLabel(status)
getVisitWorkflowTone(status)
getVisitNextActionForRole(visit, role)
getVisitPrimaryCTAForRole(visit, role)
getAllowedVisitActions(visit, role)

getAppointmentStatusLabel(status)
getAppointmentNextAction(appointment)

getLabStatusLabel(status)
getLabNextAction(order, role)

getInvoiceStatusLabel(status)
getCashierNextAction(invoice, visit)

getStatusTone(domain, status)
Implementation Rules for Codex
Do not hardcode status labels separately inside pages.
Create shared workflow mapping files.
Every workspace queue must use workflow helper functions.
Every detail command bar must derive actions from status.
Do not show invalid actions.
Use the same badge label and tone everywhere.
Mock data must include realistic statuses.
Workflow transitions should be documented before backend implementation.
Backend APIs should later expose both raw status and computed next action where useful.
All financial and clinical workflow transitions must be audit-ready.