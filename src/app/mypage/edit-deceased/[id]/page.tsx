import Header from "@/components/common/header";
import EditForm from "../_components/edit-form";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <>
      <Header title="고인 프로필 수정" variant="detail" />
      <EditForm id={id} />
    </>
  );
}
