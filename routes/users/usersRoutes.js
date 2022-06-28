const Router = require("express").Router();
const controller = require("../../controllers/userController");
const middleware = require("../../middleware/verifyToken");
const uploadMiddleware = require("../../middleware/upload");

// FIND USERS
Router.get("/users/find/id", controller.getUserId); // ke sini /users/find/id

// POST PROFILE
Router.post(
  "/users/add",
  middleware.checkToken,
  uploadMiddleware.uploadSingle,
  controller.addUser
);

// EDIT PROFILE
Router.patch("/users/edit", middleware.checkToken, controller.editUser);

// DELETE PROFILE
Router.delete("/users/delete", middleware.checkToken, controller.deleteUser);

module.exports = Router;
