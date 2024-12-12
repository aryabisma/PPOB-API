// models/Banner.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BannerSchema = new Schema({
    banner_name: {
        type: String,
        required: true
    },
    banner_image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Banner', BannerSchema);
