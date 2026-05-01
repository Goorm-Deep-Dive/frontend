"use client";
import {
  getGetDeceasedProfilesQueryKey,
  useChangeActiveDeceasedProfile,
  useDeleteDeceasedProfile,
  useGetDeceasedProfilesSuspense,
} from "@/apis/generated/api-client";
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
import { useRouter } from "next/navigation";
import { useAlertStore } from "@/store/useAlertStore";
import { DeceasedProfileListRes } from "@/apis/generated/model";
import { useQueryClient } from "@tanstack/react-query";

export default function DeceasedProfileList() {
  const router = useRouter();
  const { data: deceasedProfiles } = useGetDeceasedProfilesSuspense();
  const { mutateAsync: deleteDeceasedProfile } = useDeleteDeceasedProfile();
  const { mutateAsync: changeActiveDeceasedProfile } =
    useChangeActiveDeceasedProfile();

  const alert = useAlertStore();
  const queryClient = useQueryClient();

  /**
   * @description 활성화 프로필 선택 확인 alert 표시
   * @param deceasedProfile
   * @returns
   */
  const handleChangeActiveProfileConfirm = (
    deceasedProfile: DeceasedProfileListRes,
  ) => {
    if (deceasedProfile.active) {
      return;
    }

    alert.push({
      title: "프로필 선택",
      description: "해당 프로필을 선택하시겠습니까?",
      buttons: [
        {
          label: "취소",
          onClick: alert.pop,
          variant: "secondary",
        },
        {
          label: "네",
          onClick: () => handleChangeActiveProfile(deceasedProfile),
          variant: "primary",
        },
      ],
    });
  };

  /**
   * @description 활성화 프로필 선택
   * @param deceasedProfile
   */
  const handleChangeActiveProfile = async (
    deceasedProfile: DeceasedProfileListRes,
  ) => {
    try {
      if (!deceasedProfile.deceasedProfileId) return;

      await changeActiveDeceasedProfile({
        deceasedProfileId: deceasedProfile.deceasedProfileId,
      });

      await queryClient.setQueryData(
        getGetDeceasedProfilesQueryKey(),
        (old: DeceasedProfileListRes[]) => {
          return old.map((item) => {
            return {
              ...item,
              active:
                item.deceasedProfileId === deceasedProfile.deceasedProfileId,
            };
          });
        },
      );
    } catch {}
  };

  /**
   * @description 프로필 추가 페이지로 이동
   */
  const goAddDeceased = () => {
    alert.push({
      title: "프로필 추가",
      description: "영면일 및 프로필 등록 화면으로 이동할까요?",
      buttons: [
        {
          label: "아니오",
          onClick: alert.pop,
          variant: "secondary",
        },
        {
          label: "이동하기",
          onClick: () => router.push("/add-deceased"),
          variant: "primary",
        },
      ],
    });
  };

  const goEditDeceased = (deceasedProfile: DeceasedProfileListRes) => {
    const profileId = deceasedProfile.deceasedProfileId;
    if (profileId == null) return;
    router.push(`/mypage/edit-deceased/${profileId}`);
  };

  /**
   * @description 프로필 삭제 확인 alert 표시
   * @param deceasedProfile
   */
  const handleDeleteProfileConfirm = (
    deceasedProfile: DeceasedProfileListRes,
  ) => {
    alert.push({
      title: "프로필 삭제",
      description: "프로필을 삭제하시겠습니까?",
      buttons: [
        {
          label: "아니오",
          onClick: alert.pop,
          variant: "secondary",
        },
        {
          label: "네",
          onClick: () => handleDeleteProfile(deceasedProfile),
          variant: "primary",
        },
      ],
    });
  };

  /**
   * @description 프로필 삭제
   * @param deceasedProfile
   */
  const handleDeleteProfile = async (
    deceasedProfile: DeceasedProfileListRes,
  ) => {
    try {
      if (!deceasedProfile.deceasedProfileId) return;
      await deleteDeceasedProfile({
        deceasedProfileId: deceasedProfile.deceasedProfileId,
      });
      await queryClient.invalidateQueries({
        queryKey: getGetDeceasedProfilesQueryKey(),
      });
    } catch {}
  };

  return (
    <>
      {deceasedProfiles.map((deceasedProfile, index) => (
        <div
          key={deceasedProfile.deceasedProfileId}
          className="flex flex-col rounded-2xl bg-gray-200 py-4.5 shadow-[0_2px_2px_0_rgba(0,0,2,0.15)]"
        >
          <div className="relative">
            <button
              type="button"
              aria-label="활성화 프로필 선택"
              className="flex w-full min-w-0 items-center justify-start gap-2 pr-13 text-left"
              onClick={() => handleChangeActiveProfileConfirm(deceasedProfile)}
            >
              <div
                className={cn(
                  "flex h-6.5 w-11 shrink-0 items-center justify-center rounded-tr-2xl rounded-br-2xl bg-gray-500",
                  deceasedProfile.active && "bg-primary-1",
                )}
              >
                <span className="label text-white">{index + 1}</span>
              </div>
              <span className="h3 truncate text-gray-900">
                {deceasedProfile.name} 님
              </span>
              {deceasedProfile.active && (
                <span className="label text-primary-1 shrink-0">사용중</span>
              )}
            </button>
            <div className="absolute top-1/2 right-2 z-10 -translate-y-1/2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    aria-label="프로필 메뉴"
                    className="flex h-11 w-11 cursor-pointer items-center justify-center"
                  >
                    <UnionIcon className="h-5 w-5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => goEditDeceased(deceasedProfile)}
                  >
                    <Pencil className="h-4 w-4 text-gray-700" />
                    <span className="caption">수정하기</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDeleteProfileConfirm(deceasedProfile)}
                  >
                    <Trash2 className="h-4 w-4 text-gray-700" />
                    <span className="caption">삭제하기</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
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

      <button
        className="flex w-full cursor-pointer flex-col items-center justify-center gap-2.5 rounded-2xl bg-gray-200 py-4.5 shadow-[0_2px_2px_0_rgba(0,0,2,0.15)]"
        onClick={goAddDeceased}
      >
        <AddPeopleIcon className="h-8 w-8" />
        <span className="body text-gray-900">프로필 추가하기</span>
      </button>
    </>
  );
}
