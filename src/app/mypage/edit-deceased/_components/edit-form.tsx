"use client";

import {
  getGetDeceasedProfilesQueryKey,
  useGetDeceasedProfiles,
  useModifyDeceasedProfile,
} from "@/apis/generated/api-client";
import DeceasedInfoForm from "@/app/start/_components/deceased-info-form";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function EditForm({ id }: { id: string }) {
  const router = useRouter();
  const { data: deceasedProfiles, isPending } = useGetDeceasedProfiles();
  const { mutateAsync: modifyDeceasedProfile } = useModifyDeceasedProfile();

  const queryClient = useQueryClient();

  const deceasedProfile = deceasedProfiles?.find(
    (profile) => profile.deceasedProfileId === +id,
  );

  if (isPending) {
    return (
      <p className="body px-5 py-8 text-center text-gray-500">불러오는 중…</p>
    );
  }

  const handleUpdateDeceasedProfile = async (data: {
    name: string;
    date: string;
  }) => {
    try {
      await modifyDeceasedProfile({
        deceasedProfileId: +id,
        data: {
          name: data.name,
          dateOfDeath: data.date,
        },
      });

      await queryClient.invalidateQueries({
        queryKey: getGetDeceasedProfilesQueryKey(),
      });
    } catch {
    } finally {
      router.back();
    }
  };

  return (
    <DeceasedInfoForm
      defaultValues={{
        name: deceasedProfile?.name ?? "",
        date: deceasedProfile?.dateOfDeath ?? "",
      }}
      onSubmit={handleUpdateDeceasedProfile}
    />
  );
}
