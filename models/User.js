const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    name: { type: String, required: false },
    address: { type: String, required: false },
    ward: { type: String, required: false },
    district: { type: String, required: false },
    province: { type: String, required: false },
    phone: { type: Array, required: false },
    identityCard: { type: String, required: false },
    role: {
      type: String,
      required: false,
      enum: {
        values: ["Employee", "Customer", "Management"],
        message: "{VALUE} is not supports.",
      },
    },
    username: { type: String, required: true },
    password: { type: String, required: true },
    voucherWallet: { type: Array, required: false },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "User",
  }
);

User.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", User);
