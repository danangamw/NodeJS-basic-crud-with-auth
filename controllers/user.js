const passport = require('passport');

const showSignup = (req, res) => {
  res.render('auth/signup');
};

const signup = (req, res, next) => {
  passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true,
  })(req, res, next);
};

const showSignin = (req, res) => {
  res.render('auth/signin');
};

const signin = (req, res, next) => {
  passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true,
  })(req, res, next);
};

const signout = (req, res, next) => {
  req.logOut((err) => {
    if (err) return next(err);
    res.redirect('/signin');
  });
};

module.exports = {
  showSignin,
  showSignup,
  signin,
  signup,
  signout,
};
