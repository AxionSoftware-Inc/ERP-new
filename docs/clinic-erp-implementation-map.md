# Klinika ERP implementation xaritasi

Ushbu hujjat hozirgacha kodda yaratilgan real sahifalar, feature papkalar, ishlatilayotgan fake data va keyingi qo'shiladigan ishlarni ko'rsatadi. Maqsad: loyiha xaritasini yuritish va nima bor, nima yetishmayotganini tez ko'rish.

## 1. Texnik qarorlar

- Framework: Next.js App Router.
- UI kutubxona: Ant Design v5.
- React 19 compatibility: `@ant-design/v5-patch-for-react-19`.
- Build: `next build --webpack`.
- Fake data: `app/_data/fakeClinicData.ts`.
- Feature structure: `app/_features/<module>`.
- Top navigation: sidebar yo'q, yuqorida role/module switcher bor.
- Module ichki navigatsiyasi: har modul o'z `Subnav` komponentiga ega bo'lishi mumkin.
- Action UI: umumiy `ActionDropdown` va `ActionButton` drawer patterni `app/_components/ActionDrawer.tsx` orqali ishlaydi.
- Action katalogi: modul bo'yicha actionlar `app/_lib/panelActions.ts` ichida jamlangan.
- Fake interaction: asosiy ro'yxat panellari action submitdan keyin lokal state orqali status, summa yoki counterlarni yangilaydi.

## 2. Feature papkalar

Hozir mavjud feature papkalar:

- `app/_features/dashboard`
- `app/_features/reception`
- `app/_features/patients`
- `app/_features/doctor`
- `app/_features/laboratory`
- `app/_features/diagnostics`
- `app/_features/cashier`
- `app/_features/reports`
- `app/_features/settings`
- `app/_features/operations`
- `app/_features/admin`

## 3. Implement qilingan asosiy routelar

### 3.1. Dashboard

- `/dashboard`

Bor:
- KPI kartalar.
- Bugungi bemorlar.
- Aktiv navbat.
- Bugungi tushum.
- Qarzdorlik.
- Moliyaviy KPI: hisoblangan summa, undirilgan summa, collection rate, chegirma, o'rtacha chek, ochiq qarz invoice soni.
- To'lov mix: naqd/karta ulushi.
- Xizmatlar bo'yicha tushum jadvali.
- Qarzdorlik nazorati jadvali.
- Bo'lim yuklamasi jadvali.
- Operatsion oqim jadvali.
- Lab, diagnostics va debt ogohlantirishlari.

Keyingi qo'shiladi:
- Period filter.
- Filial filter.
- Real chartlar.
- Rahbariyat ogohlantirishlari detail.
- P&L, xarajatlar, foyda, xodim/doctor komissiya va cash shift closing.

### 3.2. Reception

- `/reception`
- `/reception/schedule`
- `/reception/appointments`
- `/reception/appointments/new`
- `/reception/appointments/:id`
- `/reception/calls`
- `/reception/no-shows`

Bor:
- Reception command center.
- Quick patient search.
- Quick patient create drawer.
- Workflow lanes.
- Qabul jadvali.
- Qabullar jadvali.
- Yangi qabul formasi.
- Qabul detail.
- Telefon qo'ng'iroqlari.
- No-show nazorati.
- To'lov va navbat holati.
- Action drawerlar: kelgan, to'lovga yuborish, shifokorga yuborish, qayta yozish, no-show, bekor qilish.
- Qo'ng'iroqlar va no-show sahifalarida tezkor actionlar drawerga ulangan.
- `/reception` va `/reception/appointments` jadvalidagi actionlar status, payment status va navbat bosqichini lokal state orqali o'zgartiradi.

Keyingi qo'shiladi:
- Slot overlap validatsiyasi.
- Form submit state.
- Qo'ng'iroqdan qabul yaratish flow.

### 3.3. Patients

- `/patients`
- `/patients/new`
- `/patients/:id`
- `/patients/:id/medical-history`

Bor:
- Bemorlar ro'yxati.
- Yangi bemor formasi.
- Bemor karta detail.
- Tibbiy timeline.
- To'lovlar jadvali.
- Allergiya va surunkali kasallik ogohlantirishlari.
- Ro'yxat va bemor detail sahifasida tahrirlash, arxivlash va export actionlari drawer orqali ko'rsatiladi.

Keyingi qo'shiladi:
- Bemor edit.
- Patient files.
- Notes.
- Payments tab.
- Documents tab.

