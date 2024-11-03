const mysql = require("mysql2");

const pool = mysql.createPool({
  connectionLimit: 10, // 连接池中最大连接数
  host: "maimap-arcades-mysql.ns-lpkl7gos.svc",
  user: "root",
  password: "rhdb4cml",
  database: "maimap",
});
module.exports = pool;
