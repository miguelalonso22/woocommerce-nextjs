import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderKey: null,
    orderNumber: null,
  },
  reducers: {
    setOrderDetails: (state, action) => {
      state.orderKey = action.payload.orderKey;
      state.orderNumber = action.payload.orderNumber;
    },
    clearOrderDetails: (state) => {
      state.orderKey = null;
      state.orderNumber = null;
    },
  },
});

export const { setOrderDetails, clearOrderDetails } = orderSlice.actions;
export default orderSlice.reducer;
