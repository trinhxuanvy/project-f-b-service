const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        category: { type: String, required: true },
        sale: { type: Number, default: 0, min: 0 },
        subProduct: {
            type: Map,
            of: Number,
        },
        picture: { type: [], required: true },
        reviews: [{ username: String, message: String }],
    },
    {
        timestamps: true,
        versionKey: false,
        collection: 'Product',
    }
);

module.exports = mongoose.model('Product', Product);