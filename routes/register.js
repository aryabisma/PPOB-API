// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { validateRegistration } = require('../middlewares/validation');
const router = express.Router();

router.post('/', validateRegistration, async (req, res) => {
    const { email, first_name, last_name, password } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                status: 102,
                message: 'Parameter tidak sesuai format',
                data: null
            });
        }

        // Create new user
        user = new User({ email, first_name, last_name, password });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save user to database
        try{
            await user.save();
        }catch(err) {
            console.log(err);
        };
        res.status(200).json({
            status: 0,
            message: 'Registrasi berhasil silahkan login',
            data: null
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
