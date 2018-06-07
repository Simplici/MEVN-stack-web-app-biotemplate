/*
 *middleware which ensures that a request is authenticated, if not, http 401 is returned.
 */
module.exports = function ensureLoggedIn() {
  return function(req, res, next) {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      return res.sendStatus(401);
    }
    next();
  }
}