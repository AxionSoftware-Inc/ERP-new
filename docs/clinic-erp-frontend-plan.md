# Clinic ERP / HIS Frontend Implementation Plan

## Purpose

This document defines the frontend implementation order for the clinic ERP/HIS.

The frontend is built first using realistic mock data, shared workflow helpers, and reusable UI components.

The goal is to create a stable, enterprise-grade frontend foundation before implementing the Django REST Framework backend.

---

# Development Strategy

## Frontend-first, but contract-aware

The frontend should be built before backend implementation, but it must follow documented data contracts.

Frontend must use:

```txt
docs/clinic-erp-spec.md
docs/clinic-erp-modules.md
docs/clinic-erp-routes.md
docs/clinic-erp-ui-grammar.md
docs/clinic-erp-workflows.md
docs/clinic-erp-data-contracts.md
docs/clinic-erp-components.md
```

The frontend must not invent new routes, statuses, layouts, or data shapes unless explicitly documented.

---

# Implementation Rules

## General Rules

1. Use Next.js App Router.
2. Use TypeScript.
3. Use Tailwind and shadcn/ui if available.
4. Use compact enterprise styling.
5. Use realistic mock data.
6. Do not implement backend code in frontend tasks.
7. Do not fetch real APIs yet.
8. All mock data must match `clinic-erp-data-contracts.md`.
9. All statuses must come from `clinic-erp-workflows.md`.
10. All shared UI must follow `clinic-erp-components.md`.
11. Every operational page must show next actions.
12. Every detail page must support command bar and right rail.
13. Do not create large marketing-style cards.
14. Do not create each page with a unique layout.
15. Do not implement all modules at once.

---

# Frontend Implementation Phases

## Phase 0 — Documentation and Safety

Status: documentation-only.

Documents:

```txt
clinic-erp-spec.md
clinic-erp-modules.md
clinic-erp-routes.md
clinic-erp-ui-grammar.md
clinic-erp-workflows.md
clinic-erp-data-contracts.md
clinic-erp-components.md
clinic-erp-frontend-plan.md
```

Acceptance criteria:

```txt
All documents exist.
No frontend pages generated yet from broad scope.
No backend code generated.
Codex understands not to implement everything at once.
```

---

## Phase 1 — Foundation

Purpose:

Create shared types, workflow helpers, mock data base, layout shell, and core reusable components.

Do this before module pages.

### Phase 1.1 — Types

Create:

```txt
lib/types/shared.ts
lib/types/patients.ts
lib/types/appointments.ts
lib/types/visits.ts
lib/types/clinical.ts
lib/types/lab.ts
lib/types/radiology.ts
lib/types/procedures.ts
lib/types/billing.ts
lib/types/documents.ts
lib/types/workspaces.ts
```

Rules:

```txt
Types must match docs/clinic-erp-data-contracts.md.
Use string IDs.
Use ISO string dates.
Use Money type for amounts.
Do not add unnecessary fields.
```

Acceptance criteria:

```txt
Types compile.
No duplicated status unions across multiple files unless imported.
Shared types are reused.
```

---

### Phase 1.2 — Workflow Helpers

Create:

```txt
lib/workflow/status-tones.ts
lib/workflow/visit-workflow.ts
lib/workflow/appointment-workflow.ts
lib/workflow/consultation-workflow.ts
lib/workflow/lab-workflow.ts
lib/workflow/radiology-workflow.ts
lib/workflow/procedure-workflow.ts
lib/workflow/invoice-workflow.ts
lib/workflow/index.ts
```

Required helpers:

```ts
getVisitWorkflowLabel(status)
getVisitWorkflowTone(status)
getVisitWorkflowBadge(status)
getVisitNextActionForRole(visit, role)
getVisitPrimaryCTAForRole(visit, role)
getAllowedVisitActions(visit, role)

getAppointmentStatusLabel(status)
getAppointmentStatusBadge(status)
getAppointmentNextAction(appointment)

getConsultationStatusBadge(status)

getLabStatusLabel(status)
getLabStatusBadge(status)
getLabNextAction(order, role)

getRadiologyStatusBadge(status)
getRadiologyNextAction(order, role)

getProcedureStatusBadge(status)
getProcedureNextAction(order, role)

getInvoiceStatusLabel(status)
getInvoiceStatusBadge(status)
getCashierNextAction(invoice, visit)

getStatusTone(domain, status)
```

