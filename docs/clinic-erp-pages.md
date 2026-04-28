# Klinika ERP sahifalar ro'yxati

Ushbu hujjat `clinic-erp-modules.md` faylidagi modullar asosida ERP tizimida kerak bo'ladigan sahifalar ro'yxatini beradi. Bu hujjatda database modellari, API endpointlar, form maydonlari va UI dizayn detallari yozilmaydi. Maqsad: navigatsiya, sahifalar tarkibi va har bir sahifaning vazifasini aniq belgilash.

Route nomlari taxminiy berilgan. Texnik routing keyingi bosqichda loyiha arxitekturasi bilan moslab aniqlanadi.

## 1. Umumiy tizim sahifalari

### 1.1. Kirish sahifasi

Route: `/login`

Vazifasi:
- Foydalanuvchini tizimga kiritish.
- Login va parol orqali autentifikatsiya qilish.
- Faol bo'lmagan yoki bloklangan foydalanuvchini tizimga kiritmaslik.
- Rolga qarab foydalanuvchini tegishli boshlang'ich sahifaga yo'naltirish.

### 1.2. Parolni tiklash sahifasi

Route: `/forgot-password`

Vazifasi:
- Parolni unutgan foydalanuvchi uchun tiklash jarayonini boshlash.
- Telefon, email yoki administrator orqali tiklash tartibiga yo'naltirish.

### 1.3. Profil sahifasi

Route: `/profile`

Vazifasi:
- Foydalanuvchi o'z profil ma'lumotlarini ko'rishi.
- Parolni almashtirish.
- Shaxsiy sozlamalarni ko'rish.

### 1.4. Ruxsat yo'q sahifasi

Route: `/403`

Vazifasi:
- Foydalanuvchida sahifaga kirish ruxsati bo'lmaganda ko'rsatish.
- Orqaga qaytish yoki asosiy panelga o'tish imkonini berish.

### 1.5. Topilmadi sahifasi

Route: `/404`

Vazifasi:
- Mavjud bo'lmagan route ochilganda ko'rsatish.
- Foydalanuvchini asosiy sahifaga qaytarish.

## 2. Rahbariyat paneli

### 2.1. Bosh panel

Route: `/dashboard`

Vazifasi:
- Bugungi bemorlar sonini ko'rsatish.
- Bugungi tushumni ko'rsatish.
- Qarzdorlik miqdorini ko'rsatish.
- Shifokorlar, laboratoriya, diagnostika va kassa holatini umumiy ko'rsatish.
- Muhim ogohlantirishlarni chiqarish.

### 2.2. Operatsion monitoring

Route: `/dashboard/operations`

Vazifasi:
- Klinikadagi real vaqt ish oqimini ko'rsatish.
- Qabulda kutayotgan, shifokorda, laboratoriyada, diagnostikada va kassada turgan bemorlar sonini ko'rsatish.
- Kechikayotgan jarayonlarni aniqlash.

### 2.3. Rahbariyat ogohlantirishlari

Route: `/dashboard/alerts`

Vazifasi:
- Qarzdorlik, kassa farqi, ombor kam qoldiq, kechikkan natijalar kabi muhim holatlarni jamlash.
- Ogohlantirishlarni holati bo'yicha filtrlash.

## 3. Registratura va qabulxona

### 3.1. Registratura bosh sahifasi

Route: `/reception`

Vazifasi:
- Bugungi qabul oqimini ko'rsatish.
- Tez bemor qidirish.
- Tez qabulga yozish.
- Kelgan, kutayotgan, qabulda va yakunlangan bemorlarni ko'rsatish.

### 3.2. Qabul jadvali

Route: `/reception/schedule`

Vazifasi:
- Shifokorlar bo'yicha qabul vaqtlarini ko'rsatish.
- Kunlik, haftalik yoki shifokor kesimida jadvalni ko'rish.
- Bo'sh vaqtlarni aniqlash.

### 3.3. Yangi qabul yaratish

Route: `/reception/appointments/new`

Vazifasi:
- Bemorni qabulga yozish.
- Shifokor, xizmat, sana va vaqt tanlash.
- Qabul turini belgilash.
- Telefon orqali yoki joyida yozilganini ajratish.

### 3.4. Qabullar ro'yxati

Route: `/reception/appointments`

Vazifasi:
- Barcha qabullarni ro'yxat ko'rinishida ko'rsatish.
- Sana, shifokor, bemor, xizmat va status bo'yicha filterlash.
- Bekor qilingan va kelmagan qabullarni ko'rish.

### 3.5. Qabul tafsiloti

Route: `/reception/appointments/:id`

Vazifasi:
- Bitta qabul bo'yicha barcha ma'lumotlarni ko'rsatish.
- Qabul statusini o'zgartirish.
- Bemorni kassa, shifokor, laboratoriya yoki diagnostikaga yo'naltirish.

### 3.6. Telefon orqali yozilganlar

Route: `/reception/calls`

Vazifasi:
- Telefon orqali kelgan murojaatlarni yuritish.
- Qo'ng'iroqdan qabul yaratish.
- Aloqa qilinishi kerak bo'lgan bemorlarni nazorat qilish.

### 3.7. Kelmagan bemorlar

Route: `/reception/no-shows`

Vazifasi:
- Belgilangan vaqtda kelmagan bemorlarni ko'rsatish.
- Qayta yozish yoki bekor qilish jarayonini yuritish.

