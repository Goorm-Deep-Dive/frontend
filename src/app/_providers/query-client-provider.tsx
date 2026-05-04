"use client";

import QueryErrorBoundary from "./query-error-boundary";
import {
  QueryClient,
  QueryClientProvider as TanStackQueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: 1,
        refetchOnWindowFocus: false,
        /**
         * 클라이언트에서만 Error Boundary로 전파. SSR/빌드 프리렌더 시에는
         * localStorage·쿠키 없이 API가 401이 나도 정적 생성이 깨지지 않게 함.
         */
        throwOnError: () => typeof window !== "undefined",
      },
    },
  });

export default function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(createQueryClient);

  return (
    <TanStackQueryClientProvider client={queryClient}>
      <QueryErrorBoundary>{children}</QueryErrorBoundary>
    </TanStackQueryClientProvider>
  );
}
