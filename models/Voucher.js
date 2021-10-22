const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Tmp = new Schema({
    string: String,
});

const Voucher = new Schema(
    {
        product: [],
        percent: { type: Number, required: true },
        remain: { type: Number, required: true },
        endTime: { type: Date, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
        collection: 'Voucher',
    }
);

module.exports = mongoose.model('Voucher', Voucher);
