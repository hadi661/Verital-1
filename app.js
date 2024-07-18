require('dotenv').config();
require('./server/config/passport');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { isActiveRoute } = require('./server/middleware/middlewares');
const i18n = require('i18n');
const cookieParser = require('cookie-parser');
const connectDB = require('./server/config/db');
const adminRoutes = require('./server/routes/admin');
const User = require('./server/models/User'); 
const authRoutes = require('./server/routes/auth');
const dashboardRoutes = require('./server/routes/dashboard');
const flash = require('connect-flash');
const crypto = require('crypto');
const app = express();
const PORT = process.env.PORT || 5010;

// Connect to MongoDB
connectDB();

// Init Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// i18n configuration
i18n.configure({
    locales: ['en', 'fr', 'ar'],
    directory: path.join(__dirname, 'locales'),
    defaultLocale: 'fr',
    cookie: 'lang',
});

// Middleware to use i18n
app.use(i18n.init);
app.use(cookieParser());

// Middleware to handle language change
app.use((req, res, next) => {
    if (req.cookies.lang) {
        res.setLocale(req.cookies.lang);
    } else {
        res.setLocale('fr'); // default locale
    }
    return next();
});

// Session middleware
const SESSION_SECRET = crypto.randomBytes(32).toString('hex'); // Generate a session secret
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Set to true if using https
}));

// Passport configuration
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await User.findOne({ username });
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

// Templating engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Global variables for views
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    res.locals.isActiveRoute = isActiveRoute;
    res.locals.currentRoute = req.path;
    res.locals.lang = req.cookies.lang || 'fr';
    next();
});

// Include routes
app.use('/', require('./server/routes/main')); // Main routes
app.use('/admin', adminRoutes); // Admin routes (assuming adminRoutes is properly defined)
app.use('/contact', require('./server/routes/contact')); // Contact routes
app.use('/news', require('./server/routes/newsRoutes')); // News routes
app.use('/blog', require('./server/routes/BlogRoutes')); // Blog routes
app.use('/admin/news', require('./server/routes/newsRoutes')); // Admin news routes
app.use('/search', require('./server/routes/search')); // Search routes
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);

app.post('/subscribe', (req, res) => {
    const email = req.body.email;
    if (validateEmail(email)) {
        console.log(`New subscription: ${email}`);
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});


function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Handle 404 errors
app.use((req, res, next) => {
    res.status(404).send('Route not found');
});

// Handle other errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Server Error');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Website is listening on http://192.168.175.241:${PORT}`);
});
