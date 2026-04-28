# Klinika ERP UI va navigatsiya standarti

Ushbu hujjat klinika ERP sahifalarini kodlashdan oldin kerak bo'ladigan umumiy UI, layout, navigatsiya va rollar bo'yicha ko'rinish standartini belgilaydi. Bu hujjat dizayn tafsilotlarini haddan tashqari chuqurlashtirmaydi, lekin keyingi sahifalar bir xil uslubda chiqishi uchun yetarli asos beradi.

## 1. Umumiy UI yo'nalishi

Klinika ERP marketing sayt emas, kundalik ish uchun ishlatiladigan operatsion tizim bo'lishi kerak. Shuning uchun interfeys sokin, aniq, tez o'qiladigan va ko'p ma'lumotni tartibli ko'rsatadigan bo'lishi kerak.

Asosiy yo'nalish:
- Dashboard uslubidagi professional B2B interfeys.
- Oq yoki juda och neytral fon.
- Ma'lumotlar jadval, status, filter, tab va panel ko'rinishida beriladi.
- Katta hero bloklar, reklama matnlari va dekorativ elementlar ishlatilmaydi.
- Har bir sahifada asosiy ish tez bajarilishi kerak.
- Tibbiy, moliyaviy va admin ma'lumotlar aniq ajratiladi.

## 2. Asosiy layout

Tizim ichki sahifalarida quyidagi layout ishlatiladi:

- Chap tomonda doimiy sidebar.
- Yuqorida topbar.
- Markazda sahifa kontenti.
- Sahifa sarlavhasi va qisqa status paneli.
- Zarur joylarda filter paneli.
- Asosiy ro'yxatlar uchun jadval yoki zich ro'yxat.

Layout qismlari:

### 2.1. Sidebar

Sidebar asosiy navigatsiya uchun ishlatiladi.

Vazifalari:
- Modul guruhlarini ko'rsatish.
- Joriy sahifani aktiv holatda belgilash.
- Foydalanuvchi roli bo'yicha menyularni yashirish yoki ko'rsatish.
- Ko'p ishlatiladigan bo'limlarga tez kirish berish.

Sidebar guruhlari:
- Bosh panel.
- Registratura.
- Bemorlar.
- Shifokor.
- Laboratoriya.
- Diagnostika.
- Kassa.
- Xizmatlar.
- Hujjatlar.
- Hisobotlar.
- Ombor.
- Xaridlar.
- Xodimlar.
- Ish haqi.
- Sug'urta va korporativ.
- Dorixona.
- Navbat.
- Bildirishnomalar.
- Ruxsatlar.
- Audit.
- Sozlamalar.
- Integratsiyalar.
- Filiallar.

### 2.2. Topbar

Topbar tezkor holat va foydalanuvchi amallari uchun ishlatiladi.

Topbarda bo'lishi kerak:
- Global qidiruv.
- Bugungi sana.
- Filial tanlash, agar filial moduli yoqilgan bo'lsa.
- Bildirishnomalar belgisi.
- Foydalanuvchi profili.
- Chiqish tugmasi.

### 2.3. Kontent maydoni

Kontent maydoni sahifaning asosiy vazifasiga mos bo'lishi kerak.

Standart tarkib:
- Sahifa sarlavhasi.
- Sahifa izohi yoki kontekst.
- Asosiy action tugmasi.
- Statistika yoki status kartalari, kerak bo'lsa.
- Filterlar.
- Jadval, forma yoki tafsilot paneli.

## 3. Sahifa turlari

ERPda sahifalar quyidagi asosiy turlarga bo'linadi:

### 3.1. Ro'yxat sahifasi

Vazifasi:
- Ma'lumotlar ro'yxatini ko'rsatish.
- Qidirish va filterlash.
- Status bo'yicha ajratish.
- Tafsilot sahifasiga o'tish.

Misollar:
- Bemorlar ro'yxati.
- Qabullar ro'yxati.
- To'lovlar ro'yxati.
- Laboratoriya buyurtmalari.

### 3.2. Yaratish sahifasi

Vazifasi:
- Yangi yozuv yaratish.
- Kerakli ma'lumotlarni forma orqali olish.
- Saqlashdan oldin xatolarni ko'rsatish.

Misollar:
- Yangi bemor.
- Yangi qabul.
- Yangi to'lov.
- Yangi xizmat.

### 3.3. Tafsilot sahifasi