## 4. Bemorlar bazasi

### 4.1. Bemorlar ro'yxati

Route: `/patients`

Vazifasi:
- Barcha bemorlarni ko'rsatish.
- F.I.Sh, telefon, karta raqami, tug'ilgan sana va boshqa asosiy belgilar bo'yicha qidirish.
- Dublikat bemorlarni aniqlashga yordam berish.

### 4.2. Yangi bemor yaratish

Route: `/patients/new`

Vazifasi:
- Yangi bemor kartasini ochish.
- Asosiy shaxsiy va aloqa ma'lumotlarini kiritish.

### 4.3. Bemor kartasi

Route: `/patients/:id`

Vazifasi:
- Bemorning umumiy profilini ko'rsatish.
- Oxirgi qabullar, to'lovlar, qarzdorlik va tibbiy tarixga tez kirish.

### 4.4. Bemor qabul tarixi

Route: `/patients/:id/appointments`

Vazifasi:
- Bemorning barcha qabul tarixini ko'rsatish.
- Shifokor, sana, status va xizmat bo'yicha ko'rish.

### 4.5. Bemor tibbiy tarixi

Route: `/patients/:id/medical-history`

Vazifasi:
- Shifokor yozuvlari, tashxislar, tavsiyalar, laboratoriya va diagnostika natijalarini umumiy tarixda ko'rsatish.

### 4.6. Bemor to'lovlari

Route: `/patients/:id/payments`

Vazifasi:
- Bemor bo'yicha barcha hisoblar, to'lovlar, qaytarimlar va qarzdorlikni ko'rsatish.

### 4.7. Bemor hujjatlari

Route: `/patients/:id/documents`

Vazifasi:
- Bemor bilan bog'langan tibbiy hujjatlar, xulosalar, retseptlar va fayllarni ko'rsatish.

### 4.8. Bemor eslatmalari

Route: `/patients/:id/notes`

Vazifasi:
- Bemor bo'yicha ichki eslatmalarni yuritish.
- Muhim administrativ yoki xizmat ko'rsatish izohlarini ko'rsatish.

## 5. Shifokor qabuli

### 5.1. Shifokor ish stoli

Route: `/doctor`

Vazifasi:
- Shifokorning bugungi qabul ro'yxatini ko'rsatish.
- Kutayotgan, qabulda va yakunlangan bemorlarni ajratish.
- Qabulni boshlash uchun tez kirish.

### 5.2. Shifokor jadvali

Route: `/doctor/schedule`

Vazifasi:
- Shifokorning qabul jadvalini ko'rsatish.
- Bugungi va kelgusi qabullarni ko'rish.

### 5.3. Qabul oynasi

Route: `/doctor/appointments/:id`

Vazifasi:
- Bemor qabulini yuritish.
- Shikoyat, ko'rik, tashxis, tavsiya va davolash rejasini kiritish.
- Laboratoriya, diagnostika yoki boshqa shifokorga yo'naltirish.

### 5.4. Qabul yakunlash sahifasi

Route: `/doctor/appointments/:id/finish`

Vazifasi:
- Qabul natijasini yakuniy tekshirish.
- Takroriy qabul, retsept, tavsiya va hujjatlarni tasdiqlash.

### 5.5. Shifokor bemor tarixi

Route: `/doctor/patients/:id/history`

Vazifasi:
- Shifokor uchun bemorning tibbiy tarixini ko'rsatish.
- Oldingi tashxislar, laboratoriya va diagnostika natijalarini ko'rish.

### 5.6. Shifokor statistikasi

Route: `/doctor/statistics`

Vazifasi:
- Shifokorning qabul soni, bajarilgan xizmatlari va daromadga ta'sirini ko'rsatish.

## 6. Laboratoriya

### 6.1. Laboratoriya bosh sahifasi

Route: `/laboratory`

Vazifasi:
- Laboratoriya buyurtmalari holatini ko'rsatish.
- Kutilayotgan, namuna olingan, bajarilayotgan va tayyor tahlillarni ajratish.

### 6.2. Laboratoriya buyurtmalari

Route: `/laboratory/orders`

Vazifasi:
- Barcha laboratoriya buyurtmalarini ro'yxatlash.
- Sana, bemor, shifokor, xizmat va status bo'yicha filterlash.

### 6.3. Laboratoriya buyurtma tafsiloti

Route: `/laboratory/orders/:id`

Vazifasi:
- Bitta laboratoriya buyurtmasi tafsilotlarini ko'rish.
- Namuna olinganini belgilash.
- Tahlil jarayonini statuslar orqali yuritish.

### 6.4. Natija kiritish

Route: `/laboratory/orders/:id/results`

Vazifasi:
- Tahlil natijalarini kiritish.
- Natijani tasdiqlashga yuborish.

### 6.5. Natijalarni tasdiqlash

Route: `/laboratory/results/approval`

Vazifasi:
- Kiritilgan laboratoriya natijalarini tekshirish va tasdiqlash.
- Xato yoki qayta ishlash kerak bo'lgan natijalarni qaytarish.

### 6.6. Laboratoriya natijalari arxivi

Route: `/laboratory/results`

Vazifasi:
- Tayyor va tasdiqlangan natijalarni qidirish.
- Bemor, sana, tahlil turi va shifokor bo'yicha filterlash.

