// src/store/loadingSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface LoadingState {
    globalLoading: boolean;
}

const initialState: LoadingState = {
    globalLoading: false,
};

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        startLoading: (state) => {
            state.globalLoading = true;
        },
        stopLoading: (state) => {
            state.globalLoading = false;
        },
    },
});

export const { startLoading, stopLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
