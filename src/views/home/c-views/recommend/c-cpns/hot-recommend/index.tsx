import AreaHeader from '@/components/area-header';
import SongMenuItem from '@/components/song-menu-item';
import { useAppSelector } from '@/store';
import type { FC, ReactNode } from 'react';
import React, { memo } from 'react';
import { HotWrapper } from './style';
interface IProps {
  children?: ReactNode;
}
const HotRecommend: FC<IProps> = () => {
  const titleList: any[] = ['华语', '流行', '摇滚', '摇滚', '电子'];

  const { hotRecommend } = useAppSelector((state) => ({
    hotRecommend: state.recommend.hotRecommend
  }));
  return (
    <HotWrapper>
      <AreaHeader title="热门推荐" moreLink="/home/playList" linkList={titleList} />
      <div className="recommend-list">
        {hotRecommend.map((item) => {
          return <SongMenuItem itemData={item} key={item.id} />;
        })}
      </div>
    </HotWrapper>
  );
};
export default memo(HotRecommend);
