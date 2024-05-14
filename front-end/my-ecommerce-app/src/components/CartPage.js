import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cartResponse = await axios.get('/cart-items/', { withCredentials: true });
        const cartItemsData = cartResponse.data;

        // Fetch product details for each item in the cart
        const productDetailsPromises = cartItemsData.map(async (item) => {
          const productResponse = await axios.get(`/product/${item.ProductID}`, { withCredentials: true });
          // Access the product name using productResponse.data.data.Name
          const productName = productResponse.data.data.Name;
          return { ...item, productName };
        });

        const cartItemsWithNames = await Promise.all(productDetailsPromises);
        setCartItems(cartItemsWithNames);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);


  // This function will navigate the user to the '/checkout' route when called
  const handleCheckout = () => {
   navigate('/checkout');
  };


  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.Quantity * parseFloat(item.Price));
    }, 0).toFixed(2); // Rounds to 2 decimal places
  };
  
  return (
    <div className="cart-container">
              <span className="material-symbols-outlined profile" onClick={() => navigate('/profile')}>
person
</span>
<span className="material-symbols-outlined back-to-main" onClick={() => navigate('/main')}>
  arrow_back
</span>

<h1 className="welcome-title">Shopping Cart</h1>
      <ul className="cart-items">
        {cartItems.length === 0 ? (
          <li>Your cart is empty.</li>
        ) : (
          cartItems.map((item, index) => (
            <li key={index}>
            {item.productName}  - Quantity: {item.Quantity} - ${item.Price}
            </li>
          ))
        )}
      </ul>
      <div className="total-amount">
        <strong>Total Amount: </strong>${calculateTotal()}
      </div>
      <button onClick={handleCheckout} className="checkout-button">
        Checkout
      </button>
    </div>
  );
}

export default CartPage;

