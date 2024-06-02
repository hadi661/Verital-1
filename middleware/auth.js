// middleware/auth.js
function ensureAuthenticated(req, res, next) {
    if (req.session.user && req.session.user.role === 'admin') {
        return next();
    }
    res.redirect('/login');
}

module.exports = ensureAuthenticated;
