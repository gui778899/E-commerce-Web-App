const AccessControl = require('role-acl');
const ac = new AccessControl();

// Admin permissions for all operations on orders
ac.grant('admin')
  .execute('create').on('order')
  .execute('read').on('allOrders') // Custom resource for getting all orders
  .execute('read').on('order')
  .execute('update').on('order')
  .execute('delete').on('order');

// User permissions for specific operations on their own orders
ac.grant('user')
  .condition({ Fn: 'EQUALS', args: { requester: '$.owner' } })
  .execute('create').on('order')
  .execute('read').on('order')
  .execute('update').on('order')
  .execute('delete').on('order');

// Define permission check functions for orders
exports.createOrder = (requester) => {
  console.log('requester:', requester.role);
  // Admin can create any order, users can only create orders for themselves
  return { granted: requester.role === 'admin' || requester.role === 'user' };
};


exports.getAllOrders = (requester) => {
  // Only admin can retrieve all orders
  return ac.can(requester.role)
    .execute('read')
    .sync()
    .on('allOrders');
};

exports.getOrderById = (requester) => {
  // Admin can read any order, user can only read their own order
  if (requester.role === 'admin' || requester.role === 'user') {
    return { granted: true };
  }
  return { granted: false };
};

exports.updateOrder = (requester, userId) => {
  // Admin can update any order, user can only update their own order
  if (requester.role === 'admin' || requester.id === userId) {
    return { granted: true };
  }
  return { granted: false };
};

exports.deleteOrder = (requester, userId) => {
  
  
  // Admin can delete any order, user can only delete their own order
  if (requester.role === 'admin' || requester.id == userId) {
    return { granted: true };
  }
  return { granted: false };
};
