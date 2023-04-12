const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');
const helpers = require('../lib/helpers');
const { where } = require('sequelize');
const { raw } = require('express');

// Sign in
passport.use(
  'local.signin',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const user = await User.findOne({ where: { username }, raw: true });
      // check if user exists
      if (!user) {
        return done(
          null,
          false,
          req.flash('message', 'The username does not exists'),
        );
      }

      // check if password match
      const checkPassword = await helpers.matchPassword(
        password,
        user.password,
      );
      if (!checkPassword) {
        return done(null, false, req.flash('message', 'Incorrect Password'));
      }

      return done(null, user, req.flash('success', 'Welcome'));
    },
  ),
);

// Sign Up
passport.use(
  'local.signup',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const { displayname } = req.body;
      const newUser = {
        username,
        password,
        displayname,
      };
      const user = await User.findOne({ where: { username } });
      if (user) {
        return done(
          null,
          false,
          req.flash('message', 'Username already exists'),
        );
      }
      newUser.password = await helpers.encryptPassword(password);
      const result = await User.create(newUser);
      newUser.id = result.id;
      return done(null, newUser);
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findOne({ where: { id: id }, raw: true });
  done(null, user);
});
