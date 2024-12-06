const dbUsername = 'chroma3_mongodb';
const dbPassword = 'chroma3_mongodb';
const connStrDev = "mongodb://localhost:27017/Chroma3-DB";
const connStrPrd = `mongodb+srv://${dbUsername}:${dbPassword}@chroma3-db.wbygm.mongodb.net/?retryWrites=true&w=majority&appName=Chroma3-DB`;

const MODE_DEV   = 'DEV';
const MODE_PROD  = 'PROD';
const CURRENT_MODE = MODE_DEV; // Change this to MODE_PROD for production

const connString = CURRENT_MODE === MODE_PROD ? connStrPrd : connStrDev;

const config = {
    dbUsername,
    dbPassword,
    connString,
    CURRENT_MODE,
};

module.exports = config;
