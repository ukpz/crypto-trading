import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SpinState {
    spinsLeft: number;
    lastPrize: string | null;
    isSpinning: boolean;
}

const initialState: SpinState = {
    spinsLeft: 3,
    lastPrize: null,
    isSpinning: false,
};

const spinSlice = createSlice({
    name: 'spin',
    initialState,
    reducers: {
        startSpin(state) {
            state.isSpinning = true;
        },
        finishSpin(state, action: PayloadAction<string>) {
            state.isSpinning = false;
            state.lastPrize = action.payload;
            state.spinsLeft = Math.max(0, state.spinsLeft - 1);
        },
        resetSpins(state) {
            state.spinsLeft = 3;
        },
    },
});

export const { startSpin, finishSpin, resetSpins } = spinSlice.actions;
export default spinSlice.reducer;
