"use client";

import { useEffect, useRef } from "react";

import Header from "@/components/common/header";
import { useChatRoom } from "@/hooks/use-chat-room";

import ChatComposer from "./chat-composer";
import ChatMessageList from "./chat-message-list";
import ChatEmpty from "./chat-empty";

export default function Content() {
  const { messages, isReplying, isTyping, isMessagesPending, handleSend } =
    useChatRoom();
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isReplying, isTyping]);

  const hasMessages = messages.length > 0;
  const showHistoryLoading = isMessagesPending && !hasMessages;

  return (
    <div className="flex min-h-full flex-col bg-gray-100">
      <Header title="AI 코디네이터" variant="detail" />

      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {showHistoryLoading ? (
            <p className="caption text-gray-500">대화를 불러오는 중입니다.</p>
          ) : !hasMessages ? (
            <ChatEmpty onPromptClick={handleSend} isDisabled={isReplying} />
          ) : (
            <>
              <ChatMessageList messages={messages} />
            </>
          )}

          <div ref={messageEndRef} aria-hidden />
        </div>

        <ChatComposer onSend={handleSend} isDisabled={isReplying} />
      </div>
    </div>
  );
}
