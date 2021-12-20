const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Tmp = new Schema({
  string: String,
});

const Invoice = new Schema(
  {
    order: { type: Schema.Types.ObjectId, ref: "Order", required: false },
    customer: { type: Schema.Types.ObjectId, ref: "User", required: false },
    price: { type: Number, required: false },
    paid: { type: Boolean, required: false }, // Đánh dấu chưa thanh toán
    ship: { type: Number, required: false },
    name: { type: String, required: false },
    address: { type: String, required: false },
    province: { type: String, required: false },
    district: { type: String, required: false },
    ward: { type: String, required: false },
    phone: { type: String, required: false },
    voucher: { type: String, required: false },
    status: { type: Boolean, required: false, default: true }, // Tình trạng còn tồn tại hay không
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "Invoice",
  }
);

module.exports = mongoose.model("Invoice", Invoice);