Rules:

```txt
Status label and tone must not be hardcoded in pages.
Command bars and queues must use helpers.
Unknown statuses should fall back safely.
```

Acceptance criteria:

```txt
All documented statuses return label and tone.
Helpers return realistic next actions.
No page-level status label duplication.
```

---

### Phase 1.3 — Mock Data Foundation

Create:

```txt
lib/mock/shared.ts
lib/mock/patients.ts
lib/mock/appointments.ts
lib/mock/visits.ts
lib/mock/clinical.ts
lib/mock/lab.ts
lib/mock/radiology.ts
lib/mock/procedures.ts
lib/mock/billing.ts
lib/mock/documents.ts
lib/mock/workspaces.ts
```

Create mock API client:

```txt
lib/api/mock-client.ts
lib/api/client.ts
```

Required functions:

```ts
getReceptionWorkspace()
getDoctorWorkspace()
getLabWorkspace()
getCashierWorkspace()

getPatients()
getPatientDetail(id)

getAppointments()
getAppointmentDetail(id)

getVisits()
getVisitDetail(id)

getLabOrders()
getLabOrderDetail(id)

getInvoices()
getInvoiceDetail(id)
```

Rules:

```txt
Mock data must use realistic Uzbek/Central Asian names.
Mock data must include different workflow states.
Workspace mock responses must include summary, queues, and rightPanel.
Detail mock responses must include timeline.
```

Acceptance criteria:

```txt
Mock client functions return typed data.
Workspace data can drive queue pages.
Detail data can drive detail pages.
No component contains hardcoded mock records.
```

---

### Phase 1.4 — Layout Foundation

Create:

```txt
components/layout/app-shell.tsx
components/layout/sidebar.tsx
components/layout/topbar.tsx
```

Also create navigation config:

```txt
lib/navigation/app-nav.ts
```

Rules:

```txt
All /app routes should use AppShell.
Sidebar should group modules into Clinical, Business, Management, System.
Topbar should include global search placeholder, branch, notifications, user menu placeholder.
Keep layout compact.
```

Acceptance criteria:

```txt
/app pages render inside shared shell.
Sidebar active route works.
Sidebar can be collapsed or is structured for collapse.
Topbar does not duplicate page headers.
```

---

### Phase 1.5 — Core Shared Components

Create:

```txt
components/workspace/workspace-header.tsx
components/workspace/summary-strip.tsx
components/workspace/queue-section.tsx
components/workspace/operator-case-row.tsx
components/workspace/workspace-right-panel.tsx

components/status/status-badge.tsx
components/status/next-action-label.tsx
components/actions/action-button.tsx

components/feedback/empty-state.tsx
components/feedback/loading-state.tsx
components/feedback/error-state.tsx
```

Rules:

```txt
Components must follow docs/clinic-erp-components.md.
Components must be typed.
Components should be presentation-only.
No data fetching inside shared components.
Use compact layout.
```

Acceptance criteria:

```txt
Workspace components can render Reception/Doctor/Lab/Cashier style queues.
StatusBadge supports all tones.
OperatorCaseRow displays identity, context, badges, next action, CTA.
EmptyState is meaningful.
```

---

### Phase 1.6 — Detail Components

Create:

```txt
components/detail/detail-workspace.tsx
components/detail/detail-header.tsx
components/detail/sticky-command-bar.tsx
components/detail/right-context-rail.tsx
components/detail/timeline.tsx
components/detail/detail-section.tsx
```

Rules:

```txt
Use the detail grammar from docs/clinic-erp-ui-grammar.md.
Do not hardcode domain logic.
Support command bar and right rail.
Keep dense layout.
```

