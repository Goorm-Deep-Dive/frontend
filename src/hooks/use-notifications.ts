"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import {
  getGetNotificationsQueryKey,
  useGetNotifications,
  useMarkAsRead,
} from "@/apis/generated/api-client";
import type { NotificationListRes } from "@/apis/generated/model/notificationListRes";
import type { NotificationRes } from "@/apis/generated/model/notificationRes";

type MarkAsReadContext = {
  previous?: NotificationListRes;
};

export const useNotifications = () => {
  const queryClient = useQueryClient();
  const notificationsQueryKey = getGetNotificationsQueryKey();

  const { data, isPending, isError, refetch } = useGetNotifications();

  const { mutate: markAsReadMutate } = useMarkAsRead<
    unknown,
    MarkAsReadContext
  >({
    mutation: {
      onMutate: async ({ notificationId }) => {
        await queryClient.cancelQueries({ queryKey: notificationsQueryKey });

        const previous = queryClient.getQueryData<NotificationListRes>(
          notificationsQueryKey,
        );

        queryClient.setQueryData<NotificationListRes>(
          notificationsQueryKey,
          (current) => {
            if (!current?.notifications) return current;

            const nextNotifications = current.notifications.map(
              (notification) =>
                notification.notificationId === notificationId
                  ? { ...notification, isRead: true }
                  : notification,
            );

            const wasUnread = current.notifications.some(
              (notification) =>
                notification.notificationId === notificationId &&
                !notification.isRead,
            );

            return {
              ...current,
              notifications: nextNotifications,
              unreadCount: wasUnread
                ? Math.max((current.unreadCount ?? 0) - 1, 0)
                : current.unreadCount,
            };
          },
        );

        return { previous };
      },
      onError: (_error, _variables, context) => {
        if (context?.previous) {
          queryClient.setQueryData(notificationsQueryKey, context.previous);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: notificationsQueryKey });
      },
    },
  });

  const handleNotificationClick = useCallback(
    (notification: NotificationRes) => {
      const notificationId = notification.notificationId;

      if (notificationId && !notification.isRead) {
        markAsReadMutate({ notificationId });
      }
    },
    [markAsReadMutate],
  );

  return {
    notifications: data?.notifications ?? [],
    unreadCount: data?.unreadCount ?? 0,
    isPending,
    isError,
    refetch,
    handleNotificationClick,
  };
};
