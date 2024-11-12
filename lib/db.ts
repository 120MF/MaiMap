import mysql from "mysql2";

const pool = mysql.createPool({
  connectionLimit: 10, // 连接池中最大连接数
  host: "maimap-mysql.mfnest.tech",
  user: "root",
  password: "yelsjdhl",
  database: "maimap",
});

export { pool };
