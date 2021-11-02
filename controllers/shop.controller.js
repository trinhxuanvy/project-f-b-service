const Event = require('../models/Event');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Voucher = require('../models/Voucher');
const Service = require('../services/service');

class ShopController {
    getIndex(req, res, next) {
        const namePage = "Trang chủ";

        Promise.all([
            Product.find({}).skip(0).limit(8),
            Voucher.find({ remain: { $gte: 1 } }),
            Event.find({ endTime: { $gte: new Date() } }),
        ])
            .then(([product, voucher, event]) => {
                //res.send({ product, voucher, event });
                console.log(product);
                res.render('index', { product, voucher, event, namePage });
            })
            .catch((error) => {
                //res.render('error', error);
            });
    }

    getProducts = (req, res, next) => {
        const namePage = "Sản phẩm";

        const search = req.query.search_name || "";

        Category.find({})
            .then(async (category) => {
                var prod = new Array();

                for (let i = 0; i < category.length; i++) {
                    prod[i] = new Array();
                    prod[i].push({ type: category[i].name });
                    
                    if (search.length) {
                        await Product.find({ category: category[i].name, name:  { $regex: search, $options: "i" } }).then(
                            (product) => {
                                prod[i].push(product);
                                //console.log(prod[0][1], 2);
                            }
                        );
                    } else {
                        await Product.find({ category: category[i].name }).then(
                            (product) => {
                                prod[i].push(product);
                                //console.log(prod[0][1], 2);
                            }
                        );
                    }
                }

                res.render('products', { prod, namePage }); //[category, [product]]
                //res.send(prod);
            })
            .catch((error) => res.send('123')); // ERROR page
    };
}

module.exports = new ShopController();
