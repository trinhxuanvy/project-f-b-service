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
    const user = jwt.verify(
      req.cookies.user,
      process.env.JWT_KEY,
      (err, data) => {
        if (!err) {
          return data;
        }
      }
    );

    Promise.all([
      Product.find({ isDisplay: true, status: true }).skip(0).limit(8),
      Voucher.find({ status: true }),
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
    const user = jwt.verify(
      req.cookies.user,
      process.env.JWT_KEY,
      (err, data) => {
        if (!err) {
          return data;
        }
      }
    );
    const voucher = await Voucher.findOne({ _id: req.params.id });
    const getUser = await User.findById({ _id: user._id });
    let voucherWallet = getUser.voucherWallet;
    const voucherExist = voucherWallet.filter(
      (item) => item._id == req.params.id
    );
    let message = {};

    if (voucherExist.length == 0) {
      voucherWallet.push(voucher);
      await User.updateOne({ _id: user._id }, { voucherWallet: voucherWallet });
      await Voucher.updateOne(
        { _id: voucher._id },
        { amount: voucher.amount - 1 }
      );
      message = {
        message: "Đã thêm",
        type: "success",
      };
    } else {
      message = {
        message: "Bạn đã có",
        type: "fail",
      };
    }

    res.send(message);
  };
}

module.exports = new ShopController();
