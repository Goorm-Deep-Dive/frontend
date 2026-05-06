import BottomNavigation from "@/components/common/bottom-navigation";
import ChecklistHeader from "@/components/common/header/checklist-header";
import Content from "./_components/content";

export default function ChecklistPage() {
  return (
    <>
      <ChecklistHeader />
      <Content />
      <BottomNavigation />
    </>
  );
}
