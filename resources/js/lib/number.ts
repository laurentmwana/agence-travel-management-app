export const numberToFixed = (
    number: number,
    precision: number | undefined = 2,
) => number.toPrecision(precision);
