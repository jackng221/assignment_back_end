/**
* A module to provide SQL queries related to user entries
* @module models/usersModel
* @author Jack
* @see helpers/database for middle functions to access database
*/

const db = require('../helpers/database')
const bcrypt = require('bcrypt')

/**
* Generate SQL based on params and pass it on to create a user account.
* @param {object} user data of the user to create. Apply staff role if signupcode is correct.
*/
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

/**
* Generate SQL and pass it on to get all user accounts.
*/
exports.getAllUsers = async function getAllUsers() {
  const sql = "SELECT * FROM users";
  const data = await db.run_read(sql);
  return data;
}

/**
* Generate SQL based on params and pass it on to get a user account data.
* @param {integer} id id of the user in the database.
*/
exports.getUserById = async function getUserById(id) {
  let sql = "SELECT * FROM users WHERE ID = ?"
  let values = [id]
  let data = await db.run_read(sql, values)
  return data
}

/**
* Generate SQL based on params and pass it on to get a user account.
* @param {string} username username of the user in the database.
*/
exports.findUserByUsername = async function findUserByUsername(username) {
  const sql = "SELECT * FROM users WHERE username = ?"
  let values = [username]
  let user = await db.run_read(sql, values)
  return user;
}

/**
* Generate SQL based on params and pass it on to delete a user account.
* @param {integer} id id of the user in the database.
*/
exports.deleteUserById = async function deleteUserById(id) {
  const sql = "DELETE FROM users WHERE ID = ?"
  let values = [id]
  let user = await db.run_read(sql, values)
  return user;
}