# Clinic ERP / HIS Modules

## Purpose

This document defines the full module inventory for the clinic ERP/HIS.

The product is designed for a medium-large clinic with 500+ staff. Modules are grouped by operational area and implementation priority.

This is not a simple CRUD system. Each module must support workflow-driven operations, role-specific workspaces, clear next actions, auditability, and scalable enterprise use.

---

# Module Groups

## A. Core Clinical Operations

These modules control the daily patient care flow.

### 1. Dashboard / Command Center

**Purpose:**  
Show management and operational users the current state of the clinic.

**Primary users:**  
Admin, director, operations manager, department manager.

**Includes:**
- Today overview
- Patient flow summary
- Revenue snapshot
- Department load
- Queue bottlenecks
- Delayed cases
- Operational alerts

**Initial routes:**
- `/app/dashboard`
- `/app/dashboard/operations`
- `/app/dashboard/revenue`
- `/app/dashboard/clinical`
- `/app/dashboard/staff`

**Priority:** Phase 1

---

### 2. Reception / Registry

**Purpose:**  
Handle patient intake, registration, check-in, walk-ins, appointment arrivals, doctor assignment, and visit queue control.

**Primary users:**  
Receptionist, registry operator, front desk manager.

**Includes:**
- Reception workspace
- New patient intake
- Existing patient search
- Walk-in registration
- Appointment check-in
- Doctor assignment
- Visit queue control
- Reception queue monitoring

**Initial routes:**
- `/app/reception`
- `/app/reception/intake/new`
- `/app/reception/queue`
- `/app/reception/check-in`
- `/app/reception/walk-ins`
- `/app/reception/patient-search`

**Priority:** Phase 1

---

### 3. Appointments / Scheduling

**Purpose:**  
Manage doctor schedules, appointment booking, rescheduling, cancellations, no-shows, and appointment-to-visit conversion.

**Primary users:**  
Receptionist, call center operator, doctor assistant, department manager.

**Includes:**
- Calendar view
- Doctor schedule view
- Appointment list
- New appointment form
- Appointment detail
- Reschedule flow
- Cancel/no-show flow
- Convert appointment to visit

**Initial routes:**
- `/app/appointments`
- `/app/appointments/calendar`
- `/app/appointments/list`
- `/app/appointments/new`
- `/app/appointments/[id]`
- `/app/appointments/[id]/edit`

**Priority:** Phase 1

---

### 4. Patients

**Purpose:**  
Manage patient identity, demographics, contact data, medical history, visit history, documents, and financial history.

**Primary users:**  
Receptionist, doctor, nurse, cashier, admin.

**Includes:**
- Patient list/search
- Patient create/edit
- Patient profile
- Visit history
- Medical record summary
- Lab/radiology history
- Invoice/payment history
- Documents
- Activity timeline

**Initial routes:**
- `/app/patients`
- `/app/patients/new`
- `/app/patients/[id]`
- `/app/patients/[id]/overview`
- `/app/patients/[id]/visits`
- `/app/patients/[id]/medical-record`
- `/app/patients/[id]/lab-results`
- `/app/patients/[id]/radiology`
- `/app/patients/[id]/invoices`
- `/app/patients/[id]/documents`
- `/app/patients/[id]/activity`
- `/app/patients/[id]/edit`

**Priority:** Phase 1

---

### 5. Visits / Encounters

**Purpose:**  
Manage the central patient encounter lifecycle from intake to clinical work, orders, billing, payment, and completion.

**Primary users:**  
Receptionist, doctor, nurse, lab operator, radiology operator, cashier, admin.

**Includes:**
- Visit list
- New visit
- Visit detail
- Workflow status tracking
- Clinical workspace
- Orders
- Lab/radiology links
- Billing summary
- Documents
- Timeline
- Next-action command flow

**Initial routes:**
- `/app/visits`
- `/app/visits/new`
- `/app/visits/[id]`
- `/app/visits/[id]/clinical`
- `/app/visits/[id]/orders`
- `/app/visits/[id]/lab`
- `/app/visits/[id]/radiology`
- `/app/visits/[id]/billing`
- `/app/visits/[id]/documents`
- `/app/visits/[id]/timeline`

**Priority:** Phase 1

---

