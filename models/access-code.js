var mongoose = require('mongoose');

const accessCodeSchema = new mongoose.Schema({
    accessCode: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    used: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('accessCode', accessCodeSchema);