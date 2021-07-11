const express = require("express");
const UserController = require("../../controllers/crud/user.controller");

const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
//router.put("/user/password", LoginController.change_password);
//router.delete("/user", LoginController.delete_user);

module.exports = router;