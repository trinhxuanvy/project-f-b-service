const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Tmp = new Schema({
  string: String,
});

const Invoice = new Schema(
  {
    order: { type: Array, required: false },
    price: { type: Number, required: false },
    paid: { type: Boolean, required: false },
    ship: { type: Number, required: false },
    name: { type: String, required: false },
    address: { type: String, required: false },
    phone: { type: String, required: false },
    voucher: { type: Schema.Types.ObjectId, ref: "Voucher", required: false },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "Invoice",
  }
);

module.exports = mongoose.model("Invoice", Invoice);
