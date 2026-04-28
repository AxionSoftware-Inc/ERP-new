# Klinika ERP professional data modellari

Ushbu hujjat klinika ERP tizimi uchun kerak bo'ladigan professional data modellarni belgilaydi. Bu hali Prisma, SQL yoki boshqa ORM sxemasi emas. Maqsad: keyingi bosqichda database, API va UI bir xil biznes modelga tayanishi uchun entitylar, maydonlar, aloqalar va statuslarni aniq belgilash.

## 1. Umumiy model standartlari

Har bir asosiy modelda quyidagi texnik maydonlar bo'lishi tavsiya etiladi:

- `id` - yagona identifikator.
- `createdAt` - yaratilgan vaqt.
- `updatedAt` - oxirgi o'zgargan vaqt.
- `createdById` - yozuvni yaratgan foydalanuvchi.
- `updatedById` - oxirgi o'zgartirgan foydalanuvchi.
- `deletedAt` - soft delete uchun, agar yozuv o'chirilsa.
- `status` - modelga mos biznes holat.
- `branchId` - filialli klinikada yozuv qaysi filialga tegishli ekanini bildiradi.

Asosiy qoidalar:
- Pul qiymatlari integer ko'rinishida saqlanadi, masalan tiyin yoki minimal valyuta birligi.
- Sana va vaqtlar ISO datetime formatida yuritiladi.
- Tibbiy yozuvlar va moliyaviy yozuvlar alohida modellar bo'lishi kerak.
- Muhim o'zgarishlar `AuditLog` modeliga yozilishi kerak.
- Eski to'lov, xizmat narxi yoki tibbiy xulosa keyingi o'zgarishlar sabab buzilmasligi kerak.

## 2. Tashkiliy modellar

### 2.1. Clinic

Klinikaning umumiy tashkilot ma'lumotlarini saqlaydi.

Asosiy maydonlar:
- `id`
- `name`
- `legalName`
- `taxNumber`
- `phone`
- `email`
- `address`
- `logoUrl`
- `defaultCurrency`
- `timezone`
- `status`

Aloqalar:
- `Clinic` ko'p `Branch`ga ega bo'lishi mumkin.
- `Clinic` tizim sozlamalari uchun asosiy entity hisoblanadi.

### 2.2. Branch

Klinika filiallarini saqlaydi.

Asosiy maydonlar:
- `id`
- `clinicId`
- `name`
- `code`
- `phone`
- `address`
- `workingHours`
- `status`

Aloqalar:
- `Branch` ko'p `Appointment`, `Payment`, `InventoryWarehouse`, `StaffMember` bilan bog'lanadi.

Statuslar:
- `ACTIVE`
- `INACTIVE`

### 2.3. Department

Klinika ichki bo'limlarini bildiradi: registratura, laboratoriya, diagnostika, kassa, terapiya va boshqalar.

Asosiy maydonlar:
- `id`
- `branchId`
- `name`
- `type`
- `status`

Aloqalar:
- `Department` xodimlar, xizmatlar va navbatlar bilan bog'lanadi.

## 3. Foydalanuvchi, xodim va ruxsat modellari

### 3.1. User

Tizimga kiradigan foydalanuvchi hisobini saqlaydi.

Asosiy maydonlar:
- `id`
- `staffMemberId`
- `username`
- `email`
- `phone`
- `passwordHash`
- `status`
- `lastLoginAt`
- `lockedUntil`

Aloqalar:
- `User` bitta `StaffMember` bilan bog'lanishi mumkin.
- `User` ko'p `UserRole`ga ega.
- `User` barcha auditlarda actor sifatida qatnashadi.

Statuslar:
- `ACTIVE`
- `INACTIVE`
- `LOCKED`

### 3.2. Role

Tizim rollarini saqlaydi.

Asosiy maydonlar:
- `id`
- `name`
- `code`
- `description`
- `status`

