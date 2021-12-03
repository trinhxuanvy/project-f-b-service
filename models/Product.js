const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    isDisplay: { type: Boolean, default: true },
    categoryName: { type: String, required: false },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: false,
    },
    sale: { type: Number, default: 0, min: 0, required: false },
    subProduct: [
      {
        type: { type: String, required: false },
        rate: { type: Number, required: false },
        price: { type: Number, required: false },
      },
    ],
    picture: { type: String, required: false },
    reviews: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: false },
        username: { type: String, require: true },
        message: { type: String, require: true },
      },
    ],
    status: { type: Boolean, default: true },
    type: { type: String, required: false },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "Product",
  }
);

module.exports = mongoose.model("Product", Product);
