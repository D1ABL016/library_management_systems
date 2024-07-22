const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport')
const session = require('express-session')
const PORT = 3000;
const bookRoutes = require('./routes/bookroutes.js')
const userRoutes = require('./routes/userRoutes.js');
require('./passport-file.js')(passport)
const db = require('./models/main.js');
const jwt = require('jsonwebtoken')
const person = db.person
const bcrypt = require('bcrypt')
const JWTMiddleware = require('./middlewares/jwtMiddleware.js')
const location = 'http:127.0.0.1:3000/'


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use(passport.initialize())
app.use(passport.session())

app.use('/book',JWTMiddleware, bookRoutes);
app.use('/user',JWTMiddleware, userRoutes);


app.post('/register', async (req, res) => {
    try {
        // genereate salt
        let salt = await bcrypt.genSalt(10);
        console.log("salt", salt)
        // if(salt)    
        let pass = req.body.passcode
        let hashedPassword = await bcrypt.hash(pass, salt)
        console.log("hashed Password", hashedPassword)
        // let hashedPassword = true;
        if (hashedPassword) {
            const user = await person.create({
                mail: req.body.mail,
                // passcode: req.body.passcode,
                passcode: hashedPassword,
                first_name: req.body.first_name,
                designation: req.body.designation
            });
            if (user)
                res.status(200).send("person created succesfully");
            else throw new Error("user nnot generated")
        }
        else {
            throw new Error("hashed password not generated")
        }
    }
    catch (err) {
        if (err.name === "SequelizeUniqueConstraintError") {
            let n = err.errors.length
            let finalerror = ""
            for (let i = 0; i < n; i++) {
                let str = err.errors[i].message
                finalerror += str + '\n';
            }
            res.status(400).send({ "err": finalerror })
        }

        else if (err.name === "SequelizeValidationError") {

            let arr = err.errors[0].validatorArgs[0]
            res.status(400).send(`${err}`)
        }
        else res.status(404).send({ "some error occured": err })

    }
});

app.post('/login', (req, res, next) => {
    // console.log("login req recieved",req.body)
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.log('error')
            return next(err);
        }
        if (!user) {
            console.log("error => ",info.message)
            return res.send({ 'Login failed': user });
        }
        // console.log(user)
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }

            const token = jwt.sign({ id: user.person_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.json({ message: 'Login successful', token });
        });
    })(req, res, next);
});

// app.get('/testing',JWTMiddleware,(req,res)=>{
//     res.json({ message: 'This is a protected route.', user: req.user });
// })


app.listen(PORT, () => {
    console.log(`Server is running on ` + location);
});



