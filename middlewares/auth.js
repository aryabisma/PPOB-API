// middlewares/auth.js
const jwt = require('jsonwebtoken');
const secretKey = 'aryabisma'; // Replace with your secret key

function verifyToken(req, res, next) {
    const tokenHeader = req.headers['authorization'];
    const token = (tokenHeader.split(" ")[1]);

    if (!token) {
        return res.status(401).json({
            status: 108,
            message: 'Token tidak tidak valid atau kadaluwarsa',
            data: null
        });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.log(err.message);
            return res.status(401).json({
                status: 108,
                message: 'Token tidak tidak valid atau kadaluwarsa',
                data: null
            });
        }

        req.email = decoded.email;
        next();
    });
}

module.exports = verifyToken;
