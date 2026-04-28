# Klinika ERP loyihasi bo'limlari va vazifalari

Ushbu hujjat klinika uchun ERP tizimida bo'lishi kerak bo'lgan asosiy bo'limlar, ularning vazifalari, chegaralari va boshqa bo'limlar bilan bog'lanishini aniqlaydi. Bu bosqichda database modellari, sahifalar, forma maydonlari va texnik arxitektura yozilmaydi. Ular keyingi bosqichlarda alohida ishlab chiqiladi.

## 1. Qabulxona va registratura

Bu bo'lim klinikaga kelgan bemor bilan birinchi aloqa nuqtasi hisoblanadi. Registratura bemorni ro'yxatdan o'tkazadi, shifokor yoki xizmatga navbatga qo'yadi, qabullar jadvalini boshqaradi va bemorni kerakli yo'nalishga yuboradi.

Asosiy vazifalar:
- Yangi bemorni ro'yxatdan o'tkazish.
- Avval ro'yxatdan o'tgan bemorni tez topish.
- Bemorning asosiy shaxsiy ma'lumotlarini yuritish.
- Shifokor, bo'lim yoki xizmat bo'yicha qabulga yozish.
- Qabul vaqtini band qilish, o'zgartirish yoki bekor qilish.
- Kunlik qabul ro'yxatini yuritish.
- Bemor kelganini belgilash.
- Bemor kelmaganini belgilash.
- Bemorni to'lovga, shifokorga, laboratoriyaga yoki diagnostikaga yo'naltirish.
- Telefon orqali yozilgan bemorlarni alohida nazorat qilish.
- Qabulxona xodimlari kesimida bajarilgan ishlarni ko'rish.

Bo'lim chegarasi:
- Registratura tibbiy tashxis qo'ymaydi.
- Registratura moliyaviy hisobot tuzmaydi, faqat to'lov jarayoniga bemorni yo'naltiradi.
- Registratura ombor, dori va laboratoriya natijalarini boshqarmaydi.

Bog'lanadigan bo'limlar:
- Bemorlar bazasi.
- Shifokor qabuli.
- Kassa va to'lovlar.
- Laboratoriya.
- Diagnostika.
- Bildirishnomalar.

## 2. Bemorlar bazasi

Bu bo'lim klinikaga murojaat qilgan barcha bemorlar haqidagi yagona ma'lumot markazi hisoblanadi. Har bir bemor bo'yicha ro'yxatga olish, murojaatlar tarixi, to'lovlar, tibbiy xizmatlar va klinika bilan bog'liq umumiy tarix shu yerda jamlanadi.

Asosiy vazifalar:
- Bemor kartasini yuritish.
- Bemorning aloqa ma'lumotlarini saqlash.
- Bemorning murojaatlar tarixini ko'rish.
- Bemor qaysi shifokorlarga kirganini ko'rish.
- Bemor olgan xizmatlar tarixini ko'rish.
- Bemor to'lovlari va qarzdorligini ko'rish.
- Bemor laboratoriya va diagnostika natijalarini umumiy tarixda bog'lab ko'rish.
- Bemor bo'yicha eslatmalar yuritish.
- Bemorni dublikat ro'yxatdan o'tkazish xavfini kamaytirish.
- Maxfiy tibbiy ma'lumotlarga kirishni rollar orqali cheklash.

Bo'lim chegarasi:
- Bu bo'lim tashxis va davolash qarorlarini yaratmaydi.
- Bu bo'lim faqat bemor bo'yicha umumiy tarixni ko'rsatadi, tibbiy bayonnomalarni shifokor bo'limi yuritadi.

Bog'lanadigan bo'limlar:
- Registratura.
- Shifokor qabuli.
- Laboratoriya.
- Diagnostika.
- Kassa va to'lovlar.
- Sug'urta va korporativ mijozlar.

## 3. Shifokor qabuli

Bu bo'lim shifokorning bemor bilan ishlash jarayonini qamrab oladi. Shifokor bemorni qabul qiladi, shikoyatlarni yozadi, ko'rik ma'lumotlarini kiritadi, tashxis belgilaydi, davolash tavsiyasini beradi va zarur bo'lsa qo'shimcha tekshiruvlarga yo'naltiradi.

