const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SanPham = new Schema(
    {
        tenSanPham: { type: String, required: true },
        moTa: { type: String, required: true },
        danhMuc: { type: String, required: true },
        giaTien: { type: Number, required: true },
        sale: { type: Number, default: 0, min: 0 },
        kichThuoc: {
            type: String,
            required: true,
            enum: {
                values: ['M', 'L'],
                message: '{VALUE} is not supports.',
            },
        },
        anhMoTa: { type: [], required: true },
        danhMuc: { type: String, required: true },
        danhGia: [{ username: String, message: String }],
    },
    {
        timestamps: true,
        versionKey: false,
        collection: 'SanPham',
    }
);

module.exports = mongoose.model('SanPham', SanPham);
