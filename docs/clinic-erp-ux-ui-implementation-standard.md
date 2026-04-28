# Klinika ERP UX/UI implementation standarti

Ushbu hujjat sahifalarni yozishni boshlashdan oldin UI kutubxona, UX patternlar, jadval zichligi, forma tuzilishi, statuslar, navigatsiya va komponentlardan foydalanish qoidalarini belgilaydi.

## 1. Asosiy qaror

Klinika ERP uchun asosiy UI kutubxona:

**Ant Design v5**

Sabablar:
- ERP, CRM, admin panel va ichki operatsion tizimlar uchun tayyor komponentlari kuchli.
- Zich jadval, filter, form, modal, drawer, tabs, date picker, select, upload, badge, tag va notification komponentlari bor.
- Form validation va murakkab forma layoutlari uchun qulay.
- Jadval sahifalarida fixed column, scroll, pagination, sorter, filter va expandable row patternlari yaxshi.
- Klinika ERPda sahifalar ko'p va ma'lumot zich, shuning uchun komponentlarni noldan yasash vaqtni ko'p oladi.

Ishlatilmaydi:
- **shadcn/ui** asosiy UI kutubxona sifatida ishlatilmaydi.

Sabab:
- Bu loyiha siyrak profile/dashboard emas, zich ma'lumotli klinika ERP.
- Jadval, filter, forma, drawer, bulk action va operatsion workflowlar ko'p.
- shadcn chiroyli oddiy ekranlar uchun yaxshi, lekin bu loyiha uchun ko'p enterprise komponentlarni qo'lda yig'ishga majbur qiladi.

## 2. Qo'shimcha kutubxonalar

MVP uchun:
- `antd` - asosiy UI komponentlar.
- `@ant-design/icons` - iconlar.
- `@ant-design/v5-patch-for-react-19` - React 19 compatibility uchun.
- `dayjs` - sana formatlash.

Keyingi bosqichda kerak bo'lishi mumkin:
- `@tanstack/react-table` - agar Ant Design Table yetmaydigan custom data grid kerak bo'lsa.
- `@tanstack/react-query` - backend ulanganda server state uchun.
- `ag-grid-community` yoki `ag-grid-react` - juda katta dataset, pivot, column grouping, Excelga yaqin grid kerak bo'lsa.
- `recharts` yoki `@ant-design/charts` - hisobot grafiklari kerak bo'lsa.

## 3. Jadval strategiyasi

Default tanlov:

**Ant Design Table**

Ishlatiladigan joylar:
- Bemorlar ro'yxati.
- Qabullar ro'yxati.
- To'lovlar ro'yxati.
- Laboratoriya orderlari.
- Diagnostika orderlari.
- Xizmatlar katalogi.
- Foydalanuvchilar.
- Audit.
- Hisobotlarning oddiy jadvallari.

Ant Design Table uchun standartlar:
- `size="small"` ishlatiladi.
- Kerakli joylarda horizontal scroll ishlatiladi.
- Birinchi ustunlar fixed bo'lishi mumkin.
- Statuslar `Tag` bilan chiqadi.
- Actionlar oxirgi ustunda bo'ladi.
- Jadval tepasida filter bar bo'ladi.
- Pagination pastda bo'ladi.
- Har bir jadvalda empty state bo'ladi.

TanStack Table qachon ishlatiladi:
- Agar jadval UI to'liq custom bo'lishi kerak bo'lsa.
- Agar column visibility, advanced grouping, custom row model, maxsus keyboard behavior kerak bo'lsa.
- Agar Ant Design Table performance yoki API jihatdan yetmasa.

AG Grid qachon ishlatiladi:
- 10 minglab qator bilan ishlash kerak bo'lsa.
- Excelga o'xshash grid kerak bo'lsa.
- Pivot, column grouping, complex aggregation kerak bo'lsa.
- Ombor, moliyaviy hisobot yoki katta laboratoriya datasetlarida AntD yetmasa.

MVPda AG Grid ishlatilmaydi.

## 4. Layout strategiyasi

Asosiy layout:
- Chap sidebar.
- Yuqori topbar.
- Markazda kontent.
- Sahifa header.
- KPI kartalar.
- Filter bar.
- Jadval yoki forma.

Ant Design komponentlari:
- `Layout`
- `Menu`
- `Breadcrumb`
- `Button`
- `Card`
- `Table`
- `Form`
- `Input`
- `Select`
- `DatePicker`
- `TimePicker`
- `Tabs`
- `Tag`
- `Badge`
- `Modal`
- `Drawer`
- `Dropdown`
- `Tooltip`
- `Alert`
- `Descriptions`
- `Steps`
- `Timeline`
- `Statistic`
- `Upload`
- `Pagination`

## 5. Sahifa patternlari

### 5.1. Ro'yxat sahifasi

Tuzilma:
- Header.
- Primary action.
- KPI kartalar, kerak bo'lsa.
- Filter bar.
- Data table.

