"use client";

import SnsLoginButton from "@/components/common/sns-login-button";
import { useOAuthLoginSuccess } from "@/hooks/use-oauth-login-success";
import { useSocialLogin } from "@/hooks/use-social-login";
import Image from "next/image";

export default function Content() {
  useOAuthLoginSuccess();
  const { login } = useSocialLogin();

  const handleKakaoLogin = () => {
    login("kakao");
  };

  return (
    <div className="flex h-full flex-col gap-8 pt-36">
      <div className="flex flex-col gap-2 px-5">
        <span className="h1 text-gray-900">
          이제 혼자
          <br />
          챙기지 않아도 됩니다
        </span>
        <span className="body text-gray-700">
          장례가 끝난 순간, 곁에서 함께합니다.
        </span>
      </div>

      <div className="mt-auto flex h-130 w-full flex-col items-center justify-end rounded-t-3xl bg-linear-to-b from-[#DEDEDE] to-white pb-6">
        <div className="flex w-full flex-col gap-4 px-5">
          <div className="flex items-center justify-center gap-1">
            <Image src="/icons/info.svg" alt="" width={20} height={20} />
            <span className="body text-gray-900">
              목록 생성 및 알림은 로그인 후 시작 됩니다.
            </span>
          </div>
          <SnsLoginButton sns="kakao" onClick={handleKakaoLogin} />
          <SnsLoginButton sns="google" disabled />
        </div>
      </div>
    </div>
  );
}