Misol rollar:
- `SUPER_ADMIN`
- `DIRECTOR`
- `REGISTRAR`
- `CASHIER`
- `DOCTOR`
- `LAB_TECHNICIAN`
- `DIAGNOSTIC_SPECIALIST`
- `ACCOUNTANT`
- `WAREHOUSE_MANAGER`

### 3.3. Permission

Ruxsat birliklarini saqlaydi.

Asosiy maydonlar:
- `id`
- `module`
- `action`
- `description`

Misol actionlar:
- `VIEW`
- `CREATE`
- `UPDATE`
- `DELETE`
- `APPROVE`
- `CANCEL`
- `EXPORT`
- `REFUND`

### 3.4. RolePermission

Rol va ruxsat o'rtasidagi bog'lovchi model.

Asosiy maydonlar:
- `id`
- `roleId`
- `permissionId`

### 3.5. UserRole

Foydalanuvchi va rol o'rtasidagi bog'lovchi model.

Asosiy maydonlar:
- `id`
- `userId`
- `roleId`
- `branchId`

### 3.6. StaffMember

Klinika xodimlari haqidagi ma'lumotlarni saqlaydi.

Asosiy maydonlar:
- `id`
- `branchId`
- `departmentId`
- `firstName`
- `lastName`
- `middleName`
- `gender`
- `birthDate`
- `phone`
- `email`
- `position`
- `specialization`
- `licenseNumber`
- `employmentType`
- `hireDate`
- `terminationDate`
- `status`

Aloqalar:
- `StaffMember` shifokor bo'lsa, `DoctorProfile`ga ega bo'ladi.
- `StaffMember` `Appointment`, `MedicalEncounter`, `Payment`, `LabOrder`, `DiagnosticOrder`larda mas'ul sifatida qatnashadi.

### 3.7. DoctorProfile

Shifokorga xos professional ma'lumotlarni saqlaydi.

Asosiy maydonlar:
- `id`
- `staffMemberId`
- `specialty`
- `category`
- `roomNumber`
- `defaultAppointmentDuration`
- `consultationFeeServiceId`
- `status`

Aloqalar:
- `DoctorProfile` ko'p `DoctorSchedule`, `Appointment`, `MedicalEncounter` bilan bog'lanadi.

### 3.8. DoctorSchedule

Shifokorning ish va qabul jadvalini saqlaydi.

Asosiy maydonlar:
- `id`
- `doctorProfileId`
- `branchId`
- `weekday`
- `startTime`
- `endTime`
- `slotDuration`
- `roomNumber`
- `status`

## 4. Bemor modellari

### 4.1. Patient

Bemorning yagona klinik kartasini saqlaydi.

Asosiy maydonlar:
- `id`
- `branchId`
- `patientNumber`
- `firstName`
- `lastName`
- `middleName`
- `gender`
- `birthDate`
- `phone`
- `secondaryPhone`
- `email`
- `address`
- `passportNumber`
- `nationalId`
- `bloodType`
- `allergies`
- `chronicDiseases`
- `emergencyContactName`
- `emergencyContactPhone`
- `corporateClientId`
- `insuranceCompanyId`
- `status`

Aloqalar:
- `Patient` ko'p `Appointment`, `Payment`, `MedicalEncounter`, `LabOrder`, `DiagnosticOrder`, `MedicalDocument`ga ega.

Statuslar:
- `ACTIVE`
- `ARCHIVED`
- `BLOCKED`

### 4.2. PatientNote

Bemor bo'yicha ichki eslatmalarni saqlaydi.

Asosiy maydonlar:
- `id`
- `patientId`
- `authorId`
- `noteType`
- `content`
- `visibility`
- `status`

### 4.3. PatientFile

Bemor kartasiga biriktirilgan fayllarni saqlaydi.

Asosiy maydonlar:
- `id`
- `patientId`
- `uploadedById`
- `fileName`
- `fileUrl`
- `fileType`
- `description`
- `status`

## 5. Registratura va qabul modellari

### 5.1. Appointment

Bemorning shifokor yoki xizmatga yozilishini bildiradi.

