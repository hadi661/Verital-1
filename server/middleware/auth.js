// middleware/auth.js
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

const isAdmin = (req, res, next) => {
    if (req.session && req.session.user && req.session.user.isAdmin) {
        next();
    } else {
        res.status(403).send('Forbidden');
    }
};

module.exports = { isAuthenticated, isAdmin };
