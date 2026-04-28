import { LabResultEntryPage } from "../../../../../_features/laboratory/LabResultEntryPage";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function LaboratoryOrderResultsRoute({ params }: Props) {
  const { id } = await params;

  return <LabResultEntryPage orderId={id} />;
}
