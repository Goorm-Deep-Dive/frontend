import { UseMutationOptions } from "@tanstack/react-query";

export const customMutationOptions: Partial<UseMutationOptions> = {
  // 실패 시 재시도하지 않음 (생성/수정 중복 방지)
  retry: false,
  // 공통적인 에러 로깅 등이 필요하면 여기에 추가
  onError: (error) => {
    console.error("Mutation Error:", error);
  },
};
