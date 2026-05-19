import type { ChatMessageRes } from "@/apis/generated/model/chatMessageRes";

export type ChatMessageGroup = {
  dateKey: string;
  dateLabel: string;
  messages: ChatMessageRes[];
};

const getDateKey = (createdAt?: string) => {
  if (!createdAt) return "unknown";
  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) return "unknown";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getDateLabel = (dateKey: string) => {
  if (dateKey === "unknown") return "오늘";

  const [year, month, day] = dateKey.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  if (Number.isNaN(date.getTime())) return "오늘";

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  }).format(date);
};

export const groupChatMessagesByDate = (
  messages: ChatMessageRes[],
): ChatMessageGroup[] => {
  const groups = new Map<string, ChatMessageRes[]>();

  messages.forEach((message) => {
    const dateKey = getDateKey(message.createdAt);
    const current = groups.get(dateKey) ?? [];
    current.push(message);
    groups.set(dateKey, current);
  });

  return Array.from(groups.entries()).map(([dateKey, groupedMessages]) => ({
    dateKey,
    dateLabel: getDateLabel(dateKey),
    messages: groupedMessages,
  }));
};
