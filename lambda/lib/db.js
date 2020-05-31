const {Pool} = require('pg')

const pool = new Pool({
  connectionString: process.env.PG_URL,
  ssl: {
    rejectUnauthorized: false,
  },
})

function query(sql, params, cb) {
  return pool.query(sql, params, cb)
}

module.exports = {
  query,
}