Komponentlar:
- `Card`
- `Space`
- `Input.Search`
- `Select`
- `DatePicker.RangePicker`
- `Table`
- `Tag`
- `Dropdown`
- `Button`

Misollar:
- `/patients`
- `/reception/appointments`
- `/cashier/payments`
- `/laboratory/orders`
- `/diagnostics/orders`

### 5.2. Yaratish/tahrirlash sahifasi

Tuzilma:
- Header.
- Form sections.
- Sticky footer actions.

Komponentlar:
- `Form`
- `Input`
- `Select`
- `DatePicker`
- `TimePicker`
- `Input.TextArea`
- `Card`
- `Divider`
- `Button`
- `Alert`

Misollar:
- `/patients/new`
- `/reception/appointments/new`
- `/cashier/payments/new`
- `/services/new`

### 5.3. Tafsilot sahifasi

Tuzilma:
- Entity header.
- Status va quick actions.
- Tabs.
- Summary cards.
- Related tables.
- Timeline.

Komponentlar:
- `Descriptions`
- `Tabs`
- `Table`
- `Timeline`
- `Tag`
- `Button`
- `Dropdown`
- `Card`

Misollar:
- `/patients/:id`
- `/reception/appointments/:id`
- `/cashier/payments/:id`

### 5.4. Ish stoli sahifasi

Tuzilma:
- Rol uchun KPI.
- Bugungi ish ro'yxati.
- Tezkor actionlar.
- Status bo'yicha segmentlar.

Komponentlar:
- `Statistic`
- `Segmented`
- `Table`
- `List`
- `Badge`
- `Button`

Misollar:
- `/doctor`
- `/reception`
- `/cashier`
- `/laboratory`

## 6. Density standarti

ERP zich ma'lumot bilan ishlaydi. Shuning uchun:

- Jadval `small` size.
- Card padding kamroq.
- Sahifa ichida ortiqcha bo'sh joy bo'lmaydi.
- KPI kartalar ixcham.
- Formlar ikki yoki uch ustunli bo'lishi mumkin.
- Uzun formalar sectionlarga bo'linadi.
- Katta decorative elementlar ishlatilmaydi.

Taqiqlanadi:
- Katta hero bloklar.
- Juda katta cardlar.
- Bir sahifada keraksiz illustration.
- Marketing landing page uslubi.
- Juda ko'p gradient.
- Juda katta fontlar.

## 7. Rang va status standarti

Asosiy rang:
- Primary: klinikaga mos sokin teal yoki blue.
- Background: och neytral.
- Text: to'q neytral.

Status ranglari:
- `ACTIVE`, `COMPLETED`, `PAID`, `APPROVED` - green.
- `WAITING`, `SCHEDULED`, `ISSUED`, `DRAFT` - blue.
- `IN_PROGRESS`, `PARTIALLY_PAID` - cyan yoki processing.
- `WAITING_PAYMENT`, `OVERDUE`, `NO_SHOW` - orange.
- `CANCELLED`, `REJECTED`, `FAILED`, `REFUNDED` - red.
- `LOCKED`, `ARCHIVED` - gray.

Ant Design komponentlari:
- `Tag`
- `Badge`
- `Alert`
- `Result`

## 8. Form UX standarti

Formlar:
- Majburiy maydonlar aniq ko'rsatiladi.
- Xatolik field yonida chiqadi.
- Selectlar qidiruvli bo'lishi kerak, agar ro'yxat uzun bo'lsa.
- Sana va vaqt uchun `DatePicker` va `TimePicker`.
- Telefon input formatlash keyingi bosqichda qo'shiladi.
- Katta tibbiy matnlar uchun `TextArea`.
- Pul qiymatlari uchun formatter ishlatiladi.

Saqlash actionlari:
- `Saqlash`
- `Saqlash va davom etish`
- `Saqlash va chop etish`
- `Bekor qilish`

Xavfli actionlar:
- Bekor qilish, qaytarim, o'chirish va lock qilish `Modal.confirm` orqali sabab so'rashi kerak.

## 9. Filter UX standarti

Ro'yxat sahifalarda filter bar quyidagicha bo'ladi:

- Qidiruv input.
- Status select.
- Sana oralig'i.
- Modulga xos filterlar.
- `Filterlarni tozalash` action.

Filter joylashuvi:
- Jadval tepasida.
- Bir qatorga sig'masa responsive wrap.
- Advanced filter kerak bo'lsa `Drawer` ishlatiladi.

## 10. Action UX standarti

Actionlar 3 turga bo'linadi:

Primary action:
- Sahifa boshida.
- Faqat bitta asosiy action.
- Masalan: `Yangi bemor`, `Yangi qabul`, `To'lov yaratish`.

