const Router = require("express").Router();
const db = require("../../db");
const controller = require("../../controllers/userController");

// FIND USERS
Router.get("/users/find/id", controller.getUserId); // ke sini /users/find/id

// POST PROFILE
Router.post("/users/add", controller.addUser);

// EDIT PROFILE
Router.patch("/users/edit", controller.editUser);

// DELETE PROFILE
Router.delete("/users/delete", controller.deleteUser);

module.exports = Router;
