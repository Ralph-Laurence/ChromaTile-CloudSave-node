const config = require('./config');
const mongoose = require('mongoose');

const connectDb = () => {
    
    return mongoose.connect(config.connString)
            .then(() => console.log('Connected to MongoDB'))
            .catch(err => console.error('Connection error', err));
};

module.exports = connectDb;