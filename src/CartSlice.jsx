import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    numOfItems: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }

      state.numOfItems += 1;
    },
    removeItem: (state, action) => {
      const { name } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);

      if (!existingItem) {
        return;
      }

      state.numOfItems -= existingItem.quantity;
      state.items = state.items.filter((item) => item.name !== name);

      if (state.numOfItems < 0) {
        state.numOfItems = 0;
      }
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);

      if (!existingItem) {
        return;
      }

      const differenceQuantity = quantity - existingItem.quantity;
      existingItem.quantity = quantity;
      state.numOfItems += differenceQuantity;

      if (state.numOfItems < 0) {
        state.numOfItems = 0;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
