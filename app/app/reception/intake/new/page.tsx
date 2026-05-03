import { getReceptionIntakeContext } from "@/lib/api/client";
import { IntakeFlow } from "@/components/reception/intake-flow";

export default async function NewReceptionIntakePage() {
  const context = await getReceptionIntakeContext();

  return <IntakeFlow context={context} />;
}
