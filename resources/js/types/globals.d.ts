import type { TranslateFn } from './index';

declare global {
    interface Window {
        _translations: Record<string, string>;
        __: TranslateFn;
    }
}

export {};
