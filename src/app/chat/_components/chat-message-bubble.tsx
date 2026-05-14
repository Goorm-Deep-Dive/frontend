import type { ChatMessageRes } from "@/apis/generated/model/chatMessageRes";
import { ChatMessageResRole } from "@/apis/generated/model/chatMessageResRole";
import { cn } from "@/lib/cn";
import { formatChatTime } from "@/services/format-chat-time";

type ChatMessageBubbleProps = {
  message: ChatMessageRes;
};

const ChatMessageBubble = ({ message }: ChatMessageBubbleProps) => {
  const isUser = message.role === ChatMessageResRole.USER;
  const timeLabel = formatChatTime(message.createdAt);

  return (
    <div
      className={cn(
        "flex w-full gap-2.5",
        isUser ? "justify-end" : "justify-start",
      )}
    >
      <div
        className={cn(
          "flex max-w-[78%] flex-col gap-1.5",
          isUser ? "items-end" : "items-start",
        )}
      >
        <div
          className={cn(
            "body rounded-2xl px-4 py-3 whitespace-pre-wrap",
            !isUser
              ? "bg-primary-1 rounded-tl-md text-white"
              : "rounded-br-md border border-gray-300 bg-white text-gray-900",
          )}
        >
          {message.content}
        </div>

        {timeLabel ? (
          <span className="other2 text-gray-500">{timeLabel}</span>
        ) : null}
      </div>
    </div>
  );
};

export default ChatMessageBubble;
