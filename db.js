const { Client, Pool } = require("pg");

let connection;

if (process.env.ENV_MODE === "prod") {
  connection = new Client({
    connectionString:
      "postgres://dkqctycgscgiuw:beb7cf8e8ee659975959a363d716f5d6f2f0172be9993345d5f119880bace3dd@ec2-3-219-229-143.compute-1.amazonaws.com:5432/de4b9koabh5iqe",
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  connection = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 5432,
  });
}

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = connection;
