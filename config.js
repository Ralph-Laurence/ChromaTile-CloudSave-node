require('dotenv').config();

// const MODE_DEV     = 'DEV';
const MODE_PROD  = 'PROD';
const APP_MODE   = process.env.APP_MODE; // Change this to MODE_PROD for production

const connString = APP_MODE === MODE_PROD
                 ? process.env.DB_CONN_PROD
                 : process.env.DB_CONN_DEV;

const config = {
    connString
};

module.exports = config;
