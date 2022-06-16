const Postgre = require("pg").Pool;

const connection = new Postgre({
  user: "me",
  host: "localhost",
  database: "api",
  password: "password",
  port: 5432,
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = connection;
