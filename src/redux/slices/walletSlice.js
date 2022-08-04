/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const URL = 'https://economia.awesomeapi.com.br/json/all';

const initialState = {
  currencies: [],
  expenses: [],
  isLoading: true,
};

export const getExchangeRates = createAsyncThunk(
  'wallet/getExchangeRates',
  async () => {
    try {
      const request = await fetch(URL);
      const response = await request.json();
      return response;
    } catch (error) {
      throw new Error('API request rejected');
    }
  },
);

export const getUpdatedExchangeRates = createAsyncThunk(
  'wallet/getUpdatedExchangeRates',
  async (state) => {
    try {
      const request = await fetch(URL);
      const response = await request.json();
      const updatedExpenses = {
        ...state,
        exchangeRates: response,
      };
      return updatedExpenses;
    } catch (error) {
      throw new Error('API request rejected');
    }
  },
);

const selectedCurrencies = (currencies) => currencies !== 'USDT';

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    saveExpense: (state, action) => {
      console.log('saveExpense');
      state.expenses.push(action.payload);
    },
    updateExpense: (state, action) => {},
    deleteExpense: (state, action) => {},
  },
  extraReducers: {
    [getExchangeRates.pending]: (state) => {
      state.isLoading = true;
    },
    [getExchangeRates.fulfilled]: (state, action) => {
      state.currencies = Object.keys(action.payload).filter(selectedCurrencies);
      state.isLoading = false;
    },
    [getExchangeRates.rejected]: (state) => {
      state.isLoading = false;
    },
    [getUpdatedExchangeRates.pending]: (state) => {
      state.isLoading = true;
    },
    [getUpdatedExchangeRates.fulfilled]: (state, action) => {
      console.log(action.payload);
      console.log('caí aqui');
      state.expenses = [...state.expenses, action.payload];
      state.isLoading = false;
    },
    [getUpdatedExchangeRates.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { saveExpense, updateExpense, deleteExpense } =
  walletSlice.actions;
export default walletSlice.reducer;
