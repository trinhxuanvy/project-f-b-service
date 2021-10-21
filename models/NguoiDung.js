const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NguoiDung = new Schema(
    {
        hoTen: { type: String, required: true },
        diaChi: { type: Array, required: true },
        sdt: { type: Array, required: true },
        cccd: { type: String, required: true },
        role: {
            type: String,
            required: true,
            enum: {
                values: ['NhanVien', 'KhachHang', 'QuanLi'],
                message: '{VALUE} is not supports.',
            },
        },
        username: { type: String, required: true },
        password: { type: String, required: true },
        gioHang: [
            {
                sanPham: [],
                topping: [],
                mota: String,
                soLuong: Number,
            },
        ],
        viVoucher: [],
    },
    {
        timestamps: true,
        versionKey: false,
        collection: 'NguoiDung',
    }
);

module.exports = mongoose.model('NguoiDung', NguoiDung);
