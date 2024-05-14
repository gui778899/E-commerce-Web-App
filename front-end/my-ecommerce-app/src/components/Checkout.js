// Checkout.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  const [paymentDetails, setPaymentDetails] = useState({
    addressLine: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    voucher: ''
  });


  useEffect(() => {
    const fetchCartItemsAndDetails = async () => {
      try {
        const cartResponse = await axios.get('/cart-items/', { withCredentials: true });
        const cartItemsData = cartResponse.data;

        // Fetch product details for each item in the cart
        const productDetailsPromises = cartItemsData.map(async (item) => {
          const productResponse = await axios.get(`/product/${item.ProductID}`, { withCredentials: true });
          return { ...item, productName: productResponse.data.data.Name };
        });

        const detailedCartItems = await Promise.all(productDetailsPromises);
        setCartItems(detailedCartItems);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

  

    fetchCartItemsAndDetails();
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const applyVoucher = () => {
    console.log('Applying voucher:', paymentDetails.voucher);
    // Apply discount logic here
  };


  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.Quantity * parseFloat(item.Price), 0).toFixed(2);
  };

  // Function to handle finalizing the checkout process
  const finalizeCheckout = async () => {
    // Check if payment details are filled out
    if (paymentDetails.cardNumber && paymentDetails.cvc && paymentDetails.expiryDate) {
        try {
            // Create an order first
            const orderResponse = await axios.post('/order', {}, { withCredentials: true });
  
            if (orderResponse.status === 201) {
                console.log('Order created successfully:', orderResponse.data);

                // After creating the order, create the payment
                try {
                    const paymentResponse = await axios.post('/payment', {
                        // Include the necessary payment details here
                        cardNumber: paymentDetails.cardNumber,
                        cvc: paymentDetails.cvc,
                        expiryDate: paymentDetails.expiryDate
                        // add additional payment data if needed
                    }, { withCredentials: true });

                    if (paymentResponse.status === 201) {
                        console.log('Payment created successfully:', paymentResponse.data);
                        // Navigate to Order Complete page
                        navigate('/order-complete');
                    } else {
                        console.error('Failed to create payment:', paymentResponse.data);
                        // Handle failed payment creation
                    }
                } catch (paymentError) {
                    console.error('Error creating payment:', paymentError);
                    // Handle errors related to payment creation
                }
            } else {
                console.error('Failed to create order:', orderResponse.data);
                // Handle failed order creation
            }
        } catch (orderError) {
            console.error('Error finalizing checkout:', orderError);
            // Handle errors related to order creation
        }
    } else {
        console.log('Please fill out all payment details.');
        // Handle missing payment details
    }
};


  return (
    <div className="checkout-container">
        <span className="material-symbols-outlined profile" onClick={() => navigate('/profile')}>
person
</span>
      <span className="material-symbols-outlined back" onClick={() => navigate('/cart')}>
        arrow_back
      </span>

      <h1 className="welcome-title">Checkout</h1>
      <ul className="checkout-items">
        {cartItems.length === 0 ? (
          <li>Your cart is empty.</li>
        ) : (
          cartItems.map((item, index) => (
            <li key={index}>
              {item.productName} - Quantity: {item.Quantity} - ${item.Price}
            </li>
          ))
        )}
      </ul>
      <div className="total-amount">
        <strong>Total Amount: </strong>${calculateTotal()}
      </div>
      <p className="voucher-message">If you have a voucher, please insert it below:</p>
  <div className="voucher-section">
  <input
    type="text"
    name="voucher"
    value={paymentDetails.voucher}
    onChange={handleInputChange}
    className="voucher-input"
    placeholder="Voucher Code"
  />
  <button className="voucher-button" onClick={applyVoucher}>
    Apply Voucher
  </button>
</div>
      <form className="payment-details-form" >
  <h2>Payment Details</h2>
  <input
    type="text"
    name="cardNumber"
    value={paymentDetails.cardNumber}
    onChange={handleInputChange}
    placeholder="Card Number"
    pattern="\d{16}"
    maxLength="16"
    required
  />
  <input
    type="text"
    name="cvc"
    value={paymentDetails.cvc}
    onChange={handleInputChange}
    placeholder="CVC"
    pattern="\d{3,4}"
    maxLength="4"
    required
  />
  <input
    type="text"
    name="expiryDate"
    value={paymentDetails.expiryDate}
    onChange={handleInputChange}
    placeholder="Expiry Date (MM/YY)"
    pattern="\d{2}/\d{2}"
    maxLength="5"
    required
  />    
  

    
      </form>
      <button onClick={finalizeCheckout} className="finalize-checkout-button">
        Finalize Checkout
      </button>
    </div>
  );
}

export default Checkout;
