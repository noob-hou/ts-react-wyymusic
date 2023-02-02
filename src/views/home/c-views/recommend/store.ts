import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiGetBanners } from './service';

interface IRecommendState {
  banners: any[];
}
const initialState: IRecommendState = {
  banners: []
};

export const fetchBannerData = createAsyncThunk('banners', (arg, { dispatch }) => {
  apiGetBanners().then((res) => {
    dispatch(changeBannersAction(res.banners));
  });
});

const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {
    changeBannersAction(state, { payload }) {
      state.banners = payload;
    }
  }
});

export const { changeBannersAction } = recommendSlice.actions;
export default recommendSlice.reducer;
