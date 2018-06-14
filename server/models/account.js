const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const emailValidator = require('email-validator');
const rn = require('random-number');

const gen = rn.generator({
    min: 1000,
    max:  9999,
    integer: true
});

const Account = new Schema({
    email: String,
    emailValidationCode: {
        type: Number,
        default: gen
    },
    password: String
});

Account.plugin(passportLocalMongoose, {
    usernameField: 'email',
    passwordValidator: function (password, cb) {
        // the password length must be 8-128
        if (!(password.length >= 8 && password.length <= 128)) {
            return cb({'name' : 'PasswordLengthError', 'message' : 'password length must be from 8 to 128'});
        }
        cb(null)
    }
});

Account.statics.validateEmail = function (email) {
    return emailValidator.validate(email);
};

module.exports = mongoose.model('account', Account);