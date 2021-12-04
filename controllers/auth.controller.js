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
    const message = req.cookies?.message;
    res.render("login", { namePage, message });
  };

  postLogin = async (req, res, next) => {
    const login = await User.findOne({
      username: req.body.email,
    });
    let message = {};

    if (login) {
      if (login?.password == req.body.password) {
        const user = {
          _id: login?._id,
          username: login?.username,
          password: login?.password,
        };

        const token = jwt.sign(user, process.env.JWT_KEY, {
          algorithm: "HS256",
          expiresIn: "1d",
        });
        res.cookie("message", "");
        res.cookie("user", token);
        next();
        return;
      } else {
        message = { message: "Mật khẩu không đúng", type: "error" };
      }
    } else {
      message = { message: "Tài khoản không tồn tại", type: "error" };
    }

    res.cookie("message", message);
    res.redirect("/login");
  };

  authentication = (req, res, next) => {
    console.log(req.url);
    const user = jwt.verify(
      req.cookies.user,
      process.env.JWT_KEY,
      (err, result) => {
        if (!err) {
          next();
          return;
        } else {
          res.cookie("message", {
            message: "Vui lòng đăng nhập tài khoản",
            type: "warning",
          });
          res.redirect("/login");
        }
      }
    );
  };

  getPageByUrl = async (req, res, next) => {
    const url = req.cookies.url;
    console.log(url);
    if (!url) {
      res.redirect("/");
    } else {
      res.redirect(url);
    }
  };
}

module.exports = new Auth();
