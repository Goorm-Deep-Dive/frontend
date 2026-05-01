import ListCutIcon from "@/components/icons/list-cut-icon";
import ChecklistList from "./_components/checklist-list";

type Status = "default" | "urgent" | "done";

interface ChecklistPageProps {
  date: string;
  remainingCount: number;
}

const checklistData = [
  { title: "Title1", status: "default", listDate: "D-30" },
  { title: "Title2", status: "default", listDate: "D-30" },
  { title: "Title3", status: "done" },
  { title: "Title4", status: "done" },
];

export default function ChecklistPage({
  date = "D-30",
  remainingCount = 3,
}: ChecklistPageProps) {
  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full flex-col gap-5">
        <div className="bg-tab-bg flex justify-center gap-2.5 py-1.5">
          <span className="label">가장 빠른 기한까지 </span>
          <span className="text-sementic-red">{date}</span>
          <span className="label">일 남았어요</span>
        </div>

        <div className="flex flex-col justify-center gap-5 px-5">
          <div className="bg-gr2 flex flex-col gap-5 rounded-lg px-9 py-7.5">
            <div className="flex justify-center">
              <div className="flex items-end gap-5">
                <div className="flex flex-col">
                  <span className="h4 text-gray-900">Profile1</span>
                  <span className="body">처리해야 할 일이</span>
                </div>
                <div className="flex items-end gap-2.5">
                  <span className="relative text-[40px] leading-none font-semibold text-gray-900">
                    {remainingCount}건
                  </span>
                  <span className="body">있습니다.</span>
                </div>
              </div>
            </div>

            <div className="h-px bg-gray-500" />

            <button className="label flex items-center justify-center gap-2.5 rounded-lg bg-gray-700 px-23.5 py-2 text-white">
              <ListCutIcon />
              리스트 편집하기
            </button>
          </div>

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
  );
}