### 6.7. Laboratoriya ish yuklamasi

Route: `/laboratory/workload`

Vazifasi:
- Laboratoriya bo'yicha ish hajmini ko'rsatish.
- Xodim, xizmat turi va davr bo'yicha tahlil qilish.

## 7. Diagnostika

### 7.1. Diagnostika bosh sahifasi

Route: `/diagnostics`

Vazifasi:
- Diagnostika tekshiruvlari holatini umumiy ko'rsatish.
- Kutayotgan, bajarilayotgan va tayyor tekshiruvlarni ajratish.

### 7.2. Diagnostika jadvali

Route: `/diagnostics/schedule`

Vazifasi:
- Uskuna, xona yoki mutaxassis bo'yicha tekshiruv vaqtlarini ko'rsatish.
- Band va bo'sh vaqtlarni ko'rish.

### 7.3. Diagnostika buyurtmalari

Route: `/diagnostics/orders`

Vazifasi:
- Diagnostika yo'llanmalarini ro'yxatlash.
- Bemor, xizmat, shifokor, uskuna va status bo'yicha filterlash.

### 7.4. Diagnostika buyurtma tafsiloti

Route: `/diagnostics/orders/:id`

Vazifasi:
- Tekshiruv tafsilotlarini ko'rish.
- Tekshiruv boshlanganini va yakunlanganini belgilash.

### 7.5. Diagnostika xulosasi

Route: `/diagnostics/orders/:id/conclusion`

Vazifasi:
- Diagnostika xulosasini kiritish.
- Fayl, rasm yoki skan natijalarini bog'lash.
- Natijani shifokorga yuborish.

### 7.6. Diagnostika natijalari arxivi

Route: `/diagnostics/results`

Vazifasi:
- Tayyor diagnostika xulosalarini qidirish.
- Bemor, xizmat, sana va mutaxassis bo'yicha filterlash.

### 7.7. Uskunalar bandligi

Route: `/diagnostics/equipment-schedule`

Vazifasi:
- Diagnostika uskunalarining bandligini ko'rsatish.
- Texnik xizmat yoki vaqtincha ishlamaslik holatlarini ko'rish.

## 8. Kassa va to'lovlar

### 8.1. Kassa bosh sahifasi

Route: `/cashier`

Vazifasi:
- Bugungi to'lovlar, qarzdorliklar va kassa holatini ko'rsatish.
- To'lov kutayotgan bemorlarni ko'rsatish.

### 8.2. To'lov yaratish

Route: `/cashier/payments/new`

Vazifasi:
- Bemor uchun xizmatlar asosida to'lov yaratish.
- To'lov usuli va summa kiritish.
- Qisman to'lov va chegirma qo'llash.

### 8.3. To'lovlar ro'yxati

Route: `/cashier/payments`

Vazifasi:
- Barcha to'lovlarni ro'yxatlash.
- Sana, kassir, bemor, xizmat, to'lov usuli va status bo'yicha filterlash.

### 8.4. To'lov tafsiloti

Route: `/cashier/payments/:id`

Vazifasi:
- Bitta to'lov bo'yicha xizmatlar, summa, chegirma, kassir va statusni ko'rish.
- Chek yoki kvitansiya chiqarish.

### 8.5. Qarzdorliklar

Route: `/cashier/debts`

Vazifasi:
- Qarzdor bemorlar va tashkilotlarni ko'rsatish.
- Qarzdorlikni qisman yoki to'liq yopish jarayoniga o'tish.

### 8.6. Qaytarimlar

Route: `/cashier/refunds`

Vazifasi:
- Qaytarilgan to'lovlarni ko'rsatish.
- Qaytarim yaratish va sababini qayd qilish.

### 8.7. Chegirmalar

Route: `/cashier/discounts`

Vazifasi:
- Berilgan chegirmalarni ko'rsatish.
- Chegirma sababi, mas'ul xodim va ruxsat holatini nazorat qilish.

### 8.8. Kassa yopilishi

Route: `/cashier/closing`

Vazifasi:
- Kun yakuni bo'yicha kassani yopish.
- Real pul, tizimdagi tushum va farqni ko'rsatish.

### 8.9. Kassirlar kesimida tushum

Route: `/cashier/cashiers`

Vazifasi:
- Har bir kassir bo'yicha tushum, qaytarim va farqlarni ko'rsatish.

## 9. Xizmatlar katalogi va narxlar

### 9.1. Xizmatlar ro'yxati

Route: `/services`

Vazifasi:
- Klinikadagi barcha xizmatlarni ro'yxatlash.
- Kategoriya, bo'lim, status va narx bo'yicha filterlash.

### 9.2. Yangi xizmat yaratish

Route: `/services/new`

Vazifasi:
- Yangi xizmat qo'shish.
- Xizmat kategoriyasi, narxi va asosiy qoidasini belgilash.

### 9.3. Xizmat tafsiloti

Route: `/services/:id`

Vazifasi:
- Bitta xizmat haqida ma'lumot ko'rish.
- Narx, status va bog'langan bo'limlarni ko'rsatish.

### 9.4. Xizmat kategoriyalari

Route: `/services/categories`

Vazifasi:
- Xizmat kategoriyalarini yaratish va boshqarish.

### 9.5. Narxlar tarixi

Route: `/services/price-history`

