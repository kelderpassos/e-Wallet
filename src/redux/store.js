import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
// import wallet from './slices/wallet';

const store = configureStore({
  reducer: {
    user: userReducer,
    // wallet,
  },
});

export default store;
