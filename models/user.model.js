const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    // email: {
    //     type        : String,
    //     required    : [true, "Please enter a valid email!"],
    //     unique      : true,
    //     trim        : true,
    //     lowercase   : true,
    //     match       : [/\S+@\S+\.\S+/, 'is invalid']
    // },
    password: {
        type        : String,
        required    : true 
    },
    username: {
        type        : String,
        required    : [true, "Please enter a valid username!"],
        unique      : [true, "Username is taken!"],
        trim        : true
    },
},
{ timestamps: true});

const User = mongoose.model('User', UserSchema);
module.exports = User;