"use client";

import Content from "./_components/content";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-40 flex-1" aria-hidden />}>
      <Content />
    </Suspense>
  );
}
