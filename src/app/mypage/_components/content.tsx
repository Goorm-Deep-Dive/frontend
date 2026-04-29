"use client";
import { Suspense } from "react";

import { LogOut } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

import DeceasedProfileList from "./deceased-profile-list";
import Settings from "./settings";
import { useLogout } from "@/apis/generated/api-client";
import { useRouter } from "next/navigation";

export default function Content() {
  const { replace } = useRouter();
  const { mutateAsync: logout } = useLogout();

  const handleLogout = async () => {
    try {
      await logout();
      replace("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex w-full flex-col gap-4.5 p-5">
      <Suspense fallback={<Skeleton className="h-26.5 w-full" />}>
        <DeceasedProfileList />
      </Suspense>

      <Settings />

      <Button
        className="flex items-center justify-center gap-2.5"
        onClick={handleLogout}
      >
        <LogOut />
        LOGOUT
      </Button>

      <button>탈퇴하기</button>
    </div>
  );
}
