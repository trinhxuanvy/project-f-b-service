const Product = require("../models/Product");
const Category = require("../models/Category");
const Voucher = require("../models/Voucher");
const User = require("../models/User");
const Order = require("../models/Order");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Invoice = require("../models/Invoice");

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
    res.render("payment", { namePage, order, voucher, totalPrice, user });
  };

  postPayment = async (req, res, next) => {
    let invoice = {},
      totalPrice = 0,
      newInvoice;
    const user = jwt.verify(req.cookies.user, process.env.JWT_KEY);
    const order = await Order.find({ status: "ordering", user: user._id });

    for (let i = 0; i < order.length; i++) {
      invoice = {
        name: req.body.name,
        phone: req.body.phone,
        province: req.body.province,
        district: req.body.district,
        ward: req.body.ward,
        address: req.body.address,
        customer: user._id,
        order: order[i]._id,
        voucher: req.body.voucher,
        paid: false,
        price: order[i].totalPrice,
        ship: Math.floor((order[i].totalPrice * 5) / 100),
      };
      newInvoice = new Invoice(invoice);
      await newInvoice.save();
    }

    await Order.updateMany(
      { status: "ordering", user: user._id },
      { status: "done" }
    );

    let voucherWallet = [];
    if (req.body.voucher) {
      const getUser = await User.findById({ _id: user._id });
      for (let i = 0; i < getUser.voucherWallet?.length; i++) {
        if (req.body.voucher != getUser.voucherWallet[i].code) {
          voucherWallet.push(getUser.voucherWallet[i]);
        }
      }

      await User.updateOne({ _id: user._id }, { voucherWallet: voucherWallet });
    }

    res.redirect("/payment");
  };
}

module.exports = new PaymentController();
