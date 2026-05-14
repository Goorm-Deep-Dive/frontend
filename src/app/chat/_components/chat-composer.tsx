"use client";

import { ArrowUp } from "lucide-react";
import { useState, type KeyboardEvent } from "react";

import { cn } from "@/lib/cn";

type ChatComposerProps = {
  onSend: (message: string) => void;
  isDisabled?: boolean;
};

const ChatComposer = ({ onSend, isDisabled = false }: ChatComposerProps) => {
  const [draft, setDraft] = useState("");

  const handleSubmit = () => {
    const trimmed = draft.trim();
    if (!trimmed || isDisabled) return;

    onSend(trimmed);
    setDraft("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== "Enter" || event.shiftKey) return;

    event.preventDefault();
    handleSubmit();
  };

  const canSend = draft.trim().length > 0 && !isDisabled;

  return (
    <div className="px-5 pt-4 pb-[calc(env(safe-area-inset-bottom)+16px)]">
      <div className="flex items-center gap-3 rounded-full bg-[#f4f4f4] px-6 py-3.5">
        <textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isDisabled}
          rows={1}
          placeholder="궁금한 사항을 물어봐 주세요."
          className={cn(
            "body max-h-28 min-h-6 flex-1 resize-none bg-transparent text-gray-900 outline-none placeholder:text-[#8e8e8e]",
            isDisabled && "cursor-not-allowed opacity-60",
          )}
        />

        <button
          type="button"
          disabled={!canSend}
          aria-label="메시지 보내기"
          onClick={handleSubmit}
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e0e0e0] text-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-opacity",
            !canSend && "cursor-not-allowed opacity-60",
          )}
        >
          <ArrowUp className="h-5 w-5" strokeWidth={2.25} />
        </button>
      </div>
    </div>
  );
};

export default ChatComposer;
