// models/Balance.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BalanceSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    balance: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Balance', BalanceSchema);
