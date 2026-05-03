# Clinic ERP / HIS UI Grammar

## Purpose

This document defines the shared UI/UX grammar for the clinic ERP/HIS frontend.

The product must feel like an enterprise-grade operational system for a medium-large clinic with 500+ staff.

The UI is not marketing-style. It is dense, fast, clear, workflow-driven, and operator-first.

Every page must help the user answer:

1. What is happening?
2. Who needs action?
3. What is the next action?
4. Where do I click?
5. What changed recently?

---

# Core UI Principles

## 1. Workflow-first, not CRUD-first

The system must not feel like a collection of database tables.

Bad:
- Patients table
- Visits table
- Lab orders table
- Invoices table

Good:
- Reception needs action
- Doctor waiting queue
- Lab sample collection queue
- Cashier unpaid queue
- Delayed cases
- Ready to complete visits

Every operational page should prioritize queues and next actions.

---

## 2. Operator-first density

Clinic staff use the system all day. They need speed, not large decorative cards.

Use:
- Compact spacing
- Dense rows
- Clear badges
- One primary action per row
- Minimal visual noise
- Fast scanning

Avoid:
- Huge cards
- Large empty padding
- Marketing-style gradients
- Too many buttons
- Unclear icons
- Long paragraphs inside operational pages

---

## 3. Every row must show the next action

Every operational row should answer:

- Who is this?
- What case is this?
- What is the current state?
- What should I do next?
- What is the primary button?

A row without a next action is incomplete.

---

## 4. Same status language across the app

Workflow labels, badge colors, and next actions must be consistent everywhere.

Example:

If `queued_for_doctor` means **Waiting for doctor**, then it must not be called:
- Waiting
- In queue
- Doctor queue
- Pending doctor

Use one label everywhere.

---

## 5. Detail pages must use the same structure

All important detail pages must use this structure:

1. Compact identity header
2. Sticky command bar
3. Main workspace
4. Right context rail
5. Timeline/activity section

This applies to:
- Visit detail
- Patient detail
- Appointment detail
- Lab order detail
- Radiology order detail
- Invoice detail
- Staff detail
- Inventory item detail

---

# Global App Layout

## App Shell

All authenticated pages use the same shell.

Structure:

