import type { ChatMessageRes } from "@/apis/generated/model/chatMessageRes";
import { groupChatMessagesByDate } from "@/services/group-chat-messages-by-date";

import ChatDateDivider from "./chat-date-divider";
import ChatMessageBubble from "./chat-message-bubble";

type ChatMessageListProps = {
  messages: ChatMessageRes[];
};

const ChatMessageList = ({ messages }: ChatMessageListProps) => {
  const groupedMessages = groupChatMessagesByDate(messages);

  return (
    <div className="flex flex-col gap-4">
      {groupedMessages.map((group) => (
        <section key={group.dateKey} className="flex flex-col gap-4">
          <ChatDateDivider label={group.dateLabel} />
          {group.messages.map((message, index) => (
            <ChatMessageBubble
              key={`${group.dateKey}-${message.createdAt ?? index}-${message.role}`}
              message={message}
            />
          ))}
        </section>
      ))}
    </div>
  );
};

export default ChatMessageList;
