"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";

import { LogOut } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

import Settings from "./settings";
import { useLogout, useWithdraw } from "@/apis/generated/api-client";
import { useRouter } from "next/navigation";
import { useAlertStore } from "@/store/useAlertStore";
import LogoutIcon from "@/components/icons/logout-icon";

const DeceasedProfileList = dynamic(() => import("./deceased-profile-list"), {
  ssr: false,
  loading: () => <Skeleton className="h-26.5 w-full" />,
});

export default function Content() {
  const { replace } = useRouter();
  const { mutateAsync: logout } = useLogout();
  const { mutateAsync: withdrawal } = useWithdraw();

  const { push, pop } = useAlertStore();

  const handleLogoutConfim = () => {
    push({
      title: "로그아웃",
      icon: <LogoutIcon className="h-11.5 w-11.5" />,
      description: (
        <div className="flex flex-col items-center justify-center text-center">
          <span>로그아웃하시겠습니까?</span>
          <span>로그인 후 다시 이용할 수 있습니다.</span>
        </div>
      ),
      buttons: [
        {
          variant: "primary",
          label: "예",
          onClick: handleLogout,
        },
        {
          variant: "secondary",
          label: "아니요",
          onClick: pop,
        },
      ],
    });
  };

  const clearRefreshCookieOnAppOrigin = async () => {
    await fetch("/api/auth/clear-refresh-cookie", {
      method: "POST",
      credentials: "include",
    });
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.clear();
      await clearRefreshCookieOnAppOrigin();
      replace("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleWithdrawalConfim = () => {
    push({
      title: "회원 탈퇴",
      icon: <LogoutIcon className="h-11.5 w-11.5" />,
      description: (
        <div className="flex flex-col items-center justify-center text-center">
          <span>정말 탈퇴하시겠습니까?</span>
          <span>탈퇴 후에는 계정을 복구할 수 없습니다.</span>
        </div>
      ),
      buttons: [
        {
          variant: "primary",
          label: "예",
          onClick: handleWithdrawal,
        },
        {
          variant: "secondary",
          label: "아니요",
          onClick: pop,
        },
      ],
    });
  };

  const handleWithdrawal = async () => {
    try {
      await withdrawal();
      localStorage.clear();
      await clearRefreshCookieOnAppOrigin();
      replace("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex w-full flex-col gap-4.5 p-5">
      <Suspense fallback={<Skeleton className="h-26.5 w-full" />}>
        <DeceasedProfileList />
      </Suspense>

      <Settings />

      <Button
        className="flex items-center justify-center gap-2.5"
        onClick={handleLogoutConfim}
      >
        <LogOut />
        LOGOUT
      </Button>

      <button type="button" onClick={handleWithdrawalConfim}>
        탈퇴하기
      </button>
    </div>
  );
}
