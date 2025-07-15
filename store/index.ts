// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
// import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import loadingReducer from './loadingSlice';
import portfolioReducer from './portfolioSlice';
import spinReducer from './spinSlice';

export const store = configureStore({
  reducer: {
    portfolio: portfolioReducer,
    loading: loadingReducer,
    spin: spinReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false, // for better compatibility
  //   }),
});

// Types for use throughout the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// // Hooks for components
// export const useAppDispatch: () => AppDispatch = useDispatch;
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
