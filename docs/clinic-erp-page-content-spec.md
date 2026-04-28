# Klinika ERP sahifalar kontent spetsifikatsiyasi

Ushbu hujjat har bir modul sahifasida aynan qanday ma'lumotlar, bloklar, jadval ustunlari, filterlar, actionlar va bog'langan ko'rinishlar bo'lishi kerakligini belgilaydi. Keyingi bosqichda sahifalar shu hujjat asosida ko'tariladi.

Bu hujjat:
- UI dizaynni piksel darajasida belgilamaydi.
- Database migration yozmaydi.
- API endpoint yozmaydi.
- Har bir sahifaning funksional tarkibini aniq belgilaydi.

Asosiy tayanch fayllar:
- `docs/clinic-erp-modules.md`
- `docs/clinic-erp-pages.md`
- `docs/clinic-erp-data-models.md`
- `app/_data/fakeClinicData.ts`

## 1. Umumiy sahifa standarti

Har bir ichki ERP sahifada quyidagi umumiy qismlar bo'lishi kerak:

- Sahifa nomi.
- Qisqa izoh.
- Asosiy action tugmasi, agar sahifa operatsion bo'lsa.
- KPI yoki status kartalari, agar sahifa monitoring yoki ro'yxat sahifa bo'lsa.
- Qidiruv maydoni.
- Filterlar.
- Asosiy jadval, forma yoki tafsilot bloklari.
- Pagination yoki ro'yxat limitlari.
- Bo'sh holat ko'rinishi.
- Loading holati.
- Xatolik holati.
- Ruxsat bo'lmasa yopiq action holati.

## 2. Jadval sahifalari uchun umumiy talablar

Jadval sahifalarda quyidagilar bo'lishi kerak:

- Global qidiruv.
- Status filter.
- Sana oralig'i filter.
- Mas'ul xodim filter, kerak bo'lsa.
- Filial filter, filial moduli yoqilgan bo'lsa.
- Jadval ustunlari.
- Satrdagi tezkor actionlar.
- Tafsilotga o'tish.
- Export action, faqat ruxsatli rollar uchun.

Standart actionlar:
- Ko'rish.
- Yaratish.
- Tahrirlash.
- Bekor qilish.
- Chop etish.
- Export.

Implementation holati:
- Ro'yxat va detail sahifalarda actionlar umumiy drawer patterni orqali ochiladi.
- Har bir muhim actionda izoh, sabab, summa, sana yoki target maydonlari kerak bo'lsa ko'rsatiladi.
- Asosiy operatsion ro'yxatlarda drawer submitlari fake state update qiladi.
- Detail sahifalarda action drawer hozircha demo tasdiqlash holatini ko'rsatadi.
- Keyingi bosqichda drawer submitlari detail state va keyin API workflowga ulanadi.

## 3. Forma sahifalari uchun umumiy talablar

Forma sahifalarda quyidagilar bo'lishi kerak:

- Asosiy ma'lumot bloki.
- Bog'langan entity tanlash.
- Majburiy maydonlar belgisi.
- Validatsiya xabarlari.
- Saqlash actioni.
- Bekor qilish actioni.
- Draft holati, agar jarayon uzun bo'lsa.
- Audit uchun sabab maydoni, agar muhim o'zgarish bo'lsa.

## 4. Tafsilot sahifalari uchun umumiy talablar

Tafsilot sahifalarda quyidagilar bo'lishi kerak:

- Entity umumiy ma'lumoti.
- Status badge.
- Bog'langan yozuvlar.
- Timeline yoki tarix.
- Ruxsatli actionlar.
- Audit izlari, kerak bo'lsa.
- Chop etish yoki hujjat yaratish actionlari.

## 5. Dashboard sahifalari

### 5.1. `/dashboard` - Bosh panel

Kerakli data:
- `dashboardMetrics`
- `appointments`
- `payments`
- `paymentInvoices`
- `queueTickets`
- `labOrders`
- `diagnosticOrders`

Header:
- Sahifa nomi: `Bosh panel`.
- Izoh: klinikaning bugungi operatsion va moliyaviy holati.
- Sana: bugungi kun.
- Filial tanlash.

KPI kartalar:
- Bugungi bemorlar soni.
- Aktiv navbat soni.
- Bugungi tushum.
- Umumiy qarzdorlik.
- Laboratoriyada kutayotgan orderlar.
- Diagnostikada kutayotgan orderlar.
- Hisoblangan summa.
- Undirilgan summa.
- Collection rate.
- Chegirma summasi.
- O'rtacha chek.
- Ochiq qarz invoice soni.

Asosiy bloklar:
- Bugungi qabul oqimi.
- Kassa holati.
- Laboratoriya holati.
- Diagnostika holati.
- Kechikkan jarayonlar.
- Rahbariyat ogohlantirishlari.
- Xizmatlar bo'yicha tushum.
- Qarzdorlik nazorati.
- Bo'lim yuklamasi.
- To'lov mix: naqd/karta ulushi.

Jadval ustunlari:
- Jarayon.
- Bemor.
- Bo'lim.
- Status.
- Mas'ul.
- Vaqt.

Actionlar:
- Registraturaga o'tish.
- Kassa qarzdorliklariga o'tish.
- Laboratoriya orderlariga o'tish.
- Diagnostika orderlariga o'tish.

### 5.2. `/dashboard/operations` - Operatsion monitoring

Kerakli data:
- `queueTickets`
- `appointments`
- `departments`
- `staffMembers`

KPI kartalar:
- Registraturada kutayotganlar.
- Kassada kutayotganlar.
- Shifokorda kutayotganlar.
- Laboratoriyada kutayotganlar.
- Diagnostikada kutayotganlar.

Jadval ustunlari:
- Navbat raqami.
- Bemor.
- Hozirgi bosqich.
- Bo'lim.
- Prioritet.
- Status.
- Kutish vaqti.

Filterlar:
- Bo'lim.
- Status.
- Prioritet.
- Shifokor yoki mas'ul.

Actionlar:
- Bemorni chaqirish.
- Keyingi bosqichga o'tkazish.
- Hold qilish.
- Bekor qilish.

## 6. Registratura sahifalari

### 6.1. `/reception` - Registratura bosh sahifasi

