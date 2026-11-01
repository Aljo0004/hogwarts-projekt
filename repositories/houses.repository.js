import { pool } from "../db.js";

// SELECT alle houses
export async function getAllHouses() {
  const result = await pool.query("SELECT * FROM houses");
  return result.rows;
}

// SELECT house via id
export async function getHouseById(id) {
  const result = await pool.query("SELECT * FROM houses WHERE id = $1", [id]);
  if (result.rowCount === 0) {
    return null;
  } else {
    return result.rows[0];
  }
}
