"use client";

import { useEffect, useRef } from "react";

import Header from "@/components/common/header";
import { useChatRoom } from "@/hooks/use-chat-room";

import ChatComposer from "./chat-composer";
import ChatMessageList from "./chat-message-list";
import ChatSuggestedPrompts from "./chat-suggested-prompts";

export default function Content() {
  const { messages, isReplying, isTyping, isMessagesPending, handleSend } =
    useChatRoom();
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isReplying]);

  return (
    <div className="flex min-h-full flex-col bg-gray-100">
      <Header title="AI 코디네이터" variant="detail" />

      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {isMessagesPending ? (
            <p className="caption text-gray-500">대화를 불러오는 중입니다.</p>
          ) : (
            <ChatMessageList messages={messages} />
          )}

          {isTyping ? (
            <p className="caption mt-4 text-gray-500">동행 AI가 답변 중...</p>
          ) : null}

          <div ref={messageEndRef} />
        </div>

        <ChatSuggestedPrompts
          onSelectPrompt={handleSend}
          isDisabled={isReplying}
        />

        <ChatComposer onSend={handleSend} isDisabled={isReplying} />
      </div>
    </div>
  );
}