Asosiy vazifalar:
- Shifokorning kunlik qabul ro'yxatini ko'rish.
- Bemor qabulini boshlash va yakunlash.
- Bemor shikoyatlarini yozish.
- Ko'rik natijalarini kiritish.
- Dastlabki va yakuniy tashxisni qayd qilish.
- Tavsiya, retsept va davolash rejasini yozish.
- Bemorni laboratoriya tahliliga yo'naltirish.
- Bemorni diagnostika tekshiruviga yo'naltirish.
- Bemorni boshqa shifokorga yo'naltirish.
- Takroriy qabul sanasini belgilash.
- Bemor tibbiy tarixini ko'rish.
- Shifokor o'z qabul statistikalarini ko'rishi.

Bo'lim chegarasi:
- Shifokor kassa operatsiyalarini amalga oshirmaydi.
- Shifokor laboratoriya natijasini o'zgartirmaydi, faqat ko'radi va izohlaydi.
- Shifokor ombor qoldiqlarini boshqarmaydi.

Bog'lanadigan bo'limlar:
- Bemorlar bazasi.
- Registratura.
- Laboratoriya.
- Diagnostika.
- Retsept va dorilar.
- Tibbiy hujjatlar.

## 4. Laboratoriya

Bu bo'lim laboratoriya tahlillari buyurtmasi, namuna qabul qilish, tahlil bajarilishi, natijani kiritish va shifokorga yetkazish jarayonlarini boshqaradi.

Asosiy vazifalar:
- Shifokor yoki registratura yuborgan laboratoriya buyurtmalarini qabul qilish.
- Namuna olinganini belgilash.
- Tahlil holatini yuritish.
- Natijalarni kiritish.
- Natijalarni tasdiqlash.
- Natijalarni bemor kartasiga bog'lash.
- Natijalarni shifokorga ko'rsatish.
- Laboratoriya ish yuklamasini ko'rish.
- Tahlillar bo'yicha narx va xizmatlar bilan bog'lanish.
- Qayta tahlil kerak bo'lgan holatlarni belgilash.
- Laboratoriya bo'yicha kunlik bajarilgan ishlar hisobotini olish.

Bo'lim chegarasi:
- Laboratoriya tashxis qo'ymaydi.
- Laboratoriya to'lovni undirmaydi, faqat xizmat bajarilganini bildiradi.
- Laboratoriya shifokor bayonnomasini o'zgartirmaydi.

Bog'lanadigan bo'limlar:
- Shifokor qabuli.
- Registratura.
- Bemorlar bazasi.
- Kassa va to'lovlar.
- Xizmatlar katalogi.
- Tibbiy hujjatlar.

## 5. Diagnostika va instrumental tekshiruvlar

Bu bo'lim UZI, rentgen, EKG, MRT, KT, endoskopiya va boshqa instrumental tekshiruvlarni rejalash, bajarish va natija berish jarayonlarini qamrab oladi.

Asosiy vazifalar:
- Diagnostika tekshiruvlariga yo'llanmalarni qabul qilish.
- Uskuna yoki mutaxassis bo'yicha vaqt band qilish.
- Tekshiruv boshlanganini va yakunlanganini belgilash.
- Diagnostika xulosasini kiritish.
- Fayl, rasm yoki skan natijalarini bog'lash.
- Natijani shifokorga yuborish.
- Diagnostika bo'yicha navbatni boshqarish.
- Uskunalar bandligini ko'rish.
- Tekshiruvni qayta bajarish yoki bekor qilish sababini yozish.
- Diagnostika xizmatlari bo'yicha ish hajmini tahlil qilish.

Bo'lim chegarasi:
- Diagnostika bo'limi umumiy davolash rejasini yuritmaydi.
- Diagnostika xulosasi shifokor tashxisi o'rnini bosmaydi.
- Diagnostika bo'limi kassa va qarzdorlikni boshqarmaydi.

Bog'lanadigan bo'limlar:
- Shifokor qabuli.
- Registratura.
- Bemorlar bazasi.
- Kassa va to'lovlar.
- Xizmatlar katalogi.
- Tibbiy hujjatlar.

## 6. Kassa va to'lovlar

Bu bo'lim klinikadagi barcha pul tushumlari, to'lov holatlari, qarzdorlik, chegirmalar va qaytarimlarni boshqaradi. Kassa bemor qaysi xizmat uchun qancha to'lagani va xizmat bajarilishiga ruxsat bor-yo'qligini aniqlaydi.

