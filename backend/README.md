# Backend 6003CEM Web API Development

## Introduction
This repository includes a RESTful API backend for an e-commerce store, developed using Node.js and the Koa framework. It's part of a full-stack application, designed to be integrated with a frontend application to create a complete web application.

## Features
- **User Management**: Registration, login, profile management.
- **Product Management**: Add, update, delete, and retrieve products.
- **Cart Management**: Manage shopping cart items.
- **Order Processing**: Place and manage orders.
- **Payment System**: Handle payment transactions.
- **Role and Permissions**: Admin and user role management.

## Getting Started
1. Clone the repository.
2. Install dependencies: `npm install`.
3. Set up environment variables for the database and other services.
4. Start the server: `nodemon start`.

## API Documentation
The API documentation is provided in OpenAPI format and is available under the `public` directory. The `openapi.yaml` file contains detailed information about all the API endpoints, including their parameters, request and response schemas, and authentication requirements. 

### To view and interact with the API documentation:
1. Ensure that both the frontend and the backend servers are running.
2. Open your web browser and navigate to [http://localhost:5001/api-docs](http://localhost:5001/api-docs). This will load the OpenAPI documentation interface, allowing you to explore and test the various API endpoints directly from the browser.

## API Endpoints

### User Routes
- GET /user: Retrieve all users (Admin only).
- POST /user: Register a new user.
- POST /user/login: Authenticate a user.
- GET /user/profile: Fetch a user's profile.
- PUT /user/:id Update a user's profile.
- DELETE /user/:id Delete a user.
- POST /user/logout: Logout a user.

### Product Routes
- GET /product: Retrieve all products.
- POST /product: Add a new product.
- PUT /product/:id Update a product.
- DELETE /product/:id Delete a product.

### Cart Routes
- GET /cart: Get all carts (Admin only).
- GET /cart/user: Get a user's cart.
- POST /cart/user: Create a cart for a user.
- DELETE /cart: Delete a specific cart.

### Cart Item Routes
- GET /cart-items: Get all items in a specific cart.
- POST /cart-items: Add an item to a cart.
- PUT /cart-items/:ItemId: Update a cart item's quantity.
- DELETE /cart-items/:ItemId: Remove an item from a cart.

### Order Routes
- POST /order: Create a new order.
- GET /order: Retrieve all orders.
- GET /order/orderinfo: Get order details.
- PUT /order: Update an order.
- DELETE /order: Delete an order.

### Payment Routes
- POST /payment: Process a new payment.
- GET /payment/:id Get payment details.
- GET /payment: Get all payments.
- PUT /payment/:id Update a payment.
- DELETE /payment/:id Delete a payment.

### Address Routes
- POST /address: Create a new address.
- GET /address/:id Retrieve an address.
- GET /address: Get all addresses for a user.
- PUT /address/:id Update an address.
- DELETE /address/:id Delete an address.

### Role Routes
- GET /roles: Get all roles.
- GET /roles/:name: Get a specific role.
- POST /roles: Create a new role.
- PUT /roles/:name: Update a role.
- DELETE /roles/:name: Delete a role.

### Shipping Information Routes
- POST /shippinginformation: Create shipping information.
- GET /shippinginformation/:id Get shipping information.
- GET /shippinginformation/order/:orderId: Get shipping information for an order.
- PUT /shippinginformation/:id Update shipping information.
- DELETE /shippinginformation/:id Delete shipping information.

## Security
- The API uses JWT for authentication and authorization.
- Implements role-based access control.

## Testing
The `testing` folder contains automated tests for the backend, ensuring that each part of the API functions as expected. The tests cover various components, including:

- Address (`address.test.js`)
- Cart (`cart.test.js`)
- Cart Item (`cartitem.test.js`)
- Order (`order.test.js`)
- Payment (`payment.test.js`)
- Product (`product.test.js`)
- Shipping Information (`shippinginformation.test.js`)
- User (`user.test.js`)

To execute the tests, run the command `npm test` from the root directory. These tests utilize the `supertest` library to simulate HTTP requests and assert the API responses.




## Database Structure and Population
The database structure and initial population scripts are available in the `database` folder. This includes a MySQL 8.0.33 database export for the 'project' database, hosted on a localhost server.

Key details:
- MySQL version: 8.0.33, compatible with macOS 13.3 (arm64).
- Server version: 8.0.32.

The database includes tables like `User`, `Product`, `Order`, `Payment`, `Cart`, `Cart_Item`, `Address`, `roles`, and `ShippingInformation`, each designed with appropriate fields and relationships. 

For the complete database structure and data, refer to the SQL files in the `database` folder.


## Environment Variables
Set the following environment variables for database configuration and JWT:
- DB_HOST
- DB_USER
- DB_PASS
- DB_DATABASE
- JWT_SECRET
