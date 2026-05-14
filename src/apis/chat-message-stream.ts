import { STORAGE_ACCESS_TOKEN_KEY } from "@/constants/storage-keys";
import { extractSsePayload, parseSseChunk } from "@/services/parse-sse-chunk";

type StreamChatMessageParams = {
  message: string;
  signal?: AbortSignal;
  onChunk: (chunk: string) => void;
};

const getStreamUrl = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured.");
  }

  return `${baseUrl.replace(/\/$/, "")}/api/v1/chats/messages/stream`;
};

const clearRefreshCookieOnAppOrigin = async () => {
  await fetch("/api/auth/clear-refresh-cookie", {
    method: "POST",
    credentials: "include",
  });
};

const handleUnauthorized = async () => {
  if (typeof window === "undefined") return;

  localStorage.clear();
  await clearRefreshCookieOnAppOrigin();
  window.location.href = "/login";
};

export const streamChatMessage = async ({
  message,
  signal,
  onChunk,
}: StreamChatMessageParams): Promise<void> => {
  const accessToken =
    typeof window !== "undefined"
      ? localStorage.getItem(STORAGE_ACCESS_TOKEN_KEY)
      : null;

  const response = await fetch(getStreamUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    credentials: "include",
    body: JSON.stringify({ message }),
    signal,
  });

  if (response.status === 401) {
    await handleUnauthorized();
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    throw new Error(`Stream request failed with status ${response.status}`);
  }

  if (!response.body) {
    throw new Error("Stream response body is empty.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  const consumeEvent = (rawEvent: string) => {
    const payload = extractSsePayload(rawEvent);
    if (!payload) return;

    const parsed = parseSseChunk(payload);
    if (!parsed) return;
    if (parsed.type === "done") return;

    onChunk(parsed.value);
  };

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    const events = buffer.split(/\r?\n\r?\n/);
    buffer = events.pop() ?? "";

    events.forEach(consumeEvent);
  }

  if (buffer.trim()) {
    consumeEvent(buffer);
  }
};
