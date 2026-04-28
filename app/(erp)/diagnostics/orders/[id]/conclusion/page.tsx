import { DiagnosticConclusionPage } from "../../../../../_features/diagnostics/DiagnosticConclusionPage";

type Props = { params: Promise<{ id: string }> };

export default async function DiagnosticConclusionRoute({ params }: Props) {
  const { id } = await params;
  return <DiagnosticConclusionPage orderId={id} />;
}
