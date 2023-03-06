Adios-backend
This is the backend REST API for the Adios project. It is built using Express.js and MySQL.

![Node.js Version](https://img.shields.io/badge/node-v16.19.1-green.svg)
![Express.js Version](https://img.shields.io/badge/express-v4.18.2-blue.svg)

# Installation
1. Clone the repository from https://github.com/iosif2/adios-backend

2. Install dependencies using the command yarn install

3. Create a .env file in the root directory with the following variables:
```env
PORT=3001

# Database settings
DATABASE_URL=mysql://username:password@localhost:3306/database_name

# JWT settings
JWT_SECRET=
JWT_EXPIRES_IN=1d

# Google OAuth settings
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```
4. Start the server with the command `yarn start`

License
This project is licensed under the MIT License. See the LICENSE file for details.