const express = require("express");
const router = express.Router();
//middleware
const { checkAuth } = require("../middleware/auth");
require("dotenv").config();

//controllers
const CardController = require("../controller/CardController");

router.put("/update/:cardId?", checkAuth, CardController.update);
router.post("/card", checkAuth, CardController.add);
router.delete("/:cardId?", checkAuth, CardController.delete);
router.get("/:userId?", checkAuth, CardController.getCardsByUser);

module.exports = router;
