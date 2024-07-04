require('dotenv').config();
const SECRET = process.env.SECRET;
const express = require('express');
const expresslayout = require('express-ejs-layouts');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const { isActiveRoute } = require('./server/middleware/middlewares');
const i18n = require('i18n');
const cookieParser = require('cookie-parser');
const connectDB = require('./server/config/db');
const app = express();
const PORT = process.env.PORT || 5010;

// Connect to MongoDB
connectDB();

// Init Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.resolve(import.meta.dirname, 'public')));
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
    //console.log ('-----------------------------------------------');
    //console.log (' [${new Date().toISOString()}]: ${req.method} ${req.url} ${JSON,stringify(req.body)} ');
    return next();
});

app.get('/change-language/:locale', (req, res) => {
    res.cookie('lang', req.params.locale, { maxAge: 900000, httpOnly: true });
    res.redirect('back');
});

// Session middleware
app.use(session({
    name:'sid', 
    secret: 'SECRET',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true }  // Use secure: true in production with HTTPS
}));



// Templating engine
app.use(expresslayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Global variables for views
app.use((req, res, next) => {
    res.locals.isActiveRoute = isActiveRoute;
    res.locals.currentRoute = req.path;
    res.locals.lang = req.cookies.lang || 'fr';
    next();
});
// Include routes 
app.use('/', require('./server/routes/main')); // Main routes
app.use('/admin', require('./server/routes/admin'));
app.use('/contact', require('./server/routes/contact')); // Contact routes
app.use('/news', require('./server/routes/newsRoutes')); // News routes
app.use('/blog', require('./server/routes/BlogRoutes'));
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
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    // Authenticate user
    const user = await User.findOne({ username, password }); // Simplified; use proper hashing in real code
    if (user) {
        req.session.user = {
            id: user._id,
            username: user.username,
            isAdmin: user.isAdmin // Assume `isAdmin` is a field in your User model
        };
        res.redirect('/admin');
    } else {
        res.status(401).send('Invalid credentials');
    }
});

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
