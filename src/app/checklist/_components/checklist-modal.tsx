"use client";

import CloseIcon from "@/components/icons/close-icon";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

import ChecklistListAddress from "./checklist-modal/checklist-list-address";
import ChecklistListCable from "./checklist-modal/checklist-list-cable";
import ChecklistListNotice from "./checklist-modal/checklist-list-notice";
import ChecklistListOffline from "./checklist-modal/checklist-list-offline";
import ChecklistListOnline from "./checklist-modal/checklist-list-online";

interface ChecklistModalProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}

const MOCK_DATA = [
  {
    id: "Q1",
    title: "Q1. 직업 및 연금 유형",
    subTitle: "고인의 직업·연금이 기억나지 않는다면?",
    sections: [
      {
        type: "online",
        title: "온라인",
        description: "안심상속 원스톱",
      },
      {
        type: "cable",
        title: "유산",
        description: "국민연금공단 문의",
        tel: "(1355)",
      },
    ],
  },
  {
    id: "Q2",
    title: "Q2. 특수 신분 및 등록 현황",
    subTitle: "특수 신분 여부를 모른다면?",
    sections: [
      {
        type: "address",
        title: "오프라인",
        description: "가장 가까운 주민센터 방문하기",
      },
    ],
  },
  {
    id: "Q3",
    title: "Q3. 고인 보유 재산",
    subTitle: "고인의 보유사잔을 모른다면?",
    sections: [
      {
        type: "online",
        title: "온라인",
        description: "안심상속 원스톱",
      },
      {
        type: "notice",
        title: "안내사항",
        description:
          "Q1. 직업연금 여부도 모른다면 안심상속 확인으로 같이 해결돼요.",
      },
    ],
  },
  {
    id: "Q4",
    title: "Q4. 사망 유형 (산재 여부)",
    subTitle: "사망원인이 산재인지 모른다면?",
    sections: [
      {
        type: "offline",
        title: "오프라인",
        description: "사망진단서 사인란 직접 확인",
      },
      {
        type: "cable",
        title: "유선",
        description: "근로복지공단 문의 (1588-0075)",
      },
    ],
  },
  {
    id: "Q5",
    title: "Q5. 유족 구성",
    subTitle: "상속구성이 정확하지 않는다면?",
    sections: [
      {
        type: "online",
        title: "온라인",
        description: "정부24 '가족관계증명서'",
      },
      {
        type: "address",
        title: "오프라인",
        description: "가장 가까운 주민센터 방문하기",
      },
      {
        type: "notice",
        title: "안내사항",
        description:
          "Q2. 특수 신분 여부도 모른다면 주민센터 방문으로 같이 해결돼요",
      },
    ],
  },
];

const SECTION_COMPONENTS = {
  online: ChecklistListOnline,
  cable: ChecklistListCable,
  address: ChecklistListAddress,
  notice: ChecklistListNotice,
  offline: ChecklistListOffline,
};

export default function ChecklistModal({
  id,
  isOpen,
  onClose,
}: ChecklistModalProps) {
  const matchedData = MOCK_DATA.find((item) => item.id === id);

  if (!matchedData) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] w-[calc(100%-32px)] max-w-[440px] overflow-y-auto rounded-xl bg-white p-0">
        <DialogTitle className="sr-only">{matchedData.title}</DialogTitle>
        <div className="max-w-[calc(var(--app-max-width) - 40px)] mx-auto flex w-full flex-col gap-3 px-5 pt-4">
          <div className="flex justify-end">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="닫기"
              onClick={onClose}
            >
              <CloseIcon width={30} height={30} />
            </Button>
          </div>
          <div className="flex flex-col gap-7.5 pb-10">
            <div className="flex flex-col gap-2.5">
              <span className="h2 text-gray-900">{matchedData.title}</span>
              <div className="flex flex-col">
                <span className="body text-gray-900">
                  {matchedData.subTitle}
                </span>
                <span className="body text-gray-900">
                  아래 방법을 통해 확인해보세요.
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-7.5">
              {matchedData.sections.map((section) => {
                const Component =
                  SECTION_COMPONENTS[
                    section.type as keyof typeof SECTION_COMPONENTS
                  ];
                return (
                  <Component
                    key={section.type}
                    title={section.title}
                    description={section.description}
                    tel={section.tel ?? ""}
                  />
                );
              })}
            </div>
            <div className="body flex flex-col text-gray-900">
              <span>· 확인 완료 후, 안내 다시 보기는 </span>
              <span>
                <span className="pl-2 underline">모름 체크 항목</span> 해제 후
                다시 선택해주세요.
              </span>
            </div>
            <div>
              <Button
                type="button"
                variant="primary"
                size="large"
                className="bg-navy p-3.5"
                onClick={onClose}
              >
                확인 완료
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
