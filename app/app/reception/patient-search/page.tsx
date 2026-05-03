import {
  ReceptionPlaceholderPage,
  ReceptionPreviewCard,
} from "@/components/reception/reception-placeholder-page";

export default function ReceptionPatientSearchPage() {
  return (
    <ReceptionPlaceholderPage
      pageType="Ish stoli"
      primaryActionLabel="Qidiruv flow keyingi bosqichda"
      purpose="Qabulni boshlashdan oldin bemorni ism, telefon, bemor kodi yoki dublikat belgilar orqali topish."
      route="/app/reception/patient-search"
      sections={[
        {
          title: "Qidiruv paneli preview",
          description: "Haqiqiy sahifada qabulxona uchun ko‘p maydonli qidiruv bo‘ladi.",
          children: (
            <div className="grid gap-2 md:grid-cols-2">
              <ReceptionPreviewCard description="To‘liq ism, telefon, bemor kodi, pasport/ID." meta="Maydonlar" title="Qidiruv maydonlari" />
              <ReceptionPreviewCard description="Yaqinda kelgan bemorlar, dublikat ehtimoli, faol tashrif ogohlantirishlari." meta="Kontekst" title="Xavfsizlik tekshiruvlari" />
            </div>
          ),
        },
        {
          title: "Natijalar hududi placeholder",
          description: "Har bir mos bemor uchun ixcham karta operatsion holatni ko‘rsatadi.",
          children: (
            <>
              <ReceptionPreviewCard description="Bemor kodi, yosh/jins, telefon, oxirgi tashrif va faol tashrif holati." meta="Karta" title="Bemor identifikatsiyasi" />
              <ReceptionPreviewCard description="Profilni ochish, qabul boshlash, qabul yaratish, kontaktni tahrirlash, hujjat yuklash." meta="Harakatlar" title="Tezkor harakatlar preview" tone="info" />
            </>
          ),
        },
      ]}
      status="Qabulxona moduli placeholder"
      title="Bemor qidirish"
    />
  );
}
