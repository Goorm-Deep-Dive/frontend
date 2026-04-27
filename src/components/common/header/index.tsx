"use client";

import { cn } from "@/lib/cn";
import Image from "next/image";
import { useMemo, useState } from "react";

interface ChecklistDepartmentItem {
  id: string;
  name: string;
  isCompleted: boolean;
  completed: number;
  total: number;
}

interface HeaderProps {
  title?: React.ReactNode;
  variant?: "default" | "checklist";
  checklistItems?: ChecklistDepartmentItem[];
  defaultOpen?: boolean;
  onToggleOpen?: (isOpen: boolean) => void;
}
const Header = ({
  title,
  variant = "default",
  checklistItems = [],
  defaultOpen = false,
  onToggleOpen,
}: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  // 💡 시니어의 계산 로직: 데이터에 기반한 실시간 현황 파악
  const stats = useMemo(() => {
    const total = checklistItems.length;
    const completed = checklistItems.filter((item) => item.isCompleted).length;
    const allDone = total > 0 && total === completed;
    return { total, completed, allDone };
  }, [checklistItems]);

  const handleToggle = () => {
    const nextOpen = !isOpen;
    setIsOpen(nextOpen);
    onToggleOpen?.(nextOpen);
  };

  if (variant !== "checklist") {
    return (
      <header className="sticky top-0 z-50 flex h-[60px] items-center bg-white px-5 py-4">
        {title}
      </header>
    );
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-50 flex w-full items-start justify-between rounded-b-2xl bg-white px-5 pt-2.5 pb-4 shadow-sm transition-all duration-300",
        )}
      >
        <button
          className="flex h-11 w-11 items-center justify-center pt-2 transition-transform active:scale-95"
          onClick={handleToggle}
          aria-expanded={isOpen}
          aria-label="메뉴 토글"
        >
          <Image src="/icons/header/menu.svg" alt="" width={14} height={12} />
        </button>

        <div className="flex flex-1 flex-col px-2">
          <div id="checklist-header-panel" className="flex flex-col gap-3">
            <button
              className="bg-primary-10 active:bg-primary-20 flex w-full items-center justify-between gap-4 rounded-lg px-2.5 py-2.5 transition-colors"
              onClick={handleToggle}
            >
              <div className="flex items-center gap-2.5">
                <span className="h2 text-primary-1 font-semibold tracking-[-0.02em]">
                  체크리스트
                </span>
                <Image
                  src="/icons/header/arrow-up.svg"
                  alt=""
                  width={10}
                  height={10}
                  className={cn(
                    "transition-transform duration-300",
                    !isOpen && "rotate-180",
                  )}
                />
              </div>
              <span
                className={cn(
                  "label h-6.5 min-w-17.5 rounded-2xl px-2.5 leading-6.5 font-bold text-white transition-colors",
                  stats.allDone ? "bg-primary-1" : "bg-gray-700",
                )}
              >
                {stats.completed}/{stats.total} 완료
              </span>
            </button>

            <div
              className={cn(
                "grid transition-[grid-template-rows,opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                isOpen
                  ? "mt-0 translate-y-0 grid-rows-[1fr] opacity-100"
                  : "pointer-events-none mt-0 -translate-y-1 grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <div className="flex flex-col gap-3">
                  {checklistItems.map((item, index) => (
                    <div
                      key={item.id}
                      className={cn(
                        "flex items-center justify-between gap-4 rounded-lg bg-gray-100 px-2.5 py-2.5 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        isOpen
                          ? "translate-y-0 opacity-100"
                          : "translate-y-1 opacity-0",
                      )}
                      style={{
                        transitionDelay: isOpen ? `${index * 45}ms` : "0ms",
                      }}
                    >
                      <span className="h2 font-semibold tracking-[-0.02em] text-gray-900">
                        {item.name}
                      </span>

                      <span
                        className={cn(
                          "label h-6.5 min-w-17.5 rounded-2xl px-2.5 leading-6.5 font-bold text-white transition-colors",
                          item.completed === item.total
                            ? "bg-primary-1"
                            : "bg-gray-700",
                        )}
                      >
                        {item.completed}/{item.total} 미완
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  className={cn(
                    "mx-auto mt-5 flex h-11 w-11 items-center justify-center rounded-full transition-[opacity,transform,background-color] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-gray-50",
                    isOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-1 opacity-0",
                  )}
                  style={{
                    transitionDelay: isOpen
                      ? `${checklistItems.length * 45 + 60}ms`
                      : "0ms",
                  }}
                  onClick={handleToggle}
                  aria-label="닫기"
                  tabIndex={isOpen ? 0 : -1}
                >
                  <Image
                    src="/icons/header/close.svg"
                    alt=""
                    width={44}
                    height={44}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <button className="flex h-11 w-11 items-center justify-center pt-2 transition-transform active:scale-95">
          <Image
            src="/icons/header/bell.svg"
            alt="알림"
            width={44}
            height={44}
          />
        </button>
      </header>

      {/* Fixed 헤더의 높이만큼 공간 확보용 더미 div */}
      <div className="h-[70px] w-full" aria-hidden="true" />
    </>
  );
};

export default Header;
