require("dotenv").config();
const { Pool, Client } = require("pg");

let connection;

if (process.env.ENV_MODE === "prod") {
  connection = new Client({
    connectionString: process.env.DB_URI,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  connection = new Pool({
    user: "me",
    host: "localhost",
    database: "api",
    password: "password",
    port: 5432,
  });
}

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = connection;
