const Event = require('../models/Event');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Voucher = require('../models/Voucher');
const Service = require('../services/service');

class ShopController {
    getIndex(req, res, next) {
        Promise.all([
            Product.find({}).skip(0).limit(8),
            Voucher.find({ remain: { $gte: 1 } }),
            Event.find({ endTime: { $gte: new Date() } }),
        ])
            .then(([product, voucher, event]) => {
                //res.send({ product, voucher, event });
                //console.log(voucher);
                res.render('index', { product, voucher, event });
            })
            .catch((error) => {
                //res.render('error', error);
            });
    }

    getProducts = (req, res, next) => {
        Category.find({})
            .then(async (category) => {
                var prod = new Array();

                for (let i = 0; i < category.length; i++) {
                    prod[i] = new Array();
                    prod[i].push(category[i].name);
                    await Product.find({ category: category[i].name }).then(
                        (product) => {
                            prod[i].push(product);
                            console.log(prod, 2);
                        }
                    );
                }
                //res.render('products', prod); //[category, [product]]
                res.send(prod);
            })
            .catch((error) => res.send('123')); // ERROR page
    };
}

module.exports = new ShopController();