### 3.4. Doctor

- `/doctor`
- `/doctor/appointments/:id`
- `/doctor/appointments/:id/finish`

Bor:
- Shifokor ish stoli.
- Bugungi qabullar jadvali.
- Bemor ogohlantirishlari.
- Encounter form.
- Lab/diagnostics/retsept action joylari.
- Qabul yakunlash sahifasi.
- Tibbiy tarix, lab order, diagnostika order, retsept va lock actionlari drawer patterniga ulangan.
- `/doctor` jadvalida lab/diagnostics order counterlari va lock actioni fake state orqali yangilanadi.

Keyingi qo'shiladi:
- Vital signs.
- ICD search.
- Encounter autosave.
- Order/retsept drawerlarini real forma maydonlari bilan kengaytirish.

### 3.5. Laboratory

- `/laboratory`
- `/laboratory/orders`
- `/laboratory/orders/:id`
- `/laboratory/orders/:id/results`

Bor:
- Lab ish stoli.
- Orderlar jadvali.
- Natija kiritish sahifasi.
- Test qiymatlari.
- Abnormal flag.
- Tasdiqlashga yuborish actioni.
- Namuna olindi, barcode/label, tasdiqlashga yuborish, qayta ishlash va bekor qilish actionlari drawerga ulangan.
- `/laboratory` jadvalida sample collected, ready for approval, in progress va cancelled statuslari fake state orqali o'zgaradi.

Keyingi qo'shiladi:
- Result approval sahifasi.
- Barcode/sample label.
- Lab result document preview.

### 3.6. Diagnostics

- `/diagnostics`
- `/diagnostics/orders`
- `/diagnostics/orders/:id`
- `/diagnostics/orders/:id/conclusion`

Bor:
- Diagnostics ish stoli.
- Diagnostics orderlar jadvali.
- Xulosa kiritish sahifasi.
- Findings, conclusion va fayl joyi.
- Tekshiruvni boshlash, xulosa yozish, tasdiqlash, vaqtni o'zgartirish va bekor qilish actionlari drawerga ulangan.
- `/diagnostics` jadvalida in progress, ready, approved, scheduled va cancelled statuslari fake state orqali o'zgaradi.

Keyingi qo'shiladi:
- Schedule time-grid.
- Equipment schedule.
- Image/file upload.

### 3.7. Cashier

- `/cashier`
- `/cashier/payments`
- `/cashier/payments/:id`
- `/cashier/payments/new`
- `/cashier/debts`
- `/cashier/closing`

Bor:
- Kassa ish stoli.
- Invoice jadvali.
- To'lovlar ro'yxati.
- Yangi to'lov formasi.
- Qarzdorlik ko'rinishi.
- Tushum, naqd, karta, debt KPI.
- Collection rate dashboard.
- Hisoblangan/undirilgan/qarzdorlik nazorati.
- Chegirma va o'rtacha invoice KPI.
- Qarzdor invoice navbati.
- Kassa yopish sahifasi: kutilgan naqd, karta, jami tushum, qarzdorlik va smena yopish formasi.
- To'lov qabul qilish, chek chiqarish, chegirma, qaytarim va bekor qilish actionlari drawerga ulangan.
- `/cashier` invoice jadvalida paid, discount, refunded va cancelled holatlari fake state orqali o'zgaradi.
- `/cashier/payments` jadvalida refund va cancel actionlari payment statusini fake state orqali yangilaydi.

Keyingi qo'shiladi:
- Invoice detail.
- Refund flow.
- Discount approval.
- Receipt preview.

### 3.8. Reports

- `/reports`
- `/reports/revenue`
- `/reports/services`
- `/reports/doctors`
- `/reports/debts`

Bor:
- Reports overview.
- Tushum hisoboti: payment, invoice, method, amount, debt, time.
- Xizmatlar hisoboti: bo'lim, xizmat turi, soni, brutto, chegirma, netto.
- Shifokorlar hisoboti: qabul soni, yakunlangan qabul, completion rate, tushum bazasi, komissiya taxmini.
- Qarzdorlik hisoboti: invoice total, to'langan, qarz, undirilgan foiz.
- Reports subnav.

Keyingi qo'shiladi:
- Sana oralig'i filterlari.
- Excel/PDF export.
- Grafiklar.
- P&L va xarajatlar hisoboti.

### 3.9. Support/Admin sahifalar

