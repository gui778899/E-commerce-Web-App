# Frontend 6003CEM Web API Development

## Project Overview

This project is a web application that serves as an e-commerce platform. The frontend is developed using React in a Single Page Application (SPA) architecture and interacts with a backend API for data processing and storage. The source code for the backend can be found at [Backend Repository](https://github.coventry.ac.uk/sousagoncj/webAPIdev).



#### Key Features

- **User Authentication:** Includes registration, sign-in, and sign-out functionality, leveraging secure HTTP cookies for maintaining user sessions.
- **Product Management:** Admin users can add, edit, or delete products from the inventory.
- **Shopping Cart:** Users can add products to their cart, view cart items, and modify quantities.
- **Checkout Process:** Includes payment processing and order finalization with support for applying discount vouchers.

### Setup and Installation

To set up the backend server, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory and install dependencies:`npm install`.
3. Configure environment variables as per your database and server requirements.
4. Start the server: `npm start`.

The application will run on `localhost:5001` by default.

## Components Overview

The frontend consists of several key components, each handling a different aspect of the application:

- **SignIn.js**: Manages user sign-in functionality.
- **Register.js**: Handles user registration.
- **MainPage.js**: The main landing page displaying products.
- **ProductDetail.js**: Shows detailed information for a specific product.
- **CartPage.js**: Allows users to manage their shopping cart.
- **Checkout.js**: Manages the checkout and payment process.
- **ProfilePage.js**: Enables users to view and edit their profile.
- **AdminDashboard.js**: A dashboard for administrative tasks like product management.
- **UserManagement.js**: Provides admin functionalities to manage users.



## Additional Information

- **Routing:** The application uses `react-router-dom` for managing routing within the SPA.
- **State Management:** State is managed using React's `useState` and `useEffect` hooks.
- **HTTP Requests:** Axios is used for making HTTP requests to the backend server.
- **Security:** Ensure to secure the application by managing HTTP cookies securely and validating user input on both frontend and backend.