### 6. Doctor Workspace / EMR

**Purpose:**  
Give doctors a focused workspace for patient queues, active consultations, clinical notes, orders, prescriptions, diagnosis, and review of results.

**Primary users:**  
Doctor, specialist, doctor assistant.

**Includes:**
- My queue
- Active encounters
- Lab/radiology review queue
- Completed consultations
- Doctor visit detail
- Clinical note editor
- Vitals review
- Diagnosis
- Treatment plan
- Lab/radiology/procedure orders
- Prescription
- Complete consultation flow

**Initial routes:**
- `/app/doctor`
- `/app/doctor/queue`
- `/app/doctor/active`
- `/app/doctor/reviews`
- `/app/doctor/completed`
- `/app/doctor/visits/[id]`

**Priority:** Phase 1

---

### 7. Nursing

**Purpose:**  
Manage nurse tasks, vitals, injections, procedures, doctor-assigned tasks, and bedside/room-based clinical support work.

**Primary users:**  
Nurse, head nurse, doctor assistant.

**Includes:**
- Nursing workspace
- Vitals queue
- Procedure queue
- Assigned tasks
- Task detail
- Completed nursing tasks
- Material usage for procedures

**Initial routes:**
- `/app/nursing`
- `/app/nursing/vitals`
- `/app/nursing/procedures`
- `/app/nursing/tasks`
- `/app/nursing/tasks/[id]`

**Priority:** Phase 2

---

### 8. Laboratory / LIS-lite

**Purpose:**  
Manage laboratory orders, sample collection, processing, result entry, verification, release, and doctor review.

**Primary users:**  
Lab receptionist, lab technician, lab doctor, verifier, doctor.

**Includes:**
- Lab workspace
- Orders queue
- Sample collection
- Sample labels
- Processing queue
- Result entry
- Result verification
- Released results
- Lab reports
- Equipment status

**Initial routes:**
- `/app/lab`
- `/app/lab/orders`
- `/app/lab/orders/[id]`
- `/app/lab/sample-collection`
- `/app/lab/processing`
- `/app/lab/result-entry`
- `/app/lab/results`
- `/app/lab/reports`
- `/app/lab/equipment`

**Priority:** Phase 1

---

### 9. Radiology / Diagnostics

**Purpose:**  
Manage diagnostic imaging and non-lab diagnostic services such as UZI, X-ray, CT/MRI, ECG, and report workflows.

**Primary users:**  
Radiology operator, radiologist, diagnostic doctor, doctor.

**Includes:**
- Radiology workspace
- Diagnostic order queue
- Imaging schedule
- Patient arrival
- Report editor
- Result viewer
- Device/equipment status
- Attachments/images/documents

**Initial routes:**
- `/app/radiology`
- `/app/radiology/orders`
- `/app/radiology/orders/[id]`
- `/app/radiology/schedule`
- `/app/radiology/reporting`
- `/app/radiology/results`
- `/app/radiology/devices`

**Priority:** Phase 2

---

### 10. Treatment / Procedures

**Purpose:**  
Manage treatment rooms, injections, physiotherapy, minor procedures, procedure orders, procedure completion, and material usage.

**Primary users:**  
Nurse, procedure operator, doctor, department manager.

**Includes:**
- Procedure queue
- Procedure order detail
- Procedure rooms
- Procedure schedule
- Completion note
- Material usage
- Completed procedures

**Initial routes:**
- `/app/procedures`
- `/app/procedures/orders`
- `/app/procedures/orders/[id]`
- `/app/procedures/rooms`
- `/app/procedures/schedule`
- `/app/procedures/completed`

**Priority:** Phase 2

---

### 11. Medical Documents

**Purpose:**  
Generate and manage patient-linked medical documents such as certificates, conclusions, consent forms, discharge summaries, and printable forms.

**Primary users:**  
Doctor, receptionist, admin, medical records operator.

**Includes:**
- Document templates
- Generate medical document
- Patient-linked documents
- Printable forms
- PDF export
- Document history

**Initial routes:**
- `/app/documents`
- `/app/documents/templates`
- `/app/documents/generated`
- `/app/documents/generated/[id]`

**Priority:** Phase 2

---

## B. Business / ERP Operations

