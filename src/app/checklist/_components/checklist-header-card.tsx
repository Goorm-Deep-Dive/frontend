import {
  getGetSurveyListQueryKey,
  useResetSurvey,
} from "@/apis/generated/api-client";
import AlertWarningIcon from "@/components/icons/alert-warning-icon";
import ListCutIcon from "@/components/icons/list-cut-icon";
import ResetSurveyIcon from "@/components/icons/reset-survey-icon";
import { useAlertStore } from "@/store/useAlertStore";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface Props {
  profile: string;
  count: number;
}
export default function ChecklistHeaderCard({ profile, count }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutateAsync: resetSurvey } = useResetSurvey();

  const { push, pop } = useAlertStore();

  const handleResetSurveyConfirm = () => {
    push({
      icon: <AlertWarningIcon className="size-9" />,
      variant: "negative",
      title: "잠깐, 정말 다시 하실 건가요?",
      description: (
        <div className="flex flex-col items-center text-center">
          설문과 체크리스트가 모두 초기화돼요.
          <br />
          지금까지 완료한 항목은 복구할 수 없어요.
        </div>
      ),
      buttons: [
        {
          label: "취소",
          onClick: pop,
          variant: "secondary",
        },
        {
          label: "다시하기",
          onClick: handleResetSurvey,
          variant: "negative",
        },
      ],
    });
  };

  const handleResetSurvey = async () => {
    try {
      await resetSurvey();
      await queryClient.invalidateQueries({
        queryKey: getGetSurveyListQueryKey(),
      });
      router.push("/create-checklist");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="bg-gr2 border-gray-30 flex flex-col gap-5 rounded-lg border px-9 py-7.5 pb-10">
      <div className="flex justify-center">
        <div className="flex items-end gap-5">
          <div className="flex flex-col">
            <span className="h4 text-gray-900">{profile}</span>
            <span className="body">처리해야 할 일이</span>
          </div>
          <div className="flex items-end gap-2.5">
            <span className="relative text-[2.5rem] leading-none font-semibold text-gray-900">
              {count}건
            </span>
            <span className="body">있습니다.</span>
          </div>
        </div>
      </div>

      <div className="flex w-full gap-2.5">
        <button className="label flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-lg bg-gray-700 py-2 text-white">
          <ListCutIcon />
          리스트 편집하기
        </button>
        <button
          className="label flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-lg bg-gray-700 py-2 text-white"
          onClick={handleResetSurveyConfirm}
        >
          <ResetSurveyIcon />
          설문 다시하기
        </button>
      </div>
    </div>
  );
}
