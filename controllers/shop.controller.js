const Event = require("../models/Event");
const Product = require("../models/Product");
const Voucher = require("../models/Voucher");

class ShopController {
  getIndex(req, res, next) {
    const namePage = "Trang chủ";

    Promise.all([
      Product.find({ isDisplay: true, status: true }).skip(0).limit(8),
      Voucher.find({ remain: { $gte: 1 } }),
      Event.find({ endTime: { $gte: new Date() } }),
    ])
      .then(([product, voucher, event]) => {
        //res.send({ product, voucher, event });
        console.log(product);
        res.render("index", { product, voucher, event, namePage });
      })
      .catch((error) => {
        //res.render('error', error);
      });
  }
}

module.exports = new ShopController();
