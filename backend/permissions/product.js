const AccessControl = require('role-acl');
const ac = new AccessControl();

// Grant admin all permissions on the product
ac.grant('admin')
  .execute('read').on('product')
  .execute('create').on('product')
  .execute('update').on('product')
  .execute('delete').on('product');

// Grant user only read permissions on the product
ac.grant('user')
  .execute('read').on('product');

// Define permission check functions for product operations
exports.readProduct = (requester) => {
  return ac.can(requester.role).execute('read').sync().on('product');
};

exports.createProduct = (requester) => {
  return ac.can(requester.role).execute('create').sync().on('product');
};

exports.updateProduct = (requester) => {
  return ac.can(requester.role).execute('update').sync().on('product');
};

exports.deleteProduct = (requester) => {
  return ac.can(requester.role).execute('delete').sync().on('product');
};
