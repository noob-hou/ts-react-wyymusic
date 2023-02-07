import { FC, ReactNode } from 'react';
import React, { memo } from 'react';
import { RankingWrapper } from './style';
import AreaHeader from '@/components/area-header';
import { useAppSelector } from '@/store';
import { shallowEqual } from 'react-redux';
import RankingItem from '../ranking-list-item';
interface IProps {
  children?: ReactNode;
}
const RankingList: FC<IProps> = () => {
  const { rankings } = useAppSelector(
    (state) => ({
      rankings: state.recommend.rankings
    }),
    shallowEqual
  );
  return (
    <RankingWrapper>
      <AreaHeader title="榜单" moreLink="/home/ranking" />
      <div className="content">
        {rankings.map((item) => {
          return <RankingItem key={item.id} itemData={item} />;
        })}
      </div>
    </RankingWrapper>
  );
};
export default memo(RankingList);
