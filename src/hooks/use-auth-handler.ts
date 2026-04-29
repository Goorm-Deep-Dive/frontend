import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const useAuthHandler = (provider: string) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (code) {
      console.log(`${provider} 로그인 성공! 코드:`, code);
      router.push("/");
    }
  }, [provider, router, searchParams]);
};
