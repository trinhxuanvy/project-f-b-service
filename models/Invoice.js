const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Invoice = new Schema(
    {
        user: { type: mongoose.Types.ObjectId, ref: 'User' },
        cart: [
            {
                product: [],
                topping: [],
                size: String,
                description: String,
                amount: Number,
            },
        ],
        voucher: [],
    },
    {
        timestamps: true,
        versionKey: false,
        collection: 'Invoice',
    }
);

module.exports = mongoose.model('Invoice', Invoice);
