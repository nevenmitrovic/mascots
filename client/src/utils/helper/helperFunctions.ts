export function getObjectKeys<T extends Record<string, unknown>>(
  obj: T
): string[] {
  return Object.keys(obj);
}
