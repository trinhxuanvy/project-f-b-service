const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        isDisplay: { type: Boolean, default: true },
        category: { type: String, required: true },
        sale: { type: Number, default: 0, min: 0 },
        subProduct: {
            type: Map,
            of: Number, // M:10000 L:20000
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
