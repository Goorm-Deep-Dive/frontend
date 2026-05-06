"use client";

import {
  getGetDeceasedProfilesQueryKey,
  useCreateDeceasedProfile,
} from "@/apis/generated/api-client";
import DeceasedInfoForm from "./deceased-info-form";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function AddForm() {
  const router = useRouter();
  const { mutateAsync: createDeceasedProfile } = useCreateDeceasedProfile();
  const queryClient = useQueryClient();

  const handleCreateDeceasedProfile = async (data: {
    date: string;
    name: string;
  }) => {
    try {
      await createDeceasedProfile({
        data: {
          dateOfDeath: data.date,
          name: data.name,
        },
      });
      await queryClient.invalidateQueries({
        queryKey: getGetDeceasedProfilesQueryKey(),
      });

      router.push("/create-checklist");
    } catch {
    } finally {
    }
  };

  return <DeceasedInfoForm onSubmit={handleCreateDeceasedProfile} />;
}
