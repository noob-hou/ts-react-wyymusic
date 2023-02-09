import { apiGetPlayDetail } from './service';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IState {
  currentSong: any;
}
const initialState: IState = {
  currentSong: {}
};

export const fetchPlayerData = createAsyncThunk('player', (_, { dispatch }) => {
  apiGetPlayDetail(1330348068).then((res) => {
    console.log(res.songs[0]);

    dispatch(changeSongAction(res.songs[0]));
  });
});
const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    changeSongAction(state, { payload }) {
      state.currentSong = payload;
    }
  }
});
export const { changeSongAction } = playerSlice.actions;

export default playerSlice.reducer;
