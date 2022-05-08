export declare function pack(text: string, data: Record<string, unknown>): string;
export declare function unpack<T extends Record<string, unknown>>(text: string): {
    text: string;
    data: T | null;
};
