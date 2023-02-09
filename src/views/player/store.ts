import { apiGetPlayDetail, apiGetLyrics } from './service';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getLyrics, ILyric } from '@/utils/parse-lyric';

interface IState {
  currentSong: any;
  lyrics: ILyric[];
}
const initialState: IState = {
  currentSong: {},
  lyrics: []
};

export const fetchPlayerData = createAsyncThunk('player', (_, { dispatch }) => {
  apiGetPlayDetail(1330348068).then((res) => {
    dispatch(changeSongAction(res.songs[0]));
    apiGetLyrics(res.songs[0].id).then((re) => {
      const lyricString = re.lrc.lyric;

      const result = getLyrics(lyricString);
      dispatch(changeLyricsAction(result));
    });
  });
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
    }
  }
});
export const { changeSongAction, changeLyricsAction } = playerSlice.actions;

export default playerSlice.reducer;
