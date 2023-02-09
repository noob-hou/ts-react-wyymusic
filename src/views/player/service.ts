import hyRequest from '@/service';

export const apiGetPlayDetail = (ids: number) => {
  return hyRequest.get({
    url: '/song/detail',
    params: {
      ids
    }
  });
};
export const apiGetLyrics = (id: number) => {
  return hyRequest.get({
    url: '/lyric',
    params: {
      id
    }
  });
};