Asosiy vazifalar:
- Bemor uchun to'lov hisobini shakllantirish.
- Xizmatlar bo'yicha to'lov qabul qilish.
- Naqd, karta, bank o'tkazmasi va boshqa to'lov usullarini ajratish.
- Qisman to'lovni yuritish.
- Qarzdorlikni ko'rsatish.
- Chegirma qo'llash.
- To'lovni bekor qilish yoki qaytarish jarayonini nazorat qilish.
- Kunlik kassa yopilishini yuritish.
- Kassir kesimida tushumlarni ko'rish.
- Xizmat bajarilishidan oldin to'lov talab qilinadimi yoki keyinmi, shu tartibni qo'llash.
- Korporativ yoki sug'urta orqali to'lovlarni alohida yuritish.

Bo'lim chegarasi:
- Kassa tibbiy xizmat mazmunini o'zgartirmaydi.
- Kassa tashxis, natija yoki shifokor yozuvlariga aralashmaydi.
- Kassa xizmat narxlarini faqat ruxsat berilgan rol orqali o'zgartirishi mumkin.

Bog'lanadigan bo'limlar:
- Registratura.
- Bemorlar bazasi.
- Xizmatlar katalogi.
- Laboratoriya.
- Diagnostika.
- Sug'urta va korporativ mijozlar.
- Moliyaviy hisobotlar.

## 7. Xizmatlar katalogi va narxlar

Bu bo'lim klinikada ko'rsatiladigan barcha xizmatlar, paketlar, narxlar, chegirmalar va xizmat kategoriyalarini boshqaradi.

Asosiy vazifalar:
- Xizmatlar ro'yxatini yuritish.
- Xizmat kategoriyalarini belgilash.
- Har bir xizmat narxini saqlash.
- Narx o'zgarish tarixini yuritish.
- Xizmat faol yoki nofaol ekanini belgilash.
- Paket xizmatlar yaratish.
- Chegirma qo'llanish qoidalarini belgilash.
- Laboratoriya, diagnostika va shifokor qabuli xizmatlarini yagona katalogda yuritish.
- Xizmat bajarilishi uchun to'lov sharti bor-yo'qligini belgilash.

Bo'lim chegarasi:
- Bu bo'lim to'lov qabul qilmaydi.
- Bu bo'lim xizmat natijasini kiritmaydi.
- Bu bo'lim bemorni navbatga yozmaydi.

Bog'lanadigan bo'limlar:
- Kassa va to'lovlar.
- Registratura.
- Laboratoriya.
- Diagnostika.
- Shifokor qabuli.
- Hisobotlar.

## 8. Ombor va inventar

Bu bo'lim klinikadagi dori vositalari, sarflanadigan materiallar, laboratoriya reagentlari, tibbiy jihozlar va boshqa ombor qoldiqlarini boshqaradi.

Asosiy vazifalar:
- Ombor qoldiqlarini yuritish.
- Kirim va chiqim operatsiyalarini qayd qilish.
- Materiallar sarfini bo'limlar kesimida ko'rish.
- Minimal qoldiq chegarasini belgilash.
- Yaroqlilik muddati tugayotgan mahsulotlarni aniqlash.
- Partiya bo'yicha hisob yuritish.
- Inventarizatsiya o'tkazish.
- Omborlar yoki bo'limlar o'rtasida ko'chirishni yuritish.
- Laboratoriya reagentlari sarfini nazorat qilish.
- Diagnostika va davolash materiallari sarfini nazorat qilish.
- Xaridga ehtiyoj ro'yxatini shakllantirish.

Bo'lim chegarasi:
- Ombor bemor qabulini boshqarmaydi.
- Ombor moliyaviy tushumlarni hisoblamaydi.
- Ombor shifokor tashxisiga aralashmaydi.

Bog'lanadigan bo'limlar:
- Xaridlar.
- Laboratoriya.
- Diagnostika.
- Shifokor qabuli.
- Moliyaviy hisobotlar.

## 9. Xaridlar va ta'minot

Bu bo'lim klinikaga kerakli dori, material, reagent, jihoz va boshqa resurslarni xarid qilish jarayonini boshqaradi.

Asosiy vazifalar:
- Xarid ehtiyojlarini yig'ish.
- Yetkazib beruvchilar ro'yxatini yuritish.
- Buyurtma yaratish.
- Buyurtma holatini kuzatish.
- Kelgan mahsulotni omborga qabul qilishga tayyorlash.
- Xarid narxlarini taqqoslash.
- Yetkazib beruvchi qarzdorliklarini ko'rish.
- Qaytarilgan yoki yaroqsiz mahsulotlarni belgilash.
- Xaridlar bo'yicha rahbariyat tasdig'ini yuritish.

Bo'lim chegarasi:
- Xaridlar tibbiy xizmat ko'rsatmaydi.
- Xaridlar ombor qoldig'ini hisobga oladi, lekin inventarizatsiyani ombor bo'limi yuritadi.
- Xaridlar bemor to'lovlariga aralashmaydi.

