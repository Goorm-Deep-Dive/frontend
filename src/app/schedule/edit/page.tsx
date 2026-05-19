import { Suspense } from "react";

import CalendarEditContent from "./_components/content";

export default function CalendarEditPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex-1" aria-hidden />}>
      <CalendarEditContent />
    </Suspense>
  );
}
