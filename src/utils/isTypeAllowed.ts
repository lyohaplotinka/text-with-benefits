export const ALLOWED_TYPES = ['string', 'number', 'boolean', 'array', 'object'];

export default function isTypeAllowed(type: string): boolean {
  return ALLOWED_TYPES.includes(type);
}
