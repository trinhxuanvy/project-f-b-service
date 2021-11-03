const express = require('express');
const productController = require('../controllers/product.controller');

const router = express.Router();

router.get('/:id', productController.getProduct);

router.get('/', productController.getAllProducts);

module.exports = router;
