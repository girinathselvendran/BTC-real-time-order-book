import { configureStore } from '@reduxjs/toolkit';
import orderBookReducer from './orderBookSlice';

export const store = configureStore({
  reducer: {
    orderBook: orderBookReducer,
  },
});