Kerakli data:
- `appointments`
- `patients`
- `doctorProfiles`
- `services`
- `queueTickets`
- `paymentInvoices`
- `callRequests`

KPI kartalar:
- Bugungi qabullar.
- Kelgan bemorlar.
- Kutayotgan bemorlar.
- Kelmagan bemorlar.
- Bekor qilingan qabullar.
- To'lov kutayotgan bemorlar.
- Shifokor kutayotgan bemorlar.
- Telefon follow-up soni.

Asosiy bloklar:
- Tez bemor qidirish.
- Tez bemor yaratish drawer.
- Bugungi qabul ro'yxati.
- Yangi qabul yaratish tugmasi.
- Telefon orqali yozilganlar.
- Navbat holati.
- To'lov kutayotganlar.
- Shifokorga yuboriladiganlar.
- Kechikkan qabul va no-show nazorati.

Qidiruv:
- Bemor F.I.Sh.
- Telefon.
- Karta raqami.
- Qabul raqami.

Tez bemor qidirish natijasida ko'rinishi kerak:
- Bemor F.I.Sh.
- Telefon.
- Karta raqami.
- Oxirgi qabul sanasi.
- Qarzdorlik bor yoki yo'q.
- Qabulga yozish actioni.
- Bemor kartasini ochish actioni.

Jadval ustunlari:
- Qabul raqami.
- Vaqt.
- Bemor.
- Telefon.
- Shifokor.
- Xizmat.
- To'lov holati.
- Navbat raqami.
- Status.
- Manba.
- Action.

Actionlar:
- Bemor kelganini belgilash.
- Qabulni o'zgartirish.
- Bekor qilish.
- Kassa yo'naltirish.
- Shifokorga yo'naltirish.
- No-show qilish.
- Qayta yozish.
- Qo'ng'iroq qilish.
- Tafsilotga o'tish.

Status workflow:
- `SCHEDULED` -> `ARRIVED`
- `ARRIVED` -> `WAITING_PAYMENT`
- `WAITING_PAYMENT` -> `WAITING_DOCTOR`
- `WAITING_DOCTOR` -> `IN_PROGRESS`
- `IN_PROGRESS` -> `COMPLETED`
- Istalgan aktiv status -> `CANCELLED`, sabab talab qilinadi.
- Vaqti o'tgan kelmagan qabul -> `NO_SHOW`, sabab yoki izoh talab qilinadi.

Reception dashboardda actionlar real backend ulanmaguncha demo holatda turadi, lekin UI joylari hozirdan bo'lishi shart.

### 6.2. `/reception/schedule` - Qabul jadvali

Kerakli data:
- `appointments`
- `doctorProfiles`
- `staffMembers`
- `services`

Ko'rinishlar:
- Kunlik jadval.
- Haftalik jadval.
- Shifokor bo'yicha jadval.
- Xona bo'yicha jadval.

Jadval/kalendar ma'lumotlari:
- Vaqt sloti.
- Shifokor.
- Xona.
- Bemor.
- Xizmat.
- Status.
- Bo'sh yoki band holat.
- Slot davomiyligi.
- To'lov oldindan talab qilinadimi.

Filterlar:
- Sana.
- Shifokor.
- Xizmat.
- Status.
- Xona.

Actionlar:
- Bo'sh slotga qabul yaratish.
- Qabul vaqtini o'zgartirish.
- Qabulni bekor qilish.
- Bemor kartasiga o'tish.

Slot tekshiruvi:
- Shifokor jadvalida bo'lmagan vaqt tanlansa ogohlantirish.
- Band slotlar alohida rangda ko'rsatiladi.
- Bo'sh slotlardan qabul yaratish mumkin.
- Bir slotda overlapping qabul bo'lmasligi kerak.
- Shoshilinch qabul alohida prioritet bilan belgilanishi mumkin.

### 6.3. `/reception/appointments/new` - Yangi qabul

Kerakli data:
- `patients`
- `doctorProfiles`
- `services`
- `appointments`

Forma bloklari:
- Bemor tanlash yoki yangi bemor yaratish.
- Tez bemor yaratish drawer/modal.
- Shifokor tanlash.
- Xizmat tanlash.
- Sana va vaqt tanlash.
- Bo'sh slotlar paneli.
- Qabul turi.
- Qabul manbasi.
- Sabab yoki izoh.
- To'lov qoidasi preview.
- Navbat qaysi bo'limdan boshlanishi.

Majburiy maydonlar:
- Bemor.
- Shifokor.
- Xizmat.
- Sana.
- Vaqt.

Validatsiyalar:
- Tanlangan vaqt band bo'lmasligi kerak.
- Shifokor jadvalida bo'lishi kerak.
- Xizmat aktiv bo'lishi kerak.
- Telefon orqali yozilgan bo'lsa callback yoki manba belgilanadi.
- Bemor qarzdor bo'lsa ogohlantirish chiqadi.

Actionlar:
- Saqlash.
- Saqlash va to'lovga yuborish.
- Saqlash va shifokorga yuborish, agar to'lov sharti talab qilinmasa.
- Saqlash va qabul ro'yxatiga qaytish.
- Bekor qilish.

### 6.4. `/reception/appointments` - Qabullar ro'yxati

Kerakli data:
- `appointments`
- `patients`
- `doctorProfiles`
- `services`
- `paymentInvoices`
- `queueTickets`

Filterlar:
- Sana oralig'i.
- Status.
- Shifokor.
- Xizmat.
- Qabul manbasi.
- Qabul turi.
- To'lov holati.
- Navbat bosqichi.

Jadval ustunlari:
- Qabul raqami.
- Sana va vaqt.
- Bemor.
- Telefon.
- Shifokor.
- Xizmat.
- Turi.
- Manba.
- To'lov holati.
- Navbat.
- Status.
- Action.

Actionlar:
- Tafsilot.
- Tahrirlash.
- Kelganini belgilash.
- To'lovga yuborish.
- Shifokorga yuborish.
- No-show qilish.
- Bekor qilish.
- Qayta yozish.

Bulk actionlar:
- Tanlangan qabullarni status bo'yicha filterlash.
- Tanlanganlarga eslatma yuborish, keyingi bosqichda.
- Export, faqat ruxsatli rollar uchun.

### 6.5. `/reception/appointments/:id` - Qabul tafsiloti

