import { useAppDispatch } from '@/store';
import { FC, ReactNode, useEffect } from 'react';
import React, { memo } from 'react';
import { fetchBannerData } from './store';
import TopBanner from './c-cpns/top-banner';
interface IProps {
  children?: ReactNode;
}
const Recommend: FC<IProps> = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchBannerData());
  }, []);
  return (
    <div>
      <TopBanner />
      <div>Recommend</div>
    </div>
  );
};
export default memo(Recommend);
