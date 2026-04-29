// app/auth/callback/page.tsx

"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function CallbackPage() {
  const params = useSearchParams();

  useEffect(() => {
    const code = params.get("code");

    if (!code) return;

    // 👉 백엔드로 code 전달
    fetch(`https://api.donghaeng.dev/login/oauth2/code/kakao?code=${code}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, [params]);

  return <div>로그인 처리 중...</div>;
}
