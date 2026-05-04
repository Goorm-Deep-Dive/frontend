"use client";

import dynamic from "next/dynamic";
import ChecklistFormSkeleton from "./skeleton";

const ChecklistFormClientOnly = dynamic(() => import("./index"), {
  ssr: false,
  loading: () => <ChecklistFormSkeleton />,
});

export default ChecklistFormClientOnly;
