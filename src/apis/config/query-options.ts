type QueryOptionsLike = Record<string, unknown>;

export const customQueryOptions = <TOptions extends QueryOptionsLike>(
  options: TOptions,
): TOptions => {
  return {
    // 데이터가 'fresh'한 시간 (5분)
    staleTime: 1000 * 60 * 5,
    // 윈도우 포커스 시 자동 리페칭 끔
    refetchOnWindowFocus: false,
    // 에러 발생 시 재시도 횟수
    retry: 2,
    ...options,
  } as TOptions;
};
