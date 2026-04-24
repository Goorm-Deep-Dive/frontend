import Image from "next/image";
import Link from "next/link";

export default function ButtonNavigation() {
  const menus = [
    {
      name: "진행상황",
      icon: "/icons/process.svg",
      path: "/progress",
    },
    {
      name: "체크리스트",
      icon: "/icons/check.svg",

      path: "/checklist",
    },
    {
      name: "스케줄링",
      icon: "/icons/schedule.svg",
      path: "/schedule",
    },
    {
      name: "마이페이지",
      icon: "/icons/mypage.svg",
      path: "/mypage",
    },
  ];

  return (
    <>
      <nav
        aria-label="바텀 네비게이션"
        className="fixed bottom-0 w-full rounded-t-2xl border-t border-[#DADADA] bg-white px-6 pt-4"
      >
        <div className="flex items-center">
          {menus.map((menu) => (
            <Link
              href={menu.path}
              key={menu.path}
              className={`flex flex-1 flex-col items-center gap-2 pb-10`}
            >
              <Image src={menu.icon} alt={menu.name} width={24} height={24} />
              <span className="text-[14px] text-black">{menu.name}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
