const { Client, Pool } = require("pg");

let connection;

connection = new Client({
  connectionString:
    "postgres://dkqctycgscgiuw:beb7cf8e8ee659975959a363d716f5d6f2f0172be9993345d5f119880bace3dd@ec2-3-219-229-143.compute-1.amazonaws.com:5432/de4b9koabh5iqe",
  ssl: {
    rejectUnauthorized: false,
  },
});

// connection = new Postgre({
//   user: "dkqctycgscgiuw",
//   host: "ec2-3-219-229-143.compute-1.amazonaws.com",
//   database: "de4b9koabh5iqe",
//   password: "beb7cf8e8ee659975959a363d716f5d6f2f0172be9993345d5f119880bace3dd",
//   port: 5432,
// });

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = connection;
