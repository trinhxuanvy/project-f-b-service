const SanPham = require('../models/SanPham');
const Voucher = require('../models/Voucher');
const NguoiDung = require('../models/NguoiDung');

exports.getIndex = async (req, res, next) => {
    res.render('index');
};

exports.getProducts = async (req, res, next) => {
    res.render('products');
};
