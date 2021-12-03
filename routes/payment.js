const express = require("express");
const paymentController = require("../controllers/payment.controller");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.get(
  "/payment",
  authController.authentication,
  paymentController.getPayment
);

module.exports = router;