Asosiy maydonlar:
- `id`
- `branchId`
- `patientId`
- `doctorProfileId`
- `serviceId`
- `appointmentNumber`
- `scheduledAt`
- `durationMinutes`
- `source`
- `type`
- `status`
- `reason`
- `cancelReason`
- `checkedInAt`
- `startedAt`
- `finishedAt`

Aloqalar:
- `Appointment` bitta `Patient`, bitta `DoctorProfile`, bitta `Service` bilan bog'lanadi.
- `Appointment`dan `MedicalEncounter`, `PaymentInvoice`, `QueueTicket` yaratilishi mumkin.

Statuslar:
- `SCHEDULED`
- `CONFIRMED`
- `ARRIVED`
- `WAITING_PAYMENT`
- `WAITING_DOCTOR`
- `IN_PROGRESS`
- `COMPLETED`
- `NO_SHOW`
- `CANCELLED`

### 5.2. QueueTicket

Bemorning klinika ichidagi real vaqt harakatini boshqaradi.

Asosiy maydonlar:
- `id`
- `branchId`
- `patientId`
- `appointmentId`
- `departmentId`
- `ticketNumber`
- `currentStep`
- `priority`
- `status`
- `calledAt`
- `completedAt`

Statuslar:
- `WAITING`
- `CALLED`
- `IN_SERVICE`
- `ON_HOLD`
- `COMPLETED`
- `CANCELLED`

### 5.3. CallRequest

Telefon orqali murojaat yoki qabulga yozilish so'rovini saqlaydi.

Asosiy maydonlar:
- `id`
- `branchId`
- `patientId`
- `callerName`
- `phone`
- `topic`
- `comment`
- `assignedToId`
- `status`
- `followUpAt`

Statuslar:
- `NEW`
- `IN_PROGRESS`
- `APPOINTMENT_CREATED`
- `CLOSED`
- `MISSED`

## 6. Tibbiy qabul modellari

### 6.1. MedicalEncounter

Shifokorning bitta bemor qabuli bo'yicha tibbiy yozuvini saqlaydi.

Asosiy maydonlar:
- `id`
- `branchId`
- `patientId`
- `appointmentId`
- `doctorProfileId`
- `chiefComplaint`
- `anamnesis`
- `objectiveExam`
- `preliminaryDiagnosis`
- `finalDiagnosis`
- `icdCode`
- `treatmentPlan`
- `recommendations`
- `followUpDate`
- `status`
- `lockedAt`

Aloqalar:
- `MedicalEncounter` ko'p `Prescription`, `LabOrder`, `DiagnosticOrder`, `MedicalDocument` yaratishi mumkin.

Statuslar:
- `DRAFT`
- `IN_PROGRESS`
- `COMPLETED`
- `LOCKED`
- `CANCELLED`

### 6.2. Diagnosis

Tashxislarni strukturali saqlash uchun ishlatiladi.

Asosiy maydonlar:
- `id`
- `encounterId`
- `patientId`
- `doctorProfileId`
- `name`
- `icdCode`
- `diagnosisType`
- `confidence`
- `status`

Diagnosis type:
- `PRELIMINARY`
- `FINAL`
- `COMORBID`

### 6.3. VitalSign

Bemorning qabul paytidagi o'lchovlarini saqlaydi.

Asosiy maydonlar:
- `id`
- `encounterId`
- `patientId`
- `temperature`
- `bloodPressureSystolic`
- `bloodPressureDiastolic`
- `pulse`
- `respiratoryRate`
- `weight`
- `height`
- `oxygenSaturation`
- `measuredAt`

## 7. Laboratoriya modellari

### 7.1. LabTest

Laboratoriya tahlili katalogini saqlaydi.

Asosiy maydonlar:
- `id`
- `serviceId`
- `name`
- `code`
- `category`
- `sampleType`
- `unit`
- `referenceRange`
- `turnaroundMinutes`
- `status`

### 7.2. LabOrder

