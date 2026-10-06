export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface RequestOptions extends RequestInit {
  timeout?: number;
}

function responseMessage(value: unknown): string | undefined {
  if (typeof value !== 'object' || value === null || !('message' in value)) return;
  return typeof value.message === 'string' ? value.message : undefined;
}

/** All frontend HTTP requests use the same timeout and readable error handling. */
export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { timeout = 240_000, headers, ...fetchOptions } = options;
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeout);
  const requestHeaders = new Headers(headers);
  requestHeaders.set('Content-Type', 'application/json');

  try {
    const response = await fetch(`/api${path}`, {
      ...fetchOptions,
      headers: requestHeaders,
      signal: controller.signal,
    });
    let data: unknown;
    try {
      data = JSON.parse(await response.text());
    } catch {
      throw new ApiError(
        'The backend returned an unexpected response. Check that Spring Boot is running on port 8081.',
        response.status,
      );
    }
    if (!response.ok) {
      throw new ApiError(
        responseMessage(data) || 'The request could not be completed.',
        response.status,
      );
    }
    return data as T;
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError(
        'The local model took too long. Try a shorter question, or check the Ollama console.',
        408,
      );
    }
    if (error instanceof ApiError) throw error;
    throw new ApiError(
      'Cannot reach the backend. Start Spring Boot on port 8081, then try again.',
      0,
    );
  } finally {
    window.clearTimeout(timer);
  }
}
