import { DiagnosticOrderDetailPage } from "../../../../_features/diagnostics/DiagnosticOrderDetailPage";

type Props = { params: Promise<{ id: string }> };

export default async function DiagnosticOrderDetailRoute({ params }: Props) {
  const { id } = await params;
  return <DiagnosticOrderDetailPage orderId={id} />;
}
