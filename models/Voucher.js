const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Tmp = new Schema({
    string: String,
});

const Voucher = new Schema(
    {
        sanPhamApDung: [],
        phanTram: { type: Number, required: true },
        soLuongConLai: { type: Number, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
        collection: 'Voucher',
    }
);

module.exports = mongoose.model('Voucher', Voucher);
