const AccessControl = require('role-acl');
const ac = new AccessControl();

// Admin permissions
ac.grant('admin')
  .execute('read').on('shippingInformation')
  .execute('create').on('shippingInformation')
  .execute('update').on('shippingInformation')
  .execute('delete').on('shippingInformation');

// User permissions
// Note: We grant 'read' permission here assuming that users should be able to view their shipping information.
ac.grant('user')
  .condition({ Fn: 'EQUALS', args: { requester: '$.owner' } })
  .execute('read').on('shippingInformation');

// Permission check functions for ShippingInformation
exports.canReadShippingInformation = (requester, shippingInfoOwnerId) => {
  if (requester.role === 'admin' || requester.id === shippingInfoOwnerId) {
    return { granted: true };
  }
  return ac.can(requester.role)
    .context({ requester: requester.id, owner: shippingInfoOwnerId })
    .execute('read')
    .sync()
    .on('shippingInformation');
};

// Admin-only function to update shipping information
exports.canUpdateShippingInformation = (requester) => {
  return ac.can(requester.role)
    .execute('update')
    .sync()
    .on('shippingInformation');
};

// Admin-only function to create shipping information
exports.canCreateShippingInformation = (requester) => {
  return ac.can(requester.role)
    .execute('create')
    .sync()
    .on('shippingInformation');
};

// Admin-only function to delete shipping information
exports.canDeleteShippingInformation = (requester) => {
  return ac.can(requester.role)
    .execute('delete')
    .sync()
    .on('shippingInformation');
};
