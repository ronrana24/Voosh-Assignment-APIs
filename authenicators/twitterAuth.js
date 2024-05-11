const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;

module.exports = () => {
  passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: '/auth/twitter/callback',
  }, (token, tokenSecret, profile, done) => {
    return done(null, profile);
  }));
};