import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { authApi } from './api/authApi';
import { userApi } from './api/userApi';
import { jobApi } from './api/jobApi';
import { guestApi } from './api/guestApi';
import { freelancerApi } from './api/freelancerApi';

import userReducer from './features/userSlice';
import jobReducer from './features/jobSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [jobApi.reducerPath]: jobApi.reducer,
    [guestApi.reducerPath]: guestApi.reducer,
    [freelancerApi.reducerPath]: freelancerApi.reducer,
    userState: userReducer,
    jobState: jobReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([authApi.middleware, userApi.middleware, jobApi.middleware, guestApi.middleware, freelancerApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
