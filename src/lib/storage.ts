export function parseStoredJson<T>(
  rawValue: string | null,
  validator: (value: unknown) => value is T,
  fallback: T,
): T {
  if (!rawValue) {
    return fallback;
  }

  try {
    const parsed: unknown = JSON.parse(rawValue);
    return validator(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}
