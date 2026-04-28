import { AuditDetailPage } from "../../../_features/admin/AdminResourcePages";

type Props = { params: Promise<{ id: string }> };

export default async function AuditDetailRoute({ params }: Props) {
  const { id } = await params;
  return <AuditDetailPage auditId={id} />;
}