Kerakli data:
- `appointments`
- `patients`
- `doctorProfiles`
- `services`
- `paymentInvoices`
- `queueTickets`

Bloklar:
- Qabul umumiy ma'lumoti.
- Bemor qisqa kartasi.
- Shifokor va xizmat ma'lumoti.
- To'lov holati.
- Navbat holati.
- Qabul timeline.
- Workflow steps.
- Bemor ogohlantirishlari: allergiya, surunkali kasallik, qarzdorlik.
- Bog'langan invoice va payment.
- Bog'langan queue ticket.

Actionlar:
- Qabulni tahrirlash.
- Kelganini belgilash.
- Kassa yo'naltirish.
- Shifokorga yuborish.
- No-show qilish.
- Qayta yozish.
- Bekor qilish.
- Chop etish.

### 6.6. `/reception/calls` - Telefon qo'ng'iroqlari

Kerakli data:
- `callRequests`
- `patients`
- `staffMembers`

KPI kartalar:
- Bugungi qo'ng'iroqlar.
- Yangi qo'ng'iroqlar.
- Jarayondagi qo'ng'iroqlar.
- Follow-up kerak.
- Qabul yaratilgan qo'ng'iroqlar.

Jadval ustunlari:
- Vaqt.
- Qo'ng'iroq qiluvchi.
- Telefon.
- Bog'langan bemor.
- Mavzu.
- Izoh.
- Mas'ul.
- Follow-up vaqti.
- Status.
- Action.

Actionlar:
- Yangi qo'ng'iroq qo'shish.
- Qo'ng'iroqdan qabul yaratish.
- Bemor bilan bog'lash.
- Follow-up vaqtini belgilash.
- Yopish.
- Missed statusga o'tkazish.

### 6.7. `/reception/no-shows` - Kelmagan bemorlar

Kerakli data:
- `appointments`
- `patients`
- `doctorProfiles`
- `services`
- `callRequests`

KPI kartalar:
- Bugungi no-show.
- Qayta yozilganlar.
- Aloqa kutilmoqda.
- Bekor qilinganlar.

Jadval ustunlari:
- Qabul raqami.
- Sana va vaqt.
- Bemor.
- Telefon.
- Shifokor.
- Xizmat.
- Sabab.
- Oxirgi aloqa.
- Status.
- Action.

Actionlar:
- Qayta yozish.
- Qo'ng'iroq qilish.
- Sabab yozish.
- Bekor qilish.
- Bemor kartasiga o'tish.

## 7. Bemorlar sahifalari

### 7.1. `/patients` - Bemorlar ro'yxati

Kerakli data:
- `patients`
- `appointments`
- `paymentInvoices`

KPI kartalar:
- Umumiy bemorlar.
- Bugun kelgan bemorlar.
- Qarzdor bemorlar.
- Yangi bemorlar.

Qidiruv:
- F.I.Sh.
- Telefon.
- Patient number.
- Passport yoki national ID, keyingi bosqichda.

Filterlar:
- Status.
- Jins.
- Yosh oralig'i.
- Qarzdorlik bor yoki yo'q.
- Oxirgi tashrif sanasi.

Jadval ustunlari:
- Karta raqami.
- F.I.Sh.
- Telefon.
- Tug'ilgan sana.
- Jins.
- Oxirgi qabul.
- Qarzdorlik.
- Status.
- Action.

Actionlar:
- Bemor kartasini ochish.
- Qabulga yozish.
- To'lovlarni ko'rish.
- Tahrirlash.
- Arxivlash.

### 7.2. `/patients/new` - Yangi bemor

Kerakli data:
- `patients`

Forma bloklari:
- Shaxsiy ma'lumotlar.
- Aloqa ma'lumotlari.
- Manzil.
- Tibbiy asosiy ma'lumot.
- Favqulodda kontakt.
- Korporativ yoki sug'urta bog'lanishi, agar mavjud bo'lsa.

Maydonlar:
- F.I.Sh.
- Jins.
- Tug'ilgan sana.
- Telefon.
- Ikkinchi telefon.
- Manzil.
- Qon guruhi.
- Allergiyalar.
- Surunkali kasalliklar.
- Izoh.

Validatsiyalar:
- Telefon formati.
- Dublikat bemor ogohlantirishi.
- Tug'ilgan sana kelajakda bo'lmasligi.

Actionlar:
- Saqlash.
- Saqlash va qabulga yozish.
- Bekor qilish.

### 7.3. `/patients/:id` - Bemor kartasi

Kerakli data:
- `patients`
- `appointments`
- `medicalEncounters`
- `labOrders`
- `diagnosticOrders`
- `paymentInvoices`
- `medicalDocuments`
- `prescriptions`

Header:
- Bemor F.I.Sh.
- Patient number.
- Yosh.
- Telefon.
- Status.
- Qarzdorlik badge.

Bloklar:
- Asosiy ma'lumotlar.
- Tez actionlar.
- Oxirgi qabullar.
- Tibbiy tarix qisqa ko'rinishi.
- Laboratoriya natijalari.
- Diagnostika xulosalari.
- To'lovlar.
- Hujjatlar.
- Retseptlar.
- Ichki eslatmalar.

Actionlar:
- Qabulga yozish.
- To'lov yaratish.
- Hujjat yaratish.
- Ma'lumotlarni tahrirlash.
- Tibbiy tarixga o'tish.

### 7.4. `/patients/:id/medical-history` - Bemor tibbiy tarixi

Kerakli data:
- `medicalEncounters`
- `labOrders`
- `labResults`
- `diagnosticOrders`
- `diagnosticResults`
- `prescriptions`
- `medicalDocuments`

Timeline elementlari:
- Shifokor qabuli.
- Tashxis.
- Laboratoriya orderi va natijasi.
- Diagnostika orderi va xulosasi.
- Retsept.
- Hujjat.

Filterlar:
- Sana oralig'i.
- Shifokor.
- Tibbiy yozuv turi.
- Status.

Jadval/timeline maydonlari:
- Sana.
- Turi.
- Shifokor yoki bo'lim.
- Tashxis/xulosa.
- Status.
- Hujjat.

Actionlar:
- Tafsilot ochish.
- Hujjatni ko'rish.
- Chop etish.

### 7.5. `/patients/:id/payments` - Bemor to'lovlari

