const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Event = new Schema(
    {
        description: String,
        name: { type: String, required: true },
        picture: [],
        video: [],
        endTime: { type: Date, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
        collection: 'Event',
    }
);

module.exports = mongoose.model('Event', Event);
