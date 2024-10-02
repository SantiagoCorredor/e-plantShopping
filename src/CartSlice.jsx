import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Inicializamos con un array vacío de ítems
  },
  reducers: {
    // Añadir un ítem al carrito
    addItem: (state, action) => {
      const { name, image, description, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);

      if (existingItem) {
        // Si el ítem ya está en el carrito, incrementa su cantidad
        existingItem.quantity += 1;
      } else {
        // Si no está en el carrito, lo añadimos con una cantidad inicial de 1
        state.items.push({
          name,
          image,
          description,
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
        existingItem.quantity = quantity;
      }
    },

    // Eliminar un ítem del carrito
    removeItem: (state, action) => {
      const name = action.payload;
      state.items = state.items.filter(item => item.name !== name); // Filtra para eliminar el ítem
    },

    // Calcular el total de la cantidad en el carrito (opcional, pero útil si quieres tenerlo aquí)
    calculateTotalAmount: (state) => {
      return state.items.reduce((total, item) => {
        return total + item.quantity * parseFloat(item.cost.replace('$', ''));
      }, 0);
    },
  },
});

// Exportamos las acciones
export const { addItem, updateQuantity, removeItem, calculateTotalAmount } = CartSlice.actions;

// Exportamos el reducer
export default CartSlice.reducer;