Vazifasi:
- Xizmat narxlari o'zgarish tarixini ko'rsatish.
- Qaysi xodim qachon o'zgartirganini ko'rish.

### 9.6. Paket xizmatlar

Route: `/services/packages`

Vazifasi:
- Bir nechta xizmatdan iborat paketlarni boshqarish.
- Paket narxi va tarkibini ko'rish.

## 10. Ombor va inventar

### 10.1. Ombor bosh sahifasi

Route: `/inventory`

Vazifasi:
- Umumiy qoldiqlar, kam qolgan mahsulotlar va muddati tugayotgan mahsulotlarni ko'rsatish.

### 10.2. Mahsulotlar ro'yxati

Route: `/inventory/items`

Vazifasi:
- Dori, reagent, material va jihozlarni ro'yxatlash.
- Kategoriya, ombor, qoldiq va yaroqlilik bo'yicha filterlash.

### 10.3. Mahsulot tafsiloti

Route: `/inventory/items/:id`

Vazifasi:
- Mahsulot qoldig'i, partiyalari, kirim-chiqim tarixi va minimal qoldig'ini ko'rsatish.

### 10.4. Kirimlar

Route: `/inventory/stock-in`

Vazifasi:
- Omborga kirim qilingan mahsulotlarni ro'yxatlash.
- Yangi kirim jarayoniga o'tish.

### 10.5. Chiqimlar

Route: `/inventory/stock-out`

Vazifasi:
- Bo'limlarga yoki xizmatlarga sarflangan mahsulotlarni yuritish.

### 10.6. Omborlar o'rtasida ko'chirish

Route: `/inventory/transfers`

Vazifasi:
- Filiallar yoki ichki omborlar o'rtasida mahsulot ko'chirishni boshqarish.

### 10.7. Inventarizatsiya

Route: `/inventory/counts`

Vazifasi:
- Inventarizatsiya jarayonlarini yuritish.
- Tizim qoldig'i va real qoldiq farqini ko'rsatish.

### 10.8. Kam qoldiq ogohlantirishlari

Route: `/inventory/low-stock`

Vazifasi:
- Minimal qoldiqdan pastga tushgan mahsulotlarni ko'rsatish.

### 10.9. Muddati tugayotgan mahsulotlar

Route: `/inventory/expiring`

Vazifasi:
- Yaroqlilik muddati yaqinlashgan yoki tugagan mahsulotlarni ko'rsatish.

## 11. Xaridlar va ta'minot

### 11.1. Xaridlar bosh sahifasi

Route: `/purchases`

Vazifasi:
- Xarid ehtiyojlari, buyurtmalar va yetkazib beruvchilar holatini umumiy ko'rsatish.

### 11.2. Xarid ehtiyojlari

Route: `/purchases/requests`

Vazifasi:
- Ombor yoki bo'limlardan kelgan xarid ehtiyojlarini ko'rsatish.
- Tasdiqlash yoki rad etish jarayoniga o'tish.

### 11.3. Yangi xarid buyurtmasi

Route: `/purchases/orders/new`

Vazifasi:
- Yetkazib beruvchiga xarid buyurtmasi yaratish.

### 11.4. Xarid buyurtmalari

Route: `/purchases/orders`

Vazifasi:
- Barcha xarid buyurtmalarini ro'yxatlash.
- Status, yetkazib beruvchi va sana bo'yicha filterlash.

### 11.5. Xarid buyurtma tafsiloti

Route: `/purchases/orders/:id`

Vazifasi:
- Buyurtma tarkibi, narxlari, statusi va qabul holatini ko'rsatish.

### 11.6. Yetkazib beruvchilar

Route: `/purchases/suppliers`

Vazifasi:
- Yetkazib beruvchilar ro'yxatini yuritish.
- Aloqa va hisob-kitob ma'lumotlarini ko'rsatish.

### 11.7. Yetkazib beruvchi tafsiloti

Route: `/purchases/suppliers/:id`

Vazifasi:
- Yetkazib beruvchi bilan bog'liq buyurtmalar, qarzdorlik va tarixni ko'rsatish.

## 12. Xodimlar va kadrlar

### 12.1. Xodimlar ro'yxati

Route: `/staff`

Vazifasi:
- Klinikadagi barcha xodimlarni ro'yxatlash.
- Bo'lim, lavozim, filial va status bo'yicha filterlash.

### 12.2. Yangi xodim yaratish

Route: `/staff/new`

Vazifasi:
- Yangi xodim kartasini yaratish.
- Lavozim, bo'lim va ish holatini belgilash.

### 12.3. Xodim profili

Route: `/staff/:id`

Vazifasi:
- Xodim ma'lumotlari, hujjatlari, grafigi va tizimdagi rolini ko'rsatish.

### 12.4. Xodim ish grafigi

Route: `/staff/:id/schedule`

Vazifasi:
- Xodimning ish kunlari va smenalarini ko'rsatish.

### 12.5. Umumiy ish grafigi

Route: `/staff/schedule`

Vazifasi:
- Barcha xodimlar bo'yicha ish grafigini ko'rish.

### 12.6. Ta'til va kelmagan kunlar

Route: `/staff/absences`

Vazifasi:
- Ta'til, kasallik varaqasi va ishga chiqmagan kunlarni yuritish.

### 12.7. Xodim hujjatlari

Route: `/staff/documents`

