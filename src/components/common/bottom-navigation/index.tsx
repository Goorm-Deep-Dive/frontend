"use client";

import ProcessIcon from "@/components/icons/process-icon";
import ChecklistIcon from "@/components/icons/check-list-icon";
import MyPageIcon from "@/components/icons/mypage-icon";
import { cn } from "@/lib/cn";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNavigation() {
  const pathname = usePathname();

  const MENUS = [
    {
      name: "진행상황",
      icon: ProcessIcon,
      path: "/progress",
    },
    {
      name: "체크리스트",
      icon: ChecklistIcon,
      path: "/checklist",
    },
    {
      name: "마이페이지",
      icon: MyPageIcon,
      path: "/mypage",
    },
  ];

  return (
    <>
      <div
        className="shrink-0 bg-transparent"
        style={{ height: "var(--bottom-nav-reserve)" }}
        aria-hidden
      />
      <div className="fixed bottom-[calc(var(--bottom-nav-reserve))] left-1/2 z-20 flex w-full max-w-[var(--app-max-width)] -translate-x-1/2 justify-end pr-4">
        <Link
          href="/chat"
          aria-label="AI 챗봇"
          className="flex h-17.5 w-17.5 cursor-pointer flex-col items-center rounded-full bg-gray-200 px-2.5 pt-1.5 pb-2.5 shadow-[1px_1px_4px_rgba(0,0,0,0.25)]"
        >
          <Image src="/images/chat-bot.png" alt="" width={32} height={32} />
          <span className="label text-gray-700">AI 챗봇</span>
        </Link>
      </div>
      <nav
        aria-label="바텀 네비게이션"
        className="fixed bottom-0 left-1/2 z-10 w-full max-w-[var(--app-max-width)] -translate-x-1/2 rounded-t-2xl border-t border-[#DADADA] bg-white px-6 pt-4 pb-[env(safe-area-inset-bottom,0px)]"
      >
        <div className="flex items-center justify-center pb-3">
          {MENUS.map((menu) => {
            const isActive =
              pathname === menu.path || pathname.startsWith(`${menu.path}/`);
            const Icon = menu.icon;

            return (
              <Link
                href={menu.path}
                key={menu.path}
                className="flex flex-1 cursor-pointer flex-col items-center gap-2"
              >
                <Icon
                  className={cn(
                    "h-6 w-6 text-gray-900",
                    isActive && "text-primary-1",
                  )}
                />
                <span
                  className={cn(
                    "text-sm text-black",
                    isActive && "text-primary-1",
                  )}
                >
                  {menu.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
