const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "yokoso",
  host: "localhost",
  port: 5432,
  database: pern_todo,
});

module.exports = pool;
