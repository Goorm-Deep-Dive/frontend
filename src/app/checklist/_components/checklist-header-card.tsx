import ListCutIcon from "@/components/icons/list-cut-icon";

interface Props {
  profile: string;
  count: number;
}
export default function ChecklistHeaderCard({ profile, count }: Props) {
  return (
    <div className="bg-gr2 border-gray-30 flex flex-col gap-5 rounded-lg border px-9 py-7.5 pb-10">
      <div className="flex justify-center">
        <div className="flex items-end gap-5">
          <div className="flex flex-col">
            <span className="h4 text-gray-900">{profile}</span>
            <span className="body">처리해야 할 일이</span>
          </div>
          <div className="flex items-end gap-2.5">
            <span className="relative text-[2.5rem] leading-none font-semibold text-gray-900">
              {count}건
            </span>
            <span className="body">있습니다.</span>
          </div>
        </div>
      </div>

      {/* TODO: button 컴포넌트에 variant 추가한 뒤 수정 */}
      <button className="label flex cursor-pointer items-center justify-center gap-2.5 rounded-lg bg-gray-700 py-2 text-white">
        <ListCutIcon />
        리스트 편집하기
      </button>
    </div>
  );
}
