const Event = require("../models/Event");
const Product = require("../models/Product");
const Voucher = require("../models/Voucher");
const Service = require("../services/service");

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
      Product.find({}).skip(0).limit(8),
      Voucher.find({ remain: { $gte: 1 } }),
      Event.find({ endTime: { $gte: new Date() } }),
    ]).then(([product, voucher, event]) => {
      //res.send({ product, voucher, event });
      console.log(voucher);
      res.render("index", { product, voucher, event });
    });
  }

  getProducts = async (req, res, next) => {
    res.render("products");
  };
}

module.exports = new ShopController();
