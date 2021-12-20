const express = require("express");
const shopController = require("../controllers/shop.controller");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/index", (req, res, next) => {
  res.redirect("/");
});

module.exports = router;
