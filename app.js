require('dotenv').config();
const express = require('express');
const expresslayout = require('express-ejs-layouts');
const path = require('path'); // Require the 'path' module
const connectDB = require('./server/config/db');
const methodOverride = require('method-override');

const app = express();
const PORT = process.env.PORT || 5010;

// Connect to MongoDB
connectDB();

// Init Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));
// Templating engine
app.use(expresslayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Include routes
app.use('/', require('./server/routes/main')); // Main routes
app.use(require('./server/routes/services')); // Services routes
app.use(require('./server/routes/testimonials')); // Testimonials routes

app.listen(PORT, () => {
    console.log(`Website is listening on port ${PORT}`);
});
