/**
* A module to run SQL queries on MySQL on behalf of the API models.
* @module helpers/database
* @author Jack
* @see models/* for the models that require this module
*/

const { Sequelize, QueryTypes } = require('sequelize')
const info = require('../config')

/**
* Run an SQL query against the DB, end the connection and return the result.
* @param {string} sql SQL query string in sqljs format
* @param {array|number|string} values The values to inject in to the query string.
* @returns {object} mysqljs results object containing indexable rows
*/
exports.run_create = async function run_create(sql, values) {
  try {
    const sequelize = new Sequelize(`postgres://${info.config.user}:${info.config.password}@${info.config.host}:${info.config.port}/${info.config.database}`)
    await sequelize.authenticate()
    let data = await sequelize.query(sql, {
      replacements: values,
      type: QueryTypes.INSERT
    })
    await sequelize.close()
    return data
  } catch (error) {
    console.error(error, sql, values);
    throw 'Database query error'
  }
}
/**
* Run an SQL query against the DB, end the connection and return the result.
* @param {string} sql SQL query string in sqljs format
* @param {array|number|string} values The values to inject in to the query string.
* @returns {object} mysqljs results object containing indexable rows
*/
exports.run_read = async function run_read(sql, values) {
  try {
    const sequelize = new Sequelize(`postgres://${info.config.user}:${info.config.password}@${info.config.host}:${info.config.port}/${info.config.database}`)
    await sequelize.authenticate()
    let data = await sequelize.query(sql, {
      replacements: values,
      type: QueryTypes.SELECT
    })
    await sequelize.close()
    return data
  } catch (error) {
    console.error(error, sql, values);
    throw 'Database query error'
  }
}
/**
* Run an SQL query against the DB, end the connection and return the result.
* @param {string} sql SQL query string in sqljs format
* @param {array|number|string} values The values to inject in to the query string.
* @returns {object} mysqljs results object containing indexable rows
*/
exports.run_update = async function run_update(sql, values) {
  try {
    const sequelize = new Sequelize(`postgres://${info.config.user}:${info.config.password}@${info.config.host}:${info.config.port}/${info.config.database}`)
    await sequelize.authenticate()
    let data = await sequelize.query(sql, {
      replacements: values,
      type: QueryTypes.UPDATE
    })
    await sequelize.close()
    return data
  } catch (error) {
    console.error(error, sql, values);
    throw 'Database query error'
  }
}
/**
* Run an SQL query against the DB, end the connection and return the result.
* @param {string} sql SQL query string in sqljs format
* @param {array|number|string} values The values to inject in to the query string.
* @returns {object} mysqljs results object containing indexable rows
*/
exports.run_delete = async function run_delete(sql, values) {
  try {
    const sequelize = new Sequelize(`postgres://${info.config.user}:${info.config.password}@${info.config.host}:${info.config.port}/${info.config.database}`)
    await sequelize.authenticate()
    let data = await sequelize.query(sql, {
      replacements: values,
      type: QueryTypes.DELETE
    })
    await sequelize.close()
    return data
  } catch (error) {
    console.error(error, sql, values);
    throw 'Database query error'
  }
}