const Product = require("../models/Product");
const Category = require("../models/Category");
const Voucher = require("../models/Voucher");
const User = require("../models/User");
const Order = require("../models/Order");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

class Auth {
  getLogin = async (req, res, next) => {
    const namePage = "Đăng nhập - Đăng ký";
    res.render("login", { namePage });
  };

  postLogin = async (req, res, next) => {
    const login = await User.findOne({
      username: req.body.email,
      password: req.body.password,
    });

    if (login) {
      const user = {
        _id: login?._id,
        username: login?.username,
        password: login?.password,
      };
      const token = jwt.sign(user, process.env.JWT_KEY, {
        algorithm: "HS256",
        expiresIn: "1d",
      });
      res.cookie("user", token);
      next();
      return;
    }

    res.redirect("/login");
  };

  authentication = (req, res, next) => {
    const user = jwt.verify(
      req.cookies.user,
      process.env.JWT_KEY,
      (err, result) => {
        if (!err) {
          next();
          return;
        }
        res.redirect("/login");
      }
    );
  };

  getPageByUrl = async (req, res, next) => {
    const url = req.cookies.url;
    if (!url) {
      res.redirect("/");
    } else {
      res.redirect("/" + url);
    }
  };
}

module.exports = new Auth();
