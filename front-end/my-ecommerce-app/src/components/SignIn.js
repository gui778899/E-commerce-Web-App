import React, { useState } from 'react';
import './SignIn.css';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';


function SignIn({ onSignIn, onToggleRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('')
  const navigate = useNavigate(); // Add this line



  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      await authService.signIn(username, password);
      onSignIn();
      navigate('/main'); 
    } catch (error) {
      console.error('Login error:', error);
      // Update the loginError state with an appropriate message
      if (error.response && error.response.status === 401) {
        setLoginError('Incorrect username or password.');
      } else {
        setLoginError('An error occurred. Please try again later.');
      }
    }
  };

  return (
      <div className="form-container">
        <h1 className="welcome-title">Welcome to the E-commerce Store</h1>
          <form onSubmit={handleSignIn} className="sign-in-form">
              <input 
                  type="text" 
                  name="username" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  required 
                  placeholder="Username" 
                  className="auth-input" // Make sure this class matches your CSS
              />
              <input 
                  type="password" 
                  name="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  placeholder="Password" 
                  className="auth-input" // Make sure this class matches your CSS
              />
             <button type="submit" className="auth-button sign-in">Sign In</button>
      </form>
 
      {loginError && <div className="login-error">{loginError}</div>}
      <p className="register-invite">If you don't have an account, please register below:</p>
      <button onClick={() => navigate('/register')} className="auth-button ">Register</button>
      <img src="/shopping-cart-1026501_1280.png" alt="Shopping Cart" className="shopping-cart-image" />  
    </div>
  );
}

    

export default SignIn;
