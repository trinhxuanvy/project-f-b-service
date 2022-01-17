const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    name: { type: String, required: false, default: "" },
    address: { type: String, required: false, default: "" },
    ward: { type: String, required: false, default: "" },
    district: { type: String, required: false, default: "" },
    province: { type: String, required: false, de: "" },
    phone: { type: Array, required: false, default: "" },
    identityCard: { type: String, required: false, default: "" },
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
    token: { type: String, required: false, default: "" },
    active: { type: Boolean, required: true, default: false }
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "User",
  }
);

User.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, 12);
  next();
});

User.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", User);
