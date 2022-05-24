/**
* A module to provide SQL queries related to dog entries
* @module models/dogsModel
* @author Jack
* @see helpers/database for middle functions for access database
*/

const db = require('../helpers/database');

// CREATE
/**
* Generate SQL based on params and pass it on to create a dog entry.
* @param {object} dog dog data of the dog entry to be created
*/
exports.createDogEntry = async function createDogEntry(dog) {
  let keys = Object.keys(dog)
  let values = Object.values(dog)
  keys = keys.join(',')
  let parm = ''
  for (i = 0; i < values.length; i++) { parm += '?,' }
  parm = parm.slice(0, -1)
  let sql = `INSERT INTO dogs (${keys}) VALUES (${parm})`
  try {
    await db.run_create(sql, values)
    return { "status": 201 }
  } catch (error) {
    return error
  }
}

// READ
/**
* Generate SQL and pass it on to get all dog entries.
* @param {integer} limit result count limit for query
*/
exports.getAllDogs = async function getAllDogs(limit = 10, page = 1) {
  const offset = (page - 1) * limit;
  let sql = "SELECT * FROM dogs LIMIT  ? OFFSET  ?";
  let data = await db.run_read(sql, [limit, offset]);
  return data
}
/**
* Generate SQL based on params and pass it on to read a dog entry.
* @param {integer} id id of dog in database.
*/
exports.getDogById = async function getDogById(id) {
  let sql = "SELECT * FROM dogs WHERE ID = ?"
  let values = [id]
  let data = await db.run_read(sql, values)
  return data
}
/**
* Generate SQL based on params and pass it on to search dog entries.
* @param {object} type "text" or "number" search.
* @param {object} fields columns to return.
* @param {object} sfields columns for conditional query.
* @param {object} q values for conditional query.
*/
exports.searchDogs = async function searchDogs(type, fields, sfields, q) {
  var sql = ""
  if (type === "text") {
    q = q.toString();
    sql = `SELECT ${fields} FROM dogs WHERE ${sfields} ILIKE '%${q}%' `;
  }
  else {
    sql = `SELECT ${fields} FROM dogs WHERE ${sfields} = ${q} `;
    if (isNaN(q)) {
      sql = `SELECT NULL LIMIT 0 `;
    }
  }
  console.log(sql);
  const data = await db.run_read(sql);
  return data;
}

// UPDATE
/**
* Generate SQL based on params and pass it on to update a dog entry.
* @param {object} dog data of the dog to update.
* @param {integer} id id of the dog in the database.
*/
exports.updateDogById = async function updateDogById(dog, id) {
  let keys = Object.keys(dog)
  let values = Object.values(dog)
  let updateString = ""
  for (i = 0; i < values.length; i++) { updateString += keys[i] + "=" + "'" + values[i] + "'" + "," }
  updateString = updateString.slice(0, -1)

  let sql = `UPDATE dogs SET ${updateString} WHERE ID=${id} RETURNING *;`
  try {
    await db.run_update(sql, values)
    return { "status": 201 }
  } catch (error) {
    return error
  }
}

// DELETE
/**
* Generate SQL based on params and pass it on to delete a dog entry.
* @param {integer} id id of the dog in the database.
*/
exports.deleteDogById = async function deleteDogById(id) {
  let sql = "Delete FROM dogs WHERE ID = ?"
  let values = [id]
  let data = await db.run_delete(sql, values)
  return data
}