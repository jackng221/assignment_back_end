const { Sequelize, QueryTypes } = require('sequelize')
const info = require('../config')

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