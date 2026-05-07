import Header from "@/components/common/header";
import BottomNavigation from "@/components/common/bottom-navigation";
import Content from "./_components/content";

export default function Page() {
  return (
    <>
      <Header variant="default" title="진행상황" />
      <Content />
      <BottomNavigation />
    </>
  );
}
