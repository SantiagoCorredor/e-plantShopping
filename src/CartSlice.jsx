import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    // Añadir o incrementar un ítem en el carrito
    addItem: (state, action,    ) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          name,
          image,
          cost,
          quantity: 1,
        });
      }
    },

    // Actualizar la cantidad de un ítem
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const existingItem = state.items.find(item => item.name === name);

      if (existingItem) {
        existingItem.quantity       = quantity;
      }
    },

    // Eliminar un ítem del carrito
    removeItem: (state, action) => {
      const name = action.payload;
      state.items = state.items.filter(item => item.name !== name);
    },

    // Calcular el total de ítems 
    calculateTotalQuantity: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0);
    },
  },
});

export const { addItem, updateQuantity, removeItem, calculateTotalQuantity } = CartSlice.actions;

export default CartSlice.reducer;