Vazifasi:
- Sertifikat, diplom, shartnoma va boshqa kadrlar hujjatlarini nazorat qilish.

## 13. Ish haqi va motivatsiya

### 13.1. Ish haqi bosh sahifasi

Route: `/payroll`

Vazifasi:
- Joriy davr bo'yicha hisob-kitoblar holatini ko'rsatish.
- To'langan va to'lanmagan ish haqlarini ajratish.

### 13.2. Ish haqi davrlari

Route: `/payroll/periods`

Vazifasi:
- Oy yoki boshqa davrlar bo'yicha ish haqi hisob-kitoblarini yuritish.

### 13.3. Ish haqi hisoblash

Route: `/payroll/calculate`

Vazifasi:
- Xodimlar bo'yicha oylik, foiz, bonus va ushlanmalarni hisoblash.

### 13.4. Xodim ish haqi tafsiloti

Route: `/payroll/staff/:id`

Vazifasi:
- Bitta xodim bo'yicha hisoblangan summa, xizmat foizi, bonus va ushlanmalarni ko'rsatish.

### 13.5. Bonus va jarimalar

Route: `/payroll/adjustments`

Vazifasi:
- Bonus, jarima va boshqa qo'shimcha o'zgarishlarni yuritish.

### 13.6. Ish haqi to'lovlari

Route: `/payroll/payments`

Vazifasi:
- Xodimlarga amalga oshirilgan ish haqi to'lovlarini ro'yxatlash.

## 14. Moliyaviy hisobotlar

### 14.1. Hisobotlar bosh sahifasi

Route: `/reports`

Vazifasi:
- Asosiy moliyaviy va operatsion hisobotlarga kirish.

### 14.2. Tushum hisoboti

Route: `/reports/revenue`

Vazifasi:
- Davr bo'yicha tushumlarni ko'rsatish.
- To'lov usuli, filial, kassir va xizmat bo'yicha ajratish.

### 14.3. Xizmatlar daromadi hisoboti

Route: `/reports/services`

Vazifasi:
- Xizmatlar kesimida daromad, son va o'rtacha chekni ko'rsatish.

### 14.4. Shifokorlar hisoboti

Route: `/reports/doctors`

Vazifasi:
- Shifokorlar bo'yicha qabul soni, xizmatlar va daromadni ko'rsatish.

### 14.5. Qarzdorlik hisoboti

Route: `/reports/debts`

Vazifasi:
- Bemor, korporativ mijoz va sug'urta bo'yicha qarzdorliklarni ko'rsatish.

### 14.6. Xarajatlar hisoboti

Route: `/reports/expenses`

Vazifasi:
- Xarid, ish haqi, ombor va boshqa xarajatlarni ko'rsatish.

### 14.7. Foyda va zarar hisoboti

Route: `/reports/profit-loss`

Vazifasi:
- Daromad, xarajat va sof foydani davr bo'yicha ko'rsatish.

### 14.8. Kassa farqlari hisoboti

Route: `/reports/cash-differences`

Vazifasi:
- Kassa yopilishi va real tushum farqlarini ko'rsatish.

### 14.9. Ombor xarajatlari hisoboti

Route: `/reports/inventory`

Vazifasi:
- Ombor kirim-chiqimi, sarf va qoldiq qiymatini ko'rsatish.

## 15. Sug'urta va korporativ mijozlar

### 15.1. Korporativ mijozlar ro'yxati

Route: `/corporate`

Vazifasi:
- Tashkilotlar va korporativ mijozlarni ro'yxatlash.

### 15.2. Korporativ mijoz tafsiloti

Route: `/corporate/:id`

Vazifasi:
- Shartnoma, xodimlar, xizmatlar, limitlar va qarzdorlikni ko'rsatish.

### 15.3. Korporativ bemorlar

Route: `/corporate/:id/patients`

Vazifasi:
- Korporativ mijozga biriktirilgan bemorlarni ko'rsatish.

### 15.4. Sug'urta kompaniyalari

Route: `/insurance`

Vazifasi:
- Sug'urta kompaniyalari ro'yxatini yuritish.

### 15.5. Sug'urta tasdiqlari

Route: `/insurance/approvals`

Vazifasi:
- Sug'urta tasdig'i talab qilinadigan xizmatlarni ko'rsatish.
- Tasdiq holatini yuritish.

### 15.6. Korporativ hisob-kitoblar

Route: `/corporate/billing`

Vazifasi:
- Davr bo'yicha korporativ yoki sug'urta hisob-kitoblarini ko'rsatish.

## 16. Tibbiy hujjatlar

### 16.1. Hujjatlar ro'yxati

Route: `/documents`

Vazifasi:
- Tizimda shakllangan barcha tibbiy hujjatlarni ro'yxatlash.
- Bemor, hujjat turi, sana va muallif bo'yicha filterlash.

### 16.2. Hujjat tafsiloti

Route: `/documents/:id`

Vazifasi:
- Bitta hujjatni ko'rish.
- Chop etish yoki elektron yuborishga tayyorlash.

### 16.3. Hujjat shablonlari

Route: `/documents/templates`

Vazifasi:
- Xulosa, retsept, ma'lumotnoma va natija shablonlarini boshqarish.

### 16.4. Yangi ma'lumotnoma

Route: `/documents/certificates/new`

