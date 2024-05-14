const shippinginformationController = require('../controllers/shippinginformationController');
const shippinginformationRouter = require('@koa/router')({
    prefix: '/shippinginformation'
});
const { jwtMiddleware } = require('../auth_validation/jwt');


// POST /shippinginformation - Create new shipping information for an order
shippinginformationRouter.post('/', jwtMiddleware, shippinginformationController.createShippingInformation); // tested 

// GET /shippinginformation/:id - Get shipping information by ShippingID
shippinginformationRouter.get('/:id', jwtMiddleware, shippinginformationController.getShippingInformationById); // tested role acl 

// GET /shippinginformation/order/:orderId - Get shipping information for a specific order
shippinginformationRouter.get('/order/:orderId', jwtMiddleware, shippinginformationController.getShippingInformationByOrderId); // tested role acl 

// PUT /shippinginformation/:id - Update shipping information by ShippingID
shippinginformationRouter.put('/:id',jwtMiddleware, shippinginformationController.updateShippingInformationById); // tested 

// DELETE /shippinginformation/:id - Delete shipping information by ShippingID
shippinginformationRouter.delete('/:id', jwtMiddleware, shippinginformationController.deleteShippingInformationById); // tested role acl 

module.exports = shippinginformationRouter;

