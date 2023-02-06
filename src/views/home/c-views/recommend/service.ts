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
