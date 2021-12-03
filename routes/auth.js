const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();

router.get("/login", authController.getLogin);

router.post("/login", authController.postLogin, authController.getPageByUrl);

module.exports = router;
