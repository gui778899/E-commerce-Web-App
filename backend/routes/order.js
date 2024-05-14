const orderController = require('../controllers/orderController');
const orderRouter = require('@koa/router')({
    prefix: '/order'
});
const { jwtMiddleware } = require('../auth_validation/jwt');

// Route to create a new order
orderRouter.post('/', jwtMiddleware, orderController.createOrder); // tested working role acl need to change the total needs to be according to the cart item table multiplcation 

// Route to retrieve all orders
orderRouter.get('/', jwtMiddleware, orderController.getAllOrders); // tested and working with role acl 

// Route to retrieve a single order by OrderID
orderRouter.get('/orderinfo', jwtMiddleware, orderController.getOrderById); // tested 

// Route to update an existing order by OrderID
orderRouter.put('/',jwtMiddleware,  orderController.updateOrder);  // tested and working

// Route to delete an order by OrderID
orderRouter.delete('/', jwtMiddleware, orderController.deleteOrder); // tested and working with role acl 

module.exports = orderRouter;