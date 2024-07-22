const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./models/main');
const User = db.person
require('dotenv').config();

module.exports = function (passport) {
    passport.use(new LocalStrategy(
        async (mail, passcode, done) => {
            try {
                // console.log("in mail password",mail, passcode)
                const userArr = await User.findAll({ where: { mail: mail } });
                if (!userArr.length) {
                    return done(null, false, { message: 'Incorrect email.' });
                }
                const user = userArr[0];
                // console.log(passcode,user.passcode);
                // console.log(user[0].passcode);
                const isMatch = await bcrypt.compare(passcode, user.passcode);
                // const isMatch = true;
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
        const token = jwt.sign({ id: user.person_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        done(null, token);
    });

    passport.deserializeUser(async (token, done) => {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findByPk(decoded.id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
};
