const UserRouter = require('koa-router')({
    prefix: '/user'
  });
  
const bodyParser = require('koa-bodyparser');
const userController = require('../controllers/userController');
const auth = require('../auth_validation/auth');
const { validateUser, validateUserUpdate } = require('../auth_validation/validation');
const { jwtMiddleware } = require('../auth_validation/jwt');

// Configure the routes and their handlers

// 1. GET /user - Get all users (Protected, possibly admin only)
UserRouter.get('/', jwtMiddleware,userController.getAll); // tested working only for admin 

// 2. POST /user - Create a new user (Public, for user registration)
UserRouter.post('/', bodyParser(), validateUser, userController.createUser); // tested for admin and user registration 

// 3. POST /user/login - Login a user (Public, for user login)
UserRouter.post('/login', bodyParser(), userController.login); // tested for admin and user login

// 4. GET /user/profile - Get a single user by its id (Protected, users can access their own data)
UserRouter.get('/profile', jwtMiddleware, userController.getById); // tested working with role acess for admin and user

// 5. PUT /user/:id - Update a user by its id (Protected, users can update their own data)
UserRouter.put('/:id([0-9]{1,})', jwtMiddleware, bodyParser(), validateUserUpdate, userController.updateUser); // tested for admin and user update

// 6. DELETE /user/:id - Delete a user by its id (Protected, possibly admin only or users can delete their own account)
UserRouter.del('/:id([0-9]{1,})', jwtMiddleware, userController.deleteUser); // tested working with role acess for admin and user

// 7. GET /user/auth-check - Authenticated user is recognized
UserRouter.get('/auth-check', userController.checkAuth) // tested working with role acess for admin and user

UserRouter.post('/logout', userController.logout)
module.exports = UserRouter;


 