Bog'lanadigan bo'limlar:
- Ombor va inventar.
- Moliyaviy hisobotlar.
- Yetkazib beruvchilar.
- Rahbariyat tasdiqlari.

## 10. Xodimlar va kadrlar

Bu bo'lim klinika xodimlari, ularning lavozimi, ish grafigi, bo'limi, malakasi va faoliyat holatini boshqaradi.

Asosiy vazifalar:
- Xodimlar ro'yxatini yuritish.
- Lavozim va bo'lim biriktirish.
- Ish grafigini belgilash.
- Shifokorlarning qabul vaqtlari bilan bog'lash.
- Ta'til, kasallik varaqasi va ishga chiqmagan kunlarni yuritish.
- Xodim faol yoki nofaol ekanini belgilash.
- Xodim hujjatlari va sertifikatlarini nazorat qilish.
- Xodimlar bo'yicha ish yuklamasini ko'rish.
- Kadrlar bo'yicha ichki eslatmalar yuritish.

Bo'lim chegarasi:
- Bu bo'lim ish haqi hisoblash qoidalarini to'liq bajarmaydi, bu ish haqi bo'limida yuritiladi.
- Bu bo'lim bemor tibbiy ma'lumotlarini boshqarmaydi.

Bog'lanadigan bo'limlar:
- Shifokor qabuli.
- Registratura.
- Ish haqi.
- Rollar va ruxsatlar.
- Hisobotlar.

## 11. Ish haqi va motivatsiya

Bu bo'lim xodimlarga beriladigan oylik, foiz, bonus, jarima va boshqa to'lovlarni hisoblash uchun ishlatiladi.

Asosiy vazifalar:
- Xodim ish haqi turini belgilash.
- Shifokor foizlarini xizmatlar bo'yicha hisoblash.
- Laboratoriya yoki diagnostika xodimlari uchun ish hajmiga qarab hisoblash.
- Belgilangan oylik va qo'shimcha bonuslarni yuritish.
- Jarima yoki ushlanmalarni qayd qilish.
- Davr bo'yicha hisob-kitob qilish.
- To'langan va to'lanmagan ish haqini ajratish.
- Xodim kesimida daromad va to'lov tarixini ko'rish.
- Rahbariyat tasdig'idan o'tkazish.

Bo'lim chegarasi:
- Ish haqi bo'limi bemor to'lovini qabul qilmaydi.
- Ish haqi bo'limi tibbiy yozuvlarni o'zgartirmaydi.
- Ish haqi hisoblash uchun xizmat bajarilganligi va to'lov holatidan foydalanadi.

Bog'lanadigan bo'limlar:
- Xodimlar va kadrlar.
- Kassa va to'lovlar.
- Xizmatlar katalogi.
- Shifokor qabuli.
- Laboratoriya.
- Diagnostika.
- Moliyaviy hisobotlar.

## 12. Moliyaviy hisobotlar

Bu bo'lim klinikaning daromadlari, xarajatlari, qarzdorliklari, foydasi va pul oqimini tahlil qilish uchun xizmat qiladi.

Asosiy vazifalar:
- Kunlik, haftalik, oylik tushumlarni ko'rsatish.
- To'lov usullari bo'yicha tushumni ajratish.
- Xizmatlar bo'yicha daromadni ko'rsatish.
- Shifokorlar bo'yicha daromadni ko'rsatish.
- Bo'limlar bo'yicha daromad va xarajatni ko'rsatish.
- Qarzdor bemorlar ro'yxatini ko'rsatish.
- Sug'urta va korporativ mijozlar bo'yicha qarzdorlikni ko'rsatish.
- Xarid va ombor xarajatlarini tahlil qilish.
- Ish haqi xarajatlarini ko'rsatish.
- Sof foyda tahlilini chiqarish.
- Kassa yopilishi va real tushum orasidagi farqni aniqlash.

Bo'lim chegarasi:
- Hisobotlar birlamchi operatsiyalarni yaratmaydi.
- Hisobotlar tibbiy natijalarni o'zgartirmaydi.
- Hisobotlar faqat mavjud ma'lumotlardan tahlil chiqaradi.

Bog'lanadigan bo'limlar:
- Kassa va to'lovlar.
- Xizmatlar katalogi.
- Ombor va inventar.
- Xaridlar.
- Ish haqi.
- Sug'urta va korporativ mijozlar.

## 13. Sug'urta va korporativ mijozlar

