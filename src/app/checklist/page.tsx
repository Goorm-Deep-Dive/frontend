import Header from "@/components/common/header";

interface ChecklistPageProps {
  date: string;
  count: number;
}

export default function ChecklistPage({ date, count }: ChecklistPageProps) {
  return (
    <div>
      <Header title="Checklist" />
      <div className="flex flex-col gap-5">
        <div className="bg-tab-bg">
          <span className="label flex justify-center gap-2.5 px-20.5 py-1.5">
            가장 빠른 기한까지{" "}
            <span className="text-sementic-red">D-{date}</span>일 남았어요.
          </span>
        </div>

        <div className="flex flex-col gap-5 rounded-lg bg-amber-900 px-5 py-7.5">
          <div className="flex gap-5">
            <div className="flex flex-col">
              <span className="h4">Profile1</span>
              <span className="body">처리해야 할 일이 </span>
            </div>
            <div>
              <span className="text-[40px] font-semibold text-gray-900">
                {`${count}`}건
              </span>
              <span className="body pl-2.5">있습니다.</span>
            </div>
          </div>

          <div>
            <p>------------------------------</p>
          </div>
          <div>
            <button>버튼</button>
          </div>
        </div>
      </div>
      <div>리스트</div>
    </div>
  );
}