```txt
┌──────────────────────────────────────────────┐
│ Topbar                                       │
├───────────────┬──────────────────────────────┤
│ Sidebar       │ Page content                 │
│               │                              │
│               │                              │
└───────────────┴──────────────────────────────┘

Topbar

Purpose:

Show global context
Allow fast search
Show current branch
Show user/account controls
Show notifications

Elements:

Left:
- Current module/page title
- Breadcrumb optional

Center:
- Global search input

Right:
- Branch selector
- Date/time optional
- Notifications
- User menu

Rules:

Topbar height should be compact.
Search should be accessible from any page.
Branch selector must be visible if multi-branch mode exists.
Notifications should show delayed/urgent operational alerts.
Sidebar

Purpose:

Navigate between main modules
Keep route structure understandable
Support role-based visibility later

Primary navigation:

Dashboard
Reception
Appointments
Patients
Visits
Doctor
Nursing
Lab
Radiology
Procedures
Cashier
Pharmacy
Inventory
Procurement
HR
Finance
Reports
Analytics
Admin

Secondary/system navigation:

Search
Notifications
Tasks
Audit
Settings

Rules:

Sidebar must be collapsible.
Active module must be visually obvious.
Use grouped sections if the list becomes long.
Avoid showing all modules to every role later; RBAC can filter navigation.

Suggested groups:

Clinical
- Reception
- Appointments
- Patients
- Visits
- Doctor
- Nursing
- Lab
- Radiology
- Procedures

Business
- Cashier
- Pharmacy
- Inventory
- Procurement
- HR
- Finance

Management
- Dashboard
- Reports
- Analytics
- Quality

System
- Admin
- Audit
Page Types
1. Workspace Page

Used for role-based operational work.

Examples:

/app/reception
/app/doctor
/app/lab
/app/cashier
/app/nursing
/app/radiology
/app/pharmacy

Layout:

Page Header
Summary Strip
Queue Sections
Right Operational Panel

Visual structure:

┌──────────────────────────────────────────────┐
│ Workspace Header                             │
├──────────────────────────────────────────────┤
│ Summary Strip                                │
├─────────────────────────────┬────────────────┤
│ Queue Sections              │ Right Panel    │
│ - Needs action              │ - Alerts       │
│ - In progress               │ - Recent       │
│ - Completed                 │ - Shortcuts    │
└─────────────────────────────┴────────────────┘

Workspace pages should focus on action, not data browsing.

2. List Page

Used for searchable/filterable records.

Examples:

/app/patients
/app/visits
/app/lab/orders
/app/cashier/invoices
/app/inventory/items
/app/hr/staff

Layout:

Page Header
Filters
Saved Views optional
Dense Table
Pagination
Bulk Actions optional

Visual structure:

┌──────────────────────────────────────────────┐
│ List Header + Primary CTA                    │
├──────────────────────────────────────────────┤
│ Filters / Search / Saved Views               │
├──────────────────────────────────────────────┤
│ Dense Data Table                             │
├──────────────────────────────────────────────┤
│ Pagination                                   │
└──────────────────────────────────────────────┘

Rules:

Tables must be dense.
Important fields should be visible without horizontal scrolling when possible.
Each row should have a primary action.
Use row click for details.
Use filters heavily.
3. Detail Page

Used for a single important entity.

Examples:

/app/visits/[id]
/app/patients/[id]
/app/lab/orders/[id]
/app/cashier/invoices/[id]
/app/hr/staff/[id]

Layout:

Compact Identity Header
Sticky Command Bar
Main Workspace
Right Context Rail
Timeline / Activity

Visual structure:

┌──────────────────────────────────────────────┐
│ Compact Identity Header                      │
├──────────────────────────────────────────────┤
│ Sticky Command Bar                           │
├─────────────────────────────┬────────────────┤
│ Main Workspace              │ Right Rail     │
│ - Main sections             │ - Summary      │
│ - Forms                     │ - Linked data  │
│ - Orders                    │ - Alerts       │
│ - Notes                     │                │
├─────────────────────────────┴────────────────┤
│ Timeline / Activity                           │
└──────────────────────────────────────────────┘

Rules:

No large hero cards.
Header should be compact but informative.
Primary action must be visible near the top.
Timeline should show key changes.
Right rail should contain useful context, not decoration.
4. Create Page

Used for new records.

Examples:

/app/patients/new
/app/appointments/new
/app/visits/new
/app/reception/intake/new

Layout:

Header
Step indicator optional
Main form
Right context/helper panel optional
Footer actions

Rules:

Create flows must be short and guided.
Required fields should be obvious.
For reception intake, speed is more important than perfect completeness.
Allow partial data if workflow permits.
Use “Save and continue” or “Create visit” style CTAs.
5. Settings Page

Used for admin configuration.

Examples:

/app/admin/services
/app/admin/pricelist
/app/admin/users
/app/admin/departments

Layout:

Header
Settings navigation optional
Table/config panel
Edit drawer/modal optional
Audit info optional

Rules:

Settings pages may be table-heavy.
Every setting change should be auditable later.
Avoid mixing operational actions with configuration.
6. Report Page

Used for structured reporting.

Examples:

/app/reports/revenue
/app/reports/doctors
/app/reports/lab

Layout:

Header
Date/branch/department filters
Summary cards
Report table/chart
Export actions

Rules:

Reports are not workspaces.
Reports explain what happened.
Workspaces show what needs action now.
7. Analytics Page

Used for interactive dashboards.

Examples:

/app/analytics/operations
/app/analytics/patient-flow
/app/analytics/bottlenecks

Layout:

Header
Global filters
KPI cards
Charts
Insight panels
Drill-down tables

Rules:

Analytics should show trends and patterns.
Analytics is for management, not daily operators.
Keep operational pages separate from analytics pages.
Shared Components
1. WorkspaceHeader

Used on workspace pages.

Content:

Title
Subtitle
Current branch/department
Date/session context
Primary CTA optional

Example:

Reception Workspace
Manage intake, doctor assignment, and patient flow for today.
Branch: Main Clinic
CTA: New intake

Rules:

Compact height.
Clear purpose.
Primary CTA on the right.
2. SummaryStrip

Used below workspace header.

Purpose:

Show quick operational counters.

Example:

Needs action: 12
Waiting: 8
In progress: 17
Delayed: 3
Completed today: 64

Rules:

Use 4–6 items max.
Counters should be clickable filters if possible.
Highlight urgent/delayed counters.
3. QueueSection

Used in workspaces.

Structure:

Section title
Count
Description optional
Rows
Empty state

Example sections:

Needs action
Waiting for doctor
Active consultations
Awaiting lab
Ready for billing
Completed today

Rules:

Most urgent queue first.
Use consistent row component.
Empty state should explain what it means.
4. OperatorCaseRow

Used for operational queues.

Required fields:

Identity
Case reference
Context
Primary status badge
Secondary badge optional
Next action
Primary CTA
Overflow menu optional

Layout:

┌──────────────────────────────────────────────┐
│ Patient / Entity name       Status Badge     │
│ Case ID · context text      Secondary Badge  │
│ Next: action text           Primary Button   │
└──────────────────────────────────────────────┘

Patient/visit example:

Aliyev Sardor
VIS-2026-00091 · 34M · Cardiology
Status: Waiting for doctor
Next: Start consultation
Button: Open

Invoice example:

Aliyev Sardor
INV-2026-00112 · Visit VIS-2026-00091
Status: Partially paid
Next: Collect remaining payment
Button: Record payment

Rules:

One primary CTA only.
Secondary actions go in overflow menu.
Status badge must use shared workflow mapping.
Row must be scannable in under 2 seconds.
5. StatusBadge

Used everywhere.

Rules:

Same status = same label = same color.
Use semantic tones, not random colors.

Suggested tones:

neutral     = created / draft / inactive
info        = assigned / scheduled / in queue
warning     = waiting / pending / needs action
success     = paid / completed / verified
danger      = cancelled / failed / void / critical
accent      = active / in progress

Do not create custom badge colors per page.

6. DetailWorkspace

Used on detail pages.

Structure:

DetailHeader
CommandBar
ContentGrid
RightRail
Timeline

Rules:

Reusable across visit, patient, invoice, lab order, etc.
Must support dense mode.
Must support status badges.
Must support primary action slot.
7. StickyCommandBar

Used below detail header.

Purpose:

Keep important actions visible.

Examples for visit:

Assign doctor
Queue for doctor
Start consultation
Send to lab
Send to billing
Record payment
Complete visit
Cancel visit

Examples for invoice:

Issue invoice
Record payment
Void invoice
Refund
Print

Rules:

Show only valid actions for current status.
Primary action first.
Dangerous actions should be visually separated.
Do not show impossible actions.
8. RightContextRail

Used on detail pages.

Purpose:

Show supporting context.

Visit right rail:

Patient summary
Assigned doctor
Invoice summary
Lab/radiology status
Documents
Alerts

Patient right rail:

Contact info
Risk flags
Current active visit
Debt/balance
Recent documents

Invoice right rail:

Patient
Visit
Payment summary
Cashier shift
Audit info

Rules:

Context rail should help decisions.
Do not put unrelated data there.
Keep it compact.
9. Timeline

Used on detail pages.

Shows important events:

Visit created
Doctor assigned
Queued for doctor
Consultation started
Lab ordered
Sample collected
Result entered
Doctor reviewed
Invoice issued
Payment recorded
Visit completed

Rules:

Timeline should be chronological.
Show actor, time, and action.
Important changes should be auditable later.
10. DataTableShell

Used for list pages.

Features:

Search
Filters
Column visibility optional
Saved views optional
Dense rows
Row actions
Pagination
Empty state

Rules:

Keep columns practical.
Use status badges.
Avoid dumping every model field into the table.
Each table should have one default useful view.
11. EmptyState

Used when a section has no data.

Good examples:

No patients waiting for doctor.
All assigned patients have already been handled.

No unpaid invoices.
Cashier queue is currently clear.

No lab results pending review.
Doctor review queue is empty.

Bad examples:

No data.
Empty.
Nothing found.

Rules:

Explain what the empty state means operationally.
Provide CTA only if useful.
Workspace-Specific UI Grammar
Reception Workspace

Route:

/app/reception

Purpose:

Reception operators manage intake and patient movement.

Layout:

Header:
- Reception Workspace
- Branch
- New intake CTA

Summary Strip:
- Needs action
- Waiting for doctor
- In consultation
- Billing pending
- Completed today

Queue Sections:
1. Needs action
2. Waiting / queued for doctor
3. In progress
4. Billing pending
5. Closed today

Right Panel:
- Fast patient search
- Today's appointments
- Recent registrations
- Delayed cases

Row required fields:

Patient name
Visit code
Age/gender/phone
Workflow badge
Assigned doctor
Next action
Primary CTA

Allowed primary CTAs:

Assign doctor
Queue for doctor
Open visit
Send to cashier
Complete visit
Doctor Workspace

Route:

/app/doctor

Purpose:

Doctor manages patient consultations.

Layout:

Header:
- Doctor Workspace
- Doctor name/department
- Schedule shortcut

Summary Strip:
- Waiting
- Active
- Needs review
- Completed today

Queue Sections:
1. My queue
2. Active encounters
3. Lab/radiology review
4. Completed today

Right Panel:
- Today's appointments
- Urgent cases
- Recent results

Row required fields:

Patient name
Visit code
Reason/chief complaint
Workflow badge
Consultation badge
Next action
Primary CTA

Allowed primary CTAs:

Start consultation
Continue consultation
Review result
Complete consultation
Open visit
Lab Workspace

Route:

/app/lab

Purpose:

Lab operators manage lab order lifecycle.

Layout:

Header:
- Lab Workspace
- Lab station/department
- Order search

Summary Strip:
- Ordered
- Sample pending
- In progress
- Result entry
- Verification
- Released

Queue Sections:
1. Sample collection
2. Processing
3. Result entry
4. Verification
5. Released / ready for doctor

Right Panel:
- Urgent tests
- Delayed samples
- Equipment status
- Reagent warnings

Row required fields:

Patient name
Lab order code
Requested tests
Priority
Lab status badge
Next action
Primary CTA

Allowed primary CTAs:

Collect sample
Start processing
Enter result
Verify result
Release result
Open order
Cashier Workspace

Route:

/app/cashier

Purpose:

Cashier manages billing and payments.

Layout:

Header:
- Cashier Workspace
- Current shift
- Cashbox
- Payment search

Summary Strip:
- Needs invoice
- Awaiting payment
- Partial payments
- Paid today
- Refunds

Queue Sections:
1. Needs billing action
2. Awaiting payment
3. Partial payments
4. Settled today
5. Void/cancelled

Right Panel:
- Shift total
- Payment method split
- Recent payments
- Unpaid high-priority cases

Row required fields:

Patient name
Invoice code or visit code
Amount
Payment status badge
Visit workflow badge optional
Next action
Primary CTA

Allowed primary CTAs:

Issue invoice
Record payment
Collect remaining
Print receipt
Open invoice
Dashboard Workspace

Route:

/app/dashboard

Purpose:

Management overview of clinic operations.

Layout:

Header:
- Dashboard
- Date range
- Branch filter

Summary Strip:
- Visits today
- Waiting patients
- Active doctors
- Lab pending
- Revenue today
- Unpaid invoices

Main Sections:
- Patient flow
- Revenue snapshot
- Department load
- Queue bottlenecks
- Delayed cases

Right Panel:
- Alerts
- System warnings
- Critical operational issues

Rules:

Dashboard should summarize, not replace workspaces.
Every dashboard card should link to a useful module.
Detail Page Grammar
Visit Detail

Route:

/app/visits/[id]

Header:

Patient name
Visit code
Age/gender
Workflow badge
Doctor
Department
Created time

Command bar actions:

Assign doctor
Queue for doctor
Start consultation
Continue consultation
Order lab
Order radiology
Send to billing
Record payment
Complete visit
Cancel visit

Main workspace sections:

Clinical workspace
Orders
Lab/radiology results
Billing summary
Documents
Notes

Right rail:

Patient summary
Current workflow
Assigned doctor
Invoice summary
Alerts
Linked records

Timeline:

All visit workflow changes and important actions
Patient Detail

Route:

/app/patients/[id]

Header:

Patient name
Patient ID
Age/gender
Phone
Risk flags
Current balance/debt

Command bar actions:

New visit
New appointment
Edit patient
Upload document
Print profile

Main workspace sections:

Overview
Active visit
Visit history
Medical record summary
Lab/radiology history
Invoices
Documents

Right rail:

Contact info
Emergency contact
Risk flags
Debt/balance
Recent activity
Appointment Detail

Route:

/app/appointments/[id]

Header:

Patient name
Appointment code
Doctor
Department
Scheduled time
Appointment status

Command bar actions:

Confirm
Check in
Convert to visit
Reschedule
Mark no-show
Cancel

Main workspace sections:

Appointment details
Patient summary
Doctor schedule context
Notes

Right rail:

Patient contact
Previous appointments
Related visit if created
Lab Order Detail

Route:

/app/lab/orders/[id]

Header:

Patient name
Lab order code
Visit code
Requested by doctor
Priority
Lab status

Command bar actions:

Collect sample
Start processing
Enter result
Verify result
Release result
Cancel order

Main workspace sections:

Test list
Sample information
Result entry
Verification
Attachments

Right rail:

Patient summary
Visit context
Doctor request notes
Equipment/reagent notes
Invoice Detail

Route:

/app/cashier/invoices/[id]

Header:

Patient name
Invoice code
Visit code
Total amount
Paid amount
Balance
Invoice status

Command bar actions:

Issue invoice
Record payment
Void invoice
Refund
Print invoice
Print receipt

Main workspace sections:

Invoice items
Payments
Refunds
Patient/visit context
Notes

Right rail:

Patient summary
Visit summary
Cashier shift
Payment method split
Audit info
Form Grammar
General Form Rules
Use compact labels.
Required fields must be obvious.
Group related fields.
Avoid giant forms where possible.
Use progressive disclosure for advanced fields.
Use inline validation.
Provide clear save/cancel actions.
Use realistic empty/default values in mock mode.
Intake Form

Reception intake must be fast.

Sections:

Patient identity
Contact
Visit reason
Department/doctor
Payment type
Notes

Required fields:

Full name
Phone or patient ID
Visit type
Department or doctor

Optional fields:

Birth date
Gender
Address
Passport/ID
Notes

Primary actions:

Create visit
Create and assign doctor
Create and queue
Clinical Note Form

Doctor form should be dense.

Sections:

Chief complaint
Vitals
Examination
Diagnosis
Plan
Orders
Prescription
Doctor note

Primary actions:

Save draft
Order lab
Order radiology
Complete consultation
Payment Form

Cashier form should be fast and safe.

Fields:

Invoice
Total amount
Already paid
Remaining balance
Payment amount
Payment method
Reference number optional
Notes

Primary actions:

Record payment
Record partial payment
Print receipt

Safety:

Prevent overpayment unless explicitly allowed.
Confirm refund/void actions.
Show remaining balance clearly.
Badge Grammar
Workflow Badge Examples
Intake created
Doctor assigned
Waiting for doctor
With doctor
Awaiting lab
Lab in progress
Awaiting doctor review
Consultation completed
Billing pending
Partially paid
Paid
Completed
Cancelled
Invoice Badge Examples
Draft
Issued
Partially paid
Paid
Void
Refunded
Cancelled
Lab Badge Examples
Ordered
Sample pending
Sample collected
In progress
Result entered
Verified
Released
Reviewed
Cancelled
Appointment Badge Examples
Scheduled
Confirmed
Arrived
Checked in
No-show
Cancelled
Converted to visit
Action Grammar
Primary Action

Each row/page should have one primary action.

Examples:

Assign doctor
Start consultation
Collect sample
Enter result
Record payment
Complete visit
Secondary Actions

Secondary actions go into overflow menu or secondary buttons.

Examples:

Edit
Print
Cancel
Upload document
View timeline
Dangerous Actions

Dangerous actions must be separated visually.

Examples:

Cancel visit
Void invoice
Delete draft
Refund payment

Rules:

Dangerous actions should require confirmation.
Never place dangerous action as the default primary CTA.
Empty State Grammar

Every empty state must be meaningful.

Good
No patients waiting for doctor.
All queued patients have already been handled.

No invoices awaiting payment.
Cashier queue is clear for now.

No lab results pending verification.
All entered results have been verified.
Bad
No data.
Empty.
Nothing here.
Loading and Error States
Loading

Use skeletons for:

Queues
Tables
Detail headers
Right rails
Summary strips

Avoid full-page spinners except during initial app load.

Error

Error state should show:

What failed
What the user can do
Retry action
Support/debug code optional

Example:

Could not load lab orders.
Check connection and try again.

Button: Retry
Responsive Rules

Primary target:

Desktop first
Large clinic operator screens
Minimum comfortable width: 1280px

Secondary target:

Tablet usable
Mobile later

Rules:

Desktop layout should be dense.
Right rail can collapse on smaller screens.
Sidebar can collapse.
Tables should remain usable with horizontal scroll when needed.
Critical actions must remain accessible.
Visual Style Direction

Tone:

Professional
Clinical
Dense
Calm
Precise
Enterprise-grade

Avoid:

Playful colors
Huge rounded cards everywhere
Overly large icons
Decorative gradients
Marketing landing-page style

Use:

Subtle borders
Soft background sections
Compact cards
Clear typography hierarchy
Consistent badges
Readable tables
Implementation Rules for Codex

When implementing UI:

Do not create each page with a unique design.
Use shared components from this grammar.
Do not create decorative placeholder cards.
Use realistic mock data.
Every workspace must use:
WorkspaceHeader
SummaryStrip
QueueSection
OperatorCaseRow
Every detail page must use:
DetailWorkspace
Compact identity header
StickyCommandBar
RightContextRail
Timeline
Every operational row must show:
identity
case reference
context
status
next action
primary CTA
Do not implement backend logic in frontend tasks.
Mock data should look like future API responses.
Keep UI dense and operator-first.
First UI Implementation Priority

Build shared UI foundations first:

AppShell
Sidebar
Topbar
WorkspaceHeader
SummaryStrip
QueueSection
OperatorCaseRow
StatusBadge
DetailWorkspace
StickyCommandBar
RightContextRail
Timeline
DataTableShell
EmptyState

Only after these exist, implement module pages.