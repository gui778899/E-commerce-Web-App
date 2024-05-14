// authService.js

import axios from 'axios';

// Set up axios to send cookies with every request
axios.defaults.withCredentials = true;

const signIn = async (username, password) => {
  try {
    // Send a POST request to the backend's /user/login route
    const response = await axios.post(`/user/login`, {
      username,
      password
    });
    // If there's a successful response, just return it
    // No need to set cookies or local storage here
    return response.data;
  } catch (error) {
    // Handle errors, such as displaying a message to the user
    throw error;
  }
};
// authService.js
const signOut = async () => {
  try {
    await axios.post('/user/logout');
  } catch (error) {
    console.error('Error during sign out:', error);
  }
};


export default {
  signIn,
  signOut
};
