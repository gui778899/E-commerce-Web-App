const AccessControl = require('role-acl');
const ac = new AccessControl();

// Admin permissions for Payment
ac.grant('admin')
  .execute('read').on('allPayments') // Assuming 'allPayments' is a similar custom resource

ac.grant('admin')
  .execute('read').on('payment')

ac.grant('admin')
  .execute('create').on('payment')

ac.grant('admin')
  .execute('update').on('payment')


ac.grant('admin')
  .execute('delete').on('payment')

// User permissions for Payment
ac.grant('user')
  .condition({ Fn: 'EQUALS', args: { requester: '$.owner' } })
  .execute('read').on('payment')

ac.grant('user')
  .condition({ Fn: 'EQUALS', args: { requester: '$.owner' } })
  .execute('create').on('payment')



// Define permission check functions for Payment
exports.readAllPayments = (requester) => {
  return ac.can(requester.role)
    .execute('read')
    .sync()
    .on('allPayments');
};

exports.readUserPayment = (requester, userId) => {
  if (requester.role === 'admin' || requester.id === userId) {
    return { granted: true };
  }
  return ac.can(requester.role)
    .context({ requester: requester.id, owner: userId })
    .execute('read')
    .sync()
    .on('payment');
};

exports.createUserPayment = (requester, userId) => {
  if (requester.role === 'admin' || requester.id === userId) {
    return { granted: true };
  }
  return ac.can(requester.role)
    .context({ requester: requester.id, owner: userId })
    .execute('create')
    .sync()
    .on('payment');
};


exports.deleteUserPayment = (requester) => {
    return ac.can(requester.role)
      .execute('delete')
      .sync()
      .on('payment');
  };

exports.updateUserPayment = (requester) => {
    return ac.can(requester.role)
      .execute('update')
      .sync()
      .on('payment');
};


