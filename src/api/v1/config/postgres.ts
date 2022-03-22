// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import { Pool } from "pg";
require("dotenv").config();
const dbString = process.env.DEV_DATABASE_URL;

const pool: Pool = new Pool({
  connectionString: dbString,
  ssl: { rejectUnauthorized: false },
});
pool.on("connect", () => {
  console.log(`connected to db`, dbString);
});

const query = (text: string, params?: any[]) => pool.query(text, params);
const db = { query };
export default db;
