"use client";
import { useGetDeceasedProfilesSuspense } from "@/apis/generated/api-client";
import AddPeopleIcon from "@/components/icons/add-people-icon";
import UnionIcon from "@/components/icons/union-icon";
import { cn } from "@/lib/cn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";

export default function DeceasedProfileList() {
  const { data: deceasedProfiles } = useGetDeceasedProfilesSuspense();

  return (
    <>
      {deceasedProfiles.map((deceasedProfile, index) => (
        <div
          key={deceasedProfile.deceasedProfileId}
          className="flex flex-col rounded-2xl bg-gray-200 py-4.5 shadow-[0_2px_2px_0_rgba(0,0,2,0.15)]"
        >
          <div className="flex items-center justify-between gap-1">
            <div className="flex items-center justify-start gap-2">
              <div
                className={cn(
                  "flex h-6.5 w-11 items-center justify-center rounded-tr-2xl rounded-br-2xl bg-gray-500",
                  deceasedProfile.active && "bg-primary-1",
                )}
              >
                <span className="label text-white">{index + 1}</span>
              </div>
              <span className="h3 text-gray-900">
                {deceasedProfile.name} 님
              </span>
              {deceasedProfile.active && (
                <span className="label text-primary-1">사용중</span>
              )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex h-11 w-11 cursor-pointer items-center justify-center"
                >
                  <UnionIcon className="h-5 w-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Pencil className="h-4 w-4 text-gray-700" />
                  <span className="caption">수정하기</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Trash2 className="h-4 w-4 text-gray-700" />
                  <span className="caption">삭제하기</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center justify-start gap-2.5 pl-13">
            <span className="body text-gray-900">고인 사망일자</span>
            <span className="body text-gray-900">
              {deceasedProfile.dateOfDeath &&
                format(new Date(deceasedProfile.dateOfDeath), "yyyy.MM.dd")}
            </span>
          </div>
        </div>
      ))}

      <button className="flex w-full cursor-pointer flex-col items-center justify-center gap-2.5 rounded-2xl bg-gray-200 py-4.5 shadow-[0_2px_2px_0_rgba(0,0,2,0.15)]">
        <AddPeopleIcon className="h-8 w-8" />
        <span className="body text-gray-900">프로필 추가하기</span>
      </button>
    </>
  );
}
