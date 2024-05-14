const addressController = require('../controllers/addressController');
const addressRouter = require('@koa/router')({
    prefix: '/address'
});

const { jwtMiddleware } = require('../auth_validation/jwt');

// POST /address - Create a new address for a user (Protected)
addressRouter.post('/', jwtMiddleware, addressController.createAddress); // tested with JWT and user permissions 

// GET /address/:id - Get an address by AddressID (Protected)
addressRouter.get('/:id', jwtMiddleware, addressController.getAddressById); // tested for the user need to check for admin

// GET /address/ - Get all addresses for a specific user (Protected)
addressRouter.get('/', jwtMiddleware, addressController.getAddressesByUserId); // tested for the user 

// PUT /address/:id - Update an address by AddressID (Protected)
addressRouter.put('/:id', jwtMiddleware, addressController.updateAddressById); // tested for the user 

// DELETE /address/:id - Delete an address by AddressID (Protected)
addressRouter.delete('/:id', jwtMiddleware, addressController.deleteAddressById); // tested for the user

module.exports = addressRouter;

    