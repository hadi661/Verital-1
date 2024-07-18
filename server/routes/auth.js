const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/admin/dashboard',
    failureRedirect: '/auth/login',
    failureFlash: true
}));

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', [
    check('email').isEmail().withMessage('Please enter a valid email'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    check('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        return true;
    })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('auth/register', { errors: errors.array() });
    }

    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        res.redirect('/auth/login');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server Error');
        }
        res.redirect('/');
    });
});

module.exports = router;