Bemor uchun buyurtma qilingan laboratoriya tahlilini saqlaydi.

Asosiy maydonlar:
- `id`
- `branchId`
- `patientId`
- `appointmentId`
- `encounterId`
- `doctorProfileId`
- `orderedById`
- `orderNumber`
- `priority`
- `status`
- `orderedAt`
- `sampleCollectedAt`
- `completedAt`

Aloqalar:
- `LabOrder` ko'p `LabOrderItem`ga ega.
- `LabOrder` `PaymentInvoiceItem` bilan bog'lanishi mumkin.

Statuslar:
- `ORDERED`
- `WAITING_PAYMENT`
- `WAITING_SAMPLE`
- `SAMPLE_COLLECTED`
- `IN_PROGRESS`
- `READY_FOR_APPROVAL`
- `APPROVED`
- `DELIVERED`
- `CANCELLED`

### 7.3. LabOrderItem

Laboratoriya order ichidagi alohida tahlilni bildiradi.

Asosiy maydonlar:
- `id`
- `labOrderId`
- `labTestId`
- `serviceId`
- `status`

### 7.4. LabResult

Laboratoriya natijalarini saqlaydi.

Asosiy maydonlar:
- `id`
- `labOrderItemId`
- `value`
- `unit`
- `referenceRange`
- `isAbnormal`
- `comment`
- `enteredById`
- `approvedById`
- `approvedAt`
- `status`

Statuslar:
- `DRAFT`
- `ENTERED`
- `APPROVED`
- `REJECTED`

## 8. Diagnostika modellari

### 8.1. DiagnosticService

Instrumental tekshiruv turlarini saqlaydi.

Asosiy maydonlar:
- `id`
- `serviceId`
- `name`
- `code`
- `category`
- `defaultDuration`
- `requiresEquipment`
- `status`

### 8.2. Equipment

Diagnostika yoki laboratoriya uskunalarini saqlaydi.

Asosiy maydonlar:
- `id`
- `branchId`
- `departmentId`
- `name`
- `serialNumber`
- `equipmentType`
- `roomNumber`
- `status`

Statuslar:
- `ACTIVE`
- `MAINTENANCE`
- `INACTIVE`

### 8.3. DiagnosticOrder

Bemor uchun instrumental tekshiruv buyurtmasini saqlaydi.

Asosiy maydonlar:
- `id`
- `branchId`
- `patientId`
- `appointmentId`
- `encounterId`
- `doctorProfileId`
- `diagnosticServiceId`
- `equipmentId`
- `scheduledAt`
- `startedAt`
- `completedAt`
- `status`
- `priority`

Statuslar:
- `ORDERED`
- `WAITING_PAYMENT`
- `SCHEDULED`
- `IN_PROGRESS`
- `READY`
- `APPROVED`
- `DELIVERED`
- `CANCELLED`

### 8.4. DiagnosticResult

Diagnostika xulosasi va fayllarini saqlaydi.

Asosiy maydonlar:
- `id`
- `diagnosticOrderId`
- `conclusion`
- `findings`
- `fileUrls`
- `enteredById`
- `approvedById`
- `approvedAt`
- `status`

## 9. Xizmatlar va narx modellari

### 9.1. ServiceCategory

Xizmat kategoriyalarini saqlaydi.

Asosiy maydonlar:
- `id`
- `name`
- `code`
- `parentId`
- `status`

### 9.2. Service

Klinika xizmatlari katalogini saqlaydi.

Asosiy maydonlar:
- `id`
- `categoryId`
- `departmentId`
- `name`
- `code`
- `serviceType`
- `basePrice`
- `currency`
- `requiresPrepayment`
- `durationMinutes`
- `status`

Service type:
- `CONSULTATION`
- `LAB_TEST`
- `DIAGNOSTIC`
- `PROCEDURE`
- `PACKAGE`
- `PHARMACY`

### 9.3. ServicePriceHistory

Xizmat narxlari o'zgarish tarixini saqlaydi.