Vazifasi:
- Bemor uchun ma'lumotnoma yoki yo'llanma yaratish.

### 16.5. Chop etish navbati

Route: `/documents/print-queue`

Vazifasi:
- Chop etilishi kerak bo'lgan hujjatlarni ko'rsatish.

## 17. Retsept va dorilar

### 17.1. Retseptlar ro'yxati

Route: `/prescriptions`

Vazifasi:
- Barcha retseptlarni ro'yxatlash.
- Bemor, shifokor, sana va dori bo'yicha qidirish.

### 17.2. Retsept tafsiloti

Route: `/prescriptions/:id`

Vazifasi:
- Retsept tarkibi, qabul qilish tartibi va muallifini ko'rsatish.

### 17.3. Yangi retsept

Route: `/prescriptions/new`

Vazifasi:
- Shifokor tomonidan bemor uchun retsept yaratish.

### 17.4. Dori ma'lumotnomasi

Route: `/prescriptions/medicines`

Vazifasi:
- Retseptda ishlatiladigan dori nomlari va standart tavsiyalarni yuritish.

## 18. Dorixona

### 18.1. Dorixona bosh sahifasi

Route: `/pharmacy`

Vazifasi:
- Dorixona savdosi, qoldiqlar va ogohlantirishlarni ko'rsatish.

### 18.2. Dorixona mahsulotlari

Route: `/pharmacy/items`

Vazifasi:
- Dorixona mahsulotlarini ro'yxatlash.
- Qoldiq, narx va yaroqlilik muddatini ko'rsatish.

### 18.3. Dori savdosi

Route: `/pharmacy/sales/new`

Vazifasi:
- Bemorga yoki tashqi mijozga dori sotish.
- Retsept asosida dori berishni qo'llab-quvvatlash.

### 18.4. Savdolar ro'yxati

Route: `/pharmacy/sales`

Vazifasi:
- Dorixona savdolarini ro'yxatlash.
- Sana, kassir, bemor va to'lov usuli bo'yicha filterlash.

### 18.5. Dorixona qaytarimlari

Route: `/pharmacy/returns`

Vazifasi:
- Dorixona mahsulotlari qaytarimlarini yuritish.

### 18.6. Dorixona qoldiqlari

Route: `/pharmacy/stock`

Vazifasi:
- Dorixona ombori qoldiqlarini ko'rsatish.

## 19. Navbat va ish oqimi

### 19.1. Umumiy navbat monitori

Route: `/queue`

Vazifasi:
- Klinikadagi barcha aktiv bemorlar harakatini ko'rsatish.
- Har bir bemor qaysi bosqichda ekanini ko'rsatish.

### 19.2. Registratura navbati

Route: `/queue/reception`

Vazifasi:
- Registraturada kutayotgan yoki ro'yxatdan o'tayotgan bemorlarni ko'rsatish.

### 19.3. Kassa navbati

Route: `/queue/cashier`

Vazifasi:
- To'lov kutayotgan bemorlarni ko'rsatish.

### 19.4. Shifokor navbati

Route: `/queue/doctors`

Vazifasi:
- Shifokorlar bo'yicha kutayotgan bemorlarni ko'rsatish.

### 19.5. Laboratoriya navbati

Route: `/queue/laboratory`

Vazifasi:
- Namuna topshirish yoki natija kutayotgan bemorlarni ko'rsatish.

### 19.6. Diagnostika navbati

Route: `/queue/diagnostics`

Vazifasi:
- Diagnostika tekshiruvini kutayotgan bemorlarni ko'rsatish.

## 20. Bildirishnomalar va eslatmalar

### 20.1. Bildirishnomalar ro'yxati

Route: `/notifications`

Vazifasi:
- Yuborilgan va yuborilishi kerak bo'lgan xabarlarni ko'rsatish.

### 20.2. Yangi xabar yuborish

Route: `/notifications/new`

Vazifasi:
- Bemor yoki xodimga qo'lda xabar yuborish.

### 20.3. Xabar shablonlari

Route: `/notifications/templates`

Vazifasi:
- SMS, email va ichki xabar shablonlarini boshqarish.

### 20.4. Avtomatik eslatmalar

Route: `/notifications/automation`

Vazifasi:
- Qabul eslatmasi, natija tayyorligi va qarzdorlik xabarlari kabi avtomatik qoidalarni sozlash.

### 20.5. Yuborish xatolari

Route: `/notifications/errors`

Vazifasi:
- Yuborilmagan yoki xatolik bilan tugagan xabarlarni ko'rsatish.

## 21. Rollar va ruxsatlar

### 21.1. Foydalanuvchilar ro'yxati

Route: `/access/users`

Vazifasi:
- Tizim foydalanuvchilarini ro'yxatlash.
- Rol, status va bo'lim bo'yicha filterlash.

### 21.2. Foydalanuvchi tafsiloti

Route: `/access/users/:id`

Vazifasi:
- Foydalanuvchi profili, roli, statusi va oxirgi kirishlarini ko'rsatish.

### 21.3. Rollar ro'yxati

Route: `/access/roles`

Vazifasi:
- Tizim rollarini ro'yxatlash.
- Har bir rol vazifasini ko'rsatish.

### 21.4. Rol ruxsatlari

Route: `/access/roles/:id/permissions`

Vazifasi:
- Rolga biriktirilgan ruxsatlarni ko'rish va boshqarish.

