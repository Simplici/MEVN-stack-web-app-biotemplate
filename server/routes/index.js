const express = require('express');
const passport = require('passport');
const Account = require('../models/account');
const router = express.Router();
const emailService = require('../services/email');

/* register a new account */
router.post('/register', (req, res, next) => {
    // validate email
    if (!Account.validateEmail(req.body.username)) {
        res.status(400);
        return res.send({'error' : 'InvalidEmail', 'description' : 'bad email address'});
    }
    Account.register(new Account({ email : req.body.username }), req.body.password, (err, account) => {
        if (err) {
          res.status(400);
          return res.send({'error' : err.name, 'description' : err.message})
        }
        // send welcome email
        emailService.sendConfirmationMail(account.email, account.emailValidationCode);
        return res.sendStatus(200);
    });
});

/* confirm a account */
router.post('/confirm', (req, res, next) => {
    Account.findOne({email: req.body.email}, function (err, account) {
        if (err) {
            return res.sendStatus(404);
        } else {
            const code = account.emailValidationCode.toString()
            if (req.body.code === code) {
                // confirmation code is correct, remove account email validation code
                account.emailValidationCode = null;
                account.save();
                return res.sendStatus(200);
            } else {
                // confirmation code is not correct
                return res.sendStatus(400);
            }
        }
    });
});

/* login an account */
router.post('/login', passport.authenticate('local'), (req, res, next) => {
    Account.findOne({email: req.body.username}, function (err, account) {
        if (err) {
            return res.sendStatus(404);
        } else {
            if (account.emailValidationCode !== null) {
                // account has not been confirmed
                return res.sendStatus(400);
            } else {
                // account has been confirmed, login
                req.session.save((err) => {
                    if (err) {
                        return next(err);
                    }
                    return res.sendStatus(200)
                });
            }
        }
    })
});

/* logout a user */
router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        return res.sendStatus(200)
    });
});

module.exports = router;
