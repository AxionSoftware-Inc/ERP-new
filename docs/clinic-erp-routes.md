# Clinic ERP / HIS Routes

## Purpose

This document defines the route structure for the clinic ERP/HIS frontend.

Routes must support a workflow-driven enterprise clinic system, not a simple CRUD application.

Each route should have:
- Clear module ownership
- Clear page purpose
- Clear page type
- Clear implementation priority

---

# Route Principles

1. All authenticated app routes live under `/app`.
2. Each major module has its own route namespace.
3. Workspace routes are role/operator-focused.
4. Detail routes use `[id]`.
5. Creation routes use `/new`.
6. Editing routes use `/edit`.
7. Operational queues should have dedicated workspace routes where needed.
8. Reports and analytics are separated from daily operational workspaces.
9. Admin settings are separated from operational modules.
10. Routes should be stable enough for backend API contracts later.

---

# Page Types

## Workspace

A role-focused operational page.

Examples:
- `/app/reception`
- `/app/doctor`
- `/app/lab`
- `/app/cashier`

## List

A searchable/filterable list page.

Examples:
- `/app/patients`
- `/app/appointments/list`
- `/app/lab/orders`

## Detail

A single entity page.

Examples:
- `/app/patients/[id]`
- `/app/visits/[id]`
- `/app/cashier/invoices/[id]`

## Create

A page or drawer flow for creating a new entity.

Examples:
- `/app/patients/new`
- `/app/appointments/new`
- `/app/visits/new`

## Edit

A page or drawer flow for editing an existing entity.

Examples:
- `/app/patients/[id]/edit`
- `/app/appointments/[id]/edit`

## Settings

Admin/configuration page.

Examples:
- `/app/admin/services`
- `/app/admin/pricelist`

## Report

Static or filterable report page.

Examples:
- `/app/reports/revenue`
- `/app/reports/doctors`

## Analytics

Interactive management dashboard.

Examples:
- `/app/analytics/operations`
- `/app/analytics/bottlenecks`

---

# Phase 1 Routes — Core Clinical Loop

## App Shell / Global

| Route | Page Type | Purpose |
|---|---|---|
| `/login` | Auth | User login |
| `/app` | Redirect | Redirect to dashboard or role workspace |
| `/app/dashboard` | Workspace | Main operational dashboard |
| `/app/search` | Workspace | Global search |
| `/app/notifications` | Workspace | User notifications |

---

## Reception

| Route | Page Type | Purpose |
|---|---|---|
| `/app/reception` | Workspace | Reception operator workspace |
| `/app/reception/intake/new` | Create | New patient or new visit intake |
| `/app/reception/queue` | Workspace | Reception queue control |
| `/app/reception/check-in` | Workspace | Appointment arrivals and check-in |
| `/app/reception/walk-ins` | Workspace | Walk-in patient flow |
| `/app/reception/patient-search` | Workspace | Fast patient lookup |

---

## Patients

| Route | Page Type | Purpose |
|---|---|---|
| `/app/patients` | List | Patient search/list |
| `/app/patients/new` | Create | Create patient |
| `/app/patients/[id]` | Detail | Patient profile default overview |
| `/app/patients/[id]/overview` | Detail | Patient overview |
| `/app/patients/[id]/visits` | List | Patient visit history |
| `/app/patients/[id]/medical-record` | Detail | Patient medical record summary |
| `/app/patients/[id]/lab-results` | List | Patient lab result history |
| `/app/patients/[id]/radiology` | List | Patient radiology result history |
| `/app/patients/[id]/invoices` | List | Patient invoice/payment history |
| `/app/patients/[id]/documents` | List | Patient documents |
| `/app/patients/[id]/activity` | List | Patient activity timeline |
| `/app/patients/[id]/edit` | Edit | Edit patient profile |

---

## Appointments

| Route | Page Type | Purpose |
|---|---|---|
| `/app/appointments` | Workspace | Scheduling overview |
| `/app/appointments/calendar` | Workspace | Calendar view |
| `/app/appointments/list` | List | Appointment list |
| `/app/appointments/new` | Create | Create appointment |
| `/app/appointments/[id]` | Detail | Appointment detail |
| `/app/appointments/[id]/edit` | Edit | Edit appointment |

---

