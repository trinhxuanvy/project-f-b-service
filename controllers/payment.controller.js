const Product = require("../models/Product");
const Category = require("../models/Category");
const Voucher = require("../models/Voucher");
const User = require("../models/User");
const Order = require("../models/Order");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

class PaymentController {
  getPayment = async (req, res, next) => {
    res.cookie("url", req.url);
    const namePage = "Thanh toán";
    const user = jwt.verify(req.cookies.user, process.env.JWT_KEY);
    const order = await Order.find({ status: "ordering", user: user._id });
    const userInfo = await User.findById({ _id: user._id });
    const allVoucher = await Voucher.find();
    const voucherWallet = userInfo.voucherWallet;
    let voucher = [],
      totalPrice = 0;

    for (let i = 0; i < voucherWallet.length; i++) {
      if (
        new Date(voucherWallet[i].endTime) > new Date() &&
        voucherWallet[i].used == false
      ) {
        voucher.push({
          code: voucherWallet[i].code,
          name: voucherWallet[i].name,
          percent: voucherWallet[i].percent,
        });
      }
    }

    for (let i = 0; i < order.length; i++) {
      totalPrice += order[i].totalPrice;
    }
    res.render("payment", { namePage, order, voucher, totalPrice });
  };

  postPayment = async (req, res, next) => {
    res.redirect("/payment");
  };
}

module.exports = new PaymentController();
