// routes/profile.js
const express = require('express');
const User = require('../models/User');
const verifyToken = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
    try {
        const user = await User.findOne({email: req.email}).select('-password');
        if (!user) {
            return res.status(404).json({ status: 108, message: 'User not found', data: null });
        }

        res.status(200).json({
            status: 0,
            message: 'Sukses',
            data: {
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                profile_image: user.profile_image
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/update', verifyToken, async (req, res) => {
    const { email, first_name, last_name, profile_image } = req.body;

    try {
        const updatedUser = await User.findOneAndUpdate(
            {email: req.email},
            { first_name, last_name, profile_image },
            { new: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({
                status: 108,
                message: 'User not found',
                data: null
            });
        }

        res.status(200).json({
            status: 0,
            message: 'Update Profile berhasil',
            data: {
                email: updatedUser.email,
                first_name: updatedUser.first_name,
                last_name: updatedUser.last_name,
                profile_image: updatedUser.profile_image
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/image', verifyToken, (req, res) => {
    upload.single('File')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({
                status: 102,
                message: err.message,
                data: null
            });
        }

        const { email, first_name, last_name } = req.body;
        const profile_image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

        try {
            const updatedUser = await User.findOneAndUpdate(
                {email : req.email},
                { email, first_name, last_name, profile_image },
                { new: true }
            ).select('-password');

            if (!updatedUser) {
                return res.status(404).json({
                    status: 108,
                    message: 'User not found',
                    data: null
                });
            }

            res.status(200).json({
                status: 0,
                message: 'Update Profile Image berhasil',
                data: {
                    email: updatedUser.email,
                    first_name: updatedUser.first_name,
                    last_name: updatedUser.last_name,
                    profile_image: updatedUser.profile_image
                }
            });
        } catch (err) {
            res.status(500).json({ message: 'Server error' });
        }
    });
});

module.exports = router;
