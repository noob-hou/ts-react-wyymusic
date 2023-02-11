import { configureStore } from '@reduxjs/toolkit';
import { useSelector, useDispatch, TypedUseSelectorHook, shallowEqual } from 'react-redux';

import recommendReducer from '@/views/home/c-views/recommend/store';
import playerReducer from '@/views/player/store';
const store = configureStore({
  reducer: {
    recommend: recommendReducer,
    player: playerReducer
  }
});
type GetStateFnType = typeof store.getState;
export type IRootState = ReturnType<GetStateFnType>;
type DispatchType = typeof store.dispatch;

// useAppSelector的hook
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
export const useAppDispatch: () => DispatchType = useDispatch;
export const appShallowEqual = shallowEqual;
export default store;
