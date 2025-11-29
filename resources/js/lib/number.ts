export const numberToFixed = (
    number: number,
    precision: number | undefined = 2,
) => number.toPrecision(precision);

export function formatLargeNumber(value: number): string {
    if (value >= 1_000_000_000) return (value / 1_000_000_000).toFixed(1) + 'B';
    if (value >= 1_000_000) return (value / 1_000_000).toFixed(1) + 'M';
    if (value >= 1_000) return (value / 1_000).toFixed(1) + 'K';
    return value.toString();
}

export const formatNumber = (value: number): string => {
    if (value === 0) return '0';

    const abs = Math.abs(value);

    if (abs >= 1_000_000_000) return (value / 1_000_000_000).toFixed(1) + 'B';
    if (abs >= 1_000_000) return (value / 1_000_000).toFixed(1) + 'M';
    if (abs >= 1_000) return (value / 1_000).toFixed(1) + 'k';

    return value.toString();
};

export const formatCurrency = (amount: number, locale: string = 'en-US', currency: string = 'USD') => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    }).format(amount);
};