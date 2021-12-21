const express = require("express");
const shopController = require("../controllers/shop.controller");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/index", (req, res, next) => {
  res.redirect("/");
});

router.get(
  "/add/voucher/:id",
  authController.checkExpired,
  shopController.getVoucher
);

module.exports = router;
