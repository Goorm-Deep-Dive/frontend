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
      <div className="h-25 min-h-25" />
      <nav
        aria-label="바텀 네비게이션"
        className="fixed bottom-0 z-10 w-full max-w-(--app-max-width) rounded-t-2xl border-t border-[#DADADA] bg-white px-6 pt-4"
      >
        <div className="flex items-center">
          {MENUS.map((menu) => {
            const isActive =
              pathname === menu.path || pathname.startsWith(`${menu.path}/`);
            const Icon = menu.icon;

            return (
              <Link
                href={menu.path}
                key={menu.path}
                className="flex flex-1 cursor-pointer flex-col items-center gap-2 pb-10"
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