Bu bo'lim sug'urta kompaniyalari, tashkilotlar, shartnoma asosidagi korporativ mijozlar va ularning xodimlariga ko'rsatilgan xizmatlarni boshqaradi.

Asosiy vazifalar:
- Korporativ mijozlar ro'yxatini yuritish.
- Sug'urta kompaniyalarini yuritish.
- Shartnoma shartlarini belgilash.
- Korporativ mijozga biriktirilgan bemorlarni ko'rish.
- Limit, paket yoki chegirma asosida xizmat ko'rsatishni nazorat qilish.
- Korporativ hisob-kitoblarni alohida yuritish.
- Sug'urta tasdig'i talab qilinadigan xizmatlarni belgilash.
- Sug'urta yoki tashkilot bo'yicha qarzdorlikni ko'rish.
- Davr yakunida hisob-faktura uchun ma'lumot tayyorlash.

Bo'lim chegarasi:
- Bu bo'lim bemorning tibbiy qarorini bermaydi.
- Bu bo'lim kassa tushumini o'zi qabul qilmaydi.
- Bu bo'lim faqat shartnoma va hisob-kitob tartibini boshqaradi.

Bog'lanadigan bo'limlar:
- Bemorlar bazasi.
- Registratura.
- Kassa va to'lovlar.
- Xizmatlar katalogi.
- Moliyaviy hisobotlar.

## 14. Tibbiy hujjatlar

Bu bo'lim klinikada shakllanadigan tibbiy hujjatlar, ma'lumotnomalar, xulosalar, yo'llanmalar va bosma shakllarni boshqaradi.

Asosiy vazifalar:
- Shifokor xulosalarini hujjat ko'rinishida tayyorlash.
- Laboratoriya natijalarini hujjat ko'rinishida chiqarish.
- Diagnostika xulosalarini hujjat ko'rinishida chiqarish.
- Retsept va tavsiyalarni hujjat sifatida tayyorlash.
- Ma'lumotnoma va yo'llanmalar yaratish.
- Hujjatlarni bemor kartasiga bog'lash.
- Hujjatlarni chop etish yoki elektron yuborishga tayyorlash.
- Hujjat shablonlarini boshqarish.
- Hujjatga kim va qachon o'zgartirish kiritganini nazorat qilish.

Bo'lim chegarasi:
- Bu bo'lim tibbiy qaror qabul qilmaydi.
- Bu bo'lim faqat boshqa bo'limlarda kiritilgan ma'lumotlar asosida hujjat shakllantiradi.

Bog'lanadigan bo'limlar:
- Shifokor qabuli.
- Laboratoriya.
- Diagnostika.
- Bemorlar bazasi.
- Retsept va dorilar.

## 15. Retsept va dorilar

Bu bo'lim shifokor tomonidan bemorga beriladigan dori tavsiyalari, qabul qilish tartibi va davolash rejasi bilan bog'liq jarayonlarni yuritadi.

Asosiy vazifalar:
- Retsept yaratish.
- Dori nomi, miqdori va qabul qilish tartibini yozish.
- Davolash davomiyligini belgilash.
- Bemor uchun tavsiyalarni saqlash.
- Retseptni tibbiy hujjat sifatida chiqarish.
- Takroriy retsept tarixini ko'rish.
- Klinikada ichki dorixona bo'lsa, dorilar mavjudligi bilan bog'lash.

Bo'lim chegarasi:
- Bu bo'lim tashxisni alohida yuritmaydi.
- Bu bo'lim ombor kirim-chiqimini to'liq boshqarmaydi.
- Bu bo'lim dorixona savdosini faqat alohida dorixona moduli mavjud bo'lsa bog'laydi.

Bog'lanadigan bo'limlar:
- Shifokor qabuli.
- Bemorlar bazasi.
- Tibbiy hujjatlar.
- Ombor va inventar.

## 16. Dorixona

Klinika ichida dorixona mavjud bo'lsa, bu bo'lim dori savdosi, dorixona qoldiqlari va bemorga dori berish jarayonlarini boshqaradi.

Asosiy vazifalar:
- Dorixona mahsulotlari ro'yxatini yuritish.
- Dori qoldiqlarini ko'rish.
- Dori savdosini amalga oshirish.
- Retsept asosida dori berishni qo'llab-quvvatlash.
- Yaroqlilik muddatini nazorat qilish.
- Partiya bo'yicha hisob yuritish.
- Qaytarimlarni yuritish.
- Dorixona tushumini alohida ko'rsatish.
- Dorixona ombori va umumiy ombor o'rtasidagi bog'lanishni yuritish.

