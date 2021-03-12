const express = require("express");
const router = express.Router();
require("dotenv").config();
const { checkAuth } = require("../middleware/auth");

//controllers
const AuthController = require("../controller/AuthController");

router.post("/login", AuthController.login);
router.post("/signup", AuthController.signup);

router.get("/me", checkAuth, AuthController.getMe);

module.exports = router;
