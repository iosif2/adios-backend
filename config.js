module.exports = {
    port: process.env.PORT || 3000,
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'adios',
        dialect: 'mysql',
    },
    jwtConfig: {
        secret: process.env.JWT_SECRET || 'supersecretkey',
        expiresIn: '1d',
    },
    googleConfig: {
        clientId: process.env.GOOGLE_CLIENT_ID || 'your-client-id',
    },
};
