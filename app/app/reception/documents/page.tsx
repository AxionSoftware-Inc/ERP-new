import {
  ReceptionPlaceholderPage,
  ReceptionPreviewCard,
} from "@/components/reception/reception-placeholder-page";

export default function ReceptionDocumentsPage() {
  return (
    <ReceptionPlaceholderPage
      pageType="Ish stoli"
      primaryActionLabel="Hujjat vositalari keyingi bosqichda"
      purpose="Qabulxonada hujjat yuklash, skan qilish, yaratish va bemor/tashrifga biriktirish."
      route="/app/reception/documents"
      sections={[
        {
          title: "Bemor qidirish + biriktirish konsepti",
          description: "Qabulxona hujjatlari bemor yoki tashrif kontekstini aniqlashdan boshlanadi.",
          children: (
            <div className="grid gap-2 md:grid-cols-2">
              <ReceptionPreviewCard description="Bemor ismi, telefoni, kodi yoki faol tashrifi bo‘yicha qidirish." title="Bemor kontekstini topish" />
              <ReceptionPreviewCard description="Bemor profili, faol tashrif, hisob yoki laboratoriya buyurtmasiga biriktirish." title="Biriktirish manzili" tone="info" />
            </div>
          ),
        },
        {
          title: "Hujjat harakatlari preview",
          description: "Haqiqiy sahifa qabulxonadagi odatiy hujjat workflow’larini qo‘llaydi.",
          children: (
            <>
              <ReceptionPreviewCard description="Pasport/ID, sug‘urta hujjati, yo‘llanma, rozilik formasi." title="Yuklash / skan qilish" />
              <ReceptionPreviewCard description="Shartnoma, ma’lumotnoma, to‘lov hujjati, qabul formasi." title="Yaratish / chop etish" tone="success" />
            </>
          ),
        },
      ]}
      title="Qabulxona hujjatlari"
    />
  );
}