## Visits / Encounters

| Route | Page Type | Purpose |
|---|---|---|
| `/app/visits` | List | Visit list and filters |
| `/app/visits/new` | Create | Create new visit |
| `/app/visits/[id]` | Detail | Visit detail default workspace |
| `/app/visits/[id]/clinical` | Detail | Clinical section |
| `/app/visits/[id]/orders` | Detail | Orders section |
| `/app/visits/[id]/lab` | Detail | Linked lab orders/results |
| `/app/visits/[id]/radiology` | Detail | Linked radiology orders/results |
| `/app/visits/[id]/billing` | Detail | Billing summary |
| `/app/visits/[id]/documents` | Detail | Visit documents |
| `/app/visits/[id]/timeline` | Detail | Visit timeline |

---

## Doctor Workspace

| Route | Page Type | Purpose |
|---|---|---|
| `/app/doctor` | Workspace | Doctor main workspace |
| `/app/doctor/queue` | Workspace | Doctor waiting queue |
| `/app/doctor/active` | Workspace | Active consultations |
| `/app/doctor/reviews` | Workspace | Lab/radiology review queue |
| `/app/doctor/completed` | List | Completed consultations |
| `/app/doctor/visits/[id]` | Detail | Doctor visit detail |

---

## Laboratory

| Route | Page Type | Purpose |
|---|---|---|
| `/app/lab` | Workspace | Lab main workspace |
| `/app/lab/orders` | List | Lab orders list |
| `/app/lab/orders/[id]` | Detail | Lab order detail |
| `/app/lab/sample-collection` | Workspace | Sample collection queue |
| `/app/lab/processing` | Workspace | Processing queue |
| `/app/lab/result-entry` | Workspace | Result entry queue |
| `/app/lab/results` | List | Lab results |
| `/app/lab/reports` | Report | Lab reports |
| `/app/lab/equipment` | List | Lab equipment status |

---

## Cashier / Billing

| Route | Page Type | Purpose |
|---|---|---|
| `/app/cashier` | Workspace | Cashier main workspace |
| `/app/cashier/invoices` | List | Invoice list |
| `/app/cashier/invoices/[id]` | Detail | Invoice detail and payment |
| `/app/cashier/payments` | List | Payment list |
| `/app/cashier/refunds` | Workspace | Refund flow |
| `/app/cashier/debts` | List | Debtors |
| `/app/cashier/shift-close` | Workspace | Close cashier shift |

---

## Admin Basic Settings

| Route | Page Type | Purpose |
|---|---|---|
| `/app/admin` | Workspace | Admin settings overview |
| `/app/admin/users` | Settings | User management |
| `/app/admin/roles` | Settings | Role management |
| `/app/admin/permissions` | Settings | Permission management |
| `/app/admin/branches` | Settings | Branch management |
| `/app/admin/departments` | Settings | Department management |
| `/app/admin/rooms` | Settings | Room management |
| `/app/admin/services` | Settings | Service catalog |
| `/app/admin/pricelist` | Settings | Price list |
| `/app/admin/doctors` | Settings | Doctor settings |
| `/app/admin/lab-tests` | Settings | Lab test catalog |
| `/app/admin/workflows` | Settings | Workflow settings |

---

# Phase 2 Routes — Clinical Expansion

## Nursing

| Route | Page Type | Purpose |
|---|---|---|
| `/app/nursing` | Workspace | Nursing main workspace |
| `/app/nursing/vitals` | Workspace | Vitals queue |
| `/app/nursing/procedures` | Workspace | Nursing procedure queue |
| `/app/nursing/tasks` | List | Nursing tasks |
| `/app/nursing/tasks/[id]` | Detail | Nursing task detail |

---

## Radiology / Diagnostics

| Route | Page Type | Purpose |
|---|---|---|
| `/app/radiology` | Workspace | Radiology main workspace |
| `/app/radiology/orders` | List | Radiology order list |
| `/app/radiology/orders/[id]` | Detail | Radiology order detail |
| `/app/radiology/schedule` | Workspace | Imaging schedule |
| `/app/radiology/reporting` | Workspace | Reporting queue |
| `/app/radiology/results` | List | Radiology results |
| `/app/radiology/devices` | List | Radiology devices |

---

## Treatment / Procedures

