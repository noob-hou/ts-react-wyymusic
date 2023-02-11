import { apiGetPlayDetail, apiGetLyrics } from './service';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getLyrics, ILyric } from '@/utils/parse-lyric';
import type { IRootState } from '@/store';
interface IThunkState {
  state: IRootState;
}
interface IState {
  currentSong: any; //当前播放歌曲
  lyrics: ILyric[]; //当前歌曲歌词
  lyricIndex: number; //歌词当前行下标
  songList: any[]; //歌单列表
  songListIndex: number; //列表下标
  playTypeIndex: number; //播放类型
}
const initialState: IState = {
  currentSong: {},
  lyrics: [],
  lyricIndex: -1,
  songList: [],
  songListIndex: -1,
  playTypeIndex: 0
};
//播放方式
const playTypeList: any[] = ['随机播放', '单曲循环', '列表循环'];

export const fetchPlayerData = createAsyncThunk<void, number, IThunkState>(
  'player',
  (id: number, { dispatch, getState }) => {
    const songList = [...getState().player.songList];

    const index = songList.findIndex((v) => v.id === id);
    if (index === -1) {
      apiGetPlayDetail(id).then((res) => {
        const song = res.songs[0];
        getLyricsFn(song.id).then((result) => {
          dispatch(changeLyricsAction(result));
          song.lyric = result;
          //改变当前播放歌曲
          // 将歌曲添加到列表 并改变列表
          songList.push(song);
          dispatch(changeSongListAction(songList));
          //改变歌单数组下标
          dispatch(changeSongListIndexAction(songList.length - 1));
        });
      });
    } else {
      //改变歌单数组下标

      const song = { ...songList[index] };
      if (!song.lyric) {
        getLyricsFn(song.id).then((result) => {
          song.lyric = result;
          songList.splice(index, 1, song);
          dispatch(changeSongListAction(songList));
          dispatch(changeSongListIndexAction(index));
          dispatch(changeLyricsAction(song.lyric));
        });
      } else {
        dispatch(changeSongListIndexAction(index));
        dispatch(changeLyricsAction(song.lyric));
      }
    }
  }
);

export const changeMusicAction = createAsyncThunk<void, boolean, IThunkState>(
  'music',
  (next, { dispatch, getState }) => {
    const { playTypeIndex, songListIndex, songList } = getState().player;
    const playType = playTypeList[playTypeIndex];
    let newIndex = songListIndex;
    if (playType === '随机播放') {
      newIndex = getRandom(newIndex, songList.length);
    } else {
      newIndex = next ? newIndex + 1 : newIndex - 1;
      if (newIndex > songList.length - 1) newIndex = 0;
      if (newIndex < 0) newIndex = songList.length - 1;
    }

    dispatch(changeSongAction(songList[newIndex]));
    dispatch(changeSongListIndexAction(newIndex));
    function getRandom(index: number, max: number): number {
      if (max === 1) return index;
      let num = Math.floor(Math.random() * max);
      if (num === index) {
        num = getRandom(index, max);
      }
      return num;
    }
  }
);
//获取歌词函数
async function getLyricsFn(id: number) {
  const re = await apiGetLyrics(id);
  const lyricString = re.lrc.lyric;
  const result = getLyrics(lyricString);
  return result;
}
const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    changeSongAction(state, { payload }) {
      state.currentSong = payload;
    },
    changeLyricsAction(state, { payload }) {
      state.lyrics = payload;
    },
    changeLyricsIndexAction(state, { payload }) {
      state.lyricIndex = payload;
    },
    changeSongListAction(state, { payload }) {
      state.songList = payload;
    },
    changeSongListIndexAction(state, { payload }) {
      state.songListIndex = payload;
      state.currentSong = state.songList[payload];
    },
    changePlayTypeIndex(state) {
      let index = state.playTypeIndex + 1;
      if (index > playTypeList.length - 1) {
        index = 0;
      }
      state.playTypeIndex = index;
    }
  }
});
export const {
  changeSongAction,
  changeLyricsAction,
  changeLyricsIndexAction,
  changeSongListAction,
  changeSongListIndexAction,
  changePlayTypeIndex
} = playerSlice.actions;

export default playerSlice.reducer;