These modules manage money, stock, staff, procurement, and business operations.

### 12. Cashier / Billing

**Purpose:**  
Manage invoices, invoice items, payments, refunds, debts, cashier shifts, and payment status.

**Primary users:**  
Cashier, accountant, finance manager, receptionist.

**Includes:**
- Cashier workspace
- Invoice queue
- Invoice detail
- Create/issue invoice
- Payment form
- Partial payment
- Refund flow
- Debtors list
- Shift close report
- Payment method split

**Initial routes:**
- `/app/cashier`
- `/app/cashier/invoices`
- `/app/cashier/invoices/[id]`
- `/app/cashier/payments`
- `/app/cashier/refunds`
- `/app/cashier/debts`
- `/app/cashier/shift-close`

**Priority:** Phase 1

---

### 13. Insurance / Corporate Clients

**Purpose:**  
Manage insurance companies, patient policies, claim workflows, corporate clients, contracts, and monthly corporate billing.

**Primary users:**  
Insurance coordinator, corporate account manager, cashier, finance manager.

**Includes:**
- Insurance companies
- Patient policies
- Policy verification
- Claim creation
- Claim status
- Corporate client contracts
- Corporate employee visits
- Monthly corporate billing

**Initial routes:**
- `/app/insurance`
- `/app/insurance/companies`
- `/app/insurance/policies`
- `/app/insurance/claims`
- `/app/insurance/claims/[id]`
- `/app/corporate`
- `/app/corporate/clients`
- `/app/corporate/contracts`
- `/app/corporate/employees`
- `/app/corporate/billing`

**Priority:** Phase 4

---

### 14. Pharmacy

**Purpose:**  
Manage prescriptions, medicine dispensing, pharmacy sales, stock, purchases, returns, and expiry alerts.

**Primary users:**  
Pharmacist, cashier, inventory manager, doctor.

**Includes:**
- Prescription queue
- Prescription detail
- Dispense medication
- Pharmacy sale
- Stock
- Purchases
- Returns
- Expiry alerts

**Initial routes:**
- `/app/pharmacy`
- `/app/pharmacy/prescriptions`
- `/app/pharmacy/prescriptions/[id]`
- `/app/pharmacy/dispense`
- `/app/pharmacy/sales`
- `/app/pharmacy/stock`
- `/app/pharmacy/purchases`
- `/app/pharmacy/returns`

**Priority:** Phase 3

---

### 15. Inventory / Warehouse

**Purpose:**  
Manage medical materials, medicines, lab reagents, consumables, stock batches, expiry dates, suppliers, movements, and reorder alerts.

**Primary users:**  
Warehouse operator, inventory manager, pharmacist, lab manager, finance manager.

**Includes:**
- Item catalog
- Categories
- Stock balance
- Batch/expiry tracking
- Stock movements
- Purchase orders
- Suppliers
- Write-off
- Low stock/reorder alerts

**Initial routes:**
- `/app/inventory`
- `/app/inventory/items`
- `/app/inventory/items/[id]`
- `/app/inventory/categories`
- `/app/inventory/stock`
- `/app/inventory/batches`
- `/app/inventory/movements`
- `/app/inventory/purchases`
- `/app/inventory/purchase-orders`
- `/app/inventory/suppliers`
- `/app/inventory/write-offs`
- `/app/inventory/expiry`
- `/app/inventory/reorder`

**Priority:** Phase 3

---

### 16. Procurement

**Purpose:**  
Manage purchase requests, approval workflows, vendor comparison, purchase orders, and goods receiving.

**Primary users:**  
Procurement officer, department manager, finance manager, warehouse operator.

**Includes:**
- Purchase requests
- Approval workflow
- Vendor comparison
- Purchase orders
- Goods received
- Procurement status tracking

**Initial routes:**
- `/app/procurement`
- `/app/procurement/requests`
- `/app/procurement/requests/[id]`
- `/app/procurement/purchase-orders`
- `/app/procurement/purchase-orders/[id]`
- `/app/procurement/vendors`
- `/app/procurement/approvals`

**Priority:** Phase 3

---

### 17. HR / Staff Management

**Purpose:**  
Manage staff profiles, departments, positions, shifts, attendance, leave, payroll, performance, and staff documents.