Bo'lim chegarasi:
- Dorixona shifokor tashxisini o'zgartirmaydi.
- Dorixona klinika xizmatlari narxlarini boshqarmaydi.
- Dorixona umumiy kassa bilan integratsiya qilinadi, lekin tibbiy xizmat jarayonini boshqarmaydi.

Bog'lanadigan bo'limlar:
- Retsept va dorilar.
- Kassa va to'lovlar.
- Ombor va inventar.
- Moliyaviy hisobotlar.

## 17. Navbat va ish oqimi boshqaruvi

Bu bo'lim klinika ichidagi bemor harakatini bosqichma-bosqich kuzatadi: ro'yxatdan o'tdi, to'lov qildi, shifokorga kirdi, laboratoriyaga o'tdi, natija tayyor, qabul yakunlandi kabi holatlar.

Asosiy vazifalar:
- Bemorning hozirgi holatini ko'rsatish.
- Bemor qaysi bo'limda kutayotganini ko'rsatish.
- Navbatdagi bemorlarni tartiblash.
- Shifokor, laboratoriya va diagnostika bo'yicha ish oqimini ko'rsatish.
- Kechikayotgan jarayonlarni aniqlash.
- Bemorni keyingi bosqichga o'tkazish.
- Bekor qilingan yoki to'xtatilgan jarayonlarni belgilash.
- Klinikadagi real vaqt yuklamasini ko'rsatish.

Bo'lim chegarasi:
- Bu bo'lim tibbiy ma'lumot yaratmaydi.
- Bu bo'lim to'lov qabul qilmaydi.
- Bu bo'lim faqat jarayon holatini boshqaradi.

Bog'lanadigan bo'limlar:
- Registratura.
- Kassa va to'lovlar.
- Shifokor qabuli.
- Laboratoriya.
- Diagnostika.

## 18. Bildirishnomalar va eslatmalar

Bu bo'lim bemorlar va xodimlarga SMS, telefon, email yoki ichki tizim orqali eslatma va xabarlar yuborishni boshqaradi.

Asosiy vazifalar:
- Qabul vaqti haqida bemorga eslatma yuborish.
- Tahlil natijasi tayyor bo'lganini bildirish.
- Takroriy qabul haqida eslatish.
- Qarzdorlik haqida xabar berish.
- Xodimlarga ichki vazifa yoki eslatma yuborish.
- Yuborilgan xabarlar tarixini saqlash.
- Xabar shablonlarini yuritish.
- Avtomatik va qo'lda yuboriladigan xabarlarni ajratish.

Bo'lim chegarasi:
- Bildirishnoma bo'limi qabul yaratmaydi.
- Bildirishnoma bo'limi to'lov yoki tibbiy ma'lumotni o'zgartirmaydi.
- Maxfiy tibbiy ma'lumotlarni xabarda yuborish rollar va siyosat bilan cheklanadi.

Bog'lanadigan bo'limlar:
- Registratura.
- Bemorlar bazasi.
- Shifokor qabuli.
- Laboratoriya.
- Diagnostika.
- Kassa va to'lovlar.

## 19. Rollar va ruxsatlar

Bu bo'lim tizimga kiruvchi foydalanuvchilar, ularning rollari, ruxsatlari va ko'rishi yoki bajarishi mumkin bo'lgan amallarni boshqaradi.

Asosiy vazifalar:
- Foydalanuvchi rollarini belgilash.
- Har bir rolga ruxsatlar berish.
- Bo'limlar kesimida kirishni cheklash.
- Maxfiy tibbiy ma'lumotlarga kirishni nazorat qilish.
- Moliyaviy ma'lumotlarga kirishni cheklash.
- O'chirish, o'zgartirish va tasdiqlash amallarini alohida ruxsat bilan boshqarish.
- Foydalanuvchi faol yoki bloklangan ekanini belgilash.
- Tizimga kirish xavfsizligini nazorat qilish.

Bo'lim chegarasi:
- Bu bo'lim biznes jarayonni bajarmaydi.
- Bu bo'lim faqat foydalanuvchi nima qila olishini boshqaradi.

Bog'lanadigan bo'limlar:
- Barcha bo'limlar.
- Audit jurnali.
- Xodimlar va kadrlar.

## 20. Audit jurnali

Bu bo'lim tizimda kim, qachon, qaysi amalni bajarganini yozib boradi. Klinikada moliyaviy va tibbiy ma'lumotlar sezgir bo'lgani uchun audit majburiy bo'lishi kerak.

