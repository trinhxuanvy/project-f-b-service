const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Tmp = new Schema({
  string: String,
});

const Voucher = new Schema(
  {
    product: { type: Array, required: false },
    category: { type: Array, required: false },
    code: { type: String, required: false },
    name: { type: String, required: false },
    percent: { type: Number, required: false },
    remain: { type: Number, required: false },
    startTime: { type: Date, required: false },
    endTime: { type: Date, required: false },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "Voucher",
  }
);

module.exports = mongoose.model("Voucher", Voucher);
