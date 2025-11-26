import { TranslateFn } from '@/types';

const translations = window._translations ?? [];

export const trans: TranslateFn = (key, params) => {
    const trans: string|null = translations[key];

    if (!trans) return key;

    if (!params) return trans;

    return trans.replace(/:([a-zA-Z0-9_]+)/g, (_, p1) => {
        const value = params[p1];
        return value !== undefined && value !== null ? String(value) : '';
    });
};
