const INTERNAL_PATH_PATTERN = /^\/[a-zA-Z0-9/_\-?=&%#.]*$/;

export const resolveSafeFcmNavigationPath = (
  url: string | undefined,
): string | null => {
  if (!url?.trim()) return null;

  const trimmed = url.trim();

  if (trimmed.startsWith("/")) {
    if (trimmed.startsWith("//")) return null;

    try {
      const { pathname, search, hash } = new URL(trimmed, "http://localhost");
      const path = `${pathname}${search}${hash}`;
      return INTERNAL_PATH_PATTERN.test(path) ? path : null;
    } catch {
      return null;
    }
  }

  if (typeof window === "undefined") return null;

  try {
    const parsed = new URL(trimmed);
    if (parsed.origin !== window.location.origin) return null;

    const path = `${parsed.pathname}${parsed.search}${parsed.hash}`;
    return path.startsWith("/") ? path : null;
  } catch {
    return null;
  }
};
