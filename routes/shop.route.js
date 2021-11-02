const express = require("express");
const shopController = require("../controllers/shop.controller");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/login", function (req, res, next) {
    const namePage = "Đăng nhập - Đăng ký";
  res.render("login", { namePage });
});

router.post("/login", function (req, res, next) {
    next();
}, function (req, res, next) {
    res.redirect("/login");
});

router.get("/payment", function (req, res, next) {
    const namePage = "Thanh toán";
  res.render("payment", { namePage });
});

module.exports = router;
