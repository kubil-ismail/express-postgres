const Router = require("express").Router();
const db = require("../../db");
const controller = require("../../controllers/searchUserController");
const middleware = require("../../middleware/verifyToken");

// GET USERS

// AFTER
Router.get("/users", middleware.checkToken, controller.getProfile);

// FIND USERS BY EMAIL
Router.get("/users/find/email", controller.findEmailUsers);

// FIND USERS BY NAME
Router.get("/users/find/name", controller.findNameUsers);

module.exports = Router;
