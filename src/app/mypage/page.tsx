import BottomNavigation from "@/components/common/bottom-navigation";
import Header from "@/components/common/header";
import Content from "./_components/content";

export default function Page() {
  return (
    <>
      <Header title="마이페이지" />
      <Content />
      <BottomNavigation />
    </>
  );
}
