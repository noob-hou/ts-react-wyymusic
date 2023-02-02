import { configureStore } from '@reduxjs/toolkit';
import { useSelector, useDispatch, TypedUseSelectorHook, shallowEqual } from 'react-redux';

import recommendReducer from '@/views/home/c-views/recommend/store';
const store = configureStore({
  reducer: {
    recommend: recommendReducer
  }
});
type GetStateFnType = typeof store.getState;
type IRootState = ReturnType<GetStateFnType>;
type DispatchType = typeof store.dispatch;

// useAppSelector的hook
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
export const useAppDispatch: () => DispatchType = useDispatch;
export const appShallowEqual = shallowEqual;
export default store;