### 21.5. Ruxsatlar matritsasi

Route: `/access/permissions-matrix`

Vazifasi:
- Rollar va modullar kesimida ruxsatlarni jadval ko'rinishida ko'rsatish.

### 21.6. Login xavfsizligi

Route: `/access/security`

Vazifasi:
- Parol siyosati, sessiya va bloklash qoidalarini ko'rsatish.

## 22. Audit jurnali

### 22.1. Audit ro'yxati

Route: `/audit`

Vazifasi:
- Tizimdagi muhim amallar tarixini ko'rsatish.
- Foydalanuvchi, modul, amal turi va sana bo'yicha filterlash.

### 22.2. Audit tafsiloti

Route: `/audit/:id`

Vazifasi:
- Bitta audit yozuvi bo'yicha eski qiymat, yangi qiymat, foydalanuvchi va vaqtni ko'rsatish.

### 22.3. Moliyaviy audit

Route: `/audit/financial`

Vazifasi:
- To'lov, qaytarim, chegirma va kassa yopilishi bo'yicha o'zgarishlarni ko'rsatish.

### 22.4. Tibbiy audit

Route: `/audit/medical`

Vazifasi:
- Tibbiy yozuvlar, laboratoriya natijalari va diagnostika xulosalaridagi o'zgarishlarni ko'rsatish.

### 22.5. Kirishlar tarixi

Route: `/audit/logins`

Vazifasi:
- Foydalanuvchilarning tizimga kirish va chiqish tarixini ko'rsatish.

## 23. Sozlamalar

### 23.1. Sozlamalar bosh sahifasi

Route: `/settings`

Vazifasi:
- Asosiy sozlamalar bo'limlariga kirish.

### 23.2. Klinika ma'lumotlari

Route: `/settings/clinic`

Vazifasi:
- Klinika nomi, manzili, telefonlari va rasmiy ma'lumotlarini boshqarish.

### 23.3. Ish vaqti

Route: `/settings/working-hours`

Vazifasi:
- Ish kunlari, smenalar va dam olish kunlarini sozlash.

### 23.4. To'lov usullari

Route: `/settings/payment-methods`

Vazifasi:
- Naqd, karta, bank o'tkazmasi va boshqa to'lov usullarini boshqarish.

### 23.5. Hujjat sozlamalari

Route: `/settings/document-settings`

Vazifasi:
- Hujjat raqamlash, chop etish va shablon sozlamalarini boshqarish.

### 23.6. Tizim sozlamalari

Route: `/settings/system`

Vazifasi:
- Til, vaqt zonasi, valyuta va umumiy tizim qoidalarini sozlash.

### 23.7. Qabul qoidalari

Route: `/settings/appointment-rules`

Vazifasi:
- Qabul davomiyligi, kechikish, bekor qilish va kelmagan bemorlar qoidalarini sozlash.

### 23.8. To'lov qoidalari

Route: `/settings/payment-rules`

Vazifasi:
- Oldindan to'lov, qisman to'lov, qarzdorlik va chegirma qoidalarini sozlash.

## 24. Integratsiyalar

### 24.1. Integratsiyalar ro'yxati

Route: `/integrations`

Vazifasi:
- Tizimga ulangan tashqi servislarni ko'rsatish.

### 24.2. SMS integratsiyasi

Route: `/integrations/sms`

Vazifasi:
- SMS provayder sozlamalarini boshqarish.
- Test xabar yuborish.

### 24.3. To'lov integratsiyasi

Route: `/integrations/payments`

Vazifasi:
- To'lov provayderlari yoki bank tizimlari bilan ulanish sozlamalarini boshqarish.

### 24.4. Email integratsiyasi

Route: `/integrations/email`

Vazifasi:
- Email yuborish sozlamalarini boshqarish.

### 24.5. Fiskal chek integratsiyasi

Route: `/integrations/fiscal`

Vazifasi:
- Fiskal qurilma yoki online kassa ulanishini boshqarish.

### 24.6. Laboratoriya uskunalari integratsiyasi

Route: `/integrations/lab-devices`

Vazifasi:
- Laboratoriya uskunalaridan natija olish integratsiyalarini ko'rsatish.

### 24.7. Integratsiya loglari

Route: `/integrations/logs`

Vazifasi:
- Tashqi servislar bilan almashuv tarixini ko'rsatish.
- Xatoliklarni qayta ko'rish va qayta yuborish.

## 25. Filiallar boshqaruvi

### 25.1. Filiallar ro'yxati

Route: `/branches`

Vazifasi:
- Klinikaga tegishli filiallarni ro'yxatlash.

### 25.2. Filial tafsiloti

Route: `/branches/:id`

Vazifasi:
- Filial ma'lumotlari, ish vaqti, xodimlar va kassa holatini ko'rsatish.

### 25.3. Filial xodimlari

Route: `/branches/:id/staff`

Vazifasi:
- Filialga biriktirilgan xodimlarni ko'rsatish.

### 25.4. Filial kassasi

Route: `/branches/:id/cashier`

Vazifasi:
- Filial bo'yicha tushum, to'lovlar va kassa yopilishini ko'rsatish.

### 25.5. Filial ombori

Route: `/branches/:id/inventory`

Vazifasi:
- Filial bo'yicha ombor qoldiqlarini ko'rsatish.

