const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();

router.get("/login", authController.getLogin);

router.post("/login", authController.postLogin);

router.get("/logout", authController.getLogout);

router.get("/account", authController.checkExpired, authController.getAccount);

router.post("/account", authController.updateAccount);

router.post("/account/change-password", authController.changePassword);

module.exports = router;
