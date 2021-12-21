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
    const user = jwt.verify(
      req.cookies.user,
      process.env.JWT_KEY,
      (err, data) => {
        if (!err) {
          return data;
        }
      }
    );
    const order = await Order.find({ status: "ordering", user: user._id });
    const userInfo = await User.findById({ _id: user._id });
    const allVoucher = await Voucher.find({ status: true });
    const voucherWallet = userInfo.voucherWallet;
    let voucher = [],
      totalPrice = 0;

    for (let i = 0; i < voucherWallet.length; i++) {
      if (new Date(voucherWallet[i].endTime) > new Date()) {
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

    const ship = Math.floor((totalPrice * 10) / 100);
    totalPrice += ship;
    res.render("payment", { namePage, order, voucher, totalPrice, user, ship });
  };

  postPayment = async (req, res, next) => {
    let totalPrice = 0;
    const user = jwt.verify(
      req.cookies.user,
      process.env.JWT_KEY,
      (err, data) => {
        if (!err) {
          return data;
        }
      }
    );
    const order = await Order.find({ status: "ordering", user: user._id });
    let getOrder = [];

    for (let i = 0; i < order.length; i++) {
      getOrder.push(order[i]._id);
      totalPrice += order[i].subTotalPrice;
    }

    const ship = Math.floor((totalPrice * 10) / 100);
    const invoice = {
      name: req.body.name,
      phone: req.body.phone,
      province: req.body.province,
      district: req.body.district,
      ward: req.body.ward,
      address: req.body.address,
      customer: user._id,
      order: getOrder,
      voucher: req.body.voucher,
      paid: false,
      price: totalPrice,
      ship: ship,
    };
    const newInvoice = new Invoice(invoice);

    await newInvoice.save();

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

  changeVoucher = async (req, res, next) => {
    const user = jwt.verify(
      req.cookies.user,
      process.env.JWT_KEY,
      (err, data) => {
        if (!err) {
          return data;
        }
      }
    );
    const order = await Order.find({ status: "ordering", user: user._id });
    let totalPrice = 0;

    for (let i = 0; i < order.length; i++) {
      totalPrice += order[i].totalPrice;
    }

    const voucher = await Voucher.findOne({ code: req.params.code });
    let ship;
    if (req.params.code != 0) {
      ship = Math.floor(
        ((totalPrice * 5) / 100) * ((100 - voucher.percent) / 100)
      );
      totalPrice += ship;
    } else {
      ship = Math.floor((totalPrice * 10) / 100);
      totalPrice += ship;
    }

    res.send({ totalPrice: totalPrice, ship: ship });
  };
}

module.exports = new PaymentController();
