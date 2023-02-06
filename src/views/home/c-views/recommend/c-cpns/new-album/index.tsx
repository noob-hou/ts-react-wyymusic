import AreaHeader from '@/components/area-header';
import { Carousel } from 'antd';
import type { FC, ReactNode } from 'react';
import React, { memo } from 'react';
import { AlbumWrapper } from './style';
interface IProps {
  children?: ReactNode;
}
const NewAlbum: FC<IProps> = () => {
  return (
    <AlbumWrapper>
      <AreaHeader title="新碟上架" moreLink="/home/album" />
      <div className="content">
        <button className="sprite_02 arrow arrow-left"></button>
        <div className="banner">
          <Carousel></Carousel>
        </div>
        <button className="sprite_02 arrow arrow-right"></button>
      </div>
    </AlbumWrapper>
  );
};
export default memo(NewAlbum);
