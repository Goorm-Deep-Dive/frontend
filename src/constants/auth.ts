export const REDIRECT_URI = `${process.env.NEXT_PUBLIC_FRONT_URL}/login`;

export const AUTH_URL = {
  kakao: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/oauth2/authorization/kakao?redirect_uri=${REDIRECT_URI}`,
};
