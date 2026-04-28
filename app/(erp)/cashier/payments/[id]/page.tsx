import { PaymentDetailPage } from "../../../../_features/cashier/PaymentDetailPage";

type Props = { params: Promise<{ id: string }> };

export default async function PaymentDetailRoute({ params }: Props) {
  const { id } = await params;
  return <PaymentDetailPage paymentId={id} />;
}
