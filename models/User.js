// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    profile_image: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('User', UserSchema);
