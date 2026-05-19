import type { NotificationRes } from "@/apis/generated/model/notificationRes";
import { cn } from "@/lib/cn";
import {
  formatNotificationCreatedAt,
  formatNotificationDueDate,
} from "@/services/format-notification-date";

type NotificationListItemProps = {
  notification: NotificationRes;
  onClick: () => void;
};

const NotificationListItem = ({
  notification,
  onClick,
}: NotificationListItemProps) => {
  const createdAtLabel = formatNotificationCreatedAt(notification.createdAt);
  const dueDateLabel = formatNotificationDueDate(notification.dueDate);
  const hasMeta = Boolean(notification.deceasedName || dueDateLabel);

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full flex-col gap-2 rounded-2xl px-5 py-4 text-left shadow-[0_0.125rem_0.125rem_0_rgba(0,0,2,0.15)] transition-colors",
        notification.isRead ? "bg-gray-200" : "bg-white",
      )}
    >
      <div className="flex items-start gap-2">
        {!notification.isRead ? (
          <span
            className="bg-primary-1 mt-1.5 size-2 shrink-0 rounded-full"
            aria-hidden
          />
        ) : null}
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <p className="body text-gray-900">{notification.message}</p>

          {hasMeta ? (
            <div className="caption flex flex-wrap items-center gap-x-2 gap-y-1 text-gray-500">
              {notification.deceasedName ? (
                <span>{notification.deceasedName} 님</span>
              ) : null}
              {dueDateLabel ? <span>기한 {dueDateLabel}</span> : null}
            </div>
          ) : null}
        </div>

        {createdAtLabel ? (
          <span className="caption shrink-0 text-gray-500">{createdAtLabel}</span>
        ) : null}
      </div>
    </button>
  );
};

export default NotificationListItem;
