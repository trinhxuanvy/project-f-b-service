const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Cart = new Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: false },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: false },
    productName: { type: String, required: false },
    topping: { type: Array, required: false },
    size: { type: String, required: false },
    description: { type: String, required: false },
    amount: { type: Number, required: false },
    status: { type: Boolean, required: false },
    isDisplay: { type: Boolean, required: false },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "Order",
  }
);

module.exports = mongoose.model("Order", Order);
