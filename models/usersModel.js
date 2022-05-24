const db = require('../helpers/database')
const bcrypt = require('bcrypt')

exports.createUser = async function createUser(user) {
  user.password = await bcrypt.hash(user.password, 10)
  console.log(user.password);

  let signupcode = "secretsignupcode"
  let role = "user"
  if (user.signupcode === signupcode) {
    role = "staff"
  }
  user["role"] = role

  delete user.signupcode

  let keys = Object.keys(user)
  let values = Object.values(user)
  let parm = ''

  keys = keys.join(',')
  for (i = 0; i < values.length; i++) {
    parm += '?,'
  }
  parm = parm.slice(0, -1)

  let sql = `INSERT INTO users (${keys}) VALUES (${parm})`
  try {
    await db.run_create(sql, values)
    return { "status": 201 }
  } catch (error) {
    return error
  }
}
//exports.getAllUsers = async function getAllUsers (limit=10, page=1) {
exports.getAllUsers = async function getAllUsers() {
  //const offset = (page - 1) * limit;
  //const sql = "SELECT * FROM users LIMIT  ? OFFSET  ?;";
  //const data = await db.run_read(sql, [limit, offset]);

  const sql = "SELECT * FROM users";
  const data = await db.run_read(sql);
  return data;
}

exports.getUserById = async function getUserById(id) {
  let sql = "SELECT * FROM users WHERE ID = ?"
  let values = [id]
  let data = await db.run_read(sql, values)
  return data
}

exports.findUserByUsername = async function findUserByUsername(username) {
  const sql = "SELECT * FROM users WHERE username = ?"
  let values = [username]
  let user = await db.run_read(sql, values)
  return user;
}

exports.deleteUserById = async function deleteUserById(id) {
  const sql = "DELETE FROM users WHERE ID = ?"
  let values = [id]
  let user = await db.run_read(sql, values)
  return user;
}