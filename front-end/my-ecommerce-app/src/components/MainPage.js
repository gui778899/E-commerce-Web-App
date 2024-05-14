import React, { useEffect, useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import './MainPage.css';

function MainPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // State to track the selected product
  const [cartCount, setCartCount] = useState(0); // New state for cart items count
  const [productQuantities, setProductQuantities] = useState({});
  useEffect(() => {
    // Load saved product quantities from local storage
    const savedQuantities = JSON.parse(localStorage.getItem('productQuantities')) || {};
    setProductQuantities(savedQuantities);

    const fetchProducts = async () => {
      try {
        const response = await axios.get('/product'); 
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
    checkUserCart();
  }, []);

  // Calculate the total quantity for cart icon
  const totalQuantity = Object.values(productQuantities).reduce((sum, qty) => sum + qty, 0);
  useEffect(() => {
    // Update local storage whenever productQuantities changes
    localStorage.setItem('productQuantities', JSON.stringify(productQuantities));
    setCartCount(totalQuantity);
  }, [productQuantities]);


  const handleResetCart = () => {
    setCartCount(0); // Reset cart count to 0
    setProductQuantities({}); // Reset product quantities to empty object
    localStorage.removeItem('productQuantities'); // Clear quantities from local storage
  };
    

  const handleSignOut = async () => {
    try {
      await axios.post('/user/logout');
      // Clear the local storage and reset state on sign out
      localStorage.removeItem('productQuantities');
      setProductQuantities({});
      setCartCount(0);
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  

  const handleQuantityChange = (productId, delta) => {
    setProductQuantities(prevQuantities => {
      const newQuantity = (prevQuantities[productId] || 0) + delta;
      return { ...prevQuantities, [productId]: Math.max(newQuantity, 0) };
    });
  };
  
  
  const handleRemoveFromCart = async (productId) => {
    const currentQuantity = productQuantities[productId] || 0;
  
    if (currentQuantity > 0) {
      try {
        await axios.delete(`/cart-items/${productId}`, { withCredentials: true });
        console.log('Item removed from cart:', productId);
      } catch (error) {
        console.error('Error removing item from cart:', error);
      }
    }
  
    // Update the product quantity in state to reflect removal
    setProductQuantities(prevQuantities => {
      const updatedQuantities = { ...prevQuantities };
      delete updatedQuantities[productId]; // Remove the product from the quantities
      return updatedQuantities;
    });
  
    // Update cart count
    setCartCount(prevCount => prevCount - currentQuantity);
  };
  

    const handleAddToCart = async (productId) => {
      const currentQuantity = productQuantities[productId] || 0;
    
      try {
        // First, attempt to delete the item
        let itemDeleted = false;
        try {
          await axios.delete(`/cart-items/${productId}`, { withCredentials: true });
          console.log('Item removed from cart:', productId);
          itemDeleted = true;
        } catch (deleteError) {
          if (deleteError.response && deleteError.response.status !== 404) {
            throw deleteError; // If error is not 404, rethrow it
          }
          // If 404 error, item not in cart, proceed to add/update
        }
    
        // Add or update the item based on the current quantity
        if (!itemDeleted || currentQuantity > 1) {
          if (currentQuantity === 1) {
            // Add the item to the cart as it's not present
            await axios.post('/cart-items/', { productId }, { withCredentials: true });
            console.log('New item added to cart:', productId);
          } else if (currentQuantity > 1) {
            // Update the quantity of an existing item
            await axios.post('/cart-items/', { productId }, { withCredentials: true });
            await axios.put(`/cart-items/${productId}`, { quantity: currentQuantity }, { withCredentials: true });
            console.log('Cart item quantity updated:', productId, 'Quantity:', currentQuantity);
          }
        }
    
        // Update the product quantity in state
        setProductQuantities(prevQuantities => ({
          ...prevQuantities,
          [productId]: currentQuantity
        }));
    
      } catch (error) {
        console.error('Error updating cart:', error);
      }
    };
    
    const resetMainPage = () => {
      setCartCount(0);
      setProductQuantities({});
      localStorage.removeItem('productQuantities');
    }
    

    const checkUserCart = async () => {
      try {
        let response = await axios.get(`/cart-items/`, { withCredentials: true });
        
        if (response.status === 200) {
          // Map the cart items to update the product quantities
          const newQuantities = response.data.reduce((acc, item) => {
            acc[item.ProductID] = item.Quantity;
            return acc;
          }, {});
          
          setProductQuantities(newQuantities);
          // Update local storage
          localStorage.setItem('productQuantities', JSON.stringify(newQuantities));
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log('Cart not found for user, creating a new cart');
          try {
            // Try to create a new cart
            const createResponse = await axios.post('/cart/user', {}, { withCredentials: true });
            console.log('New cart created:', createResponse.data);
          } catch (createError) {
            console.error('Error creating new cart:', createError);
          }
        } else {
          // Handle other types of errors
          console.error('Error checking/creating cart:', error);
        }
      }
    };



  

    return (
      <div className="page-container">
                <span className="material-symbols-outlined profile" onClick={() => navigate('/profile')}>
person
</span>
        <h1 className="welcome-title">Products</h1>
        <Link to="/cart" className="cart-button-container">
          <span className="material-symbols-outlined">shopping_cart</span>
          {cartCount > 0 && (
            <span className="cart-count">{cartCount}</span>
          )}
        </Link>
        <button type="submit" className="logout-button" onClick={handleSignOut}>
          Sign Out
        </button>
  
        <div className="products-grid">
          {products.map(product => (
            <div key={product.ProductID} className="product-card">
              <Link to={`/product/${product.ProductID}`}>
                <h2>{product.Name}</h2>
                <p>{product.Price}</p>
              </Link>
              <div className="quantity-selector">
                <button onClick={() => handleQuantityChange(product.ProductID, -1)}>-</button>
                <span>{productQuantities[product.ProductID] || 0}</span>
                <button onClick={() => handleQuantityChange(product.ProductID, 1)}>+</button>
                
              </div>
              <button className="action-button" onClick={() => handleAddToCart(product.ProductID)}>
                Add to Cart
              </button>
              {productQuantities[product.ProductID] > 0 && (
                  <button className="remove-button" onClick={() => handleRemoveFromCart(product.ProductID)}>
                    Remove
                  </button>
                )}
            </div>
          ))}
        </div>
      </div>
    );
  }
export default MainPage; 
