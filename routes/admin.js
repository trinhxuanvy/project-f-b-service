const express = require("express");
const adminController = require("../controllers/admin.controller");
const router = express.Router();

router.get("/admin/profile");

router.get("/admin/category");

router.get("/admin/user");

router.get("/admin/product", adminController.getProduct);

router.get("/admin/category", adminController.getCategory);

router.get("/admin/user", adminController.getUser);

router.get("/admin/profile", adminController.getProfile);

module.exports = router;
