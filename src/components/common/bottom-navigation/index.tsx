"use client";

import ProcessIcon from "@/components/icons/process-icon";
import ChecklistIcon from "@/components/icons/check-list-icon";
import MyPageIcon from "@/components/icons/mypage-icon";
import { cn } from "@/lib/cn";
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
      <div className="fixed bottom-[calc(var(--bottom-nav-reserve))] mx-auto flex w-full max-w-[var(--app-max-width)] justify-end">
        <Link
          href="/chat"
          className="bg-primary-1 mr-2 flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-white shadow-2xl"
        >
          AI 상담
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
