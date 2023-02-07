import { FC, ReactNode } from 'react';
import React, { memo } from 'react';
import { SingerWrapper } from './style';
import AreaHeaderV2 from '@/components/area-header-v2';
import { useAppSelector } from '@/store';
import { shallowEqual } from 'react-redux';
import { formatterUrl } from '@/utils/formatter';

interface IProps {
  children?: ReactNode;
}
const SettledSinger: FC<IProps> = () => {
  const { singers } = useAppSelector(
    (state) => ({
      singers: state.recommend.singers
    }),
    shallowEqual
  );
  return (
    <SingerWrapper>
      <AreaHeaderV2 title="入驻歌手" moreText="查看更多" moreLink="/home/singer" />
      <div className="artists">
        {singers.map((item) => {
          return (
            <a href="/home/singer" className="item" key={item.id}>
              <img src={formatterUrl(item.picUrl, 80)} alt="" />
              <div className="info">
                <div className="name">{item.name}</div>
                <div className="alias">{item.alias.join(' ')}</div>
              </div>
            </a>
          );
        })}
      </div>
      <div className="apply-for">
        <a href="#/">申请成为网易音乐人</a>
      </div>
    </SingerWrapper>
  );
};
export default memo(SettledSinger);
