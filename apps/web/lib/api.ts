const apiUrl = process.env['NEXT_PUBLIC_API_URL'] ?? 'http://localhost:4000/api/v1';

type RequestOptions = RequestInit;

export async function requestJson<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const response = await fetch(`${apiUrl}${path}`, options);
  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`);
  }

  return response.json() as Promise<T>;
}
