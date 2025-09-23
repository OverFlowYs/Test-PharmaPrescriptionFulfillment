type ApiError = { message: string; status?: number };

const BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || "";
const USE_MOCK = (import.meta as any).env?.VITE_USE_MOCK === "true";

export async function api<T>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T> {
  // 如果使用 mock，直接使用相对路径；否则拼接 BASE_URL
  const url =
    typeof input === "string" && !input.startsWith("http")
      ? USE_MOCK
        ? input
        : `${BASE_URL}${input}`
      : (input as string);
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    ...init,
  });
  if (!res.ok) {
    let msg = "Request failed";
    const contentType = res.headers.get("content-type") || "";
    try {
      if (contentType.includes("application/json")) {
        const data = await res.json();
        msg = (data as any)?.message || msg;
      } else {
        const text = await res.text();
        // Common dev fallback when HTML is returned instead of JSON
        if (text.startsWith("<!doctype") || text.startsWith("<!DOCTYPE")) {
          msg = "Unexpected HTML response; check mock/MSW setup";
        } else {
          msg = text || msg;
        }
      }
    } catch {
      /* ignore */
    }
    const err: ApiError = { message: msg, status: res.status };
    throw err;
  }
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return res.json() as Promise<T>;
  }
  // Fallback: return text as any to avoid JSON parse errors in dev
  const text = await res.text();
  return text as unknown as T;
}
