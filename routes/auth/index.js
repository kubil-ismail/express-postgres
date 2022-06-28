const Router = require("express").Router();
const controller = require("../../controllers/authController");

// LOGIN
Router.post("/login", controller.login);

module.exports = Router;
