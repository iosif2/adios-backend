const blacklist = require('../utils/blacklist');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (blacklist.includes(token)) {
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};
