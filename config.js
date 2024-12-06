const dbUsername = 'chroma3_mongodb';
const dbPassword = 'chroma3_mongodb';
const connString = `mongodb+srv://${dbUsername}:${dbPassword}@chroma3-db.wbygm.mongodb.net/?retryWrites=true&w=majority&appName=Chroma3-DB`;

const config = {
    dbUsername,
    dbPassword,
    connString,
};

module.exports = config;