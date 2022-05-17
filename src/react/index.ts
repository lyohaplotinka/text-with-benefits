import { useLayoutEffect, useState } from 'react';
import { pack, unpack } from '../index';

export default function useTextWithBenefits<T extends Record<keyof T, unknown>>(
  initialText: string,
  initialData?: T,
) {
  const [resultText, setResultText] = useState<string>();
  const [text, updateText] = useState(initialText);
  const [data, updateData] = useState<Record<string, unknown>>(
    initialData ?? {},
  );

  useLayoutEffect(() => {
    setResultText(() => pack(text, data));
  }, [text, data]);

  return {
    resultText,
    updateText,
    updateData,
    pack,
    unpack,
  };
}
