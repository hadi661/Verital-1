// middleware/auth.js
const bcrypt = require('bcrypt');

function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    }
    res.redirect('/dashboard');
}

function isAdmin(req, res, next) {
    if (req.session && req.session.user && req.session.user.isAdmin) {
        return next();
    }
    res.status(403).send('Forbidden');
}

module.exports = { isAuthenticated, isAdmin };
