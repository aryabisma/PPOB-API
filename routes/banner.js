// routes/banner.js
const express = require('express');
const Banner = require('../models/Banner');
const verifyToken = require('../middlewares/auth');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const banners = await Banner.find();
        res.status(200).json({
            status: 0,
            message: 'Sukses',
            data: banners
        });
    } catch (err) {
        res.status(401).json({
            status: 108,
            message: 'Token tidak tidak valid atau kadaluwarsa',
            data: null
        });
    }
});

module.exports = router;
