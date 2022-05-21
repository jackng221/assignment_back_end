const db = require('../helpers/database');

// CREATE
exports.createDogEntry = async function createDogEntry (dog) {  
  let keys = Object.keys(dog)
  let values = Object.values(dog)  
  keys = keys.join(',')   
  let parm = ''
  for(i=0; i<values.length; i++){ parm +='?,'}
  parm=parm.slice(0,-1)
  let sql = `INSERT INTO dogs (${keys}) VALUES (${parm})`
  try{
    await db.run_create(sql, values)  
    return {"status": 201}
  } catch(error) {
    return error
  }
}

// READ
exports.getAllDogs = async function getAllDogs () {
  let sql = "SELECT * FROM dogs;"
  let data = await db.run_read(sql)  
  return data
}

exports.getDogById = async function getDogById (id) {
  let sql = "SELECT * FROM dogs WHERE ID = ?"
  let values = [id]
  let data = await db.run_read(sql, values)
  return data
}

// UPDATE
exports.updateDogById = async function updateDogById (dog, id) {  
  let keys = Object.keys(dog)
  let values = Object.values(dog)  
  let updateString=""
  for(i=0; i<values.length;i++){updateString+=keys[i]+"="+"'"+values[i]+"'"+"," }
 updateString= updateString.slice(0, -1)
  
  let sql = `UPDATE dogs SET ${updateString} WHERE ID=${id} RETURNING *;`
  try{
    await db.run_update(sql, values)  
    return {"status": 201}
  } catch(error) {
    return error
  }
}

// DELETE
exports.deleteDogById = async function deleteDogById (id) {
  let sql = "Delete FROM dogs WHERE ID = ?"
  let values = [id]
  let data = await db.run_delete(sql, values)
  return data
}