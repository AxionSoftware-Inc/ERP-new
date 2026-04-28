import { LabOrderDetailPage } from "../../../../_features/laboratory/LabOrderDetailPage";

type Props = { params: Promise<{ id: string }> };

export default async function LaboratoryOrderDetailRoute({ params }: Props) {
  const { id } = await params;
  return <LabOrderDetailPage orderId={id} />;
}
