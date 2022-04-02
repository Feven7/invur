import passport from 'passport';
import { Strategy } from 'passport-discord';
import 'dotenv/config';

const scopes = ['identify', 'guilds', 'guilds.join'];

passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (obj: any, done) {
    done(null, obj);
});

passport.use('discord', new Strategy({
    clientID: `${process.env.ID}`,
    clientSecret: `${process.env.SECRET}`,
    callbackURL: `${process.env.CALLBACK}`,
    scope: scopes
},
    function (accessToken, refreshToken, profile, cb) {
        return cb(null, { profile, accessToken, });
    })
);

