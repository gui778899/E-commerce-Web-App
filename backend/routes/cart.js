const cartController = require('../controllers/cartController');
const cartRouter = require('@koa/router')({
    prefix: '/cart'
});
const { jwtMiddleware } = require('../auth_validation/jwt');

// Route to get all carts (if needed, for admin purposes perhaps)
cartRouter.get('/',jwtMiddleware, cartController.getAllCarts); // tested 

// Route to get a specific user's cart
cartRouter.get('/user', jwtMiddleware,cartController.getUserCart); // tested 

// Route to create a new cart for a user
cartRouter.post('/user', jwtMiddleware,cartController.createCartForUser); // tested 

// Route to delete a specific cart
cartRouter.delete('/', jwtMiddleware,cartController.deleteCart); // tested 


module.exports = cartRouter;
  
