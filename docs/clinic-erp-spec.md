# Clinic ERP / HIS Specification

## Product Goal

Build an enterprise-grade clinic ERP/HIS for a medium-large clinic with 500+ staff.

The system must manage the full operational lifecycle:

Patient → Appointment/Walk-in → Visit → Doctor Consultation → Orders → Lab/Radiology/Procedures → Review → Billing → Payment → Completion.

The product is workflow-driven, not CRUD-driven. Each operator workspace must show the next required action clearly.

## Development Strategy

Frontend-first, workflow-driven, mock-data based prototype.

Backend will be implemented after the frontend route structure, UI grammar, workflow statuses, and data contracts are stable.

## Module Groups

### A. Core Clinical Operations
1. Dashboard / Command Center
2. Reception / Registry
3. Appointments / Scheduling
4. Patients
5. Visits / Encounters
6. Doctor Workspace / EMR
7. Nursing
8. Laboratory
9. Radiology / Diagnostics
10. Treatment / Procedures
11. Medical Documents

### B. Business / ERP Operations
12. Cashier / Billing
13. Insurance / Corporate Clients
14. Pharmacy
15. Inventory / Warehouse
16. Procurement
17. HR / Staff Management
18. Finance / Accounting-lite
19. Asset Management

### C. Management / Analytics
20. Reports
21. Analytics / BI
22. Quality Control / Compliance

### D. System / Platform
23. Admin / Settings
24. Notifications / Tasks
25. Audit Logs
26. Global Search