| Route | Page Type | Purpose |
|---|---|---|
| `/app/procedures` | Workspace | Procedures workspace |
| `/app/procedures/orders` | List | Procedure orders |
| `/app/procedures/orders/[id]` | Detail | Procedure order detail |
| `/app/procedures/rooms` | List | Procedure rooms |
| `/app/procedures/schedule` | Workspace | Procedure schedule |
| `/app/procedures/completed` | List | Completed procedures |

---

## Medical Documents

| Route | Page Type | Purpose |
|---|---|---|
| `/app/documents` | Workspace | Medical documents workspace |
| `/app/documents/templates` | Settings | Document templates |
| `/app/documents/generated` | List | Generated documents |
| `/app/documents/generated/[id]` | Detail | Generated document detail |

---

## Notifications / Tasks

| Route | Page Type | Purpose |
|---|---|---|
| `/app/tasks` | List | User tasks |
| `/app/tasks/[id]` | Detail | Task detail |

---

# Phase 3 Routes — ERP Business Layer

## Pharmacy

| Route | Page Type | Purpose |
|---|---|---|
| `/app/pharmacy` | Workspace | Pharmacy workspace |
| `/app/pharmacy/prescriptions` | List | Prescription queue/list |
| `/app/pharmacy/prescriptions/[id]` | Detail | Prescription detail |
| `/app/pharmacy/dispense` | Workspace | Dispense medication |
| `/app/pharmacy/sales` | Workspace | Pharmacy sales |
| `/app/pharmacy/stock` | List | Pharmacy stock |
| `/app/pharmacy/purchases` | List | Pharmacy purchases |
| `/app/pharmacy/returns` | Workspace | Pharmacy returns |

---

## Inventory / Warehouse

| Route | Page Type | Purpose |
|---|---|---|
| `/app/inventory` | Workspace | Inventory dashboard |
| `/app/inventory/items` | List | Inventory item catalog |
| `/app/inventory/items/[id]` | Detail | Inventory item detail |
| `/app/inventory/categories` | Settings | Inventory categories |
| `/app/inventory/stock` | List | Stock balances |
| `/app/inventory/batches` | List | Stock batches and expiry |
| `/app/inventory/movements` | List | Stock movement log |
| `/app/inventory/purchases` | List | Inventory purchases |
| `/app/inventory/purchase-orders` | List | Purchase orders |
| `/app/inventory/suppliers` | List | Suppliers |
| `/app/inventory/write-offs` | Workspace | Stock write-off flow |
| `/app/inventory/expiry` | List | Expiring stock |
| `/app/inventory/reorder` | Workspace | Reorder suggestions |

---

## Procurement

| Route | Page Type | Purpose |
|---|---|---|
| `/app/procurement` | Workspace | Procurement workspace |
| `/app/procurement/requests` | List | Purchase requests |
| `/app/procurement/requests/[id]` | Detail | Purchase request detail |
| `/app/procurement/purchase-orders` | List | Purchase orders |
| `/app/procurement/purchase-orders/[id]` | Detail | Purchase order detail |
| `/app/procurement/vendors` | List | Vendors |
| `/app/procurement/approvals` | Workspace | Procurement approvals |

---

## HR / Staff

| Route | Page Type | Purpose |
|---|---|---|
| `/app/hr` | Workspace | HR dashboard |
| `/app/hr/staff` | List | Staff directory |
| `/app/hr/staff/[id]` | Detail | Staff profile |
| `/app/hr/departments` | Settings | HR departments |
| `/app/hr/positions` | Settings | Positions |
| `/app/hr/shifts` | Workspace | Shift planning |
| `/app/hr/attendance` | List | Attendance |
| `/app/hr/leave` | Workspace | Leave requests |
| `/app/hr/payroll` | Workspace | Payroll |
| `/app/hr/performance` | List | Performance records |
| `/app/hr/documents` | List | Staff documents |

---

## Finance / Accounting-lite

| Route | Page Type | Purpose |
|---|---|---|
| `/app/finance` | Workspace | Finance overview |
| `/app/finance/revenue` | Report | Revenue |
| `/app/finance/expenses` | List | Expenses |
| `/app/finance/accounts` | Settings | Accounts |
| `/app/finance/cashboxes` | Settings | Cashboxes |
| `/app/finance/reconciliation` | Workspace | Reconciliation |
| `/app/finance/taxes` | Report | Taxes |
| `/app/finance/reports` | Report | Finance reports |

