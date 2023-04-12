module.exports = {
  isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('message', 'Please log in to access the request page');
    return res.redirect('/signin');
  },

  isNotLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    return res.redirect('/profile');
  },
};
