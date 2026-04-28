import type { PanelAction } from "../_components/ActionDrawer";

export const receptionActions: PanelAction[] = [
  { key: "arrived", label: "Kelganini belgilash", description: "Bemor klinikaga kelganini qayd qiladi va navbat bosqichini boshlaydi.", fields: ["comment"] },
  { key: "payment", label: "To'lovga yuborish", description: "Bemor uchun invoice va kassa navbati ochiladi.", fields: ["target", "comment"] },
  { key: "doctor", label: "Shifokorga yuborish", description: "To'lov sharti bajarilgandan keyin bemor shifokor navbatiga o'tadi.", fields: ["target", "comment"] },
  { key: "reschedule", label: "Qayta yozish", description: "Qabul sanasi yoki shifokorini o'zgartirish.", fields: ["date", "reason"] },
  { key: "no-show", label: "No-show qilish", description: "Bemor belgilangan vaqtga kelmaganini qayd qiladi.", danger: true, fields: ["reason"] },
  { key: "cancel", label: "Bekor qilish", description: "Qabulni sabab bilan bekor qiladi.", danger: true, fields: ["reason"] },
];

export const doctorActions: PanelAction[] = [
  { key: "history", label: "Tibbiy tarix", description: "Bemorning oldingi qabul, lab va diagnostika tarixini ochish.", fields: ["comment"] },
  { key: "lab", label: "Laboratoriyaga yo'llash", description: "Qabuldan laboratoriya order yaratish.", fields: ["target", "comment"] },
  { key: "diag", label: "Diagnostikaga yo'llash", description: "Instrumental tekshiruv order yaratish.", fields: ["target", "comment"] },
  { key: "rx", label: "Retsept yozish", description: "Bemor uchun retsept draft yaratish.", fields: ["comment"] },
  { key: "lock", label: "Qabulni lock qilish", description: "Yakunlangan tibbiy yozuvni lock qiladi.", danger: true, fields: ["reason"] },
];

export const labActions: PanelAction[] = [
  { key: "sample", label: "Namuna olindi", description: "Namuna qabul qilingan vaqtni belgilaydi.", fields: ["comment"] },
  { key: "barcode", label: "Barcode/label", description: "Namuna uchun barcode yoki label chiqarish.", fields: ["comment"] },
  { key: "approve", label: "Tasdiqlashga yuborish", description: "Kiritilgan natijalarni tasdiqlash navbatiga yuboradi.", fields: ["comment"] },
  { key: "reject", label: "Qayta ishlash", description: "Natijani qayta ishlashga qaytaradi.", danger: true, fields: ["reason"] },
  { key: "cancel", label: "Bekor qilish", description: "Laboratoriya orderini bekor qiladi.", danger: true, fields: ["reason"] },
];

export const diagnosticActions: PanelAction[] = [
  { key: "start", label: "Tekshiruvni boshlash", description: "Diagnostika orderini jarayonga o'tkazadi.", fields: ["comment"] },
  { key: "conclusion", label: "Xulosa yozish", description: "Xulosa draftini yaratadi yoki ochadi.", fields: ["comment"] },
  { key: "approve", label: "Tasdiqlash", description: "Diagnostika xulosasini tasdiqlaydi.", fields: ["comment"] },
  { key: "reschedule", label: "Vaqtni o'zgartirish", description: "Tekshiruv vaqtini qayta belgilash.", fields: ["date", "reason"] },
  { key: "cancel", label: "Bekor qilish", description: "Diagnostika orderini bekor qiladi.", danger: true, fields: ["reason"] },
];

export const cashierActions: PanelAction[] = [
  { key: "pay", label: "To'lov qabul qilish", description: "Invoice bo'yicha to'lov qabul qilish.", fields: ["amount", "comment"] },
  { key: "receipt", label: "Chek chiqarish", description: "To'lov cheki yoki kvitansiya chiqarish.", fields: ["comment"] },
  { key: "discount", label: "Chegirma", description: "Invoice uchun chegirma so'rovi yaratish.", fields: ["amount", "reason"] },
  { key: "refund", label: "Qaytarim", description: "To'lov qaytarimi so'rovini yaratish.", danger: true, fields: ["amount", "reason"] },
  { key: "cancel", label: "Bekor qilish", description: "Moliyaviy amalni bekor qilish.", danger: true, fields: ["reason"] },
];

export const adminActions: PanelAction[] = [
  { key: "edit", label: "Tahrirlash", description: "Yozuv ma'lumotlarini tahrirlash.", fields: ["comment"] },
  { key: "archive", label: "Arxivlash", description: "Yozuvni faol ro'yxatdan arxivga o'tkazish.", danger: true, fields: ["reason"] },
  { key: "export", label: "Export", description: "Jadval yoki yozuv ma'lumotini export qilish.", fields: ["comment"] },
];
