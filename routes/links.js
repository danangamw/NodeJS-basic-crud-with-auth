const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');
const linkController = require('../controllers/link');

router.get('/', isLoggedIn, linkController.getAllLinks);
router.get('/add', isLoggedIn, linkController.showAdd);
router.post('/add', isLoggedIn, linkController.addLink);
router.get('/delete/:id', isLoggedIn, linkController.deleteLink);
router.get('/edit/:id', isLoggedIn, linkController.showEdit);
router.post('/edit/:id', isLoggedIn, linkController.editLink);

module.exports = router;
