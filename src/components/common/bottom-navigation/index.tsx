import ProcessIcon from "@/components/icons/process-icon";
import ChecklistIcon from "@/components/icons/check-list-icon";
import ScheduleIcon from "@/components/icons/schedule-icon";
import MyPageIcon from "@/components/icons/mypage-icon";
import Image from "next/image";
import Link from "next/link";

export default function BottomNavigation() {
  const MENUS = [
    {
      name: "진행상황",
      icon: <ProcessIcon />,
      path: "/progress",
    },
    {
      name: "체크리스트",
      icon: <ChecklistIcon />,
      path: "/checklist",
    },
    {
      name: "스케줄링",
      icon: <ScheduleIcon />,
      path: "/schedule",
    },
    {
      name: "마이페이지",
      icon: <MyPageIcon />,
      path: "/mypage",
    },
  ];

  return (
    <>
      <div className="h-25 min-h-25" />
      <nav
        aria-label="바텀 네비게이션"
        className="fixed bottom-0 z-10 w-[var(--app-max-width)] rounded-t-2xl border-t border-[#DADADA] bg-white px-6 pt-4"
      >
        <div className="flex items-center">
          {MENUS.map((menu) => (
            <Link
              href={menu.path}
              key={menu.path}
              className="flex flex-1 flex-col items-center gap-2 pb-10"
            >
              {menu.icon}
              <span className="text-sm text-black">{menu.name}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
