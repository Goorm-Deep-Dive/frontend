"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import ProgressBar from "@/components/common/progress-bar";

const SPLASH_DURATION_MS = 2500;

interface Props {
  onNext: () => void;
}

export default function Splash({ onNext }: Props) {
  const [progress, setProgress] = useState(0);
  const onNextRef = useRef(onNext);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    onNextRef.current = onNext;
  }, [onNext]);

  useEffect(() => {
    let frameId = 0;
    let isCancelled = false;
    const startTime = performance.now();

    const tick = (now: number) => {
      if (isCancelled) {
        return;
      }

      const elapsed = now - startTime;
      const nextProgress = Math.min(100, (elapsed / SPLASH_DURATION_MS) * 100);

      setProgress(nextProgress);

      if (nextProgress >= 100) {
        if (!hasCompletedRef.current) {
          hasCompletedRef.current = true;
          onNextRef.current();
        }

        return;
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      isCancelled = true;
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2.5">
      <div className="flex h-70 w-full flex-col items-start justify-center gap-2.5 px-5">
        <span className="h1 text-gray-900">
          이제 혼자
          <br />
          챙기지 않아도 됩니다
        </span>
        <span className="body text-gray-700">
          장례가 끝난 순간, 곁에서 함께합니다.
        </span>
      </div>

      <Image
        src="/images/logo_final.png"
        alt="logo"
        width={290}
        height={290}
        priority
      />

      <div className="flex w-full flex-col items-center justify-center px-5">
        <span className="body text-gray-900">
          행정 절차의 부담을 덜어드리는
          <br />
          <span className="h4">길잡이로 동행하겠습니다.</span>
        </span>

        <ProgressBar value={progress} className="mt-10 w-full" />
      </div>
    </div>
  );
}
