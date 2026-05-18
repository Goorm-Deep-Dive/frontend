export const maskFcmTokenForLog = (token: string): string =>
  `${token.slice(0, 6)}...`;
