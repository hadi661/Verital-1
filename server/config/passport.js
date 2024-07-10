const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const InstagramStrategy = require('passport-instagram').Strategy;
const User = require('../models/User');

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

// Facebook strategy configuration
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: '/auth/facebook/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ facebookId: profile.id });
        if (!user) {
            user = new User({ facebookId: profile.id, username: profile.displayName });
            await user.save();
        }
        done(null, user);
    } catch (err) {
        done(err, false);
    }
}));

// Twitter strategy configuration
passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: '/auth/twitter/callback'
}, async (token, tokenSecret, profile, done) => {
    try {
        let user = await User.findOne({ twitterId: profile.id });
        if (!user) {
            user = new User({ twitterId: profile.id, username: profile.displayName });
            await user.save();
        }
        done(null, user);
    } catch (err) {
        done(err, false);
    }
}));

// Instagram strategy configuration
passport.use(new InstagramStrategy({
    clientID: process.env.INSTAGRAM_CLIENT_ID,
    clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    callbackURL: '/auth/instagram/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ instagramId: profile.id });
        if (!user) {
            user = new User({ instagramId: profile.id, username: profile.displayName });
            await user.save();
        }
        done(null, user);
    } catch (err) {
        done(err, false);
    }
}));

module.exports = passport;
