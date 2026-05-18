import type { ChatMessageRes } from "@/apis/generated/model/chatMessageRes";
import { ChatMessageResRole } from "@/apis/generated/model/chatMessageResRole";

export const INITIAL_CHAT_MESSAGES: ChatMessageRes[] = [
  {
    role: ChatMessageResRole.AI,
    content:
      "안녕하세요. 동행 AI 상담입니다. 장례 이후 행정 절차가 막막할 때 필요한 서류, 기관, 순서를 차근차근 안내해 드릴게요.",
    createdAt: "2026-05-14T09:00:00.000Z",
  },
  {
    role: ChatMessageResRole.USER,
    content: "상속 등기를 진행하려면 어디부터 확인하면 될까요?",
    createdAt: "2026-05-14T09:02:00.000Z",
  },
  {
    role: ChatMessageResRole.AI,
    content:
      "먼저 체크리스트에서 상속·재산 관련 항목을 확인한 뒤, 가족관계증명서와 협의분할서류 등 기본 서류를 준비하면 됩니다. 진행 중 막히는 단계가 있으면 바로 물어봐 주세요.",
    createdAt: "2026-05-14T09:02:30.000Z",
  },
];

export const MOCK_AI_REPLY =
  "말씀해 주신 내용을 바탕으로 필요한 절차를 정리해 드릴게요. 추가로 알고 싶은 서류나 기관이 있으면 편하게 물어보세요.";
