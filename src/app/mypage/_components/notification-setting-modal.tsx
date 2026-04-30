"use client";

import { useState } from "react";
import NotificationSettingIcon from "@/components/icons/notification-setting-icon";
import Switch from "@/components/common/switch";
import { CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationSettingModal({ isOpen, onClose }: Props) {
  const [isChecklistDdayNotificationOn, setIsChecklistDdayNotificationOn] =
    useState(false);
  const [isWeeklyScheduleNotificationOn, setIsWeeklyScheduleNotificationOn] =
    useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="flex w-full max-w-80 flex-col gap-5 rounded-[24px] bg-white px-2.5 py-10 shadow-[0_4px_8px_rgba(0,0,0,0.15)]">
        <div className="flex w-full flex-col items-center justify-between">
          <div className="flex w-full flex-col items-center justify-center gap-2.5 text-center">
            <DialogTitle className="h2 text-primary-1">알림설정</DialogTitle>
            <DialogDescription className="body text-gray-700">
              원하는 알림을 선택해 주세요.
            </DialogDescription>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="absolute top-2.5 right-2.5 flex h-11 w-11 cursor-pointer items-center justify-center"
            aria-label="모달 닫기"
          >
            <CircleX className="h-7 w-7 text-gray-900" />
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-[0_2px_2px_0_rgba(0,0,0,0.15)]">
          <div className="flex items-center gap-4 bg-gray-200 p-2.5">
            <NotificationSettingIcon className="h-7.5 w-7.5" />
            <span className="body">푸시 알림 설정</span>
          </div>

          <div className="border-t border-gray-300 px-2.5 py-2">
            <div className="flex items-center justify-between">
              <span className="caption text-gray-700">
                체크리스트 디데이 알림
              </span>
              <Switch
                checked={isChecklistDdayNotificationOn}
                onChangeChecked={(checked) =>
                  setIsChecklistDdayNotificationOn(checked)
                }
                ariaLabel="체크리스트 디데이 알림 토글"
              />
            </div>
          </div>

          <div className="border-t border-gray-300 px-2.5 py-2">
            <div className="flex items-center justify-between">
              <span className="caption text-gray-700">
                주간 일정 진행률 알림
              </span>
              <Switch
                checked={isWeeklyScheduleNotificationOn}
                onChangeChecked={(checked) =>
                  setIsWeeklyScheduleNotificationOn(checked)
                }
                ariaLabel="주간 일정 진행률 알림 토글"
              />
            </div>
          </div>
        </div>

        <div className="mt-2.5 flex items-center justify-center gap-5">
          <Button size="small" onClick={onClose}>
            취소
          </Button>
          <Button size="small">저장하기</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