Asosiy maydonlar:
- `id`
- `serviceId`
- `oldPrice`
- `newPrice`
- `currency`
- `changedById`
- `changedAt`
- `reason`

### 9.4. ServicePackage

Bir nechta xizmatdan iborat paketni saqlaydi.

Asosiy maydonlar:
- `id`
- `name`
- `code`
- `price`
- `status`

### 9.5. ServicePackageItem

Paket ichidagi xizmatlarni bog'laydi.

Asosiy maydonlar:
- `id`
- `packageId`
- `serviceId`
- `quantity`

## 10. Kassa va moliya modellari

### 10.1. PaymentInvoice

Bemor yoki korporativ mijoz uchun hisobni saqlaydi.

Asosiy maydonlar:
- `id`
- `branchId`
- `patientId`
- `corporateClientId`
- `insuranceCompanyId`
- `invoiceNumber`
- `subtotal`
- `discountAmount`
- `totalAmount`
- `paidAmount`
- `debtAmount`
- `currency`
- `status`
- `issuedAt`
- `dueAt`

Statuslar:
- `DRAFT`
- `ISSUED`
- `PARTIALLY_PAID`
- `PAID`
- `OVERDUE`
- `CANCELLED`
- `REFUNDED`

### 10.2. PaymentInvoiceItem

Hisob ichidagi alohida xizmat satrini saqlaydi.

Asosiy maydonlar:
- `id`
- `invoiceId`
- `serviceId`
- `appointmentId`
- `labOrderId`
- `diagnosticOrderId`
- `quantity`
- `unitPrice`
- `discountAmount`
- `totalPrice`
- `status`

### 10.3. Payment

Amalga oshirilgan to'lovni saqlaydi.

Asosiy maydonlar:
- `id`
- `branchId`
- `invoiceId`
- `patientId`
- `cashierId`
- `paymentNumber`
- `amount`
- `currency`
- `method`
- `status`
- `paidAt`
- `comment`

Payment method:
- `CASH`
- `CARD`
- `BANK_TRANSFER`
- `INSURANCE`
- `CORPORATE`
- `ONLINE`

Statuslar:
- `PENDING`
- `COMPLETED`
- `CANCELLED`
- `REFUNDED`

### 10.4. Refund

Qaytarim operatsiyasini saqlaydi.

Asosiy maydonlar:
- `id`
- `paymentId`
- `invoiceId`
- `amount`
- `reason`
- `requestedById`
- `approvedById`
- `status`
- `refundedAt`

Statuslar:
- `REQUESTED`
- `APPROVED`
- `REJECTED`
- `COMPLETED`

### 10.5. Discount

Chegirma operatsiyasini saqlaydi.

Asosiy maydonlar:
- `id`
- `invoiceId`
- `amount`
- `percent`
- `reason`
- `requestedById`
- `approvedById`
- `status`

### 10.6. CashShift

Kassir smenasi va kassa yopilishini saqlaydi.

Asosiy maydonlar:
- `id`
- `branchId`
- `cashierId`
- `openedAt`
- `closedAt`
- `openingBalance`
- `expectedCash`
- `actualCash`
- `difference`
- `status`

Statuslar:
- `OPEN`
- `CLOSED`
- `REVIEW_REQUIRED`

## 11. Tibbiy hujjat va retsept modellari

### 11.1. MedicalDocument

Tibbiy hujjatlar, xulosalar va ma'lumotnomalarni saqlaydi.

Asosiy maydonlar:
- `id`
- `branchId`
- `patientId`
- `encounterId`
- `documentType`
- `documentNumber`
- `title`
- `content`
- `fileUrl`
- `status`
- `generatedById`
- `signedById`
- `signedAt`

Document type:
- `DOCTOR_CONCLUSION`
- `LAB_RESULT`
- `DIAGNOSTIC_RESULT`
- `PRESCRIPTION`
- `CERTIFICATE`
- `REFERRAL`

### 11.2. DocumentTemplate

