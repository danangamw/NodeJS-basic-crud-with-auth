const express = require('express');

const { isNotLoggedIn, isLoggedIn } = require('../lib/auth');
const router = express.Router();
const authController = require('../controllers/user');

/* Register */
router.get('/signup', isNotLoggedIn, authController.showSignup);
router.post('/signup', isNotLoggedIn, authController.signup);

/* Login */
router.get('/signin', isNotLoggedIn, authController.showSignin);
router.post('/signin', isNotLoggedIn, authController.signin);

/* logout */
router.get('/logout', authController.signout);

module.exports = router;
