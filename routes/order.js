const express = require("express");
const orderController = require("../controllers/order.controller");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.get(
  "/:id",
  authController.authentication,
  orderController.getProductById
);

router.get("/", authController.authentication, orderController.getAllProducts);

router.post("/:id", authController.authentication, orderController.postOrder);

router.get(
  "/delete-all/all",
  authController.authentication,
  orderController.deleteAllOrder
);

module.exports = router;
