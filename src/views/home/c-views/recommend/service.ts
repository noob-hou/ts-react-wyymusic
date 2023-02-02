import hyRequest from '@/service';

export const apiGetBanners = () => {
  return hyRequest.get({
    url: '/banner'
  });
};