Kerakli data:
- `paymentInvoices`
- `paymentInvoiceItems`
- `payments`
- `services`

KPI:
- Umumiy hisoblangan summa.
- To'langan summa.
- Qarzdorlik.
- Qaytarimlar.

Jadval ustunlari:
- Invoice raqami.
- Sana.
- Xizmatlar soni.
- Umumiy summa.
- To'langan.
- Qarzdorlik.
- Status.
- Action.

Actionlar:
- To'lov qilish.
- Chek ko'rish.
- Qaytarim.
- Invoice tafsiloti.

## 8. Shifokor sahifalari

### 8.1. `/doctor` - Shifokor ish stoli

Kerakli data:
- `appointments`
- `patients`
- `doctorProfiles`
- `medicalEncounters`

KPI:
- Bugungi qabullar.
- Kutayotgan bemorlar.
- Qabulda.
- Yakunlangan.
- Takroriy qabullar.

Jadval ustunlari:
- Vaqt.
- Bemor.
- Yosh.
- Qabul turi.
- Sabab.
- To'lov holati.
- Status.
- Action.

Actionlar:
- Qabulni boshlash.
- Qabulni davom ettirish.
- Bemor tarixini ko'rish.
- Laboratoriyaga yo'naltirish.
- Diagnostikaga yo'naltirish.

### 8.2. `/doctor/appointments/:id` - Qabul oynasi

Kerakli data:
- `appointments`
- `patients`
- `medicalEncounters`
- `labOrders`
- `diagnosticOrders`
- `prescriptions`

Header:
- Bemor F.I.Sh.
- Yosh.
- Allergiya badge.
- Surunkali kasallik badge.
- Qabul statusi.

Forma bloklari:
- Shikoyatlar.
- Anamnez.
- Obyektiv ko'rik.
- Vital belgilar.
- Dastlabki tashxis.
- Yakuniy tashxis.
- ICD kod.
- Davolash rejasi.
- Tavsiyalar.
- Takroriy qabul sanasi.

Yon panel:
- Bemor qisqa tarixi.
- Oxirgi laboratoriya natijalari.
- Oxirgi diagnostika natijalari.
- Oldingi retseptlar.

Actionlar:
- Draft saqlash.
- Laboratoriya order yaratish.
- Diagnostika order yaratish.
- Retsept yozish.
- Hujjat yaratish.
- Qabulni yakunlash.
- Qabulni lock qilish.

### 8.3. `/doctor/appointments/:id/finish` - Qabul yakunlash

Kerakli data:
- `medicalEncounters`
- `prescriptions`
- `labOrders`
- `diagnosticOrders`
- `medicalDocuments`

Ko'rsatiladigan bloklar:
- Yakuniy tashxis.
- Tavsiyalar.
- Retseptlar.
- Yaratilgan orderlar.
- Takroriy qabul.
- Hujjatlar.

Actionlar:
- Yakunlash.
- Yakunlash va hujjat chop etish.
- Orqaga qaytish.

## 9. Laboratoriya sahifalari

### 9.1. `/laboratory` - Laboratoriya bosh sahifasi

Kerakli data:
- `labOrders`
- `labTests`
- `patients`

KPI:
- Kutilayotgan orderlar.
- Namuna olingan.
- Jarayonda.
- Tasdiq kutmoqda.
- Tasdiqlangan.

Jadval ustunlari:
- Order raqami.
- Bemor.
- Tahlillar.
- Prioritet.
- Status.
- Buyurtma vaqti.
- Namuna vaqti.
- Action.

Actionlar:
- Namuna olindi.
- Natija kiritish.
- Tafsilot.

### 9.2. `/laboratory/orders`

Filterlar:
- Sana oralig'i.
- Status.
- Tahlil turi.
- Shifokor.
- Prioritet.

Jadval ustunlari:
- Order raqami.
- Bemor.
- Shifokor.
- Tahlil soni.
- Status.
- To'lov holati.
- Buyurtma vaqti.
- Action.

Actionlar:
- Tafsilot.
- Namuna belgilash.
- Natija kiritish.
- Bekor qilish.

### 9.3. `/laboratory/orders/:id/results`

Kerakli data:
- `labOrders`
- `labTests`
- `labResults`
- `patients`

Forma bloklari:
- Order va bemor ma'lumoti.
- Har bir test uchun natija maydoni.
- Unit.
- Reference range.
- Abnormal belgisi.
- Izoh.

Actionlar:
- Draft saqlash.
- Tasdiqlashga yuborish.
- Natijani chop etish.

### 9.4. `/laboratory/results/approval`

Jadval ustunlari:
- Order raqami.
- Bemor.
- Tahlil.
- Natija.
- Norma.
- Kiritgan xodim.
- Status.
- Action.

Actionlar:
- Tasdiqlash.
- Qayta ishlashga qaytarish.
- Izoh yozish.

## 10. Diagnostika sahifalari

### 10.1. `/diagnostics`

Kerakli data:
- `diagnosticOrders`
- `diagnosticServices`
- `diagnosticResults`
- `patients`

KPI:
- Rejalashtirilgan.
- To'lov kutmoqda.
- Jarayonda.
- Xulosa tayyor.
- Tasdiqlangan.

Jadval ustunlari:
- Order raqami.
- Bemor.
- Tekshiruv.
- Mutaxassis.
- Vaqt.
- Status.
- Action.

Actionlar:
- Tekshiruvni boshlash.
- Xulosa kiritish.
- Natijani ko'rish.

### 10.2. `/diagnostics/schedule`

Ko'rsatiladigan ma'lumotlar:
- Uskuna.
- Xona.
- Mutaxassis.
- Vaqt sloti.
- Bemor.
- Status.

Filterlar:
- Sana.
- Uskuna.
- Mutaxassis.
- Tekshiruv turi.

Actionlar:
- Slot band qilish.
- Vaqtni o'zgartirish.
- Bekor qilish.

### 10.3. `/diagnostics/orders/:id/conclusion`

Forma bloklari:
- Bemor va order ma'lumoti.
- Tekshiruv parametrlari.
- Findings.
- Conclusion.
- Fayl yoki rasm biriktirish.
- Tasdiqlash bloki.

Actionlar:
- Draft saqlash.
- Tasdiqlash.
- Shifokorga yuborish.
- Chop etish.

