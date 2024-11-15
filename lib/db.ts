import mysql from "mysql2";

const pool = mysql.createPool({
  connectionLimit: 10, // 连接池中最大连接数
  host: "maimap-mysql.mfnest.tech",
  user: "root",
  password: "yelsjdhl",
  database: "maimap",
});
// 可在本地建立一个数据库，并在系统hosts中设置将“maimap-mysql.mfnest.tech”域名映射到本地局域网ipv4地址；
// 若想进行快速开发，可以使用下面的公共地址：
// const pool = mysql.createPool({
//   connectionLimit: 10,
//   host: "mysql.sqlpub.com",
//   user: "maimap_user",
//   password: "vcLR4i74kLPg3Yyf",
//   database: "maimap",
// });

export { pool };
