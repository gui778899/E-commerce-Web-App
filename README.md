
# 6003CEM Web API Development

## Table of Contents
- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Setup and Installation](#setup-and-installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Components Overview](#components-overview)
  - [Frontend Components](#frontend-components)
  - [Backend API Endpoints](#backend-api-endpoints)
- [Additional Information](#additional-information)
  - [Frontend Details](#frontend-details)
  - [Backend Details](#backend-details)
- [API Documentation](#api-documentation)
- [Security](#security)
- [Testing](#testing)
- [Database Structure and Population](#database-structure-and-population)
- [Contribution Guidelines](#contribution-guidelines)
- [Conclusion](#conclusion)


## Project Overview

This project is a comprehensive e-commerce platform, consisting of both frontend and backend components. The frontend is developed using React in a Single Page Application (SPA) architecture, while the backend is a RESTful API built with Node.js and the Koa framework. Together, these components create a seamless and dynamic online shopping experience.

## Key Features

- **User Authentication:** Registration, sign-in, and sign-out functionalities using secure HTTP cookies for session management.
- **Product Management:** Admin capabilities to add, edit, or delete products.
- **Shopping Cart:** Users can manage their cart, including adding products and modifying quantities.
- **Checkout Process:** Handles payment processing and order finalization, including support for discount vouchers.
- **Role and Permissions:** Differentiated admin and user roles with specific permissions.

## Setup and Installation

### Backend Setup

1. Clone the repository to your local machine.
2. Navigate to the backend directory and install dependencies:
   \`\`\`sh
   npm install
   \`\`\`
3. Configure environment variables for your database and server requirements.
4. Start the server:
   \`\`\`sh
   nodemon start
   \`\`\`
5. The backend server will run on `localhost:5001` by default.

### Frontend Setup

1. Clone the repository to your local machine.
2. Navigate to the frontend directory and install dependencies:
   \`\`\`sh
   npm install
   \`\`\`
3. Configure environment variables as needed.
4. Start the application:
   \`\`\`sh
   npm start
   \`\`\`
5. The frontend application will run on `localhost:3000` by default.

## Components Overview

### Frontend Components

- **SignIn.js:** Manages user sign-in functionality.
- **Register.js:** Handles user registration.
- **MainPage.js:** The main landing page displaying products.
- **ProductDetail.js:** Shows detailed information for a specific product.
- **CartPage.js:** Allows users to manage their shopping cart.
- **Checkout.js:** Manages the checkout and payment process.
- **ProfilePage.js:** Enables users to view and edit their profile.
- **AdminDashboard.js:** A dashboard for administrative tasks like product management.
- **UserManagement.js:** Provides admin functionalities to manage users.

### Backend API Endpoints

#### User Routes
- \`GET /user\`: Retrieve all users (Admin only).
- \`POST /user\`: Register a new user.
- \`POST /user/login\`: Authenticate a user.
- \`GET /user/profile\`: Fetch a user's profile.
- \`PUT /user/:id\`: Update a user's profile.
- \`DELETE /user/:id\`: Delete a user.
- \`POST /user/logout\`: Logout a user.

#### Product Routes
- \`GET /product\`: Retrieve all products.
- \`POST /product\`: Add a new product.
- \`PUT /product/:id\`: Update a product.
- \`DELETE /product/:id\`: Delete a product.

#### Cart Routes
- \`GET /cart\`: Get all carts (Admin only).
- \`GET /cart/user\`: Get a user's cart.
- \`POST /cart/user\`: Create a cart for a user.
- \`DELETE /cart\`: Delete a specific cart.

#### Cart Item Routes
- \`GET /cart-items\`: Get all items in a specific cart.
- \`POST /cart-items\`: Add an item to a cart.
- \`PUT /cart-items/:ItemId\`: Update a cart item's quantity.
- \`DELETE /cart-items/:ItemId\`: Remove an item from a cart.

#### Order Routes
- \`POST /order\`: Create a new order.
- \`GET /order\`: Retrieve all orders.
- \`GET /order/orderinfo\`: Get order details.
- \`PUT /order\`: Update an order.
- \`DELETE /order\`: Delete an order.

#### Payment Routes
- \`POST /payment\`: Process a new payment.
- \`GET /payment/:id\`: Get payment details.
- \`GET /payment\`: Get all payments.
- \`PUT /payment/:id\`: Update a payment.
- \`DELETE /payment/:id\`: Delete a payment.

#### Address Routes
- \`POST /address\`: Create a new address.
- \`GET /address/:id\`: Retrieve an address.
- \`GET /address\`: Get all addresses for a user.
- \`PUT /address/:id\`: Update an address.
- \`DELETE /address/:id\`: Delete an address.

#### Role Routes
- \`GET /roles\`: Get all roles.
- \`GET /roles/:name\`: Get a specific role.
- \`POST /roles\`: Create a new role.
- \`PUT /roles/:name\`: Update a role.
- \`DELETE /roles/:name\`: Delete a role.

#### Shipping Information Routes
- \`POST /shippinginformation\`: Create shipping information.
- \`GET /shippinginformation/:id\`: Get shipping information.
- \`GET /shippinginformation/order/:orderId\`: Get shipping information for an order.
- \`PUT /shippinginformation/:id\`: Update shipping information.
- \`DELETE /shippinginformation/:id\`: Delete shipping information.

## Additional Information

### Frontend Details

- **Routing:** Uses \`react-router-dom\` for SPA routing.
- **State Management:** Utilizes React's \`useState\` and \`useEffect\` hooks.
- **HTTP Requests:** Axios is used for HTTP requests to the backend.
- **Security:** Secure HTTP cookies for session management and input validation.

### Backend Details

- **Authentication:** Uses JWT for authentication and authorization.
- **Testing:** Automated tests using \`supertest\` for various API components.
- **Database:** MySQL database with scripts available in the \`database\` folder.

### Environment Variables

Set the following environment variables for database configuration and JWT:

- **Backend:**
  - \`DB_HOST\`
  - \`DB_USER\`
  - \`DB_PASS\`
  - \`DB_DATABASE\`
  - \`JWT_SECRET\`

- **Frontend:**
  - Configure as needed for API endpoints and other services.

## API Documentation

The API documentation is provided in OpenAPI format and can be accessed as follows:

1. Ensure both the frontend and backend servers are running.
2. Navigate to [http://localhost:5001/api-docs](http://localhost:5001/api-docs) in your web browser to explore and test the API endpoints.

## Security

- The application uses JWT for authentication and implements role-based access control.
- Ensure to manage HTTP cookies securely and validate user input on both frontend and backend.

## Testing

Automated tests are available in the \`testing\` folder of the backend. To run the tests, execute:

\`\`\`sh
npm test
\`\`\`

These tests cover various API components, including users, products, orders, and more.

## Database Structure and Population

The database structure and initial population scripts are available in the \`database\` folder. The database includes tables for users, products, orders, payments, carts, cart items, addresses, roles, and shipping information.

For more details, refer to the SQL files in the \`database\` folder.

## Conclusion

This project combines a robust backend API with a dynamic frontend application to create a full-featured e-commerce platform. By following the setup instructions and utilizing the provided documentation, you can deploy and manage this application effectively.
