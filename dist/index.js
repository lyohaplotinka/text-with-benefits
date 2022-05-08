function getType(variable) {
    return Object.prototype.toString.call(variable).toLowerCase().replace(/\[object (.*)]/, '$1');
}

const ALLOWED_TYPES = [
    'string', 'number', 'boolean', 'array', 'object'
];
function isTypeAllowed(type) {
    return ALLOWED_TYPES.includes(type);
}

function encodeValue(value, type) {
    if (['array', 'object'].includes(type))
        return JSON.stringify(value);
    return String(value);
}

const IncompatibleTypeError = (type) => {
    throw new TypeError(`[text-with-benefits] incompatible type "${type}". Allowed types: ${ALLOWED_TYPES.join(', ')}`);
};

function decodeValue(type, value) {
    if (!isTypeAllowed(type))
        IncompatibleTypeError(type);
    if (type === 'number')
        return Number(value);
    if (type === 'boolean')
        return value === 'true';
    if (['array', 'object'].includes(type))
        return JSON.parse(value);
    return value;
}

const PARSING_REGEX = /<\$\$([^$>]+)\$\$>/gm;
function createStringDataBlock(key, value) {
    const valueType = getType(value);
    if (!isTypeAllowed(valueType))
        IncompatibleTypeError(valueType);
    return `<$$${encodeURIComponent(key)} ${valueType} "${encodeURIComponent(encodeValue(value, valueType))}"$$>`;
}
function getDataFromString(text) {
    const [key, type, rawValue] = text.split(' ');
    return {
        key: decodeURIComponent(key),
        value: decodeValue(type, decodeURIComponent(rawValue).slice(1, -1))
    };
}
function pack(text, data) {
    const dataBlocks = Object.entries(data).map(([key, value]) => createStringDataBlock(key, value));
    return `${encodeURIComponent(text)}${dataBlocks.join('')}`;
}
function unpack(text) {
    const textWithoutData = text.replace(PARSING_REGEX, '');
    let matches = PARSING_REGEX.exec(text);
    if (matches === null)
        return { text: textWithoutData, data: null };
    const result = {};
    while (matches !== null) {
        const { key, value } = getDataFromString(matches[1]);
        result[key] = value;
        matches = PARSING_REGEX.exec(text);
    }
    return {
        text: decodeURIComponent(textWithoutData),
        data: result
    };
}

export { pack, unpack };
