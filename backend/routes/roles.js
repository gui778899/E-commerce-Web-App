const rolesController = require('../controllers/rolesController');
const rolesRouter = require('@koa/router')({
    prefix: '/roles'
});

const { jwtMiddleware } = require('../auth_validation/jwt');
// GET all roles
rolesRouter.get('/', jwtMiddleware, rolesController.all); // tested 

// GET a single role by name
rolesRouter.get('/:name', jwtMiddleware, rolesController.getbyName);  // tested 

// POST a new role
rolesRouter.post('/',jwtMiddleware,  rolesController.newrole); // tested 

// PUT to update an existing role
rolesRouter.put('/:name', jwtMiddleware, rolesController.update); // tested 

// DELETE a role
rolesRouter.delete('/:name', jwtMiddleware, rolesController.delete);  // tested

// Export the configured router
module.exports = rolesRouter; 