export default function encodeValue(value: unknown, type: string): string {
  if (['array', 'object'].includes(type)) return JSON.stringify(value);
  return String(value);
}
