import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiGetBanners, apiGetHotRecommend, apiGetNewAlbum } from './service';

interface IRecommendState {
  banners: any[];
  hotRecommend: any[];
  newAlbum: any[];
}
const initialState: IRecommendState = {
  banners: [],
  hotRecommend: [],
  newAlbum: []
};

export const fetchRecommendData = createAsyncThunk('recommend', (arg, { dispatch }) => {
  apiGetBanners().then((res) => {
    dispatch(changeBannersAction(res.banners));
  });
  apiGetHotRecommend(8).then((res) => {
    dispatch(changeHotRecommendAction(res.result));
  });
  apiGetNewAlbum().then((res) => {
    dispatch(changeNewAlbumAction(res.albums));
  });
});

const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {
    changeBannersAction(state, { payload }) {
      state.banners = payload;
    },
    changeHotRecommendAction(state, { payload }) {
      state.hotRecommend = payload;
    },
    changeNewAlbumAction(state, { payload }) {
      state.newAlbum = payload;
    }
  }
});

export const { changeBannersAction, changeHotRecommendAction, changeNewAlbumAction } = recommendSlice.actions;
export default recommendSlice.reducer;
