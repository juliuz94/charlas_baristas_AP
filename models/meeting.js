var mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
    baristaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Barista"
    },
    orderId: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Meeting', meetingSchema);