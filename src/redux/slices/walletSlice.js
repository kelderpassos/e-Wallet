import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currencies: [],
  expenses: [],
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    saveExpense: (state, action) => { },
    updateExpense:(state, action) => { },
    deleteExpense: (state, action) => { },
  },
});

export const { saveExpense, updateExpense, deleteExpense } = walletSlice.actions;
export default walletSlice.reducer;
