"use client";

import ArrowLeftIcon from "@/components/icons/arrow-left-icon";
import NotificationIcon from "@/components/icons/notification-icon";
import { cn } from "@/lib/cn";
import { useRouter } from "next/navigation";

interface HeaderProps {
  title?: React.ReactNode;
  variant?: "default" | "detail" | "checklist";
  onBack?: () => void;
}
const Header = ({ title, variant = "default", onBack }: HeaderProps) => {
  const router = useRouter();

  const handleBack = () => {
    onBack?.();
    router.back();
  };

  if (variant === "default") {
    return (
      <>
        <header
          className={cn(
            "fixed inset-x-0 top-0 z-50 mx-auto flex w-full max-w-[var(--app-max-width)] items-start justify-between rounded-b-2xl bg-white px-5 pt-2.5 pb-4 shadow-sm transition-all duration-300",
          )}
        >
          <span className="h2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {title}
          </span>
          <button className="cursor-pointer" aria-label="알림 페이지 이동">
            <NotificationIcon className="h-10 w-10 text-gray-900" />
          </button>
        </header>
        <div className="h-[70px] min-h-[70px] w-full" aria-hidden="true" />
      </>
    );
  }

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 mx-auto flex w-full max-w-[var(--app-max-width)] items-start justify-between rounded-b-2xl bg-white px-5 pt-2.5 pb-4 shadow-sm transition-all duration-300",
        )}
      >
        <button
          type="button"
          aria-label="뒤로가기"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#dddddd10]"
          onClick={handleBack}
        >
          <ArrowLeftIcon className="text-gray-900" />
        </button>

        <span className="h2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
          {title}
        </span>
        <button className="cursor-pointer" aria-label="알림 페이지 이동">
          <NotificationIcon className="h-10 w-10 text-gray-900" />
        </button>
      </header>
      <div className="h-[70px] min-h-[70px] w-full" aria-hidden="true" />
    </>
  );
};

export default Header;
