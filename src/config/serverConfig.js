const dotenv=require('dotenv');
dotenv.config(); 
const bcrypt = require('bcrypt');

module.exports = {
    PORT: process.env.PORT,
    SALT: bcrypt.genSaltSync(10),
    AUTH_KEY: process.env.AUTH_KEY
}