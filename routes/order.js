const express = require("express");
const orderController = require("../controllers/order.controller");

const router = express.Router();

router.get("/:id", orderController.getProductById);

router.get("/", orderController.getAllProducts);

router.post("/:id", orderController.postOrder);

router.get("/delete-all/all", orderController.deleteAllOrder);

module.exports = router;
