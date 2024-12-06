const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

// Hash the password before saving the user model
UserSchema.pre('save', async function (next) {
    const user = this;

    // Only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Hash the password using our new salt
    const hash = await bcrypt.hash(user.password, salt);

    // Override the cleartext password with the hashed one
    user.password = hash;

    next();
});

// Add a method to compare passwords for login
UserSchema.methods.comparePassword = function (candidatePassword)
{
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', UserSchema);
module.exports = User;