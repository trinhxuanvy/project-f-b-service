const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Order = new Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: false },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: false },
    productName: { type: String, required: false },
    topping: [
      {
        name: { type: String, required: false },
        price: { type: Number, required: false },
      },
    ],
    size: { type: String, required: false },
    description: { type: String, required: false },
    totalPrice: { type: Number, required: false },
    subTotalPrice: { type: Number, required: false },
    amount: { type: Number, required: false },
    status: {
      type: String,
      required: false,
      enum: {
        values: ["ordering", "preparing", "shipping", "done"],
        message: "{VALUE} is not supports.",
      },
    },
    isDisplay: { type: Boolean, required: false },
    voucher: { type: Array, required: false },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "Order",
  }
);

module.exports = mongoose.model("Order", Order);
