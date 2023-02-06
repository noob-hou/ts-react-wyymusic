import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiGetBanners, apiGetHotRecommend } from './service';

interface IRecommendState {
  banners: any[];
  hotRecommend: any[];
}
const initialState: IRecommendState = {
  banners: [],
  hotRecommend: []
};

export const fetchBannerData = createAsyncThunk('banners', (arg, { dispatch }) => {
  apiGetBanners().then((res) => {
    dispatch(changeBannersAction(res.banners));
  });
});
export const fetchHotRecommend = createAsyncThunk('hot', (arg, { dispatch }) => {
  apiGetHotRecommend(8).then((res) => {
    dispatch(changeHotRecommendAction(res.result));
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
    }
  }
});

export const { changeBannersAction, changeHotRecommendAction } = recommendSlice.actions;
export default recommendSlice.reducer;
