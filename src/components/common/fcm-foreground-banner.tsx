"use client";

import { useRouter } from "next/navigation";

import CloseIcon from "@/components/icons/close-icon";
import NotificationDefaultIcon from "@/components/icons/notification-default-icon";
import { cn } from "@/lib/cn";
import { useFcmForegroundStore } from "@/store/use-fcm-foreground-store";

const FcmForegroundBanner = () => {
  const router = useRouter();
  const notifications = useFcmForegroundStore((state) => state.notifications);
  const dismiss = useFcmForegroundStore((state) => state.dismiss);

  if (notifications.length === 0) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-60 mx-auto flex w-full max-w-(--app-max-width) flex-col gap-2.5 px-4 pt-[max(0.75rem,env(safe-area-inset-top))]"
      role="region"
      aria-label="앱 알림"
    >
      {notifications.map((notification) => {
        const handleDismiss = (event: React.MouseEvent) => {
          event.stopPropagation();
          dismiss(notification.id);
        };

        const handleNavigate = () => {
          dismiss(notification.id);

          if (notification.url) {
            router.push(notification.url);
          }
        };

        return (
          <article
            key={notification.id}
            className={cn(
              "animate-in fade-in slide-in-from-top-2 fill-mode-both pointer-events-auto flex w-full items-stretch gap-3 rounded-2xl bg-white p-3 pr-2 shadow-[0_0.125rem_0.75rem_0_rgba(0,0,0,0.12)] ring-1 ring-gray-200/80 duration-300",
            )}
          >
            <div className="bg-primary-bg flex size-11 shrink-0 items-center justify-center rounded-xl">
              <NotificationDefaultIcon
                className="text-primary-1 size-7"
                aria-hidden
              />
            </div>

            <button
              type="button"
              onClick={handleNavigate}
              disabled={!notification.url}
              className={cn(
                "flex min-w-0 flex-1 flex-col gap-1 py-0.5 text-left",
                notification.url ? "cursor-pointer" : "cursor-default",
              )}
            >
              <p className="body line-clamp-2 font-medium text-gray-900">
                {notification.title}
              </p>
              {notification.body ? (
                <p className="caption line-clamp-2 text-gray-500">
                  {notification.body}
                </p>
              ) : null}
              {notification.url ? (
                <span className="caption text-primary-1 mt-0.5 font-medium">
                  자세히 보기
                </span>
              ) : null}
            </button>

            <button
              type="button"
              onClick={handleDismiss}
              aria-label="알림 닫기"
              className="flex size-9 shrink-0 cursor-pointer items-center justify-center self-start rounded-full text-gray-500 transition-colors hover:bg-gray-200 active:scale-95"
            >
              <CloseIcon className="size-6 text-gray-700" aria-hidden />
            </button>
          </article>
        );
      })}
    </div>
  );
};

export default FcmForegroundBanner;
