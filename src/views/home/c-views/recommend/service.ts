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
export const apiGetPlaylist = (id: number) => {
  return hyRequest.get({
    url: '/playlist/detail',
    params: {
      id
    }
  });
};

export const apiGetSingerList = (limit = 30) => {
  return hyRequest.get({
    url: '/artist/list',
    params: {
      limit
    }
  });
};