- `/services`
- `/services/:id`
- `/documents`
- `/documents/:id`
- `/access/users`
- `/access/users/:id`
- `/access/roles`
- `/audit`
- `/audit/:id`
- `/settings`

Bor:
- Services katalog jadvali.
- Documents jadvali.
- Users jadvali.
- Roles jadvali.
- Audit jadvali.
- Settings overview.
- Admin/resource sahifalarida tahrirlash, arxivlash va export actionlari umumiy drawerga ulangan.

Keyingi qo'shiladi:
- Settings child sahifalar.

### 3.10. Settings

- `/settings`
- `/settings/clinic`
- `/settings/working-hours`
- `/settings/payment-methods`
- `/settings/appointment-rules`

Bor:
- Klinika yuridik va aloqa ma'lumotlari formasi.
- Ish vaqti va default slot sozlamalari.
- To'lov usullari va fiskal flaglar.
- Qabul workflow qoidalari: davomiylik, kechikish, no-show, oldindan to'lov, qarzdor bloklash.

Keyingi qo'shiladi:
- Real validation.
- Audit sababini majburiy qilish.
- Filial bo'yicha alohida sozlamalar.

### 3.11. Access

- `/access/permissions-matrix`

Bor:
- Rollar va modullar kesimida view/create/update/approve/export matritsasi.
- Switch orqali ruxsatlar UI ko'rinishi.

Keyingi qo'shiladi:
- Permission changes audit.
- Role templates.
- Server-side enforcement.

### 3.12. Patients extended

- `/patients/:id/payments`
- `/patients/:id/documents`
- `/patients/:id/notes`
- `/patients/:id/files`

Bor:
- Bemor to'lovlari.
- Bemor hujjatlari.
- Ichki eslatmalar.
- Fayllar ro'yxati va upload joyi.
- Patient subnav.

Keyingi qo'shiladi:
- Real file upload.
- Notes privacy levels.
- Payment detail linkage.

### 3.13. Inventory/Purchases

- `/inventory`
- `/inventory/items`
- `/inventory/stock-in`
- `/inventory/stock-out`
- `/purchases/requests`
- `/purchases/orders`
- `/purchases/suppliers`

Bor:
- Ombor KPI: mahsulotlar, kam qoldiq, muddati yaqin, movementlar.
- Mahsulotlar jadvali: SKU, kategoriya, qoldiq, minimum, expiry, status.
- Kirim va chiqim formalari.
- Xarid so'rovlari.
- Xarid buyurtmalari.
- Yetkazib beruvchilar jadvali va yangi supplier formasi.

Keyingi qo'shiladi:
- Batch/lot tracking.
- Cost accounting.
- Approval workflow.
- Stock valuation.

## 4. Fake data holati

Asosiy fake data fayl:

- `app/_data/fakeClinicData.ts`

Mavjud data:
- clinic
- branches
- departments
- roles
- users
- staffMembers
- doctorProfiles
- patients
- serviceCategories
- services
- appointments
- callRequests
- queueTickets
- medicalEncounters
- labTests
- labOrders
- labResults
- diagnosticServices
- diagnosticOrders
- diagnosticResults
- paymentInvoices
- paymentInvoiceItems
- payments
- medicalDocuments
- prescriptions
- auditLogs
- dashboardMetrics

Keyingi fake data kengaytirish:
- refunds
- discounts
- cashShifts
- documentTemplates
- patientNotes
- patientFiles
- inventoryItems
- suppliers
- corporateClients
- insuranceApprovals

## 5. Hozirgi MVP route xaritasi

MVPda asosiy ishlayotgan oqim:

1. `/dashboard`
2. `/reception`
3. `/patients`
4. `/doctor`
5. `/laboratory`
6. `/diagnostics`
7. `/cashier`
8. `/reports`
9. `/services`
10. `/documents`
11. `/access/users`
12. `/audit`
13. `/settings`
14. `/inventory`
15. `/purchases/requests`

## 6. Keyingi eng muhim ishlar

Priority 1:
- Action drawer formalarini entity statusiga qarab dinamik cheklash.
- Detail sahifalardagi actionlarni ham entity detail state bilan bog'lash.

Priority 2:
- Patients tabs: overview, medical history, payments, documents, notes.
- Doctor order drawerlar.
- Lab approval.
- Diagnostics equipment schedule.

Priority 3:
- Inventory, purchases, payroll, corporate, insurance, pharmacy.
- Integrations UI.
- Role permission matrix.
