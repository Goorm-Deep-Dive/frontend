import { Suspense } from "react";

import CalendarAddContent from "./_components/content";

export default function CalendarAddPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex-1" aria-hidden />}>
      <CalendarAddContent />
    </Suspense>
  );
}
