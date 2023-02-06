export const formatterCount = (count: number): string | number => {
  if (count > 100000) {
    return Math.floor(count / 10000) + '万';
  } else {
    return count;
  }
};
export const formatterUrl = (url: string, width: number, height: number = width): string => {
  return url + `?params=${width}*${height}`;
};
