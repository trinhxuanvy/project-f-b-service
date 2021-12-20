const express = require("express");
const orderController = require("../controllers/order.controller");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.get("/:id", authController.checkExpired, orderController.getProductById);

router.get("/", authController.checkExpired, orderController.getAllProducts);

router.post("/:id", authController.checkExpired, orderController.postOrder);

router.get(
  "/delete-all/all",
  authController.checkExpired,
  orderController.deleteAllOrder
);

module.exports = router;
