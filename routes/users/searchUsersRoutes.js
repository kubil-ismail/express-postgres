const Router = require("express").Router();
const db = require("../../db");
const controller = require("../../controllers/searchUserController");

// GET USERS

// AFTER
Router.get("/users", controller.getProfile);

// FIND USERS BY EMAIL
Router.get("/users/find/email", controller.findEmailUsers);

// FIND USERS BY NAME
Router.get("/users/find/name", controller.findNameUsers);

module.exports = Router;
