import { Button } from "@/components/ui/button";
import AddForm from "./_components/add-form";

export default function Page() {
  return (
    <div className="flex flex-col gap-7.5">
      <div className="mt-26 pl-7.5">
        <div className="flex flex-col gap-2.5">
          <span className="h1 text-gray-900">동행 시작하기</span>
        </div>
      </div>
      <div className="rounded-t-[1.25rem] border-t-2 shadow-[0px_-2px_2px_rgba(0,0,0,0.01)]">
        <div className="mt-15">
          <AddForm />
        </div>
      </div>
    </div>
  );
}
