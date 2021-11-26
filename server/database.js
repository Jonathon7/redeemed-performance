const mysql = require("mysql2");

const options = {
  socketPath: process.env.SOCKET_PATH,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const pool = mysql.createPool(options);

module.exports = {
  pool,
};