Acceptance criteria:

```txt
Visit detail, patient detail, lab order detail, invoice detail can reuse these components.
Right rail collapses or remains usable on smaller screens.
Timeline renders typed events.
```

---

### Phase 1.7 — Table/Form/Domain Mini Components

Create:

```txt
components/table/data-table-shell.tsx
components/table/filter-bar.tsx

components/forms/form-section.tsx
components/forms/form-actions.tsx

components/patients/patient-quick-search.tsx
components/patients/patient-mini-card.tsx
components/visits/visit-mini-card.tsx
components/billing/invoice-summary-card.tsx
components/lab/lab-order-mini-card.tsx
```

Rules:

```txt
Tables are dense and filter-ready.
Forms are compact and sectioned.
Mini cards show context only, not full detail.
```

Acceptance criteria:

```txt
Patient/list/detail pages can reuse these.
Visit detail right rail can use mini cards.
Cashier and lab pages can use summary cards.
```

---

# Phase 2 — Phase 1 Routes and Placeholder Pages

Purpose:

Create route placeholders for the core clinical loop only.

Do not implement all modules yet.

Create these routes:

```txt
/login
/app
/app/dashboard
/app/search
/app/notifications

/app/reception
/app/reception/intake/new
/app/reception/queue
/app/reception/check-in
/app/reception/walk-ins
/app/reception/patient-search

/app/patients
/app/patients/new
/app/patients/[id]
/app/patients/[id]/overview
/app/patients/[id]/visits
/app/patients/[id]/medical-record
/app/patients/[id]/lab-results
/app/patients/[id]/radiology
/app/patients/[id]/invoices
/app/patients/[id]/documents
/app/patients/[id]/activity
/app/patients/[id]/edit

/app/appointments
/app/appointments/calendar
/app/appointments/list
/app/appointments/new
/app/appointments/[id]
/app/appointments/[id]/edit

/app/visits
/app/visits/new
/app/visits/[id]
/app/visits/[id]/clinical
/app/visits/[id]/orders
/app/visits/[id]/lab
/app/visits/[id]/radiology
/app/visits/[id]/billing
/app/visits/[id]/documents
/app/visits/[id]/timeline

/app/doctor
/app/doctor/queue
/app/doctor/active
/app/doctor/reviews
/app/doctor/completed
/app/doctor/visits/[id]

/app/lab
/app/lab/orders
/app/lab/orders/[id]
/app/lab/sample-collection
/app/lab/processing
/app/lab/result-entry
/app/lab/results
/app/lab/reports
/app/lab/equipment

/app/cashier
/app/cashier/invoices
/app/cashier/invoices/[id]
/app/cashier/payments
/app/cashier/refunds
/app/cashier/debts
/app/cashier/shift-close

/app/admin
/app/admin/users
/app/admin/roles
/app/admin/permissions
/app/admin/branches
/app/admin/departments
/app/admin/rooms
/app/admin/services
/app/admin/pricelist
/app/admin/doctors
/app/admin/lab-tests
/app/admin/workflows
```

Rules:

```txt
Use placeholders only where full page is not being implemented yet.
Each placeholder must show route purpose and page type.
All app pages must use AppShell.
Do not build Phase 2/3/4 modules yet.
```

Acceptance criteria:

```txt
Routes compile.
Navigation links to core pages.
Placeholders are clean and consistent.
No random unique layouts.
```

---

# Phase 3 — Core Workspace Pages

Purpose:

Implement real mock-data driven workspace pages for the operational loop.

Implement in this order:

```txt
1. Reception Workspace
2. Doctor Workspace
3. Lab Workspace
4. Cashier Workspace
5. Dashboard Lite
```

---

## 3.1 Reception Workspace

Route:

```txt
/app/reception
```

Use:

```txt
getReceptionWorkspace()
WorkspaceHeader
SummaryStrip
QueueSection
OperatorCaseRow
WorkspaceRightPanel
PatientQuickSearch
```

Sections:

```txt
Needs action
In progress
Billing / closing
Closed today
```

Acceptance criteria:

```txt
Reception page shows real queue sections from mock data.
Each row shows patient, visit code, context, badge, next action, CTA.
Right panel shows appointments, registrations, delayed cases.
No hardcoded status labels inside page.
```

---

## 3.2 Doctor Workspace

Route:

```txt
/app/doctor
```

Use:

```txt
getDoctorWorkspace()
WorkspaceHeader
SummaryStrip
QueueSection
OperatorCaseRow
WorkspaceRightPanel
```

Sections:

```txt
My queue
Active encounters
Needs review
Completed today
```

Acceptance criteria:

```txt
Doctor page shows queue based on workflow statuses.
Rows show reason/chief complaint context.
CTA is Start/Continue/Review/View depending status.
```

---

## 3.3 Lab Workspace

Route:

```txt
/app/lab
```

Use:

```txt
getLabWorkspace()
WorkspaceHeader
SummaryStrip
QueueSection
OperatorCaseRow
WorkspaceRightPanel
```

Sections:

```txt
Sample collection
Processing
Result entry
Verification
Released
```

Acceptance criteria:

```txt
Lab page shows lab order queues.
Rows show lab order code, tests, priority, status, next action.
Urgent and delayed items visible in right panel.
```

---

## 3.4 Cashier Workspace

Route:

```txt
/app/cashier
```

Use:

```txt
getCashierWorkspace()
WorkspaceHeader
SummaryStrip
QueueSection
OperatorCaseRow
WorkspaceRightPanel
InvoiceSummaryCard
```

Sections:

```txt
Needs billing action
Awaiting payment
Partial payments
Settled today
Void / cancelled
```

Acceptance criteria:

```txt
Cashier page shows invoice queues.
Rows show invoice/visit code, amount, status, next action.
Right panel shows shift totals and recent payments.
```

---

## 3.5 Dashboard Lite

Route:

```txt
/app/dashboard
```

Use:

```txt
WorkspaceHeader
SummaryStrip
DetailSection or simple dashboard sections
```

Sections:

```txt
Patient flow
Revenue snapshot
Department load
Queue bottlenecks
Delayed cases
```

Acceptance criteria:

```txt
Dashboard summarizes operation.
Dashboard links to workspaces.
Dashboard does not replace role workspaces.
```

---

# Phase 4 — Core Detail Pages

Purpose:

Implement detail pages using `DetailWorkspace`.

Implement in this order:

```txt
1. Visit Detail
2. Patient Detail
3. Lab Order Detail
4. Invoice Detail
5. Appointment Detail
6. Doctor Visit Detail
```

---

## 4.1 Visit Detail

Route:

```txt
/app/visits/[id]
```

Use:

```txt
getVisitDetail(id)
DetailWorkspace
DetailHeader
StickyCommandBar
DetailSection
RightContextRail
Timeline
PatientMiniCard
InvoiceSummaryCard
LabOrderMiniCard
```

Acceptance criteria:

```txt
Header shows patient, visit code, workflow badge, doctor, department.
Command bar shows valid workflow actions from helpers/mock nextAction.
Main workspace shows clinical, orders, lab/radiology, billing, documents.
Right rail shows patient summary, invoice summary, linked records.
Timeline shows workflow events.
```

---

## 4.2 Patient Detail

Route:

```txt
/app/patients/[id]
```

Use:

```txt
getPatientDetail(id)
DetailWorkspace
DetailHeader
StickyCommandBar
DetailSection
RightContextRail
Timeline
VisitMiniCard
InvoiceSummaryCard
```

Acceptance criteria:

```txt
Header shows patient identity.
Command bar has New visit, New appointment, Edit, Upload document.
Main workspace shows overview, active visit, history, documents.
Right rail shows contact, risk flags, debt/balance.
```

---

## 4.3 Lab Order Detail

Route:

```txt
/app/lab/orders/[id]
```

Use:

```txt
getLabOrderDetail(id)
DetailWorkspace
DetailHeader
StickyCommandBar
DetailSection
RightContextRail
Timeline
PatientMiniCard
```

Acceptance criteria:

```txt
Header shows patient, lab order code, visit code, priority, lab status.
Command bar shows valid lab actions.
Main workspace shows tests, sample info, result entry, verification.
Right rail shows patient and visit context.
```

---

## 4.4 Invoice Detail

Route:

```txt
/app/cashier/invoices/[id]
```

Use:

```txt
getInvoiceDetail(id)
DetailWorkspace
DetailHeader
StickyCommandBar
DetailSection
RightContextRail
Timeline
PatientMiniCard
VisitMiniCard
```

Acceptance criteria:

```txt
Header shows invoice code, patient, total, paid, balance, status.
Command bar shows Issue invoice / Record payment / Print / Void where valid.
Main workspace shows items, payments, refunds.
Right rail shows patient, visit, cashier context.
```

---

# Phase 5 — Core List/Create Pages

Purpose:

Implement list and create pages after workspaces/details are stable.

Implement:

```txt
/app/patients
/app/patients/new
/app/appointments
/app/appointments/calendar
/app/appointments/new
/app/visits
/app/visits/new
/app/lab/orders
/app/cashier/invoices
/app/admin/services
/app/admin/pricelist
/app/admin/departments
/app/admin/users
```

Use:

```txt
DataTableShell
FilterBar
FormSection
FormActions
PatientQuickSearch
```

Acceptance criteria:

```txt
Lists use dense table shell.
Create forms are compact and workflow-aware.
Admin basic pages manage mock configuration data.
```

---

# Phase 6 — Polish and Consistency Pass

Purpose:

Review and align UI consistency.

Checklist:

```txt
All workspaces use WorkspaceHeader + SummaryStrip + QueueSection.
All rows use OperatorCaseRow or DataTableShell.
All statuses use StatusBadge.
All detail pages use DetailWorkspace.
All command bars show valid actions.
All empty states are meaningful.
Spacing is compact and consistent.
No decorative marketing cards.
Navigation active states work.
Mock data is realistic.
No backend calls exist yet.
```

---

# Phase 7 — Backend Preparation

Purpose:

After frontend core is stable, prepare backend implementation docs.

Future docs:

```txt
docs/clinic-erp-backend-plan.md
docs/clinic-erp-api-endpoints.md
docs/clinic-erp-database-models.md
docs/clinic-erp-permissions.md
docs/clinic-erp-audit-plan.md
```

Do not start backend until:

```txt
Phase 1 shared foundation is done.
Phase 3 core workspaces are usable.
Phase 4 core details are usable.
Data contracts are stable enough.
```

---

# Codex Task Sequence

Use small controlled tasks.

## Task 1 — Create Types

```txt
Read:
- docs/clinic-erp-data-contracts.md
- docs/clinic-erp-workflows.md

Create the TypeScript type files under lib/types as specified in docs/clinic-erp-frontend-plan.md Phase 1.1.

Do not create UI components.
Do not create pages.
Do not create backend code.

Acceptance:
- Types compile.
- Status unions match workflow docs.
- Shared types are reused.
```

---

## Task 2 — Create Workflow Helpers

```txt
Read:
- docs/clinic-erp-workflows.md
- lib/types/*

Create workflow helper files under lib/workflow as specified in Phase 1.2.

Do not create pages.
Do not create backend code.

Acceptance:
- Every documented status has label and badge tone.
- Visit, appointment, lab, radiology, procedure, invoice helpers exist.
- Unknown status fallback is safe.
```

---

## Task 3 — Create Mock Data and Mock Client

```txt
Read:
- docs/clinic-erp-data-contracts.md
- lib/types/*
- lib/workflow/*

Create mock data files and mock client under lib/mock and lib/api.

Do not create pages.
Do not create backend code.

Acceptance:
- Workspace responses exist for reception, doctor, lab, cashier.
- Detail responses exist for patient, visit, lab order, invoice.
- Mock data uses realistic names and statuses.
```

