import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiGetBanners, apiGetHotRecommend, apiGetNewAlbum, apiGetPlaylist } from './service';
import type { Dispatch } from 'redux';
interface IRecommendState {
  banners: any[];
  hotRecommend: any[];
  newAlbum: any[];
  rankings: any[];
}
const initialState: IRecommendState = {
  banners: [],
  hotRecommend: [],
  newAlbum: [],
  rankings: []
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
  getRankingList(dispatch);
});
function getRankingList(dispatch: Dispatch) {
  const rankingIds = [19723756, 3779629, 2884035];
  const promises: Promise<any>[] = [];
  for (const id of rankingIds) {
    promises.push(apiGetPlaylist(id));
  }
  Promise.all(promises).then((res) => {
    const arr = res.filter((item) => item.playlist).map((item) => item.playlist);
    dispatch(changeRankingsAction(arr));
  });
}
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
    },
    changeRankingsAction(state, { payload }) {
      console.log(payload);

      state.rankings = payload;
    }
  }
});

export const { changeBannersAction, changeHotRecommendAction, changeNewAlbumAction, changeRankingsAction } =
  recommendSlice.actions;
export default recommendSlice.reducer;
