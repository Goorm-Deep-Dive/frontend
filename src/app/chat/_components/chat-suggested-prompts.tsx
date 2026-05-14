import { SUGGESTED_CHAT_PROMPTS } from "@/app/chat/_constants/suggested-prompts";
import { cn } from "@/lib/cn";

type ChatSuggestedPromptsProps = {
  onSelectPrompt: (prompt: string) => void;
  isDisabled?: boolean;
};

const ChatSuggestedPrompts = ({
  onSelectPrompt,
  isDisabled = false,
}: ChatSuggestedPromptsProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto px-5 pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {SUGGESTED_CHAT_PROMPTS.map((prompt) => (
        <button
          key={prompt}
          type="button"
          disabled={isDisabled}
          onClick={() => onSelectPrompt(prompt)}
          className={cn(
            "caption shrink-0 rounded-full border border-gray-300 bg-white px-4 py-2 text-gray-700",
            isDisabled && "cursor-not-allowed opacity-50",
          )}
        >
          {prompt}
        </button>
      ))}
    </div>
  );
};

export default ChatSuggestedPrompts;
