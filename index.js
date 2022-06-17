const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
const helmet = require("helmet");

const userRoutes = require("./routes/users/searchUsersRoutes");
const userDetailRoutes = require("./routes/users/usersRoutes");

// request = input
// response = output
app.use(helmet());

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Define all routes
app.use("/", userRoutes);
app.use("/", userDetailRoutes);

// end of bottom code
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
