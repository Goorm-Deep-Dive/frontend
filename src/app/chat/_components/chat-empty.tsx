import StarIcon from "@/components/icons/star-icon";
import { cn } from "@/lib/cn";

const SAMPLE_PROMPTS = [
  "지금 내 상황에서 뭐부터 해야 해?",
  "내 일정 기준, 놓치면 안되는 기한 알려줘",
  "내 조건에 맞는 행정 절차만 골라줘",
] as const;

const samplePromptClassName = cn(
  "h4 w-full rounded-[0.625rem] rounded-bl-none border border-gray-100 bg-white p-2.5 text-center font-semibold leading-[1.6875rem] tracking-[-0.0225rem] text-gray-500 shadow-[0.125rem_0.125rem_0.125rem_rgba(0,0,0,0.25)]",
);

interface ChatEmptyProps {
  onPromptClick: (prompt: string) => void;
  isDisabled?: boolean;
}

export default function ChatEmpty({
  onPromptClick,
  isDisabled = false,
}: ChatEmptyProps) {
  return (
    <div>
      <div className="flex h-98 min-h-98 w-full flex-col items-center justify-center gap-3.5">
        <span className="body text-gray-500">
          일반 AI 챗봇과는 무엇이 다를까요?
        </span>
        <div className="flex flex-col items-center gap-0">
          <span className="h3 font-bold text-gray-900">
            검증된 답변에 내 상황을 분석해
          </span>
          <span className="h3 text-primary-1 font-bold">
            딱 맞는 정보만 정확하게 알려드려요
          </span>
        </div>
      </div>

      <div className="flex w-full flex-col items-start gap-3.5">
        <div className="flex items-start gap-2 px-5">
          <StarIcon />
          <span className="h2 text-gray-900">이렇게 물어 볼 수 있어요</span>
        </div>
        <div className="flex w-full flex-col gap-2.5 px-5 pt-2.5 pb-7.5">
          {SAMPLE_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              disabled={isDisabled}
              onClick={() => onPromptClick(prompt)}
              className={cn(
                samplePromptClassName,
                isDisabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
              )}
            >
              &ldquo;{prompt}&rdquo;
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
