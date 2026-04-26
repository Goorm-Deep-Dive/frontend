"use client";
import { cn } from "@/lib/cn";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNavigation() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  const MENUS = [
    {
      name: "진행상황",
      icon: "/icons/bottom-navigation/process.svg",
      path: "/progress",
    },
    {
      name: "체크리스트",
      icon: "/icons/bottom-navigation/check.svg",
      path: "/checklist",
    },
    {
      name: "마이페이지",
      icon: "/icons/bottom-navigation/mypage.svg",
      path: "/mypage",
    },
  ];

  return (
    <nav
      aria-label="바텀 네비게이션"
      className="fixed bottom-0 z-10 w-full rounded-t-2xl border-t border-[#DADADA] bg-white"
    >
      <div className="flex items-center justify-center gap-2 pb-7">
        {MENUS.map((menu) => (
          <Link
            href={menu.path}
            key={menu.path}
            className={cn(
              "flex h-20 w-20 flex-1 flex-col items-center justify-center gap-2.5",
              isActive(menu.path) && "text-primary-1",
            )}
          >
            <Image src={menu.icon} alt={menu.name} width={24} height={24} />
            <span className="text-sm">{menu.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
