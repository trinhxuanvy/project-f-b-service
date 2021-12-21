const express = require("express");
const paymentController = require("../controllers/payment.controller");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.get(
  "/payment",
  authController.checkExpired,
  paymentController.getPayment
);

router.post(
  "/payment",
  authController.checkExpired,
  paymentController.postPayment
);

router.get(
  "/get/voucher/:code",
  authController.checkExpired,
  paymentController.changeVoucher
);

module.exports = router;
