const express = require('express');
const passport = require('passport');
const Account = require('../models/account');
const router = express.Router();
const emailService = require('../services/email');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { user : req.user });
});

/* GET register page. */
router.get('/register', (req, res) => {
    res.render('register', { });
});

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
        emailService.sendWelcomeMail(req.body.username);
        // login user
        passport.authenticate('local')(req, res, () => {
            req.session.save((err) => {
                if (err) {
                    return next(err);
                }
                return res.sendStatus(200)
            });
        });
    });
});

/* GET login page */
router.get('/login', (req, res) => {
    res.render('login', { user : req.user, error : req.flash('error')});
});

/* login an account */
router.post('/login', passport.authenticate('local'), (req, res, next) => {
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        return res.sendStatus(200)
    });
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
