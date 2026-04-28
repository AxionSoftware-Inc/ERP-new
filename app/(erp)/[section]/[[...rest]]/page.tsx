import { PageScaffold } from "../../../_components/PageScaffold";
import { getPageConfig } from "../../../_lib/pageRegistry";

type Props = {
  params: Promise<{
    section: string;
    rest?: string[];
  }>;
};

export default async function SectionPage({ params }: Props) {
  const { section, rest = [] } = await params;
  const pathname = `/${[section, ...rest].join("/")}`;

  return <PageScaffold config={getPageConfig(pathname)} />;
}
