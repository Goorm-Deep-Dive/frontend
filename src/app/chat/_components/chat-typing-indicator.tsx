import { cn } from "@/lib/cn";

const TYPING_DOT_CLASS =
  "size-[0.333rem] shrink-0 rounded-full bg-white chat-typing-dot";

type ChatTypingIndicatorProps = {
  className?: string;
};

const ChatTypingIndicator = ({ className }: ChatTypingIndicatorProps) => {
  return (
    <div
      className={cn(
        "bg-primary-1 rounded-2xl rounded-tl-md px-3.75 py-2.5 shadow-[0.0625rem_0.0625rem_0.375rem_rgba(0,0,0,0.2)]",
        className,
      )}
      aria-label="AI가 답변을 작성 중입니다"
      role="status"
    >
      <div className="flex items-center gap-1">
        <span className={cn(TYPING_DOT_CLASS, "chat-typing-dot-1")} />
        <span className={cn(TYPING_DOT_CLASS, "chat-typing-dot-2")} />
        <span className={cn(TYPING_DOT_CLASS, "chat-typing-dot-3")} />
      </div>
    </div>
  );
};

export default ChatTypingIndicator;
