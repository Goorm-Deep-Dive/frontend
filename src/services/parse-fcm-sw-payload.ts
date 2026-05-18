/** FCM data 필드는 항상 string — 백엔드/플랫폼별 키 이름 통합 */
export type ParsedFcmSwPayload = {
  title: string;
  body: string;
  url: string;
};

type FcmPayloadLike = {
  notification?: { title?: string; body?: string };
  data?: Record<string, string | undefined>;
  fcmOptions?: { link?: string };
};

const readDataField = (
  data: Record<string, string | undefined> | undefined,
  keys: string[],
): string => {
  if (!data) return "";

  for (const key of keys) {
    const value = data[key];
    if (value !== undefined && value !== "") {
      return String(value);
    }
  }

  return "";
};

export const parseFcmSwPayload = (
  payload: FcmPayloadLike,
): ParsedFcmSwPayload => {
  const data = payload.data;

  const title =
    payload.notification?.title ||
    readDataField(data, ["title", "subject"]) ||
    "알림";

  const body =
    payload.notification?.body ||
    readDataField(data, ["body", "message", "content"]) ||
    "";

  const url =
    readDataField(data, ["url", "click_action", "link"]) ||
    payload.fcmOptions?.link ||
    "/";

  return { title, body, url };
};
