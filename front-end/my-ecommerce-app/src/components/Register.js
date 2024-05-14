
import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const [isError, setIsError] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsError(false); // Reset error status before new submission
  setRegistrationStatus(''); // Reset registration status message

  try {
    await axios.post('/user', formData);
    setRegistrationStatus('User created successfully');
    setTimeout(() => navigate('/main'), 2000); // Navigate after 2 seconds
  } catch (error) {
    if (error.response && error.response.status === 409) {
      setRegistrationStatus('Username or email already exists. Please choose a different one.');
    } else {
      setRegistrationStatus('An error occurred. Please try again later.');
    }
    setIsError(true);
  }
};


  return (
    <div className="register-container">
      <h1 className="welcome-title">Please Register Below</h1>
      <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="register-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="register-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="register-input"
          />
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="register-input"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="register-input"
          />
          <button type="submit" className="auth-button">Submit Registration</button>
        </form>
        {registrationStatus && (
        <div className={isError ? "registration-status error" : "registration-status"}>
          {registrationStatus}
        </div>
      )}
    </div>
  );
} 


export default Register;