**Primary users:**  
HR manager, department manager, finance/payroll operator, admin.

**Includes:**
- Staff directory
- Staff profile
- Department/position management
- Shift planning
- Attendance
- Leave requests
- Payroll
- Performance records
- Staff documents

**Initial routes:**
- `/app/hr`
- `/app/hr/staff`
- `/app/hr/staff/[id]`
- `/app/hr/departments`
- `/app/hr/positions`
- `/app/hr/shifts`
- `/app/hr/attendance`
- `/app/hr/leave`
- `/app/hr/payroll`
- `/app/hr/performance`
- `/app/hr/documents`

**Priority:** Phase 3

---

### 18. Finance / Accounting-lite

**Purpose:**  
Track clinic revenue, expenses, cashboxes, accounts, reconciliation, taxes, and finance reports.

**Primary users:**  
Accountant, finance manager, director.

**Includes:**
- Revenue overview
- Expense tracking
- Accounts
- Cashboxes
- Reconciliation
- Tax/report exports
- Financial reports

**Initial routes:**
- `/app/finance`
- `/app/finance/revenue`
- `/app/finance/expenses`
- `/app/finance/accounts`
- `/app/finance/cashboxes`
- `/app/finance/reconciliation`
- `/app/finance/taxes`
- `/app/finance/reports`

**Priority:** Phase 3

---

### 19. Asset Management

**Purpose:**  
Manage clinic equipment, computers, medical devices, furniture, locations, maintenance, repair history, and depreciation.

**Primary users:**  
Operations manager, biomedical engineer, inventory manager, finance manager.

**Includes:**
- Asset registry
- Asset detail
- Asset location
- Maintenance schedule
- Repair history
- Depreciation
- Responsible person/department

**Initial routes:**
- `/app/assets`
- `/app/assets/items`
- `/app/assets/items/[id]`
- `/app/assets/maintenance`
- `/app/assets/maintenance/[id]`
- `/app/assets/locations`
- `/app/assets/depreciation`

**Priority:** Phase 4

---

## C. Management / Analytics

These modules support decision-making, performance monitoring, and operational control.

### 20. Reports

**Purpose:**  
Provide structured reports for operations, revenue, doctors, departments, lab, radiology, cashier, inventory, HR, and finance.

**Primary users:**  
Director, admin, operations manager, department manager, finance manager.

**Includes:**
- Daily visits
- Revenue by doctor
- Revenue by department
- Waiting time
- Lab turnaround time
- Unpaid invoices
- Cancelled visits
- Doctor workload
- Cashier shift report
- Stock consumption
- HR attendance

**Initial routes:**
- `/app/reports`
- `/app/reports/operations`
- `/app/reports/revenue`
- `/app/reports/doctors`
- `/app/reports/departments`
- `/app/reports/lab`
- `/app/reports/radiology`
- `/app/reports/cashier`
- `/app/reports/inventory`
- `/app/reports/hr`
- `/app/reports/finance`
- `/app/reports/custom`

**Priority:** Phase 4

---

### 21. Analytics / BI

**Purpose:**  
Provide interactive dashboards for trends, patient flow, service demand, bottlenecks, revenue patterns, and department performance.

**Primary users:**  
Director, operations manager, finance manager, analytics user.

**Includes:**
- Patient flow analytics
- Service demand
- Revenue trend
- Bottleneck detection
- Department performance
- Forecasting-ready dashboard structure

**Initial routes:**
- `/app/analytics`
- `/app/analytics/operations`
- `/app/analytics/revenue`
- `/app/analytics/patient-flow`
- `/app/analytics/service-demand`
- `/app/analytics/bottlenecks`

**Priority:** Phase 4

---

### 22. Quality Control / Compliance

**Purpose:**  
Manage incidents, complaints, audits, checklists, quality tasks, and corrective actions.

**Primary users:**  
Quality manager, admin, department manager, director.

**Includes:**
- Incident reports
- Patient complaints
- Internal audits
- Checklist tracking
- Corrective actions
- Quality status dashboard

**Initial routes:**
- `/app/quality`
- `/app/quality/incidents`
- `/app/quality/incidents/[id]`
- `/app/quality/audits`
- `/app/quality/checklists`
- `/app/quality/complaints`

