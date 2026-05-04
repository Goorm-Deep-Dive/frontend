"use client";

import Content from "./_components/content";
import { Suspense } from "react";

/** `useSearchParams`(OAuth 훅) 사용 시 필수 — 초기화 전 router 액션 방지 */
export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-40 flex-1" aria-hidden />}>
      <Content />
    </Suspense>
  );
}
