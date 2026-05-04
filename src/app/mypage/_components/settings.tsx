"use client";

import CalendarIcon from "@/components/icons/calendar-icon";
import DocumentIcon from "@/components/icons/document-icon";
import NotificationSettingIcon from "@/components/icons/notification-setting-icon";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import NotificationSettingModal from "./notification-setting-modal";

export default function Settings() {
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col rounded-2xl bg-gray-200 p-2.5 shadow-[0_2px_2px_0_rgba(0,0,0,0.15)]">
        <span className="h3 px-2.5 py-2 text-gray-900">설정</span>

        {/* 알림설정 */}
        <button
          type="button"
          onClick={() => setIsNotificationModalOpen(true)}
          className="flex cursor-pointer items-center justify-between p-2.5"
        >
          <div className="flex items-center justify-start gap-5">
            <NotificationSettingIcon className="h-7.5 w-7.5" />
            <span className="body text-gray-900">알림 설정</span>
          </div>

          <ChevronRight />
        </button>

        {/* 구글 캘린더 연동 */}
        <button
          type="button"
          className="flex cursor-pointer items-center justify-between p-2.5"
        >
          <div className="flex items-center justify-start gap-5">
            <CalendarIcon className="h-7.5 w-7.5" />
            <span className="body text-gray-900">구글 캘린더 연동</span>
          </div>

          <ChevronRight />
        </button>

        {/* 서비스 이용약관 */}
        <button
          type="button"
          className="flex cursor-pointer items-center justify-between p-2.5"
        >
          <div className="flex items-center justify-start gap-5">
            <DocumentIcon className="h-7.5 w-7.5" />
            <span className="body text-gray-900">서비스 이용약관</span>
          </div>

          <ChevronRight />
        </button>
      </div>

      <NotificationSettingModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
      />
    </>
  );
}