Asosiy vazifalar:
- Muhim amallar tarixini saqlash.
- Kim ma'lumot yaratgani, o'zgartirgani yoki o'chirganini ko'rsatish.
- To'lov o'zgarishlarini kuzatish.
- Tibbiy yozuvlardagi o'zgarishlarni kuzatish.
- Ruxsatlar o'zgarishini kuzatish.
- Bekor qilingan qabul, to'lov yoki xizmatlarni sabab bilan ko'rsatish.
- Shubhali faoliyatni aniqlashga yordam berish.

Bo'lim chegarasi:
- Audit jurnali ma'lumotni o'zi o'zgartirmaydi.
- Audit jurnali hisobot emas, lekin hisobotlar uchun tekshiruv manbasi bo'lishi mumkin.

Bog'lanadigan bo'limlar:
- Rollar va ruxsatlar.
- Kassa va to'lovlar.
- Shifokor qabuli.
- Laboratoriya.
- Diagnostika.
- Xizmatlar katalogi.

## 21. Sozlamalar

Bu bo'lim klinika tizimining umumiy ishlash qoidalari, filiallar, ish vaqti, valyuta, til, printer, hujjat shablonlari va boshqa konfiguratsiyalarini boshqaradi.

Asosiy vazifalar:
- Klinika umumiy ma'lumotlarini yuritish.
- Filiallar mavjud bo'lsa, ularni boshqarish.
- Ish vaqti va dam olish kunlarini belgilash.
- To'lov usullarini sozlash.
- Hujjat shablonlarini sozlash.
- Xabar shablonlarini sozlash.
- Tizim tilini va umumiy ko'rinish sozlamalarini belgilash.
- Qabul, to'lov va xizmat bajarilishi bo'yicha asosiy qoidalarni belgilash.
- Integratsiyalar uchun asosiy sozlamalarni yuritish.

Bo'lim chegarasi:
- Sozlamalar kundalik operatsiyalarni bajarmaydi.
- Sozlamalarga kirish faqat yuqori ruxsatli foydalanuvchilarga berilishi kerak.

Bog'lanadigan bo'limlar:
- Barcha bo'limlar.
- Rollar va ruxsatlar.
- Bildirishnomalar.
- Tibbiy hujjatlar.

## 22. Rahbariyat paneli

Bu bo'lim klinika egasi yoki boshqaruvchilari uchun umumiy boshqaruv ko'rinishi hisoblanadi. Unda klinikaning ish holati, tushumi, bemorlar oqimi, shifokorlar samaradorligi va muammoli nuqtalar ko'rinadi.

Asosiy vazifalar:
- Bugungi bemorlar sonini ko'rsatish.
- Bugungi tushumni ko'rsatish.
- Qarzdorlik miqdorini ko'rsatish.
- Eng ko'p ishlatilgan xizmatlarni ko'rsatish.
- Shifokorlar bo'yicha qabul va daromadni ko'rsatish.
- Laboratoriya va diagnostika yuklamasini ko'rsatish.
- Kassa holatini ko'rsatish.
- Omborda tugab borayotgan mahsulotlarni ko'rsatish.
- Xodimlar ish yuklamasini ko'rsatish.
- Rahbariyat uchun tezkor ogohlantirishlarni ko'rsatish.

Bo'lim chegarasi:
- Rahbariyat paneli ma'lumotni umumlashtiradi.
- Paneldan bevosita ma'lumot o'zgartirish faqat alohida ruxsat bilan bo'lishi kerak.

Bog'lanadigan bo'limlar:
- Kassa va to'lovlar.
- Registratura.
- Shifokor qabuli.
- Laboratoriya.
- Diagnostika.
- Ombor va inventar.
- Moliyaviy hisobotlar.
- Xodimlar va kadrlar.

## 23. Integratsiyalar

Bu bo'lim ERP tizimini tashqi xizmatlar bilan bog'lash uchun kerak bo'ladi. Masalan, SMS provayder, to'lov tizimi, laboratoriya uskunasi, elektron pochta, fiskal chek yoki davlat tizimlari bilan integratsiya.

Asosiy vazifalar:
- SMS xizmati bilan ulanish.
- To'lov tizimlari bilan ulanish.
- Email xabarnomalari bilan ulanish.
- Fiskal chek yoki onlayn kassa bilan ulanish.
- Laboratoriya yoki diagnostika uskunalaridan natija olish imkoniyatini tayyorlash.
- Tashqi APIlar holatini nazorat qilish.
- Integratsiya xatolarini qayd qilish.
- Qayta yuborish yoki qayta sinash mexanizmini yuritish.

