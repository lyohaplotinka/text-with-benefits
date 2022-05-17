/// <reference types="react" />
import { pack, unpack } from '../index';
export default function useTextWithBenefits<T extends Record<keyof T, unknown>>(initialText: string, initialData?: T): {
    resultText: string | undefined;
    updateText: import("react").Dispatch<import("react").SetStateAction<string>>;
    updateData: import("react").Dispatch<import("react").SetStateAction<Record<string, unknown>>>;
    pack: typeof pack;
    unpack: typeof unpack;
};
