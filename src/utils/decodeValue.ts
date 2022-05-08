import isTypeAllowed from './isTypeAllowed';
import IncompatibleTypeError from './incompatible-type-error';

export default function decodeValue(type: string, value: string): unknown {
  if (!isTypeAllowed(type)) IncompatibleTypeError(type);
  if (type === 'number') return Number(value);
  if (type === 'boolean') return value === 'true';
  if (['array', 'object'].includes(type)) return JSON.parse(value);
  return value;
}
