import { ServiceDetailPage } from "../../../_features/admin/AdminResourcePages";

type Props = { params: Promise<{ id: string }> };

export default async function ServiceDetailRoute({ params }: Props) {
  const { id } = await params;
  return <ServiceDetailPage serviceId={id} />;
}
