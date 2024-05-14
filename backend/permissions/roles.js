const AccessControl = require('role-acl');
const ac = new AccessControl();

// Only admins can perform CRUD operations on roles
ac.grant('admin')
  .execute('read')
  .on('roles');

ac.grant('admin')
  .execute('create')
  .on('roles');

ac.grant('admin')
  .execute('update')
  .on('roles');

ac.grant('admin')
  .execute('delete')
  .on('roles');


ac.grant('user');

exports.readRoles = (requester) => {
    if (requester.role !== 'admin') {
      return { granted: false };
    }
    return ac.can(requester.role)
      .execute('read')
      .sync()
      .on('roles');
  };
  
  exports.createRole = (requester) => {
    if (requester.role !== 'admin') {
      return { granted: false };
    }
    return ac.can(requester.role)
      .execute('create')
      .sync()
      .on('roles');
  };
  
  exports.updateRole = (requester) => {
    if (requester.role !== 'admin') {
      return { granted: false };
    }
    return ac.can(requester.role)
      .execute('update')
      .sync()
      .on('roles');
  };
  
  exports.deleteRole = (requester) => {
    if (requester.role !== 'admin') {
      return { granted: false };
    }
    return ac.can(requester.role)
      .execute('delete')
      .sync()
      .on('roles');
  }