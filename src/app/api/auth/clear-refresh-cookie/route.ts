import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { REFRESH_TOKEN_COOKIE_NAME } from "@/constants/auth-session";

/**
 * 클라이언트 로그아웃/탈퇴 후 미들웨어가 읽는 refresh_token 쿠키를 제거합니다.
 * HttpOnly 쿠키는 브라우저에서 직접 삭제할 수 없어 Route Handler에서 삭제합니다.
 */
export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete(REFRESH_TOKEN_COOKIE_NAME);

  return NextResponse.json({ success: true });
}
