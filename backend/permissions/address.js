const AccessControl = require('role-acl');
const ac = new AccessControl();

// Grant permissions to the 'user' role
ac.grant('user')
  .condition({Fn: 'EQUALS', args: {'requester': '$.owner'}})
  .execute('create')
  .on('address');

ac.grant('user')
  .condition({Fn: 'EQUALS', args: {'requester': '$.owner'}})
  .execute('read')
  .on('address');

ac.grant('user')
  .condition({Fn: 'EQUALS', args: {'requester': '$.owner'}})
  .execute('update')
  .on('address');

ac.grant('user')
  .condition({Fn: 'EQUALS', args: {'requester': '$.owner'}})
  .execute('delete')
  .on('address');

// Grant permissions to the 'admin' role
ac.grant('admin')
  .execute('create')
  .on('address');

ac.grant('admin')
  .execute('read')
  .on('address');

ac.grant('admin')
  .execute('update')
  .on('address');

ac.grant('admin')
  .execute('delete')
  .on('address');

// Define permission check functions
exports.createAddress = (requester) => {
  return ac.can(requester.role)
    .context({ requester: requester.id, owner: requester.id }) // The owner is the same as the requester
    .execute('create')
    .sync()
    .on('address');
};



exports.readAddress = (requester, data) => {
  return ac.can(requester.role)
    .context({requester: requester.id, owner: data.UserID})
    .execute('read')
    .sync()
    .on('address');
};

exports.updateAddress = (requester, data) => {
  return ac.can(requester.role)
    .context({requester: requester.id, owner: data.UserID})
    .execute('update')
    .sync()
    .on('address');
};

exports.deleteAddress = (requester, data) => {
  return ac.can(requester.role)
    .context({requester: requester.id, owner: data.UserID})
    .execute('delete')
    .sync()
    .on('address');
};
