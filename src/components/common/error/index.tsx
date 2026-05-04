import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Props {
  onRetry?: () => void;
}

const CommonError = ({ onRetry }: Props) => {
  return (
    <div className="flex h-87 w-87.5 flex-col items-center justify-center gap-3.5 rounded-2xl border bg-white py-10">
      <Image src="/images/404.png" alt="" width={214} height={115} />
      <div className="flex flex-col items-center justify-center gap-1.5">
        <span className="h4">일시적 오류가 발생했습니다.</span>
        <span className="caption">
          이용에 불편을 드려 죄송합니다.
          <br />
          잠시 후 다시 이용해 주세요.
        </span>
      </div>
      <Button
        type="button"
        variant="primary"
        size="small"
        rounded
        onClick={onRetry}
        disabled={!onRetry}
      >
        다시 시도
      </Button>
    </div>
  );
};

export default CommonError;
