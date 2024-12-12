// routes/login.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const { validateLogin } = require('../middlewares/validation');
const router = express.Router();

const secretKey = 'aryabisma'; // Replace with your secret key

router.post('/', validateLogin, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 102,
            message: errors.array()[0].msg,
            data: null
        });
    }

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });
        if (!user) {
            console.log(`User ${email} gak ketemu`)
            return res.status(401).json({
                status: 103,
                message: `User ${email} gak ketemu`,
                data: null
            });
        }

        console.log(`${password} VS from mongoDB ${password}`)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                status: 103,
                message: 'Username atau password salah',
                data: null
            });
        }

        const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '12h' });
        res.json({
            status: 0,
            message: 'Login Sukses',
            data: {
                token: token
            }
        });

    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
