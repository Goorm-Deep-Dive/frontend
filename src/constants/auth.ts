export const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY!;
export const KAKAO_REDIRECT_URI = "http://localhost:3000/auth/callback";

export const AUTH_URL = {
  kakao: `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${encodeURIComponent(
    KAKAO_REDIRECT_URI,
  )}&response_type=code`,
};
