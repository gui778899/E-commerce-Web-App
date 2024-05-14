require('dotenv/config');
const Koa = require('koa');
const Router = require('@koa/router');
const app = new Koa();
const router = new Router();
const bodyParser = require('koa-bodyparser'); 
const cors = require('@koa/cors');
const serve = require('koa-static');
const path = require('path');

// Import controllers

const productRouter = require('./routes/product'); 
const cartRouter = require('./routes/cart'); 
const cartitemRouter = require('./routes/cartItem'); 
const UserRouter = require('./routes/user');
const rolesRouter = require('./routes/roles'); 
const orderRouter= require('./routes/order');
const paymentRouter = require('./routes/payment');
const addressRouter = require('./routes/address');
const shippinginformationRouter = require('./routes/shippinginformation');
// Home route
router.get('/', ctx => {
    ctx.body = 'Welcome to the E-commerce Shop!';
});

app.use(bodyParser());
// Use the product router
app.use(productRouter.routes()).use(productRouter.allowedMethods());
app.use(cartRouter.routes()).use(cartRouter.allowedMethods());
app.use(cartitemRouter.routes()).use(cartitemRouter.allowedMethods());
app.use(UserRouter.routes()).use(UserRouter.allowedMethods());
app.use(rolesRouter.routes()).use(rolesRouter.allowedMethods());
app.use(orderRouter.routes()).use(orderRouter.allowedMethods());
app.use(paymentRouter.routes()).use(paymentRouter.allowedMethods());
app.use(addressRouter.routes()).use(addressRouter.allowedMethods());
app.use(shippinginformationRouter.routes()).use(shippinginformationRouter.allowedMethods());
// app.use(userController.routes()).use(userController.allowedMethods());




// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:5001', 
    credentials: true, 
    origin: 'http://localhost:5001'
}));

// Serve only the openapi.yaml file
app.use(serve(path.join(__dirname, 'public')));

// Use the main router
app.use(router.routes()).use(router.allowedMethods());

// Start the server
if (require.main === module) {
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
}else{

module.exports = app;

}