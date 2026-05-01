import Header from "@/components/common/header";
import { Suspense } from "react";
import Content from "./_components/content";

interface PageProps {
  params: Promise<{
    procedureId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { procedureId } = await params;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Content procedureId={Number(procedureId)} />
    </Suspense>
  );
}
