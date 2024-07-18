const mongoose = require('mongoose');
const User = require('./server/models/User');
require('dotenv').config(); // Load environment variables from .env file

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// Function to add an admin user
const addAdmin = async (username, password) => {
    try {
        const user = await User.findOne({ username });
        if (user) {
            console.log(`User ${username} already exists.`);
            return;
        }
        const newUser = new User({ username, password, role: 'admin' });
        await newUser.save();
        console.log(`Admin user ${username} added`);
    } catch (err) {
        console.error(`Error adding user ${username}:`, err);
    }
};

// Function to add admins from environment variables
const addAdmins = async () => {
    await addAdmin(process.env.ADMIN1_USERNAME, process.env.ADMIN1_PASSWORD);
    await addAdmin(process.env.ADMIN2_USERNAME, process.env.ADMIN2_PASSWORD);
    mongoose.connection.close();
};

addAdmins();
