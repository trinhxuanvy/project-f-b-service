const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Event = new Schema(
    {
        description: String,
        name: String,
        picture: [],
        video: [],
    },
    {
        timestamps: true,
        versionKey: false,
        collection: 'Event',
    }
);

module.exports = mongoose.model('Event', Event);
