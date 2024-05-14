const productController = require('../controllers/productController');
const productRouter = require('@koa/router')({
    prefix: '/product'
});

const { jwtMiddleware } = require('../auth_validation/jwt');
 
//returns all the available products in the product table

productRouter.get('/', jwtMiddleware, productController.all); // tested with role acl

//returns a specific product if searched by id, returns description, price and id

productRouter.get('/:id', jwtMiddleware, productController.byId); // tested with role acl 

//updates a specific product if searched by id, passes in 1 or more of the following: name, description, price, stock quantity

productRouter.put('/:id', jwtMiddleware, productController.update);  // tested with role acl 

//adds a new product to the database passes in the name, description, price and stock quantity

productRouter.post('/', jwtMiddleware, productController.add)  // tested with role acl 

//deletes a product in the product table
productRouter.delete('/:id',jwtMiddleware,  productController.delete); // tested with role acl 





module.exports = productRouter;