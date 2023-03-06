const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const { googleConfig, jwtConfig } = require('../config');
const { User } = require('../database/models');

const client = new OAuth2Client(googleConfig.clientID);

async function googleAuth(req, res, next) {
    try {
        const { id_token } = req.body;

        const ticket = await client.verifyIdToken({
            idToken: id_token,
            audience: googleConfig.clientID,
        });

        const { sub, email } = ticket.getPayload();

        let user = await User.findOne({ googleId: sub });

        if (!user) {
            user = new User({
                googleId: sub,
                email,
                name: email.split('@')[0],
            });
            await user.save();
        }

        const token = jwt.sign({ sub }, jwtConfig.secret);

        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                googleId: user.googleId,
            },
        });
    } catch (error) {
        next(error);
    }
}

module.exports = googleAuth;
