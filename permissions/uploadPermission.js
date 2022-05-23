const AccessControl = require('role-acl');
const ac = new AccessControl();

// user
ac.grant('user').execute('read').on('upload');
// staff
ac.grant('staff').execute('create').on('upload');
ac.grant('staff').execute('read').on('upload');

exports.create = (requester) => 
  ac.can(requester.role).execute('create').sync().on('upload');

exports.delete = (requester) =>
  ac.can(requester.role).execute('read').sync().on('upload');