---

# Phase 4 Routes — Enterprise Layer

## Reports

| Route | Page Type | Purpose |
|---|---|---|
| `/app/reports` | Workspace | Reports overview |
| `/app/reports/operations` | Report | Operational reports |
| `/app/reports/revenue` | Report | Revenue reports |
| `/app/reports/doctors` | Report | Doctor reports |
| `/app/reports/departments` | Report | Department reports |
| `/app/reports/lab` | Report | Lab reports |
| `/app/reports/radiology` | Report | Radiology reports |
| `/app/reports/cashier` | Report | Cashier reports |
| `/app/reports/inventory` | Report | Inventory reports |
| `/app/reports/hr` | Report | HR reports |
| `/app/reports/finance` | Report | Finance reports |
| `/app/reports/custom` | Report | Custom report builder |

---

## Analytics / BI

| Route | Page Type | Purpose |
|---|---|---|
| `/app/analytics` | Analytics | Analytics overview |
| `/app/analytics/operations` | Analytics | Operations analytics |
| `/app/analytics/revenue` | Analytics | Revenue analytics |
| `/app/analytics/patient-flow` | Analytics | Patient flow analytics |
| `/app/analytics/service-demand` | Analytics | Service demand analytics |
| `/app/analytics/bottlenecks` | Analytics | Bottleneck analytics |

---

## Insurance / Corporate Clients

| Route | Page Type | Purpose |
|---|---|---|
| `/app/insurance` | Workspace | Insurance workspace |
| `/app/insurance/companies` | List | Insurance companies |
| `/app/insurance/policies` | List | Patient policies |
| `/app/insurance/claims` | List | Claims |
| `/app/insurance/claims/[id]` | Detail | Claim detail |
| `/app/corporate` | Workspace | Corporate clients workspace |
| `/app/corporate/clients` | List | Corporate clients |
| `/app/corporate/contracts` | List | Corporate contracts |
| `/app/corporate/employees` | List | Corporate employees |
| `/app/corporate/billing` | Workspace | Corporate billing |

---

## Asset Management

| Route | Page Type | Purpose |
|---|---|---|
| `/app/assets` | Workspace | Asset management workspace |
| `/app/assets/items` | List | Asset registry |
| `/app/assets/items/[id]` | Detail | Asset detail |
| `/app/assets/maintenance` | List | Maintenance list |
| `/app/assets/maintenance/[id]` | Detail | Maintenance detail |
| `/app/assets/locations` | List | Asset locations |
| `/app/assets/depreciation` | Report | Depreciation |

---

## Quality Control / Compliance

| Route | Page Type | Purpose |
|---|---|---|
| `/app/quality` | Workspace | Quality workspace |
| `/app/quality/incidents` | List | Incidents |
| `/app/quality/incidents/[id]` | Detail | Incident detail |
| `/app/quality/audits` | List | Internal audits |
| `/app/quality/checklists` | List | Checklists |
| `/app/quality/complaints` | List | Patient complaints |

---

## Audit

| Route | Page Type | Purpose |
|---|---|---|
| `/app/audit` | Workspace | Audit overview |
| `/app/audit/logs` | List | General audit logs |
| `/app/audit/security` | List | Security events |
| `/app/audit/data-changes` | List | Data change logs |

---

## Admin Full Settings

| Route | Page Type | Purpose |
|---|---|---|
| `/app/admin/radiology-services` | Settings | Radiology service catalog |
| `/app/admin/procedure-services` | Settings | Procedure service catalog |
| `/app/admin/templates` | Settings | Document templates |
| `/app/admin/notifications` | Settings | Notification settings |
| `/app/admin/integrations` | Settings | Integrations |
| `/app/admin/audit-logs` | Settings | Admin audit log access |

---

# Route Implementation Rule

Do not generate all routes at once unless explicitly requested.

Implement routes phase by phase:

1. First create app shell and Phase 1 route placeholders.
2. Then implement shared UI grammar.
3. Then implement Phase 1 modules one by one.
4. Phase 2+ routes should remain documented until needed.