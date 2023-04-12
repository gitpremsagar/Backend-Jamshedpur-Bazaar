require("dotenv").config();
const mysql = require("mysql2/promise");

async function makeQueryToDatabase(queryStatement, valuesArray) {
  // create connection to the database
  const connection = await mysql.createConnection({
    user: process.env.MYSQL_USER_NAME,
    host: process.env.MYSQL_HOSTNAME,
    password: process.env.MYSQL_USER_PASSWORD,
    port: process.env.MYSQL_PORT_NUMBER,
    database: process.env.MYSQL_DATABASE_NAME,
  });

  console.log("Connected to MySql Server!");
  const response = await connection.query(queryStatement, valuesArray);
  connection.end();
  return response;
}

module.exports = makeQueryToDatabase;
