// routes/transaction.js
const express = require('express');
const Balance = require('../models/Balance');
const Service = require('../models/Service');
const Transaction = require('../models/Transaction');
const verifyToken = require('../middlewares/auth');
const { body, validationResult } = require('express-validator');
const router = express.Router();

router.post('/', [
    verifyToken,
    body('service_code').notEmpty().withMessage('Service code is required'),
    body('total_amount').isNumeric().withMessage('Total amount must be a number').custom(value => value > 0).withMessage('Total amount must be greater than 0')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 102,
            message: errors.array()[0].msg,
            data: null
        });
    }

    const { service_code, total_amount, description } = req.body;

    try {
        // Check user's balance
        const userBalance = await Balance.findOne({ email: req.email });
        if (!userBalance || userBalance.balance < total_amount) {
            return res.status(400).json({
                status: 102,
                message: 'Insufficient balance',
                data: null
            });
        }

        // Get service name
        const service = await Service.findOne({ service_code });
        if (!service) {
            return res.status(400).json({
                status: 102,
                message: 'Service ataus Layanan tidak ditemukan',
                data: null
            });
        }

        // Generate invoice number
        const currentDate = new Date();
        const dateStr = `${currentDate.getDate()}${currentDate.getMonth() + 1}${currentDate.getFullYear()}`;
        const invoiceCount = await Transaction.countDocuments();
        const invoiceNumber = `INV${dateStr}-${invoiceCount + 1}`;

        // Create transaction
        const transaction = new Transaction({
            invoice_number: invoiceNumber,
            email: req.email,
            service_code: service.service_code,
            description: description,
            transaction_type: 'PAYMENT',
            total_amount: total_amount,
            created_on: currentDate
        });

        await transaction.save();

        // Update user's balance
        userBalance.balance -= total_amount;
        await userBalance.save();

        res.status(200).json({
            status: 0,
            message: 'Transaksi berhasil',
            data: {
                invoice_number: invoiceNumber,
                service_code: service.service_code,
                service_name: service.service_name,
                transaction_type: 'PAYMENT',
                total_amount: total_amount,
                created_on: currentDate
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: 'Server error',
            data: null
        });
    }
});

router.get('/history', verifyToken, async (req, res) => {
    const { limit } = req.body;

    try {
        const query = Transaction.find({ email: req.email }).sort({ created_on: -1 });

        if (limit) {
            body('limit')
                .isNumeric().withMessage('limit must be a number');
            query.limit(parseInt(limit, 10));
        }

        const transactions = await query.exec();

        res.status(200).json({
            status: 0,
            message: 'Get History Berhasil',
            data: {
                offset: 0,
                limit: limit ? parseInt(limit, 10) : transactions.length,
                records: transactions
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: 'Server error',
            data: null
        });
    }
});

module.exports = router;
