const paymentController = require('../controllers/paymentController');
const paymentRouter = require('@koa/router')({
    prefix: '/payment'
});
const { jwtMiddleware } = require('../auth_validation/jwt');

// POST /payment - Create a new payment
paymentRouter.post('/', jwtMiddleware, paymentController.createPayment); // tested 

// GET /payment/:id - Get a payment by PaymentID
paymentRouter.get('/:id', jwtMiddleware, paymentController.getPaymentById); 

// GET /payment - Get all payments
paymentRouter.get('/', jwtMiddleware, paymentController.getAllPayments); // tested 

// PUT /payment/:id - Update a payment by PaymentID
paymentRouter.put('/:id', jwtMiddleware, paymentController.updatePaymentById); // tested 

// DELETE /payment/:id - Delete a payment by PaymentID
paymentRouter.delete('/:id', jwtMiddleware , paymentController.deletePaymentById); // tested 

module.exports = paymentRouter;