## 11. Kassa sahifalari

### 11.1. `/cashier` - Kassa bosh sahifasi

Kerakli data:
- `paymentInvoices`
- `payments`
- `patients`
- `services`
- `queueTickets`

KPI:
- Bugungi tushum.
- Naqd tushum.
- Karta tushum.
- Qarzdorlik.
- To'lov kutayotgan bemorlar.
- Hisoblangan summa.
- Undirilgan summa.
- Collection rate.
- Chegirma summasi.
- O'rtacha invoice.
- Qarzdor invoice navbati.

Jadval ustunlari:
- Bemor.
- Invoice.
- Xizmatlar.
- Summa.
- To'langan.
- Qarzdorlik.
- Status.
- Action.

Actionlar:
- To'lov qabul qilish.
- Invoice tafsiloti.
- Chegirma.
- Qaytarim.
- Chek chiqarish.

### 11.2. `/cashier/payments/new`

Forma bloklari:
- Bemor tanlash.
- Ochiq invoice tanlash yoki yangi hisob yaratish.
- Xizmatlar ro'yxati.
- Chegirma.
- To'lov usuli.
- To'lov summasi.
- Izoh.

Validatsiya:
- To'lov summasi manfiy bo'lmasligi.
- To'lov invoice summasidan oshsa ogohlantirish.
- Chegirma ruxsat talab qilishi mumkin.

Actionlar:
- To'lovni saqlash.
- Chek chiqarish.
- Saqlash va navbatga o'tkazish.

### 11.3. `/cashier/payments`

Filterlar:
- Sana oralig'i.
- Kassir.
- To'lov usuli.
- Status.
- Bemor.

Jadval ustunlari:
- Payment raqami.
- Bemor.
- Invoice.
- Summa.
- Usul.
- Kassir.
- Vaqt.
- Status.
- Action.

Actionlar:
- Chek ko'rish.
- Qaytarim.
- Bekor qilish, agar ruxsat bo'lsa.

### 11.4. `/cashier/debts`

Jadval ustunlari:
- Bemor yoki tashkilot.
- Telefon.
- Invoice.
- Umumiy summa.
- To'langan.
- Qarzdorlik.
- Muddati.
- Status.
- Action.

Actionlar:
- Qarzni yopish.
- Eslatma yuborish.
- Invoice tafsiloti.

### 11.5. `/cashier/closing`

Kerakli data:
- `payments`
- `paymentInvoices`

Bloklar:
- Smena ochilish balansi.
- Naqd tizim bo'yicha.
- Naqd real.
- Karta tushumi.
- Bank o'tkazmasi.
- Qaytarimlar.
- Farq.
- Izoh.

Actionlar:
- Kassani yopish.
- Rahbar tasdig'iga yuborish.
- Farq sababini yozish.

## 12. Xizmatlar sahifalari

### 12.1. `/services`

Kerakli data:
- `services`
- `serviceCategories`
- `departments`

KPI:
- Aktiv xizmatlar.
- Laboratoriya xizmatlari.
- Diagnostika xizmatlari.
- To'lovdan oldin bajariladigan xizmatlar.

Filterlar:
- Kategoriya.
- Bo'lim.
- Service type.
- Status.
- Narx oralig'i.

Jadval ustunlari:
- Kod.
- Nomi.
- Kategoriya.
- Bo'lim.
- Turi.
- Narx.
- Oldindan to'lov.
- Status.
- Action.

Actionlar:
- Yangi xizmat.
- Tahrirlash.
- Narx tarixini ko'rish.
- Nofaol qilish.

### 12.2. `/services/new`

Forma bloklari:
- Asosiy ma'lumot.
- Kategoriya va bo'lim.
- Narx.
- Davomiylik.
- To'lov qoidasi.
- Status.

Maydonlar:
- Kod.
- Nomi.
- Service type.
- Kategoriya.
- Bo'lim.
- Base price.
- Currency.
- Requires prepayment.
- Duration.

Actionlar:
- Saqlash.
- Saqlash va yana qo'shish.
- Bekor qilish.

### 12.3. `/services/price-history`

Jadval ustunlari:
- Xizmat.
- Eski narx.
- Yangi narx.
- O'zgartirgan.
- Sabab.
- Sana.

Actionlar:
- Tafsilot.
- Export.

## 13. Tibbiy hujjatlar sahifalari

### 13.1. `/documents`

Kerakli data:
- `medicalDocuments`
- `patients`
- `medicalEncounters`

Filterlar:
- Hujjat turi.
- Bemor.
- Sana.
- Status.
- Yaratgan xodim.

Jadval ustunlari:
- Hujjat raqami.
- Turi.
- Bemor.
- Sarlavha.
- Yaratgan.
- Imzolangan vaqt.
- Status.
- Action.

Actionlar:
- Ko'rish.
- Chop etish.
- PDF qilish.
- Bekor qilish.

### 13.2. `/documents/templates`

Jadval ustunlari:
- Shablon nomi.
- Hujjat turi.
- Status.
- Oxirgi o'zgarish.
- Action.

Actionlar:
- Yangi shablon.
- Tahrirlash.
- Preview.
- Nofaol qilish.

### 13.3. `/documents/certificates/new`

Forma bloklari:
- Bemor tanlash.
- Hujjat turi.
- Shablon tanlash.
- Matn.
- Imzolovchi.

Actionlar:
- Draft saqlash.
- Imzolash.
- Chop etish.

## 14. Retsept sahifalari

### 14.1. `/prescriptions`

Kerakli data:
- `prescriptions`
- `patients`
- `doctorProfiles`

Jadval ustunlari:
- Retsept raqami.
- Bemor.
- Shifokor.
- Dori soni.
- Berilgan sana.
- Status.
- Action.

Actionlar:
- Ko'rish.
- Chop etish.
- Bekor qilish.

### 14.2. `/prescriptions/new`

Forma bloklari:
- Bemor.
- Qabul.
- Dori qatori.
- Doza.
- Qabul qilish tartibi.
- Davomiylik.
- Ko'rsatma.

Actionlar:
- Dori qatori qo'shish.
- Saqlash.
- Berish va chop etish.

## 15. Navbat sahifalari

### 15.1. `/queue`

Kerakli data:
- `queueTickets`
- `patients`
- `departments`
- `appointments`

