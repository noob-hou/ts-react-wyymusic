import { FC, ReactNode, useState } from 'react';
import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';

import { Control, PlayBarWrapper, PlayInfo, Operator } from './style';
import { Slider } from 'antd';

interface IProps {
  children?: ReactNode;
}
const AppPlayBar: FC<IProps> = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const playToggle = () => {
    setIsPlaying(!isPlaying);
  };
  return (
    <PlayBarWrapper className="sprite_playbar">
      <div className="content wrap-v2">
        <Control isPlaying={isPlaying}>
          <div className="prev sprite_playbar"></div>
          <div className="play sprite_playbar" onClick={() => playToggle()}></div>
          <div className="next sprite_playbar"></div>
        </Control>
        <PlayInfo>
          <div className="image">
            <NavLink to={'/player'}>
              <img src="https://p2.music.126.net/OVkXDNmbk2uj6wE1KTZIwQ==/109951165203334337.jpg?param=34y34" alt="" />
            </NavLink>
          </div>
          <div className="info">
            <div className="song">
              <div className="song-name">日落大道</div>
              <div className="singer-name">123</div>
            </div>
            <div className="progress">
              <Slider />
              <div className="time">
                <div className="now-time">21:11</div>
                <div className="divider">/</div>
                <div className="total-time">21:12</div>
              </div>
            </div>
          </div>
        </PlayInfo>
        <Operator>
          <div className="left">
            <button className="sprite_playbar btn favor"></button>
            <button className="sprite_playbar btn share"></button>
          </div>
          <div className="right sprite_playbar">
            <button className="sprite_playbar btn volume"></button>
            <button className="sprite_playbar btn loop"></button>
            <button className="sprite_playbar btn playlist">{123}</button>
          </div>
        </Operator>
      </div>
    </PlayBarWrapper>
  );
};
export default memo(AppPlayBar);