**Priority:** Phase 4

---

## D. System / Platform

These modules define system behavior, access, settings, search, auditability, and internal platform operations.

### 23. Admin / Settings

**Purpose:**  
Configure users, roles, branches, departments, rooms, services, price lists, doctors, lab tests, radiology services, workflows, templates, notifications, integrations, and system settings.

**Primary users:**  
System admin, clinic admin, operations manager.

**Includes:**
- User management
- Role/permission management
- Branches
- Departments
- Rooms
- Service catalog
- Price list
- Doctor settings
- Lab test catalog
- Radiology service catalog
- Procedure service catalog
- Document templates
- Workflow settings
- Notification settings
- Integrations
- Audit log access

**Initial routes:**
- `/app/admin`
- `/app/admin/users`
- `/app/admin/roles`
- `/app/admin/permissions`
- `/app/admin/branches`
- `/app/admin/departments`
- `/app/admin/rooms`
- `/app/admin/services`
- `/app/admin/pricelist`
- `/app/admin/doctors`
- `/app/admin/lab-tests`
- `/app/admin/radiology-services`
- `/app/admin/procedure-services`
- `/app/admin/templates`
- `/app/admin/workflows`
- `/app/admin/notifications`
- `/app/admin/integrations`
- `/app/admin/audit-logs`

**Priority:** Phase 1 for basic settings, Phase 4 for full settings

---

### 24. Notifications / Tasks

**Purpose:**  
Manage user notifications, assigned tasks, delayed case alerts, mentions, reminders, and operational warnings.

**Primary users:**  
All authenticated users.

**Includes:**
- User notifications
- Assigned tasks
- Delayed case warnings
- Mentions/alerts
- System reminders
- Task detail

**Initial routes:**
- `/app/notifications`
- `/app/tasks`
- `/app/tasks/[id]`

**Priority:** Phase 2

---

### 25. Audit Logs

**Purpose:**  
Track user actions, patient data access, financial actions, security events, and data changes.

**Primary users:**  
System admin, compliance officer, director.

**Includes:**
- Who changed what
- Login/security events
- Patient data access logs
- Financial action logs
- Data change history
- Audit filters/export

**Initial routes:**
- `/app/audit`
- `/app/audit/logs`
- `/app/audit/security`
- `/app/audit/data-changes`

**Priority:** Phase 4, but backend audit foundations should start early

---

### 26. Global Search

**Purpose:**  
Provide fast search across patients, visits, appointments, invoices, lab orders, staff, documents, and operational records.

**Primary users:**  
All authenticated users.

**Includes:**
- Patient search
- Visit search
- Appointment search
- Invoice search
- Lab order search
- Staff search
- Document search
- Search result grouping

**Initial routes:**
- `/app/search`

**Priority:** Phase 1 basic, Phase 3 advanced

---

# Implementation Priority Summary

## Phase 1 — Core Clinical Loop

Build these first:

1. App Shell
2. Dashboard Lite
3. Reception
4. Patients
5. Appointments
6. Visits
7. Doctor Workspace
8. Laboratory
9. Cashier / Billing
10. Admin Basic Settings
11. Global Search Basic

## Phase 2 — Clinical Expansion

Build after the core loop is stable:

1. Radiology / Diagnostics
2. Nursing
3. Treatment / Procedures
4. Medical Documents
5. Notifications / Tasks

## Phase 3 — ERP Business Layer

Build after the clinical flow is usable:

1. Pharmacy
2. Inventory / Warehouse
3. Procurement
4. HR / Staff Management
5. Finance / Accounting-lite
6. Global Search Advanced

## Phase 4 — Enterprise Layer

Build when the system becomes operationally mature:

1. Reports
2. Analytics / BI
3. Insurance / Corporate Clients
4. Asset Management
5. Quality Control / Compliance
6. Audit Logs Advanced
7. Admin Full Settings

---

# Product Rule

Every module must follow the same design principle:

- Workspaces show queues, not just tables.
- Detail pages show compact identity header, sticky command bar, main workspace, right context rail, and timeline.
- Every row must show identity, context, status, next action, and primary CTA.
- Every important action must be workflow-aware.
- Mock data must use realistic API-like shapes.
- UI must be dense, fast, operator-first, and consistent.