Hujjat shablonlarini saqlaydi.

Asosiy maydonlar:
- `id`
- `name`
- `documentType`
- `content`
- `variables`
- `status`

### 11.3. Prescription

Shifokor yozgan retseptni saqlaydi.

Asosiy maydonlar:
- `id`
- `patientId`
- `encounterId`
- `doctorProfileId`
- `prescriptionNumber`
- `status`
- `issuedAt`

### 11.4. PrescriptionItem

Retsept ichidagi dori tavsiyasini saqlaydi.

Asosiy maydonlar:
- `id`
- `prescriptionId`
- `medicineName`
- `dosage`
- `frequency`
- `duration`
- `instructions`

## 12. Ombor va dorixona modellari

### 12.1. InventoryWarehouse

Ombor yoki dorixona omborini saqlaydi.

Asosiy maydonlar:
- `id`
- `branchId`
- `name`
- `warehouseType`
- `status`

Warehouse type:
- `MAIN`
- `LAB`
- `DIAGNOSTIC`
- `PHARMACY`
- `DEPARTMENT`

### 12.2. InventoryItem

Ombordagi mahsulot, reagent, material yoki dori nomini saqlaydi.

Asosiy maydonlar:
- `id`
- `name`
- `sku`
- `category`
- `unit`
- `minStock`
- `isMedicine`
- `status`

### 12.3. InventoryBatch

Mahsulot partiyasini saqlaydi.

Asosiy maydonlar:
- `id`
- `warehouseId`
- `itemId`
- `batchNumber`
- `quantity`
- `purchasePrice`
- `expiryDate`
- `status`

### 12.4. StockMovement

Ombor kirim, chiqim va ko'chirish tarixini saqlaydi.

Asosiy maydonlar:
- `id`
- `branchId`
- `warehouseId`
- `itemId`
- `batchId`
- `movementType`
- `quantity`
- `reason`
- `relatedModel`
- `relatedId`
- `performedById`
- `performedAt`

Movement type:
- `IN`
- `OUT`
- `TRANSFER`
- `ADJUSTMENT`
- `WRITE_OFF`

### 12.5. PharmacySale

Dorixona savdosini saqlaydi.

Asosiy maydonlar:
- `id`
- `branchId`
- `patientId`
- `cashierId`
- `saleNumber`
- `totalAmount`
- `paidAmount`
- `status`
- `soldAt`

### 12.6. PharmacySaleItem

Dorixona savdosi ichidagi dori yoki mahsulot satrini saqlaydi.

Asosiy maydonlar:
- `id`
- `saleId`
- `inventoryItemId`
- `batchId`
- `quantity`
- `unitPrice`
- `totalPrice`

## 13. Xarid modellari

### 13.1. Supplier

Yetkazib beruvchilarni saqlaydi.

Asosiy maydonlar:
- `id`
- `name`
- `phone`
- `email`
- `address`
- `taxNumber`
- `status`

### 13.2. PurchaseRequest

Bo'lim yoki ombordan xarid ehtiyojini saqlaydi.

Asosiy maydonlar:
- `id`
- `branchId`
- `requestedById`
- `departmentId`
- `status`
- `reason`
- `neededBy`

### 13.3. PurchaseOrder

Yetkazib beruvchiga berilgan xarid buyurtmasini saqlaydi.

Asosiy maydonlar:
- `id`
- `branchId`
- `supplierId`
- `orderNumber`
- `totalAmount`
- `status`
- `orderedAt`
- `expectedAt`
- `receivedAt`

### 13.4. PurchaseOrderItem

Xarid buyurtmasi ichidagi mahsulot satrini saqlaydi.

Asosiy maydonlar:
- `id`
- `purchaseOrderId`
- `inventoryItemId`
- `quantity`
- `unitPrice`
- `totalPrice`

## 14. Korporativ mijoz va sug'urta modellari

### 14.1. CorporateClient

Shartnoma asosida xizmat oladigan tashkilotlarni saqlaydi.

