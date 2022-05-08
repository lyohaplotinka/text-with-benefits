import getType from './utils/getType';
import isTypeAllowed from './utils/isTypeAllowed';
import encodeValue from './utils/encodeValue';
import decodeValue from './utils/decodeValue';
import IncompatibleTypeError from './utils/incompatible-type-error';

const PARSING_REGEX = /<\$\$([^$>]+)\$\$>/gm;

function createStringDataBlock(key: string, value: unknown): string {
  const valueType = getType(value);
  if (!isTypeAllowed(valueType)) IncompatibleTypeError(valueType);
  return `<$$${encodeURIComponent(key)} ${valueType} "${encodeURIComponent(
    encodeValue(value, valueType),
  )}"$$>`;
}

function getDataFromString(text: string): { key: string; value: unknown } {
  const [key, type, rawValue] = text.split(' ');
  return {
    key: decodeURIComponent(key),
    value: decodeValue(type, decodeURIComponent(rawValue).slice(1, -1)),
  };
}

export function pack(text: string, data: Record<string, unknown>): string {
  const dataBlocks: string[] = Object.entries(data).map(([key, value]) =>
    createStringDataBlock(key, value),
  );
  return `${encodeURIComponent(text)}${dataBlocks.join('')}`;
}

export function unpack<T extends Record<string, unknown>>(
  text: string,
): { text: string; data: T | null } {
  const textWithoutData = text.replace(PARSING_REGEX, '');
  let matches = PARSING_REGEX.exec(text);
  if (matches === null) return { text: textWithoutData, data: null };
  const result: Record<string, unknown> = {};

  while (matches !== null) {
    const { key, value } = getDataFromString(matches[1]);
    result[key] = value;
    matches = PARSING_REGEX.exec(text);
  }

  return {
    text: decodeURIComponent(textWithoutData),
    data: result as T,
  };
}