KPI:
- Umumiy aktiv navbat.
- Kutayotganlar.
- Chaqirilganlar.
- Xizmatda.
- Hold qilinganlar.

Jadval ustunlari:
- Ticket raqami.
- Bemor.
- Bo'lim.
- Hozirgi bosqich.
- Prioritet.
- Status.
- Kutish vaqti.
- Action.

Actionlar:
- Chaqirish.
- Xizmatga olish.
- Keyingi bosqich.
- Hold.
- Yakunlash.

### 15.2. Modul navbatlari

Routes:
- `/queue/reception`
- `/queue/cashier`
- `/queue/doctors`
- `/queue/laboratory`
- `/queue/diagnostics`

Har birida:
- Faqat shu bo'limga tegishli ticketlar.
- Bo'lim statuslari.
- Tezkor actionlar.
- Kutish vaqti monitoringi.

## 16. Ruxsatlar sahifalari

### 16.1. `/access/users`

Kerakli data:
- `users`
- `staffMembers`
- `roles`

Jadval ustunlari:
- Username.
- Xodim.
- Bo'lim.
- Rollar.
- Status.
- Oxirgi kirish.
- Action.

Actionlar:
- Foydalanuvchi qo'shish.
- Rol berish.
- Bloklash.
- Parol reset.

### 16.2. `/access/roles`

Jadval ustunlari:
- Rol nomi.
- Kod.
- Tavsif.
- Foydalanuvchilar soni.
- Status.
- Action.

Actionlar:
- Rol qo'shish.
- Ruxsatlarni tahrirlash.
- Nofaol qilish.

### 16.3. `/access/permissions-matrix`

Ko'rinish:
- Chapda modullar.
- Tepada rollar.
- Cell ichida ruxsatlar: view, create, update, delete, approve, export.

Actionlar:
- Ruxsatni yoqish/o'chirish.
- Saqlash.
- Audit sababini yozish.

## 17. Audit sahifalari

### 17.1. `/audit`

Kerakli data:
- `auditLogs`
- `users`
- `staffMembers`

Filterlar:
- Sana oralig'i.
- Modul.
- Entity.
- Action.
- Foydalanuvchi.

Jadval ustunlari:
- Sana.
- Foydalanuvchi.
- Modul.
- Entity.
- Entity ID.
- Action.
- IP address, keyingi bosqichda.
- Action.

Actionlar:
- Tafsilot ochish.
- Old/new value ko'rish.
- Export.

### 17.2. `/audit/financial`

Ko'rsatiladigan auditlar:
- Payment.
- Refund.
- Discount.
- CashShift.
- ServicePriceHistory.

### 17.3. `/audit/medical`

Ko'rsatiladigan auditlar:
- MedicalEncounter.
- LabResult.
- DiagnosticResult.
- Prescription.
- MedicalDocument.

## 18. Sozlamalar sahifalari

### 18.1. `/settings`

Bloklar:
- Klinika ma'lumotlari.
- Filiallar.
- Ish vaqti.
- To'lov usullari.
- Qabul qoidalari.
- Hujjat sozlamalari.
- Tizim sozlamalari.

Har bir blokda:
- Nomi.
- Qisqa tavsif.
- Oxirgi o'zgarish.
- Action.

### 18.2. `/settings/clinic`

Forma maydonlari:
- Klinika nomi.
- Yuridik nomi.
- STIR.
- Telefon.
- Email.
- Manzil.
- Logo.
- Valyuta.
- Timezone.

Actionlar:
- Saqlash.
- O'zgarish sababini yozish.

### 18.3. `/settings/working-hours`

Maydonlar:
- Haftalik ish kunlari.
- Boshlanish va tugash vaqti.
- Dam olish kunlari.
- Bayram kunlari.
- Filial bo'yicha sozlash.

### 18.4. `/settings/payment-methods`

Maydonlar:
- To'lov usuli nomi.
- Kod.
- Aktiv/nofaol.
- Fiskal integratsiya kerakmi.

### 18.5. `/settings/appointment-rules`

Maydonlar:
- Default qabul davomiyligi.
- Kechikish limiti.
- No-show qoidasi.
- Bekor qilish limiti.
- Oldindan to'lov talab qilinadigan holatlar.

## 19. Hisobot sahifalari

### 19.1. `/reports`

Bloklar:
- Tushum hisoboti.
- Xizmatlar hisoboti.
- Shifokorlar hisoboti.
- Qarzdorlik hisoboti.
- Xarajatlar hisoboti.
- Foyda-zarar hisoboti.
- Kassa farqlari.

Har bir hisobot kartasida:
- Hisobot nomi.
- Qisqa tavsif.
- Oxirgi yangilanish.
- Ochish actioni.

Implementation:
- Reports overview sahifasi yaratildi.
- Tushum, xizmatlar, shifokorlar va qarzdorlik hisobotlariga o'tish kartalari bor.
- Umumiy moliyaviy KPI: hisoblangan, undirilgan, collection rate, qarzdorlik.

### 19.2. `/reports/revenue`

Kerakli data:
- `payments`
- `paymentInvoices`
- `services`

Filterlar:
- Sana oralig'i.
- Filial.
- Kassir.
- To'lov usuli.
- Xizmat.

KPI:
- Umumiy tushum.
- Naqd.
- Karta.
- Bank.
- Qaytarim.
- Hisoblangan summa.
- Collection rate.
- O'rtacha to'lov.
- Chegirma.

Jadval ustunlari:
- Sana.
- To'lov usuli.
- Kassir.
- Bemor.
- Xizmat.
- Summa.
- Status.

Implementation:
- `/reports/revenue` sahifasi yaratildi.
- Payment, invoice, payment method, summa, invoice total, debt va vaqt ustunlari bor.

### 19.3. `/reports/services`

Jadval ustunlari:
- Xizmat.
- Kategoriya.
- Soni.
- Brutto summa.
- Chegirma.
- Netto summa.
- O'rtacha narx.

Implementation:
- `/reports/services` sahifasi yaratildi.
- Xizmat, bo'lim, service type, soni, brutto, chegirma va netto ustunlari bor.

### 19.4. `/reports/doctors`

