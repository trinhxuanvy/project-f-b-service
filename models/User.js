const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        name: { type: String, required: true },
        address: { type: Array, required: true },
        phone: { type: Array, required: true },
        identityCard: { type: String, required: true },
        role: {
            type: String,
            required: true,
            enum: {
                values: ['Employee', 'Customer', 'Management'],
                message: '{VALUE} is not supports.',
            },
        },
        username: { type: String, required: true },
        password: { type: String, required: true },
        cart: [
            {
                product: [],
                topping: [],
                mota: String,
                soLuong: Number,
            },
        ],
        voucherWallet: [],
    },
    {
        timestamps: true,
        versionKey: false,
        collection: 'User',
    }
);

module.exports = mongoose.model('User', User);
