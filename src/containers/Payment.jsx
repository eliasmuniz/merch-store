import React, { useContext } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { handleSumTotal } from '../utils';
import '../styles/components/Payment.css';
import { v4 as uuidv4 } from 'uuid';

const Payment = () => {
  const { state, addNewOrder } = useContext(AppContext);
  const { cart, buyer } = state;

  const paypalOptions = {
    clientID:
      'AT8qPFfRsc37w4gfvxFCnq_13SRVcYT7-Za0rSeFJkKXGgoNCcO-Ylq4KMuECG_WyRE26QOkPBtYhFuH',
    intent: 'capture',
    curreny: 'USD',
  };

  const buttonStyles = {
    layout: 'vertical',
    shape: 'rect',
  };

  const handlePaymentSuccess = (data) => {
    if (data.status === 'COMPLETED') {
      const newOrder = {
        buyer,
        product: cart,
        payment: data,
      };

      addNewOrder(newOrder);
      useNavigate('/checkout/success');
    }
  };

  return (
    <div className="Payment">
      <div className="Payment-content">
        <h3>Resumen del pedido</h3>
        {cart.map((item) => (
          <div className="Payment-item" key={uuidv4()}>
            <div className="Payment-element">
              <h4>{item.title}</h4>
              <span>$ {item.price}</span>
            </div>
          </div>
        ))}
        <h3>Total: ${handleSumTotal(cart)}</h3>
        <div className="Payment-button">
          <PayPalButton
            paypalOptions={paypalOptions}
            buttonStyles={buttonStyles}
            amount={handleSumTotal(cart)}
            onPaymentStart={() => console.log('Start payment')}
            onSuccess={(data) => handlePaymentSuccess(data)}
            onError={(error) => console.log(error)}
            onCancel={(data) => console.log(data)}
          />
        </div>
      </div>
    </div>
  );
};

export default Payment;
