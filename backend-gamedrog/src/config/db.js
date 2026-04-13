const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "gamedrog",
  port: 5432,
});

module.exports = pool;