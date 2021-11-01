const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = new Schema(
    {
        name: { type: String, required: true },
    },
    {
        versionKey: false,
        collection: 'Category',
    }
);

module.exports = mongoose.model('Category', Category);
