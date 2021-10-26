// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import { Pool } from "pg";
require("dotenv").config();
const dbString = process.env.postgres_database_url;

const pool: Pool = new Pool({
  connectionString: dbString,
});

pool.on("connect", () => {
  console.log(`connected to db`, dbString);
});

const query = (text: string, params?: any[]) => pool.query(text, params);

export { query };
