const dotenv = require('dotenv')
dotenv.config();

module.exports = {
    port: process.env.PORT,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD
}