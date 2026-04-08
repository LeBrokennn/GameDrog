const pool = require("../config/db");

async function findByEmail(email) {
  const query = "SELECT * FROM usuarios WHERE email = $1";
  const result = await pool.query(query, [email]);
  return result.rows[0];
}

async function createUser({ nombre, email, password, rol }) {
  const query = `
    INSERT INTO usuarios (nombre, email, password, rol)
    VALUES ($1, $2, $3, $4)
    RETURNING id, nombre, email, rol
  `;
  const values = [nombre, email, password, rol];
  const result = await pool.query(query, values);
  return result.rows[0];
}

module.exports = { findByEmail, createUser };