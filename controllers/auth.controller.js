const Product = require("../models/Product");
const Category = require("../models/Category");
const Voucher = require("../models/Voucher");
const User = require("../models/User");
const Order = require("../models/Order");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const passport = require("passport");

dotenv.config();

class Auth {
  getLogin = async (req, res, next) => {
    const user = "";
    const namePage = "Đăng nhập - Đăng ký";
    const message = req.cookies?.message || "",
      username = "",
      password = "";
    if (message) {
      res.clearCookie("message");
    }
    res.render("login", { message, username, password, namePage, user });
  };

  postLogin = async (req, res, next) => {
    const username = req.body?.username;
    const password = req.body?.password;

    passport.authenticate("local.user.login", function (err, user, info) {
      if (info) {
        res.render("login", {
          message: info,
          username,
          password,
          namePage: "Đăng nhập - Đăng ký",
          user: "",
        });
      } else {
        const userToken = {
          _id: user._id,
          username: user.username,
          password: user.password,
          address: user.address,
          phone: user.phone,
          identityCard: user.identityCard,
          name: user.name,
          province: user.province,
          ward: user.ward,
          district: user.district,
        };

        const token = jwt.sign(userToken, process.env.JWT_KEY, {
          algorithm: "HS256",
          expiresIn: "1d",
        });

        res.cookie("user", token);

        if (req.cookies?.oldUrl) {
          let oldUrl = req.cookies?.oldUrl;
          res.cookie("oldUrl", oldUrl);
          res.redirect(oldUrl);
        } else {
          res.redirect("/index");
        }
      }
    })(req, res, next);
  };

  getPageByUrl = async (req, res, next) => {
    const url = req.cookies.url;
    if (!url) {
      res.redirect("/");
    } else {
      res.redirect(url);
    }
  };

  getLogout = (req, res, next) => {
    res.clearCookie("user");
    res.clearCookie("message");
    res.redirect("/login");
  };

  checkExpired = (req, res, next) => {
    const token = req.cookies?.user || "";

    jwt.verify(token, process.env.JWT_KEY, (err, data) => {
      if (err) {
        const message = {
          message: "Your account has expired",
          type: "warning",
        };

        res.cookie("message", message);
        res.redirect("/login");
      } else {
        next();
      }
    });
  };

  getAccount = async (req, res, next) => {
    const user = jwt.verify(
      req.cookies.user,
      process.env.JWT_KEY,
      (err, data) => {
        if (!err) {
          return data;
        }
      }
    );
    const message = req.cookies?.message || "";
    res.clearCookie("message");
    res.render("account", { user, namePage: "Thông tin tài khoản", message });
  };

  updateAccount = async (req, res, next) => {
    const userNew = {
      name: req.body.name,
      identityCard: req.body.identityCard,
      phone: req.body.phone,
      province: req.body.province,
      district: req.body.district,
      ward: req.body.ward,
      address: req.body.address,
    };

    const user = jwt.verify(req.cookies.user, process.env.JWT_KEY) || "";

    User.updateOne({ _id: user._id }, userNew);

    const userToken = {
      _id: user._id,
      username: user.username,
      password: user.password,
      name: req.body.name,
      identityCard: req.body.identityCard,
      phone: req.body.phone,
      province: req.body.province,
      district: req.body.district,
      ward: req.body.ward,
      address: req.body.address,
    };

    const token = jwt.sign(userToken, process.env.JWT_KEY, {
      algorithm: "HS256",
      expiresIn: "1d",
    });

    res.cookie("user", token);
    res.cookie("message", {
      message: "Cập nhật thành công",
      type: "success",
    });
    res.redirect("/account");
  };

  changePassword = async (req, res, next) => {
    if (req.body.newPassword == req.body.confirmNewPassword) {
      const user = jwt.verify(req.cookies.user, process.env.JWT_KEY) || "";
      const hashPass = bcrypt.hashSync(req.body.newPassword, 12);

      await User.updateOne({ _id: user._id }, { password: hashPass });

      res.cookie("message", {
        message: "Cập nhật thành công",
        type: "success",
      });
      res.clearCookie("user");
      res.redirect("/login");
    } else {
      res.cookie("message", {
        message: "Cập nhật thất bại",
        type: "error",
      });
      res.redirect("/account");
    }
  };

  postRegister = async (req, res, next) => {
    if (req.body.password == req.body.confirmPassword) {
      const newUser = {
        username: req.body.username,
        password: req.body.password,
        role: "Customer",
      };

      const findUser = await User.findOne({ username: req.body.username });

      if (findUser) {
        res.cookie("message", {
          message: "Tài khoản đã tồn tại",
          type: "warning",
        });
        res.redirect("/login");
        return;
      }

      const user = new User(newUser);

      await user.save();
      res.cookie("message", { message: "Đăng ký thành công", type: "success" });
      res.redirect("/login");
      return;
    }
    res.cookie("message", { message: "Đăng ký thất bại", type: "error" });
    res.redirect("/register");
  };
}

module.exports = new Auth();
