const getNumberFromString = (str: string, defaultValue: number): number => {
    const from = Number(str);

    return isNaN(from) ? defaultValue : from;
};

const getValidRangeSearchParam = (rangeSearchParam: string | null) => {
    if (!rangeSearchParam) return null;

    const splitRange = rangeSearchParam.split('-');
    if (splitRange.length < 2) return undefined;

    return { from: splitRange[0], to: splitRange[1] };

};

 export {
     getNumberFromString,
     getValidRangeSearchParam,
 };
