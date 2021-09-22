require('dotenv').config()
module.exports = {
  host: process.env.DATABASE_CONNECTION || 'localhost',
  dialect: 'mysql',
  database: process.env.DATABASE_NAME || 'boilerplate_db',
  username: process.env.DATABASE_USERNAME || 'root',
  password: process.env.DATABASE_PASSWORD || 'toor',
  passoperatorsAliasesword: false,
  // operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  // disable logging; default: console.log // show query
  logging: true,
  define: {
    timestamps: false,
    freezeTableName: true,
    paranoid: true
  }
}
