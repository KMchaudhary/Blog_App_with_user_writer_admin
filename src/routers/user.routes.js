const express = require('express')
const router = express.Router()

// require user controller
const userController = require('../controllers/user.controller');

// create user
router.post('/signup', userController.create);

// login user
router.post('/login', userController.login);

// Redirect to login page
router.get('/login', (req, res, next) => {
    res.render('login');
});

// Redirect to signup page
router.get('/signup', (req, res, next) => {
    res.render('signup');
});

// logout
router.get('/logout', (req, res, next) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');
})

module.exports = router;