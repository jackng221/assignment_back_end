const AccessControl = require('role-acl');
const ac = new AccessControl();

// user
ac.grant('user').execute('read').on('dogs');
// staff
ac.grant('staff').execute('create').on('dogs');
ac.grant('staff').execute('read').on('dogs');
ac.grant('staff').execute('update').on('dogs');
ac.grant('staff').execute('delete').on('dogs');


exports.create = (requester) => 
  ac.can(requester.role).execute('create').sync().on('dogs');

exports.update = (requester) =>
  ac.can(requester.role).execute('update').sync().on('dogs');

exports.delete = (requester) =>
  ac.can(requester.role).execute('delete').sync().on('dogs');
