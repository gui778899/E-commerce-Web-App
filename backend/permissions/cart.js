const AccessControl = require('role-acl');
const ac = new AccessControl();

// Admin permissions
ac.grant('admin')
  .execute('read')
  .on('allCarts')  // 'allCarts' is a custom resource for the purpose of this ACL

ac.grant('admin')
  .execute('read')
  .on('cart')

ac.grant('admin')
  .execute('create')
  .on('cart')

ac.grant('admin')
  .execute('delete')
  .on('cart')

// User permissions
ac.grant('user')
  .condition({ Fn: 'EQUALS', args: { requester: '$.owner' } })
  .execute('read')
  .on('cart')

ac.grant('user')
  .condition({ Fn: 'EQUALS', args: { requester: '$.owner' } })
  .execute('create')
  .on('cart')

ac.grant('user')
  .condition({ Fn: 'EQUALS', args: { requester: '$.owner' } })
  .execute('delete')
  .on('cart')

// Define permission check functions for cart
exports.readAllCarts = (requester) => {
  return ac.can(requester.role)
    .execute('read')
    .sync()
    .on('allCarts');
};

exports.readUserCart = (requester, userId) => {
  // If the requester is admin or the requester's id matches the userId, grant permission
  if (requester.role === 'admin' || requester.id === userId) {
    return { granted: true };
  }
  // Otherwise, check using ACL
  return ac.can(requester.role)
    .context({ requester: requester.id, owner: userId })
    .execute('read')
    .sync()
    .on('cart');
};

exports.createUserCart = (requester, userId) => {
  // If the requester is admin or the requester's id matches the userId, grant permission
  if (requester.role === 'admin' || requester.id === userId) {
    return { granted: true };
  }
  // Otherwise, check using ACL
  return ac.can(requester.role)
    .context({ requester: requester.id, owner: userId })
    .execute('create')
    .sync()
    .on('cart');
};

exports.deleteUserCart = (requester, userId) => {
  // If the requester is admin or the requester's id matches the userId, grant permission
  console.log(requester);
  console.log(userId);
  if (requester.role === 'admin' || requester.id == userId) {
    return { granted: true };
  }
  // Otherwise, check using ACL
  return ac.can(requester.role)
    .context({ requester: requester.id, owner: userId })
    .execute('delete')
    .sync()
    .on('cart');
};
