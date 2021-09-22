const Sequelize = require ('sequelize')
const config = require ('./config')
const Op = Sequelize.Op
const seq = Sequelize

module.exports = (() => {
  return new Sequelize(
    process.env.DATABASE_NAME || 'LQ',
    process.env.DATABASE_USERNAME || 'root',
    process.env.DATABASE_PASSWORD || 'root',
    config,
    Op,
    seq
  )
})()
