/**
 * CRUD methods for postgres tables
 */
const { Pool } = require('pg');

// @todo Error handling

// PostgreSQL connection configuration
const pool = new Pool({
  database: 'postgres',
  host: 'localhost',
  user: 'postgres',
  password: '1024',
  port: 5432,
});

async function query(text, params) {
  const client = await pool.connect();
  try {
    debugger;
    const res = await client.query(text, params);
    return res;
  } finally {
    client.release();
  }
}

async function create(table, data) {
  const columns = Object.keys(data).join(', ');
  const values = Object.values(data);
  const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');

  const queryText = `INSERT INTO ${table} (${columns}) VALUES (${placeholders}) RETURNING *`;

  const result = await query(queryText, values);

  return result.rows[0];
}

async function read(table, id) {
  const queryText = `SELECT * FROM ${table} WHERE id = $1`;

  const result = await query(queryText, [id]);

  return result.rows[0];
}

async function update(table, id, data) {
  const updates = Object.keys(data).map((key, index) => `${key} = $${index + 1}`).join(', ');
  const values = Object.values(data);
  const queryText = `UPDATE ${table} SET ${updates} WHERE id = $${values.length + 1} RETURNING *`;

  const result = await query(queryText, [...values, id]);

  return result.rows[0];
}

async function remove(table, id) {
  const queryText = `DELETE FROM ${table} WHERE id = $1 RETURNING *`;

  const result = await query(queryText, [id]);

  return result.rows[0];
}

async function list(table) {
  const queryText = `SELECT * FROM ${table}`;

  const result = await query(queryText, []);

  return result.rows;
}

// @todo Need a better way to handle this?
async function innerjoin(table, data, fkArray) {
  const fields = data.join(', ');
  const joins = fkArray.reduce((acc, value) => {
    const joinType = 'INNER JOIN';
    return `${acc} ${joinType} ${value.relatedTable} ON ${value.relatedTable}.${value.pk} = ${value.table}.${value.fk}`;
  }, '');
  const queryText = `SELECT ${fields} FROM ${table} ${joins}`;

  const result = await query(queryText, []);

  return result.rows;
}

module.exports = {
  create,
  read,
  update,
  remove,
  list,
  innerjoin,
};