Bo'lim chegarasi:
- Integratsiya bo'limi biznes qaror qabul qilmaydi.
- Integratsiya faqat mavjud jarayonlarni tashqi tizimlar bilan bog'laydi.

Bog'lanadigan bo'limlar:
- Bildirishnomalar.
- Kassa va to'lovlar.
- Laboratoriya.
- Diagnostika.
- Tibbiy hujjatlar.
- Sozlamalar.

## 24. Filiallar boshqaruvi

Klinika bir nechta filial bilan ishlasa, bu bo'lim filiallar kesimida qabul, xodim, ombor, kassa va hisobotlarni ajratib yuritish uchun kerak bo'ladi.

Asosiy vazifalar:
- Filiallar ro'yxatini yuritish.
- Xodimni filialga biriktirish.
- Shifokor qabul jadvalini filial bo'yicha ajratish.
- Kassa tushumlarini filial bo'yicha ko'rish.
- Ombor qoldiqlarini filial bo'yicha yuritish.
- Bemor qaysi filialda xizmat olganini ko'rsatish.
- Filiallar kesimida hisobot chiqarish.
- Filiallar o'rtasida material ko'chirishni qo'llab-quvvatlash.

Bo'lim chegarasi:
- Agar klinika bitta manzilda ishlasa, bu bo'lim keyingi bosqichga qoldirilishi mumkin.
- Filiallar bo'limi tibbiy jarayonni o'zi bajarmaydi, faqat ma'lumotlarni filial kesimida ajratadi.

Bog'lanadigan bo'limlar:
- Registratura.
- Xodimlar va kadrlar.
- Kassa va to'lovlar.
- Ombor va inventar.
- Moliyaviy hisobotlar.
- Sozlamalar.

## Birinchi versiya uchun tavsiya etilgan minimal bo'limlar

ERPni birinchi ishlaydigan versiyada haddan tashqari kattalashtirmaslik uchun quyidagi bo'limlar birinchi navbatda ishlab chiqilishi kerak:

1. Bemorlar bazasi.
2. Registratura va qabulga yozish.
3. Shifokor qabuli.
4. Xizmatlar katalogi va narxlar.
5. Kassa va to'lovlar.
6. Laboratoriya.
7. Diagnostika.
8. Tibbiy hujjatlar.
9. Rollar va ruxsatlar.
10. Audit jurnali.
11. Rahbariyat panelining boshlang'ich ko'rinishi.

Keyingi bosqichga qoldirish mumkin bo'lgan bo'limlar:
- Ombor va inventar.
- Xaridlar va ta'minot.
- Ish haqi va motivatsiya.
- Sug'urta va korporativ mijozlar.
- Dorixona.
- Integratsiyalar.
- Filiallar boshqaruvi.

## Muhim biznes qoidalar

- Bemor klinikada yagona karta orqali yuritilishi kerak.
- Har bir qabul aniq shifokor, vaqt va holatga ega bo'lishi kerak.
- To'lovlar xizmatlar bilan bog'langan bo'lishi kerak.
- Tibbiy yozuvlar moliyaviy yozuvlardan ajratilgan bo'lishi kerak.
- Har bir muhim o'zgarish audit jurnaliga tushishi kerak.
- Rollar bo'yicha ruxsatlar boshidan to'g'ri ajratilishi kerak.
- Laboratoriya va diagnostika natijalari shifokor ko'rishi uchun bemor tarixiga bog'lanishi kerak.
- Kassa bekor qilish va qaytarim amallari sabab bilan yuritilishi kerak.
- Xizmat narxi o'zgarsa, eski to'lovlar buzilmasligi kerak.
- Bemor maxfiy ma'lumotlari faqat ruxsatli xodimlarga ko'rinishi kerak.

## Keyingi bosqichda alohida ishlab chiqiladigan ishlar

Bu hujjatdan keyin quyidagi hujjatlar yoki texnik ishlar alohida tayyorlanadi:

- Har bir bo'lim uchun aniq workflow.
- Har bir bo'lim uchun kerakli database modellari.
- Har bir bo'lim uchun sahifalar va navigatsiya.
- Har bir rol uchun ruxsatlar matritsasi.
- Har bir jarayon uchun statuslar ro'yxati.
- Hisobotlar formulasi va filtrlar ro'yxati.
- API endpointlar va backend logikasi.
- UI komponentlar va forma maydonlari.
- Test ssenariylari.
