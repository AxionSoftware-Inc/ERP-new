1. Modules list
2. Roles list
3. Route map
4. Workspace UI grammar
5. Detail page grammar
6. Workflow statuses
7. Shared components
8. Mock data contracts
9. Codex task sequence


To‘liq modul ro‘yxati

Quyida 500+ ishchili o‘rtacha-katta klinika uchun to‘liq ERP module map.

Men ularni 4 darajaga ajrataman:

A. Core Clinical Operations
B. Business / ERP Operations
C. Management / Analytics
D. System / Platform
A. Core Clinical Operations

Bular klinikaning kundalik ish oqimi. Birinchi navbatda shular ishlashi kerak.

1. Dashboard / Command Center

Maqsad: rahbariyat va admin bugungi holatni ko‘radi.

Routes:

/app/dashboard
/app/dashboard/operations
/app/dashboard/revenue
/app/dashboard/clinical
/app/dashboard/staff

Kerakli ekranlar:

- Today overview
- Patient flow
- Revenue overview
- Department load
- Delayed cases
- Operational alerts
2. Reception / Registry

Maqsad: bemorni qabul qilish, ro‘yxatdan o‘tkazish, doctor’ga yo‘naltirish.

Routes:

/app/reception
/app/reception/intake/new
/app/reception/queue
/app/reception/check-in
/app/reception/walk-ins
/app/reception/patient-search

Kerakli ekranlar:

- Reception workspace
- New patient intake
- Existing patient search
- Walk-in registration
- Appointment check-in
- Doctor assignment
- Visit queue control
3. Appointments / Scheduling

Maqsad: doctor jadvali, qabul vaqti, booking, no-show/cancel.

Routes:

/app/appointments
/app/appointments/calendar
/app/appointments/list
/app/appointments/new
/app/appointments/[id]
/app/appointments/[id]/edit

Kerakli ekranlar:

- Calendar view
- Doctor schedule view
- Appointment list
- New appointment form
- Appointment detail
- Reschedule/cancel flow
4. Patients / CRM-lite

Maqsad: bemorning asosiy profili, tarix, hujjatlar, qarzdorlik, tashriflar.

Routes:

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

Kerakli ekranlar:

- Patient list/search
- Patient create
- Patient profile
- Visit history
- Medical record
- Lab/radiology history
- Invoice/payment history
- Documents
- Activity timeline
5. Visits / Encounters

Maqsad: real tashrifni boshqarish. ERP yuragi.

Routes:

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

Kerakli ekranlar:

- Visit list
- New visit
- Visit detail
- Clinical workspace
- Orders
- Lab/radiology linked results
- Billing summary
- Documents
- Timeline
6. Doctor Workspace / EMR

Maqsad: doctor o‘z navbati, aktiv konsultatsiya, natija review va consultation closure.

Routes:

/app/doctor
/app/doctor/queue
/app/doctor/active
/app/doctor/reviews
/app/doctor/completed
/app/doctor/visits/[id]

Kerakli ekranlar:

- My queue
- Active encounters
- Lab/radiology review queue
- Completed consultations
- Doctor visit detail
- Clinical note editor
- Diagnosis
- Treatment plan
- Orders
- Prescription
7. Nursing

Maqsad: hamshira vazifalari: vital signs, injection, procedure, doctor tasklari.

Routes:

/app/nursing
/app/nursing/vitals
/app/nursing/procedures
/app/nursing/tasks
/app/nursing/tasks/[id]

Kerakli ekranlar:

- Nursing workspace
- Vitals queue
- Procedure queue
- Task detail
- Completed nursing tasks
8. Laboratory / LIS-lite

Maqsad: lab order, sample, processing, result, verification.

Routes:

/app/lab
/app/lab/orders
/app/lab/orders/[id]
/app/lab/sample-collection
/app/lab/processing
/app/lab/result-entry
/app/lab/results
/app/lab/reports
/app/lab/equipment

Kerakli ekranlar:

- Lab workspace
- Orders queue
- Sample collection
- Processing queue
- Result entry
- Result verification
- Lab reports
- Equipment status
9. Radiology / Diagnostics

Maqsad: UZI, X-ray, MRT/KT, ECG va boshqa diagnostika order/report flow.

