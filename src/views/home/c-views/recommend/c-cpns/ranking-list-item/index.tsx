import { FC, ReactNode } from 'react';
import React, { memo } from 'react';
import { RankingItemWrapper } from './style';
import { formatterUrl } from '@/utils/formatter';
import { useAppDispatch } from '@/store';
import { fetchPlayerData } from '@/views/player/store';

interface IProps {
  children?: ReactNode;
  itemData: any;
}
const RankingListItem: FC<IProps> = (props) => {
  const { itemData } = props;
  const dispatch = useAppDispatch();
  //点击播放
  function playSong(id: number) {
    dispatch(fetchPlayerData(id));
  }
  return (
    <RankingItemWrapper>
      <div className="header">
        <div className="image">
          <img src={formatterUrl(itemData.coverImgUrl, 80)} alt="" />
          <a href="" className="sprite_cover"></a>
        </div>
        <div className="info">
          <div className="name">{itemData.name}</div>
          <div>
            <button className="sprite_02 btn play"></button>
            <button className="sprite_02 btn favor"></button>
          </div>
        </div>
      </div>
      <div className="list">
        {itemData?.tracks?.slice(0, 10).map((item: any, index: number) => {
          return (
            <div className="item" key={item.id}>
              <div className="index">{index + 1}</div>
              <div className="info">
                <div className="name">{item.name}</div>
                <div className="operator">
                  <button className="btn sprite_02 play" onClick={() => playSong(item.id)}></button>
                  <button className="btn sprite_icon2 add"></button>
                  <button className="btn sprite_02 favor"></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="footer">
        <a href="/home/ranking">查看全部 &gt;</a>
      </div>
    </RankingItemWrapper>
  );
};
export default memo(RankingListItem);
