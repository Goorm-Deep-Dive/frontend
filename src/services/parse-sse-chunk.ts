const SSE_DONE_MARKER = "[DONE]";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === "object";

const pickStringField = (
  record: Record<string, unknown>,
  keys: readonly string[],
): string | null => {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string") {
      return value;
    }
  }

  return null;
};

export const extractSsePayload = (rawEvent: string): string => {
  const dataLines = rawEvent
    .split(/\r?\n/)
    .filter((line) => line.startsWith("data:"))
    .map((line) => line.replace(/^data:\s?/, ""));

  return dataLines.join("\n").trim();
};

export const parseSseChunk = (
  payload: string,
): { type: "done" } | { type: "delta"; value: string } | null => {
  const trimmed = payload.trim();
  if (!trimmed) return null;
  if (trimmed === SSE_DONE_MARKER) return { type: "done" };

  try {
    const parsed: unknown = JSON.parse(trimmed);
    if (!isRecord(parsed)) {
      return { type: "delta", value: trimmed };
    }

    const direct = pickStringField(parsed, [
      "content",
      "message",
      "delta",
      "text",
      "data",
    ]);
    if (direct) {
      return { type: "delta", value: direct };
    }

    const nested = parsed.data;
    if (typeof nested === "string") {
      return { type: "delta", value: nested };
    }

    if (isRecord(nested)) {
      const nestedValue = pickStringField(nested, ["content", "message"]);
      if (nestedValue) {
        return { type: "delta", value: nestedValue };
      }
    }
  } catch {
    return { type: "delta", value: trimmed };
  }

  return null;
};
