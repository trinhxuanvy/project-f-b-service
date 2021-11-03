const Product = require('../models/Product');
const Category = require('../models/Category');
const Voucher = require('../models/Voucher');

class ProductController {
    getProduct = (req, res, next) => {
        console.log(req.params.id);
        Product.findById(req.params.id)
            .then((prod) => {
                res.send(prod);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    getProducts = (req, res, next) => {
        const namePage = 'Sản phẩm';

        const search = req.query.search_name || '';

        Category.find({})
            .then(async (category) => {
                var prod = new Array();

                for (let i = 0; i < category.length; i++) {
                    prod[i] = new Array();
                    prod[i].push({ type: category[i].name });

                    if (search.length) {
                        await Product.find({
                            category: category[i].name,
                            name: { $regex: search, $options: 'i' },
                        }).then((product) => {
                            prod[i].push(product);
                            //console.log(prod[0][1], 2);
                        });
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

    getAllProducts = (req, res, next) => {
        Category.find({})
            .then(async (category) => {
                var prod = new Array();

                for (let i = 0; i < category.length; i++) {
                    prod[i] = new Array();
                    prod[i].push(category[i].name);
                    await Product.find({ category: category[i].name }).then(
                        (product) => {
                            prod[i].push(product);
                            //console.log(prod, 2);
                        }
                    );
                }
                //res.render('products', prod); //[catgorey, [product]]
                res.send(prod);
            })
            .catch((error) => res.send('123')); // ERROR page
    };
}

module.exports = new ProductController();
