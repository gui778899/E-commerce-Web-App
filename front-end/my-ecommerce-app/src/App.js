

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SignIn from './components/SignIn';
import Register from './components/Register';
import MainPage from './components/MainPage';
import ProtectedRoute from './components/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import ProductDetail from './components/ProductDetail'; 
import CartPage from './components/CartPage';
import Checkout from './components/Checkout';
import OrderComplete from './components/OrderComplete';
import ProfilePage from './components/ProfilePage';
import AdminDashboard from './components/AdminDashboard';
import { useLocation } from 'react-router-dom';
import UserManagement from './components/UserManagement';
import ApiDocs from './components/ApiDocs';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  
  const navigate = useNavigate();
const location = useLocation();

useEffect(() => {
  console.log("Checking authentication status");
  const checkAuthStatus = async () => {
    try {
      const response = await axios.get('/user/auth-check', { withCredentials: true });
      setIsAuthenticated(response.data.isAuthenticated);
      setUserRole(response.data.role); // Set the user role
      if (response.data.role === 'admin' && location.pathname !== '/admin-dashboard'&& location.pathname !== '/user-management') {
        navigate('/admin-dashboard');
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  checkAuthStatus();
}, [navigate, location.pathname]); // Add location.pathname as a dependency


  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while checking authentication status
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/api-docs" element={<ApiDocs />} />
        <Route path="/" element={!isAuthenticated ? <SignIn onSignIn={() => setIsAuthenticated(true)} /> : <MainPage />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/main" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MainPage />
            </ProtectedRoute>
          } 
        />
       <Route path="/product/:productId" element={
          <ProtectedRoute isAuthenticated={isAuthenticated} >
            <ProductDetail />
          </ProtectedRoute>
        } />
        <Route path="/cart" element={
          <ProtectedRoute isAuthenticated={isAuthenticated} >
            <CartPage />
          </ProtectedRoute>
        } />
        <Route path="/checkout" element={
          <ProtectedRoute isAuthenticated={isAuthenticated} >
            <Checkout />
          </ProtectedRoute>
        } />
        <Route path="/order-complete" element={
          <ProtectedRoute isAuthenticated={isAuthenticated} >
            <OrderComplete />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <ProfilePage />
          </ProtectedRoute>
        } />
<Route path="/admin-dashboard" element={
  <ProtectedRoute isAuthenticated={isAuthenticated} role={userRole} allowedRoles={['admin']}>
    <AdminDashboard />
  </ProtectedRoute>
} />
<Route path="/user-management" element={
  <ProtectedRoute isAuthenticated={isAuthenticated} role={userRole} allowedRoles={['admin']}>
    <UserManagement />
  </ProtectedRoute>
} />
      </Routes>
    </div>
  );
}

export default App;