Vazifasi:
- Bitta yozuvning to'liq ma'lumotini ko'rsatish.
- Bog'langan tarixlarni ko'rsatish.
- Ruxsat bo'lsa o'zgartirish amallarini berish.

Misollar:
- Bemor kartasi.
- Qabul tafsiloti.
- To'lov tafsiloti.
- Xizmat tafsiloti.

### 3.4. Ish stoli sahifasi

Vazifasi:
- Rol uchun kundalik ish oqimini ko'rsatish.
- Navbat, tezkor action va bugungi holatni jamlash.

Misollar:
- Registratura bosh sahifasi.
- Shifokor ish stoli.
- Kassa bosh sahifasi.
- Laboratoriya bosh sahifasi.

### 3.5. Hisobot sahifasi

Vazifasi:
- Ma'lumotlarni davr, bo'lim, xodim va status bo'yicha tahlil qilish.
- Grafikdan ko'ra aniq raqam, jadval va export imkoniyatiga urg'u berish.

### 3.6. Sozlama sahifasi

Vazifasi:
- Tizim konfiguratsiyalarini boshqarish.
- Faqat yuqori ruxsatli foydalanuvchilar uchun ochiq bo'lish.

## 4. Role-based navigatsiya

Har bir foydalanuvchi faqat o'z ishiga kerakli menyularni ko'rishi kerak. Bu xavfsizlik va ergonomika uchun majburiy.

### 4.1. Super admin

Ko'radigan bo'limlar:
- Barcha bo'limlar.
- Ruxsatlar.
- Audit.
- Sozlamalar.
- Integratsiyalar.

### 4.2. Rahbar

Ko'radigan bo'limlar:
- Bosh panel.
- Registratura.
- Bemorlar.
- Kassa.
- Hisobotlar.
- Xodimlar.
- Ombor.
- Xaridlar.
- Ish haqi.
- Auditning cheklangan ko'rinishi.

Cheklov:
- Tibbiy yozuvlarni faqat ruxsat berilgan darajada ko'radi.

### 4.3. Registrator

Ko'radigan bo'limlar:
- Registratura.
- Bemorlar.
- Qabul jadvali.
- Navbat.
- Bildirishnomalar.

Cheklov:
- Moliyaviy hisobotlarni ko'rmaydi.
- Shifokor tibbiy yozuvlarini o'zgartirmaydi.

### 4.4. Kassir

Ko'radigan bo'limlar:
- Kassa.
- Bemorlar bo'yicha to'lov ko'rinishi.
- Qarzdorliklar.
- Kassa yopilishi.

Cheklov:
- Tibbiy bayonnomalarni ko'rmaydi yoki o'zgartirmaydi.
- Xizmat narxini faqat ruxsat bo'lsa o'zgartiradi.

### 4.5. Shifokor

Ko'radigan bo'limlar:
- Shifokor ish stoli.
- Bemor tibbiy tarixi.
- Laboratoriya natijalari.
- Diagnostika natijalari.
- Retseptlar.
- Tibbiy hujjatlar.

Cheklov:
- Kassa operatsiyalarini bajarmaydi.
- Umumiy moliyaviy hisobotlarni ko'rmaydi.

### 4.6. Laboratoriya xodimi

Ko'radigan bo'limlar:
- Laboratoriya.
- Laboratoriya buyurtmalari.
- Natija kiritish.
- Laboratoriya natijalari arxivi.

Cheklov:
- Shifokor tashxisini o'zgartirmaydi.
- Kassa ma'lumotlarini boshqarmaydi.

### 4.7. Diagnostika mutaxassisi

Ko'radigan bo'limlar:
- Diagnostika.
- Diagnostika jadvali.
- Diagnostika xulosalari.
- Uskunalar bandligi.

Cheklov:
- Shifokor tashxisini o'zgartirmaydi.
- Moliyaviy hisobotlarni ko'rmaydi.

### 4.8. Omborchi

Ko'radigan bo'limlar:
- Ombor.
- Kirimlar.
- Chiqimlar.
- Inventarizatsiya.
- Kam qoldiq va muddati tugayotgan mahsulotlar.

Cheklov:
- Bemor tibbiy ma'lumotlarini ko'rmaydi.
- Kassa operatsiyalarini bajarmaydi.

### 4.9. Buxgalter

Ko'radigan bo'limlar:
- Kassa.
- Moliyaviy hisobotlar.
- Xaridlar.
- Ish haqi.
- Korporativ hisob-kitoblar.

Cheklov:
- Tibbiy yozuvlarni o'zgartirmaydi.