Asosiy maydonlar:
- `id`
- `name`
- `taxNumber`
- `phone`
- `email`
- `address`
- `contractNumber`
- `contractStartDate`
- `contractEndDate`
- `creditLimit`
- `status`

### 14.2. CorporateClientPatient

Bemorni korporativ mijozga bog'laydi.

Asosiy maydonlar:
- `id`
- `corporateClientId`
- `patientId`
- `employeeNumber`
- `status`

### 14.3. InsuranceCompany

Sug'urta kompaniyalarini saqlaydi.

Asosiy maydonlar:
- `id`
- `name`
- `phone`
- `email`
- `contractNumber`
- `status`

### 14.4. InsuranceApproval

Sug'urta tasdig'i kerak bo'lgan xizmatlarni boshqaradi.

Asosiy maydonlar:
- `id`
- `insuranceCompanyId`
- `patientId`
- `serviceId`
- `requestedAmount`
- `approvedAmount`
- `status`
- `requestedAt`
- `approvedAt`

Statuslar:
- `REQUESTED`
- `APPROVED`
- `REJECTED`
- `EXPIRED`

## 15. Bildirishnoma modellari

### 15.1. NotificationTemplate

SMS, email yoki ichki xabar shablonlarini saqlaydi.

Asosiy maydonlar:
- `id`
- `name`
- `channel`
- `eventType`
- `content`
- `status`

### 15.2. Notification

Yuborilgan yoki yuborilishi kerak bo'lgan xabarni saqlaydi.

Asosiy maydonlar:
- `id`
- `templateId`
- `patientId`
- `userId`
- `channel`
- `recipient`
- `subject`
- `content`
- `status`
- `scheduledAt`
- `sentAt`
- `errorMessage`

Statuslar:
- `PENDING`
- `SENT`
- `FAILED`
- `CANCELLED`

## 16. Integratsiya modellari

### 16.1. Integration

Tashqi servis ulanishlarini saqlaydi.

Asosiy maydonlar:
- `id`
- `name`
- `provider`
- `integrationType`
- `status`
- `settings`

Integration type:
- `SMS`
- `PAYMENT`
- `EMAIL`
- `FISCAL`
- `LAB_DEVICE`
- `GOVERNMENT`

### 16.2. IntegrationLog

Tashqi servislar bilan almashuv tarixini saqlaydi.

Asosiy maydonlar:
- `id`
- `integrationId`
- `direction`
- `requestPayload`
- `responsePayload`
- `status`
- `errorMessage`
- `createdAt`

## 17. Audit va tizim modellari

### 17.1. AuditLog

Tizimdagi muhim amallar tarixini saqlaydi.

Asosiy maydonlar:
- `id`
- `actorUserId`
- `module`
- `entityName`
- `entityId`
- `action`
- `oldValue`
- `newValue`
- `ipAddress`
- `userAgent`
- `createdAt`

Auditga tushishi shart bo'lgan amallar:
- To'lov yaratish, bekor qilish, qaytarish.
- Chegirma qo'llash.
- Tibbiy yozuv yaratish, o'zgartirish, lock qilish.
- Laboratoriya yoki diagnostika natijasini tasdiqlash.
- Xizmat narxini o'zgartirish.
- Ruxsat va rol o'zgartirish.
- Bemor kartasini o'chirish yoki arxivlash.

### 17.2. SystemSetting

Tizim konfiguratsiyalarini saqlaydi.

Asosiy maydonlar:
- `id`
- `key`
- `value`
- `valueType`
- `scope`
- `branchId`
- `updatedById`

### 17.3. NumberSequence

Hujjat, qabul, to'lov, order va boshqa raqamlarni generatsiya qilish tartibini saqlaydi.

Asosiy maydonlar:
- `id`
- `branchId`
- `sequenceType`
- `prefix`
- `currentNumber`
- `padding`
- `resetPolicy`

