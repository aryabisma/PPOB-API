// models/Transaction.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    invoice_number: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique: false
    },
    service_code: {
        type: String,
        required: true
    },
    transaction_type: {
        type: String,
        required: true
    },
    description: {
      type: String,
      required: false
    },
    total_amount: {
        type: Number,
        required: true
    },
    created_on: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Transaction', TransactionSchema);
