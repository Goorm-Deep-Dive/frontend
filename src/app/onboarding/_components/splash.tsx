import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Props {
  onNext: () => void;
}
export default function Splash({ onNext }: Props) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2.5">
      <div className="flex h-70 w-full flex-col items-start justify-center gap-2.5 px-5">
        <span className="h1 text-gray-900">
          이제 혼자
          <br />
          챙기지 않아도 됩니다
        </span>
        <span className="body text-gray-700">
          장례가 끝난 순간, 곁에서 함께합니다.
        </span>
      </div>

      <Image src="/images/logo_final.png" alt="logo" width={290} height={290} />

      <div className="flex flex-col items-center justify-center gap-2.5">
        <span className="body text-gray-900">
          행정 절차의 부담을 덜어드리는
          <br />
          <span className="h4">길잡이로 동행하겠습니다.</span>
        </span>

        <Button onClick={onNext}>동행 알아보기</Button>
      </div>
    </div>
  );
}
