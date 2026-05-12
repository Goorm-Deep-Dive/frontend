"use client";
import { completeOnboarding } from "@/app/onboarding/actions";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const steps = ["start", "step1", "step2", "step3", "step4", "step5", "step6"];
export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState<(typeof steps)[number]>("start");
  const stepIndex = steps.indexOf(step);

  return (
    <div className="relative flex max-h-dvh w-full flex-col items-center justify-center">
      <Image
        src={`/onboarding/${step}.svg`}
        alt="start"
        width={100}
        height={100}
        className="max-h-dvh w-full"
      />

      {step !== "step6" ? (
        <button
          onClick={() => setStep(steps[stepIndex + 1])}
          className="h4 absolute bottom-15 cursor-pointer px-4 py-2 text-[#94FAFF] underline"
        >
          다음으로
        </button>
      ) : (
        <div className="absolute bottom-10 px-5">
          <Button
            type="button"
            onClick={async () => {
              await completeOnboarding();
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
