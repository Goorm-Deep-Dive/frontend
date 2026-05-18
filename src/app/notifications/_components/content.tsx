"use client";

import CommonError from "@/components/common/error";
import { DotSpinner } from "@/components/common/loading";
import { useNotifications } from "@/hooks/use-notifications";

import NotificationListItem from "./notification-list-item";

export default function Content() {
  const {
    notifications,
    unreadCount,
    isPending,
    isError,
    refetch,
    handleNotificationClick,
  } = useNotifications();

  if (isPending) {
    return (
      <div className="flex flex-1 items-center justify-center py-20">
        <DotSpinner size="lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-1 items-center justify-center px-5 py-10">
        <CommonError onRetry={() => refetch()} />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 px-5 py-5">
      {unreadCount > 0 ? (
        <p className="caption text-primary-1">읽지 않음 {unreadCount}건</p>
      ) : null}

      {notifications.length === 0 ? (
        <div className="flex flex-1 items-center justify-center py-20">
          <p className="caption text-gray-500">받은 알림이 없습니다.</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {notifications.map((notification, index) => {
            const notificationKey =
              notification.notificationId ??
              `${notification.createdAt}-${notification.message}-${index}`;

            return (
              <li key={notificationKey}>
                <NotificationListItem
                  notification={notification}
                  onClick={() => handleNotificationClick(notification)}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
