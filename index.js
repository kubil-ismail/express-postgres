require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");

const userRoutes = require("./routes/users/searchUsersRoutes");
const userDetailRoutes = require("./routes/users/usersRoutes");
const authRoutes = require("./routes/auth/index");

// request = input
// response = output
app.use(helmet());

// use cors for all
var allowlist = ["https://www.bca.co.id", "https://blubybcadigital.id"];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

// app.use(cors());

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Define all routes
app.use("/", cors(corsOptionsDelegate), userRoutes);
app.use("/", cors(corsOptionsDelegate), userDetailRoutes);
app.use("/", cors(corsOptionsDelegate), authRoutes);

app.use("*", (req, res) => {
  res.send("Sukses");
});

// end of bottom code
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
