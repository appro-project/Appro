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

const parseDate = (dateString: string, timeString: string) => {
  const [day, month, year] = dateString.split('/').map(Number);
  const [hours, minutes] = timeString.split(':').map(Number);
  return new Date(year, month - 1, day, hours, minutes);
};

export { getNumberFromString, getValidRangeSearchParam, parseDate };
