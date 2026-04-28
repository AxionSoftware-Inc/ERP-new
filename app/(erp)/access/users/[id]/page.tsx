import { UserDetailPage } from "../../../../_features/admin/AdminResourcePages";

type Props = { params: Promise<{ id: string }> };

export default async function UserDetailRoute({ params }: Props) {
  const { id } = await params;
  return <UserDetailPage userId={id} />;
}
