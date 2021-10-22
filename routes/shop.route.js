const express = require('express');
const shopController = require('../controllers/shop.controller');

const router = express.Router();

router.get('/products', shopController.getProducts);
router.get('/', shopController.getIndex);

module.exports = router;
