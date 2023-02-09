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

export const formatterAudioUrl = (id: number): string => {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
};

export const formatterTime = (time: number): string => {
  const secondTime = time / 1000;
  const minute = Math.floor(secondTime / 60);
  const second = Math.floor(secondTime) % 60;

  const formatterMinute = String(minute).padStart(2, '0');
  const formatterSecond = String(second).padStart(2, '0');
  return `${formatterMinute}:${formatterSecond}`;
};
