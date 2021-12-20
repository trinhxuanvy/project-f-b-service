const Event = require("../models/Event");
const Product = require("../models/Product");
const Voucher = require("../models/Voucher");
const User = require("../models/User");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

class ShopController {
  getIndex(req, res, next) {
    const namePage = "Trang chủ";
    const user = jwt.verify(req.cookies.user, process.env.JWT_KEY) || "";

    Promise.all([
      Product.find({ isDisplay: true, status: true }).skip(0).limit(8),
      Voucher.find(),
      Event.find({ endTime: { $gte: new Date() } }),
    ])
      .then(([product, voucher, event]) => {
        res.render("index", { product, voucher, event, namePage, user });
      })
      .catch((error) => {
        //res.render('error', error);
      });
  }

  getVoucher = async (req, res, next) => {
    const user = jwt.verify(req.cookies.user, process.env.JWT_KEY);
    const voucher = await Voucher.findOne({ _id: req.params.id });

    const getUser = await User.findById({ _id: user._id });

    let voucherWallet = getUser.voucherWallet;
    voucherWallet.push(voucher);

    await User.updateOne({ _id: user._id }, { voucherWallet: voucherWallet });
  };
}

module.exports = new ShopController();
