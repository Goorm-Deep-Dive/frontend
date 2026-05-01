import { Suspense } from "react";
import ChecklistForm from "./checklist-form";
import PageSkeleton from "./page-skeleton";

export default function Content() {
  return (
    <>
      <Suspense fallback={<PageSkeleton />}>
        <ChecklistForm />
      </Suspense>
    </>
  );
}
