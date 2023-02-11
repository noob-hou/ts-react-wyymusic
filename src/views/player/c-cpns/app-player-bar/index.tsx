import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { Control, PlayBarWrapper, PlayInfo, Operator } from './style';
import { Slider } from 'antd';
import { changeLyricsIndexAction, changeMusicAction, changePlayTypeIndex, changeSongAction } from '../../store';
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
  const [isSliding, setIsSliding] = useState(false);
  const dispatch = useAppDispatch();
  const audioRef = useRef<HTMLAudioElement>(null);
  const { currentSong, lyrics, lyricIndex, playList, playTypeIndex } = useAppSelector(
    (state) => ({
      currentSong: state.player.currentSong,
      lyrics: state.player.lyrics,
      lyricIndex: state.player.lyricIndex,
      playList: state.player.songList,
      playTypeIndex: state.player.playTypeIndex
    }),
    shallowEqual
  );
  useEffect(() => {
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
  }, [currentSong]);
  //切换歌曲
  const changeMusic = (next = true) => {
    dispatch(changeMusicAction(next));
  };
  //播放与暂停的切换
  const playToggle = () => {
    setIsPlaying(!isPlaying);
    isPlaying ? audioRef.current?.pause() : audioRef.current?.play().catch(() => setIsPlaying(false));
  };
  //播放中Audio标签时间的回调
  const timeUpdate = (e: any) => {
    const currentTime = e.target.currentTime;
    if (!isSliding) {
      setCurrentTime(currentTime);
      const progressValue = ((currentTime * 1000) / duration) * 100;
      setProgress(progressValue);
      if (progressValue >= 100) {
        if (playTypeIndex === 1) {
          dispatch(changeSongAction({ ...currentSong }));
        } else {
          changeMusic();
        }
      }
    }
    const time = currentTime * 1000;
    let index = lyrics.length - 1;
    for (let i = 0; i < lyrics.length; i++) {
      if (lyrics[i].time > time) {
        index = i - 1;
        break;
      }
    }
    if (lyricIndex === index) {
      return;
    } else {
      dispatch(changeLyricsIndexAction(index));
      console.log(lyrics[index].text);
    }
  };
  //滑动条改变
  const sliderChange = (value: number) => {
    setIsSliding(true);
    setProgress(value);
    const time = ((value / 100) * duration) / 1000;
    setCurrentTime(time);
  };
  const sliderAfterChange = (value: number) => {
    const time = (value / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = time / 1000;
      setCurrentTime(time);
      setIsSliding(false);
      !isPlaying && playToggle();
    }
  };
  return (
    <PlayBarWrapper className="sprite_playbar">
      <div className="content wrap-v2">
        <Control isPlaying={isPlaying}>
          <div className="prev btn sprite_playbar" onClick={() => changeMusic(false)}></div>
          <div className="play btn sprite_playbar" onClick={playToggle}></div>
          <div className="next btn sprite_playbar" onClick={() => changeMusic()}></div>
        </Control>
        <PlayInfo>
          <div className="image">
            <NavLink to={'/player'}>
              <img src={formatterUrl(currentSong?.al?.picUrl, 50)} alt="" />
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
        <Operator playMode={playTypeIndex}>
          <div className="left">
            <button className="sprite_playbar btn favor"></button>
            <button className="sprite_playbar btn share"></button>
          </div>
          <div className="right sprite_playbar">
            <button className="sprite_playbar btn volume"></button>
            <button className="sprite_playbar btn loop" onClick={() => dispatch(changePlayTypeIndex())}></button>
            <button className="sprite_playbar btn playlist">{playList?.length}</button>
          </div>
        </Operator>
      </div>
      <audio ref={audioRef} onTimeUpdate={throttle(timeUpdate, 1000)} />
    </PlayBarWrapper>
  );
};
export default memo(AppPlayBar);
