const Product = require("../models/Product");
const Category = require("../models/Category");
const Voucher = require("../models/Voucher");
const User = require("../models/User");
const Order = require("../models/Order");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const passport = require("passport");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

dotenv.config();

class Auth {
  getLogin = async (req, res, next) => {
    const user = "";
    const namePage = "Đăng nhập";
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
    const user = jwt.verify(
      req.cookies.user,
      process.env.JWT_KEY,
      (err, data) => {
        if (err) {
          return null;
        } else {
          return data;
        }
      }
    );

    if (user != null) {
      const userNew = {
        name: req.body.name,
        identityCard: req.body.identityCard,
        phone: req.body.phone,
        province: req.body.province,
        district: req.body.district,
        ward: req.body.ward,
        address: req.body.address,
      };
      const update = await User.updateOne({ _id: user._id }, userNew);

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

      if (update.modifiedCount > 0) {
        res.cookie("message", {
          message: "Cập nhật thành công",
          type: "success",
        });
      } else {
        res.cookie("message", {
          message: "Cập nhật thất bại",
          type: "error",
        });
      }
      res.redirect("/account");
    }
  };

  changePassword = async (req, res, next) => {
    const user = jwt.verify(
      req.cookies.user,
      process.env.JWT_KEY,
      (err, data) => {
        if (err) {
          return null;
        } else {
          return data;
        }
      }
    );
    if (user != null) {
      const hashPass = bcrypt.hashSync(req.body?.password, 12);

      await User.updateOne({ _id: user._id }, { password: hashPass });

      res.cookie("message", {
        message: "Cập nhật thành công",
        type: "success",
      });
      res.clearCookie("user");
      res.redirect("/login");
    }
  };

  getRegister = async (req, res, next) => {
    const user = "";
    const namePage = "Đăng ký";
    const message = req.cookies?.message || "",
      username = "",
      password = "";
    if (message) {
      res.clearCookie("message");
    }
    res.render("register", { message, username, password, namePage, user });
  };

  postRegister = async (req, res, next) => {
    const token = crypto.randomBytes(16).toString("hex");

    const newUser = {
      username: req.body.username,
      password: req.body.password,
      role: "Customer",
      token: token,
    };

    const user = new User(newUser);

    user.save((err) => {
      if (!err) {
        var fullUrl = req.protocol + "://" + req.get("host");
        // Send email (use credintials of SendGrid)
        var transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: process.env.AUTH_EMAIL,
            pass: process.env.AUTH_PASS,
          },
        });
        var mailOptions = {
          from: "TocoToco Fake",
          to: newUser.username,
          subject: "Xác nhận tài khoản",
          html: `<h1>Xác nhận tài khoản</h1>
        <h2>Chào mừng ${newUser.username} đến với TocoToco Fake</h2>
        <p>Cảm ơn bạn đã đăng ký. Vui lòng nhấn link bên dưới để xác nhận</p>
        <div>
        <a
          style="display: inline-block;
          width: 150px;
          color: #fff !important;
          margin: 0 auto;
          padding: 8px 0;
          background-color: #d46318;
          text-decoration: none;
          text-align: center;"
          href="${fullUrl}/confirm/${token}"
          > Click here</a>
        </div>`,
        };
        transporter.sendMail(mailOptions, function (err) {
          if (err) {
            res.cookie("message", {
              message: "Lỗi rồi. Vui lòng gửi lại yêu cầu",
              type: "error",
            });
            res.redirect("/login");
          }
          res.cookie("message", {
            message: "Xác nhận được gửi đến mail " + user.username,
            type: "warning",
          });
          res.redirect("/login");
        });
      } else {
        req.cookie("message", {
          message: "Đã xảy ra lỗi vui lòng quay lại sau",
          type: "error",
        });
        res.redirect("/register");
      }
    });
  };

  getConfirm = async (req, res, next) => {
    User.findOneAndUpdate(
      { token: req.params?.token },
      { active: true },
      (err, data) => {
        if (!err && data) {
          res.cookie("message", {
            message: "Xác nhận thành công",
            type: "success",
          });
        } else {
          res.cookie("message", {
            message: "Xác nhận thất bại",
            type: "error",
          });
        }
        res.redirect("/login");
      }
    );
  };

  getUserByUsername = async (req, res, next) => {
    const user = await User.find({ username: req.params?.username });

    if (user.length) {
      res.send({ status: false });
    } else {
      res.send({ status: true });
    }
  };
}

module.exports = new Auth();
