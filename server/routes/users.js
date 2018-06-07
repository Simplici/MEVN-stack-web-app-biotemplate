var express = require('express');
var router = express.Router();
const ensureLoggedIn = require('./ensureLoggedIn');

/* get current user info */
router.get('/me', ensureLoggedIn(), (req, res, next) => {
    res.status(200);
    return res.send(req.user);
});

module.exports = router;
