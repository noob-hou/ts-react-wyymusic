import hyRequest from '@/service';

export const apiGetPlayDetail = (ids: number) => {
  return hyRequest.get({
    url: '/song/detail',
    params: {
      ids
    }
  });
};
