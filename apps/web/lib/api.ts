const apiUrl = process.env['NEXT_PUBLIC_API_URL'] ?? 'http://localhost:4000/api/v1';

type RequestOptions = RequestInit;

export async function requestJson<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const response = await fetch(`${apiUrl}${path}`, options);
  const contentType = response.headers.get('content-type') || '';

  if (!response.ok) {
    // try to parse JSON error body for a helpful message
    try {
      if (contentType.includes('application/json')) {
        const body = await response.json();
        const message = body?.message || JSON.stringify(body);
        throw new Error(message ?? `Request failed with ${response.status}`);
      }
    } catch (err) {
      // fall back to status text
      throw new Error(`Request failed with ${response.status}`);
    }
  }

  if (contentType.includes('application/json')) return response.json() as Promise<T>;
  // if not JSON, return raw text
  const text = await response.text();
  return text as unknown as T;
}
