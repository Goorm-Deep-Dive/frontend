"use client";

import { format } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";

import { streamChatMessage } from "@/apis/chat-message-stream";
import {
  getGetMessagesQueryKey,
  useGetMessages,
} from "@/apis/generated/api-client";
import type { ChatMessageRes } from "@/apis/generated/model/chatMessageRes";
import { ChatMessageResRole } from "@/apis/generated/model/chatMessageResRole";

const createMessage = (
  role: ChatMessageResRole,
  content: string,
): ChatMessageRes => ({
  role,
  content,
  createdAt: new Date().toISOString(),
});

export const useChatRoom = () => {
  const queryClient = useQueryClient();
  const chatDate = format(new Date(), "yyyy-MM-dd");
  const [messages, setMessages] = useState<ChatMessageRes[]>([]);
  const [isReplying, setIsReplying] = useState(false);
  const streamAbortRef = useRef<AbortController | null>(null);

  const { data: historyMessages, isPending: isMessagesPending } =
    useGetMessages({
      date: chatDate,
    });

  useEffect(() => {
    if (!historyMessages) return;
    setMessages(historyMessages);
  }, [historyMessages]);

  useEffect(() => {
    return () => {
      streamAbortRef.current?.abort();
    };
  }, []);

  const appendAiChunk = useCallback((chunk: string) => {
    setMessages((prev) => {
      const next = [...prev];
      const lastIndex = next.length - 1;
      const lastMessage = next[lastIndex];

      if (lastMessage?.role !== ChatMessageResRole.AI) {
        return next;
      }

      next[lastIndex] = {
        ...lastMessage,
        content: `${lastMessage.content ?? ""}${chunk}`,
      };

      return next;
    });
  }, []);

  const handleSend = useCallback(
    async (message: string) => {
      const trimmed = message.trim();
      if (!trimmed || isReplying) return;

      streamAbortRef.current?.abort();
      const abortController = new AbortController();
      streamAbortRef.current = abortController;

      setMessages((prev) => [
        ...prev,
        createMessage(ChatMessageResRole.USER, trimmed),
        createMessage(ChatMessageResRole.AI, ""),
      ]);
      setIsReplying(true);

      try {
        await streamChatMessage({
          message: trimmed,
          signal: abortController.signal,
          onChunk: appendAiChunk,
        });

        await queryClient.invalidateQueries({
          queryKey: getGetMessagesQueryKey({ date: chatDate }),
        });
      } catch (error) {
        if (abortController.signal.aborted) return;

        setMessages((prev) => {
          const next = [...prev];
          const lastMessage = next.at(-1);

          if (
            lastMessage?.role === ChatMessageResRole.AI &&
            !lastMessage.content
          ) {
            next.pop();
          }

          return next;
        });

        console.error(error);
      } finally {
        if (streamAbortRef.current === abortController) {
          streamAbortRef.current = null;
        }
        setIsReplying(false);
      }
    },
    [appendAiChunk, chatDate, isReplying, queryClient],
  );

  const isTyping =
    isReplying &&
    messages.at(-1)?.role === ChatMessageResRole.AI &&
    !messages.at(-1)?.content;

  return {
    messages,
    isReplying,
    isTyping,
    isMessagesPending,
    handleSend,
  };
};
