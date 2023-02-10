import { apiGetPlayDetail, apiGetLyrics } from './service';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getLyrics, ILyric } from '@/utils/parse-lyric';

interface IState {
  currentSong: any; //当前播放歌曲
  lyrics: ILyric[]; //当前歌曲歌词
  lyricIndex: number; //歌词当前行下标
  songList: any[]; //歌单列表
  songListIndex: number; //列表下标
}
const initialState: IState = {
  currentSong: {},
  lyrics: [],
  lyricIndex: -1,
  songList: [],
  songListIndex: -1
};

export const fetchPlayerData = createAsyncThunk('player', (id: number, { dispatch }) => {
  const songList = [...initialState.songList];
  const index = songList.findIndex((v) => v.id === id);
  if (index === -1) {
    apiGetPlayDetail(id).then((res: any) => {
      const song = res.songs[0];

      apiGetLyrics(res.songs[0].id).then((re) => {
        const lyricString = re.lrc.lyric;

        const result = getLyrics(lyricString);
        // 改变当前歌词
        dispatch(changeLyricsAction(result));
        song.lyric = result;
        //改变当前播放歌曲
        dispatch(changeSongAction(song));
        // 将歌曲添加到列表 并改变列表
        songList.push(song);
        dispatch(changeSongListAction(songList));
        //改变歌单数组下标
        dispatch(changeSongListIndexAction(songList.length - 1));
      });
    });
  } else {
    //改变歌单数组下标
    dispatch(changeSongListIndexAction(index));
    dispatch(changeSongAction(songList[index]));
    dispatch(changeLyricsAction(songList[index].lyric));
  }
});
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
    }
  }
});
export const {
  changeSongAction,
  changeLyricsAction,
  changeLyricsIndexAction,
  changeSongListAction,
  changeSongListIndexAction
} = playerSlice.actions;

export default playerSlice.reducer;
