// routes/service.js
const express = require('express');
const Service = require('../models/Service');
const verifyToken = require("../middlewares/auth");
const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json({
            status: 0,
            message: 'Sukses',
            data: services
        });
    } catch (err) {
        res.status(500).json({
            status: 108,
            message: 'Failed to retrieve services',
            data: null
        });
    }
});

module.exports = router;
