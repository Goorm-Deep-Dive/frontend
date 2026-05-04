import { Button } from "@/components/ui/button";
import AddForm from "./_components/add-form";

export default function Page() {
  return (
    <div className="mt-26 flex flex-col gap-7.5">
      <div className="flex justify-between gap-3.5 pr-5 pl-7.5">
        <div className="flex flex-col gap-2.5">
          <span className="h1">동행 시작하기</span>
          <span>기존 회원이시라면, 로그인 해주세요.</span>
        </div>
        <div className="flex items-end">
          <Button
            size="small"
            className="rounded-xl bg-gray-300 px-3 py-1 text-gray-900"
          >
            로그인 하기
          </Button>
        </div>
      </div>
      <AddForm />
    </div>
  );
}
