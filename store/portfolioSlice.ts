// store/portfolioSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  holdings: [
    { coinId: 'ethereum', symbol: 'eth', amount: 0.0040586 },
    { coinId: 'cardano', symbol: 'ada', amount: 10.626 },
    { coinId: 'tron', symbol: 'trx', amount: 10.589 },
    { coinId: 'dogecoin', symbol: 'doge', amount: 5.485 },
  ],
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    // future updates like addCoin, removeCoin
  },
});

export const selectHoldings = (state: any) => state.portfolio.holdings;
export default portfolioSlice.reducer;
