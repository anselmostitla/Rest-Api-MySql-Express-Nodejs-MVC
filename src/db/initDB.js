const mysql2 = require('mysql2/promise')
require('dotenv').config()

const pool = mysql2.createPool({
  database: process.env.MYSQL2_DATABASE,
  host: process.env.MYSQL2_HOST,
  user: process.env.MYSQL2_USER,
  // port: 3306,
  password: process.env.MYSQL2_PASSWORD
})

module.exports = {pool}