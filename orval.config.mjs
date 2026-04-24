import { loadEnvConfig } from "@next/env";
import { defineConfig } from "orval";

loadEnvConfig(process.cwd());

const OPENAPI_TARGET =
  process.env.NEXT_PUBLIC_ORVAL_OPENAPI_URL ??
  "http://localhost:8090/v3/api-docs";

export default defineConfig({
  api: {
    input: {
      // API 명세서(Swagger/OpenAPI)의 경로
      target: OPENAPI_TARGET,
      override: {
        transformer: (openapi) => {
          if (openapi?.components?.securitySchemes?.["BearerAuth"]) {
            openapi.components.securitySchemes["BearerAuth"] = {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            };
          }
          return openapi;
        },
      },
    },
    output: {
      // 결과물이 저장될 메인 파일 경로
      target: "src/apis/generated/api-client.ts",
      // TypeScript 타입(Interfaces)만 따로 모아둘 폴더 경로
      schemas: "src/apis/generated/model",
      // 생성할 클라이언트 라이브러리 (v5 대응 TanStack Query)
      client: "react-query",
      // 사용할 HTTP 통신 라이브러리
      httpClient: "axios",
      // 타입과 훅을 별도의 파일로 분리하여 빌드 최적화 및 가독성 향상
      mode: "split",
      override: {
        mutator: {
          // 우리가 커스텀하게 만든 Axios 인스턴스 경로와 함수명 연결
          // 모든 API 호출은 이 인스턴스를 거쳐 전역 알림/토큰 처리가 됨
          path: "src/apis/instance.ts",
          name: "customInstance",
        },
        query: {
          // 일반 useQuery 훅 생성 여부
          useQuery: true,
          // useMutation 훅 생성 여부
          useMutation: true,
          // 데이터 조회 시 useSuspenseQuery 훅을 자동 생성
          useSuspenseQuery: true,
          // 필요 시 무한 스크롤용 Suspense 쿼리도 생성 가능
          useSuspenseInfiniteQuery: true,
          // TanStack Query v5 문법으로 생성
          version: 5,
          // 모든 Query에 공통으로 적용할 기본 옵션 (staleTime 등)
          queryOptions: {
            path: "src/apis/config/query-options.ts",
            name: "customQueryOptions",
          },
          // 모든 Mutation에 공통으로 적용할 기본 옵션
          mutationOptions: {
            path: "src/apis/config/mutation-options.ts",
            name: "customMutationOptions",
          },
        },
      },
    },
    hooks: {
      afterAllFilesWrite: "prettier --write",
    },
  },
});
