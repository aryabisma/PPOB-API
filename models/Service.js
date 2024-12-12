// models/Service.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    service_code: {
        type: String,
        required: true
    },
    service_name: {
        type: String,
        required: true
    },
    service_icon: {
        type: String,
        required: true
    },
    service_tariff: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Service', ServiceSchema);
