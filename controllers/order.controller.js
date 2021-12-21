const Product = require("../models/Product");
const Category = require("../models/Category");
const Voucher = require("../models/Voucher");
const User = require("../models/User");
const Order = require("../models/Order");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const use = {
  name: "Trình Xuân Vỹ",
  address: "TPHCM",
  phone: "0706434429",
  identityCard: "025963068",
  role: "Customer",
  username: "trinhxuanvy1@gmail.com",
  password: "abcd1234",
  cart: [],
  voucherWallet: [],
};

class OrderController {
  getProductById = (req, res, next) => {
    Product.findById(req.params.id)
      .then((prod) => {
        res.send({ product: prod, success: true });
      })
      .catch((error) => {
        res.send({ success: false });
      });
  };

  getProducts = async (req, res, next) => {
    const namePage = "Sản phẩm";

    const prod = {
      name: "Sữa chua dâu tằm hoàng kim",
      isDisplay: true,
      sale: 10,
      categoryId: "",
      categoryName: "",
    };

    const category = {
      name: "Macchiato Cream Cheese",
      amount: 4,
    };

    const data = new Category(category);
    await data.save((err) => {});
    const search = req.query.search_name || "";

    Category.find({})
      .then(async (category) => {
        var prod = new Array();

        for (let i = 0; i < category.length; i++) {
          prod[i] = new Array();
          prod[i].push({ type: category[i].name });

          if (search.length) {
            await Product.find({
              category: category[i].name,
              name: { $regex: search, $options: "i" },
            }).then((product) => {
              prod[i].push(product);
            });
          } else {
            await Product.find({ category: category[i].name }).then(
              (product) => {
                prod[i].push(product);
              }
            );
          }
        }

        res.render("products", { prod, namePage }); //[category, [product]]
        //res.send(prod);
      })
      .catch((error) => res.send("123")); // ERROR page
  };

  getAllProducts = async (req, res, next) => {
    res.cookie("url", req.url);
    const user = jwt.verify(
      req.cookies.user,
      process.env.JWT_KEY,
      (err, data) => {
        if (!err) {
          return data;
        }
      }
    );
    const namePage = "Order";
    const sugar = await Product.findOne({ isDisplay: false, type: "sugar" });
    const ice = await Product.findOne({ isDisplay: false, type: "ice" });
    const topping = await Product.find({ isDisplay: false, type: "topping" });
    const category = await Category.find();
    const order = await Order.find({ status: "ordering", user: user._id });
    const search = req.query.search_name || "";
    let product = [];

    for (let i = 0; i < category.length; i++) {
      if (search) {
        await Product.find({
          categoryId: category[i]._id,
          isDisplay: true,
          type: "drink",
          name: { $regex: search, $options: "i" },
        }).then((prod) => {
          product.push({
            categoryId: category[i]._id,
            categoryName: category[i].name,
            amount: category[i].amount,
            product: prod,
          });
        });
      } else {
        await Product.find({
          categoryId: category[i]._id,
          isDisplay: true,
          type: "drink",
        }).then((prod) => {
          product.push({
            categoryId: category[i]._id,
            categoryName: category[i].name,
            amount: category[i].amount,
            product: prod,
          });
        });
      }
    }

    res.render("order", {
      namePage,
      product,
      sugar,
      ice,
      topping,
      order,
      user,
    });
  };

  postOrder = async (req, res, next) => {
    const user = jwt.verify(req.cookies.user, process.env.JWT_KEY);
    let topping = [],
      subTopping,
      subTotalPrice = 0,
      totalPrice;
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);

    for (let i = 0; i < keys.length; i++) {
      if (keys[i].indexOf("_topping") > 0) {
        subTopping = await Product.findById({ _id: values[i] });
        subTotalPrice += subTopping?.subProduct[0]?.price;

        topping.push({
          name: subTopping?.name,
          price: subTopping?.subProduct[0]?.price,
        });
      }
    }
    totalPrice = subTotalPrice;
    const product = await Product.findById({ _id: req.params.id });

    product?.subProduct.forEach((item) => {
      if (item.type == req.body.size) {
        subTotalPrice += item.price;
        totalPrice += Math.floor((item.price * (100 - product?.sale)) / 100);
      }
    });

    if (req.body.ice) {
      topping.push({
        name: req.body.ice,
      });
    }

    if (req.body.sugar) {
      topping.push({
        name: req.body.sugar,
      });
    }

    const orderNew = {
      user: user?._id,
      productId: req.params.id,
      productName: product.name,
      topping: topping,
      size: req.body.size,
      totalPrice: totalPrice * req.body.amount,
      subTotalPrice: subTotalPrice * req.body.amount,
      amount: req.body.amount,
      status: "ordering",
      isDisplay: true,
    };

    const order = new Order(orderNew);
    await order.save();

    res.redirect("/order");
  };

  deleteAllOrder = async (req, res, next) => {
    const user = jwt.verify(req.cookies.user, process.env.JWT_KEY);
    const order = await Order.updateMany(
      { user: user._id, status: "ordering" },
      { status: "cancel" }
    );

    res.redirect("/order");
  };
}

module.exports = new OrderController();
