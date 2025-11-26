export const queryParamsSortable = (
    isActive: boolean,
    direction: string,
    field: string,
): URL => {
    const url = new URL(window.location.href);

    if (isActive) {
        url.searchParams.set('dir', direction === 'asc' ? 'desc' : 'asc');
    } else {
        url.searchParams.set('dir', 'desc');
        url.searchParams.set('sort', field);
    }
    return url;
};



export const queryParamsDataSortable = (
    data: {key: string, value: string}
): URL => {
    const url = new URL(window.location.href);
    
    url.searchParams.set(data.key, data.value)

    return url;
};
