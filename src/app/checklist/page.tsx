import ChecklistList from "./_components/checklist-list";
import ChecklistHeaderCard from "./_components/checklist-header-card";
import Header from "@/components/common/header";
import BottomNavigation from "@/components/common/bottom-navigation";

type Status = "default" | "urgent" | "done";

const checklistData = [
  { title: "Title1", status: "default", listDate: "D-30" },
  { title: "Title2", status: "default", listDate: "D-30" },
  { title: "Title3", status: "done" },
  { title: "Title4", status: "done" },
];

export default function ChecklistPage() {
  return (
    <>
      <Header variant="checklist" />
      <div className="flex w-full flex-col">
        <div className="flex w-full flex-col gap-5">
          <div className="bg-tab-bg flex justify-center gap-2.5 py-1.5">
            <span className="label">가장 빠른 기한까지 </span>
            <span className="text-sementic-red">D-100</span>
            <span className="label">일 남았어요</span>
          </div>

          <div className="flex flex-col justify-center gap-5 px-5">
            <ChecklistHeaderCard profile="Profile1" count={10} />

            <div className="flex flex-col gap-2.5">
              {checklistData.map((item, index) => (
                <ChecklistList
                  key={item.title}
                  title={item.title}
                  index={index + 1}
                  status={item.status as Status}
                  listDate={item.listDate}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </>
  );
}
