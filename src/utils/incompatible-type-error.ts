import { ALLOWED_TYPES } from './isTypeAllowed';

const IncompatibleTypeError = (type: string) => {
  throw new TypeError(
    `[text-with-benefits] incompatible type "${type}". Allowed types: ${ALLOWED_TYPES.join(
      ', ',
    )}`,
  );
};

export default IncompatibleTypeError;
