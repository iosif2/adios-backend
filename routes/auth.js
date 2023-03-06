const express = require('express');
const checkAuth = require('../middlewares/check-auth');
const googleAuth = require('../middlewares/google-auth');
const blacklist = require('../utils/blacklist');

const router = express.Router();

router.post('/google', googleAuth);

router.post('/logout', checkAuth, (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        blacklist.push(token);
        res.status(200).json({
            message: 'Logout successful'
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;
