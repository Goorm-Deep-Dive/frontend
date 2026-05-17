"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/cn";
import { useGetOverallProgress } from "@/apis/generated/api-client";
import { buttonVariants } from "@/components/ui/button";
import { useChecklistCategoryStore } from "@/store/useChecklistCategoryStore";
import Link from "next/link";
import NotificationIcon from "@/components/icons/notification-icon";

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

  const selectedCategoryId = useChecklistCategoryStore(
    (s) => s.selectedCategoryId,
  );
  const setSelectedCategoryId = useChecklistCategoryStore(
    (s) => s.setSelectedCategoryId,
  );
  const initializeDefaultFromFirst = useChecklistCategoryStore(
    (s) => s.initializeDefaultFromFirst,
  );

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      onToggleOpen?.(next);
      return next;
    });
  }, [onToggleOpen]);

  const closePanel = useCallback(() => {
    setIsOpen(false);
    onToggleOpen?.(false);
  }, [onToggleOpen]);

  const handleSelectCategory = useCallback(
    (categoryId: number | undefined) => {
      if (categoryId == null) return;
      setSelectedCategoryId(categoryId);
      closePanel();
    },
    [closePanel, setSelectedCategoryId],
  );

  const categoryList = overallProgress?.checklistCategoryProgressResList;

  useEffect(() => {
    const firstId = categoryList?.[0]?.categoryId;
    if (firstId != null) {
      initializeDefaultFromFirst(firstId);
    }
  }, [categoryList, initializeDefaultFromFirst]);

  useEffect(() => {
    if (!categoryList?.length || selectedCategoryId == null) return;
    const exists = categoryList.some(
      (i) => i.categoryId === selectedCategoryId,
    );
    if (!exists) {
      const firstId = categoryList[0]?.categoryId;
      if (firstId != null) setSelectedCategoryId(firstId);
    }
  }, [categoryList, selectedCategoryId, setSelectedCategoryId]);

  const selectedProgress = useMemo(() => {
    if (!categoryList?.length) return undefined;
    return categoryList.find((i) => i.categoryId === selectedCategoryId);
  }, [categoryList, selectedCategoryId]);

  const progressBadgeLabel = useMemo(() => {
    const completed = selectedProgress?.completedCount ?? 0;
    const total = selectedProgress?.totalCount ?? 0;
    return `${completed}/${total} 완료`;
  }, [selectedProgress]);

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
                  {selectedProgress?.categoryName ?? "체크리스트"}
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
                className={buttonVariants({
                  variant: "secondary",
                  size: "small",
                  rounded: true,
                })}
                aria-hidden
              >
                {progressBadgeLabel}
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
                  {categoryList?.map((item, index) => {
                    const cid = item.categoryId;
                    if (cid == null) return null;
                    const isSelected = cid === selectedCategoryId;
                    const isCompleted = item.completedCount === item.totalCount;

                    return (
                      <button
                        key={cid}
                        type="button"
                        className={cn(
                          "flex w-full items-center justify-between gap-4 rounded-lg px-2.5 py-2.5 text-left transition-[opacity,transform,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                          isSelected ? "bg-primary-10" : "bg-gray-100",
                          isOpen
                            ? "translate-y-0 opacity-100"
                            : "translate-y-1 opacity-0",
                        )}
                        style={{
                          transitionDelay: isOpen ? `${index * 45}ms` : "0ms",
                        }}
                        onClick={() => handleSelectCategory(cid)}
                        aria-current={isSelected ? "true" : undefined}
                      >
                        <span className="h2 font-semibold tracking-[-0.02em] text-gray-900">
                          {item.categoryName}
                        </span>

                        <span
                          className={cn(
                            "label h-6.5 min-w-17.5 shrink-0 rounded-2xl px-2.5 leading-6.5 font-bold text-white transition-colors",
                            isCompleted ? "bg-primary-1" : "bg-gray-700",
                          )}
                        >
                          {item.completedCount}/{item.totalCount}{" "}
                          {isCompleted ? "완료" : "미완"}
                        </span>
                      </button>
                    );
                  })}
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
                      ? `${(categoryList?.length ?? 0) * 45 + 60}ms`
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

        <Link
          href="/notifications"
          aria-label="알림 페이지 이동"
          className="flex h-11 w-11 items-center justify-center pt-2 transition-transform active:scale-95"
        >
          <NotificationIcon className="h-10 w-10 text-gray-900" />
        </Link>
      </header>

      <div className="h-[90px] min-h-[90px] w-full" aria-hidden="true" />
    </>
  );
}
