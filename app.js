require('dotenv').config();
const express = require('express');
const expresslayout = require('express-ejs-layouts');
const path = require('path');
const connectDB = require('./server/config/db');
const methodOverride = require('method-override');
const session = require('express-session');
const { isActiveRoute } = require('./middleware/middlewares');
const i18n = require('i18n');


const app = express();
const PORT = process.env.PORT || 5010;

// Connect to MongoDB
connectDB();

// i18n configuration
i18n.configure({
    locales: ['en', 'fr', 'ar'],
    directory: path.join(__dirname, 'locales'),
    defaultLocale: 'fr',
    cookie: 'lang',
});

// Middleware to use i18n
app.use(i18n.init);

// Session middleware
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }  // Use secure: true in production with HTTPS
}));

// Init Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// Templating engine
app.use(expresslayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to handle language change
app.use((req, res, next) => {
    if (req.query.lang) {
        res.cookie('lang', req.query.lang, { maxAge: 900000, httpOnly: true });
        res.setLocale(req.query.lang);
    }
    next();
});

// Global variables for views
app.use((req, res, next) => {
    res.locals.isActiveRoute = isActiveRoute;
    res.locals.currentRoute = req.path;
    next();
});

// Include routes
app.use('/', require('./server/routes/main')); // Main routes

app.use('/testimonials', require('./server/routes/testimonials')); // Testimonials routes
app.use('/contact', require('./server/routes/contact')); // Contact routes
app.use('/news', require('./server/routes/newsRoutes')); // News routes
app.use('/admin/news', require('./server/routes/newsRoutes')); // Admin news routes
app.use('/search', require('./server/routes/search')); // Search routes
app.post('/subscribe', (req, res) => {
    const email = req.body.email;
    if (validateEmail(email)) {
        // Simulate email saving process
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
app.use((err, req, res, next) => {  // Ensure next is included
    console.error(err.stack);
    res.status(500).send('Server Error');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Website is listening on port ${PORT}`);
});
