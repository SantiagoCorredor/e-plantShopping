import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice'; // Ajustar la ruta si es necesario
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calcula el total de todos los productos en el carrito
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      return total + item.quantity * parseFloat(item.cost.replace('$', '')); // Eliminar el símbolo $ y convertir a número
    }, 0);
  };

  // Incrementar la cantidad de un producto en el carrito
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Decrementar la cantidad de un producto en el carrito
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    }
  };

  // Eliminar un ítem del carrito
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calcula el costo total basado en la cantidad de un ítem
  const calculateTotalCost = (item) => {
    return item.quantity * parseFloat(item.cost.replace('$', '')); // Multiplicar cantidad por el costo unitario
  };

  // Continuar comprando (volviendo al listado de productos)
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(); // Llamar a la función pasada desde el componente padre
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount().toFixed(2)}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                  disabled={item.quantity <= 1} // Desactivar si la cantidad es 1
                >
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item).toFixed(2)}</div>
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className="total_cart_amount"></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
