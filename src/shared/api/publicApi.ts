import "server-only";

const DEFAULT_API_URL = "http://157.22.252.122:8090";
const API_PREFIX = "/api/v1";

export const PUBLIC_API_REVALIDATE_SECONDS = 3600;

const getApiBaseUrl = () => {
  const rawUrl = process.env.BASE_API_URL || DEFAULT_API_URL;
  const normalizedBaseUrl = rawUrl.replace(/\/$/, "");

  return normalizedBaseUrl.endsWith(API_PREFIX)
    ? normalizedBaseUrl
    : `${normalizedBaseUrl}${API_PREFIX}`;
};

export const fetchPublicApi = async <TData>(
  path: string,
): Promise<TData | null> => {
  try {
    const response = await fetch(`${getApiBaseUrl()}${path}`, {
      next: { revalidate: PUBLIC_API_REVALIDATE_SECONDS },
    });

    if (!response.ok) return null;

    return (await response.json()) as TData;
  } catch {
    return null;
  }
};
