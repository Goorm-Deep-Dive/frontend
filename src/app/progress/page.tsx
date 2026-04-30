import Header from "@/components/common/header";
import Banner from "./_components/banner";
import BottomNavigation from "@/components/common/bottom-navigation";
import Content from "./_components/content";

export default function Page() {
  return (
    <>
      <Header variant="default" title="진행상황" />
      <Banner />
      <Content />
      <BottomNavigation />
    </>
  );
}
