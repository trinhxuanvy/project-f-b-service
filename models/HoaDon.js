const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HoaDon = new Schema(
    {
        nguoiDung: { type: mongoose.Types.ObjectId, ref: 'NguoiDung' },
        gioHang: [
            {
                sanPham: [],
                topping: [],
                mota: String,
                soLuong: Number,
            },
        ],
        voucher: [],
    },
    {
        timestamps: true,
        versionKey: false,
        collection: 'HoaDon',
    }
);

module.exports = mongoose.model('HoaDon', HoaDon);
