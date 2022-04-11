const { Pool } = require('pg')
const pool = new Pool();

console.log("Database connected successfulyl");

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
}