Jadval ustunlari:
- Shifokor.
- Qabul soni.
- Yakunlangan qabul.
- Xizmatlar summasi.
- Laboratoriyaga yo'llanmalar.
- Diagnostikaga yo'llanmalar.
- Foiz uchun baza.

Implementation:
- `/reports/doctors` sahifasi yaratildi.
- Shifokor, mutaxassislik, qabul soni, yakunlangan soni, completion rate, tushum bazasi va komissiya taxmini bor.

### 19.5. `/reports/debts`

Jadval ustunlari:
- Invoice.
- Total.
- To'langan.
- Qarz.
- Undirilgan foiz.
- Berilgan sana.

Implementation:
- `/reports/debts` sahifasi yaratildi.

## 20. Ombor sahifalari

MVPdan keyingi bosqich, lekin sahifa tarkibi oldindan belgilanadi.

### 20.1. `/inventory`

KPI:
- Umumiy mahsulotlar.
- Kam qoldiq.
- Muddati tugayotgan.
- Bugungi kirim.
- Bugungi chiqim.

Bloklar:
- Kam qoldiq ro'yxati.
- Muddati tugayotgan mahsulotlar.
- So'nggi stock movementlar.

Implementation:
- `/inventory` sahifasi yaratildi.
- KPI: mahsulotlar, kam qoldiq, muddati yaqin, bugungi movement.
- So'nggi stock movementlar jadvali bor.

### 20.2. `/inventory/items`

Jadval ustunlari:
- SKU.
- Nomi.
- Kategoriya.
- Birlik.
- Umumiy qoldiq.
- Minimal qoldiq.
- Status.
- Action.

Implementation:
- `/inventory/items` sahifasi yaratildi.
- SKU, nomi, kategoriya, qoldiq, minimum, expiry va status ustunlari bor.

### 20.3. `/inventory/stock-in`

Forma bloklari:
- Ombor.
- Mahsulot.
- Partiya.
- Miqdor.
- Narx.
- Yaroqlilik muddati.
- Yetkazib beruvchi.

Implementation:
- `/inventory/stock-in` sahifasi yaratildi.
- Mahsulot, miqdor, narx, partiya, expiry va mas'ul maydonlari bor.

### 20.4. `/inventory/stock-out`

Forma bloklari:
- Ombor.
- Mahsulot.
- Miqdor.
- Sarf sababi.
- Bog'langan bo'lim yoki jarayon.
- Mas'ul xodim.

Implementation:
- `/inventory/stock-out` sahifasi yaratildi.
- Mahsulot, miqdor, bo'lim, partiya, expiry, mas'ul va izoh maydonlari bor.

## 21. Xaridlar sahifalari

### 21.1. `/purchases/requests`

Jadval ustunlari:
- So'rov raqami.
- Bo'lim.
- So'ragan xodim.
- Kerakli sana.
- Status.
- Sabab.
- Action.

Implementation:
- `/purchases/requests` sahifasi yaratildi.

### 21.2. `/purchases/orders`

Jadval ustunlari:
- Buyurtma raqami.
- Yetkazib beruvchi.
- Summa.
- Buyurtma sanasi.
- Kutilgan sana.
- Qabul qilingan sana.
- Status.
- Action.

Implementation:
- `/purchases/orders` sahifasi yaratildi.

### 21.3. `/purchases/suppliers`

Jadval ustunlari:
- Nomi.
- Telefon.
- Email.
- STIR.
- Qarzdorlik.
- Status.
- Action.

Implementation:
- `/purchases/suppliers` sahifasi yaratildi.
- Yangi supplier qo'shish formasi bor.

## 22. Korporativ va sug'urta sahifalari

### 22.1. `/corporate`

Jadval ustunlari:
- Tashkilot.
- Shartnoma raqami.
- Boshlanish.
- Tugash.
- Limit.
- Qarzdorlik.
- Status.
- Action.

### 22.2. `/corporate/:id`

Bloklar:
- Shartnoma ma'lumotlari.
- Biriktirilgan bemorlar.
- Ko'rsatilgan xizmatlar.
- Hisob-kitoblar.
- Qarzdorlik.

### 22.3. `/insurance/approvals`

Jadval ustunlari:
- Sug'urta kompaniyasi.
- Bemor.
- Xizmat.
- So'ralgan summa.
- Tasdiqlangan summa.
- Status.
- Sana.
- Action.

Actionlar:
- Tasdiqlash.
- Rad etish.
- Izoh yozish.

## 23. Dorixona sahifalari

### 23.1. `/pharmacy`

KPI:
- Bugungi savdo.
- Qoldiqdagi dorilar.
- Muddati tugayotgan.
- Kam qoldiq.

### 23.2. `/pharmacy/items`

Jadval ustunlari:
- SKU.
- Dori nomi.
- Partiya.
- Qoldiq.
- Sotuv narxi.
- Yaroqlilik muddati.
- Status.

### 23.3. `/pharmacy/sales/new`

Forma bloklari:
- Bemor yoki tashqi mijoz.
- Retsept bog'lash.
- Dori tanlash.
- Miqdor.
- Narx.
- To'lov.

Actionlar:
- Savdoni saqlash.
- Chek chiqarish.

## 24. Bildirishnomalar sahifalari

### 24.1. `/notifications`

Jadval ustunlari:
- Kanal.
- Qabul qiluvchi.
- Mavzu.
- Status.
- Rejalangan vaqt.
- Yuborilgan vaqt.
- Xato.
- Action.

### 24.2. `/notifications/templates`

Jadval ustunlari:
- Shablon nomi.
- Kanal.
- Event turi.
- Status.
- Oxirgi o'zgarish.

### 24.3. `/notifications/automation`

Qoidalar:
- Qabuldan oldin eslatma.
- Natija tayyor bo'lganda xabar.
- Qarzdorlik eslatmasi.
- Takroriy qabul eslatmasi.

Har bir qoidada:
- Event.
- Delay.
- Kanal.
- Shablon.
- Aktiv/nofaol.

## 25. Integratsiyalar sahifalari

### 25.1. `/integrations`

Jadval ustunlari:
- Nomi.
- Provider.
- Turi.
- Status.
- Oxirgi sync.
- Xatolik.
- Action.

### 25.2. `/integrations/logs`

Jadval ustunlari:
- Vaqt.
- Integratsiya.
- Direction.
- Status.
- Error message.
- Action.