### 25.6. Filial hisobotlari

Route: `/branches/:id/reports`

Vazifasi:
- Filial kesimida qabul, tushum, xarajat va ish yuklamasini ko'rsatish.

## 26. Birinchi versiya uchun majburiy sahifalar

ERPning birinchi ishlaydigan versiyasi uchun quyidagi sahifalar yetarli minimal asos bo'ladi:

1. `/login` - kirish sahifasi.
2. `/dashboard` - bosh panel.
3. `/reception` - registratura bosh sahifasi.
4. `/reception/schedule` - qabul jadvali.
5. `/reception/appointments/new` - yangi qabul yaratish.
6. `/reception/appointments` - qabullar ro'yxati.
7. `/patients` - bemorlar ro'yxati.
8. `/patients/new` - yangi bemor yaratish.
9. `/patients/:id` - bemor kartasi.
10. `/patients/:id/medical-history` - bemor tibbiy tarixi.
11. `/doctor` - shifokor ish stoli.
12. `/doctor/appointments/:id` - shifokor qabul oynasi.
13. `/laboratory` - laboratoriya bosh sahifasi.
14. `/laboratory/orders` - laboratoriya buyurtmalari.
15. `/laboratory/orders/:id/results` - laboratoriya natijasini kiritish.
16. `/diagnostics` - diagnostika bosh sahifasi.
17. `/diagnostics/orders` - diagnostika buyurtmalari.
18. `/diagnostics/orders/:id/conclusion` - diagnostika xulosasi.
19. `/cashier` - kassa bosh sahifasi.
20. `/cashier/payments/new` - to'lov yaratish.
21. `/cashier/payments` - to'lovlar ro'yxati.
22. `/cashier/debts` - qarzdorliklar.
23. `/services` - xizmatlar ro'yxati.
24. `/services/new` - yangi xizmat yaratish.
25. `/documents` - tibbiy hujjatlar ro'yxati.
26. `/documents/templates` - hujjat shablonlari.
27. `/access/users` - foydalanuvchilar.
28. `/access/roles` - rollar.
29. `/access/permissions-matrix` - ruxsatlar matritsasi.
30. `/audit` - audit jurnali.
31. `/settings` - sozlamalar bosh sahifasi.

## 27. Keyingi bosqichga qoldiriladigan sahifalar

Quyidagi sahifalar birinchi versiyadan keyingi bosqichlarda qo'shilishi mumkin:

- Ombor va inventar sahifalari.
- Xaridlar va yetkazib beruvchilar sahifalari.
- Ish haqi sahifalari.
- Sug'urta va korporativ mijozlar sahifalari.
- Dorixona sahifalari.
- Kengaytirilgan moliyaviy hisobotlar.
- Integratsiyalar sahifalari.
- Filiallar boshqaruvi sahifalari.
- Avtomatik bildirishnomalar sahifalari.

## 28. Navigatsiya guruhlari

Asosiy menyuda sahifalarni quyidagi guruhlarga ajratish tavsiya etiladi:

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

## 29. Sahifa nomlash qoidalari

- Har bir sahifa bitta aniq vazifaga ega bo'lishi kerak.
- Ro'yxat sahifasi, yaratish sahifasi va tafsilot sahifasi aralashtirilmasligi kerak.
- Tibbiy, moliyaviy va administrativ sahifalar ruxsatlar orqali alohida nazorat qilinishi kerak.
- Bemor kartasi ko'p modul ma'lumotini ko'rsatishi mumkin, lekin boshqa modul ma'lumotlarini bevosita o'zgartirmasligi kerak.
- Dashboard sahifalari operatsiya yaratish joyi emas, umumiy ko'rish va tezkor o'tish joyi bo'lishi kerak.
- Audit sahifalari faqat ko'rish uchun bo'lishi kerak.
- Sozlamalar sahifalariga faqat yuqori ruxsatli foydalanuvchilar kira olishi kerak.

## 30. Kodda yaratilgan route holati

Hozir kodda quyidagi routelar real sahifa sifatida yaratilgan:

- `/dashboard`
- `/reception`
- `/reception/schedule`
- `/reception/appointments`
- `/reception/appointments/new`
- `/reception/appointments/:id`
- `/reception/calls`
- `/reception/no-shows`
- `/patients`
- `/patients/new`
- `/patients/:id`
- `/patients/:id/medical-history`
- `/doctor`
- `/doctor/appointments/:id`
- `/doctor/appointments/:id/finish`
- `/laboratory`
- `/laboratory/orders`
- `/laboratory/orders/:id`
- `/laboratory/orders/:id/results`
- `/diagnostics`
- `/diagnostics/orders`
- `/diagnostics/orders/:id`
- `/diagnostics/orders/:id/conclusion`
- `/cashier`
- `/cashier/payments`
- `/cashier/payments/:id`
- `/cashier/payments/new`
- `/cashier/debts`
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

Keyingi qo'shiladigan detail routelar:

- `/cashier/invoices/:id`
- `/settings/clinic`
- `/settings/working-hours`
- `/settings/payment-methods`
- `/documents/templates/:id`

Quyidagi detail routelar kodda yaratildi:

- `/laboratory/orders/:id`
- `/diagnostics/orders/:id`
- `/cashier/payments/:id`
- `/services/:id`
- `/documents/:id`
- `/access/users/:id`
- `/audit/:id`
