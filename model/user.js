const mongoose = require('mongoose');
const crypto = require('crypto');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    }
}, { timestamps: true })

userSchema.virtual('password').set(function (password) {
    this._password = password;
    this.passwordHash = this.securePassword(password);
}).get(function () {
    return this._password;
})

userSchema.methods = {
    authenticate: function (plainpassword) {
        return this.securePassword(plainpassword) === this.passwordHash;
    },

    securePassword: function (plainpassword) {
        if (!plainpassword) return '';
        try {
            return crypto.createHmac('sha256', process.env.SALT).update(plainpassword).digest('hex');
        } catch (error) {
            return '';
        }
    }
}

module.exports = mongoose.model('User', userSchema);