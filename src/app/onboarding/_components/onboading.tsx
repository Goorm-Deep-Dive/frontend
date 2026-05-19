"use client";

import dynamic from "next/dynamic";
import type { ComponentType, SVGProps } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import Splash from "./splash";

const steps = [
  "splash",
  "start",
  "step1",
  "step2",
  "step3",
  "step4",
  "step5",
  "step6",
] as const;

type StepId = (typeof steps)[number];
type IllustrationStepId = Exclude<StepId, "splash">;

type IllustrationProps = SVGProps<SVGSVGElement>;

const ONBOARDING_ILLUSTRATION_BY_STEP: Record<
  IllustrationStepId,
  ComponentType<IllustrationProps>
> = {
  start: dynamic(() => import("./illustrations/onboarding-start-illustration")),
  step1: dynamic(() => import("./illustrations/onboarding-step1-illustration")),
  step2: dynamic(() => import("./illustrations/onboarding-step2-illustration")),
  step3: dynamic(() => import("./illustrations/onboarding-step3-illustration")),
  step4: dynamic(() => import("./illustrations/onboarding-step4-illustration")),
  step5: dynamic(() => import("./illustrations/onboarding-step5-illustration")),
  step6: dynamic(() => import("./illustrations/onboarding-step6-illustration")),
};

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState<StepId>("splash");

  if (step === "splash") {
    return <Splash onNext={() => setStep("start")} />;
  }

  const stepIndex = steps.indexOf(step);
  const Illustration = ONBOARDING_ILLUSTRATION_BY_STEP[step];

  return (
    <div className="relative flex min-h-dvh w-full flex-col items-stretch justify-center bg-[rgba(0,0,0,0.8)]">
      <Illustration
        role="img"
        aria-label={`온보딩 ${step}`}
        className="h-auto max-h-dvh w-full shrink-0 object-contain"
        preserveAspectRatio="xMidYMid meet"
      />

      {step !== "step6" ? (
        <button
          type="button"
          onClick={() => setStep(steps[stepIndex + 1])}
          className="h4 absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer px-4 py-2 text-[#94FAFF] underline"
        >
          다음으로
        </button>
      ) : (
        <div className="absolute bottom-10 w-full px-5">
          <Button
            type="button"
            onClick={async () => {
              // 테스트를 위해 주석처리
              // await completeOnboarding();
              router.push("/login");
              router.refresh();
            }}
          >
            튜토리얼 확인완료
          </Button>
        </div>
      )}
    </div>
  );
}
