import hyRequest from '@/service';

export const apiGetBanners = () => {
  return hyRequest.get({
    url: '/banner'
  });
};
export const apiGetHotRecommend = (limit: 8) => {
  return hyRequest.get({
    url: '/personalized',
    params: {
      limit
    }
  });
};
export const apiGetNewAlbum = (limit = 10) => {
  return hyRequest.get({
    url: '/album/newest',
    params: {
      limit
    }
  });
};