Actionlar:
- Payload ko'rish.
- Qayta yuborish.
- Xatolikni yopish.

## 26. Filiallar sahifalari

### 26.1. `/branches`

Jadval ustunlari:
- Kod.
- Nomi.
- Telefon.
- Manzil.
- Ish vaqti.
- Status.
- Action.

### 26.2. `/branches/:id`

Bloklar:
- Filial ma'lumotlari.
- Xodimlar.
- Bugungi qabullar.
- Kassa holati.
- Ombor holati.
- Hisobotlar.

## 27. MVP sahifalarni ko'tarish tartibi

Sahifalarni quyidagi ketma-ketlikda ko'tarish kerak:

1. `/dashboard`
2. `/reception`
3. `/reception/appointments`
4. `/reception/appointments/new`
5. `/patients`
6. `/patients/new`
7. `/patients/:id`
8. `/doctor`
9. `/doctor/appointments/:id`
10. `/cashier`
11. `/cashier/payments`
12. `/cashier/payments/new`
13. `/laboratory`
14. `/laboratory/orders`
15. `/laboratory/orders/:id/results`
16. `/diagnostics`
17. `/diagnostics/orders`
18. `/diagnostics/orders/:id/conclusion`
19. `/services`
20. `/documents`
21. `/access/users`
22. `/audit`
23. `/settings`

## 28. Fake data bilan sahifa bog'lash qoidasi

Keyingi bosqichda har bir sahifa `app/_data/fakeClinicData.ts` ichidagi data orqali ishlaydi.

Bog'lash qoidalari:
- Dashboard `dashboardMetrics`dan boshlanadi.
- Ro'yxat sahifalar tegishli arraydan foydalanadi.
- Tafsilot sahifalar URLdagi `id` orqali entity topadi.
- Bog'langan nomlar relation orqali chiqariladi, masalan `appointment.patientId` -> `patients`.
- Pul qiymatlari UI tarafda format qilinadi.
- Statuslar badge bilan chiqariladi.
- Hamma actionlar birinchi bosqichda fake handler yoki disabled holatda turadi.

## 29. Sahifa tayyor deb hisoblanishi uchun checklist

Har bir sahifa tayyor bo'lishi uchun:

- Route ochiladi.
- Sahifa nomi va izohi bor.
- Real fake data ko'rinadi.
- Jadval yoki forma sahifaga mos.
- Qidiruv yoki filter UI bor.
- Statuslar badge bilan ko'rinadi.
- Action tugmalari joyida.
- Empty state bor.
- Mobile holatda layout buzilmaydi.
- Lint va builddan o'tadi.

## 30. Hozirgi implementation holati

Quyidagi featurelar kodda boshlangan va fake data bilan ishlayapti:

- Dashboard: `/dashboard`.
- Reception: `/reception`, `/reception/schedule`, `/reception/appointments`, `/reception/appointments/new`, `/reception/appointments/:id`, `/reception/calls`, `/reception/no-shows`.
- Patients: `/patients`, `/patients/new`, `/patients/:id`, `/patients/:id/medical-history`.
- Doctor: `/doctor`, `/doctor/appointments/:id`, `/doctor/appointments/:id/finish`.
- Laboratory: `/laboratory`, `/laboratory/orders`, `/laboratory/orders/:id/results`.
- Diagnostics: `/diagnostics`, `/diagnostics/orders`, `/diagnostics/orders/:id/conclusion`.
- Cashier: `/cashier`, `/cashier/payments`, `/cashier/payments/new`, `/cashier/debts`.
- Admin/support: `/services`, `/documents`, `/access/users`, `/access/roles`, `/audit`, `/settings`.

Hozirgi navbatdagi ish:
- Invoice va settings child detail sahifalarini kengaytirish.
- Action drawerlarni entity statusiga qarab dinamik qilish.
- Detail sahifalardagi form submit state va fake interactionlarni data update simulyatsiyasiga ulash.

## 31. Qo'shilgan detail sahifalar

Quyidagi detail sahifalar fake data bilan yaratildi:

- `/laboratory/orders/:id`
- `/diagnostics/orders/:id`
- `/cashier/payments/:id`
- `/services/:id`
- `/documents/:id`
- `/access/users/:id`
- `/audit/:id`

Bu detail sahifalarda umumiy pattern:
- Header.
- Status yoki asosiy actionlar.
- `Descriptions` orqali asosiy ma'lumot.
- Bog'langan jadval yoki timeline.
- Orqaga qaytish yoki keyingi action tugmalari.

## 32. Qo'shilgan action drawer patterni

Quyidagi panellarda amallar drawer orqali ko'rsatildi:

- Reception: kelganini belgilash, to'lovga yuborish, shifokorga yuborish, qayta yozish, no-show, bekor qilish, qo'ng'iroq va no-show nazorati.
- Doctor: tibbiy tarix, laboratoriyaga yo'llash, diagnostikaga yo'llash, retsept yozish, qabulni lock qilish.
- Laboratory: namuna olindi, barcode/label, tasdiqlashga yuborish, qayta ishlash, bekor qilish.
- Diagnostics: tekshiruvni boshlash, xulosa yozish, tasdiqlash, vaqtni o'zgartirish, bekor qilish.
- Cashier: to'lov qabul qilish, chek chiqarish, chegirma, qaytarim, bekor qilish.
- Patients va Admin: tahrirlash, arxivlash, export.

Fake state update qilingan ro'yxatlar:
- `/reception`: qabul statusi, to'lov holati va navbat bosqichi.
- `/reception/appointments`: qabul statusi, to'lov holati va navbat bosqichi.
- `/doctor`: lab/diagnostics counterlari va lock statusi.
- `/laboratory`: order statuslari.
- `/diagnostics`: order va result statuslari.
- `/cashier`: invoice to'lov, chegirma, qaytarim va bekor statuslari.
- `/cashier/payments`: payment refund va cancel statuslari.

Drawer maydonlari:
- `reason`: sabab talab qilinadigan xavfli actionlar uchun.
- `comment`: oddiy izoh va audit izohi uchun.
- `target`: boshqa bo'limga yo'naltirish uchun.
- `date`: qayta yozish yoki vaqt o'zgartirish uchun.
- `amount`: to'lov, chegirma va qaytarim uchun.
