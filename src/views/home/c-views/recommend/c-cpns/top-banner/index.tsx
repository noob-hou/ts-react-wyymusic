import { FC, ReactNode, useRef, ElementRef, useState } from 'react';
import React, { memo } from 'react';
import { shallowEqual } from 'react-redux';
import { Carousel } from 'antd';
import classNames from 'classnames';

import { BannerWrapper, BannerLeft, BannerRight, BannerControl } from './style';
import { useAppSelector } from '@/store';

interface IProps {
  children?: ReactNode;
}
const TopBanner: FC<IProps> = () => {
  const [current, setCurrent] = useState(0);
  const bannerRef = useRef<ElementRef<typeof Carousel>>(null);
  const { banners } = useAppSelector(
    (state) => ({
      banners: state.recommend.banners
    }),
    shallowEqual
  );
  function bannerChange(from: number, to: number) {
    setCurrent(to);
  }
  let currentImgUrl;
  if (current >= 0 && banners.length > 0) {
    currentImgUrl = banners[current].imageUrl + '?imageView&blur=40x20';
  }
  return (
    <BannerWrapper style={{ background: `url('${currentImgUrl}') center center / 6000px` }}>
      <div className="banner wrap-v2">
        <BannerLeft>
          <Carousel autoplay ref={bannerRef} dots={false} effect="fade" beforeChange={bannerChange} speed={1000}>
            {banners.map((item) => {
              return (
                <a href={item.url} key={item.imageUrl} className="banner-item">
                  <img src={item.imageUrl} alt={item.typeTitle} className="image" />
                </a>
              );
            })}
          </Carousel>
          <ul className="dots">
            {banners.map((item, index) => {
              return (
                <li key={item.imageUrl}>
                  <span
                    className={classNames('item', {
                      active: index === current
                    })}
                  ></span>
                </li>
              );
            })}
          </ul>
        </BannerLeft>
        <BannerRight></BannerRight>
        <BannerControl>
          <button className="btn left" onClick={() => bannerRef.current?.prev()}></button>
          <button className="btn right" onClick={() => bannerRef.current?.next()}></button>
        </BannerControl>
      </div>
    </BannerWrapper>
  );
};
export default memo(TopBanner);
