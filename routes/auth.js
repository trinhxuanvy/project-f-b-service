const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();

router.get("/login", authController.getLogin);

router.post("/login", authController.postLogin);

router.get("/logout", authController.getLogout);

router.get("/account", authController.checkExpired, authController.getAccount);

router.post("/account", authController.checkExpired, authController.updateAccount);

router.post("/account/change-password", authController.checkExpired, authController.changePassword);

router.post("/register", authController.postRegister);

router.get("/register", authController.getRegister);

router.get("/confirm/:token", authController.getConfirm);

router.get("/user/:username", authController.getUserByUsername);

router.get("/reset", authController.getResetPassword);

router.post("/reset", authController.resetPassword);

module.exports = router;
