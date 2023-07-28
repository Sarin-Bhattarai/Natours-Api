const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getuser)
  .patch(userController.updateUser)
  .delete(userController.deleteuser);

module.exports = router;
