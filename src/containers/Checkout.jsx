import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import '../styles/components/Checkout.css';
import { Link } from 'react-router-dom';
import CheckoutItem from '../components/CheckoutItem';
import { handleSumTotal } from '../utils';
import { v4 as uuidv4 } from 'uuid';

const Checkout = () => {
  const { state, removeFromCart } = useContext(AppContext);
  const { cart } = state;

  const handleRemove = (product) => () => {
    removeFromCart(product);
  };

  return (
    <div className="Checkout">
      <div className="Checkout-content">
        {cart.length > 0 ? <h3>Lista de pedidos:</h3> : <h3>Sin pedidos...</h3>}
        {cart.map((item) => (
          <div className="Checkout-item" key={uuidv4()}>
            <div className="Checkout-element">
              <h4>{item.title}</h4>
              <span>${item.price}</span>
            </div>
            <button type="button" onClick={handleRemove}>
              <i className="fas fa-trash-alt" />
            </button>
          </div>
        ))}
      </div>
      {cart.length > 0 ? (
        <div className="Checkout-sidebar">
          <h3>{`Precio total: $ ${handleSumTotal(cart)}`}</h3>
          <Link to="/checkout/information">
            <button type="button">Continuar pedido</button>
          </Link>
        </div>
      ) : (
        <h3>No hay pedidos </h3>
      )}
    </div>
  );
};

export default Checkout;
