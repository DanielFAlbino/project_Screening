const express = require("express");
const router = express.Router();
require("dotenv").config();
//middleware
const { checkAuth } = require("../middleware/auth");
//controllers
const CollectionController = require("../controller/CollectionController");

router.put("/update/:collectionId?", checkAuth, CollectionController.update);
router.post("/add", checkAuth, CollectionController.add);
router.get("/:collectionId?", checkAuth, CollectionController.get);
router.delete("/delete/:collectionId?", checkAuth, CollectionController.delete);

module.exports = router;
