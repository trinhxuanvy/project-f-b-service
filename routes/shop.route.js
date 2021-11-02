const express = require("express");
const shopController = require("../controllers/shop.controller");

const router = express.Router();

router.get("/products", function (req, res, next) {
    res.render("products");
});

router.get("/", shopController.getIndex);

router.get("/login", function (req, res, next) {
    res.render("login");
});

router.get("/payment", function (req, res, next) {
    res.render("payment");
});

module.exports = router;
