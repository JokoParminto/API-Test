const Database = require ('../database')
const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize('sqlite::memory:')

const User = Database.define('user', {
  user_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  password: {
	  type: Sequelize.STRING,
    allowNull: false
  },
  photos: {
	  type: Sequelize.STRING,
    allowNull: false
  },
  creditcard_type: {
	  type: Sequelize.STRING,
    allowNull: false
  },
  creditcard_name: {
	  type: Sequelize.STRING,
    allowNull: false
  },
  creditcard_number: {
	  type: Sequelize.STRING,
    allowNull: false
  },
  creditcard_expired: {
	  type: Sequelize.STRING,
    allowNull: false
  },
  creditcard_cvv: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = User