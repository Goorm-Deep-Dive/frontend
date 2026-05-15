"use client";

import { useState, type KeyboardEvent } from "react";

import { cn } from "@/lib/cn";
import ChatSendActiveIcon from "@/components/icons/chat-send-active-icon";
import ChatSendDisabledIcon from "@/components/icons/chat-send-disabled-icon";

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
    <div className="px-5 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
      <div className="flex min-h-15.5 items-center gap-3 rounded-[2.5rem] bg-gray-200 px-5 py-2.25 shadow-[0.125rem_0.125rem_0.375rem_rgba(0,0,0,0.3)]">
        <textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isDisabled}
          rows={1}
          placeholder="궁금한 사항을 물어봐 주세요."
          className={cn(
            "max-h-28 min-h-5.5 flex-1 resize-none bg-transparent text-base leading-[1.4rem] font-semibold tracking-[0.01em] text-gray-900 outline-none placeholder:text-gray-500",
            isDisabled && "cursor-not-allowed opacity-60",
          )}
        />

        <button
          type="button"
          disabled={!canSend}
          aria-label="메시지 보내기"
          onClick={handleSubmit}
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center",
            !canSend && "cursor-not-allowed",
          )}
        >
          {canSend ? (
            <ChatSendActiveIcon className="size-full" />
          ) : (
            <ChatSendDisabledIcon className="size-full" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatComposer;
