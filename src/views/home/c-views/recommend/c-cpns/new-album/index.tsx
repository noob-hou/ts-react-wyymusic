import AreaHeader from '@/components/area-header';
import { Carousel } from 'antd';
import { ElementRef, FC, ReactNode, useRef } from 'react';
import React, { memo } from 'react';
import { AlbumWrapper } from './style';
import { useAppSelector } from '@/store';
import { shallowEqual } from 'react-redux';
import NewAlbumItem from '@/components/new-album-item';

interface IProps {
  children?: ReactNode;
}
const NewAlbum: FC<IProps> = () => {
  const { newAlbumData } = useAppSelector(
    (state) => ({
      newAlbumData: state.recommend.newAlbum
    }),
    shallowEqual
  );
  const bannerRef = useRef<ElementRef<typeof Carousel>>(null);
  return (
    <AlbumWrapper>
      <AreaHeader title="新碟上架" moreLink="/home/album" />
      <div className="content">
        <button className="sprite_02 arrow arrow-left" onClick={() => bannerRef.current?.prev()}></button>
        <div className="banner">
          <Carousel ref={bannerRef} dots={false} speed={1500}>
            {[1, 2].map((item) => {
              return (
                <div key={item}>
                  <div className="album-list">
                    {newAlbumData.slice((item - 1) * 5, item * 5).map((album) => {
                      return <NewAlbumItem key={album.name} itemData={album} />;
                    })}
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>
        <button className="sprite_02 arrow arrow-right" onClick={() => bannerRef.current?.next()}></button>
      </div>
    </AlbumWrapper>
  );
};
export default memo(NewAlbum);
