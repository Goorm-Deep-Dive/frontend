import Content from "./_components/content";

interface PageProps {
  params: Promise<{
    procedureId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { procedureId } = await params;
  return <Content procedureId={Number(procedureId)} />;
}
