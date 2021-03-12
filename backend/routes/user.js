const express = require("express");
const router = express.Router();
require("dotenv").config();
//middleware
const { checkAuth } = require("../middleware/auth");
//controllers
const UserController = require("../controller/UserController");

router.put("/update/:userId?", checkAuth, UserController.update);
router.get("/:userId?", checkAuth, UserController.get);
router.delete("/delete/:userId?", checkAuth, UserController.delete);

module.exports = router;
