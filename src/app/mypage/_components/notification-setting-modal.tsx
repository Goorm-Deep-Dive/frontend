"use client";

import NotificationSettingIcon from "@/components/icons/notification-setting-icon";
import Switch from "@/components/common/switch";
import { CircleX } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  getGetMyProfileQueryKey,
  useGetMyProfile,
  useUpdateNotification,
} from "@/apis/generated/api-client";
import type { UserProfileRes } from "@/apis/generated/model";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type NotificationOptimisticContext = {
  previous: UserProfileRes | undefined;
};

export default function NotificationSettingModal({ isOpen, onClose }: Props) {
  const queryClient = useQueryClient();
  const profileQueryKey = getGetMyProfileQueryKey();

  const { data: myProfile } = useGetMyProfile();

  const { mutate: updateNotificationMutate } = useUpdateNotification<
    unknown,
    NotificationOptimisticContext
  >({
    mutation: {
      onMutate: async ({ data }) => {
        await queryClient.cancelQueries({ queryKey: profileQueryKey });

        const previous =
          queryClient.getQueryData<UserProfileRes>(profileQueryKey);

        queryClient.setQueryData<UserProfileRes>(profileQueryKey, (old) =>
          old != null
            ? { ...old, notificationEnabled: data.notificationEnabled }
            : { notificationEnabled: data.notificationEnabled },
        );

        return { previous };
      },
      onError: (_err, _variables, context) => {
        if (context?.previous !== undefined) {
          queryClient.setQueryData(profileQueryKey, context.previous);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: profileQueryKey });
      },
    },
  });

  const handleChangeNotification = (checked: boolean) => {
    updateNotificationMutate({
      data: { notificationEnabled: checked },
    });
  };

  const notificationEnabled = myProfile?.notificationEnabled ?? false;

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

        <div className="flex items-center justify-between rounded-2xl bg-gray-200 p-2.5">
          <div className="flex items-center gap-4 p-2.5">
            <NotificationSettingIcon className="h-7.5 w-7.5" />
            <span className="body">푸시 알림 설정</span>
          </div>
          <Switch
            checked={notificationEnabled}
            onChangeChecked={handleChangeNotification}
            ariaLabel="푸시 알림 설정 토글"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
