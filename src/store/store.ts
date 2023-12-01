import { charactersSlice } from './slices/landingDataSlice';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import thunk from 'redux-thunk';

export const store = configureStore({
  reducer: {
    landingData: charactersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type ActionType<T> = {
  type: string;
  payload: T
}

export const useAppDispatch = useDispatch<AppDispatch>;
export const useAppSelector = useSelector<RootState>;