Sequence type:
- `PATIENT`
- `APPOINTMENT`
- `INVOICE`
- `PAYMENT`
- `LAB_ORDER`
- `DIAGNOSTIC_ORDER`
- `DOCUMENT`
- `PRESCRIPTION`

## 18. Asosiy relationlar xaritasi

- `Patient` -> `Appointment` -> `MedicalEncounter`.
- `MedicalEncounter` -> `LabOrder` -> `LabResult`.
- `MedicalEncounter` -> `DiagnosticOrder` -> `DiagnosticResult`.
- `Appointment` -> `PaymentInvoice` -> `Payment`.
- `Service` -> `PaymentInvoiceItem`.
- `DoctorProfile` -> `Appointment` va `MedicalEncounter`.
- `StaffMember` -> `User` -> `UserRole` -> `Role` -> `Permission`.
- `Patient` -> `MedicalDocument`.
- `Prescription` -> `PrescriptionItem`.
- `InventoryItem` -> `InventoryBatch` -> `StockMovement`.
- `CorporateClient` yoki `InsuranceCompany` -> `PaymentInvoice`.
- Har bir muhim model -> `AuditLog`.

## 19. MVP uchun majburiy modellar

Birinchi ishlaydigan versiya uchun quyidagi modellar yetarli asos bo'ladi:

1. `Clinic`
2. `Branch`
3. `Department`
4. `User`
5. `Role`
6. `Permission`
7. `RolePermission`
8. `UserRole`
9. `StaffMember`
10. `DoctorProfile`
11. `DoctorSchedule`
12. `Patient`
13. `PatientNote`
14. `Appointment`
15. `QueueTicket`
16. `MedicalEncounter`
17. `Diagnosis`
18. `LabTest`
19. `LabOrder`
20. `LabOrderItem`
21. `LabResult`
22. `DiagnosticService`
23. `DiagnosticOrder`
24. `DiagnosticResult`
25. `ServiceCategory`
26. `Service`
27. `ServicePriceHistory`
28. `PaymentInvoice`
29. `PaymentInvoiceItem`
30. `Payment`
31. `Refund`
32. `Discount`
33. `CashShift`
34. `MedicalDocument`
35. `DocumentTemplate`
36. `Prescription`
37. `PrescriptionItem`
38. `Notification`
39. `AuditLog`
40. `SystemSetting`
41. `NumberSequence`

## 20. Keyingi bosqich modellar

Quyidagi modellar MVPdan keyin qo'shilishi mumkin:

- `InventoryWarehouse`
- `InventoryItem`
- `InventoryBatch`
- `StockMovement`
- `Supplier`
- `PurchaseRequest`
- `PurchaseOrder`
- `PurchaseOrderItem`
- `CorporateClient`
- `CorporateClientPatient`
- `InsuranceCompany`
- `InsuranceApproval`
- `PharmacySale`
- `PharmacySaleItem`
- `Integration`
- `IntegrationLog`

## 21. Model dizaynidagi muhim professional qoidalar

- Bemor ma'lumoti bitta `Patient` kartasida markazlashadi.
- Har bir qabul `Appointment` orqali boshlanadi.
- Shifokor yozuvi `MedicalEncounter`da saqlanadi va yakunlangandan keyin lock qilinadi.
- Laboratoriya va diagnostika natijalari tibbiy qabuldan alohida, lekin unga bog'langan holda yuritiladi.
- To'lovlar `PaymentInvoice` va `Payment` orqali ajratiladi: hisob va real to'lov bir model bo'lmasligi kerak.
- Xizmat narxi invoice itemga nusxa qilib saqlanadi, shunda keyingi narx o'zgarishi eski to'lovni buzmaydi.
- Kassa qaytarimi `Refund` orqali yuritiladi, payment yozuvi bevosita o'chirilmaydi.
- Rollar va ruxsatlar model darajasida audit bilan himoyalanadi.
- Har bir katta biznes jarayonda statuslar aniq bo'lishi kerak.
- Har bir tashqi integratsiya xatosi `IntegrationLog`da ko'rinishi kerak.
