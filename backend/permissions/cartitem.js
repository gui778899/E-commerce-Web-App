const AccessControl = require('role-acl');
const ac = new AccessControl();
const cartModel = require('../models/cart'); // This model should have the getUserIdByCartId function

// Admin permissions for all operations on cart items
ac.grant('admin')
  .execute('create').on('cart_item')
  .execute('read').on('cart_item')
  .execute('update').on('cart_item')
  .execute('delete').on('cart_item');

// User permissions for specific operations on their own cart items
ac.grant('user')
  .condition({ Fn: 'EQUALS', args: { requester: '@.owner' } })
  .execute('create').on('cart_item')
  .execute('read').on('cart_item')
  .execute('update').on('cart_item')
  .execute('delete').on('cart_item');

// Define permission check functions for cart item operations
exports.createCartItem = (requester, cartId) => {
  return checkCartOwnership(requester, cartId);
};

exports.readCartItem = (requester, cartId) => {
console.log(requester);
console.log(cartId);
  return checkCartOwnership(requester, cartId);
};

exports.updateCartItem = (requester, cartId) => {
  return checkCartOwnership(requester, cartId);
};

exports.deleteCartItem = (requester, cartId) => {
  return checkCartOwnership(requester, cartId);
};

async function checkCartOwnership(requester, cartId) {
  const ownerId = await cartModel.getUserIdByCartId(cartId);
  console.log(ownerId); 
  if (requester.role === 'admin' || requester.id === ownerId) {
    console.log('granted');
    return { granted: true };

  }
  return { granted: false };
}
