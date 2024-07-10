const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User'); 
const bcrypt = require('bcrypt');

// Login route
router.get('/login', (req, res) => {
    console.log('Reached GET /login route');
    res.render('login', { lang: req.cookies.lang || 'fr' }); 
});

router.post('/login', async (req, res) => {
    console.log('Reached POST /login route');
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.render('login', { lang: req.cookies.lang || 'fr', error: 'Invalid credentials' });
        }

        req.session.user = {
            id: user._id,
            username: user.username,
            role: user.role
        };
        
        res.redirect('/dashboard');
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Server error');
    }
});

// Logout route
router.get('/logout', (req, res) => {
    req.logout(); 
    res.redirect('/login');
});

// Facebook routes
router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    (req, res) => {
       
        res.redirect('/');
    }
);

// Twitter routes
router.get('/auth/twitter', passport.authenticate('twitter'));
router.get('/auth/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    (req, res) => {
    
        res.redirect('/');
    }
);

// Instagram routes
router.get('/auth/instagram', passport.authenticate('instagram'));
router.get('/auth/instagram/callback',
    passport.authenticate('instagram', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication, redirect home.
        res.redirect('/');
    }
);

module.exports = router;
