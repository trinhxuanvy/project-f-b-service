const SanPham = require('../models/SanPham');
const Voucher = require('../models/Voucher');
<<<<<<< Updated upstream
const NguoiDung = require('../models/NguoiDung');

exports.getIndex = async (req, res, next) => {
    res.render('index');
};
=======
const Event = require('../models/Event');

class ShopController {
    getIndex(req, res, next) {
        /*
        Product.find({})
            .then((product) => {
                Voucher.find({ remain: { $gte: 1 } }).then((voucher) => {
                    Event.find({ endTime: { $gte: new Date() } }).then(
                        (event) => {
                            res.send({ product, voucher, event });
                            //res.render('index', { product, voucher, event });
                        }
                    );
                });
            })
            .catch(() => res.render('index'));
        */
        Promise.all([
            Product.find({}),
            Voucher.find({ remain: { $gte: 1 } }),
            Event.find({ endTime: { $gte: new Date() } }),
        ]).then(([product, voucher, event]) => {
            //res.send({ product, voucher, event });
            res.render('index', { product, voucher, event });
        });
    }
>>>>>>> Stashed changes

exports.getProducts = async (req, res, next) => {
    res.render('products');
};
