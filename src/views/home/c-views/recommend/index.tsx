import { useAppDispatch } from '@/store';
import { FC, ReactNode, useEffect } from 'react';
import React, { memo } from 'react';
import { fetchBannerData, fetchHotRecommend } from './store';

import TopBanner from './c-cpns/top-banner';
import { RecommendWrapper } from './style';
import HotRecommend from './c-cpns/hot-recommend';
import NewAlbum from './c-cpns/new-album';
interface IProps {
  children?: ReactNode;
}
const Recommend: FC<IProps> = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchBannerData());
    dispatch(fetchHotRecommend());
  }, []);
  return (
    <RecommendWrapper>
      <TopBanner />
      <div className="content wrap-v2">
        <div className="left">
          <HotRecommend />
          <NewAlbum />
        </div>
        <div className="right">right</div>
      </div>
    </RecommendWrapper>
  );
};
export default memo(Recommend);
