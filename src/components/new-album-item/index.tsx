import { formatterUrl } from '@/utils/formatter';
import type { FC, ReactNode } from 'react';
import React, { memo } from 'react';
import { AlbumItemWrapper } from './style';
interface IProps {
  children?: ReactNode;
  itemData: any;
}
const NewAlbumItem: FC<IProps> = (props) => {
  const { itemData } = props;
  return (
    <AlbumItemWrapper>
      <div className="top">
        <img src={formatterUrl(itemData.picUrl, 100)} alt="" className="img" />
        <a className="cover sprite_cover"></a>
      </div>
      <div className="bottom">
        <div className="name">{itemData.name}</div>
        <div className="artist">{itemData.artist.name}</div>
      </div>
    </AlbumItemWrapper>
  );
};
export default memo(NewAlbumItem);
