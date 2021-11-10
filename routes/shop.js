const express = require('express');
const shopController = require('../controllers/shop.controller');

const router = express.Router();

router.get('/login', function (req, res, next) {
    const namePage = 'Đăng nhập - Đăng ký';
    res.render('login', { namePage });
});

router.post(
    '/login',
    function (req, res, next) {
        next();
    },
    function (req, res, next) {
        res.redirect('/login');
    }
);

router.get('/payment', function (req, res, next) {
    const namePage = 'Thanh toán';
    res.render('payment', { namePage });
});

router.get('/', shopController.getIndex);

module.exports = router;
