import BottomCTA from "../bottom-cta";
import { Button } from "@/components/ui/button";
import DateInput from "../date-input";

export default function Start() {
  return (
    <>
      <div className="flex flex-col gap-7.5 rounded-t-lg border-t-2 px-5 pt-10">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2.5">
            <span className="h2">1.영면일 입력</span>
            <span className="text-[18px] text-gray-700">
              고인께서 영면에 드신 날을 알려주세요.
            </span>
          </div>
          <DateInput value="" onChange={() => {}} />
        </div>
        <div>
          <div className="flex flex-col gap-2.5">
            <span className="h2">2.프로필 생성</span>
            <span className="text-[18px] text-gray-700">
              등록할 성명 혹은 명칭을 알려주세요.
            </span>
          </div>
        </div>
      </div>
      <BottomCTA>
        <p>입력하신 내용은 안전하게 저장됩니다.</p>
        <Button className="bg-gray-300 text-[#444444]">입력하기</Button>
      </BottomCTA>
    </>
  );
}
