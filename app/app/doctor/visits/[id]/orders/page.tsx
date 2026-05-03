import { DoctorPlaceholderPage } from "@/components/doctor/doctor-placeholder-page";
import { getDoctorVisit } from "@/lib/api/client";

type Props = { params: Promise<{ id: string }> };

export default async function DoctorVisitOrdersPage({ params }: Props) {
  const { id } = await params;
  const detail = await getDoctorVisit(id);

  return (
    <DoctorPlaceholderPage
      title="Visit Orders"
      route={`/app/doctor/visits/${id}/orders`}
      purpose={`Lab, radiology, procedure, nursing task va referral orders shell${detail ? ` for ${detail.patient.fullName}` : ""}.`}
      sections={["Lab orders", "Radiology orders", "Procedure orders", "Nursing tasks", "Referrals", "Order sets"]}
      actions={["Order lab", "Order radiology", "Order procedure", "Cancel order", "View status"]}
    />
  );
}
