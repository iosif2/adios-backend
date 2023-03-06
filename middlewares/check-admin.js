const jwt = require('jsonwebtoken');
const { User } = require('../database/models');
const { jwtConfig } = require('../config');


const checkAdmin = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error('Authorization header missing');
        error.statusCode = 401;
        throw error;
    }

    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, jwtConfig.secret);
    } catch (err) {
        err.statusCode = 401;
        throw err;
    }

    User.findOne({ where: { googleId: decodedToken.sub } })
        .then(user => {
            if (!user) {
                const error = new Error('User not found');
                error.statusCode = 401;
                throw error;
            }
            if (!user.isAdmin) {
                const error = new Error('You do not have admin permissions');
                error.statusCode = 403;
                throw error;
            }
            req.user = user;
            next();
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

module.exports = checkAdmin;