---

## Task 4 — Create Layout Foundation

```txt
Read:
- docs/clinic-erp-ui-grammar.md
- docs/clinic-erp-components.md
- docs/clinic-erp-routes.md

Create AppShell, Sidebar, Topbar, and app navigation config.

Do not implement module pages yet.

Acceptance:
- AppShell can wrap /app routes.
- Sidebar groups Clinical, Business, Management, System.
- Topbar includes search, branch, notifications, user menu placeholders.
```

---

## Task 5 — Create Core Shared Components

```txt
Read:
- docs/clinic-erp-components.md
- docs/clinic-erp-ui-grammar.md
- lib/types/*

Create core workspace/status/action/feedback components:
- WorkspaceHeader
- SummaryStrip
- QueueSection
- OperatorCaseRow
- WorkspaceRightPanel
- StatusBadge
- NextActionLabel
- ActionButton
- EmptyState
- LoadingState
- ErrorState

Do not implement pages yet.

Acceptance:
- Components are typed.
- Components are compact.
- OperatorCaseRow supports identity, context, badges, next action, primary action.
```

---

## Task 6 — Create Detail Components

```txt
Read:
- docs/clinic-erp-components.md
- docs/clinic-erp-ui-grammar.md

Create:
- DetailWorkspace
- DetailHeader
- StickyCommandBar
- RightContextRail
- Timeline
- DetailSection

Do not implement domain pages yet.

Acceptance:
- Components are reusable and presentation-only.
- DetailWorkspace supports header, commandBar, main, rightRail, timeline.
```

---

## Task 7 — Create Phase 1 Route Placeholders

```txt
Read:
- docs/clinic-erp-routes.md
- docs/clinic-erp-frontend-plan.md

Create only Phase 1 route placeholders.

Do not implement Phase 2/3/4 modules.
Do not create backend code.

Acceptance:
- All Phase 1 routes compile.
- App pages use AppShell.
- Each placeholder shows route purpose and page type.
```

---

## Task 8 — Implement Reception Workspace

```txt
Read:
- docs/clinic-erp-ui-grammar.md
- docs/clinic-erp-workflows.md
- docs/clinic-erp-data-contracts.md
- docs/clinic-erp-components.md

Implement /app/reception using mock client and shared components.

Acceptance:
- Shows summary strip.
- Shows Needs action, In progress, Billing/closing, Closed today.
- Uses OperatorCaseRow for rows.
- Uses workflow badges and next actions.
- Has right panel.
```

---

## Task 9 — Implement Doctor Workspace

```txt
Implement /app/doctor using mock client and shared components.

Acceptance:
- Shows My queue, Active encounters, Needs review, Completed today.
- Rows show patient, visit, reason, status, next action.
- Uses shared workflow helpers/components.
```

---

## Task 10 — Implement Lab Workspace

```txt
Implement /app/lab using mock client and shared components.

Acceptance:
- Shows sample collection, processing, result entry, verification, released.
- Rows show tests, priority, lab status, next action.
- Right panel shows urgent/delayed/equipment/reagent warnings.
```

---

## Task 11 — Implement Cashier Workspace

```txt
Implement /app/cashier using mock client and shared components.

Acceptance:
- Shows needs billing, awaiting payment, partial payments, settled, void/cancelled.
- Rows show invoice code, patient, amount, status, next action.
- Right panel shows shift totals and recent payments.
```

---

## Task 12 — Implement Visit Detail

```txt
Implement /app/visits/[id] using DetailWorkspace and mock client.

Acceptance:
- Header, command bar, main workspace, right rail, timeline exist.
- Shows patient, visit code, workflow status, doctor, department.
- Uses shared mini cards and timeline.
```

---

# Hard Stop Rules

Codex must stop and ask for review after:

```txt
Task 3
Task 6
Task 8
Task 12
```

Do not allow Codex to continue building many modules without review.

---

# Current Recommended Next Step

The next implementation task should be:

```txt
Task 1 — Create Types
```