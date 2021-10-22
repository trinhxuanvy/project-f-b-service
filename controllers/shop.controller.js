const Product = require('../models/Product');
const Voucher = require('../models/Voucher');
const User = require('../models/User');
const Event = require('../models/Event');

class ShopController {
    getIndex(req, res, next) {
        res.render('index');
    }

    getProducts(req, res, next) {
        res.render('products');
    }
}

module.exports = new ShopController();
