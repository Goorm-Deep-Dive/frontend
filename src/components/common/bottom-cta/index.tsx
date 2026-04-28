"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function BottomCTA({ children, className }: Props) {
  const ctaRef = useRef<HTMLDivElement>(null);
  const [spacerHeight, setSpacerHeight] = useState(0);

  useEffect(() => {
    const element = ctaRef.current;
    if (!element) return;

    const updateHeight = () => {
      setSpacerHeight(element.offsetHeight);
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(element);
    window.addEventListener("resize", updateHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <>
      <div aria-hidden className="h-37.5" />
      <div
        ref={ctaRef}
        className={cn(
          "fixed right-0 bottom-0 left-0 z-40 mx-auto flex h-37.5 max-w-(--app-max-width) items-center justify-center rounded-tl-2xl rounded-tr-2xl bg-gray-200 px-5 pt-5 pb-[calc(env(safe-area-inset-bottom)+20px)]",
          className,
        )}
      >
        {children}
      </div>
    </>
  );
}
