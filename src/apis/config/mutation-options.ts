import { UseMutationOptions } from "@tanstack/react-query";

export const customMutationOptions = <TData, TError, TVariables, TContext>(
  options: Partial<
    UseMutationOptions<TData, TError, TVariables, TContext>
  > = {},
): Partial<UseMutationOptions<TData, TError, TVariables, TContext>> => {
  return {
    // 실패 시 재시도하지 않음
    retry: false,
    // 공통적인 에러 로깅 등이 필요하면 여기에 추가
    onError: (error) => {
      console.error("Mutation Error:", error);
    },
    ...options,
  };
};
