// middlewares/validation.js
const { check, validationResult } = require('express-validator');

const validateRegistration = [
    check('email').isEmail().withMessage('Parameter email tidak sesuai format'),
    check('first_name').isAlpha().withMessage('First name harus berupa karakter'),
    check('last_name').isAlpha().withMessage('Last name harus berupa karakter'),
    check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 102,
                message: errors.array()[0].msg,
                data: null
            });
        }
        next();
    }
];

const validateLogin = [
    check('email').isEmail().withMessage('Parameter email tidak sesuai format'),
    check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 102,
                message: errors.array()[0].msg,
                data: null
            });
        }
        next();
    }
];

const validateBalance = [
    check('balance')
        .isNumeric().withMessage('Balance must be a number')
        .custom(value => value > 0).withMessage('Balance must be greater than 0'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 102,
                message: errors.array()[0].msg,
                data: null
            });
        }
        next();
    }
];


module.exports = { validateRegistration, validateLogin, validateBalance };
