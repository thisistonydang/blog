import postgres from "postgres";

export const sql = postgres({
  host: import.meta.env.DB_HOST,
  port: import.meta.env.DB_PORT,
  database: import.meta.env.DB_NAME,
  username: import.meta.env.DB_USER,
  password: import.meta.env.DB_PASS,
});