Routes:

/app/radiology
/app/radiology/orders
/app/radiology/orders/[id]
/app/radiology/schedule
/app/radiology/reporting
/app/radiology/results
/app/radiology/devices

Kerakli ekranlar:

- Radiology workspace
- Diagnostic order queue
- Imaging schedule
- Report editor
- Result viewer
- Device/equipment status
10. Treatment / Procedures

Bu modul alohida bo‘lishi mumkin, ayniqsa klinikada fizioterapiya, muolaja, injection, minor surgery bo‘lsa.

Routes:

/app/procedures
/app/procedures/orders
/app/procedures/orders/[id]
/app/procedures/rooms
/app/procedures/schedule
/app/procedures/completed

Kerakli ekranlar:

- Procedure queue
- Procedure rooms
- Assigned procedures
- Completion note
- Material usage
11. Medical Documents

Maqsad: spravka, xulosa, forma, shartnoma, rozilik blankalari.

Routes:

/app/documents
/app/documents/templates
/app/documents/generated
/app/documents/generated/[id]

Kerakli ekranlar:

- Document templates
- Generate medical document
- Patient-linked documents
- Print/export PDF
B. Business / ERP Operations

Bular klinikaning pul, tovar, xodim va operatsion biznes qismi.

12. Cashier / Billing

Maqsad: invoice, payment, refund, qarzdorlik, smena yopish.

Routes:

/app/cashier
/app/cashier/invoices
/app/cashier/invoices/[id]
/app/cashier/payments
/app/cashier/refunds
/app/cashier/debts
/app/cashier/shift-close

Kerakli ekranlar:

- Cashier workspace
- Invoice queue
- Invoice detail
- Payment form
- Refund flow
- Debtors list
- Shift close report
13. Insurance / Corporate Clients

Agar klinika sug‘urta yoki korporativ mijozlar bilan ishlasa, kerak bo‘ladi.

Routes:

/app/insurance
/app/insurance/companies
/app/insurance/policies
/app/insurance/claims
/app/insurance/claims/[id]
/app/corporate
/app/corporate/clients
/app/corporate/contracts
/app/corporate/employees
/app/corporate/billing

Kerakli ekranlar:

- Insurance companies
- Policy verification
- Claim creation
- Claim status
- Corporate client contracts
- Corporate employee visits
- Monthly corporate billing
14. Pharmacy

Agar ichki dorixona bo‘lsa.

Routes:

/app/pharmacy
/app/pharmacy/prescriptions
/app/pharmacy/prescriptions/[id]
/app/pharmacy/dispense
/app/pharmacy/sales
/app/pharmacy/stock
/app/pharmacy/purchases
/app/pharmacy/returns

Kerakli ekranlar:

- Prescription queue
- Dispense medication
- Pharmacy sale
- Stock
- Purchases
- Returns
- Expiry alerts
15. Inventory / Warehouse

Maqsad: dori, reagent, material, blank, tibbiy consumables.

Routes:

/app/inventory
/app/inventory/items
/app/inventory/items/[id]
/app/inventory/categories
/app/inventory/stock
/app/inventory/batches
/app/inventory/movements
/app/inventory/purchases
/app/inventory/purchase-orders
/app/inventory/suppliers
/app/inventory/write-offs
/app/inventory/expiry
/app/inventory/reorder

Kerakli ekranlar:

- Item catalog
- Stock balance
- Batch/expiry tracking
- Stock movement
- Purchase orders
- Suppliers
- Write-off
- Low stock/reorder
16. Procurement

Inventory ichida ham bo‘lishi mumkin, lekin katta klinikada alohida ajratish yaxshi.

Routes:

/app/procurement
/app/procurement/requests
/app/procurement/requests/[id]
/app/procurement/purchase-orders
/app/procurement/purchase-orders/[id]
/app/procurement/vendors
/app/procurement/approvals

Kerakli ekranlar:

- Purchase request
- Approval workflow
- Vendor comparison
- Purchase order
- Goods received
17. HR / Staff Management

Maqsad: 500+ xodim uchun xodimlar, lavozim, smena, attendance, payroll.

Routes:

