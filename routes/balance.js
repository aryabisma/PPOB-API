// routes/balance.js
const express = require('express');
const Balance = require('../models/Balance');
const verifyToken = require('../middlewares/auth');
const router = express.Router();
const { validateBalance } = require('../middlewares/validation');

router.get('/', verifyToken, async (req, res) => {
    try {
        const userBalance = await Balance.findOne({ email: req.email });
        if (!userBalance) {
            return res.status(404).json({
                status: 108,
                message: 'Balance not found',
                data: null
            });
        }

        res.status(200).json({
            status: 0,
            message: 'Get Balance Berhasil',
            data: {
                balance: userBalance.balance
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 108,
            message: 'Token tidak tidak valid atau kadaluwarsa',
            data: null
        });
    }
});

router.post('/topup', verifyToken, validateBalance, async (req, res)=> {
    let { email, balance } = req.body;

    try {
        const currBalance = await Balance.findOne({ email: req.email });
        const newBalance = Number(currBalance.balance) + Number(balance);
        balance = newBalance;
        const updatedBalance = await Balance.findOneAndUpdate(
            { email: req.email },
            { balance },
            { new: true }
        );
        if (!updatedBalance) {
            return res.status(404).json({
                status: 108,
                message: 'Balance not found',
                data: null
            });
        }

        res.status(200).json({
            status: 0,
            message: 'Top up Balance Berhasil',
            data: {
                balance: updatedBalance.balance
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 108,
            message: 'Token tidak tidak valid atau kadaluwarsa',
            data: null
        });
    }
});

module.exports = router;
