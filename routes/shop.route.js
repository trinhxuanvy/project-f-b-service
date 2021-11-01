const express = require("express");
const shopController = require("../controllers/shop.controller");

const router = express.Router();

router.get("/products", shopController.getProducts);

router.get("/", shopController.getIndex);

router.get("/login", function (req, res, next) {
    res.render("login");
});

module.exports = router;
