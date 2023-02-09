import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';

import { Control, PlayBarWrapper, PlayInfo, Operator } from './style';
import { Slider } from 'antd';
import { fetchPlayerData } from '../../store';
import { useAppDispatch, useAppSelector } from '@/store';
import { shallowEqual } from 'react-redux';
import { formatterAudioUrl, formatterTime, formatterUrl } from '@/utils/formatter';
import throttle from '@/utils/throttle';

interface IProps {
  children?: ReactNode;
}
const AppPlayBar: FC<IProps> = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const dispatch = useAppDispatch();
  const audioRef = useRef<HTMLAudioElement>(null);
  const { currentSong } = useAppSelector(
    (state) => ({
      currentSong: state.player.currentSong
    }),
    shallowEqual
  );
  useEffect(() => {
    dispatch(fetchPlayerData());
    audioRef.current!.src = formatterAudioUrl(currentSong.id);
    audioRef.current
      ?.play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        setIsPlaying(false);
      });

    setDuration(currentSong?.dt ?? 0);
    return () => {
      setIsPlaying(false);
    };
  }, []);
  //播放与暂停的切换
  const playToggle = () => {
    setIsPlaying(!isPlaying);
    isPlaying ? audioRef.current?.pause() : audioRef.current?.play().catch(() => setIsPlaying(false));
  };
  //播放中Audio标签时间的回调
  const timeUpdate = (e: any) => {
    const currentTime = e.target.currentTime;
    setCurrentTime(currentTime);
    setProgress(((currentTime * 1000) / duration) * 100);
  };
  //滑动条改变
  const sliderChange = (value: number) => {
    setProgress(value);
    const time = ((value / 100) * duration) / 1000;
    setCurrentTime(time);
  };
  const sliderAfterChange = (value: number) => {
    const time = (value / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = time / 1000;
      setCurrentTime(time);
      !isPlaying && playToggle();
    }
  };
  return (
    <PlayBarWrapper className="sprite_playbar">
      <div className="content wrap-v2">
        <Control isPlaying={isPlaying}>
          <div className="prev sprite_playbar"></div>
          <div className="play sprite_playbar" onClick={playToggle}></div>
          <div className="next sprite_playbar"></div>
        </Control>
        <PlayInfo>
          <div className="image">
            <NavLink to={'/player'}>
              <img src={currentSong?.al?.picUrl} alt="" />
            </NavLink>
          </div>
          <div className="info">
            <div className="song">
              <div className="song-name">{currentSong.name}</div>
              <div className="singer-name">{currentSong?.ar && currentSong?.ar.name}</div>
            </div>
            <div className="progress">
              <Slider
                value={progress}
                tooltip={{ formatter: null }}
                step={0.2}
                onChange={sliderChange}
                onAfterChange={sliderAfterChange}
              />
              <div className="time">
                <div className="now-time">{formatterTime(currentTime * 1000)}</div>
                <div className="divider">/</div>
                <div className="total-time">{formatterTime(duration)}</div>
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
      <audio ref={audioRef} onTimeUpdate={throttle(timeUpdate, 1000)} />
    </PlayBarWrapper>
  );
};
export default memo(AppPlayBar);