/app/hr
/app/hr/staff
/app/hr/staff/[id]
/app/hr/departments
/app/hr/positions
/app/hr/shifts
/app/hr/attendance
/app/hr/leave
/app/hr/payroll
/app/hr/performance
/app/hr/documents

Kerakli ekranlar:

- Staff directory
- Staff profile
- Department/position management
- Shift planning
- Attendance
- Leave requests
- Payroll
- Staff documents
18. Finance / Accounting-lite

Maqsad: revenue, expenses, cashboxes, reconciliation, accounts.

Routes:

/app/finance
/app/finance/revenue
/app/finance/expenses
/app/finance/accounts
/app/finance/cashboxes
/app/finance/reconciliation
/app/finance/taxes
/app/finance/reports

Kerakli ekranlar:

- Revenue overview
- Expense tracking
- Account/cashbox management
- Reconciliation
- Tax/report exports
19. Asset Management

Katta klinikada qimmat uskunalar ko‘p: UZI, analizator, kompyuter, printer, mebel, tibbiy qurilma.

Routes:

/app/assets
/app/assets/items
/app/assets/items/[id]
/app/assets/maintenance
/app/assets/maintenance/[id]
/app/assets/locations
/app/assets/depreciation

Kerakli ekranlar:

- Asset registry
- Asset location
- Maintenance schedule
- Repair history
- Depreciation
C. Management / Analytics
20. Reports

Routes:

/app/reports
/app/reports/operations
/app/reports/revenue
/app/reports/doctors
/app/reports/departments
/app/reports/lab
/app/reports/radiology
/app/reports/cashier
/app/reports/inventory
/app/reports/hr
/app/reports/finance
/app/reports/custom

Kerakli reportlar:

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
21. Analytics / BI

Reports’dan farqi: bu interaktiv dashboard.

Routes:

/app/analytics
/app/analytics/operations
/app/analytics/revenue
/app/analytics/patient-flow
/app/analytics/service-demand
/app/analytics/bottlenecks

Kerakli ekranlar:

- Patient flow analytics
- Service demand
- Revenue trend
- Bottleneck detection
- Department performance
22. Quality Control / Compliance

Katta klinikada nazorat kerak.

Routes:

/app/quality
/app/quality/incidents
/app/quality/incidents/[id]
/app/quality/audits
/app/quality/checklists
/app/quality/complaints

Kerakli ekranlar:

- Incident reports
- Internal audits
- Checklist tracking
- Patient complaints
- Corrective actions
D. System / Platform
23. Admin / Settings

Routes:

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
/app/admin/radiology-services
/app/admin/procedure-services
/app/admin/templates
/app/admin/workflows
/app/admin/notifications
/app/admin/integrations
/app/admin/audit-logs

Kerakli ekranlar:

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
- Document templates
- Workflow settings
- Integrations
- Audit logs
24. Notifications / Tasks

Routes:

/app/notifications
/app/tasks
/app/tasks/[id]

Kerakli ekranlar:

- User notifications
- Assigned tasks
- Mentions/alerts
- Delayed case warnings
25. Audit Logs

Admin ichida ham bo‘ladi, lekin katta klinikada alohida ham kerak.

Routes:

/app/audit
/app/audit/logs
/app/audit/security
/app/audit/data-changes

Kerakli ekranlar:

- Who changed what
- Login/security events
- Patient data access logs
- Financial action logs
26. Search

Global search juda muhim.

Routes:

/app/search

Qidiradi:

- Patients
- Visits
- Appointments
- Invoices
- Lab orders
- Staff
- Documents
Modul prioriteti

Hammasini birdan qilmaymiz. Tartib shunday bo‘lsin.

Phase 1 — Core clinical loop
1. App shell
2. Dashboard lite
3. Reception
4. Patients
5. Appointments
6. Visits
7. Doctor workspace
8. Lab
9. Cashier
10. Admin basic settings
Phase 2 — Clinical expansion
11. Radiology
12. Nursing
13. Procedures
14. Medical documents
15. Prescriptions
Phase 3 — ERP business layer
16. Pharmacy
17. Inventory
18. Procurement
19. HR
20. Finance
Phase 4 — Enterprise layer
21. Reports
22. Analytics
23. Insurance / Corporate clients
24. Asset management
25. Quality control
26. Audit/security