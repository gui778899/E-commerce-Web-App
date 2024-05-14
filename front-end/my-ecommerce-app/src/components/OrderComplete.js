import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function OrderComplete() {
  const navigate = useNavigate();
  const [orderID, setOrderID] = useState(null);

  useEffect(() => {
    // Fetch the order details on component mount
    axios.get('/order/orderinfo', { withCredentials: true })
      .then(response => {
        // Set the order data state
        const orderData = response.data;
        console.log('Order data:', orderData);
        setOrderID(orderData.OrderID); // Store the order ID

        // Call the function to delete the cart
        deleteCartItems();
      })
      .catch(error => {
        console.error('Error fetching the order:', error);
      });
  }, []); // Empty dependency array to ensure this runs once on component mount

  const deleteCartItems = async () => {
    try {
      const deleteresponse = await axios.delete('/cart/', { withCredentials: true });
      console.log('Cart items deleted:', deleteresponse.data);
      localStorage.removeItem('productQuantities'); // Clear localStorage
    } catch (error) {
      console.error('Error deleting cart items:', error);
    }
  };

  const handleGoToMainPage = () => {
    // This will navigate to the /main page
    navigate('/main', { replace: true }); 
  };
  

  return (
    <div className="order-complete-container">
      <h1>Order Complete</h1>
      {orderID ? (
        <div>
          <p>Thank you for your purchase! Your order ID is {orderID}.</p>
          <button onClick={handleGoToMainPage}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <p>Loading your order details...</p>
      )}
    </div>
  );
}

export default OrderComplete;
