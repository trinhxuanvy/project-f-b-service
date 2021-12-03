const express = require("express");
const shopController = require("../controllers/shop.controller");

const router = express.Router();

router.get("/", shopController.getIndex);

module.exports = router;