## 5. MVP sahifalar scope

Birinchi ishlaydigan versiyada quyidagi sahifalar ishlab chiqiladi:

1. `/login` - kirish.
2. `/dashboard` - bosh panel.
3. `/reception` - registratura bosh sahifasi.
4. `/reception/schedule` - qabul jadvali.
5. `/reception/appointments/new` - yangi qabul.
6. `/reception/appointments` - qabullar ro'yxati.
7. `/patients` - bemorlar ro'yxati.
8. `/patients/new` - yangi bemor.
9. `/patients/:id` - bemor kartasi.
10. `/patients/:id/medical-history` - bemor tibbiy tarixi.
11. `/doctor` - shifokor ish stoli.
12. `/doctor/appointments/:id` - shifokor qabul oynasi.
13. `/laboratory` - laboratoriya bosh sahifasi.
14. `/laboratory/orders` - laboratoriya buyurtmalari.
15. `/laboratory/orders/:id/results` - laboratoriya natijasi.
16. `/diagnostics` - diagnostika bosh sahifasi.
17. `/diagnostics/orders` - diagnostika buyurtmalari.
18. `/diagnostics/orders/:id/conclusion` - diagnostika xulosasi.
19. `/cashier` - kassa bosh sahifasi.
20. `/cashier/payments/new` - to'lov yaratish.
21. `/cashier/payments` - to'lovlar ro'yxati.
22. `/cashier/debts` - qarzdorliklar.
23. `/services` - xizmatlar ro'yxati.
24. `/services/new` - yangi xizmat.
25. `/documents` - tibbiy hujjatlar.
26. `/documents/templates` - hujjat shablonlari.
27. `/access/users` - foydalanuvchilar.
28. `/access/roles` - rollar.
29. `/access/permissions-matrix` - ruxsatlar matritsasi.
30. `/audit` - audit.
31. `/settings` - sozlamalar.

## 6. MVPdan keyingi sahifalar

Quyidagi bo'limlar birinchi versiyadan keyin qo'shiladi:
- Ombor.
- Xaridlar.
- Ish haqi.
- Sug'urta va korporativ mijozlar.
- Dorixona.
- Kengaytirilgan hisobotlar.
- Integratsiyalar.
- Filiallar.
- Avtomatik bildirishnomalar.

## 7. Vizual standartlar

Ranglar:
- Asosiy fon: oq yoki och kulrang.
- Asosiy matn: to'q neytral.
- Ikkinchi darajali matn: kulrang.
- Aktiv holat: ko'k yoki yashil aksent.
- Xavfli amal: qizil.
- Ogohlantirish: sariq yoki amber.

Komponentlar:
- Buttonlar aniq action nomi bilan bo'lishi kerak.
- Jadval satrlari zich, lekin o'qilishi oson bo'lishi kerak.
- Statuslar rangli badge bilan ko'rsatiladi.
- Filterlar jadval tepasida joylashadi.
- Modal faqat qisqa tasdiqlash yoki tezkor action uchun ishlatiladi.

## 8. Sahifa ichidagi umumiy qoidalar

- Har bir sahifada bitta asosiy action bo'lishi kerak.
- Bir sahifada tibbiy va moliyaviy actionlar aralashtirilmaydi.
- O'chirish, bekor qilish, qaytarim va chegirma amallari sabab so'rashi kerak.
- Har bir muhim amal auditga tushishi kerak.
- Jadval sahifalarida qidiruv, filter va status ko'rsatilishi kerak.
- Tafsilot sahifalarida tarix va bog'langan yozuvlarga o'tish bo'lishi kerak.
- Tibbiy yozuvlar yakunlangandan keyin cheksiz tahrirlanmasligi kerak.

## 9. Kodlash uchun boshlang'ich tartib

Sahifalarni quyidagi ketma-ketlikda yaratish tavsiya etiladi:

1. Umumiy app shell: sidebar, topbar, content wrapper.
2. Login sahifasi.
3. Dashboard.
4. Registratura sahifalari.
5. Bemorlar sahifalari.
6. Shifokor sahifalari.
7. Kassa sahifalari.
8. Laboratoriya va diagnostika sahifalari.
9. Xizmatlar, hujjatlar, ruxsatlar, audit va sozlamalar.

Bu tartib klinika ERPning kundalik operatsion oqimiga mos: bemor keladi, ro'yxatdan o'tadi, to'lov qiladi, shifokorga kiradi, tekshiruvlardan o'tadi va hujjat oladi.
