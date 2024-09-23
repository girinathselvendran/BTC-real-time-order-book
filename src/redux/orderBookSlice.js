import { createSlice } from "@reduxjs/toolkit";

const MAX_ROWS = 25;

const initialState = {
  bids: [],
  asks: [],
  connected: false,
};

function handleBookRows(oldArray, newItems) {
  if (!Array.isArray(newItems)) {
    return oldArray;
  }

  const newItemsFiltered = newItems.filter(
    (newItem) =>
      !(
        Number.isNaN(newItem.count) ||
        Number.isNaN(newItem.price) ||
        Number.isNaN(newItem.amount)
      )
  );

  return [...newItemsFiltered, ...oldArray.slice(0, MAX_ROWS - 1)];
}

const orderBookSlice = createSlice({
  name: "orderBook",
  initialState,
  reducers: {
    addBids(state, action) {
      state.bids = handleBookRows(state.bids, action.payload);
    },
    addAsks(state, action) {
      state.asks = handleBookRows(state.asks, action.payload);
    },
    setConnected(state, action) {
      state.connected = action.payload;
    },
  },
});

export const { addBids, addAsks, setConnected } = orderBookSlice.actions;
export default orderBookSlice.reducer;
