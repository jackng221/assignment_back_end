const AccessControl = require('role-acl');
const ac = new AccessControl();

// user
ac.grant('user').condition(
  { Fn: 'EQUALS', args:
    { 'requester': '$.owner' } 
  }).execute('read').on('users', ['*', '!password']);

ac.grant('user').condition(
  { Fn: 'EQUALS', args:
    { 'requester': '$.owner' } 
  }).execute('update').on('users', ['password']);
// staff
ac.grant('staff').execute('read').on('users');
ac.grant('staff').execute('update').on('users');
ac.grant('staff').condition({
  Fn: 'NOT_EQUALS', args:
    { 'requester': '$.owner' }
}).execute('delete').on('users');


exports.readAll = (requester) =>
  ac.can(requester.role).execute('read').sync().on('users');

exports.read = (requester, data) => 
  ac.can(requester.role).context({ requester: requester.id.toString(), owner: data.id.toString() }).execute('read').sync().on('users');

exports.update = (requester, data) =>
  ac.can(requester.role).context({ requester: requester.id.toString(), owner: data.id.toString() }).execute('update').sync().on('users');

exports.delete = (requester, data) =>
  ac.can(requester.role).context({ requester: requester.id.toString(), owner: data.id.toString() }).execute('delete').sync().on('users');