Row action:
- Jadval satrida.
- Operatsion jadvallarda satr foydalanuvchini keyingi ishga majburlashi kerak.
- Har satrda faqat bitta asosiy `Keyingi amal` ko'rinadi.
- Ikkilamchi actionlar `Dropdown` ichida yashiriladi.
- Detail/ko'rish linki workflow uchun zarur bo'lmasa secondary rangda yoki dropdown ichida turadi.
- Completed, cancelled, refunded kabi yopilgan holatlarda primary action ko'rsatilmaydi.
- Primary row action statusga qarab o'zgaradi: masalan qabulda `Kelganini belgilash` -> `To'lovga yuborish` -> `Shifokorga yuborish`.

Danger action:
- Qizil rang.
- Confirm talab qiladi.
- Sabab maydoni kerak bo'lishi mumkin.

Implementation holati:
- `/reception`, `/reception/appointments`, `/doctor`, `/laboratory`, `/diagnostics`, `/cashier` sahifalarida statusga qarab primary row action chiqarildi.
- Qolgan amallar `More` dropdown ichida qoladi va asosiy workflowga xalal bermaydi.

## 11. Medical UX standarti

Tibbiy sahifalarda:
- Bemorning allergiyasi ko'rinadigan joyda chiqishi kerak.
- Surunkali kasalliklar badge yoki alert sifatida chiqadi.
- Tibbiy tarix oson ochiladi.
- Qabul oynasida shifokor yozuvi autosave yoki draft bo'lishi kerak.
- Yakunlangan tibbiy yozuv lock qilinadi.

Taqiqlanadi:
- Shifokor yozuvi va kassa actionlarini bir joyda aralashtirish.
- Laboratoriya natijasini shifokor oynasida o'zgartirish.
- Tibbiy yozuvni auditiz o'zgartirish.

## 12. Financial UX standarti

Kassa sahifalarda:
- Summa doim formatlangan ko'rinadi.
- To'langan, qarzdorlik va total alohida ko'rinadi.
- Qaytarim va chegirma sabab bilan yuritiladi.
- Kassa yopilishi alohida flow bo'ladi.
- Moliyaviy actionlar auditga tushadi.

Pul format:
- `Intl.NumberFormat("uz-UZ")` yoki maxsus helper.
- UI ko'rinish: `330 000 so'm`.

## 13. Responsive standart

Desktop birinchi:
- ERP asosiy ishlatiladigan muhit desktop yoki laptop.
- Jadval va forma desktopda optimallashtiriladi.

Mobile:
- Sidebar collapsible bo'ladi.
- Jadval horizontal scroll qiladi.
- Muhim actionlar ko'rinib turadi.
- Formlar bitta ustunga tushadi.

## 14. Accessibility standarti

Minimal talablar:
- Buttonlar haqiqiy `button` bo'lishi kerak.
- Form label bo'lishi kerak.
- Modal focus trap Ant Design orqali ishlaydi.
- Rang bilan birga text status ham bo'lishi kerak.
- Jadval actionlari tooltip yoki text bilan tushunarli bo'lishi kerak.

## 15. Kodlash standarti

Komponent papkalari:
- `app/_components` - umumiy layout va reusable UI.
- `app/_data` - fake data.
- `app/_lib` - helperlar va page registry.
- Keyingi bosqichda `app/_features` qo'shilishi mumkin.

Tavsiya qilingan feature tuzilma:
- `app/_features/patients`
- `app/_features/reception`
- `app/_features/cashier`
- `app/_features/doctor`
- `app/_features/laboratory`
- `app/_features/diagnostics`

Har bir feature ichida:
- `components`
- `columns`
- `forms`
- `utils`
- `types`, agar kerak bo'lsa.

## 16. Kutubxonalarni o'rnatish tartibi

MVP sahifalarni Ant Design bilan ko'tarishdan oldin quyidagilar o'rnatiladi:

```bash
npm install antd @ant-design/icons @ant-design/v5-patch-for-react-19 dayjs
```

React 19 patch root layout yoki alohida client entryda import qilinadi:

```ts
import "@ant-design/v5-patch-for-react-19";
```

Ant Design theme `ConfigProvider` orqali beriladi.

## 17. Theme standarti

Theme tokenlar:
- `borderRadius: 6`
- `colorPrimary: "#0f766e"`
- `fontSize: 13`
- `controlHeight: 34`
- `controlHeightSM: 28`
- `wireframe: false`

Jadval:
- `size="small"`
- `pagination.showSizeChanger: true`
- default page size: `20`
- katta ro'yxatlarda page size options: `20`, `50`, `100`

## 18. Yakuniy qaror

MVP uchun:
- Ant Design v5 asosiy UI kutubxona.
- shadcn ishlatilmaydi.
- Custom CSS faqat layout, density va kerakli override uchun.
- TanStack Table MVPda qo'shilmaydi, lekin murakkab grid kerak bo'lsa keyin qo'shiladi.
- AG Grid MVPda qo'shilmaydi, faqat katta enterprise grid talabi chiqqanda ishlatiladi.

Bu qaror klinika ERPning asosiy ehtiyojiga mos: ko'p forma, ko'p jadval, ko'p filter, ko'p status va tez ishlab chiqiladigan professional admin interfeys.
