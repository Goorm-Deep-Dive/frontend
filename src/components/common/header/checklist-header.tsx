"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";

import { cn } from "@/lib/cn";
import { useGetOverallProgress } from "@/apis/generated/api-client";
import { Button } from "@/components/ui/button";

interface Props {
  defaultOpen?: boolean;
  onToggleOpen?: (isOpen: boolean) => void;
}

export default function ChecklistHeader({
  defaultOpen = false,
  onToggleOpen,
}: Props) {
  const { data: overallProgress } = useGetOverallProgress();
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      onToggleOpen?.(next);
      return next;
    });
  }, [onToggleOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-50 mx-auto flex w-full max-w-[var(--app-max-width)] items-start justify-between rounded-b-2xl bg-white px-5 pt-2.5 pb-4 shadow-sm transition-all duration-300",
        )}
      >
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center pt-2 transition-transform active:scale-95"
          onClick={handleToggle}
          aria-controls="checklist-header-panel"
          aria-expanded={isOpen}
          aria-label="메뉴 토글"
        >
          <Image src="/icons/header/menu.svg" alt="" width={14} height={12} />
        </button>

        <div className="flex flex-1 flex-col px-2">
          <div id="checklist-header-panel" className="flex flex-col gap-3">
            <button
              type="button"
              className="bg-primary-10 flex w-full items-center justify-between gap-4 rounded-lg px-2.5 py-2.5 transition-colors active:opacity-90"
              onClick={handleToggle}
              aria-controls="checklist-header-panel"
              aria-expanded={isOpen}
              aria-label="메뉴 토글"
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

              <Button variant="secondary" size="small" rounded>
                0/0 완료
              </Button>
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
                  {overallProgress?.checklistCategoryProgressResList?.map(
                    (item, index) => (
                      <div
                        key={item.categoryId}
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
                          {item.categoryName}
                        </span>

                        <span
                          className={cn(
                            "label h-6.5 min-w-17.5 rounded-2xl px-2.5 leading-6.5 font-bold text-white transition-colors",
                            item.completedCount === item.totalCount
                              ? "bg-primary-1"
                              : "bg-gray-700",
                          )}
                        >
                          {item.completedCount}/{item.totalCount} 미완
                        </span>
                      </div>
                    ),
                  )}
                </div>

                <button
                  type="button"
                  className={cn(
                    "mx-auto mt-5 flex h-11 w-11 items-center justify-center rounded-full transition-[opacity,transform,background-color] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-gray-50",
                    isOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-1 opacity-0",
                  )}
                  style={{
                    transitionDelay: isOpen
                      ? `${(overallProgress?.checklistCategoryProgressResList?.length ?? 0) * 45 + 60}ms`
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

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center pt-2 transition-transform active:scale-95"
          aria-label="알림"
        >
          <Image src="/icons/header/bell.svg" alt="" width={44} height={44} />
        </button>
      </header>

      <div className="h-[70px] w-full" aria-hidden="true" />
    </>
  );
}
