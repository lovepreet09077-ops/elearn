type ApiClientOptions = RequestInit & {
  token?: string;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

export async function apiClient<T>(
  endpoint: string,
  options: ApiClientOptions = {}
): Promise<T> {
  const { token, headers, ...restOptions } = options;
  console.log("api key is ", API_KEY);
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...restOptions,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(headers || {}),
    },
    cache: "no-store",
  });

  let data: unknown = null;

  const contentType = response.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    data = await response.json();
  }

  if (!response.ok) {
    const message =
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof (data as { message?: unknown }).message === "string"
        ? (data as { message: string }).message
        : `Request failed with status ${response.status}`;

    throw new Error(message);
  }

  return data as T;
}