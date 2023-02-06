import { formatterCount, formatterUrl } from '@/utils/formatter';
import type { FC, ReactNode } from 'react';
import React, { memo } from 'react';
import { MenuItemWrapper } from './style';
interface IProps {
  children?: ReactNode;
  itemData: any;
}
const SongMenuItem: FC<IProps> = (prop) => {
  const { itemData } = prop;
  return (
    <MenuItemWrapper>
      <div className="top">
        <img src={formatterUrl(itemData.picUrl, 140)} alt="" />
        <div className="cover sprite_cover">
          <div className="info sprite_cover">
            <span>
              <i className="sprite_icon headset"></i>
              <span>{formatterCount(itemData.playCount)}</span>
            </span>
            <div className="sprite_icon play"></div>
          </div>
        </div>
      </div>
      <div className="bottom">{itemData.name}</div>
    </MenuItemWrapper>
  );
};
export default memo(SongMenuItem);
