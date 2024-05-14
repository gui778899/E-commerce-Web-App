const CartItemController = require('../controllers/cartItemController');
const cartitemRouter = require('@koa/router')({
    prefix: '/cart-items'
});
const { jwtMiddleware } = require('../auth_validation/jwt');
// Get all items for a specific cart
cartitemRouter.get('/',jwtMiddleware,CartItemController.getItems); // tested 

// Add an item to a cart
cartitemRouter.post('/', jwtMiddleware,CartItemController.addItemToCart); // tested 

// Update a cart item's quantity
cartitemRouter.put('/:ItemId', jwtMiddleware,CartItemController.updateCartItem); // tested 

// Remove an item from a cart
cartitemRouter.delete('/:ItemId', jwtMiddleware, CartItemController.removeItemFromCart); // tested 

module.exports = cartitemRouter;

